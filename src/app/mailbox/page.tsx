import Header from "@/components/Header";
import { fetchAndClassifyEmails } from "../actions/mailbox";
import Link from "next/link";
import MailboxFeed from "@/components/MailboxFeed";
import MailboxStickman from "@/components/Stickman/MailboxStickman";

export default async function Mailbox() {
  const result = await fetchAndClassifyEmails();

  if (!result.success || !result.data) {
    return (
      <>
        <Header title="Mailbox" />
        <main className="w-full min-h-screen pt-32 pb-20 px-6 md:pl-80 md:pr-10 relative z-10 flex items-center justify-center">
          <div className="text-center bg-surface-container-low p-10 rounded-3xl border border-outline-variant/10 max-w-lg">
            <span className="material-symbols-outlined text-5xl text-outline mb-4">mail_lock</span>
            <h2 className="text-2xl font-bold text-on-surface mb-2">Gmail Access Required</h2>
            <p className="text-outline-variant mb-6 leading-relaxed">
              To sync your emails with the smart classification engine, please ensure the Gmail API is enabled in your Google Cloud Console and you have granted the required permissions during login.
            </p>
            <Link href="/login" className="px-6 py-3 bg-secondary text-on-secondary rounded-full font-bold shadow-lg hover:shadow-xl transition-all inline-block">
              Reconnect Account
            </Link>
          </div>
        </main>
      </>
    );
  }

  const { emails, stats, topSnippets } = result.data;

  // Format time function
  const formatTime = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <>
      <Header title="Mailbox" />
      <main className="w-full min-h-screen pt-32 pb-20 px-6 md:pl-80 md:pr-10 relative z-10">
        <section className="mb-20 mt-8 relative">
          <MailboxStickman />
          <div className="flex items-baseline gap-4 mb-8 relative z-40">
            <h2 className="text-[11px] font-bold uppercase tracking-[0.2em] text-secondary">AI Synthesis</h2>
            <div className="h-[1px] flex-grow bg-outline-variant/15"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:h-[280px]">
            {/* Important */}
            <div className="col-span-1 md:col-span-5 bg-surface-container-lowest rounded-xl p-8 flex flex-col justify-between group cursor-pointer hover:shadow-xl hover:shadow-zinc-200/40 transition-all duration-500 border border-transparent hover:border-secondary/10 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/5 rounded-bl-full -z-10 group-hover:scale-110 transition-transform"></div>
              <div className="flex justify-between items-start mb-4 md:mb-0">
                <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center text-secondary">
                  <span className="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
                </div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-outline">
                  {stats.unreadImportant < 10 ? `0${stats.unreadImportant}` : stats.unreadImportant} Unread
                </span>
              </div>
              <div>
                <h3 className="text-xl font-bold tracking-tight text-on-surface mb-2">Important</h3>
                <p className="text-outline-variant leading-relaxed text-sm line-clamp-3">
                  {topSnippets.important}
                </p>
              </div>
            </div>
            
            {/* Meetings */}
            <div className="col-span-1 md:col-span-4 bg-surface-container-highest text-on-surface rounded-xl p-8 flex flex-col justify-between group cursor-pointer hover:shadow-xl hover:shadow-black/10 transition-all duration-500 relative overflow-hidden">
              <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-white/5 rounded-full blur-3xl pointer-events-none group-hover:bg-white/10 transition-colors duration-700"></div>
              
              <div className="flex justify-between items-start mb-12 relative z-10">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-on-surface">
                  <span className="material-symbols-outlined">video_chat</span>
                </div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-outline">
                  {stats.activeMeetings} Active
                </span>
              </div>
              <div>
                <h3 className="text-xl font-bold tracking-tight mb-2">Meetings</h3>
                <p className="text-outline leading-relaxed text-sm line-clamp-3">
                  {topSnippets.meeting}
                </p>
              </div>
            </div>
            
            {/* Urgent & Spam (Stacked) */}
            <div className="col-span-1 md:col-span-3 flex flex-col gap-6">
              <div className="h-full md:h-1/2 bg-error-container/10 rounded-xl p-6 flex flex-col justify-center border border-error/5 hover:bg-error-container/20 transition-colors cursor-pointer group relative overflow-hidden">
                <div className="flex items-center gap-3 mb-2">
                  <span className="material-symbols-outlined text-error text-lg">priority_high</span>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-error">Urgent</span>
                </div>
                <p className="text-xs text-on-error-container font-medium line-clamp-2">
                  {stats.urgentCount > 0 ? topSnippets.urgent : "No urgent items detected."}
                </p>
              </div>
              <div className="h-full md:h-1/2 bg-surface-container-low rounded-xl p-6 flex flex-col justify-center opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition-all cursor-pointer">
                <div className="flex items-center gap-3 mb-2">
                  <span className="material-symbols-outlined text-outline text-lg">auto_delete</span>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-outline">Spam</span>
                </div>
                <p className="text-xs text-outline-variant italic">
                  Filtered by Gmail AI automatically.
                </p>
              </div>
            </div>
          </div>
        </section>

        <MailboxFeed emails={emails} />

        <footer className="mt-24 py-12 flex flex-col items-center">
          <div className="w-16 h-[1px] bg-outline-variant/15 mb-8"></div>
          <p className="text-outline text-sm italic font-light max-w-lg text-center leading-relaxed">
            "The art of communication is the language of leadership. Clarity in your mailbox is the first step toward clarity in your mission."
          </p>
        </footer>

      </main>
      
      {/* Contextual FAB */}
      <div className="fixed bottom-10 right-10 hidden md:flex flex-col gap-4">
        <button className="w-14 h-14 rounded-full bg-surface-container-highest text-on-surface shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all group border border-outline-variant/10">
          <span className="material-symbols-outlined text-2xl">magic_button</span>
          <div className="absolute right-16 bg-surface-container-highest text-on-surface text-[10px] font-bold uppercase tracking-widest px-4 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-xl border border-outline-variant/10">
            AI Deep Draft
          </div>
        </button>
      </div>
    </>
  );
}
