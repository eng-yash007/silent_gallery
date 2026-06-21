"use client";

import { useTransition, useEffect } from "react";
import { toggleTaskStatus, deleteTask } from "@/app/actions/tasks";
import type { Task } from "@prisma/client";
import { motion, AnimatePresence } from "framer-motion";

export default function TaskList({ tasks }: { tasks: Task[] }) {
  const [isPending, startTransition] = useTransition();

  const handleToggle = (id: string, status: string, e: React.MouseEvent) => {
    startTransition(() => {
      toggleTaskStatus(id, status);
    });
  };

  const handleDelete = (id: string) => {
    startTransition(() => {
      deleteTask(id);
    });
  };

  if (tasks.length === 0) {
    return <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-sm text-outline italic py-4">No tasks for today. Take a deep breath.</motion.p>;
  }

  return (
    <div className="space-y-4 max-h-[450px] overflow-y-auto pr-2 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-outline-variant/30 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-outline-variant/50">
      <AnimatePresence mode="popLayout">
        {tasks.map((task) => (
          <motion.div 
            layout="position"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
            key={task.id} 
            className="task-item flex items-center gap-6 group cursor-pointer p-5 bg-white/20 rounded-2xl transition-colors duration-300"
          >
            <div 
              onClick={(e) => task.source !== "google_calendar" && handleToggle(task.id, task.status, e)}
              className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all ${task.status === "completed" ? "bg-secondary border-secondary" : "border-outline-variant/40"} ${task.source === "google_calendar" ? "opacity-50 cursor-not-allowed bg-blue-500/10 border-blue-500/30" : "group-hover:border-secondary group-hover:bg-secondary/5 cursor-pointer"}`}
              title={task.source === "google_calendar" ? "Calendar Event" : "Complete Task"}
            >
              {task.source === "google_calendar" ? (
                <span className="material-symbols-outlined text-blue-500 text-sm">event</span>
              ) : (
                <span className={`check-anim material-symbols-outlined text-white text-lg transition-transform ${task.status === "completed" ? "scale-100" : "scale-0 group-hover:text-secondary group-hover:scale-100"}`} style={{fontVariationSettings: "'FILL' 1"}}>check</span>
              )}
            </div>
            <div className="flex-grow">
              <p className={`text-lg font-medium transition-all ${task.status === "completed" ? "text-outline line-through" : "text-on-surface"}`}>{task.title}</p>
              {task.startTime && <p className="text-xs text-outline font-medium tracking-wide">{task.startTime} {task.endTime && `— ${task.endTime}`}</p>}
            </div>
            {task.source !== "google_calendar" && (
              <button onClick={() => handleDelete(task.id)} className="opacity-0 group-hover:opacity-100 text-error/60 hover:text-error transition-all material-symbols-outlined text-sm p-2">
                delete
              </button>
            )}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
