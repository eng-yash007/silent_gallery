import Header from "@/components/Header";
import { getTasks } from "@/app/actions/tasks";
import TaskList from "@/components/TaskList";
import CreateTaskForm from "@/components/CreateTaskForm";

export default async function Home() {
  const tasks = await getTasks();
  const remaining = tasks.filter(t => t.status === "pending").length;

  return (
    <>
      <Header title="Journal" />
      <main className="min-h-screen pt-32 pb-20 px-6 md:pl-80 md:pr-10 flex flex-col items-center relative z-10">
        <section className="w-full max-w-4xl flex flex-col items-center mb-24">
          <div className="flex gap-4 md:gap-10 mb-10">
            <div className="w-32 h-44 md:w-52 md:h-72 flip-card-inner rounded-[2.5rem] flex flex-col items-center justify-center relative overflow-hidden">
              <div className="flip-card-split"></div>
              <span className="text-7xl md:text-[10rem] font-bold text-white tracking-tighter z-10 tabular-nums">09</span>
            </div>
            <div className="w-32 h-44 md:w-52 md:h-72 flip-card-inner rounded-[2.5rem] flex flex-col items-center justify-center relative overflow-hidden">
              <div className="flip-card-split"></div>
              <span className="text-7xl md:text-[10rem] font-bold text-white tracking-tighter z-10 tabular-nums">42</span>
            </div>
          </div>
          <button className="group flex flex-col items-center gap-1 hover:opacity-80 transition-all">
            <span className="text-headline-lg font-light tracking-tight text-on-surface-variant">Thursday, October 24, 2024</span>
            <div className="h-[1px] w-0 group-hover:w-full bg-secondary transition-all duration-500"></div>
          </button>
        </section>

        <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          <section className="md:col-span-7 glass-panel p-10 rounded-[2.5rem] shadow-xl shadow-black/[0.02]">
            <div className="flex justify-between items-end mb-10">
              <h3 className="text-xs font-label uppercase tracking-[0.2em] text-outline/80">Today's Protocol</h3>
              <span className="text-secondary text-sm font-semibold bg-secondary/5 px-3 py-1 rounded-full">{remaining} Remaining</span>
            </div>
            
            <TaskList tasks={tasks} />
            <CreateTaskForm />
          </section>

          <section className="md:col-span-5 flex flex-col gap-8">
            <div className="glass-panel p-10 rounded-[2.5rem] flex flex-col items-center text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-secondary/5 pointer-events-none"></div>
              <div className="relative mb-6">
                <div className="absolute inset-0 bg-secondary/20 blur-2xl rounded-full"></div>
                <span className="streak-glow material-symbols-outlined text-secondary text-6xl" style={{fontVariationSettings: "'FILL' 1"}}>local_fire_department</span>
              </div>
              <h4 className="text-6xl font-black text-on-surface tracking-tighter">12</h4>
              <p className="text-[0.6875rem] font-label uppercase tracking-[0.2em] text-outline mt-3">Day Continuous Streak</p>
              <div className="mt-8 px-5 py-2.5 bg-secondary text-white rounded-full text-[0.6875rem] font-bold tracking-wider shadow-lg shadow-secondary/20">
                ELITE PERFORMANCE
              </div>
            </div>

            <div className="relative h-72 rounded-[2.5rem] overflow-hidden group cursor-pointer shadow-xl">
              <img alt="Mindfulness" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAyDojqYh4ry2LbwYyCHLBVd4HVAfvh-fWoZkdAuCRnErOS0zxDx5iqiBOldZGcHNQnZbPrqKkGjfO-QPgipKBjdwcaIZ2FHQd_flNJ5Tq2DGrB9S8Autit9ALfZ_INVLYrfvVJGPmibsctKIs7WFrLoO3FOMC2ApTO3SJ7JH12EuIf8g6ZJN4P3AJe2LiFdIMlgnBxdW5QnIhy-I04kEcyNY4ewLKyOaWNJ5LnIFUFs1P5aDV3qkbf0ZnlcDb_BEbRorPrdihAYdDR"/>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-10">
                <p className="text-white text-sm font-light leading-relaxed">"Your focus determines your reality. Take a moment to breathe."</p>
              </div>
            </div>
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
