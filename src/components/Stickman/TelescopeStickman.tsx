"use client";

import { motion } from "framer-motion";

export default function TelescopeStickman() {
  return (
    <div className="absolute -top-16 right-4 md:-top-20 md:right-10 w-24 h-24 md:w-32 md:h-32 pointer-events-none z-30">
      <svg viewBox="0 0 100 100" className="w-full h-full text-zinc-800 dark:text-zinc-200" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        
        {/* Telescope and Stand */}
        <motion.g animate={{ rotate: [-2, 2, -2] }} style={{ originX: '40px', originY: '80px' }} transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}>
          {/* Stand */}
          <line x1="40" y1="80" x2="30" y2="100" />
          <line x1="40" y1="80" x2="50" y2="100" />
          
          {/* Tube */}
          <polygon points="20,70 60,50 62,55 22,75" fill="white" stroke="currentColor" strokeWidth="2.5" />
          
          {/* Stickman holding it */}
          <g>
            <circle cx="70" cy="55" r="10" fill="white" />
            <circle cx="65" cy="53" r="1.5" fill="currentColor" stroke="none" />
            {/* Body */}
            <path d="M70 65 Q 75 80 70 95" />
            {/* Arms */}
            <path d="M70 70 Q 55 60 50 65" />
            <path d="M70 70 Q 60 80 55 70" />
            {/* Legs sitting */}
            <path d="M70 95 L 60 95 L 60 100" />
          </g>
        </motion.g>

        {/* Stars */}
        <motion.circle cx="15" cy="25" r="1" fill="currentColor" stroke="none" animate={{ opacity: [0.2, 1, 0.2] }} transition={{ repeat: Infinity, duration: 2 }} />
        <motion.circle cx="35" cy="15" r="1.5" fill="currentColor" stroke="none" animate={{ opacity: [0.2, 1, 0.2] }} transition={{ repeat: Infinity, duration: 3 }} />
        <motion.circle cx="55" cy="20" r="1" fill="currentColor" stroke="none" animate={{ opacity: [0.2, 1, 0.2] }} transition={{ repeat: Infinity, duration: 1.5 }} />
      </svg>
    </div>
  );
}
