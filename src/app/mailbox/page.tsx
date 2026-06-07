import Header from "@/components/Header";

export default function Mailbox() {
  return (
    <>
      <Header title="Mailbox" />
      <main className="w-full min-h-screen pt-32 pb-20 px-6 md:pl-80 md:pr-10 relative z-10">
        <section className="mb-20 mt-8">
          <div className="flex items-baseline gap-4 mb-8">
            <h2 className="text-[11px] font-bold uppercase tracking-[0.2em] text-secondary">AI Synthesis</h2>
            <div className="h-[1px] flex-grow bg-outline-variant/15"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:h-[280px]">
            {/* Important */}
            <div className="col-span-1 md:col-span-5 bg-surface-container-lowest rounded-xl p-8 flex flex-col justify-between group cursor-pointer hover:shadow-xl hover:shadow-zinc-200/40 transition-all duration-500 border border-transparent hover:border-secondary/10">
              <div className="flex justify-between items-start mb-4 md:mb-0">
                <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center text-secondary">
                  <span className="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
                </div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">04 Unread</span>
              </div>
              <div>
                <h3 className="text-xl font-bold tracking-tight text-on-surface mb-2">Important</h3>
                <p className="text-zinc-500 leading-relaxed text-sm">
                  Investor updates from Q3 and three partnership proposals require your review by EOD.
                </p>
              </div>
            </div>
            {/* Meetings */}
            <div className="col-span-1 md:col-span-4 bg-zinc-900 text-white rounded-xl p-8 flex flex-col justify-between group cursor-pointer hover:shadow-xl hover:shadow-zinc-900/20 transition-all duration-500">
              <div className="flex justify-between items-start mb-4 md:mb-0">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white">
                  <span className="material-symbols-outlined">video_chat</span>
                </div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Active</span>
              </div>
              <div>
                <h3 className="text-xl font-bold tracking-tight mb-2">Meetings</h3>
                <p className="text-zinc-400 leading-relaxed text-sm">
                  Design sync rescheduled for 2 PM; link updated in the latest thread from Sarah.
                </p>
              </div>
            </div>
            {/* Urgent & Spam (Stacked) */}
            <div className="col-span-1 md:col-span-3 flex flex-col gap-6">
              <div className="h-full md:h-1/2 bg-error-container/10 rounded-xl p-6 flex flex-col justify-center border border-error/5 hover:bg-error-container/20 transition-colors cursor-pointer group">
                <div className="flex items-center gap-3 mb-2">
                  <span className="material-symbols-outlined text-error text-lg">priority_high</span>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-error">Urgent</span>
                </div>
                <p className="text-xs text-on-error-container font-medium">
                  Server alert: Latency spikes in US-East node.
                </p>
              </div>
              <div className="h-full md:h-1/2 bg-surface-container-low rounded-xl p-6 flex flex-col justify-center opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition-all cursor-pointer">
                <div className="flex items-center gap-3 mb-2">
                  <span className="material-symbols-outlined text-zinc-400 text-lg">auto_delete</span>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Spam</span>
                </div>
                <p className="text-xs text-zinc-500 italic">
                  12 newsletters and marketing pings suppressed.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section>
          <div className="flex justify-between items-center mb-10 overflow-x-auto gap-4 pb-2">
            <div className="flex items-center gap-8 shrink-0">
              <button className="text-sm font-bold border-b-2 border-secondary pb-1 tracking-tight">Recent Activity</button>
              <button className="text-sm font-medium text-zinc-400 hover:text-zinc-600 pb-1 tracking-tight transition-colors">Archived</button>
              <button className="text-sm font-medium text-zinc-400 hover:text-zinc-600 pb-1 tracking-tight transition-colors">Drafts</button>
            </div>
            <button className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-zinc-400 hover:text-secondary transition-colors shrink-0">
              Filter by AI Priority
              <span className="material-symbols-outlined text-xs">expand_more</span>
            </button>
          </div>

          <div className="space-y-4">
            {/* Email Item 1 */}
            <div className="group relative bg-surface-container-lowest hover:bg-white rounded-xl p-6 transition-all duration-300 flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8 border border-transparent hover:shadow-sm">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-zinc-100 flex items-center justify-center font-bold text-zinc-400 text-sm">
                EK
              </div>
              <div className="flex-grow grid grid-cols-1 md:grid-cols-12 items-center gap-2 md:gap-4 w-full">
                <div className="md:col-span-3">
                  <h4 className="text-sm font-bold text-zinc-900 tracking-tight">Elena Kostic</h4>
                  <p className="text-[10px] text-zinc-400 uppercase tracking-widest mt-1">Design Director</p>
                </div>
                <div className="md:col-span-7">
                  <h4 className="text-md font-medium text-zinc-800 leading-tight">Concept Approval: Project "Aether" Visual Identity</h4>
                  <p className="text-sm text-zinc-400 mt-1 truncate">I've attached the final boards for the minimal gallery aesthetic we discussed...</p>
                </div>
                <div className="md:col-span-2 text-left md:text-right">
                  <span className="text-[11px] font-medium text-zinc-400">14:02 PM</span>
                </div>
              </div>
              {/* Hover Actions */}
              <div className="hidden md:flex absolute right-8 top-1/2 -translate-y-1/2 items-center gap-3 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-4 group-hover:translate-x-0 bg-white/90 px-2 py-1 rounded-full shadow-sm">
                <button className="w-10 h-10 rounded-full flex items-center justify-center text-zinc-400 hover:text-secondary hover:bg-zinc-50 transition-all">
                  <span className="material-symbols-outlined text-xl">notifications</span>
                </button>
                <button className="w-10 h-10 rounded-full flex items-center justify-center text-zinc-400 hover:text-secondary hover:bg-zinc-50 transition-all">
                  <span className="material-symbols-outlined text-xl">schedule</span>
                </button>
                <button className="w-10 h-10 rounded-full flex items-center justify-center text-zinc-400 hover:text-secondary hover:bg-zinc-50 transition-all">
                  <span className="material-symbols-outlined text-xl">open_in_new</span>
                </button>
              </div>
            </div>

            {/* Email Item 3 (New/Unread) */}
            <div className="group relative bg-white rounded-xl p-6 transition-all duration-300 flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8 border-l-4 border-secondary shadow-md shadow-zinc-200/50">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-secondary/5 flex items-center justify-center font-bold text-secondary text-sm">
                AC
              </div>
              <div className="flex-grow grid grid-cols-1 md:grid-cols-12 items-center gap-2 md:gap-4 w-full">
                <div className="md:col-span-3">
                  <h4 className="text-sm font-extrabold text-zinc-900 tracking-tight">Aria Chen</h4>
                  <div className="flex items-center gap-1 mt-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
                    <p className="text-[10px] text-secondary font-bold uppercase tracking-widest">Urgent</p>
                  </div>
                </div>
                <div className="md:col-span-7">
                  <h4 className="text-md font-bold text-zinc-900 leading-tight">URGENT: Server migration timeline update</h4>
                  <p className="text-sm text-zinc-600 mt-1 truncate">Julian, the DevOps team needs a final sign-off on the migration script by 5 PM.</p>
                </div>
                <div className="md:col-span-2 text-left md:text-right">
                  <span className="text-[11px] font-bold text-secondary">08:15 AM</span>
                </div>
              </div>
              <div className="hidden md:flex absolute right-8 top-1/2 -translate-y-1/2 items-center gap-3 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-4 group-hover:translate-x-0 bg-white/90 px-2 py-1 rounded-full shadow-sm">
                <button className="w-10 h-10 rounded-full flex items-center justify-center text-zinc-400 hover:text-secondary hover:bg-zinc-50 transition-all">
                  <span className="material-symbols-outlined text-xl">notifications</span>
                </button>
                <button className="w-10 h-10 rounded-full flex items-center justify-center text-zinc-400 hover:text-secondary hover:bg-zinc-50 transition-all">
                  <span className="material-symbols-outlined text-xl">schedule</span>
                </button>
                <button className="w-10 h-10 rounded-full flex items-center justify-center text-zinc-400 hover:text-secondary hover:bg-zinc-50 transition-all">
                  <span className="material-symbols-outlined text-xl">open_in_new</span>
                </button>
              </div>
            </div>

          </div>

          <div className="mt-12 flex justify-center">
            <button className="px-8 py-3 border border-outline-variant/20 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400 hover:bg-zinc-100 hover:text-zinc-600 transition-all">
              Load Archive Activity
            </button>
          </div>
        </section>

        <footer className="mt-24 py-12 flex flex-col items-center">
          <div className="w-16 h-[1px] bg-outline-variant/15 mb-8"></div>
          <p className="text-zinc-400 text-sm italic font-light max-w-lg text-center leading-relaxed">
            "The art of communication is the language of leadership. Clarity in your mailbox is the first step toward clarity in your mission."
          </p>
          <span className="mt-4 text-[10px] font-bold uppercase tracking-widest text-zinc-300">
            &mdash; The Curator's Motto
          </span>
        </footer>

      </main>
      
      {/* Contextual FAB (Hidden on Mobile) */}
      <div className="fixed bottom-10 right-10 hidden md:flex flex-col gap-4">
        <button className="w-14 h-14 rounded-full bg-zinc-900 text-white shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all group">
          <span className="material-symbols-outlined">auto_awesome</span>
          <div className="absolute right-16 bg-zinc-900 text-white text-[10px] font-bold uppercase tracking-widest px-4 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-xl">
            AI Deep Draft
          </div>
        </button>
      </div>
    </>
  );
}
