import Header from "@/components/Header";
import { getCalendarEvents } from "@/app/actions/calendar";
import DeleteEventButton from "@/components/DeleteEventButton";
import InstantMeetForm from "@/components/InstantMeetForm";
import CreateEventForm from "@/components/CreateEventForm";
import MeetingStickman from "@/components/Stickman/MeetingStickman";

export default async function Meetings() {
  const result = await getCalendarEvents();
  
  const allEvents = result.success ? result.events : [];
  const errorMsg = result.error;

  // Filter only meetings (events with Google Meet link)
  const meetings = allEvents.filter((event: any) => {
    return event.hangoutLink || (event.conferenceData?.entryPoints || []).some((ep: any) => ep.entryPointType === 'video');
  });

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
      <Header title="Meetings Hub" />
      <main className="w-full min-h-screen pt-32 pb-20 px-6 md:pl-80 md:pr-10 relative z-10">
        <div className="max-w-6xl mx-auto space-y-16 relative">
          <MeetingStickman />
          
          <section className="flex flex-col md:flex-row gap-12 items-baseline">
            <div className="md:w-1/3">
              <h2 className="text-5xl md:text-6xl font-extrabold tracking-tighter text-on-surface leading-tight relative z-40">
                Video<br/>Conferences.
              </h2>
            </div>
            <div className="md:w-2/3 pt-4">
              <p className="text-xl text-on-surface-variant font-light leading-relaxed max-w-md">
                Your dedicated hub for remote collaboration. Launch instant meets or manage your scheduled calls.
              </p>
            </div>
          </section>

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
            <>
              {/* Instant Meet Form */}
              <InstantMeetForm />

              <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start mt-20">
                <section className="md:col-span-7">
                  <div className="flex items-center justify-between mb-8 border-b border-outline-variant/20 pb-4">
                    <h3 className="text-sm font-bold uppercase tracking-[0.25em] text-outline">Upcoming Video Calls</h3>
                    <span className="material-symbols-outlined text-lg text-blue-500 animate-pulse">videocam</span>
                  </div>
                  
                  {meetings.length === 0 ? (
                    <div className="text-center py-20 bg-surface-container-lowest rounded-3xl border border-dashed border-outline-variant/30">
                      <span className="material-symbols-outlined text-4xl text-outline mb-4">event_busy</span>
                      <h3 className="text-xl font-semibold text-on-surface">No upcoming calls</h3>
                      <p className="text-outline mt-2">You don't have any video conferences scheduled.</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 gap-6">
                      {meetings.map((event: any) => {
                        const start = event.start?.dateTime || event.start?.date;
                        const end = event.end?.dateTime || event.end?.date;
                        const meetLink = event.hangoutLink || (event.conferenceData?.entryPoints || []).find((ep: any) => ep.entryPointType === 'video')?.uri;

                        return (
                          <div key={event.id} className="group relative bg-surface-container-lowest p-6 rounded-3xl border border-outline-variant/10 hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-300 overflow-hidden flex flex-col md:flex-row md:items-center gap-6">
                            
                            <div className="flex-grow">
                              <div className="flex justify-between items-start mb-4 md:mb-2">
                                <span className="text-[10px] uppercase text-outline font-bold tracking-widest flex items-center gap-2">
                                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                                  {formatDate(start)}
                                </span>
                                <DeleteEventButton id={event.id} />
                              </div>
                              
                              <h4 className="text-xl font-bold text-on-surface mb-1">
                                {event.summary || "Untitled Meeting"}
                              </h4>
                              <p className="text-sm text-outline-variant font-medium">
                                {formatTime(start)} — {formatTime(end)}
                              </p>
                            </div>

                            <div className="shrink-0">
                              <a 
                                href={meetLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full md:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl text-sm font-bold shadow-lg shadow-blue-600/20 hover:bg-blue-700 transition-colors"
                              >
                                <span className="material-symbols-outlined text-[18px]">videocam</span>
                                Join Meet
                              </a>
                            </div>

                          </div>
                        );
                      })}
                    </div>
                  )}
                </section>

                <section className="md:col-span-5">
                  <CreateEventForm />
                </section>
              </div>
            </>
          )}

        </div>
      </main>
    </>
  );
}
