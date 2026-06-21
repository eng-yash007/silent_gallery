import Header from "@/components/Header";
import { getProjectById } from "@/app/actions/projects";
import TaskList from "@/components/TaskList";
import CreateTaskForm from "@/components/CreateTaskForm";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function ProjectDashboard({ params }: { params: { id: string } }) {
  const project = await getProjectById(params.id);

  if (!project) {
    notFound();
  }

  const isCompleted = project.progress === 100;
  const isArchived = project.status === "archived";

  return (
    <>
      <Header title="Project Dashboard" />
      <main className="w-full min-h-screen pt-32 pb-20 px-6 md:pl-80 md:pr-10 relative z-10">
        <section className="pt-10 px-10 pb-20 max-w-5xl mx-auto relative">
          
          <Link href="/projects" className="inline-flex items-center gap-2 text-outline hover:text-secondary transition-colors mb-12 text-sm font-medium tracking-widest uppercase">
            <span className="material-symbols-outlined">arrow_back</span>
            Back to Library
          </Link>

          <div className="mb-16">
            <div className="flex items-center gap-4 mb-4">
              <span className={`px-4 py-1.5 text-[10px] font-bold uppercase tracking-wider rounded-full 
                ${isArchived ? "bg-surface-container-high text-on-surface-variant" : 
                  isCompleted ? "bg-tertiary-container/40 text-tertiary" : "bg-secondary-container/40 text-on-secondary-container"}`}>
                {isArchived ? "Archived" : isCompleted ? "Completed" : "Active"}
              </span>
              <span className="text-outline text-xs tracking-widest uppercase font-bold">
                {project.tasks.length} total tasks
              </span>
            </div>
            
            <h1 className="text-6xl font-extrabold tracking-tighter text-on-surface mb-6 leading-tight">
              {project.name}
            </h1>
            
            {project.description && (
              <p className="text-xl text-on-surface-variant max-w-2xl leading-relaxed opacity-80 mb-12">
                {project.description}
              </p>
            )}

            {/* Massive Progress Bar */}
            <div className="bg-surface-container-low p-8 rounded-3xl mb-16 shadow-[0px_20px_40px_rgba(45,51,56,0.02)] border-[0.5px] border-outline-variant/10">
              <div className="flex items-end justify-between mb-6">
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-widest text-outline mb-1 block">Completion Status</span>
                  <div className="flex items-center gap-3">
                    <span className="text-5xl font-thin tracking-tighter text-on-surface">{project.progress}</span>
                    <span className="text-xl font-bold text-outline">%</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-bold text-on-surface block">{project.completedTasks} <span className="text-outline font-light">/ {project.totalTasks}</span></span>
                </div>
              </div>
              <div className="w-full bg-surface-container-high h-3 rounded-full overflow-hidden shadow-inner">
                <div 
                  className={`${isArchived ? "bg-outline" : isCompleted ? "bg-tertiary" : "bg-secondary"} h-full rounded-full transition-all duration-1000 relative overflow-hidden`} 
                  style={{ width: `${project.progress}%` }}
                >
                  <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-16 items-start">
            <div className="col-span-12 md:col-span-8">
              <div className="flex items-baseline gap-4 mb-8">
                <h3 className="text-sm font-medium tracking-[0.1em] uppercase text-on-surface-variant">Project Protocol</h3>
                <div className="h-[1px] flex-grow bg-surface-container transition-all duration-500"></div>
              </div>
              
              <TaskList tasks={project.tasks} />
              
              {project.tasks.length === 0 && (
                <div className="py-12 text-center bg-surface-container-low/30 rounded-3xl border-[0.5px] border-outline-variant/10 border-dashed">
                  <span className="material-symbols-outlined text-4xl text-outline/30 mb-4 block">receipt_long</span>
                  <p className="text-sm text-outline italic">No tasks initialized for this project yet.</p>
                </div>
              )}
            </div>

            <aside className="col-span-12 md:col-span-4 sticky top-32">
              <div className="bg-surface-container-low p-8 rounded-3xl shadow-lg border-[0.5px] border-outline-variant/10">
                <div className="flex items-center gap-3 mb-6">
                  <span className="material-symbols-outlined text-secondary" style={{fontVariationSettings: "'opsz' 20"}}>add_box</span>
                  <span className="text-[0.65rem] uppercase tracking-[0.25em] font-bold text-on-surface">Inject Task</span>
                </div>
                <CreateTaskForm fixedProjectId={project.id} />
              </div>
            </aside>
          </div>
          
        </section>
      </main>
    </>
  );
}
