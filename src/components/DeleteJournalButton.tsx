"use client";

import { deleteJournalEntry } from "@/app/actions/journal";
import { useState } from "react";

export default function DeleteJournalButton({ id }: { id: string }) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    await deleteJournalEntry(id);
  };

  return (
    <button 
      onClick={handleDelete}
      disabled={isDeleting}
      className="absolute top-2 right-0 md:-right-6 w-8 h-8 flex items-center justify-center rounded-full bg-surface-container-low text-outline hover:bg-error/10 hover:text-error transition-all opacity-0 group-hover:opacity-100 disabled:opacity-50"
      title="Delete Entry"
    >
      <span className="material-symbols-outlined text-[16px]">
        {isDeleting ? "hourglass_empty" : "delete"}
      </span>
    </button>
  );
}
