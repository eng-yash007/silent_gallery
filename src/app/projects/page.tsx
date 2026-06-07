import Header from "@/components/Header";

export default function Projects() {
  return (
    <>
      <Header title="Projects" />
      <main className="w-full min-h-screen pt-32 pb-20 px-6 md:pl-80 md:pr-10 relative z-10">
        <section className="pt-32 px-10 pb-20 max-w-7xl mx-auto">
          <div className="mb-16">
            <h1 className="text-5xl font-extrabold tracking-tighter text-on-surface mb-4 leading-tight">
              Project<br />Library.
            </h1>
            <div className="w-12 h-1 bg-secondary rounded-full"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <button className="group relative flex flex-col items-center justify-center p-8 bg-surface-container-lowest rounded-xl border-2 border-dashed border-outline-variant hover:border-secondary transition-all duration-300 aspect-square md:aspect-auto min-h-[300px]">
              <div className="w-16 h-16 rounded-full bg-surface-container-low flex items-center justify-center group-hover:bg-secondary-container transition-colors">
                <span className="material-symbols-outlined text-3xl text-outline group-hover:text-secondary">add</span>
              </div>
              <span className="mt-4 font-semibold text-on-surface opacity-60 group-hover:opacity-100">Initiate Project</span>
            </button>

            <div className="group bg-surface-container-lowest p-8 rounded-xl shadow-[0px_20px_40px_rgba(45,51,56,0.04)] hover:shadow-[0px_20px_40px_rgba(45,51,56,0.08)] transition-all duration-500 flex flex-col justify-between scale-102 min-h-[300px]">
              <div>
                <div className="flex justify-between items-start mb-6">
                  <span className="px-3 py-1 bg-secondary-container/40 text-on-secondary-container text-[10px] font-bold uppercase tracking-wider rounded-full">Branding</span>
                  <span className="material-symbols-outlined text-outline group-hover:text-secondary transition-colors">more_horiz</span>
                </div>
                <h3 className="text-2xl font-bold text-on-surface mb-2 tracking-tight">The Aurora Identity</h3>
                <p className="text-sm text-on-surface-variant line-clamp-2 leading-relaxed opacity-70">Developing a visual language for the next-generation minimalist lifestyle brand.</p>
              </div>
              <div className="mt-8">
                <div className="flex items-center gap-2 mb-3">
                  <span className="material-symbols-outlined text-secondary text-sm" style={{fontVariationSettings: "'FILL' 1"}}>auto_awesome</span>
                  <span className="text-[11px] font-bold text-secondary uppercase tracking-widest">Last worked on 3 days ago</span>
                </div>
                <div className="w-full bg-surface-container-high h-1.5 rounded-full overflow-hidden">
                  <div className="bg-secondary h-full rounded-full" style={{ width: "65%" }}></div>
                </div>
                <div className="flex justify-between mt-2 text-[10px] font-bold text-outline uppercase tracking-tighter">
                  <span>65% Complete</span>
                  <span>12 Tasks Left</span>
                </div>
              </div>
            </div>

            <div className="group bg-surface-container-lowest p-8 rounded-xl shadow-[0px_20px_40px_rgba(45,51,56,0.04)] hover:shadow-[0px_20px_40px_rgba(45,51,56,0.08)] transition-all duration-500 flex flex-col justify-between scale-102 min-h-[300px]">
              <div>
                <div className="flex justify-between items-start mb-6">
                  <span className="px-3 py-1 bg-tertiary-container text-on-tertiary-container text-[10px] font-bold uppercase tracking-wider rounded-full">Research</span>
                  <span className="material-symbols-outlined text-outline group-hover:text-secondary transition-colors">more_horiz</span>
                </div>
                <h3 className="text-2xl font-bold text-on-surface mb-2 tracking-tight">Editorial System 2.0</h3>
                <p className="text-sm text-on-surface-variant line-clamp-2 leading-relaxed opacity-70">Synthesizing modern typography trends for high-end digital publishing frameworks.</p>
              </div>
              <div className="mt-8">
                <div className="flex items-center gap-2 mb-3">
                  <span className="material-symbols-outlined text-secondary text-sm" style={{fontVariationSettings: "'FILL' 1"}}>auto_awesome</span>
                  <span className="text-[11px] font-bold text-secondary uppercase tracking-widest">Momentum building</span>
                </div>
                <div className="w-full bg-surface-container-high h-1.5 rounded-full overflow-hidden">
                  <div className="bg-secondary h-full rounded-full" style={{ width: "25%" }}></div>
                </div>
                <div className="flex justify-between mt-2 text-[10px] font-bold text-outline uppercase tracking-tighter">
                  <span>25% Complete</span>
                  <span>42 Tasks Left</span>
                </div>
              </div>
            </div>

            <div className="group relative bg-[#0c0e10] p-8 rounded-xl shadow-xl overflow-hidden flex flex-col justify-end min-h-[300px] lg:col-span-1">
              <img alt="Minimalist Lamp" className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:scale-110 transition-transform duration-700" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAE45rIkkw8wXxNSnYuNpLunPTmGpJCifV0_1hj1mT8i3lXt2GtZvoy8pvDeyyKikaaSIFcAL55KMBZi9A7HZl56PX_q3RKEwywx6mIy5qcVhbSRxzBPgsKk3wsCoGOL9vzputTMHD7XE71VbfxuQ5IgbMLwFr2CnnrhbsKEcpUBm-2A-ry7yD-BbcHbY_k5d67hL7WUbmF9waq2Xn_3yUdSQDhXoOFjxr7n5kmw3hzAvvZQXV-2Il3ZGG_gsqTz4SXwZy6PT4BM6KU" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>
              <div className="relative z-10">
                <div className="flex justify-between items-start mb-4">
                  <span className="px-3 py-1 bg-white/10 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider rounded-full border border-white/20">Product Design</span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2 tracking-tight">Lumina Series</h3>
                <div className="mt-4 flex items-center gap-2">
                  <span className="material-symbols-outlined text-secondary-fixed text-sm" style={{fontVariationSettings: "'FILL' 1"}}>auto_awesome</span>
                  <span className="text-[11px] font-bold text-secondary-fixed uppercase tracking-widest">Active session now</span>
                </div>
              </div>
            </div>

            <div className="group bg-surface-container-lowest p-8 rounded-xl shadow-[0px_20px_40px_rgba(45,51,56,0.04)] hover:shadow-[0px_20px_40px_rgba(45,51,56,0.08)] transition-all duration-500 flex flex-col justify-between scale-102 min-h-[300px]">
              <div>
                <div className="flex justify-between items-start mb-6">
                  <span className="px-3 py-1 bg-surface-container-high text-on-surface-variant text-[10px] font-bold uppercase tracking-wider rounded-full">Archive</span>
                  <span className="material-symbols-outlined text-outline group-hover:text-secondary transition-colors">more_horiz</span>
                </div>
                <h3 className="text-2xl font-bold text-on-surface mb-2 tracking-tight">Gallery Redesign</h3>
                <p className="text-sm text-on-surface-variant line-clamp-2 leading-relaxed opacity-70">Legacy project files from the 2023 seasonal update and interface overhaul.</p>
              </div>
              <div className="mt-8">
                <div className="flex items-center gap-2 mb-3">
                  <span className="material-symbols-outlined text-outline text-sm">auto_awesome</span>
                  <span className="text-[11px] font-bold text-outline uppercase tracking-widest">Archived 2 months ago</span>
                </div>
                <div className="w-full bg-surface-container-high h-1.5 rounded-full overflow-hidden">
                  <div className="bg-outline h-full rounded-full" style={{ width: "100%" }}></div>
                </div>
                <div className="flex justify-between mt-2 text-[10px] font-bold text-outline uppercase tracking-tighter">
                  <span>100% Complete</span>
                  <span>No Tasks</span>
                </div>
              </div>
            </div>
            
          </div>

          <div className="mt-20 p-12 bg-surface-container-low rounded-xl flex flex-col md:flex-row justify-between items-center gap-12">
            <div className="text-center md:text-left">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary block mb-2">Workspace Insight</span>
              <p className="text-xl font-medium text-on-surface max-w-sm leading-relaxed">
                You've reached <span className="text-secondary font-bold">82% of your creative capacity</span> this week. Consider archiving completed tasks.
              </p>
            </div>
            <div className="flex gap-8">
              <div className="text-center">
                <span className="block text-4xl font-bold text-on-surface">12</span>
                <span className="text-[10px] uppercase font-bold tracking-widest text-outline">Active</span>
              </div>
              <div className="text-center">
                <span className="block text-4xl font-bold text-on-surface">04</span>
                <span className="text-[10px] uppercase font-bold tracking-widest text-outline">Completed</span>
              </div>
              <div className="text-center">
                <span className="block text-4xl font-bold text-on-surface">02</span>
                <span className="text-[10px] uppercase font-bold tracking-widest text-outline">Paused</span>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
