"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getTasks() {
  return await prisma.task.findMany({
    orderBy: { createdAt: "desc" },
  });
}

export async function createTask(formData: FormData) {
  const title = formData.get("title") as string;
  const startTime = formData.get("startTime") as string | null;
  const endTime = formData.get("endTime") as string | null;
  
  if (!title) return { error: "Title is required" };

  await prisma.task.create({
    data: {
      title,
      startTime,
      endTime,
      source: "local"
    }
  });

  revalidatePath("/");
  return { success: true };
}

export async function toggleTaskStatus(id: string, currentStatus: string) {
  const newStatus = currentStatus === "pending" ? "completed" : "pending";
  
  await prisma.task.update({
    where: { id },
    data: { status: newStatus }
  });

  revalidatePath("/");
  return { success: true };
}

export async function deleteTask(id: string) {
  await prisma.task.delete({
    where: { id }
  });

  revalidatePath("/");
  return { success: true };
}
