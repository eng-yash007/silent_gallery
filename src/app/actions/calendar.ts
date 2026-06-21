"use server";

import { google } from "googleapis";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { revalidatePath } from "next/cache";

// Helper to get authenticated Google Calendar client
async function getCalendarClient() {
  const session: any = await getServerSession(authOptions);
  
  if (!session || !session.accessToken) {
    throw new Error("Not authenticated or missing access token. Please sign in with Google.");
  }

  const oauth2Client = new google.auth.OAuth2();
  oauth2Client.setCredentials({ access_token: session.accessToken });

  return google.calendar({ version: "v3", auth: oauth2Client });
}

export async function getCalendarEvents() {
  try {
    const calendar = await getCalendarClient();
    
    const now = new Date();
    
    // Fetch from start of current month
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const timeMin = startOfMonth.toISOString();
    
    // Fetch up to end of next month (approx 60 days)
    const endOfNextMonth = new Date(now.getFullYear(), now.getMonth() + 2, 0);
    const timeMax = endOfNextMonth.toISOString();
    
    // Fetch upcoming events from primary calendar
    const res = await calendar.events.list({
      calendarId: "primary",
      timeMin: timeMin,
      timeMax: timeMax,
      maxResults: 250,
      singleEvents: true,
      orderBy: "startTime",
      conferenceDataVersion: 1, // Crucial for getting hangoutLink
    });

    return { success: true, events: res.data.items || [] };
  } catch (error: any) {
    console.error("Error fetching Google Calendar events:", error);
    return { success: false, error: error.message };
  }
}

export async function getCalendarEventsForDate(dateStr: string) {
  try {
    const calendar = await getCalendarClient();
    
    // dateStr is 'YYYY-MM-DD'
    // Create Date objects in local time equivalent for the start and end of that day
    // Wait, the user's timezone is tricky. Let's just use timezone bounds roughly or UTC bounds.
    // For exactness, if we assume the user is roughly around local timezone:
    const timeMin = new Date(`${dateStr}T00:00:00`).toISOString();
    const timeMax = new Date(`${dateStr}T23:59:59`).toISOString();
    
    const res = await calendar.events.list({
      calendarId: "primary",
      timeMin: timeMin,
      timeMax: timeMax,
      maxResults: 50,
      singleEvents: true,
      orderBy: "startTime",
    });

    return { success: true, events: res.data.items || [] };
  } catch (error: any) {
    // If not authenticated or API error, just fail silently and return no events
    return { success: false, events: [] };
  }
}

export async function createCalendarEvent(prevState: any, formData: FormData) {
  try {
    const calendar = await getCalendarClient();
    
    const summary = formData.get("summary") as string;
    const description = formData.get("description") as string;
    const date = formData.get("date") as string; // YYYY-MM-DD
    const startTime = formData.get("startTime") as string; // HH:MM
    const endTime = formData.get("endTime") as string; // HH:MM
    const createMeet = formData.get("createMeet") === "on";
    const attendeesStr = formData.get("attendees") as string;

    if (!summary || !date || !startTime || !endTime) {
      return { error: "Missing required fields" };
    }

    const startDateTime = new Date(`${date}T${startTime}:00`).toISOString();
    const endDateTime = new Date(`${date}T${endTime}:00`).toISOString();

    const event: any = {
      summary,
      description,
      start: {
        dateTime: startDateTime,
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      },
      end: {
        dateTime: endDateTime,
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      },
    };

    if (attendeesStr) {
      const attendeesArray = attendeesStr.split(',').map(email => ({ email: email.trim() }));
      event.attendees = attendeesArray;
    }

    if (createMeet) {
      event.conferenceData = {
        createRequest: {
          requestId: `meet-${Date.now()}`,
          conferenceSolutionKey: { type: "hangoutsMeet" }
        }
      };
    }

    await calendar.events.insert({
      calendarId: "primary",
      conferenceDataVersion: 1,
      sendUpdates: "all",
      requestBody: event,
    });

    revalidatePath("/calendar");
    revalidatePath("/meetings");
    return { success: true };
  } catch (error: any) {
    console.error("Error creating Google Calendar event:", error);
    return { error: error.message };
  }
}

export async function deleteCalendarEvent(eventId: string) {
  try {
    const calendar = await getCalendarClient();
    
    await calendar.events.delete({
      calendarId: "primary",
      eventId: eventId,
    });

    revalidatePath("/calendar");
    revalidatePath("/meetings");
    return { success: true };
  } catch (error: any) {
    console.error("Error deleting Google Calendar event:", error);
    return { error: error.message };
  }
}

export async function createInstantMeet() {
  try {
    const calendar = await getCalendarClient();
    const now = new Date();
    const nextHour = new Date(now.getTime() + 60 * 60 * 1000);

    const event: any = {
      summary: "Instant Meeting (Silent Gallery)",
      start: {
        dateTime: now.toISOString(),
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      },
      end: {
        dateTime: nextHour.toISOString(),
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      },
      conferenceData: {
        createRequest: {
          requestId: `instant-meet-${Date.now()}`,
          conferenceSolutionKey: { type: "hangoutsMeet" }
        }
      }
    };

    const res = await calendar.events.insert({
      calendarId: "primary",
      conferenceDataVersion: 1,
      requestBody: event,
    });

    revalidatePath("/calendar");
    revalidatePath("/meetings");
    
    // Return the generated meet link
    const meetLink = res.data.hangoutLink || (res.data.conferenceData?.entryPoints || []).find((ep: any) => ep.entryPointType === 'video')?.uri;
    
    return { success: true, meetLink };
  } catch (error: any) {
    console.error("Error creating instant meet:", error);
    return { error: error.message };
  }
}

