"use client";

import { createJournalEntry } from "@/app/actions/journal";
import { useRef, useState } from "react";

export default function CreateJournalForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [isCapturing, setIsCapturing] = useState(false);

  const handleAction = async (formData: FormData) => {
    setIsCapturing(true);
    const result = await createJournalEntry(null, formData);
    if (result.success) {
      formRef.current?.reset();
    }
    setIsCapturing(false);
  };

  return (
    <form ref={formRef} action={handleAction} className="bg-surface-container-lowest p-8 rounded-2xl shadow-[0px_20px_40px_rgba(45,51,56,0.04)] border border-outline-variant/10 mb-20 group relative overflow-hidden transition-all duration-500 hover:shadow-[0px_30px_60px_rgba(45,51,56,0.06)] hover:-translate-y-1">
      <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/5 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 group-hover:bg-secondary/10 transition-colors duration-700 pointer-events-none"></div>

      <div className="relative z-10">
        <h3 className="text-xs uppercase tracking-[0.2em] font-bold text-outline-variant mb-6">Quick Capture</h3>
        
        <div className="space-y-4">
          <input 
            name="title" 
            type="text" 
            placeholder="Headline or Title..." 
            required 
            className="w-full bg-transparent border-b border-outline-variant/30 pb-3 text-xl font-headline font-semibold text-on-surface focus:outline-none focus:border-secondary transition-colors placeholder:text-outline-variant"
          />
          
          <textarea 
            name="content" 
            placeholder="What's on your mind? Jot down ideas, reflections, or blockers..." 
            rows={3}
            required
            className="w-full bg-transparent border-none text-base text-on-surface-variant font-light focus:outline-none resize-none placeholder:text-outline-variant/60"
          />
        </div>

        <div className="mt-8 flex flex-col sm:flex-row justify-between items-center gap-4 border-t border-outline-variant/10 pt-6">
          <div className="w-full sm:w-auto">
            <select 
              name="category" 
              className="bg-surface-container-low text-xs font-bold uppercase tracking-widest text-on-surface-variant px-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-secondary/50 appearance-none cursor-pointer"
            >
              <option value="Idea">💡 Idea</option>
              <option value="Reflection">📝 Reflection</option>
              <option value="Blocker">🛑 Blocker</option>
              <option value="Milestone">🏆 Milestone</option>
              <option value="Thought">💭 Random Thought</option>
            </select>
          </div>

          <button 
            type="submit"
            disabled={isCapturing}
            className="w-full sm:w-auto bg-secondary text-on-secondary px-8 py-3 rounded-xl font-bold uppercase tracking-widest text-[10px] hover:bg-secondary/90 transition-all disabled:opacity-50"
          >
            {isCapturing ? "Placarding..." : "Commit to Record"}
          </button>
        </div>
      </div>
    </form>
  );
}
