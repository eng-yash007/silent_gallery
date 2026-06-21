import Header from "@/components/Header";
import { getTasksByDate } from "@/app/actions/tasks";
import TaskList from "@/components/TaskList";
import Link from "next/link";
import TelescopeStickman from "@/components/Stickman/TelescopeStickman";
import AIBriefingWidget from "@/components/AIBriefingWidget";

function generateDates(selectedDate: string) {
  const dates = [];
  const base = new Date(selectedDate);
  for (let i = -3; i <= 3; i++) {
    const d = new Date(base);
    d.setDate(base.getDate() + i);
    dates.push({
      dateString: d.toISOString().split('T')[0],
      day: d.getDate(),
      month: d.toLocaleString('default', { month: 'short' }),
      weekday: d.toLocaleString('default', { weekday: 'short' }),
      isSameAsSelected: d.toISOString().split('T')[0] === selectedDate,
    });
  }
  return dates;
}

import { getCalendarEventsForDate } from "@/app/actions/calendar";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function Upcoming({ searchParams }: { searchParams: { date?: string } }) {
  const selectedDate = searchParams.date || new Date().toISOString().split('T')[0];
  const dates = generateDates(selectedDate);
  
  let tasks: any[] = await getTasksByDate(selectedDate);

  // Also fetch Google Calendar events and merge them if signed in
  const session = await getServerSession(authOptions);
  if (session) {
    const calRes = await getCalendarEventsForDate(selectedDate);
    if (calRes.success && calRes.events && calRes.events.length > 0) {
      const calTasks = calRes.events.map((ev: any) => {
        let startTime = null;
        let endTime = null;
        if (ev.start?.dateTime) {
          const d = new Date(ev.start.dateTime);
          startTime = d.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' });
        }
        if (ev.end?.dateTime) {
          const d = new Date(ev.end.dateTime);
          endTime = d.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' });
        }

        return {
          id: ev.id,
          title: ev.summary || "Untitled Event",
          date: selectedDate,
          startTime,
          endTime,
          status: "pending", // Calendar events can't be toggled completed in our DB right now
          source: "google_calendar",
          projectId: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        };
      });

      tasks = [...tasks, ...calTasks];
      
      // Sort chronologically again
      tasks.sort((a, b) => {
        if (a.startTime && b.startTime) {
          return a.startTime.localeCompare(b.startTime);
        }
        if (a.startTime && !b.startTime) return -1;
        if (!a.startTime && b.startTime) return 1;
        return 0;
      });
    }
  }

  // Split tasks by morning vs afternoon just for visual, assuming morning is before 12:00
  const morningTasks = tasks.filter(t => t.startTime && t.startTime < "12:00");
  const afternoonTasks = tasks.filter(t => !t.startTime || t.startTime >= "12:00");

  return (
    <>
      <Header title="Upcoming" />
      <main className="w-full min-h-screen pt-32 pb-20 px-6 md:pl-80 md:pr-10 relative z-10">
        <section className="mb-16 relative">
          <TelescopeStickman />
          <div className="flex items-end justify-between mb-8">
            <div>
              <span className="text-[0.6875rem] uppercase tracking-[0.2em] text-outline font-medium">Timeline</span>
              <h2 className="text-3xl font-extralight tracking-tight mt-1 z-40 relative">Select your window.</h2>
            </div>
            <div className="flex gap-2">
              <Link href={`/upcoming?date=${dates[0].dateString}`} className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-surface-container transition-colors">
                <span className="material-symbols-outlined">chevron_left</span>
              </Link>
              <Link href={`/upcoming?date=${dates[dates.length - 1].dateString}`} className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-surface-container transition-colors">
                <span className="material-symbols-outlined">chevron_right</span>
              </Link>
            </div>
          </div>
          <div className="flex gap-6 overflow-x-auto no-scrollbar pb-4 -mx-2 px-2">
            {dates.map((d) => (
              <Link
                key={d.dateString}
                href={`/upcoming?date=${d.dateString}`}
                className={`flex-shrink-0 w-24 h-32 rounded-3xl flex flex-col items-center justify-center gap-2 group transition-all duration-300 ${
                  d.isSameAsSelected 
                    ? "bg-secondary text-on-secondary shadow-[0px_20px_40px_rgba(0,91,194,0.15)] translate-y-[-8px]"
                    : "bg-surface-container-lowest hover:translate-y-[-4px]"
                }`}
              >
                <span className={`text-[0.65rem] uppercase tracking-widest ${d.isSameAsSelected ? "opacity-80" : "text-outline group-hover:text-secondary"} transition-colors`}>{d.month}</span>
                <span className={`text-2xl ${d.isSameAsSelected ? "font-semibold" : "font-light"}`}>{d.day}</span>
                <span className={`text-[0.6rem] uppercase tracking-tighter ${d.isSameAsSelected ? "opacity-80" : "text-outline/50"}`}>{d.weekday}</span>
              </Link>
            ))}
          </div>
        </section>

        <section className="grid grid-cols-12 gap-12 items-start">
          <div className="col-span-8 flex flex-col gap-12">
            
            {/* Time Block: Morning */}
            {morningTasks.length > 0 && (
              <div className="group">
                <div className="flex items-baseline gap-4 mb-6">
                  <span className="text-3xl font-thin text-outline-variant">08:00</span>
                  <h3 className="text-sm font-medium tracking-[0.1em] uppercase text-on-surface-variant">Morning Rituals</h3>
                  <div className="h-[1px] flex-grow bg-surface-container transition-all duration-500 group-hover:bg-outline-variant/30"></div>
                </div>
                <div className="pl-16">
                  <TaskList tasks={morningTasks} />
                </div>
              </div>
            )}

            {/* Time Block: Afternoon */}
            {afternoonTasks.length > 0 && (
              <div className="group">
                <div className="flex items-baseline gap-4 mb-6">
                  <span className="text-3xl font-thin text-outline-variant">12:00</span>
                  <h3 className="text-sm font-medium tracking-[0.1em] uppercase text-on-surface-variant">Strategic Convergence</h3>
                  <div className="h-[1px] flex-grow bg-surface-container transition-all duration-500 group-hover:bg-outline-variant/30"></div>
                </div>
                <div className="pl-16">
                  <TaskList tasks={afternoonTasks} />
                </div>
              </div>
            )}

            {tasks.length === 0 && (
              <p className="text-outline italic">No protocols scheduled for this day.</p>
            )}
          </div>

          {/* AI Sidebar */}
          <AIBriefingWidget selectedDate={selectedDate} />
        </section>

        <footer className="mt-auto pt-32 text-center">
          <p className="text-2xl font-thin tracking-widest text-outline-variant/30 italic">
            &ldquo;The future is a canvas of silence.&rdquo;
          </p>
          <div className="mt-8 flex justify-center gap-12 text-[0.6rem] uppercase tracking-[0.4em] text-outline/40">
            <span>Ref. 2024-EX</span>
            <span>Editorial Protocol</span>
            <span>Silent Gallery v2.0</span>
          </div>
        </footer>
      </main>
    </>
  );
}
