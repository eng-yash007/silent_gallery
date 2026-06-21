import { NextResponse } from 'next/server';
import { createTask } from '@/app/actions/tasks';
import { createCalendarEvent } from '@/app/actions/calendar';

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get('audio') as Blob;
    if (!file) {
      return NextResponse.json({ error: "No audio file provided" }, { status: 400 });
    }

    const groqKey = process.env.GROQ_API_KEY;
    if (!groqKey) {
      return NextResponse.json({ error: "GROQ_API_KEY is not configured in .env" }, { status: 500 });
    }

    // Step 1: Transcribe Audio with Whisper on Groq
    const whisperFormData = new FormData();
    whisperFormData.append('file', file, 'audio.webm');
    whisperFormData.append('model', 'whisper-large-v3-turbo');
    
    const whisperRes = await fetch('https://api.groq.com/openai/v1/audio/transcriptions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${groqKey}`
      },
      body: whisperFormData
    });

    if (!whisperRes.ok) {
      const err = await whisperRes.text();
      throw new Error(`Whisper API error: ${err}`);
    }

    const whisperData = await whisperRes.json();
    const transcribedText = whisperData.text;

    if (!transcribedText || transcribedText.trim() === '') {
      return NextResponse.json({ message: "Could not hear anything clearly." });
    }

    // Step 2: Use Llama-3 to extract intent and function call
    const tools = [
      {
        type: "function",
        function: {
          name: "create_task",
          description: "Creates a task or protocol in the user's to-do list.",
          parameters: {
            type: "object",
            properties: {
              title: { type: "string", description: "The title of the task" },
              date: { type: "string", description: "The date of the task in YYYY-MM-DD format. Default to today if not specified." },
              time: { type: "string", description: "The specific time if mentioned in HH:MM format (24-hour). Otherwise omit." }
            },
            required: ["title"]
          }
        }
      },
      {
        type: "function",
        function: {
          name: "schedule_meeting",
          description: "Schedules a Google Calendar meeting and invites the specified email.",
          parameters: {
            type: "object",
            properties: {
              email: { type: "string", description: "The email address to invite" },
              summary: { type: "string", description: "The title of the meeting" },
              date: { type: "string", description: "The date in YYYY-MM-DD format" },
              startTime: { type: "string", description: "Start time in HH:MM format (24-hour)" },
              endTime: { type: "string", description: "End time in HH:MM format. If duration not specified, default to 1 hour after startTime." }
            },
            required: ["email", "summary", "date", "startTime", "endTime"]
          }
        }
      }
    ];

    const todayStr = new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" });
    const todayYMD = new Date().toISOString().split('T')[0];

    const llamaRes = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${groqKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [
          {
            role: "system",
            content: `You are an AI assistant. The user will speak in English, Hindi, or Hinglish.
Today's local date/time is ${todayStr}. Use this to resolve relative words like "tomorrow", "today", "evening".
Extract the user's intent. If they want to create a task, use the create_task function. If they want to schedule a meeting, use the schedule_meeting function. If you are missing crucial information (like email for a meeting), you can just reply normally to ask for it.
Respond politely and concisely.`
          },
          {
            role: "user",
            content: transcribedText
          }
        ],
        tools: tools,
        tool_choice: "auto"
      })
    });

    if (!llamaRes.ok) {
      const err = await llamaRes.text();
      throw new Error(`LLM API error: ${err}`);
    }

    const llamaData = await llamaRes.json();
    const message = llamaData.choices[0].message;

    // Check if the LLM called a tool
    if (message.tool_calls && message.tool_calls.length > 0) {
      const toolCall = message.tool_calls[0];
      const args = JSON.parse(toolCall.function.arguments);

      if (toolCall.function.name === "create_task") {
        const taskForm = new FormData();
        taskForm.append("title", args.title);
        taskForm.append("date", args.date || todayYMD);
        if (args.time) taskForm.append("startTime", args.time);

        await createTask(null, taskForm);
        return NextResponse.json({ message: `Task created: ${args.title}` });
      }

      if (toolCall.function.name === "schedule_meeting") {
        const calForm = new FormData();
        calForm.append("summary", args.summary);
        calForm.append("date", args.date);
        calForm.append("startTime", args.startTime);
        calForm.append("endTime", args.endTime);
        calForm.append("attendees", args.email);
        calForm.append("createMeet", "on"); 

        const res = await createCalendarEvent(null, calForm);
        if (res && res.error) {
           return NextResponse.json({ message: `Failed to schedule: ${res.error}` });
        }
        return NextResponse.json({ message: `Meeting scheduled with ${args.email} at ${args.startTime}` });
      }
    }

    // If no tool was called, return the standard chat response
    return NextResponse.json({ message: message.content || "I didn't catch an actionable command." });

  } catch (e: any) {
    console.error(e);
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
