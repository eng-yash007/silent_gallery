"use client";

import { motion } from "framer-motion";

export default function NewsStickman() {
  return (
    <div className="absolute -top-16 right-0 md:-top-20 md:right-10 w-24 h-24 md:w-32 md:h-32 pointer-events-none z-30 opacity-80">
      <svg viewBox="0 0 100 100" className="w-full h-full text-zinc-800 dark:text-zinc-200" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <g>
          {/* Head */}
          <circle cx="50" cy="40" r="10" fill="white" />
          
          {/* Glasses */}
          <circle cx="45" cy="40" r="3" />
          <circle cx="55" cy="40" r="3" />
          <line x1="48" y1="40" x2="52" y2="40" />

          {/* Body */}
          <path d="M50 50 L 50 80" />

          {/* Legs sitting cross-legged */}
          <path d="M50 80 Q 30 90 40 95" />
          <path d="M50 80 Q 70 90 60 95" />

          {/* Arms holding newspaper */}
          <path d="M50 55 Q 30 60 30 70" />
          <path d="M50 55 Q 70 60 70 70" />

          {/* Animated Newspaper */}
          <motion.g animate={{ y: [-1, 1, -1] }} transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}>
            <polygon points="30,55 70,55 75,85 25,85" fill="white" stroke="currentColor" strokeWidth="2.5" />
            <line x1="35" y1="65" x2="65" y2="65" />
            <line x1="35" y1="75" x2="55" y2="75" />
          </motion.g>
        </g>
      </svg>
    </div>
  );
}
