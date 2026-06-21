"use client";

import { refreshNewsFeed } from "@/app/actions/news";
import { useState } from "react";

export default function RefreshNewsButton() {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await refreshNewsFeed();
    // Small delay to keep the spinning animation visible for a moment
    setTimeout(() => setIsRefreshing(false), 800);
  };

  return (
    <button 
      onClick={handleRefresh}
      disabled={isRefreshing}
      className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-secondary-container/30 hover:bg-secondary-container/50 text-secondary transition-all duration-300 disabled:opacity-50 group"
    >
      <span className={`material-symbols-outlined text-[18px] ${isRefreshing ? 'animate-spin' : 'group-hover:rotate-180 transition-transform duration-500'}`}>
        sync
      </span>
      <span className="text-xs font-bold uppercase tracking-widest">
        {isRefreshing ? 'Refreshing...' : 'Get New Briefs'}
      </span>
    </button>
  );
}
