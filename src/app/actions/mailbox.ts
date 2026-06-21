"use server";

import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { google } from "googleapis";

function getHeader(headers: any[], name: string): string {
  if (!headers) return "";
  const header = headers.find((h: any) => h.name.toLowerCase() === name.toLowerCase());
  return header ? header.value : "";
}

export type EmailCategory = 'urgent' | 'meeting' | 'important' | 'general' | 'promotion' | 'social' | 'otp';

export interface ProcessedEmail {
  id: string;
  threadId: string;
  snippet: string;
  subject: string;
  from: string;
  initials: string;
  date: string;
  isUnread: boolean;
  category: EmailCategory;
}

export interface MailboxData {
  emails: ProcessedEmail[];
  stats: {
    unreadImportant: number;
    activeMeetings: number;
    urgentCount: number;
  };
  topSnippets: {
    important: string | null;
    meeting: string | null;
    urgent: string | null;
  };
}

export async function fetchAndClassifyEmails(): Promise<{ success: boolean; data?: MailboxData; error?: string }> {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !(session as any).accessToken) {
      return { success: false, error: "Not authenticated or missing access token. Please sign in with Google." };
    }

    const auth = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET
    );
    auth.setCredentials({ access_token: (session as any).accessToken });

    const gmail = google.gmail({ version: "v1", auth });

    // Fetch up to 40 recent emails from the inbox
    const res = await gmail.users.messages.list({
      userId: "me",
      maxResults: 40,
      q: "in:inbox",
    });

    const messages = res.data.messages || [];

    if (messages.length === 0) {
      return { success: true, data: { emails: [], stats: { unreadImportant: 0, activeMeetings: 0, urgentCount: 0 }, topSnippets: { important: null, meeting: null, urgent: null } } };
    }

    // Fetch details in parallel
    const emailPromises = messages.map(async (msg) => {
      try {
        const msgRes = await gmail.users.messages.get({
          userId: "me",
          id: msg.id!,
          format: "metadata",
          metadataHeaders: ["Subject", "From", "Date"],
        });

        const payload = msgRes.data.payload;
        const headers = payload?.headers || [];
        const labelIds = msgRes.data.labelIds || [];

        let from = getHeader(headers, "From");
        const nameMatch = from.match(/^([^<]+)/);
        const senderName = nameMatch ? nameMatch[1].replace(/"/g, '').trim() : from;
        
        const initialsMatch = senderName.match(/\b\w/g) || [];
        const initials = ((initialsMatch.shift() || '') + (initialsMatch.pop() || '')).toUpperCase();
        
        const subject = getHeader(headers, "Subject") || "No Subject";
        const snippet = msgRes.data.snippet || "";
        const isUnread = labelIds.includes("UNREAD");
        const isImportantLabel = labelIds.includes("IMPORTANT");
        const isPromotionLabel = labelIds.includes("CATEGORY_PROMOTIONS");
        const isSocialLabel = labelIds.includes("CATEGORY_SOCIAL");

        // Smart Classification Engine
        let category: EmailCategory = 'general';
        const searchStr = (subject + " " + snippet).toLowerCase();

        // 1. OTP / Verification checks first (high priority parsing)
        if (searchStr.includes("otp") || searchStr.includes("verification code") || searchStr.includes("security alert") || searchStr.includes("password reset") || searchStr.includes("confirm your email")) {
          category = 'otp';
        } else if (searchStr.includes("urgent") || searchStr.includes("asap") || searchStr.includes("action required")) {
          category = 'urgent';
        } else if (searchStr.includes("invite") || searchStr.includes("meeting") || searchStr.includes("zoom.us") || searchStr.includes("meet.google")) {
          category = 'meeting';
        } else if (isImportantLabel) {
          category = 'important';
        } else if (isPromotionLabel || searchStr.includes("offer") || searchStr.includes("discount") || searchStr.includes("sale") || searchStr.includes("newsletter")) {
          category = 'promotion';
        } else if (isSocialLabel) {
          category = 'social';
        }

        return {
          id: msgRes.data.id!,
          threadId: msgRes.data.threadId!,
          snippet,
          subject,
          from: senderName,
          initials: initials || "?",
          date: getHeader(headers, "Date"),
          isUnread,
          category
        };
      } catch (err) {
        return null;
      }
    });

    const emailDetails = (await Promise.all(emailPromises)).filter(e => e !== null) as ProcessedEmail[];

    // Calculate stats
    const stats = {
      unreadImportant: emailDetails.filter(e => e.isUnread && (e.category === 'important' || e.category === 'urgent')).length,
      activeMeetings: emailDetails.filter(e => e.category === 'meeting').length,
      urgentCount: emailDetails.filter(e => e.category === 'urgent').length,
    };

    // Extract top snippets for the AI Synthesis cards
    const topSnippets = {
      important: emailDetails.find(e => e.category === 'important' && e.isUnread)?.subject || emailDetails.find(e => e.category === 'important')?.subject || "No critical updates at this time.",
      meeting: emailDetails.find(e => e.category === 'meeting')?.subject || "No upcoming meetings found in recent mail.",
      urgent: emailDetails.find(e => e.category === 'urgent')?.subject || "No urgent alerts detected.",
    };

    return { success: true, data: { emails: emailDetails, stats, topSnippets } };
  } catch (error: any) {
    console.error("Error fetching Google Mail:", error);
    return { success: false, error: error.message };
  }
}

