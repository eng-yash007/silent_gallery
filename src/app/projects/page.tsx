import Header from "@/components/Header";
import { getProjects } from "@/app/actions/projects";
import ProjectCard from "@/components/ProjectCard";
import CreateProjectForm from "@/components/CreateProjectForm";
import BuilderStickman from "@/components/Stickman/BuilderStickman";

export default async function Projects() {
  const projects = await getProjects();
  
  const activeCount = projects.filter((p: any) => p.status === "active").length;
  const completedCount = projects.filter((p: any) => p.status === "completed" || p.progress === 100).length;
  const archivedCount = projects.filter((p: any) => p.status === "archived").length;
  
  // Calculate total creative capacity (average progress of active projects)
  const activeProjects = projects.filter((p: any) => p.status === "active");
  const capacity = activeProjects.length > 0 
    ? Math.round(activeProjects.reduce((acc: number, curr: any) => acc + curr.progress, 0) / activeProjects.length)
    : 0;

  return (
    <>
      <Header title="Projects" />
      <main className="w-full min-h-screen pt-32 pb-20 px-6 md:pl-80 md:pr-10 relative z-10">
        <section className="pt-32 px-10 pb-20 w-full relative">
          <BuilderStickman />
          <div className="mb-16">
            <h1 className="text-5xl font-extrabold tracking-tighter text-on-surface mb-4 leading-tight">
              Project<br />Library.
            </h1>
            <div className="w-12 h-1 bg-secondary rounded-full"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <CreateProjectForm />

            {projects.map((project: any) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>

          <div className="mt-20 p-12 bg-surface-container-low rounded-xl flex flex-col md:flex-row justify-between items-center gap-12">
            <div className="text-center md:text-left">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary block mb-2">Workspace Insight</span>
              {activeProjects.length > 0 ? (
                <p className="text-xl font-medium text-on-surface max-w-sm leading-relaxed">
                  Your active projects are at an average of <span className="text-secondary font-bold">{capacity}% completion</span>. Keep the momentum going.
                </p>
              ) : (
                <p className="text-xl font-medium text-on-surface max-w-sm leading-relaxed">
                  You have <span className="text-secondary font-bold">no active projects</span>. Time to start something new.
                </p>
              )}
            </div>
            <div className="flex gap-8">
              <div className="text-center">
                <span className="block text-4xl font-bold text-on-surface">{activeCount}</span>
                <span className="text-[10px] uppercase font-bold tracking-widest text-outline">Active</span>
              </div>
              <div className="text-center">
                <span className="block text-4xl font-bold text-on-surface">{completedCount}</span>
                <span className="text-[10px] uppercase font-bold tracking-widest text-outline">Completed</span>
              </div>
              <div className="text-center">
                <span className="block text-4xl font-bold text-on-surface">{archivedCount}</span>
                <span className="text-[10px] uppercase font-bold tracking-widest text-outline">Archived</span>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
