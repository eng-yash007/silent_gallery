"use client";

import { createProject } from "@/app/actions/projects";
import { useState, useRef } from "react";
import { useFormState } from "react-dom";

export default function CreateProjectForm() {
  const [isOpen, setIsOpen] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const handleAction = async (formData: FormData) => {
    const result = await createProject(null, formData);
    if (result.success) {
      formRef.current?.reset();
      setIsOpen(false);
    }
  };

  if (!isOpen) {
    return (
      <button 
        onClick={() => setIsOpen(true)}
        className="group relative flex flex-col items-center justify-center p-8 bg-surface-container-lowest rounded-xl border-2 border-dashed border-outline-variant hover:border-secondary transition-all duration-300 aspect-square md:aspect-auto min-h-[300px]"
      >
        <div className="w-16 h-16 rounded-full bg-surface-container-low flex items-center justify-center group-hover:bg-secondary-container transition-colors">
          <span className="material-symbols-outlined text-3xl text-outline group-hover:text-secondary">add</span>
        </div>
        <span className="mt-4 font-semibold text-on-surface opacity-60 group-hover:opacity-100">Initiate Project</span>
      </button>
    );
  }

  return (
    <div className="bg-surface-container-lowest p-8 rounded-xl shadow-[0px_20px_40px_rgba(45,51,56,0.04)] border border-secondary/20 flex flex-col justify-center min-h-[300px]">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-on-surface tracking-tight">New Project</h3>
        <button onClick={() => setIsOpen(false)} className="material-symbols-outlined text-outline hover:text-on-surface">close</button>
      </div>
      
      <form ref={formRef} action={handleAction} className="flex flex-col gap-4">
        <input 
          name="name" 
          type="text" 
          placeholder="Project Title..." 
          required 
          className="w-full bg-surface-container border border-outline-variant/30 rounded-xl p-4 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-secondary/50 placeholder:text-outline"
        />
        <textarea 
          name="description" 
          placeholder="Brief description..." 
          rows={3}
          className="w-full bg-surface-container border border-outline-variant/30 rounded-xl p-4 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-secondary/50 placeholder:text-outline resize-none"
        />
        <button 
          type="submit"
          className="w-full py-4 mt-2 bg-secondary text-on-secondary rounded-xl font-bold tracking-widest uppercase text-xs hover:bg-secondary/90 transition-colors"
        >
          Initialize
        </button>
      </form>
    </div>
  );
}
