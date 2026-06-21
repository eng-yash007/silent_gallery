"use server";

import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { google } from "googleapis";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export type NotificationType = 'task_overdue' | 'task_due_soon' | 'meeting_soon';

export interface SmartNotification {
  id: string;
  referenceId: string;
  type: NotificationType;
  title: string;
  description: string;
  timeDisplay: string;
  isRead: boolean;
  link?: string;
  createdAt: Date;
}

// Poller function to check for upcoming events and create DB records
export async function pollAndCreateNotifications() {
  try {
    const session = await getServerSession(authOptions);
    const newNotifications: any[] = [];
    const now = new Date();

    // 1. Check Local Tasks
    try {
      const tasks = await prisma.task.findMany({
        where: { status: "pending" }
      });

      for (const task of tasks) {
        if (!task.date) continue;
        
        let targetTimeStr = task.startTime || task.endTime;
        
        // If the task has no specific time, we don't trigger a time-sensitive push alert
        if (!targetTimeStr) continue;
        
        // Force IST timezone (+05:30) so the Next.js server parses it correctly regardless of local env TZ
        const dueDateTime = new Date(`${task.date}T${targetTimeStr}:00+05:30`);
        
        if (isNaN(dueDateTime.getTime())) continue;

        const timeDiffMs = dueDateTime.getTime() - now.getTime();
        const hoursDiff = timeDiffMs / (1000 * 60 * 60);

        let type: NotificationType | null = null;
        let title = "";
        let timeDisplay = "";

        if (hoursDiff < 0 && hoursDiff > -24) { // Only notify if overdue within last 24h to avoid spam
          type = 'task_overdue';
          title = "Task Overdue";
          timeDisplay = "Overdue";
        } else if (hoursDiff > 0 && hoursDiff <= 1) { // Notify if due within 1 hour
          type = 'task_due_soon';
          title = "Task Due Soon";
          timeDisplay = `in ${Math.floor(hoursDiff * 60)} mins`;
        }

        if (type) {
          const referenceId = `task-${task.id}-${type}`;
          
          // Check if notification already exists
          const existing = await prisma.notification.findUnique({
            where: { referenceId }
          });

          if (!existing) {
            const notif = await prisma.notification.create({
              data: {
                referenceId,
                title,
                description: task.title,
                type,
                timeString: timeDisplay,
                link: "/projects"
              }
            });
            newNotifications.push(notif);
          }
        }
      }
    } catch (e) {
      console.error("Error checking tasks", e);
    }

    // 2. Check Google Calendar (Meetings Soon)
    if (session && (session as any).accessToken) {
      try {
        const auth = new google.auth.OAuth2();
        auth.setCredentials({ access_token: (session as any).accessToken });
        const calendar = google.calendar({ version: 'v3', auth });

        // Get events for the next 15 mins
        const next15m = new Date(now.getTime() + 15 * 60 * 1000);
        
        const res = await calendar.events.list({
          calendarId: 'primary',
          timeMin: now.toISOString(),
          timeMax: next15m.toISOString(),
          singleEvents: true,
          orderBy: 'startTime',
        });

        const events = res.data.items || [];

        for (const event of events) {
          if (event.start?.dateTime) {
            const startTime = new Date(event.start.dateTime);
            const timeDiffMs = startTime.getTime() - now.getTime();
            const minsDiff = Math.floor(timeDiffMs / (1000 * 60));

            if (minsDiff >= 0 && minsDiff <= 15) {
              const referenceId = `cal-${event.id}-soon`;
              
              const existing = await prisma.notification.findUnique({
                where: { referenceId }
              });

              if (!existing) {
                const notif = await prisma.notification.create({
                  data: {
                    referenceId,
                    title: "Meeting starting soon",
                    description: event.summary || "No Title",
                    type: "meeting_soon",
                    timeString: `in ${minsDiff} mins`,
                    link: "/calendar"
                  }
                });
                newNotifications.push(notif);
              }
            }
          }
        }
      } catch (e) {
        console.error("Error fetching calendar", e);
      }
    }

    return { success: true, newNotifications };

  } catch (error: any) {
    console.error("Notification engine error:", error);
    return { success: false, error: error.message };
  }
}

// Fetch historical notifications
export async function getDbNotifications() {
  try {
    const notifications = await prisma.notification.findMany({
      orderBy: { createdAt: "desc" },
      take: 50
    });
    return { success: true, data: notifications };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function clearAllNotifications() {
  try {
    await prisma.notification.deleteMany();
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function markAllNotificationsRead() {
  try {
    await prisma.notification.updateMany({
      where: { isRead: false },
      data: { isRead: true }
    });
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
