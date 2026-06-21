"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";

type SessionState = 'idle' | 'focus' | 'break';

export default function DeepWorkWidget() {
  const [state, setState] = useState<SessionState>('idle');
  const [baseDuration, setBaseDuration] = useState(25); // In minutes
  const [timeLeft, setTimeLeft] = useState(25 * 60); 
  const [isActive, setIsActive] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isFocusMode, setIsFocusMode] = useState(false);

  // Sync with localStorage and Focus Mode on mount
  useEffect(() => {
    const savedDuration = localStorage.getItem('focusDuration');
    const initialDuration = savedDuration ? parseInt(savedDuration) : 25;
    setBaseDuration(initialDuration);
    setTimeLeft(initialDuration * 60);
    setMounted(true);
    
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'focusDuration' && e.newValue) {
        const newD = parseInt(e.newValue);
        setBaseDuration(newD);
        if (state === 'idle') setTimeLeft(newD * 60);
      }
    };

    // Check if body has focus-mode class periodically
    const checkFocusMode = () => {
      setIsFocusMode(document.body.classList.contains('focus-mode'));
    };
    const observer = new MutationObserver(checkFocusMode);
    observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });

    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      observer.disconnect();
    };
  }, [state]);

  // Timer logic
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((time) => time - 1);
      }, 1000);
    } else if (isActive && timeLeft === 0) {
      if (state === 'focus') {
        setState('break');
        setTimeLeft(5 * 60); // 5 min break
      } else {
        setState('idle');
        setIsActive(false);
        setTimeLeft(baseDuration * 60);
      }
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, timeLeft, state, baseDuration]);

  const toggleTimer = () => {
    if (state === 'idle') {
      setState('focus');
      setTimeLeft(baseDuration * 60);
    }
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setState('idle');
    setTimeLeft(baseDuration * 60);
  };

  const adjustTime = (amount: number) => {
    if (state !== 'idle') return;
    const newDuration = Math.max(1, Math.min(120, baseDuration + amount));
    setBaseDuration(newDuration);
    setTimeLeft(newDuration * 60);
    localStorage.setItem('focusDuration', newDuration.toString());
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  if (!mounted) return null;

  const totalTime = state === 'focus' ? baseDuration * 60 : state === 'break' ? 5 * 60 : baseDuration * 60;
  const progressPercent = state === 'idle' ? 0 : 100 - (timeLeft / totalTime) * 100;
  
  // Calculate sweeping dot rotation
  const rotationDegrees = (progressPercent / 100) * 360;

  // Generate 60 ticks for the mechanical dial
  const ticks = Array.from({ length: 60 }).map((_, i) => {
    const isMajor = i % 5 === 0;
    return (
      <line
        key={i}
        x1="100"
        y1="10"
        x2="100"
        y2={isMajor ? "18" : "14"}
        stroke="currentColor"
        strokeWidth={isMajor ? "2" : "1"}
        strokeLinecap="round"
        className="text-white/20"
        transform={`rotate(${i * 6} 100 100)`}
      />
    );
  });

  const activeColorClass = state === 'idle' ? 'text-secondary bg-secondary' : state === 'focus' ? 'text-error bg-error' : 'text-primary bg-primary';
  const shadowColor = state === 'idle' ? 'rgba(0, 91, 194, 0.5)' : state === 'focus' ? 'rgba(255, 59, 48, 0.5)' : 'rgba(10, 132, 255, 0.5)';

  return (
    <div className="deep-work-widget-container transition-all duration-700 w-full flex flex-col items-center">
      <div className="deep-work-dial relative w-full max-w-[320px] aspect-square rounded-[3rem] overflow-hidden group shadow-[0_20px_50px_rgba(0,0,0,0.5)] bg-[#050505] flex flex-col items-center justify-center border border-white/10 ring-1 ring-white/5">
        
        {/* Background Glow */}
        <div 
          className="absolute inset-0 opacity-10 blur-[80px] transition-colors duration-1000 pointer-events-none"
          style={{ backgroundColor: activeColorClass.split(' ')[1].replace('bg-', '') }} // Fallback if bg class isn't parsed
        >
          <div className={`w-full h-full ${activeColorClass.split(' ')[1]}`}></div>
        </div>

        {/* Mechanical Dial SVG */}
        <div className="absolute inset-0 m-6 flex items-center justify-center z-10 pointer-events-none">
          <svg viewBox="0 0 200 200" className="w-full h-full -rotate-90 drop-shadow-2xl">
            {/* Outer track */}
            <circle cx="100" cy="100" r="95" stroke="currentColor" strokeWidth="1" fill="transparent" className="text-white/5" />
            
            {/* Ticks */}
            {ticks}

            {/* Glowing Progress Ring */}
            <circle
              cx="100"
              cy="100"
              r="85"
              stroke="currentColor"
              strokeWidth="4"
              fill="transparent"
              strokeLinecap="round"
              className="text-white/5"
            />
            <circle
              cx="100"
              cy="100"
              r="85"
              stroke="currentColor"
              strokeWidth="4"
              fill="transparent"
              strokeLinecap="round"
              strokeDasharray={534}
              strokeDashoffset={534 - (534 * progressPercent) / 100}
              className={`transition-all duration-1000 ease-linear ${activeColorClass.split(' ')[0]}`}
              style={{ filter: `drop-shadow(0 0 8px ${shadowColor})` }}
            />

            {/* Sweeping Orbiting Dot */}
            {state !== 'idle' && (
              <g className="transition-all duration-1000 ease-linear" transform={`rotate(${rotationDegrees} 100 100)`}>
                <circle cx="100" cy="15" r="4" fill="currentColor" className={activeColorClass.split(' ')[0]} style={{ filter: `drop-shadow(0 0 10px ${shadowColor})` }} />
                <circle cx="100" cy="15" r="2" fill="white" />
              </g>
            )}
          </svg>
        </div>

        {/* Inner Digital Time Display */}
        <div className="flex flex-col items-center z-20 mt-4">
          <motion.span 
            key={timeLeft}
            initial={{ opacity: 0.8, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-5xl font-black tracking-tighter text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.2)] tabular-nums"
          >
            {formatTime(timeLeft)}
          </motion.span>
          <span className={`text-[10px] uppercase tracking-[0.3em] mt-2 font-bold ${activeColorClass.split(' ')[0]}`}>
            {state === 'idle' ? 'Ready to Focus' : state === 'focus' ? 'Deep Work' : 'Resting'}
          </span>
        </div>

        {/* Controls - Positioned at bottom of dial */}
        <div className="absolute bottom-10 flex items-center gap-6 z-30">
          <div className={`transition-all duration-300 ${state === 'idle' ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
             <button onClick={() => adjustTime(-5)} className="w-8 h-8 rounded-full flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-colors bg-black/50 backdrop-blur-md border border-white/10">
                <span className="material-symbols-outlined text-[16px]">remove</span>
             </button>
          </div>

          <button
            onClick={toggleTimer}
            className={`w-14 h-14 rounded-full flex items-center justify-center transition-all shadow-[0_0_20px_rgba(0,0,0,0.5)] border border-white/10 backdrop-blur-xl ${
              isActive 
                ? 'bg-white/10 text-white hover:bg-white/20' 
                : 'bg-white text-black hover:scale-105 shadow-[0_0_30px_rgba(255,255,255,0.3)]'
            }`}
          >
            <span className="material-symbols-outlined text-3xl" style={{fontVariationSettings: "'FILL' 1"}}>
              {isActive ? 'pause' : 'play_arrow'}
            </span>
          </button>

          {state !== 'idle' ? (
            <div className="transition-all duration-300 animate-in fade-in slide-in-from-left-4">
              <button
                onClick={resetTimer}
                className="w-8 h-8 rounded-full flex items-center justify-center bg-white/5 text-white/50 hover:bg-white/10 hover:text-white transition-all border border-white/10 backdrop-blur-md"
              >
                <span className="material-symbols-outlined text-[16px]">stop</span>
              </button>
            </div>
          ) : (
             <div className="transition-all duration-300 opacity-100">
                <button onClick={() => adjustTime(5)} className="w-8 h-8 rounded-full flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-colors bg-black/50 backdrop-blur-md border border-white/10">
                   <span className="material-symbols-outlined text-[16px]">add</span>
                </button>
             </div>
          )}
        </div>
        
        {/* Decorative Dial Screw (Center) */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[60px] w-2 h-2 rounded-full bg-white/10 border border-white/20 z-0"></div>

      </div>

      {/* Edge Bar Focus Mode Overlay (Automatically active when timer runs AND in focus mode) */}
      <AnimatePresence>
        {state !== 'idle' && isFocusMode && typeof document !== 'undefined' && createPortal(
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="fixed inset-0 z-[100] pointer-events-none"
          >
            {/* Glowing Edge Bar */}
            <svg className="absolute inset-0 w-full h-full drop-shadow-[0_0_20px_rgba(255,0,0,0.8)]" style={{ filter: `drop-shadow(0 0 20px ${shadowColor})` }}>
              <rect 
                x="4" y="4" 
                width="calc(100% - 8px)" height="calc(100% - 8px)" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="4"
                rx="16"
                ry="16"
                pathLength="100"
                strokeDasharray="100"
                strokeDashoffset={progressPercent}
                className={`transition-all duration-1000 ease-linear ${activeColorClass.split(' ')[0]}`}
              />
            </svg>
            
            {/* Subtle floating numerical time */}
            <div className={`absolute bottom-12 left-1/2 -translate-x-1/2 text-4xl font-black tabular-nums tracking-[0.2em] opacity-30 drop-shadow-[0_0_15px_rgba(255,255,255,0.1)] ${activeColorClass.split(' ')[0]}`}>
              {formatTime(timeLeft)}
            </div>
          </motion.div>,
          document.body
        )}
      </AnimatePresence>
    </div>
  );
}