// Interactivity Actions
export async function markEmailAsRead(messageId: string): Promise<{ success: boolean; error?: string }> {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !(session as any).accessToken) throw new Error("Unauthorized");

    const auth = new google.auth.OAuth2();
    auth.setCredentials({ access_token: (session as any).accessToken });
    const gmail = google.gmail({ version: "v1", auth });

    await gmail.users.messages.modify({
      userId: "me",
      id: messageId,
      requestBody: {
        removeLabelIds: ["UNREAD"],
      },
    });

    return { success: true };
  } catch (error: any) {
    console.error("Error marking email as read:", error);
    return { success: false, error: error.message };
  }
}

export async function archiveEmail(messageId: string): Promise<{ success: boolean; error?: string }> {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !(session as any).accessToken) throw new Error("Unauthorized");

    const auth = new google.auth.OAuth2();
    auth.setCredentials({ access_token: (session as any).accessToken });
    const gmail = google.gmail({ version: "v1", auth });

    await gmail.users.messages.modify({
      userId: "me",
      id: messageId,
      requestBody: {
        removeLabelIds: ["INBOX"],
      },
    });

    return { success: true };
  } catch (error: any) {
    console.error("Error archiving email:", error);
    return { success: false, error: error.message };
  }
}

export async function getFullEmail(messageId: string): Promise<{ success: boolean; data?: any; error?: string }> {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !(session as any).accessToken) throw new Error("Unauthorized");

    const auth = new google.auth.OAuth2();
    auth.setCredentials({ access_token: (session as any).accessToken });
    const gmail = google.gmail({ version: "v1", auth });

    const msgRes = await gmail.users.messages.get({
      userId: "me",
      id: messageId,
      format: "full",
    });

    const payload = msgRes.data.payload;
    const headers = payload?.headers || [];
    
    let from = getHeader(headers, "From");
    const subject = getHeader(headers, "Subject") || "No Subject";
    const date = getHeader(headers, "Date");

    // Attempt to extract body content
    let bodyData = "";
    if (payload?.body?.data) {
      bodyData = payload.body.data;
    } else if (payload?.parts && payload.parts.length > 0) {
      // Find HTML part or plain text part
      const htmlPart = payload.parts.find((p: any) => p.mimeType === "text/html");
      const textPart = payload.parts.find((p: any) => p.mimeType === "text/plain");
      if (htmlPart && htmlPart.body?.data) {
        bodyData = htmlPart.body.data;
      } else if (textPart && textPart.body?.data) {
        bodyData = textPart.body.data;
      } else if (payload.parts[0]?.parts) {
        // Deeply nested multipart
        const nestedHtml = payload.parts[0].parts.find((p: any) => p.mimeType === "text/html");
        if (nestedHtml && nestedHtml.body?.data) bodyData = nestedHtml.body.data;
      }
    }

    const htmlBody = bodyData ? Buffer.from(bodyData, "base64").toString("utf-8") : "<p>Unable to parse email body.</p>";

    return { success: true, data: { id: messageId, from, subject, date, htmlBody } };
  } catch (error: any) {
    console.error("Error fetching full email:", error);
    return { success: false, error: error.message };
  }
}
