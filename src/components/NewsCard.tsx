"use client";

import { useState } from "react";
import { generateBriefing } from "@/app/actions/news";

export default function NewsCard({ 
  item, 
  title, 
  source, 
  date, 
  isFeatured 
}: { 
  item: any, 
  title: string, 
  source: string, 
  date: string, 
  isFeatured: boolean 
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [briefing, setBriefing] = useState<string[] | null>(null);
  const [sentiment, setSentiment] = useState<string | null>(null);

  const handleBriefing = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (briefing) {
      setIsExpanded(!isExpanded);
      return;
    }

    setIsLoading(true);
    setIsExpanded(true);
    
    const result = await generateBriefing(item.contentSnippet);
    if (result.success && result.summary) {
      setBriefing(result.summary);
      setSentiment(result.sentiment || "Neutral");
    } else {
      setBriefing(["Failed to generate briefing. The article snippet might be missing."]);
    }
    setIsLoading(false);
  };

  const sentimentColor = 
    sentiment === "Positive" ? "text-green-500 bg-green-500/10 border-green-500/20" :
    sentiment === "Negative" ? "text-red-500 bg-red-500/10 border-red-500/20" :
    "text-outline bg-surface-container border-outline-variant/20";

  return (
    <div 
      className={`group relative flex flex-col justify-between overflow-hidden rounded-[2rem] bg-surface-container-lowest transition-all duration-700 hover:shadow-[0px_30px_60px_rgba(45,51,56,0.08)] hover:-translate-y-1 border border-outline-variant/10 ${
        isFeatured ? "md:col-span-12 p-10 md:p-14 bg-gradient-to-br from-surface-container-lowest to-surface-container-low" : "md:col-span-6 p-8"
      }`}
    >
      <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/5 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 group-hover:bg-secondary/10 transition-colors duration-700 pointer-events-none"></div>

      <div className="relative z-10 flex-grow flex flex-col">
        <div className="flex justify-between items-start mb-6">
          <div className="flex gap-2 items-center">
            <span className="inline-block px-3 py-1 rounded-full bg-surface-container text-[10px] font-bold uppercase tracking-widest text-outline-variant group-hover:text-secondary group-hover:bg-secondary/10 transition-colors duration-300">
              {source}
            </span>
            {sentiment && (
              <span className={`inline-block px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border ${sentimentColor} transition-colors duration-300 animate-pulse`}>
                {sentiment}
              </span>
            )}
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-bold uppercase tracking-widest text-outline">
              {date}
            </span>
          </div>
        </div>
        
        <a href={item.link} target="_blank" rel="noopener noreferrer" className="block flex-grow">
          <h2 className={`font-headline font-semibold text-on-surface leading-tight tracking-tight group-hover:text-secondary transition-colors duration-500 ${
            isFeatured ? "text-3xl md:text-5xl max-w-4xl" : "text-2xl"
          }`}>
            {title}
          </h2>
        </a>

        {/* AI Briefing Dropdown */}
        <div className={`transition-all duration-700 overflow-hidden ${isExpanded ? "max-h-[500px] mt-8 opacity-100" : "max-h-0 opacity-0"}`}>
          <div className="p-6 bg-surface-container/30 rounded-2xl border border-outline-variant/10">
            <div className="flex items-center gap-2 mb-4">
              <span className="material-symbols-outlined text-secondary text-sm">auto_awesome</span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-secondary">AI Briefing</span>
            </div>
            
            {isLoading ? (
              <div className="flex flex-col gap-3 animate-pulse">
                <div className="h-2 bg-surface-container-high rounded w-full"></div>
                <div className="h-2 bg-surface-container-high rounded w-5/6"></div>
                <div className="h-2 bg-surface-container-high rounded w-4/6"></div>
              </div>
            ) : briefing ? (
              <ul className="space-y-3">
                {briefing.map((sentence, idx) => (
                  <li key={idx} className="text-sm text-on-surface-variant font-light leading-relaxed flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-secondary mt-1.5 shrink-0"></span>
                    <span>{sentence}</span>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        </div>

      </div>

      <div className={`relative z-10 flex items-center justify-between border-outline-variant/10 ${
        isFeatured ? "mt-16 pt-8 border-t" : "mt-12 pt-6 border-t"
      }`}>
        <button 
          onClick={handleBriefing}
          className="text-xs font-bold uppercase tracking-widest text-outline hover:text-on-surface transition-colors focus:outline-none"
        >
          {isExpanded ? "Hide Briefing" : "Read Briefing"}
        </button>
        <a 
          href={item.link} 
          target="_blank" 
          rel="noopener noreferrer"
          className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center hover:bg-secondary transition-colors duration-500 group/link"
        >
          <span className="material-symbols-outlined text-sm text-outline group-hover/link:text-on-secondary transition-colors">arrow_forward</span>
        </a>
      </div>
    </div>
  );
}
