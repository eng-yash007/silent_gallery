import Link from 'next/link';

export default function Header({ title }: { title: string }) {
  return (
    <header className="fixed top-0 w-full bg-white/40 backdrop-blur-md flex justify-between items-center px-10 py-6 z-30 md:pl-80 border-b border-white/20">
      <h1 className="text-2xl font-semibold tracking-tighter text-on-surface">{title}</h1>
      <div className="flex items-center gap-6">
        <div className="relative group inline-flex items-center">
          <button className="material-symbols-outlined text-primary hover:text-secondary transition-colors inline-flex cursor-pointer" title="Notifications">notifications</button>
          
          <div className="absolute right-0 top-[calc(100%+10px)] w-80 bg-white dark:bg-zinc-900 shadow-2xl rounded-2xl border border-outline-variant/20 dark:border-zinc-700/50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 z-[100] before:content-[''] before:absolute before:-top-4 before:right-0 before:w-full before:h-4">
            <div className="p-4 border-b border-outline-variant/10 flex justify-between items-center bg-surface-container-low/50 backdrop-blur-md rounded-t-2xl">
              <h3 className="font-bold text-sm text-on-surface tracking-wide uppercase">Notifications</h3>
              <span className="bg-secondary/10 text-secondary text-[10px] px-2 py-0.5 rounded-full font-bold">2 New</span>
            </div>
            <div className="max-h-72 overflow-y-auto p-2 space-y-1">
              <div className="p-3 rounded-xl hover:bg-surface-container transition-colors cursor-pointer flex gap-3">
                <div className="w-8 h-8 rounded-full bg-secondary/10 text-secondary flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[16px]">mail</span>
                </div>
                <div>
                  <p className="text-xs font-semibold text-on-surface">New Email from Design Team</p>
                  <p className="text-[10px] text-on-surface-variant line-clamp-1 mt-0.5">The latest mockups are ready for review.</p>
                  <p className="text-[9px] text-primary mt-1">2 mins ago</p>
                </div>
              </div>
              <div className="p-3 rounded-xl hover:bg-surface-container transition-colors cursor-pointer flex gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[16px]">event</span>
                </div>
                <div>
                  <p className="text-xs font-semibold text-on-surface">Meeting starting soon</p>
                  <p className="text-[10px] text-on-surface-variant line-clamp-1 mt-0.5">Weekly sync starts in 15 minutes.</p>
                  <p className="text-[9px] text-primary mt-1">15 mins ago</p>
                </div>
              </div>
            </div>
            <div className="p-3 border-t border-outline-variant/10 text-center bg-surface-container-low/50 backdrop-blur-md rounded-b-2xl">
              <Link href="/notifications" className="text-[11px] text-secondary font-bold hover:underline uppercase tracking-wider">View All Notifications</Link>
            </div>
          </div>
        </div>
        <Link href="/calendar" className="material-symbols-outlined text-primary hover:text-secondary transition-colors inline-flex" title="Calendar">calendar_today</Link>
        <Link href="/settings" className="material-symbols-outlined text-primary hover:text-secondary transition-colors inline-flex" title="Settings">settings</Link>
      </div>
    </header>
  );
}
