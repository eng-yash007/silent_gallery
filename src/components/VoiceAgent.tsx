"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function VoiceAgent() {
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  
  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const audioChunks = useRef<Blob[]>([]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      mediaRecorder.current = recorder;
      audioChunks.current = [];

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) audioChunks.current.push(e.data);
      };

      recorder.onstop = async () => {
        const audioBlob = new Blob(audioChunks.current, { type: recorder.mimeType });
        
        // Stop microphone hardware access IMMEDIATELY
        stream.getTracks().forEach(track => track.stop());
        
        await processAudio(audioBlob);
      };

      recorder.start();
      setIsRecording(true);
      setMessage(null);
    } catch (err) {
      console.error("Microphone access denied", err);
      setMessage("Microphone access denied.");
      setTimeout(() => setMessage(null), 3000);
    }
  };

  const stopRecording = () => {
    if (mediaRecorder.current && isRecording) {
      mediaRecorder.current.stop();
      setIsRecording(false);
    }
  };

  const processAudio = async (audioBlob: Blob) => {
    setIsProcessing(true);
    setMessage("Synthesizing...");
    
    try {
      const formData = new FormData();
      formData.append("audio", audioBlob);

      const res = await fetch("/api/agent", {
        method: "POST",
        body: formData
      });

      const data = await res.json();
      
      if (res.ok) {
        setMessage(data.message);
      } else {
        setMessage(data.error || "Agent encountered an anomaly.");
      }
      
      // Clear message after 8 seconds
      setTimeout(() => setMessage(null), 8000);
      
    } catch (error) {
      setMessage("Neural link failed.");
      setTimeout(() => setMessage(null), 5000);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="fixed bottom-10 right-10 z-50 flex flex-col items-end gap-4">
      <AnimatePresence>
        {message && (
          <motion.div 
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
            className="bg-surface-container-highest text-on-surface px-6 py-4 rounded-3xl shadow-[0_20px_40px_rgba(0,0,0,0.3)] border border-outline-variant/10 max-w-xs text-right"
          >
            <p className="text-sm font-medium leading-relaxed tracking-wide">{message}</p>
          </motion.div>
        )}
      </AnimatePresence>
      
      <div className="relative">
        {/* Pulsing Sonar Rings for Listening State */}
        {isRecording && (
          <>
            <motion.div
              initial={{ scale: 1, opacity: 0.6 }}
              animate={{ scale: 2.2, opacity: 0 }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeOut" }}
              className="absolute inset-0 rounded-full bg-error pointer-events-none"
            />
            <motion.div
              initial={{ scale: 1, opacity: 0.6 }}
              animate={{ scale: 2.8, opacity: 0 }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeOut", delay: 0.3 }}
              className="absolute inset-0 rounded-full bg-error pointer-events-none"
            />
          </>
        )}

        <motion.button
          onClick={() => isRecording ? stopRecording() : startRecording()}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          animate={{
            backgroundColor: isRecording ? "var(--color-error)" : isProcessing ? "var(--color-secondary)" : "var(--color-surface-container-highest)",
            color: isRecording ? "var(--color-on-error)" : isProcessing ? "var(--color-on-secondary)" : "var(--color-on-surface)"
          }}
          className={`relative w-16 h-16 rounded-full flex items-center justify-center shadow-2xl border border-white/10 group z-10 ${
            isRecording 
              ? "shadow-[0_0_50px_rgba(255,0,0,0.5)] bg-error text-white" 
              : isProcessing 
                ? "shadow-[0_0_50px_rgba(0,91,194,0.5)] bg-secondary text-white" 
                : "bg-surface-container-highest text-on-surface"
          }`}
        >
          <span className="material-symbols-outlined text-3xl z-10">
            {isRecording ? 'mic' : isProcessing ? 'graphic_eq' : 'robot_2'}
          </span>
          
          {/* Hover hint when idle */}
          {!isRecording && !isProcessing && (
            <div className="absolute right-20 bg-surface-container-highest text-on-surface text-[10px] font-bold uppercase tracking-widest px-4 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-xl border border-outline-variant/10">
              Click to command
            </div>
          )}

          {/* Listening indicator label */}
          {isRecording && (
            <div className="absolute right-20 flex items-center gap-2 bg-error text-white text-[10px] font-bold uppercase tracking-widest px-4 py-2 rounded-full whitespace-nowrap pointer-events-none shadow-[0_0_20px_rgba(255,0,0,0.4)]">
              <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
              Listening...
            </div>
          )}
        </motion.button>
      </div>
    </div>
  );
}
