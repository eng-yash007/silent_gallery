import Header from "@/components/Header";
import { getCalendarEvents } from "@/app/actions/calendar";
import CreateEventForm from "@/components/CreateEventForm";
import CalendarViews from "@/components/CalendarViews";

export default async function Calendar() {
  const result = await getCalendarEvents();
  
  const events = result.success ? result.events : [];
  const errorMsg = result.error;

  // Helper to format date and time cleanly
  const formatTime = (dateTimeString: string) => {
    if (!dateTimeString) return "All Day";
    const date = new Date(dateTimeString);
    return date.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true });
  };
  
  const formatDate = (dateTimeString: string) => {
    if (!dateTimeString) return "";
    const date = new Date(dateTimeString);
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric", weekday: 'short' });
  };

  return (
    <>
      <Header title="Schedule" />
      <main className="w-full min-h-screen pt-32 pb-20 px-6 md:pl-80 md:pr-10 relative z-10">
        <div className="w-full space-y-16">
          
          <section className="flex flex-col md:flex-row gap-12 items-baseline">
            <div className="md:w-1/3">
              <h2 className="text-5xl md:text-6xl font-extrabold tracking-tighter text-on-surface leading-tight">
                Your<br/>Timeline.
              </h2>
            </div>
            <div className="md:w-2/3 pt-4">
              <p className="text-xl text-on-surface-variant font-light leading-relaxed max-w-md">
                Sync with your Google Workspace. Plan meetings, review schedules, and join video calls instantly.
              </p>
            </div>
          </section>

          {/* Quick Schedule Form */}
          <CreateEventForm />

          {/* Error Message if Google Calendar fails */}
          {errorMsg && (
            <div className="bg-error/10 border border-error/20 p-8 rounded-3xl mb-12">
              <div className="flex items-center gap-3 mb-4">
                <span className="material-symbols-outlined text-error text-3xl">cloud_off</span>
                <h3 className="text-error font-semibold text-xl">Workspace Connection Pending</h3>
              </div>
              <p className="text-on-surface-variant mb-6">{errorMsg}</p>
              <div className="p-4 bg-surface-container-lowest rounded-xl border border-outline-variant/10">
                <h4 className="text-xs font-bold uppercase tracking-widest text-outline-variant mb-2">Developer Setup Required</h4>
                <ol className="list-decimal pl-4 text-sm text-on-surface-variant space-y-2">
                  <li>Go to Google Cloud Console.</li>
                  <li>Enable <strong>Google Calendar API</strong>.</li>
                  <li>Create OAuth 2.0 Credentials.</li>
                  <li>Add <code>GOOGLE_CLIENT_ID</code> and <code>GOOGLE_CLIENT_SECRET</code> to your local <code>.env</code> file.</li>
                  <li>Sign out and sign back in to refresh permissions.</li>
                </ol>
              </div>
            </div>
          )}

          {!errorMsg && (
            <CalendarViews events={events} />
          )}

        </div>
      </main>
    </>
  );
}
