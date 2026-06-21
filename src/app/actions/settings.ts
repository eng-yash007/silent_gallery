"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { syncStreak } from "@/app/actions/tasks";

export async function getUserProfile() {
  // Sync streak to ensure everything is up to date
  await syncStreak();
  
  const stat = await prisma.userStat.findUnique({ where: { id: "default_user" } });
  
  if (!stat) {
    return { success: false, error: "User stats not found" };
  }

  // Calculate true Deep Work Logged
  // We'll calculate it by taking the number of completed tasks and multiplying by the user's focusDuration
  const completedTasksCount = await prisma.task.count({
    where: { status: "completed" }
  });

  const totalMinutes = completedTasksCount * stat.focusDuration;
  const deepWorkHours = Math.floor(totalMinutes / 60);

  // Determine Tier
  let tier = "Starter Tier";
  if (stat.currentStreak >= 30) tier = "Master Tier";
  else if (stat.currentStreak >= 7) tier = "Elite Tier";

  return {
    success: true,
    data: {
      theme: stat.theme,
      focusDuration: stat.focusDuration,
      silentMode: stat.silentMode,
      newsTopic: stat.newsTopic,
      deepWorkHours,
      memberSince: stat.createdAt.toISOString(),
      currentStreak: stat.currentStreak,
      tier
    }
  };
}

export async function updateSetting(key: 'theme' | 'focusDuration' | 'silentMode' | 'newsTopic', value: any) {
  try {
    await prisma.userStat.update({
      where: { id: "default_user" },
      data: {
        [key]: value
      }
    });

    revalidatePath("/settings");
    revalidatePath("/"); // Update anywhere it might be used
    return { success: true };
  } catch (e: any) {
    console.error("Failed to update setting", e);
    return { success: false, error: e.message };
  }
}
