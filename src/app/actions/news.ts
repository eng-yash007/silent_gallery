"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import Parser from "rss-parser";

const parser = new Parser();

export async function updateNewsTopic(prevState: any, formData: FormData) {
  const topic = formData.get("topic") as string;
  if (!topic) return { error: "Topic is required" };

  await prisma.userStat.update({
    where: { id: "default_user" },
    data: { newsTopic: topic }
  });

  revalidatePath("/settings");
  revalidatePath("/news");
  return { success: true };
}

export async function getLiveNews() {
  try {
    const stat = await prisma.userStat.findUnique({ where: { id: "default_user" } });
    const topic = stat?.newsTopic || "Artificial Intelligence";

    // Format topic for Flipboard (remove spaces, lowercase)
    const formattedTopic = topic.replace(/\s+/g, '').toLowerCase();
    const feedUrl = `https://flipboard.com/topic/${encodeURIComponent(formattedTopic)}.rss`;
    const feed = await parser.parseURL(feedUrl);

    // Get top 30 items
    const topItems = feed.items.slice(0, 30);
    
    // Shuffle the array to get a random set of 7 items for the refresh functionality
    const shuffled = topItems.sort(() => 0.5 - Math.random());
    
    // Map and return 7 items
    return shuffled.slice(0, 7).map(item => ({
      title: item.title,
      link: item.link,
      pubDate: item.pubDate,
      source: item.creator || item.author || "Global Feeds",
      contentSnippet: item.contentSnippet || item.title
    }));
  } catch (error) {
    console.error("Error fetching news:", error);
    return [];
  }
}

export async function refreshNewsFeed() {
  revalidatePath("/news");
}

import winkNLP from "wink-nlp";
import model from "wink-eng-lite-web-model";
const nlp = winkNLP(model);

export async function generateBriefing(text: string) {
  try {
    if (!text) return { error: "No text content found" };
    
    const doc = nlp.readDoc(text);
    
    // Get summary 
    const sentences = doc.sentences().out();
    
    // Calculate sentiment
    const sentimentScore = doc.out(nlp.its.sentiment);
    let sentiment = "Neutral";
    if (sentimentScore > 0.1) sentiment = "Positive";
    if (sentimentScore < -0.1) sentiment = "Negative";
    
    return {
      success: true,
      summary: sentences.length > 0 ? sentences : [text],
      sentiment
    };
  } catch (error) {
    console.error("Error generating briefing:", error);
    return { error: "Failed to generate briefing" };
  }
}
