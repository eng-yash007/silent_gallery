"use client";

import { motion } from "framer-motion";

export default function BuilderStickman() {
  return (
    <div className="absolute -top-16 right-0 md:-top-20 md:right-10 w-24 h-24 md:w-32 md:h-32 pointer-events-none z-30 opacity-80">
      <svg viewBox="0 0 100 100" className="w-full h-full text-zinc-800 dark:text-zinc-200" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        {/* Ground */}
        <line x1="10" y1="90" x2="90" y2="90" strokeWidth="4" />
        
        {/* Placed Blocks */}
        <rect x="50" y="70" width="20" height="20" rx="2" />
        <rect x="75" y="70" width="10" height="20" rx="2" />
        <rect x="55" y="50" width="15" height="20" rx="2" />

        {/* Stickman Building */}
        <g>
          {/* Head & Body */}
          <circle cx="30" cy="45" r="10" fill="white" />
          <path d="M30 55 Q 25 70 20 90" />
          {/* Legs */}
          <path d="M25 75 L 15 90" />
          <path d="M25 75 L 35 90" />
          
          {/* Animated Arm & Block */}
          <motion.g animate={{ rotate: [-20, 0, -20] }} style={{ originX: '28px', originY: '60px' }} transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}>
            <path d="M28 60 Q 40 40 50 45" />
            <rect x="45" y="35" width="15" height="10" rx="1" fill="white" />
          </motion.g>
          
          {/* Static other arm */}
          <path d="M28 60 Q 35 65 40 70" />
        </g>
      </svg>
    </div>
  );
}
