"use client";

import { createCalendarEvent } from "@/app/actions/calendar";
import { useRef, useState } from "react";

export default function CreateEventForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [isCapturing, setIsCapturing] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleAction = async (formData: FormData) => {
    setIsCapturing(true);
    setErrorMsg("");
    
    const result = await createCalendarEvent(null, formData);
    
    if (result.success) {
      formRef.current?.reset();
    } else {
      setErrorMsg(result.error || "Failed to create event");
    }
    
    setIsCapturing(false);
  };

  // Get today's date formatted for the input
  const today = new Date().toISOString().split("T")[0];

  return (
    <form ref={formRef} action={handleAction} className="bg-surface-container-lowest p-8 rounded-2xl shadow-[0px_20px_40px_rgba(45,51,56,0.04)] border border-outline-variant/10 group relative overflow-hidden transition-all duration-500 hover:shadow-[0px_30px_60px_rgba(45,51,56,0.06)] hover:-translate-y-1">
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 group-hover:bg-primary/10 transition-colors duration-700 pointer-events-none"></div>

      <div className="relative z-10">
        <h3 className="text-xs uppercase tracking-[0.2em] font-bold text-outline-variant mb-6">Schedule Event</h3>
        
        {errorMsg && (
          <div className="bg-error/10 text-error p-3 rounded-lg text-sm mb-4">
            {errorMsg}
          </div>
        )}

        <div className="space-y-4">
          <input 
            name="summary" 
            type="text" 
            placeholder="Event Title (e.g. Sync with Team)" 
            required 
            className="w-full bg-transparent border-b border-outline-variant/30 pb-3 text-xl font-headline font-semibold text-on-surface focus:outline-none focus:border-primary transition-colors placeholder:text-outline-variant"
          />
          
          <input 
            name="description" 
            type="text" 
            placeholder="Description or Agenda (optional)" 
            className="w-full bg-transparent border-b border-outline-variant/30 pb-3 text-sm text-on-surface-variant font-light focus:outline-none focus:border-primary transition-colors placeholder:text-outline-variant/60"
          />

          <input 
            name="attendees" 
            type="text" 
            placeholder="Invite Guests (comma-separated emails)" 
            className="w-full bg-transparent border-b border-outline-variant/30 pb-3 text-sm text-on-surface-variant font-light focus:outline-none focus:border-primary transition-colors placeholder:text-outline-variant/60 mt-4"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            <div>
              <label className="text-[10px] uppercase font-bold text-outline-variant block mb-1">Date</label>
              <input 
                name="date" 
                type="date" 
                required
                defaultValue={today}
                className="w-full bg-surface-container-low text-sm text-on-surface px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>
            <div>
              <label className="text-[10px] uppercase font-bold text-outline-variant block mb-1">Start Time</label>
              <input 
                name="startTime" 
                type="time" 
                required
                className="w-full bg-surface-container-low text-sm text-on-surface px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>
            <div>
              <label className="text-[10px] uppercase font-bold text-outline-variant block mb-1">End Time</label>
              <input 
                name="endTime" 
                type="time" 
                required
                className="w-full bg-surface-container-low text-sm text-on-surface px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row justify-between items-center gap-4 border-t border-outline-variant/10 pt-6">
          <div className="w-full sm:w-auto flex items-center gap-2">
            <input 
              type="checkbox" 
              name="createMeet" 
              id="createMeet"
              className="w-4 h-4 rounded accent-primary cursor-pointer"
            />
            <label htmlFor="createMeet" className="text-xs font-bold uppercase tracking-widest text-on-surface-variant cursor-pointer">
              Add Google Meet
            </label>
          </div>

          <button 
            type="submit"
            disabled={isCapturing}
            className="w-full sm:w-auto bg-primary text-on-primary px-8 py-3 rounded-xl font-bold uppercase tracking-widest text-[10px] hover:bg-primary/90 transition-all disabled:opacity-50"
          >
            {isCapturing ? "Scheduling..." : "Add to Calendar"}
          </button>
        </div>
      </div>
    </form>
  );
}
