import Header from "@/components/Header";

export default function Upcoming() {
  return (
    <>
      <Header title="Upcoming" />
      <main className="w-full min-h-screen pt-32 pb-20 px-6 md:pl-80 md:pr-10 relative z-10">
        <section className="mb-16">
          <div className="flex items-end justify-between mb-8">
            <div>
              <span className="text-[0.6875rem] uppercase tracking-[0.2em] text-outline font-medium">Timeline</span>
              <h2 className="text-3xl font-extralight tracking-tight mt-1">Select your window.</h2>
            </div>
            <div className="flex gap-2">
              <button className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-surface-container transition-colors">
                <span className="material-symbols-outlined">chevron_left</span>
              </button>
              <button className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-surface-container transition-colors">
                <span className="material-symbols-outlined">chevron_right</span>
              </button>
            </div>
          </div>
          <div className="flex gap-6 overflow-x-auto no-scrollbar pb-4 -mx-2 px-2">
            {/* Date Cards */}
            <button className="flex-shrink-0 w-24 h-32 rounded-3xl bg-surface-container-lowest flex flex-col items-center justify-center gap-2 group hover:translate-y-[-4px] transition-all duration-300">
              <span className="text-[0.65rem] uppercase tracking-widest text-outline group-hover:text-secondary transition-colors">Oct</span>
              <span className="text-2xl font-light">25</span>
              <span className="text-[0.6rem] uppercase tracking-tighter text-outline/50">Fri</span>
            </button>
            {/* Active Date */}
            <button className="flex-shrink-0 w-24 h-32 rounded-3xl bg-secondary text-on-secondary flex flex-col items-center justify-center gap-2 shadow-[0px_20px_40px_rgba(0,91,194,0.15)] translate-y-[-8px]">
              <span className="text-[0.65rem] uppercase tracking-widest opacity-80">Oct</span>
              <span className="text-2xl font-semibold">26</span>
              <span className="text-[0.6rem] uppercase tracking-tighter opacity-80">Sat</span>
            </button>
            <button className="flex-shrink-0 w-24 h-32 rounded-3xl bg-surface-container-lowest flex flex-col items-center justify-center gap-2 group hover:translate-y-[-4px] transition-all duration-300">
              <span className="text-[0.65rem] uppercase tracking-widest text-outline">Oct</span>
              <span className="text-2xl font-light">27</span>
              <span className="text-[0.6rem] uppercase tracking-tighter text-outline/50">Sun</span>
            </button>
            <button className="flex-shrink-0 w-24 h-32 rounded-3xl bg-surface-container-lowest flex flex-col items-center justify-center gap-2 group hover:translate-y-[-4px] transition-all duration-300">
              <span className="text-[0.65rem] uppercase tracking-widest text-outline">Oct</span>
              <span className="text-2xl font-light">28</span>
              <span className="text-[0.6rem] uppercase tracking-tighter text-outline/50">Mon</span>
            </button>
            <button className="flex-shrink-0 w-24 h-32 rounded-3xl bg-surface-container-lowest flex flex-col items-center justify-center gap-2 group hover:translate-y-[-4px] transition-all duration-300">
              <span className="text-[0.65rem] uppercase tracking-widest text-outline">Oct</span>
              <span className="text-2xl font-light">29</span>
              <span className="text-[0.6rem] uppercase tracking-tighter text-outline/50">Tue</span>
            </button>
            <button className="flex-shrink-0 w-24 h-32 rounded-3xl bg-surface-container-lowest flex flex-col items-center justify-center gap-2 group hover:translate-y-[-4px] transition-all duration-300">
              <span className="text-[0.65rem] uppercase tracking-widest text-outline">Oct</span>
              <span className="text-2xl font-light">30</span>
              <span className="text-[0.6rem] uppercase tracking-tighter text-outline/50">Wed</span>
            </button>
            <button className="flex-shrink-0 w-24 h-32 rounded-3xl bg-surface-container-lowest flex flex-col items-center justify-center gap-2 group hover:translate-y-[-4px] transition-all duration-300">
              <span className="text-[0.65rem] uppercase tracking-widest text-outline">Oct</span>
              <span className="text-2xl font-light">31</span>
              <span className="text-[0.6rem] uppercase tracking-tighter text-outline/50">Thu</span>
            </button>
          </div>
        </section>

        <section className="grid grid-cols-12 gap-12 items-start">
          <div className="col-span-8 flex flex-col gap-12">
            {/* Time Block: Morning */}
            <div className="group">
              <div className="flex items-baseline gap-4 mb-6">
                <span className="text-3xl font-thin text-outline-variant">08:00</span>
                <h3 className="text-sm font-medium tracking-[0.1em] uppercase text-on-surface-variant">Morning Rituals</h3>
                <div className="h-[1px] flex-grow bg-surface-container transition-all duration-500 group-hover:bg-outline-variant/30"></div>
              </div>
              <div className="flex flex-col gap-4 pl-16">
                <div className="flex items-center gap-6 py-4 hover:translate-x-2 transition-transform duration-300">
                  <div className="w-6 h-6 rounded-full border border-outline-variant/30 flex-shrink-0 hover:border-secondary transition-colors cursor-pointer"></div>
                  <span className="text-lg font-light text-on-surface">Curate visual deck for quarterly review</span>
                  <span className="ml-auto text-[0.6rem] uppercase tracking-widest text-secondary font-semibold bg-secondary-container/30 px-3 py-1 rounded-full">Project Alpha</span>
                </div>
                <div className="flex items-center gap-6 py-4 hover:translate-x-2 transition-transform duration-300">
                  <div className="w-6 h-6 rounded-full border border-outline-variant/30 flex-shrink-0 hover:border-secondary transition-colors cursor-pointer"></div>
                  <span className="text-lg font-light text-on-surface">Morning meditation & high-intent focus session</span>
                  <span className="ml-auto text-[0.6rem] uppercase tracking-widest text-outline/50">Self</span>
                </div>
              </div>
            </div>

            {/* Time Block: Afternoon */}
            <div className="group">
              <div className="flex items-baseline gap-4 mb-6">
                <span className="text-3xl font-thin text-outline-variant">14:00</span>
                <h3 className="text-sm font-medium tracking-[0.1em] uppercase text-on-surface-variant">Strategic Convergence</h3>
                <div className="h-[1px] flex-grow bg-surface-container transition-all duration-500 group-hover:bg-outline-variant/30"></div>
              </div>
              <div className="flex flex-col gap-4 pl-16">
                <div className="flex items-center gap-6 py-4 hover:translate-x-2 transition-transform duration-300">
                  <div className="w-6 h-6 rounded-full border border-outline-variant/30 flex-shrink-0 hover:border-secondary transition-colors cursor-pointer"></div>
                  <span className="text-lg font-light text-on-surface">Architectural review of the silent gallery prototype</span>
                  <span className="ml-auto text-[0.6rem] uppercase tracking-widest text-secondary font-semibold bg-secondary-container/30 px-3 py-1 rounded-full">Design</span>
                </div>
                <div className="flex items-center gap-6 py-4 hover:translate-x-2 transition-transform duration-300">
                  <div className="w-6 h-6 rounded-full border border-outline-variant/30 flex-shrink-0 hover:border-secondary transition-colors cursor-pointer"></div>
                  <span className="text-lg font-light text-on-surface-variant">Finalize editorial calendar for November</span>
                  <span className="ml-auto text-[0.6rem] uppercase tracking-widest text-outline/50">Admin</span>
                </div>
              </div>
            </div>
          </div>

          {/* AI Sidebar */}
          <aside className="col-span-4 sticky top-32 flex flex-col gap-8">
            <div className="p-8 rounded-[2rem] bg-surface-container-low/50 border-[0.5px] border-outline-variant/10">
              <div className="flex items-center gap-3 mb-6">
                <span className="material-symbols-outlined text-secondary" style={{fontVariationSettings: "'opsz' 20"}}>auto_awesome</span>
                <span className="text-[0.65rem] uppercase tracking-[0.25em] font-bold text-secondary">AI Context</span>
              </div>
              <p className="text-sm leading-relaxed text-on-surface-variant mb-6 font-light">
                High velocity predicted for Oct 26. Your morning block is optimized for cognitive load. Consider moving the
                <span className="text-on-surface font-normal italic"> Admin </span>
                task to Sunday for better creative flow.
              </p>
              <div className="flex flex-col gap-3">
                <div className="flex justify-between items-center text-[0.65rem] uppercase tracking-widest text-outline">
                  <span>Predicted Focus</span>
                  <span>92%</span>
                </div>
                <div className="w-full h-1 bg-surface-container rounded-full overflow-hidden">
                  <div className="w-[92%] h-full bg-secondary rounded-full"></div>
                </div>
              </div>
            </div>
            <div className="relative overflow-hidden rounded-[2rem] h-64 group cursor-pointer">
              <img alt="Inspirational office space" className="w-full h-full object-cover grayscale brightness-75 transition-transform duration-700 group-hover:scale-110" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCaRYRzQ2ni008PPg-TMgrHGiJJqUAjqGB4VJX2YK3BfumlKBjkbeFSoVs592DPvaqe4WhHomspL4A-6h8sKc_KGbJc-KWoP1dZAYOXP48o0X_Xs8mVabYs470YlY8OaTvg-15opFatpqhOYgegZwoSnhHYtxFhgluysp5zg3IkdCAPv2540Mob9gsqm8pgzl86TVE7z1mie6QqgWOf_T1VWM7MiuvTVKM84MtZLl9LSC3ohP6a0nXv_yV3MyCDc44UAZ1D4i-FT0tv" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-8">
                <span className="text-[0.6rem] uppercase tracking-[0.3em] text-white/70 mb-2">Space for thought</span>
                <h4 className="text-xl font-light text-white tracking-tight">The clarity of silence is the ultimate tool.</h4>
              </div>
            </div>
          </aside>
        </section>

        <footer className="mt-auto pt-32 text-center">
          <p className="text-2xl font-thin tracking-widest text-outline-variant/30 italic">
            &ldquo;The future is a canvas of silence.&rdquo;
          </p>
          <div className="mt-8 flex justify-center gap-12 text-[0.6rem] uppercase tracking-[0.4em] text-outline/40">
            <span>Ref. 2024-EX</span>
            <span>Editorial Protocol</span>
            <span>Silent Gallery v2.0</span>
          </div>
        </footer>

        <button className="fixed bottom-12 right-12 w-16 h-16 bg-secondary text-on-secondary rounded-full flex items-center justify-center shadow-[0px_20px_40px_rgba(0,91,194,0.2)] hover:scale-105 transition-all active:scale-95 group z-50">
          <span className="material-symbols-outlined text-2xl group-hover:rotate-90 transition-transform duration-300">add</span>
        </button>
      </main>
    </>
  );
}
