import Header from "@/components/Header";

export default function Calendar() {
  return (
    <>
      <Header title="Calendar" />
      <main className="w-full min-h-screen pt-32 pb-20 px-6 md:pl-80 md:pr-10 relative z-10">
        <div className="grid grid-cols-12 gap-16">
          <div className="col-span-8">
            <div className="grid grid-cols-7 mb-6">
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
                <div key={day} className="text-center text-[10px] font-bold uppercase tracking-[0.3em] text-outline dark:text-zinc-400 opacity-40 py-2">
                  {day}
                </div>
              ))}
            </div>
            
            <div className="grid grid-cols-7 gap-px bg-outline-variant/30 dark:bg-zinc-800/80 border border-outline-variant/25 dark:border-zinc-700/50 rounded-2xl overflow-hidden shadow-sm">
              <div className="bg-surface dark:bg-zinc-950 h-36 p-4 opacity-30 text-[11px] font-medium">26</div>
              <div className="bg-surface dark:bg-zinc-950 h-36 p-4 opacity-30 text-[11px] font-medium">27</div>
              <div className="bg-surface dark:bg-zinc-950 h-36 p-4 opacity-30 text-[11px] font-medium">28</div>
              <div className="bg-surface dark:bg-zinc-950 h-36 p-4 opacity-30 text-[11px] font-medium">29</div>
              <div className="bg-surface dark:bg-zinc-950 h-36 p-4 opacity-30 text-[11px] font-medium">30</div>
              <div className="bg-white dark:bg-zinc-900 h-36 p-4 text-[11px] font-medium">1</div>
              <div className="bg-white dark:bg-zinc-900 h-36 p-4 text-[11px] font-medium">2</div>
              
              <div className="bg-white dark:bg-zinc-900 h-40 p-4">
                <span className="text-[11px] font-medium mb-3 block text-outline dark:text-zinc-400">3</span>
                <div className="bg-[#d8e2ff]/40 p-2 rounded-lg border-l-2 border-secondary overflow-hidden">
                  <p className="text-[10px] font-bold leading-tight truncate text-secondary">Editorial Review</p>
                  <p className="text-[9px] text-secondary/60 mt-0.5">09:00 AM</p>
                </div>
              </div>
              <div className="bg-white dark:bg-zinc-900 h-40 p-4">
                <span className="text-[11px] font-medium mb-3 block text-outline dark:text-zinc-400">4</span>
              </div>
              <div className="bg-white dark:bg-zinc-900 h-40 p-4 relative">
                <span className="text-[11px] font-bold text-secondary mb-3 block">5</span>
                <div className="bg-white dark:bg-zinc-900 border border-outline-variant/25 dark:border-zinc-700/50 p-2 rounded-lg shadow-sm">
                  <p className="text-[10px] font-bold leading-tight truncate">Brand Strategy</p>
                  <div className="flex items-center gap-1 mt-1.5">
                    <span className="material-symbols-outlined text-[11px] text-secondary">videocam</span>
                    <span className="text-[9px] text-secondary font-semibold uppercase tracking-wider">Meet</span>
                  </div>
                </div>
              </div>
              <div className="bg-white dark:bg-zinc-900 h-40 p-4">
                <span className="text-[11px] font-medium mb-3 block text-outline dark:text-zinc-400">6</span>
              </div>
              <div className="bg-white dark:bg-zinc-900 h-40 p-4">
                <span className="text-[11px] font-medium mb-3 block text-outline dark:text-zinc-400">7</span>
                <div className="bg-surface-container dark:bg-zinc-800/50 p-2 rounded-lg border-l-2 border-outline opacity-70 dark:border-zinc-500">
                  <p className="text-[10px] font-bold leading-tight truncate text-outline dark:text-zinc-400">Focus Block</p>
                </div>
              </div>
              <div className="bg-white dark:bg-zinc-900 h-40 p-4">
                <span className="text-[11px] font-medium mb-3 block text-outline dark:text-zinc-400">8</span>
              </div>
              <div className="bg-white dark:bg-zinc-900 h-40 p-4">
                <span className="text-[11px] font-medium mb-3 block text-outline dark:text-zinc-400">9</span>
              </div>
              <div className="bg-white dark:bg-zinc-900 h-40 p-4">
                <span className="text-[11px] font-medium mb-3 block text-outline dark:text-zinc-400">10</span>
              </div>
              <div className="bg-white dark:bg-zinc-900 h-40 p-4">
                <span className="text-[11px] font-medium mb-3 block text-outline dark:text-zinc-400">11</span>
              </div>
              <div className="bg-white dark:bg-zinc-900 h-40 p-4">
                <span className="text-[11px] font-medium mb-3 block text-outline dark:text-zinc-400">12</span>
                <div className="bg-white dark:bg-zinc-900 border border-outline-variant/25 dark:border-zinc-700/50 p-2 rounded-lg shadow-sm">
                  <p className="text-[10px] font-bold leading-tight truncate">Team Sync</p>
                  <div className="flex items-center gap-1 mt-1.5">
                    <span className="material-symbols-outlined text-[11px] text-blue-600">groups</span>
                    <span className="text-[9px] text-blue-600 font-semibold uppercase tracking-wider">Teams</span>
                  </div>
                </div>
              </div>
              <div className="bg-white dark:bg-zinc-900 h-40 p-4">
                <span className="text-[11px] font-medium mb-3 block text-outline dark:text-zinc-400">13</span>
              </div>
              <div className="bg-white dark:bg-zinc-900 h-40 p-4">
                <span className="text-[11px] font-medium mb-3 block text-outline dark:text-zinc-400">14</span>
              </div>
              <div className="bg-white dark:bg-zinc-900 h-40 p-4">
                <span className="text-[11px] font-medium mb-3 block text-outline dark:text-zinc-400">15</span>
              </div>
              <div className="bg-white dark:bg-zinc-900 h-40 p-4">
                <span className="text-[11px] font-medium mb-3 block text-outline dark:text-zinc-400">16</span>
              </div>
            </div>
          </div>
          
          <div className="col-span-4 space-y-12">
            <section>
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-[10px] font-bold uppercase tracking-[0.25em] text-outline dark:text-zinc-400">Synced Events</h3>
                <span className="material-symbols-outlined text-sm text-outline dark:text-zinc-400 opacity-40">sync</span>
              </div>
              <div className="space-y-5">
                <div className="group bg-white dark:bg-zinc-900 p-7 rounded-2xl border border-outline-variant/25 dark:border-zinc-700/50 hover:shadow-xl transition-all duration-500">
                  <div className="flex justify-between items-start mb-5">
                    <div className="px-2.5 py-1 bg-secondary/10 rounded-md text-[9px] font-bold uppercase tracking-wider text-secondary">In Review</div>
                    <span className="text-[10px] text-outline dark:text-zinc-400 font-semibold tracking-wide">10:00 — 11:30</span>
                  </div>
                  <h4 className="text-xl font-medium tracking-tight mb-2 text-on-surface dark:text-zinc-100">Quarterly Aesthetic Audit</h4>
                  <p className="text-[13px] text-outline dark:text-zinc-400 leading-relaxed mb-8 opacity-80">Reviewing the new visual directions for the upcoming winter exhibition series.</p>
                </div>
              </div>
            </section>
            
            <section className="bg-surface dark:bg-zinc-950 p-8 rounded-3xl border border-outline-variant/25 dark:border-zinc-700/50">
              <h3 className="text-[10px] font-bold uppercase tracking-[0.25em] text-outline dark:text-zinc-400 mb-8">Focus Metrics</h3>
              <div className="space-y-8">
                <div>
                  <div className="flex justify-between text-[10px] font-bold uppercase tracking-[0.15em] mb-3">
                    <span className="text-on-surface dark:text-zinc-100">Deep Work</span>
                    <span className="text-secondary">14h / 20h</span>
                  </div>
                  <div className="h-1.5 w-full bg-outline-variant/30 dark:bg-zinc-800/80 rounded-full overflow-hidden">
                    <div className="h-full bg-secondary w-[70%]"></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-[10px] font-bold uppercase tracking-[0.15em] mb-3">
                    <span className="text-on-surface dark:text-zinc-100">Meetings</span>
                    <span className="text-outline dark:text-zinc-400 opacity-60">6h / 10h</span>
                  </div>
                  <div className="h-1.5 w-full bg-outline-variant/30 dark:bg-zinc-800/80 rounded-full overflow-hidden">
                    <div className="h-full bg-outline dark:bg-zinc-500 w-[60%] opacity-30"></div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
    </>
  );
}
