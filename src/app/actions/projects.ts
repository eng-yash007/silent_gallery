"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { getAuthUser } from "@/lib/auth";

export async function getProjects() {
  const user = await getAuthUser();
  const projects = await prisma.project.findMany({
    where: { userId: user.id },
    include: {
      tasks: true
    },
    orderBy: { createdAt: "desc" },
  });

  return projects.map((project: any) => {
    const totalTasks = project.tasks.length;
    const completedTasks = project.tasks.filter((t: any) => t.status === "completed").length;
    const progress = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
    
    return {
      ...project,
      progress,
      totalTasks,
      completedTasks,
      remainingTasks: totalTasks - completedTasks
    };
  });
}

export async function getProjectById(id: string) {
  const user = await getAuthUser();
  const project = await prisma.project.findUnique({
    where: { id, userId: user.id },
    include: {
      tasks: {
        orderBy: { createdAt: "desc" }
      }
    }
  });

  if (!project) return null;

  const totalTasks = project.tasks.length;
  const completedTasks = project.tasks.filter((t: any) => t.status === "completed").length;
  const progress = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  return {
    ...project,
    progress,
    totalTasks,
    completedTasks,
    remainingTasks: totalTasks - completedTasks
  };
}

export async function createProject(prevState: any, formData: FormData) {
  const user = await getAuthUser();
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  
  if (!name) return { error: "Project name is required" };

  await prisma.project.create({
    data: {
      name,
      description,
      userId: user.id
    }
  });

  revalidatePath("/projects");
  revalidatePath("/");
  return { success: true };
}

export async function updateProjectStatus(id: string, status: string) {
  const user = await getAuthUser();
  await prisma.project.update({
    where: { id, userId: user.id },
    data: { status }
  });

  revalidatePath("/projects");
  return { success: true };
}

export async function deleteProject(id: string) {
  const user = await getAuthUser();
  await prisma.project.delete({
    where: { id, userId: user.id }
  });

  revalidatePath("/projects");
  return { success: true };
}
