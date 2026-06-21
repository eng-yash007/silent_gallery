"use client";

import { useState } from "react";
import EmailRow from "./EmailRow";
import { ProcessedEmail } from "@/app/actions/mailbox";

type TabType = 'primary' | 'promotions' | 'social' | 'otp';

export default function MailboxFeed({ emails }: { emails: ProcessedEmail[] }) {
  const [activeTab, setActiveTab] = useState<TabType>('primary');

  // Filter emails based on the active tab
  const filteredEmails = emails.filter((email) => {
    if (activeTab === 'otp') return email.category === 'otp';
    if (activeTab === 'promotions') return email.category === 'promotion';
    if (activeTab === 'social') return email.category === 'social';
    // Primary tab shows everything else (important, general, urgent, meeting)
    return !['otp', 'promotion', 'social'].includes(email.category);
  });

  const tabs: { id: TabType; label: string; icon: string }[] = [
    { id: 'primary', label: 'Primary', icon: 'inbox' },
    { id: 'otp', label: 'OTPs', icon: 'password' },
    { id: 'promotions', label: 'Promotions', icon: 'sell' },
    { id: 'social', label: 'Social', icon: 'group' },
  ];

  return (
    <section>
      {/* Tabs Header */}
      <div className="flex justify-between items-center mb-6 overflow-x-auto gap-4 pb-2 border-b border-outline-variant/20">
        <div className="flex items-center gap-8 shrink-0 px-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 pb-4 text-sm font-bold tracking-tight transition-all relative ${
                activeTab === tab.id
                  ? 'text-secondary'
                  : 'text-zinc-400 hover:text-zinc-600'
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">
                {tab.icon}
              </span>
              {tab.label}
              {/* Active Tab Indicator Line */}
              {activeTab === tab.id && (
                <span className="absolute bottom-[-1px] left-0 w-full h-0.5 bg-secondary rounded-t-full"></span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Feed List */}
      <div className="space-y-4 min-h-[400px]">
        {filteredEmails.length > 0 ? (
          filteredEmails.map((email) => (
            <EmailRow key={email.id} email={email} />
          ))
        ) : (
          <div className="text-center py-20 flex flex-col items-center justify-center animate-in fade-in duration-500">
            <span className="material-symbols-outlined text-6xl text-zinc-200 mb-4">
              {tabs.find((t) => t.id === activeTab)?.icon}
            </span>
            <p className="text-zinc-500 font-medium">No emails found in this tab.</p>
            <p className="text-zinc-400 text-sm mt-1">You're all caught up!</p>
          </div>
        )}
      </div>
    </section>
  );
}
