"use client";

import { deleteCalendarEvent } from "@/app/actions/calendar";
import { useState } from "react";

export default function DeleteEventButton({ id }: { id: string }) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    await deleteCalendarEvent(id);
    setIsDeleting(false); // Only reach here if error, but we'll reset anyway
  };

  return (
    <button 
      onClick={handleDelete}
      disabled={isDeleting}
      className="absolute top-2 right-2 w-8 h-8 flex items-center justify-center rounded-full bg-surface-container text-outline hover:bg-error/10 hover:text-error transition-all opacity-0 group-hover:opacity-100 disabled:opacity-50"
      title="Delete Event"
    >
      <span className="material-symbols-outlined text-[16px]">
        {isDeleting ? "hourglass_empty" : "delete"}
      </span>
    </button>
  );
}
