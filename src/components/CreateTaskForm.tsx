"use client";

import { useEffect, useRef } from "react";
import { createTask } from "@/app/actions/tasks";
import { useFormStatus, useFormState } from "react-dom";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button disabled={pending} type="submit" className="btn-tactile mt-12 w-full py-5 rounded-2xl bg-secondary text-on-secondary font-bold flex items-center justify-center gap-2 hover:opacity-90 disabled:opacity-50">
      <span className="material-symbols-outlined">{pending ? "hourglass_empty" : "add"}</span>
      {pending ? "ADDING PROTOCOL..." : "NEW PROTOCOL"}
    </button>
  );
}

export default function CreateTaskForm() {
  const [state, formAction] = useFormState(createTask as any, null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state?.success) {
      formRef.current?.reset();
    }
  }, [state]);

  return (
    <form ref={formRef} action={formAction} className="mt-8 flex flex-col gap-4">
      <input 
        name="title" 
        type="text" 
        placeholder="Protocol Name..." 
        required 
        className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl p-4 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-secondary/50 placeholder:text-outline"
      />
      <div className="flex gap-4">
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
      {state?.error && <p className="text-error text-xs font-bold">{state.error}</p>}
      <SubmitButton />
    </form>
  );
}
