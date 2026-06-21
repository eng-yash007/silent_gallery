"use server";

import prisma from "@/lib/prisma";

export async function generateAIBriefing(date: string, localTimeString: string, currentDate: string) {
  try {
    // 1. Fetch data
    const tasks = await prisma.task.findMany({
      where: { date },
      include: { project: true },
      orderBy: { startTime: 'asc' }
    });

    const userStat = await prisma.userStat.findFirst();
    const streak = userStat?.currentStreak || 0;

    // 2. Analyze data
    const totalTasks = tasks.length;
    
    // Count meetings
    const meetingKeywords = ['meet', 'sync', 'call', 'catchup', 'interview', '1:1', 'review'];
    const meetings = tasks.filter(t => 
      t.source === 'google_calendar' || 
      meetingKeywords.some(keyword => t.title.toLowerCase().includes(keyword))
    );
    const meetingCount = meetings.length;
    const regularTasksCount = totalTasks - meetingCount;

    // Time Travel Context
    let timeContext = "present";
    if (date < currentDate) timeContext = "past";
    if (date > currentDate) timeContext = "future";

    // Time of day context
    const hour = parseInt(localTimeString.split(':')[0] || "12");
    let greeting = "Hello";
    if (timeContext === "present") {
      if (hour >= 5 && hour < 12) greeting = "Good morning.";
      else if (hour >= 12 && hour < 18) greeting = "Good afternoon.";
      else if (hour >= 18 && hour < 22) greeting = "Good evening.";
      else greeting = "Working late?";
    } else if (timeContext === "past") {
      greeting = "Timeline review initialized.";
    } else {
      greeting = "Predictive forecast initialized.";
    }

    // Determine "Main Focus"
    const projectCounts: Record<string, number> = {};
    let mainFocus = "general maintenance";
    let maxCount = 0;

    // Task Specifics
    let firstObjective = "";
    let morningCount = 0;
    let afternoonCount = 0;

    tasks.forEach(t => {
      // Focus calculation
      if (t.project?.name) {
        projectCounts[t.project.name] = (projectCounts[t.project.name] || 0) + 1;
        if (projectCounts[t.project.name] > maxCount) {
          maxCount = projectCounts[t.project.name];
          mainFocus = t.project.name;
        }
      }

      // Time block analysis
      if (t.startTime) {
        if (t.startTime < "12:00") morningCount++;
        else afternoonCount++;
        
        if (!firstObjective) firstObjective = t.title;
      }
    });

    if (!firstObjective && tasks.length > 0) {
      firstObjective = tasks[0].title;
    }

    let loadDistribution = "balanced";
    if (morningCount > afternoonCount * 2) loadDistribution = "front-loaded";
    if (afternoonCount > morningCount * 2) loadDistribution = "back-loaded";

    // 3. Advanced NLP Template Generation
    let body = "";
    let objectiveStr = "";
    let streakStr = "";

    if (totalTasks === 0) {
      if (timeContext === "past") body = "Your schedule was completely clear on this day. A quiet archive.";
      else if (timeContext === "future") body = "Your timeline is currently clear for this day. An open canvas awaits.";
      else body = "Your schedule is completely clear for today. It is an excellent opportunity for unstructured deep work or much-needed rest.";
    } else {
      // Time-aware structure
      const meetingText = meetingCount > 0 ? `**${meetingCount} collaborative block${meetingCount > 1 ? 's' : ''}**` : `**zero meetings**`;
      const taskText = regularTasksCount > 0 ? `**${regularTasksCount} core task${regularTasksCount > 1 ? 's' : ''}**` : `**zero tasks**`;
      
      const verbs = timeContext === "past" ? ["contained", "demanded", "was anchored by"] : ["contains", "demands", "is anchored by"];
      const v = verbs[Math.floor(Math.random() * verbs.length)];

      body = `Your timeline ${v} ${meetingText} and ${taskText}. `;
      
      if (loadDistribution === "front-loaded") {
        body += `Your schedule is heavily **front-loaded**, meaning you should aggressively protect your morning energy. `;
      } else if (loadDistribution === "back-loaded") {
        body += `Your schedule is **back-loaded**, so pace your morning to preserve cognitive endurance for the afternoon. `;
      }

      if (firstObjective) {
        objectiveStr = `Your primary tactical objective is **"${firstObjective}"**. `;
      }
    }

    if (streak > 2) {
      streakStr = `\n\nSystem Note: You are currently maintaining a **${streak}-day Elite Performance Streak**. Momentum is critical. Do not break the chain.`;
    }

    const finalBriefing = `${greeting} ${body}${objectiveStr}${streakStr}`;

    // Wait 1.5 seconds to simulate complex NLP processing for UX
    await new Promise(resolve => setTimeout(resolve, 1500));

    return {
      success: true,
      data: {
        briefing: finalBriefing,
        stats: {
          total: totalTasks,
          meetings: meetingCount,
          focus: mainFocus
        }
      }
    };
  } catch (error) {
    console.error("AI Briefing Error:", error);
    return { success: false, error: "Failed to establish neural link." };
  }
}
