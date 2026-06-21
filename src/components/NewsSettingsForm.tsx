"use client";

import { updateNewsTopic } from "@/app/actions/news";
import { useRef, useState } from "react";

export default function NewsSettingsForm({ currentTopic }: { currentTopic: string }) {
  const formRef = useRef<HTMLFormElement>(null);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleAction = async (formData: FormData) => {
    setIsUpdating(true);
    await updateNewsTopic(null, formData);
    setIsUpdating(false);
  };

  return (
    <form ref={formRef} action={handleAction} className="bg-surface-container-lowest p-8 rounded-xl transition-all duration-500 hover:shadow-[0px_20px_40px_rgba(45,51,56,0.04)]">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="w-full sm:w-auto flex-grow">
          <h3 className="text-lg font-medium mb-1">Intelligence Feed Topic</h3>
          <p className="text-sm text-outline mb-4">Select the specific industry or field you want live updates for.</p>
          <input 
            type="text" 
            name="topic"
            defaultValue={currentTopic}
            placeholder="e.g. Artificial Intelligence, Stock Market, Design"
            className="w-full bg-surface-container-low border border-outline-variant/30 rounded-lg p-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-secondary/50 placeholder:text-outline"
          />
        </div>
        <div className="flex w-full sm:w-auto mt-4 sm:mt-0 items-end h-full">
          <button 
            type="submit"
            disabled={isUpdating}
            className="px-6 py-3 rounded-lg text-xs font-bold uppercase tracking-widest bg-secondary text-on-secondary hover:bg-secondary/90 transition-all w-full sm:w-auto mt-auto disabled:opacity-50"
          >
            {isUpdating ? "Saving..." : "Update"}
          </button>
        </div>
      </div>
    </form>
  );
}
