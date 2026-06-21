"use client";

import { motion } from "framer-motion";

export default function MailboxStickman() {
  return (
    <div className="absolute -top-20 right-0 md:-top-24 md:right-10 w-24 h-24 md:w-32 md:h-32 pointer-events-none z-30 opacity-80">
      <svg viewBox="0 0 100 100" className="w-full h-full text-zinc-800 dark:text-zinc-200" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <motion.g animate={{ y: [-2, 2, -2] }} transition={{ repeat: Infinity, duration: 0.5, ease: "easeInOut" }}>
          {/* Stickman head and body */}
          <circle cx="50" cy="30" r="10" fill="white" />
          <path d="M50 40 L 50 70" />
          
          {/* Running legs */}
          <motion.path d="M50 70 L 40 90" animate={{ d: ["M50 70 L 40 90", "M50 70 L 30 80", "M50 70 L 40 90"] }} transition={{ repeat: Infinity, duration: 0.5 }} />
          <motion.path d="M50 70 L 60 90" animate={{ d: ["M50 70 L 60 90", "M50 70 L 70 80", "M50 70 L 60 90"] }} transition={{ repeat: Infinity, duration: 0.5 }} />
          
          {/* Arms holding envelope */}
          <path d="M50 50 L 35 60" />
          <path d="M50 50 L 65 60" />

          {/* Envelope */}
          <g transform="translate(0, 5)">
            <polygon points="30,55 70,55 70,75 30,75" fill="white" stroke="currentColor" />
            <polyline points="30,55 50,65 70,55" />
          </g>
        </motion.g>
      </svg>
    </div>
  );
}
