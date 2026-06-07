"use client";

import { useTransition } from "react";
import { toggleTaskStatus, deleteTask } from "@/app/actions/tasks";
import type { Task } from "@prisma/client";

export default function TaskList({ tasks }: { tasks: Task[] }) {
  const [isPending, startTransition] = useTransition();

  const handleToggle = (id: string, status: string) => {
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
    return <p className="text-sm text-outline italic py-4">No tasks for today. Take a deep breath.</p>;
  }

  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <div key={task.id} className="task-item flex items-center gap-6 group cursor-pointer p-5 bg-white/20 rounded-2xl transition-all duration-300">
          <div 
            onClick={() => handleToggle(task.id, task.status)}
            className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all ${task.status === "completed" ? "bg-secondary border-secondary" : "border-outline-variant/40 group-hover:border-secondary group-hover:bg-secondary/5"}`}
          >
            <span className={`check-anim material-symbols-outlined text-white text-lg ${task.status === "completed" ? "scale-100" : "scale-0 group-hover:text-secondary group-hover:scale-100"}`} style={{fontVariationSettings: "'FILL' 1"}}>check</span>
          </div>
          <div className="flex-grow">
            <p className={`text-lg font-medium transition-all ${task.status === "completed" ? "text-outline line-through" : "text-on-surface"}`}>{task.title}</p>
            {task.startTime && <p className="text-xs text-outline font-medium tracking-wide">{task.startTime} {task.endTime && `— ${task.endTime}`}</p>}
          </div>
          <button onClick={() => handleDelete(task.id)} className="opacity-0 group-hover:opacity-100 text-error/60 hover:text-error transition-all material-symbols-outlined text-sm p-2">
            delete
          </button>
        </div>
      ))}
    </div>
  );
}
