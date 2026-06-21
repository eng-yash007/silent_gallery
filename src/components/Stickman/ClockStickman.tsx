"use client";

import { motion } from "framer-motion";

export default function ClockStickman() {
  return (
    <div className="clock-stickman-wrapper absolute bottom-full left-0 w-full h-24 pointer-events-none z-30">
      
      {/* Boy */}
      <motion.div 
        className="absolute bottom-0 w-16 h-20 -ml-8" // -ml-8 centers the 16px width on the left percentage
        animate={{ 
          left:   ["15%", "15%", "40%", "50%", "60%", "85%", "85%", "85%", "60%", "50%", "40%", "15%"],
          bottom: ["0px", "0px", "0px", "60px", "0px", "0px", "0px", "0px", "0px", "60px", "0px", "0px"],
          scaleX: [1,      1,      1,      1,      1,      1,     -1,     -1,     -1,     -1,     -1,      1]
        }}
        transition={{ 
          duration: 10, 
          times:  [0, 0.3, 0.4, 0.425, 0.45, 0.55, 0.6, 0.8, 0.9, 0.925, 0.95, 1],
          repeat: Infinity,
          ease: ["linear", "easeInOut", "easeOut", "easeIn", "easeInOut", "linear", "linear", "easeInOut", "easeOut", "easeIn", "easeInOut"]
        }}
      >
        <svg viewBox="0 0 100 100" className="w-full h-full text-zinc-800 dark:text-zinc-200" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
          {/* Head */}
          <circle cx="50" cy="30" r="12" fill="white" />
          
          {/* Body */}
          <path d="M50 42 L 50 70" />
          
          {/* Walking Legs */}
          <motion.path 
            d="M50 70 L 40 100" 
            animate={{ d: ["M50 70 L 40 100", "M50 70 L 60 100", "M50 70 L 40 100"] }} 
            transition={{ repeat: Infinity, duration: 0.5, ease: "easeInOut" }} 
          />
          <motion.path 
            d="M50 70 L 60 100" 
            animate={{ d: ["M50 70 L 60 100", "M50 70 L 40 100", "M50 70 L 60 100"] }} 
            transition={{ repeat: Infinity, duration: 0.5, ease: "easeInOut" }} 
          />
          
          {/* Throwing Arm */}
          <motion.path 
            animate={{
              d: [
                "M50 50 Q 60 60 70 60", // 0
                "M50 50 Q 60 60 70 60", // 0.09
                "M50 50 Q 60 30 70 20", // 0.1 (throw!)
                "M50 50 Q 60 60 70 60", // 0.13
                "M50 50 Q 60 60 70 60", // 0.59
                "M50 50 Q 60 30 70 20", // 0.6 (throw!)
                "M50 50 Q 60 60 70 60", // 0.63
                "M50 50 Q 60 60 70 60"  // 1
              ]
            }}
            transition={{
              duration: 10,
              times: [0, 0.09, 0.1, 0.13, 0.59, 0.6, 0.63, 1],
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          {/* Static Back Arm */}
          <path d="M50 50 Q 40 60 30 70" />
        </svg>
      </motion.div>

      {/* Paper Plane */}
      <motion.div 
        className="absolute bottom-0 w-8 h-8 -ml-4"
        animate={{
          left:   ["15%", "15%", "50%", "85%", "85%", "85%", "50%", "15%", "15%", "15%"],
          bottom: ["30px", "30px", "120px", "0px", "0px", "30px", "120px", "0px", "0px", "30px"],
          scaleX: [1,      1,      1,      1,      1,     -1,     -1,     -1,     -1,      1],
          rotate: [0,     -45,     0,      45,     45,    -45,     0,      45,     45,      0]
        }}
        transition={{
          duration: 10,
          times:  [0, 0.1, 0.15, 0.2, 0.59, 0.6, 0.65, 0.7, 0.99, 1],
          repeat: Infinity,
          ease: ["linear", "easeOut", "easeIn", "linear", "linear", "easeOut", "easeIn", "linear", "linear"]
        }}
      >
        <svg viewBox="0 0 100 100" className="w-full h-full text-zinc-800 dark:text-zinc-200">
          <polygon points="10,60 90,40 20,80" fill="white" stroke="currentColor" strokeWidth="4" strokeLinejoin="round" />
          <polygon points="10,60 40,70 20,80" fill="currentColor" />
        </svg>
      </motion.div>

    </div>
  );
}
