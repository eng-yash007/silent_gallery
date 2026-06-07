import Header from "@/components/Header";
import Link from "next/link";

export default function Progress() {
  return (
    <>
      <Header title="Progress" />
      <main className="w-full min-h-screen pt-32 pb-20 px-6 md:pl-80 md:pr-10 relative z-10">
        <div className="space-y-16 mt-10">
          {/* Statistics Row */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="flex flex-col">
              <span className="text-7xl font-light tracking-tighter text-on-surface">12-day</span>
              <span className="text-sm font-medium text-on-surface-variant mt-2 uppercase tracking-widest">Active Streak</span>
            </div>
            <div className="flex flex-col">
              <span className="text-7xl font-light tracking-tighter text-on-surface">84%</span>
              <span className="text-sm font-medium text-on-surface-variant mt-2 uppercase tracking-widest">Completion Rate</span>
            </div>
            <div className="flex flex-col">
              <span className="text-7xl font-light tracking-tighter text-on-surface">32</span>
              <span className="text-sm font-medium text-on-surface-variant mt-2 uppercase tracking-widest">Tasks Finalized</span>
            </div>
          </section>

          {/* Line Chart Section */}
          <section className="bg-surface-container-lowest/60 backdrop-blur-2xl p-10 rounded-[2rem] shadow-[0_20px_40px_rgba(45,51,56,0.04)] border border-outline-variant/5">
            <div className="flex justify-between items-end mb-12">
              <div>
                <h3 className="text-xl font-semibold text-on-surface tracking-tight">Weekly Trajectory</h3>
                <p className="text-on-surface-variant text-sm mt-1">Consistency analysis over the last 7 days.</p>
              </div>
              <div className="flex items-center space-x-2 text-secondary font-medium text-sm">
                <span className="material-symbols-outlined text-sm">trending_up</span>
                <span>+14% vs last week</span>
              </div>
            </div>

            <div className="w-full h-64 relative mt-8">
              <svg className="w-full h-full preserve-3d" viewBox="0 0 1000 300">
                <line opacity="0.2" stroke="#acb3b8" strokeDasharray="4" strokeWidth="0.5" x1="0" x2="1000" y1="280" y2="280"></line>
                <line opacity="0.2" stroke="#acb3b8" strokeDasharray="4" strokeWidth="0.5" x1="0" x2="1000" y1="180" y2="180"></line>
                <line opacity="0.2" stroke="#acb3b8" strokeDasharray="4" strokeWidth="0.5" x1="0" x2="1000" y1="80" y2="80"></line>
                
                <path d="M0,250 C100,240 200,280 300,180 C400,80 500,120 600,60 C700,0 800,100 900,40 L1000,60" fill="none" stroke="url(#lineGradient)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4"></path>
                <path d="M0,250 C100,240 200,280 300,180 C400,80 500,120 600,60 C700,0 800,100 900,40 L1000,60 V300 H0 Z" fill="url(#areaGradient)" opacity="0.1"></path>
                
                <defs>
                  <linearGradient id="lineGradient" x1="0%" x2="100%" y1="0%" y2="0%">
                    <stop offset="0%" stopColor="#005bc2"></stop>
                    <stop offset="100%" stopColor="#00a3ff"></stop>
                  </linearGradient>
                  <linearGradient id="areaGradient" x1="0%" x2="0%" y1="0%" y2="100%">
                    <stop offset="0%" stopColor="#005bc2"></stop>
                    <stop offset="100%" stopColor="transparent"></stop>
                  </linearGradient>
                </defs>

                <circle cx="300" cy="180" fill="#005bc2" r="6"></circle>
                <circle cx="600" cy="60" fill="#005bc2" r="6"></circle>
                <circle cx="900" cy="40" fill="#005bc2" r="6"></circle>
              </svg>
              <div className="flex justify-between mt-6 text-[10px] font-bold text-on-surface-variant uppercase tracking-[0.2em]">
                <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
              </div>
            </div>
          </section>

          <section className="flex flex-col items-center pt-8">
            <div className="mb-10 text-center max-w-md">
              <p className="text-on-surface-variant text-base leading-relaxed">
                Your focus categories reflect a balanced week. Sharing insights can inspire others in your curated circle.
              </p>
            </div>
            <button className="px-12 py-5 bg-gradient-to-br from-secondary to-secondary-dim text-white text-sm font-semibold tracking-wider uppercase rounded-full shadow-[0_10px_30px_rgba(0,91,194,0.2)] hover:scale-105 active:scale-95 transition-all duration-300">
              Share Progress
            </button>
          </section>
        </div>

        {/* Background Decorative Elements */}
        <div className="fixed top-[-10%] right-[-5%] w-[40%] h-[40%] bg-secondary/5 rounded-full blur-[120px] -z-10 pointer-events-none"></div>
        <div className="fixed bottom-[10%] left-[-5%] w-[30%] h-[30%] bg-secondary-container/20 rounded-full blur-[100px] -z-10 pointer-events-none"></div>
      </main>
    </>
  );
}
