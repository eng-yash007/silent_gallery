"use client";

import { useState, useEffect } from "react";
import { generateAIBriefing } from "@/app/actions/ai";
import { motion } from "framer-motion";

export default function AIBriefingWidget({ selectedDate }: { selectedDate: string }) {
  const [briefing, setBriefing] = useState<string | null>(null);
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [displayedText, setDisplayedText] = useState("");

  // Typewriter effect
  useEffect(() => {
    if (!briefing) return;
    
    let i = 0;
    setDisplayedText("");
    
    const interval = setInterval(() => {
      setDisplayedText(prev => prev + briefing.charAt(i));
      i++;
      if (i >= briefing.length) {
        clearInterval(interval);
      }
    }, 30); // Speed of typing
    
    return () => clearInterval(interval);
  }, [briefing]);

  const handleGenerate = async () => {
    setLoading(true);
    setBriefing(null);
    setDisplayedText("");
    
    // Get local time context
    const now = new Date();
    const localTimeString = now.toLocaleTimeString('en-US', { hour12: false });
    const currentDate = now.toLocaleDateString('en-CA');

    const res = await generateAIBriefing(selectedDate, localTimeString, currentDate);
    
    if (res.success && res.data) {
      setBriefing(res.data.briefing);
      setStats(res.data.stats);
    } else {
      setBriefing("Failed to establish neural link. Try again.");
    }
    setLoading(false);
  };

  // Helper to safely render simple markdown **bold**
  const renderText = (text: string) => {
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={i} className="text-secondary font-black">{part.slice(2, -2)}</strong>;
      }
      return <span key={i}>{part}</span>;
    });
  };

  return (
    <aside className="col-span-4 sticky top-32 flex flex-col gap-8">
      <div className="p-8 rounded-[2rem] bg-surface-container-low/50 border-[0.5px] border-outline-variant/10 shadow-lg relative overflow-hidden">
        
        {/* Loading Gradient Sweep */}
        {loading && (
          <motion.div 
            initial={{ x: "-100%" }}
            animate={{ x: "200%" }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-secondary/10 to-transparent z-0"
          />
        )}

        <div className="flex items-center gap-3 mb-6 relative z-10">
          <span className={`material-symbols-outlined ${loading ? 'text-secondary animate-pulse' : 'text-primary'}`} style={{fontVariationSettings: "'opsz' 20"}}>
            {loading ? 'model_training' : 'auto_awesome'}
          </span>
          <span className="text-[0.65rem] uppercase tracking-[0.25em] font-bold text-on-surface">AI Briefing</span>
        </div>
        
        <div className="min-h-[120px] relative z-10">
          {displayedText ? (
            <p className="text-sm leading-relaxed text-on-surface-variant font-medium whitespace-pre-wrap">
              {renderText(displayedText)}
              {displayedText.length < (briefing?.length || 0) && (
                <span className="inline-block w-1.5 h-4 ml-1 bg-secondary animate-pulse"></span>
              )}
            </p>
          ) : !loading ? (
            <div className="flex flex-col gap-4 items-start">
              <p className="text-sm text-outline italic">System is waiting for your command to analyze the timeline.</p>
              <button 
                onClick={handleGenerate}
                className="px-6 py-3 rounded-xl bg-secondary text-on-secondary font-bold text-xs uppercase tracking-widest shadow-[0_10px_20px_rgba(0,91,194,0.2)] hover:bg-secondary/90 transition-all hover:scale-105 active:scale-95 flex items-center gap-2"
              >
                <span className="material-symbols-outlined text-[16px]">bolt</span>
                Generate Summary
              </button>
            </div>
          ) : (
             <p className="text-sm text-secondary font-bold tracking-widest uppercase animate-pulse">Aggregating Data Modules...</p>
          )}
        </div>

        {/* Stats Section only shows after generation */}
        {stats && displayedText.length === briefing?.length && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col gap-3 mt-8 pt-6 border-t border-outline-variant/10 relative z-10"
          >
            <div className="flex justify-between items-center text-[0.65rem] uppercase tracking-widest text-outline">
              <span>Predicted Focus</span>
              <span className="text-secondary font-bold truncate max-w-[120px] text-right">{stats.focus}</span>
            </div>
            <div className="w-full h-1 bg-surface-container rounded-full overflow-hidden">
              <div className="w-[85%] h-full bg-secondary rounded-full"></div>
            </div>
          </motion.div>
        )}
      </div>

      <div className="relative overflow-hidden rounded-[2rem] h-64 group cursor-pointer shadow-lg">
        <img alt="Inspirational office space" className="w-full h-full object-cover grayscale brightness-75 transition-transform duration-700 group-hover:scale-110" src="/focus_workspace.png" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-8">
          <span className="text-[0.6rem] uppercase tracking-[0.3em] text-white/70 mb-2">Space for thought</span>
          <h4 className="text-xl font-light text-white tracking-tight">The clarity of silence is the ultimate tool.</h4>
        </div>
      </div>
    </aside>
  );
}
