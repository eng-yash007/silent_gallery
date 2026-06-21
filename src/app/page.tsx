import Header from "@/components/Header";
import { getTasksByDate, syncStreak } from "@/app/actions/tasks";
import { getProjects } from "@/app/actions/projects";
import TaskList from "@/components/TaskList";
import CreateTaskForm from "@/components/CreateTaskForm";
import FlipClock from "@/components/FlipClock";
import DeepWorkWidget from "@/components/DeepWorkWidget";

export const dynamic = 'force-dynamic';

export default async function Home() {
  // Sync attendance and streak on page load
  const userStat = await syncStreak();
  const currentStreak = userStat?.currentStreak || 0;

  // Use en-CA to safely get YYYY-MM-DD format in IST timezone
  const today = new Date().toLocaleDateString('en-CA', { timeZone: 'Asia/Kolkata' });
  const tasks = await getTasksByDate(today);
  const remaining = tasks.filter(t => t.status === "pending").length;
  
  const allProjects = await getProjects();
  const activeProjects = allProjects.filter((p: any) => p.status === "active" && p.progress < 100);

  return (
    <>
      <Header title="Journal" />
      <main className="min-h-screen pt-32 pb-20 px-6 md:pl-80 md:pr-10 flex flex-col items-center relative z-10">
        
        <FlipClock />

        <div className="w-full grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          <section className="md:col-span-7 glass-panel p-10 rounded-[2.5rem] shadow-xl shadow-black/[0.02]">
            <div className="flex justify-between items-end mb-10">
              <h3 className="text-xs font-label uppercase tracking-[0.2em] text-outline/80">Today's Protocol</h3>
              <span className="text-secondary text-sm font-semibold bg-secondary/5 px-3 py-1 rounded-full">{remaining} Remaining</span>
            </div>
            
            <div className="mb-8">
              <CreateTaskForm projects={activeProjects} />
            </div>
            
            <TaskList tasks={tasks} />
          </section>

          <section className="md:col-span-5 flex flex-col gap-8">
            <div className="glass-panel p-10 rounded-[2.5rem] flex flex-col items-center text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-secondary/5 pointer-events-none"></div>
              <div className="relative mb-6">
                <div className="absolute inset-0 bg-secondary/20 blur-2xl rounded-full"></div>
                <span className="streak-glow material-symbols-outlined text-secondary text-6xl" style={{fontVariationSettings: "'FILL' 1"}}>local_fire_department</span>
              </div>
              <h4 className="text-6xl font-black text-on-surface tracking-tighter">{currentStreak}</h4>
              <p className="text-[0.6875rem] font-label uppercase tracking-[0.2em] text-outline mt-3">Day Continuous Streak</p>
              <div className="mt-8 px-5 py-2.5 bg-secondary text-white rounded-full text-[0.6875rem] font-bold tracking-wider shadow-lg shadow-secondary/20">
                ELITE PERFORMANCE
              </div>
            </div>

            <DeepWorkWidget />
          </section>
        </div>

        <footer className="mt-40 w-full max-w-3xl text-center px-10 pb-10">
          <p className="text-outline/40 text-2xl font-serif italic leading-relaxed">
            "Consistency is the playground of the dull. But dedication is the engine of the extraordinary."
          </p>
          <div className="mt-12 flex justify-center gap-6 opacity-20">
            <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
          </div>
        </footer>
      </main>

      <button className="fixed bottom-10 right-10 w-16 h-16 bg-inverse-surface text-on-secondary rounded-full flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all z-50 md:hidden">
        <span className="material-symbols-outlined text-3xl">add</span>
      </button>
    </>
  );
}
