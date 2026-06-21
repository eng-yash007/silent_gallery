"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getProjects() {
  const projects = await prisma.project.findMany({
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
  const project = await prisma.project.findUnique({
    where: { id },
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
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  
  if (!name) return { error: "Project name is required" };

  await prisma.project.create({
    data: {
      name,
      description
    }
  });

  revalidatePath("/projects");
  revalidatePath("/");
  return { success: true };
}

export async function updateProjectStatus(id: string, status: string) {
  await prisma.project.update({
    where: { id },
    data: { status }
  });

  revalidatePath("/projects");
  return { success: true };
}

export async function deleteProject(id: string) {
  await prisma.project.delete({
    where: { id }
  });

  revalidatePath("/projects");
  return { success: true };
}
