import Header from "@/components/Header";
import { getDbNotifications, clearAllNotifications } from "@/app/actions/notifications";
import { revalidatePath } from "next/cache";

export default async function Notifications() {
  const res = await getDbNotifications();
  const notifications = res.success ? res.data : [];

  const handleClear = async () => {
    "use server";
    await clearAllNotifications();
    revalidatePath("/notifications");
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'task_overdue': return 'error';
      case 'task_due_soon': return 'schedule';
      case 'meeting_soon': return 'videocam';
      default: return 'notifications';
    }
  };

  const getIconColors = (type: string) => {
    switch (type) {
      case 'task_overdue': return 'bg-error/10 text-error';
      case 'task_due_soon': return 'bg-orange-500/10 text-orange-500';
      case 'meeting_soon': return 'bg-secondary/10 text-secondary';
      default: return 'bg-zinc-100 text-zinc-500';
    }
  };

  return (
    <>
      <Header title="Notifications" />
      <main className="w-full min-h-screen pt-32 pb-20 px-6 md:pl-80 md:pr-10 relative z-10 flex justify-center">
        {/* Full-page Notification Panel */}
        <div className="w-full max-w-3xl rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-outline-variant/20 overflow-hidden bg-white/60 backdrop-blur-3xl mt-10">
          <div className="p-8 border-b flex justify-between items-center border-outline-variant/10 bg-surface-container-lowest">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-outline mb-1">Activity Stream</h3>
              <p className="text-2xl font-bold tracking-tight text-on-surface">Notifications</p>
            </div>
            {notifications && notifications.length > 0 && (
              <form action={handleClear}>
                <button type="submit" className="text-[11px] font-bold uppercase tracking-widest text-secondary hover:text-secondary-dim transition-colors px-4 py-2 bg-secondary/5 rounded-full">
                  Clear All
                </button>
              </form>
            )}
          </div>
          <div className="divide-y divide-outline-variant/10">
            {(!notifications || notifications.length === 0) ? (
              <div className="p-16 text-center text-outline-variant">
                <span className="material-symbols-outlined text-5xl mb-4 text-outline-variant/50">notifications_paused</span>
                <p className="text-lg font-medium">No active notifications</p>
                <p className="text-sm mt-2">You're completely caught up on your events.</p>
              </div>
            ) : (
              notifications.map((notif: any) => (
                <div key={notif.id} className={`p-8 transition-colors cursor-pointer group ${notif.isRead ? 'bg-surface-container-lowest opacity-70' : 'bg-white hover:bg-surface-container-lowest'}`}>
                  <div className="flex gap-6 items-start">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${getIconColors(notif.type)}`}>
                      <span className="material-symbols-outlined text-2xl" style={{fontVariationSettings: "'FILL' 1"}}>{getIcon(notif.type)}</span>
                    </div>
                    <div className="flex flex-col flex-grow">
                      <div className="flex justify-between items-start mb-1">
                        <p className={`text-lg tracking-tight ${notif.isRead ? 'font-medium text-on-surface-variant' : 'font-bold text-on-surface'}`}>
                          {notif.title}
                        </p>
                        <span className="text-xs font-bold text-primary uppercase tracking-widest">{notif.timeString}</span>
                      </div>
                      <p className="text-sm text-on-surface-variant leading-relaxed">
                        {notif.description}
                      </p>
                      {!notif.isRead && (
                        <div className="mt-4 flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button className="px-4 py-1.5 text-[10px] font-bold uppercase tracking-wider text-white bg-secondary rounded-full hover:bg-secondary-dim transition-colors">View Details</button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </main>
    </>
  );
}
