import Header from "@/components/Header";
import Link from "next/link";

export default function Profile() {
  return (
    <>
      <Header title="Profile" />
      <main className="w-full min-h-screen pt-32 pb-20 px-6 md:pl-80 md:pr-10 relative z-10">
        <section className="flex flex-col lg:flex-row items-center lg:items-end gap-20 mb-32 mt-10">
          <div className="relative group cursor-pointer">
            <div className="w-72 h-88 rounded-3xl overflow-hidden shadow-2xl bg-slate-200 transition-all duration-300 group-hover:scale-[1.03] ring-1 ring-slate-100">
              <img alt="Alex Carter" className="w-full h-full object-cover grayscale contrast-[1.1] hover:grayscale-0 transition-all duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDErPZu6OrbZJuRASY-UG7ipH05FfH5k13cysgH-gKfC7ZloWcrjIvrulCOc_csaQktAvOvdleBdMsJetp8EMatHMTyyL2Phe2vGkcSdfHrJ7YTwATE0MQ3vulvDW5iEU0NOuZArZ_Q3pjQmtrCyHqrHQQpP6FppEVLRNj-e5fl_yJuWp2NSYnduBGTRkrpkzINd11jPjN-lVxn1t9Ok2snTHEfOpYj23XP0zZg8BQumggmqwGNpUBQ7hsJHdle3yeZHKN9duaqwxFp"/>
            </div>
            <button className="absolute bottom-6 right-6 w-14 h-14 bg-white/90 backdrop-blur-xl text-zinc-900 rounded-full flex items-center justify-center shadow-xl opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 hover:bg-secondary hover:text-white">
              <span className="material-symbols-outlined text-[20px]">photo_camera</span>
            </button>
          </div>
          <div className="flex-1 space-y-10 text-center lg:text-left">
            <div className="space-y-4">
              <span className="text-[11px] font-bold uppercase tracking-[0.4em] text-secondary">Profile Identity</span>
              <h2 className="text-7xl font-bold tracking-[-0.03em] leading-tight text-zinc-900 dark:text-white">Alex Carter</h2>
              <p className="text-2xl font-light text-zinc-400 tracking-tight">Curator & Architect of Focus</p>
            </div>
            <div className="flex flex-wrap justify-center lg:justify-start gap-6">
              <button className="px-10 py-4 bg-zinc-900 text-white rounded-full text-sm font-semibold tracking-wide hover:bg-zinc-800 transition-all shadow-lg shadow-zinc-200 dark:shadow-none">Edit Biography</button>
              <button className="px-10 py-4 bg-white text-zinc-900 dark:bg-zinc-800 dark:text-white rounded-full text-sm font-semibold tracking-wide border border-slate-200 dark:border-zinc-700 hover:border-zinc-400 transition-all">Share Profile</button>
            </div>
          </div>
        </section>

        <section className="grid grid-cols-12 gap-10 mb-32">
          <div className="col-span-12 md:col-span-4 p-12 bg-gradient-to-br from-surface-container-lowest to-surface-container-low rounded-[2rem] shadow-sm group transition-all duration-300 hover:translate-y-[-8px]">
            <div className="flex items-center gap-3 mb-12">
              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-zinc-400">Total Velocity</span>
              <div className="h-px flex-1 bg-slate-100 group-hover:bg-slate-200 transition-colors"></div>
            </div>
            <div className="relative">
              <span className="text-7xl font-bold tracking-tighter text-zinc-900 dark:text-white">1,284</span>
              <p className="text-[13px] text-zinc-400 mt-4 uppercase tracking-[0.15em] font-medium">Tasks Archived</p>
              <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:opacity-10 transition-opacity duration-300">
                <span className="material-symbols-outlined text-8xl">trending_up</span>
              </div>
            </div>
          </div>

          <div className="col-span-12 md:col-span-4 p-12 bg-secondary text-white rounded-[2rem] shadow-2xl shadow-blue-200/50 dark:shadow-none group transition-all duration-300 hover:translate-y-[-8px] relative overflow-hidden">
            <div className="absolute top-0 right-0 p-12 opacity-10 group-hover:scale-110 transition-transform duration-500">
              <span className="material-symbols-outlined text-9xl">bolt</span>
            </div>
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-12">
                <span className="text-[10px] font-bold uppercase tracking-[0.25em] opacity-70">Focus Momentum</span>
                <div className="h-px flex-1 bg-white/20"></div>
              </div>
              <div className="flex items-baseline gap-3">
                <span className="text-7xl font-bold tracking-tighter">24</span>
                <span className="text-2xl font-medium tracking-tight opacity-70">days</span>
              </div>
              <p className="text-[13px] opacity-70 mt-4 uppercase tracking-[0.15em] font-medium">Active Streak</p>
            </div>
          </div>

          <div className="col-span-12 md:col-span-4 p-12 bg-white dark:bg-zinc-800 rounded-[2rem] border border-slate-100 dark:border-zinc-700 group transition-all duration-300 hover:translate-y-[-8px] hover:shadow-xl">
            <div className="flex items-center gap-3 mb-12">
              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-zinc-400">Consistency Score</span>
              <div className="h-px flex-1 bg-slate-100 dark:bg-zinc-700"></div>
            </div>
            <div>
              <span className="text-7xl font-bold tracking-tighter text-zinc-900 dark:text-white">98%</span>
              <div className="w-full h-1.5 bg-slate-100 dark:bg-zinc-700 mt-6 rounded-full overflow-hidden">
                <div className="h-full bg-secondary w-[98%]"></div>
              </div>
              <p className="text-[13px] text-zinc-400 mt-4 uppercase tracking-[0.15em] font-medium">Optimal Focus</p>
            </div>
          </div>
        </section>

        <section className="grid grid-cols-12 gap-16 items-start">
          <div className="col-span-12 lg:col-span-8 space-y-12">
            <div className="flex items-end justify-between border-b border-slate-100 dark:border-zinc-800 pb-8">
              <h3 className="text-[11px] font-bold uppercase tracking-[0.4em] text-zinc-900 dark:text-white">Achievements</h3>
              <Link href="/progress" className="text-[11px] font-bold uppercase tracking-[0.2em] text-secondary hover:underline transition-all">View All Map</Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="glass-panel p-8 rounded-3xl flex flex-col items-center text-center space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-amber-50 flex items-center justify-center text-amber-500">
                  <span className="material-symbols-outlined text-3xl">stars</span>
                </div>
                <div>
                  <p className="font-bold text-sm text-zinc-900 dark:text-white">Consistency King</p>
                  <p className="text-[11px] text-zinc-400 mt-1 uppercase tracking-wider">30 Day Streak</p>
                </div>
              </div>
              <div className="glass-panel p-8 rounded-3xl flex flex-col items-center text-center space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-500">
                  <span className="material-symbols-outlined text-3xl">wb_sunny</span>
                </div>
                <div>
                  <p className="font-bold text-sm text-zinc-900 dark:text-white">Early Bird</p>
                  <p className="text-[11px] text-zinc-400 mt-1 uppercase tracking-wider">Pre-7AM Flow</p>
                </div>
              </div>
              <div className="glass-panel p-8 rounded-3xl flex flex-col items-center text-center space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-purple-50 flex items-center justify-center text-purple-500">
                  <span className="material-symbols-outlined text-3xl">psychology</span>
                </div>
                <div>
                  <p className="font-bold text-sm text-zinc-900 dark:text-white">Deep Work Master</p>
                  <p className="text-[11px] text-zinc-400 mt-1 uppercase tracking-wider">4hr Focused Block</p>
                </div>
              </div>
            </div>
          </div>

          <div className="col-span-12 lg:col-span-4 space-y-12">
            <div className="border-b border-slate-100 dark:border-zinc-800 pb-8">
              <h3 className="text-[11px] font-bold uppercase tracking-[0.4em] text-zinc-900 dark:text-white">Connected Platforms</h3>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-6 bg-white dark:bg-zinc-800 rounded-2xl border border-slate-50 dark:border-zinc-700 hover:border-slate-200 transition-all cursor-pointer group">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center text-white">
                    <span className="material-symbols-outlined text-lg">grid_view</span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-zinc-900 dark:text-white">Linear</p>
                    <p className="text-[11px] text-zinc-400">Engineering sync</p>
                  </div>
                </div>
                <span className="material-symbols-outlined text-zinc-300 group-hover:text-secondary transition-colors">check_circle</span>
              </div>
              <div className="flex items-center justify-between p-6 bg-white dark:bg-zinc-800 rounded-2xl border border-slate-50 dark:border-zinc-700 hover:border-slate-200 transition-all cursor-pointer group">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-zinc-900">
                    <span className="material-symbols-outlined text-lg">description</span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-zinc-900 dark:text-white">Notion</p>
                    <p className="text-[11px] text-zinc-400">Knowledge base</p>
                  </div>
                </div>
                <span className="material-symbols-outlined text-zinc-300 group-hover:text-secondary transition-colors">check_circle</span>
              </div>
              <div className="flex items-center justify-between p-6 bg-white dark:bg-zinc-800 rounded-2xl border border-slate-50 dark:border-zinc-700 hover:border-slate-200 transition-all cursor-pointer group">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center text-orange-600">
                    <span className="material-symbols-outlined text-lg">campaign</span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-zinc-900 dark:text-white">Slack</p>
                    <p className="text-[11px] text-zinc-400">Not connected</p>
                  </div>
                </div>
                <span className="material-symbols-outlined text-zinc-300 group-hover:text-secondary transition-colors">add_circle_outline</span>
              </div>
            </div>
          </div>
        </section>

        <footer className="mt-40 pt-20 border-t border-slate-100 dark:border-zinc-800">
          <div className="max-w-3xl opacity-40 hover:opacity-100 transition-opacity duration-700">
            <h3 className="text-3xl font-light tracking-tight text-zinc-900 dark:text-white leading-snug mb-8">
              "Your curatorial journey began 18 months ago. You've mastered the art of focus, turning raw time into meaningful progress."
            </h3>
            <div className="flex items-center gap-6">
              <p className="text-[11px] text-zinc-500 uppercase tracking-[0.3em] font-bold">Target: Zenith Status</p>
              <div className="h-px flex-1 bg-slate-100 dark:bg-zinc-700"></div>
              <p className="text-[11px] text-zinc-400 uppercase tracking-widest">16 Projects to Go</p>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}
