"use server";

import prisma from "@/lib/prisma";

export type SearchResult = {
  id: string;
  title: string;
  subtitle: string;
  type: "Task" | "Project" | "Journal";
  url: string;
};

export async function searchGlobal(query: string): Promise<SearchResult[]> {
  if (!query || query.trim() === "") {
    return [];
  }

  const searchTerm = query.trim();
  const results: SearchResult[] = [];

  try {
    // Search Tasks
    const tasks = await prisma.task.findMany({
      where: {
        title: {
          contains: searchTerm
        }
      },
      take: 5,
      orderBy: { createdAt: 'desc' }
    });

    tasks.forEach(task => {
      results.push({
        id: task.id,
        title: task.title,
        subtitle: `Status: ${task.status} | Date: ${task.date || "Unscheduled"}`,
        type: "Task",
        url: `/?date=${task.date}`
      });
    });

    // Search Projects
    const projects = await prisma.project.findMany({
      where: {
        OR: [
          { name: { contains: searchTerm } },
          { description: { contains: searchTerm } }
        ]
      },
      take: 5,
      orderBy: { createdAt: 'desc' }
    });

    projects.forEach(project => {
      results.push({
        id: project.id,
        title: project.name,
        subtitle: project.description || `Status: ${project.status}`,
        type: "Project",
        url: `/projects`
      });
    });

    // Search Journal Entries
    const journals = await prisma.journalEntry.findMany({
      where: {
        OR: [
          { title: { contains: searchTerm } },
          { content: { contains: searchTerm } }
        ]
      },
      take: 5,
      orderBy: { createdAt: 'desc' }
    });

    journals.forEach(journal => {
      results.push({
        id: journal.id,
        title: journal.title,
        subtitle: journal.category ? `Category: ${journal.category}` : "Journal Entry",
        type: "Journal",
        url: `/journal`
      });
    });

    // Return combined results
    return results;

  } catch (error) {
    console.error("Error performing global search:", error);
    return [];
  }
}
