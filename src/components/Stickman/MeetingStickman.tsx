"use client";

import { motion } from "framer-motion";

export default function MeetingStickman() {
  return (
    <div className="absolute -top-16 right-0 md:-top-20 md:right-10 w-24 h-24 md:w-32 md:h-32 pointer-events-none z-30 opacity-80">
      <svg viewBox="0 0 100 100" className="w-full h-full text-zinc-800 dark:text-zinc-200" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        {/* Table */}
        <line x1="10" y1="80" x2="90" y2="80" strokeWidth="4" />
        <line x1="20" y1="80" x2="20" y2="100" strokeWidth="4" />
        <line x1="80" y1="80" x2="80" y2="100" strokeWidth="4" />
        
        {/* Coffee Mug */}
        <g>
          <path d="M60 70 L 60 80 L 70 80 L 70 70 Z" fill="white" />
          <path d="M70 72 A 3 3 0 0 1 70 78" />
          {/* Steam */}
          <motion.path d="M63 65 Q 65 60 63 55" animate={{ d: ["M63 65 Q 65 60 63 55", "M63 65 Q 61 60 63 55", "M63 65 Q 65 60 63 55"] }} transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }} />
        </g>

        {/* Stickman sitting and talking */}
        <g>
          <circle cx="40" cy="40" r="10" fill="white" />
          {/* Speaking mouth */}
          <motion.circle cx="45" cy="43" r="2" fill="currentColor" stroke="none" animate={{ scaleY: [0.5, 1.5, 0.5] }} transition={{ repeat: Infinity, duration: 0.5 }} />
          
          <path d="M40 50 L 40 80" />
          {/* Arm resting on table */}
          <path d="M40 55 Q 50 65 55 80" />
          {/* Arm gesturing */}
          <motion.path d="M40 55 Q 30 60 35 65" animate={{ d: ["M40 55 Q 30 60 35 65", "M40 55 Q 30 50 35 55", "M40 55 Q 30 60 35 65"] }} transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }} />
          {/* Legs under table */}
          <path d="M40 80 L 30 100" />
        </g>
      </svg>
    </div>
  );
}
