"use client";

import { updateProjectStatus, deleteProject } from "@/app/actions/projects";
import { useState } from "react";
import Link from "next/link";

export default function ProjectCard({ project }: { project: any }) {
  const [isDeleting, setIsDeleting] = useState(false);

  const isCompleted = project.progress === 100;
  const isArchived = project.status === "archived";

  const toggleArchive = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const newStatus = isArchived ? "active" : "archived";
    await updateProjectStatus(project.id, newStatus);
  };

  const handleDelete = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDeleting(true);
    await deleteProject(project.id);
  };

  return (
    <Link href={`/projects/${project.id}`} className={`group relative p-8 rounded-xl transition-all duration-500 flex flex-col justify-between min-h-[300px] block
      ${isArchived ? "bg-surface-container-low opacity-60 hover:opacity-100" : "bg-surface-container-lowest shadow-[0px_20px_40px_rgba(45,51,56,0.04)] hover:shadow-[0px_20px_40px_rgba(45,51,56,0.08)] scale-102"}
      ${isDeleting ? "opacity-0 scale-95" : ""}
    `}>
      <div>
        <div className="flex justify-between items-start mb-6">
          <span className={`px-3 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full 
            ${isArchived ? "bg-surface-container-high text-on-surface-variant" : 
              isCompleted ? "bg-tertiary-container/40 text-tertiary" : "bg-secondary-container/40 text-on-secondary-container"}`}>
            {isArchived ? "Archived" : isCompleted ? "Completed" : "Active"}
          </span>
          <div className="flex gap-2">
            <button onClick={toggleArchive} className="material-symbols-outlined text-outline group-hover:text-secondary transition-colors text-sm" title={isArchived ? "Unarchive" : "Archive"}>
              {isArchived ? "unarchive" : "inventory_2"}
            </button>
            <button onClick={handleDelete} className="material-symbols-outlined text-outline group-hover:text-error transition-colors text-sm" title="Delete">
              delete
            </button>
          </div>
        </div>
        <h3 className="text-2xl font-bold text-on-surface mb-2 tracking-tight">{project.name}</h3>
        {project.description && (
          <p className="text-sm text-on-surface-variant line-clamp-2 leading-relaxed opacity-70">{project.description}</p>
        )}
      </div>
      <div className="mt-8">
        <div className="flex items-center gap-2 mb-3">
          <span className={`material-symbols-outlined text-sm ${isCompleted ? "text-tertiary" : "text-secondary"}`} style={{fontVariationSettings: "'FILL' 1"}}>auto_awesome</span>
          <span className={`text-[11px] font-bold uppercase tracking-widest ${isCompleted ? "text-tertiary" : "text-secondary"}`}>
            {isArchived ? "Stored securely" : isCompleted ? "Mission Accomplished" : "Momentum building"}
          </span>
        </div>
        <div className="w-full bg-surface-container-high h-1.5 rounded-full overflow-hidden">
          <div className={`${isArchived ? "bg-outline" : isCompleted ? "bg-tertiary" : "bg-secondary"} h-full rounded-full transition-all duration-1000`} style={{ width: `${project.progress}%` }}></div>
        </div>
        <div className="flex justify-between mt-2 text-[10px] font-bold text-outline uppercase tracking-tighter">
          <span>{project.progress}% Complete</span>
          <span>{project.remainingTasks > 0 ? `${project.remainingTasks} Tasks Left` : "No pending tasks"}</span>
        </div>
      </div>
    </Link>
  );
}
