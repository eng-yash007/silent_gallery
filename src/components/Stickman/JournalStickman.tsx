"use client";

import { motion } from "framer-motion";

export default function JournalStickman() {
  return (
    <div className="absolute -top-16 right-0 md:-top-20 md:right-10 w-24 h-24 md:w-32 md:h-32 pointer-events-none z-30 opacity-80">
      <svg viewBox="0 0 100 100" className="w-full h-full text-zinc-800 dark:text-zinc-200" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <g>
          {/* Stickman holding pencil */}
          <circle cx="50" cy="50" r="10" fill="white" />
          <path d="M50 60 L 50 85" />
          {/* Sitting Legs */}
          <path d="M50 85 L 40 100" />
          <path d="M50 85 L 60 100" />
          
          <motion.g animate={{ rotate: [-5, 5, -5] }} style={{ originX: '50px', originY: '65px' }} transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}>
            {/* Arms */}
            <path d="M50 65 Q 60 65 65 55" />
            <path d="M50 65 Q 40 50 45 45" />
            
            {/* Giant Pencil */}
            <g transform="translate(5, 5)">
              <polygon points="20,80 80,20 90,30 30,90" fill="white" stroke="currentColor" />
              <polygon points="20,80 10,95 30,90" fill="currentColor" />
              <line x1="70" y1="30" x2="80" y2="40" />
            </g>
          </motion.g>
        </g>
      </svg>
    </div>
  );
}
