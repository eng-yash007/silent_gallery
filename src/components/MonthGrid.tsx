"use client";

import { useState } from "react";

export default function MonthGrid({ events }: { events: any[] }) {
  const [currentDate, setCurrentDate] = useState(new Date());

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  // Get first day of month and total days
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // Create array of days for the grid
  const days = [];
  
  // Fill empty days before the 1st
  for (let i = 0; i < firstDay; i++) {
    days.push(null);
  }
  
  // Fill actual days
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i);
  }

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

  // Helper to get events for a specific day
  const getEventsForDay = (day: number) => {
    const targetDateStr = new Date(year, month, day).toLocaleDateString('en-CA');
    return events.filter(e => {
      const eDate = e.start?.dateTime || e.start?.date;
      if (!eDate) return false;
      // Convert event date to local YYYY-MM-DD
      const eDateStr = new Date(eDate).toLocaleDateString('en-CA');
      return eDateStr === targetDateStr;
    });
  };

  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const formatTime = (dateTimeString: string) => {
    if (!dateTimeString) return "";
    const date = new Date(dateTimeString);
    return date.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true });
  };

  return (
    <div className="w-full">
      {/* Month Header */}
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-3xl font-bold tracking-tight text-on-surface">
          {monthNames[month]} <span className="font-light text-outline">{year}</span>
        </h3>
        <div className="flex gap-2">
          <button onClick={prevMonth} className="w-10 h-10 rounded-full flex items-center justify-center bg-surface-container-low hover:bg-surface-container transition-colors border border-outline-variant/10">
            <span className="material-symbols-outlined text-on-surface-variant">chevron_left</span>
          </button>
          <button onClick={nextMonth} className="w-10 h-10 rounded-full flex items-center justify-center bg-surface-container-low hover:bg-surface-container transition-colors border border-outline-variant/10">
            <span className="material-symbols-outlined text-on-surface-variant">chevron_right</span>
          </button>
        </div>
      </div>

      {/* Grid */}
      <div className="bg-surface-container-lowest rounded-3xl border border-outline-variant/20 overflow-hidden shadow-2xl shadow-black/5">
        
        {/* Days of week header */}
        <div className="grid grid-cols-7 border-b border-outline-variant/20 bg-surface-container-low/30">
          {weekDays.map(day => (
            <div key={day} className="py-4 text-center text-[10px] uppercase font-bold tracking-widest text-outline">
              {day}
            </div>
          ))}
        </div>

        {/* Days grid */}
        <div className="grid grid-cols-7">
          {days.map((day, idx) => {
            const dayEvents = day ? getEventsForDay(day) : [];
            const isToday = day === new Date().getDate() && month === new Date().getMonth() && year === new Date().getFullYear();

            return (
              <div 
                key={idx} 
                className={`min-h-[140px] border-r border-b border-outline-variant/10 p-2 transition-colors ${
                  !day ? "bg-surface-container-lowest/50" : "hover:bg-surface-container-lowest/80"
                } ${idx % 7 === 6 ? "border-r-0" : ""} ${(Math.floor(idx / 7) === Math.floor((days.length - 1) / 7)) ? "border-b-0" : ""}`}
              >
                {day && (
                  <div className="flex flex-col h-full">
                    <div className="flex justify-between items-start mb-2">
                      <span className={`w-8 h-8 flex items-center justify-center rounded-full text-sm font-semibold ${
                        isToday ? "bg-secondary text-on-secondary shadow-lg shadow-secondary/30" : "text-on-surface-variant"
                      }`}>
                        {day}
                      </span>
                      {dayEvents.length > 0 && (
                        <span className="text-[10px] font-bold text-secondary bg-secondary/10 px-2 py-0.5 rounded-md">
                          {dayEvents.length}
                        </span>
                      )}
                    </div>
                    
                    <div className="flex flex-col gap-1 overflow-y-auto no-scrollbar max-h-[90px]">
                      {dayEvents.map(e => {
                        const meetLink = e.hangoutLink || (e.conferenceData?.entryPoints || []).find((ep: any) => ep.entryPointType === 'video')?.uri;
                        return (
                          <div key={e.id} className={`px-2 py-1.5 rounded-lg text-xs truncate transition-all cursor-default ${
                            meetLink ? "bg-blue-500/10 text-blue-600 border border-blue-500/20" : "bg-surface-container text-on-surface-variant border border-outline-variant/10"
                          }`} title={e.summary}>
                            <span className="font-bold mr-1">{formatTime(e.start?.dateTime)}</span>
                            {e.summary || "Untitled"}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
