"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export type NotificationData = {
  id: string;
  title: string;
  description: string;
  time: string;
  type: "meeting" | "task" | "system";
};

export default function PremiumNotification() {
  const [notifications, setNotifications] = useState<NotificationData[]>([]);
  const [activeNotification, setActiveNotification] = useState<NotificationData | null>(null);

  // Expose a global method for testing/triggering
  useEffect(() => {
    const handleTrigger = (e: CustomEvent<NotificationData>) => {
      const newNotif = e.detail;
      setNotifications((prev) => [...prev, newNotif]);
    };

    window.addEventListener("trigger-notification", handleTrigger as EventListener);
    return () => window.removeEventListener("trigger-notification", handleTrigger as EventListener);
  }, []);

  // Process queue
  useEffect(() => {
    if (!activeNotification && notifications.length > 0) {
      const next = notifications[0];
      setActiveNotification(next);
      setNotifications((prev) => prev.slice(1));

      // Auto-dismiss after 8 seconds
      setTimeout(() => {
        setActiveNotification(null);
      }, 8000);
    }
  }, [notifications, activeNotification]);

  const getIcon = (type: string) => {
    switch (type) {
      case "meeting": return "videocam";
      case "task": return "check_circle";
      default: return "notifications";
    }
  };

  const getTheme = (type: string) => {
    switch (type) {
      case "meeting": 
        return {
          glow: "shadow-[0_0_40px_rgba(10,132,255,0.3)]",
          border: "border-blue-500/30",
          iconBg: "bg-blue-500/20 text-blue-400",
          buttonBg: "bg-blue-500/20 hover:bg-blue-500/30 text-blue-300"
        };
      case "task": 
        return {
          glow: "shadow-[0_0_40px_rgba(255,159,10,0.3)]",
          border: "border-orange-500/30",
          iconBg: "bg-orange-500/20 text-orange-400",
          buttonBg: "bg-orange-500/20 hover:bg-orange-500/30 text-orange-300"
        };
      default: 
        return {
          glow: "shadow-[0_0_40px_rgba(255,255,255,0.1)]",
          border: "border-white/20",
          iconBg: "bg-white/10 text-white",
          buttonBg: "bg-white/10 hover:bg-white/20 text-white"
        };
    }
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-[10000] flex justify-center pointer-events-none mt-6">
      <AnimatePresence mode="wait">
        {activeNotification && (
          <motion.div
            key={activeNotification.id}
            initial={{ y: -50, scale: 0.8, opacity: 0, filter: "blur(10px)" }}
            animate={{ 
              y: 0, 
              scale: 1, 
              opacity: 1, 
              filter: "blur(0px)",
              transition: { 
                type: "spring", 
                stiffness: 400, 
                damping: 25,
                mass: 0.5
              } 
            }}
            exit={{ 
              y: -50, 
              scale: 0.8, 
              opacity: 0, 
              filter: "blur(10px)",
              transition: { duration: 0.3, ease: "easeInOut" } 
            }}
            className="pointer-events-auto"
          >
            {/* Dynamic Island Style Pill */}
            <div className={`relative overflow-hidden bg-[#0c0e10]/95 backdrop-blur-3xl border ${getTheme(activeNotification.type).border} rounded-[2rem] ${getTheme(activeNotification.type).glow} min-w-[340px] max-w-[420px] p-1`}>
              
              {/* Subtle pulsing glow */}
              <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent opacity-50 pointer-events-none"></div>

              <div className="flex items-start gap-4 p-4 relative z-10">
                
                {/* Icon Container with animation */}
                <motion.div 
                  initial={{ rotate: -20, scale: 0 }}
                  animate={{ rotate: 0, scale: 1 }}
                  transition={{ delay: 0.2, type: "spring" }}
                  className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${getTheme(activeNotification.type).iconBg}`}
                >
                  <span className={`material-symbols-outlined text-2xl`} style={{fontVariationSettings: "'FILL' 1"}}>
                    {getIcon(activeNotification.type)}
                  </span>
                </motion.div>

                {/* Content */}
                <div className="flex-grow pt-1">
                  <div className="flex justify-between items-start mb-1">
                    <motion.h4 
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 }}
                      className="text-white font-bold text-base tracking-tight"
                    >
                      {activeNotification.title}
                    </motion.h4>
                    <motion.span 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.4 }}
                      className="text-xs font-bold tracking-widest uppercase text-white/40"
                    >
                      {activeNotification.time}
                    </motion.span>
                  </div>
                  
                  <motion.p 
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="text-white/70 text-sm leading-snug"
                  >
                    {activeNotification.description}
                  </motion.p>
                </div>

              </div>

              {/* Action Buttons */}
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                transition={{ delay: 0.5 }}
                className="flex gap-2 px-4 pb-4 pt-2 relative z-10"
              >
                <button 
                  onClick={() => setActiveNotification(null)}
                  className="flex-1 bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-colors py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest border border-white/5"
                >
                  Dismiss
                </button>
                <button 
                  onClick={() => setActiveNotification(null)}
                  className={`flex-1 ${getTheme(activeNotification.type).buttonBg} transition-all py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest shadow-inner border border-white/5`}
                >
                  View details
                </button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
