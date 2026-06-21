"use client";

import { useState, useEffect } from "react";
import ClockStickman from "./Stickman/ClockStickman";

export default function FlipClock() {
  const [time, setTime] = useState({ hours: "00", minutes: "00", date: "" });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');
      
      const options: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
      const dateString = now.toLocaleDateString(undefined, options);

      setTime({ hours, minutes, date: dateString });
    };

    updateTime();
    const interval = setInterval(updateTime, 10000); // Check every 10s to ensure it flips accurately
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleDblClick = () => {
      if (document.body.classList.contains('focus-mode')) {
        document.body.classList.remove('focus-mode');
      }
    };
    window.addEventListener('dblclick', handleDblClick);
    return () => window.removeEventListener('dblclick', handleDblClick);
  }, []);

  if (!mounted) return null;

  const toggleFocusMode = () => {
    document.body.classList.toggle('focus-mode');
  };

  return (
    <section className="flip-clock-container w-full max-w-4xl flex flex-col items-center mb-16 mt-4 md:mt-8 transition-all duration-700">
      <div className="relative flex gap-4 md:gap-10 mb-10">
        <ClockStickman />
        {/* Hours Card */}
        <div className="w-32 h-44 md:w-52 md:h-72 flip-card-inner rounded-[2.5rem] flex flex-col items-center justify-center relative overflow-hidden bg-surface-container z-20 shadow-[0_20px_40px_rgba(0,0,0,0.4)] border-t border-white/5 perspective-1000">
          <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none z-10"></div>
          <div className="flip-card-split absolute w-full h-[2px] bg-black top-1/2 left-0 -translate-y-1/2 z-30 shadow-[0_2px_4px_rgba(0,0,0,0.8),0_-1px_1px_rgba(255,255,255,0.1)]"></div>
          <span className="text-7xl md:text-[10rem] font-black text-transparent bg-clip-text bg-gradient-to-b from-zinc-100 to-zinc-400 tracking-tighter z-20 tabular-nums drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)] leading-none">{time.hours}</span>
        </div>
        
        {/* Minutes Card */}
        <div className="w-32 h-44 md:w-52 md:h-72 flip-card-inner rounded-[2.5rem] flex flex-col items-center justify-center relative overflow-hidden bg-surface-container z-20 shadow-[0_20px_40px_rgba(0,0,0,0.4)] border-t border-white/5 perspective-1000">
          <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none z-10"></div>
          <div className="flip-card-split absolute w-full h-[2px] bg-black top-1/2 left-0 -translate-y-1/2 z-30 shadow-[0_2px_4px_rgba(0,0,0,0.8),0_-1px_1px_rgba(255,255,255,0.1)]"></div>
          <span className="text-7xl md:text-[10rem] font-black text-transparent bg-clip-text bg-gradient-to-b from-zinc-100 to-zinc-400 tracking-tighter z-20 tabular-nums drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)] leading-none">{time.minutes}</span>
        </div>
      </div>
      
      <div className="flex items-center gap-6">
        <button className="group flex flex-col items-center gap-1 hover:opacity-80 transition-all">
          <span className="text-headline-lg font-light tracking-tight text-on-surface-variant">{time.date}</span>
          <div className="h-[1px] w-0 group-hover:w-full bg-secondary transition-all duration-500"></div>
        </button>
        <button 
          onClick={toggleFocusMode}
          className="w-10 h-10 rounded-full bg-surface-container-low flex items-center justify-center text-outline hover:text-secondary hover:bg-secondary/10 transition-colors shadow-inner"
          title="Toggle Focus Mode"
        >
          <span className="material-symbols-outlined text-xl">fullscreen</span>
        </button>
      </div>
    </section>
  );
}
