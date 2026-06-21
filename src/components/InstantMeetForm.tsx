"use client";

import { useState } from "react";
import { createInstantMeet } from "@/app/actions/calendar";

export default function InstantMeetForm() {
  const [isCreating, setIsCreating] = useState(false);

  const handleCreate = async () => {
    setIsCreating(true);
    const result = await createInstantMeet();
    
    if (result.success && result.meetLink) {
      window.open(result.meetLink, "_blank");
    } else {
      alert("Failed to create Instant Meet. " + (result.error || ""));
    }
    
    setIsCreating(false);
  };

  return (
    <div className="bg-blue-600/10 p-8 rounded-[2.5rem] border border-blue-600/20 relative overflow-hidden group">
      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/20 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/4 pointer-events-none"></div>
      
      <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center justify-between">
        <div className="flex items-center gap-6">
          <div className="w-16 h-16 rounded-full bg-blue-600 flex items-center justify-center text-white shrink-0 shadow-lg shadow-blue-600/30">
            <span className="material-symbols-outlined text-3xl">video_call</span>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-on-surface mb-1">Instant Meet</h3>
            <p className="text-sm text-outline-variant">Generate a Google Meet link and jump right in.</p>
          </div>
        </div>

        <button 
          onClick={handleCreate}
          disabled={isCreating}
          className="w-full md:w-auto px-8 py-4 bg-blue-600 text-white font-bold rounded-2xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/20 flex items-center justify-center gap-3 disabled:opacity-50"
        >
          {isCreating ? (
            <>
              <span className="material-symbols-outlined animate-spin text-[20px]">progress_activity</span>
              Generating...
            </>
          ) : (
            <>
              <span className="material-symbols-outlined text-[20px]">videocam</span>
              Start Now
            </>
          )}
        </button>
      </div>
    </div>
  );
}
