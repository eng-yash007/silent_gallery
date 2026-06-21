"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { getDbNotifications } from "@/app/actions/notifications";
import { Notification } from "@prisma/client";

export default function NotificationDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Close dropdown when clicking outside
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const fetchNotifications = async () => {
    setIsLoading(true);
    const res = await getDbNotifications();
    if (res.success && res.data) {
      setNotifications(res.data as Notification[]);
    }
    setIsLoading(false);
  };

  const handleToggle = () => {
    if (!isOpen) {
      fetchNotifications();
    }
    setIsOpen(!isOpen);
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'task_overdue': return 'error';
      case 'task_due_soon': return 'schedule';
      case 'meeting_soon': return 'event';
      default: return 'notifications';
    }
  };

  const getIconColors = (type: string) => {
    switch (type) {
      case 'task_overdue': return 'bg-error/10 text-error';
      case 'task_due_soon': return 'bg-orange-500/10 text-orange-500';
      case 'meeting_soon': return 'bg-secondary/10 text-secondary';
      default: return 'bg-zinc-100 text-zinc-500';
    }
  };

  return (
    <div className="relative inline-flex items-center" ref={dropdownRef}>
      <button 
        onClick={handleToggle}
        className="relative material-symbols-outlined text-primary hover:text-secondary transition-colors inline-flex cursor-pointer z-50" 
        title="Notifications"
      >
        notifications
        {notifications.length > 0 && !isOpen && (
          <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-error rounded-full border-2 border-white dark:border-zinc-900"></span>
        )}
      </button>
      
      {isOpen && (
        <div className="absolute right-0 top-[calc(100%+10px)] w-80 bg-white dark:bg-zinc-900 shadow-[0px_20px_40px_rgba(45,51,56,0.1)] rounded-2xl border border-outline-variant/20 dark:border-zinc-700/50 z-[100] flex flex-col animate-in fade-in slide-in-from-top-2 duration-200">
          {/* Header */}
          <div className="p-4 border-b border-outline-variant/10 flex justify-between items-center bg-surface-container-lowest rounded-t-2xl">
            <h3 className="font-bold text-sm text-on-surface tracking-wide uppercase">Action Items</h3>
            {notifications.length > 0 && (
              <span className="bg-error/10 text-error text-[10px] px-2 py-0.5 rounded-full font-bold">
                {notifications.length} Alerts
              </span>
            )}
          </div>

          {/* List */}
          <div className="max-h-80 overflow-y-auto p-2 space-y-1">
            {isLoading ? (
              <div className="py-12 flex flex-col items-center justify-center text-zinc-400">
                <span className="material-symbols-outlined animate-spin text-2xl mb-2">progress_activity</span>
                <p className="text-xs">Scanning ecosystem...</p>
              </div>
            ) : notifications.length === 0 ? (
              <div className="py-12 flex flex-col items-center justify-center text-zinc-400">
                <span className="material-symbols-outlined text-4xl mb-2 text-zinc-200">check_circle</span>
                <p className="text-sm font-medium text-zinc-500">You're all caught up!</p>
                <p className="text-xs text-zinc-400 mt-1 text-center px-4">No overdue tasks or upcoming meetings.</p>
              </div>
            ) : (
              notifications.map(noti => (
                <Link 
                  href={noti.link || "#"} 
                  key={noti.id}
                  onClick={() => setIsOpen(false)}
                  className="p-3 rounded-xl hover:bg-surface-container-low transition-colors cursor-pointer flex gap-3 group"
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${getIconColors(noti.type)}`}>
                    <span className="material-symbols-outlined text-[16px]">{getIcon(noti.type)}</span>
                  </div>
                  <div className="flex-grow pr-2 overflow-hidden">
                    <p className={`text-xs font-bold ${noti.type === 'task_overdue' ? 'text-error' : 'text-on-surface'}`}>
                      {noti.title}
                    </p>
                    <p className="text-[11px] text-on-surface-variant truncate mt-0.5">{noti.description}</p>
                    <p className="text-[10px] text-primary mt-1 font-medium">{noti.timeString}</p>
                  </div>
                </Link>
              ))
            )}
          </div>

          {/* Footer */}
          <div className="p-3 border-t border-outline-variant/10 text-center bg-surface-container-lowest rounded-b-2xl">
            <span className="text-[10px] text-zinc-400 font-medium uppercase tracking-widest">App Specific Alerts Only</span>
          </div>
        </div>
      )}
    </div>
  );
}
