"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { getAuthUser } from "@/lib/auth";

export async function getTasks() {
  const user = await getAuthUser();
  return await prisma.task.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
  });
}

export async function getTasksByDate(date: string) {
  const user = await getAuthUser();
  const tasks = await prisma.task.findMany({
    where: { date, userId: user.id },
    // Order by createdAt first, then we will sort in JS to handle null startTimes correctly
    orderBy: { createdAt: "asc" },
  });

  // Sort chronologically: tasks with startTime go first, sorted by time. Tasks without startTime go to the bottom.
  return tasks.sort((a, b) => {
    if (a.startTime && b.startTime) {
      return a.startTime.localeCompare(b.startTime);
    }
    if (a.startTime && !b.startTime) return -1;
    if (!a.startTime && b.startTime) return 1;
    return 0; // Both no startTime, preserve createdAt order
  });
}

export async function createTask(prevState: any, formData: FormData) {
  const user = await getAuthUser();
  const title = formData.get("title") as string;
  let date = formData.get("date") as string;
  const startTime = formData.get("startTime") as string | null;
  const endTime = formData.get("endTime") as string | null;
  const projectId = formData.get("projectId") as string | null;
  
  if (!title) return { error: "Title is required" };
  if (!date) {
    // default to today
    date = new Date().toISOString().split('T')[0];
  }

  await prisma.task.create({
    data: {
      title,
      date,
      startTime,
      endTime,
      source: "local",
      userId: user.id,
      ...(projectId ? { projectId } : {})
    }
  });

  await syncStreak();
  revalidatePath("/");
  revalidatePath("/upcoming");
  revalidatePath("/projects");
  return { success: true };
}

export async function toggleTaskStatus(id: string, currentStatus: string) {
  const user = await getAuthUser();
  const newStatus = currentStatus === "pending" ? "completed" : "pending";
  
  await prisma.task.update({
    where: { id, userId: user.id },
    data: { status: newStatus }
  });

  await syncStreak();
  revalidatePath("/");
  revalidatePath("/upcoming");
  revalidatePath("/projects");
  return { success: true };
}

export async function deleteTask(id: string) {
  const user = await getAuthUser();
  await prisma.task.delete({
    where: { id, userId: user.id }
  });

  await syncStreak();
  revalidatePath("/");
  revalidatePath("/upcoming");
  revalidatePath("/projects");
  return { success: true };
}

export async function syncStreak() {
  const user = await getAuthUser();
  const todayDate = new Date();
  const today = todayDate.toISOString().split('T')[0];
  
  let stat = await prisma.userStat.findUnique({ where: { userId: user.id } });
  if (!stat) {
    stat = await prisma.userStat.create({
      data: { userId: user.id, currentStreak: 0, lastVisitDate: today, lastStreakIncrement: "" }
    });
  } 

  // Check if streak is broken (didn't visit yesterday AND didn't increment yesterday)
  const yesterdayDate = new Date(todayDate);
  yesterdayDate.setDate(yesterdayDate.getDate() - 1);
  const yesterday = yesterdayDate.toISOString().split('T')[0];

  if (stat.lastVisitDate !== today) {
    // If last visit was before yesterday, and last increment wasn't yesterday -> streak broken
    if (stat.lastVisitDate < yesterday && stat.lastStreakIncrement !== yesterday) {
      stat = await prisma.userStat.update({
        where: { userId: user.id },
        data: { currentStreak: 0, lastVisitDate: today }
      });
    } else {
      stat = await prisma.userStat.update({
        where: { userId: user.id },
        data: { lastVisitDate: today }
      });
    }
  }

  // Calculate completion for today
  const tasks = await prisma.task.findMany({ where: { date: today, userId: user.id } });
  if (tasks.length > 0) {
    const completed = tasks.filter(t => t.status === "completed").length;
    const ratio = completed / tasks.length;

    // Increment INSTANTLY if > 70% and hasn't been incremented today
    if (ratio >= 0.7 && stat.lastStreakIncrement !== today) {
      stat = await prisma.userStat.update({
        where: { userId: user.id },
        data: { 
          currentStreak: stat.currentStreak + 1,
          lastStreakIncrement: today
        }
      });
    }
  }

  return stat;
}
