"use client";

import { useState } from "react";
import MonthGrid from "./MonthGrid";
import DeleteEventButton from "./DeleteEventButton";

export default function CalendarViews({ events }: { events: any[] }) {
  const [view, setView] = useState<"timeline" | "month">("month");

  // Helper to format date and time cleanly for timeline view
  const formatTime = (dateTimeString: string) => {
    if (!dateTimeString) return "All Day";
    const date = new Date(dateTimeString);
    return date.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true });
  };
  
  const formatDate = (dateTimeString: string) => {
    if (!dateTimeString) return "";
    const date = new Date(dateTimeString);
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric", weekday: 'short' });
  };

  return (
    <section className="mt-20">
      
      {/* View Toggle */}
      <div className="flex items-center justify-between mb-12 border-b border-outline-variant/20 pb-6">
        <div className="flex items-center gap-3">
          <h3 className="text-sm font-bold uppercase tracking-[0.25em] text-outline">Synced Events</h3>
          <span className="material-symbols-outlined text-lg text-secondary animate-pulse">sync</span>
        </div>

        <div className="bg-surface-container-low p-1 rounded-full flex gap-1 border border-outline-variant/10 shadow-inner">
          <button 
            onClick={() => setView("month")}
            className={`px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all ${
              view === "month" ? "bg-secondary text-on-secondary shadow-md" : "text-outline hover:text-on-surface"
            }`}
          >
            Month
          </button>
          <button 
            onClick={() => setView("timeline")}
            className={`px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all ${
              view === "timeline" ? "bg-secondary text-on-secondary shadow-md" : "text-outline hover:text-on-surface"
            }`}
          >
            Timeline
          </button>
        </div>
      </div>
      
      {events.length === 0 ? (
        <div className="text-center py-20 bg-surface-container-lowest rounded-3xl border border-dashed border-outline-variant/30">
          <span className="material-symbols-outlined text-4xl text-outline mb-4">event_available</span>
          <h3 className="text-xl font-semibold text-on-surface">Your schedule is clear</h3>
          <p className="text-outline mt-2">No upcoming events found on your Google Calendar.</p>
        </div>
      ) : view === "month" ? (
        <MonthGrid events={events} />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.filter((event: any) => {
            const start = event.start?.dateTime || event.start?.date;
            const end = event.end?.dateTime || event.end?.date;
            
            if (!start) return true;

            // Check if event is today
            const eventDate = new Date(start).toLocaleDateString('en-CA', { timeZone: 'Asia/Kolkata' });
            const today = new Date().toLocaleDateString('en-CA', { timeZone: 'Asia/Kolkata' });
            
            if (eventDate === today) return true; // Show all events that happen today
            
            if (!end) return true; // Keep if no end time
            
            // Otherwise, compare end time with current time, only keep if it hasn't ended yet
            return new Date(end).getTime() > new Date().getTime();
          }).map((event: any) => {
            const start = event.start?.dateTime || event.start?.date;
            const end = event.end?.dateTime || event.end?.date;
            const meetLink = event.hangoutLink || (event.conferenceData?.entryPoints || []).find((ep: any) => ep.entryPointType === 'video')?.uri;

            return (
              <div key={event.id} className="group relative bg-surface-container-lowest p-8 rounded-3xl border border-outline-variant/10 hover:shadow-2xl hover:shadow-secondary/5 transition-all duration-500 overflow-hidden flex flex-col justify-between min-h-[250px]">
                <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/5 rounded-full blur-[40px] -translate-y-1/2 translate-x-1/2 group-hover:bg-secondary/10 transition-colors duration-700 pointer-events-none"></div>

                <div>
                  <DeleteEventButton id={event.id} />
                  
                  <div className="flex justify-between items-start mb-6">
                    <span className="text-xs font-bold uppercase tracking-widest text-secondary bg-secondary/10 px-3 py-1 rounded-full">
                      {formatDate(start)}
                    </span>
                    <span className="text-[10px] text-outline font-semibold tracking-wide">
                      {formatTime(start)} — {formatTime(end)}
                    </span>
                  </div>
                  
                  <h4 className="text-2xl font-headline font-semibold text-on-surface mb-3 line-clamp-2">
                    {event.summary || "Untitled Event"}
                  </h4>
                  
                  {event.description && (
                    <p className="text-sm text-outline-variant line-clamp-2 mb-6">
                      {event.description}
                    </p>
                  )}
                </div>

                <div className="mt-8 pt-6 border-t border-outline-variant/10 flex justify-between items-center relative z-10">
                  {meetLink ? (
                    <a 
                      href={meetLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-blue-600/10 text-blue-600 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all"
                    >
                      <span className="material-symbols-outlined text-[16px]">videocam</span>
                      Join Meet
                    </a>
                  ) : (
                    <span className="text-[10px] uppercase font-bold text-outline-variant tracking-widest">
                      Physical / No Link
                    </span>
                  )}
                  <span className="material-symbols-outlined text-outline group-hover:text-secondary transition-colors">event</span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
