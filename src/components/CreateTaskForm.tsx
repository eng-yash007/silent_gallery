"use client";

import { useState, useEffect, useRef } from "react";
import { createTask } from "@/app/actions/tasks";

export default function CreateTaskForm({ projects = [], fixedProjectId }: { projects?: any[], fixedProjectId?: string }) {
  const formRef = useRef<HTMLFormElement>(null);
  const [defaultDate, setDefaultDate] = useState("");

  useEffect(() => {
    // en-CA format gives YYYY-MM-DD reliably in local timezone
    setDefaultDate(new Date().toLocaleDateString('en-CA'));
  }, []);

  const handleAction = async (formData: FormData) => {
    const result = await createTask(null, formData);
    if (result.success) {
      formRef.current?.reset();
      // Reset the date field back to today explicitly
      const dateInput = formRef.current?.elements.namedItem("date") as HTMLInputElement;
      if (dateInput) {
        dateInput.value = new Date().toLocaleDateString('en-CA');
      }
    }
  };

  return (
    <form ref={formRef} action={handleAction} className="mt-8 flex flex-col gap-4">
      <input 
        name="title" 
        type="text" 
        placeholder="Protocol Name..." 
        required 
        className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl p-4 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-secondary/50 placeholder:text-outline"
      />
      <div className="flex gap-4">
        <input 
          key={defaultDate}
          name="date" 
          type="date" 
          defaultValue={defaultDate || new Date().toISOString().split('T')[0]}
          className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl p-4 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-secondary/50"
        />
        <input 
          name="startTime" 
          type="time" 
          className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl p-4 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-secondary/50"
        />
        <input 
          name="endTime" 
          type="time" 
          className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl p-4 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-secondary/50"
        />
      </div>
      
      {fixedProjectId ? (
        <input type="hidden" name="projectId" value={fixedProjectId} />
      ) : projects.length > 0 ? (
        <select 
          name="projectId"
          className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl p-4 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-secondary/50 text-on-surface-variant appearance-none"
        >
          <option value="">No Project Attached</option>
          {projects.map(p => (
            <option key={p.id} value={p.id}>{p.name}</option>
          ))}
        </select>
      ) : null}

      <button 
        type="submit"
        className="w-full py-4 mt-2 bg-secondary text-on-secondary rounded-xl font-bold tracking-widest uppercase text-xs hover:bg-secondary/90 transition-colors"
      >
        Initialize Protocol
      </button>
    </form>
  );
}
