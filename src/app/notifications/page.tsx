import Header from "@/components/Header";

export default function Notifications() {
  return (
    <>
      <Header title="Notifications" />
      <main className="w-full min-h-screen pt-32 pb-20 px-6 md:pl-80 md:pr-10 relative z-10 flex justify-center">
        {/* Full-page Notification Panel */}
        <div className="w-full max-w-3xl rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-outline-variant/20 overflow-hidden bg-white/60 backdrop-blur-3xl mt-10">
          <div className="p-8 border-b flex justify-between items-center border-outline-variant/10 bg-surface-container-lowest">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-outline mb-1">Activity Stream</h3>
              <p className="text-2xl font-bold tracking-tight text-on-surface">Notifications</p>
            </div>
            <button className="text-[11px] font-bold uppercase tracking-widest text-secondary hover:text-secondary-dim transition-colors px-4 py-2 bg-secondary/5 rounded-full">
              Clear All
            </button>
          </div>
          <div className="divide-y divide-outline-variant/10">
            {/* Notification 1 */}
            <div className="p-8 hover:bg-surface-container-lowest transition-colors cursor-pointer group">
              <div className="flex gap-6 items-start">
                <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-secondary text-2xl">emoji_events</span>
                </div>
                <div className="flex flex-col flex-grow">
                  <div className="flex justify-between items-start mb-1">
                    <p className="text-lg font-bold text-on-surface tracking-tight">Daily Goal Achieved</p>
                    <span className="text-xs font-medium text-outline-variant">2m ago</span>
                  </div>
                  <p className="text-sm text-on-surface-variant leading-relaxed">
                    You've completed your 'Editorial Concept' deep work session. Consistent effort is building up.
                  </p>
                  <div className="mt-4 flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-white bg-secondary rounded-full hover:bg-secondary-dim transition-colors">View Stats</button>
                    <button className="px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-outline hover:bg-surface-container rounded-full transition-colors">Dismiss</button>
                  </div>
                </div>
              </div>
            </div>
            {/* Notification 2 */}
            <div className="p-8 hover:bg-surface-container-lowest transition-colors cursor-pointer group">
              <div className="flex gap-6 items-start">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-primary text-2xl">auto_awesome</span>
                </div>
                <div className="flex flex-col flex-grow">
                  <div className="flex justify-between items-start mb-1">
                    <p className="text-lg font-bold text-on-surface tracking-tight">New AI Insight</p>
                    <span className="text-xs font-medium text-outline-variant">45m ago</span>
                  </div>
                  <p className="text-sm text-on-surface-variant leading-relaxed">
                    Synthesis complete for 'Legacy Project' archival materials. 3 key themes have been extracted for your next brief.
                  </p>
                </div>
              </div>
            </div>
            {/* Notification 3 */}
            <div className="p-8 hover:bg-surface-container-lowest transition-colors cursor-pointer group opacity-60 hover:opacity-100">
              <div className="flex gap-6 items-start">
                <div className="w-12 h-12 rounded-full bg-outline-variant/20 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-outline text-2xl">history_edu</span>
                </div>
                <div className="flex flex-col flex-grow">
                  <div className="flex justify-between items-start mb-1">
                    <p className="text-lg font-bold text-on-surface tracking-tight">Journal Reminder</p>
                    <span className="text-xs font-medium text-outline-variant">2h ago</span>
                  </div>
                  <p className="text-sm text-on-surface-variant leading-relaxed">
                    Time for your evening reflection journal entry. Taking 5 minutes now clears the mind for tomorrow.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="p-6 border-t border-outline-variant/10 text-center bg-surface-container-lowest">
            <button className="text-sm uppercase tracking-widest font-bold text-outline hover:text-secondary transition-colors">
              Load Older Activity
            </button>
          </div>
        </div>
      </main>
    </>
  );
}
