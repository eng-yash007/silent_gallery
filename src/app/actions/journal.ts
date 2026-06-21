"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getJournalEntries(query?: string) {
  if (query) {
    return await prisma.journalEntry.findMany({
      where: {
        OR: [
          { title: { contains: query } },
          { content: { contains: query } },
          { tags: { contains: query } },
          { category: { contains: query } }
        ]
      },
      orderBy: { createdAt: "desc" },
    });
  }

  return await prisma.journalEntry.findMany({
    orderBy: { createdAt: "desc" },
  });
}

import winkNLP from "wink-nlp";
import model from "wink-eng-lite-web-model";
const nlp = winkNLP(model);

export async function createJournalEntry(prevState: any, formData: FormData) {
  const title = formData.get("title") as string;
  const content = formData.get("content") as string;
  const category = formData.get("category") as string;
  
  if (!title || !content) {
    return { error: "Title and content are required" };
  }

  // 1. NLP Sentiment Analysis
  const doc = nlp.readDoc(content);
  const sentimentScore = doc.out(nlp.its.sentiment);
  let sentiment = "Neutral";
  if (sentimentScore > 0.1) sentiment = "Positive";
  if (sentimentScore < -0.1) sentiment = "Negative";

  // 2. Extract Tags (proper nouns & important entities)
  const nouns = doc.tokens().filter((t) => t.out(nlp.its.pos) === 'NOUN' && t.out().length > 4).out();
  // Get up to 3 unique tags
  const tagsArr = Array.from(new Set(nouns.map(n => n.toLowerCase()))).slice(0, 3);
  const tags = tagsArr.length > 0 ? tagsArr.join(",") : "";

  await prisma.journalEntry.create({
    data: {
      title,
      content,
      category: category || "Thought",
      sentiment,
      tags
    }
  });

  revalidatePath("/journal");
  return { success: true };
}

export async function deleteJournalEntry(id: string) {
  await prisma.journalEntry.delete({
    where: { id }
  });

  revalidatePath("/journal");
  return { success: true };
}

export async function saveNewsToJournal(title: string, url: string) {
  try {
    await prisma.journalEntry.create({
      data: {
        title: "News Insight",
        content: `**Research Saved:** [${title}](${url})`,
        category: "Research"
      }
    });
    revalidatePath("/journal");
    return { success: true };
  } catch (error) {
    console.error("Error saving news to journal:", error);
    return { error: "Failed to save to journal" };
  }
}
