import Header from "@/components/Header";
import Link from "next/link";

export default function Help() {
  return (
    <>
      <Header title="Help & Guides" />
      <main className="w-full min-h-screen pt-32 pb-20 px-6 md:pl-80 md:pr-10 relative z-10">
        <section className="w-full space-y-12">
          
          {/* Hero Section */}
          <div className="border-b border-outline-variant/10 pb-8">
            <h2 className="text-5xl md:text-6xl font-extrabold tracking-tighter text-on-surface leading-tight">
              User Guide
            </h2>
            <p className="text-xl text-on-surface-variant font-light leading-relaxed max-w-2xl mt-4">
              Master the advanced features of your AI-driven productivity workspace to unlock your absolute highest potential.
            </p>
          </div>

          {/* Guides Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Guide: Deep Work */}
            <div className="bg-surface-container-lowest p-8 rounded-[2.5rem] border border-outline-variant/10 shadow-xl shadow-black/[0.02]">
              <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center mb-6">
                <span className="material-symbols-outlined text-secondary text-[24px]">center_focus_strong</span>
              </div>
              <h3 className="text-xl font-bold text-on-surface mb-3 tracking-tight">The Deep Work Protocol</h3>
              <p className="text-sm text-on-surface-variant leading-relaxed mb-6">
                Your dashboard is equipped with a distraction-free "Focus Mode". 
                Click the "Toggle Focus Mode" button on the bottom right of the Home screen to eliminate all UI elements, sidebars, and menus.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3 text-sm text-on-surface-variant">
                  <span className="material-symbols-outlined text-[16px] text-secondary mt-0.5">check_circle</span>
                  <span><strong>Set Duration:</strong> Go to Settings to adjust your focus block (25m, 50m, 90m).</span>
                </li>
                <li className="flex items-start gap-3 text-sm text-on-surface-variant">
                  <span className="material-symbols-outlined text-[16px] text-secondary mt-0.5">check_circle</span>
                  <span><strong>Analytics:</strong> Every completed task contributes to your global "Deep Work Logged" metric.</span>
                </li>
              </ul>
            </div>

            {/* Guide: AI Agents */}
            <div className="bg-surface-container-lowest p-8 rounded-[2.5rem] border border-outline-variant/10 shadow-xl shadow-black/[0.02]">
              <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center mb-6">
                <span className="material-symbols-outlined text-secondary text-[24px]">auto_awesome</span>
              </div>
              <h3 className="text-xl font-bold text-on-surface mb-3 tracking-tight">AI Briefings & Mail</h3>
              <p className="text-sm text-on-surface-variant leading-relaxed mb-6">
                The built-in Natural Language Processing (NLP) agent works in the background to summarize the internet for you.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3 text-sm text-on-surface-variant">
                  <span className="material-symbols-outlined text-[16px] text-secondary mt-0.5">check_circle</span>
                  <span><strong>News Curation:</strong> Select your preferred News Topic in Settings. The agent will fetch live RSS feeds and summarize them on the News page.</span>
                </li>
                <li className="flex items-start gap-3 text-sm text-on-surface-variant">
                  <span className="material-symbols-outlined text-[16px] text-secondary mt-0.5">check_circle</span>
                  <span><strong>Smart Mailbox:</strong> If connected to Gmail, the agent color-codes and highlights action-items directly inside incoming emails.</span>
                </li>
              </ul>
            </div>

            {/* Guide: Google Calendar Sync */}
            <div className="bg-surface-container-lowest p-8 rounded-[2.5rem] border border-outline-variant/10 shadow-xl shadow-black/[0.02]">
              <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center mb-6">
                <span className="material-symbols-outlined text-secondary text-[24px]">sync</span>
              </div>
              <h3 className="text-xl font-bold text-on-surface mb-3 tracking-tight">Calendar Integrations</h3>
              <p className="text-sm text-on-surface-variant leading-relaxed mb-6">
                Connect your Google Account to unlock a unified timeline.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3 text-sm text-on-surface-variant">
                  <span className="material-symbols-outlined text-[16px] text-secondary mt-0.5">check_circle</span>
                  <span><strong>Two-Way Sync:</strong> Events from your Google Calendar automatically appear alongside your local tasks on the Calendar page.</span>
                </li>
                <li className="flex items-start gap-3 text-sm text-on-surface-variant">
                  <span className="material-symbols-outlined text-[16px] text-secondary mt-0.5">check_circle</span>
                  <span><strong>Timezone Automation:</strong> Your events are mathematically synced to Indian Standard Time (IST) globally.</span>
                </li>
              </ul>
            </div>

            {/* Guide: Dynamic Notifications */}
            <div className="bg-surface-container-lowest p-8 rounded-[2.5rem] border border-outline-variant/10 shadow-xl shadow-black/[0.02]">
              <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center mb-6">
                <span className="material-symbols-outlined text-secondary text-[24px]">notifications_active</span>
              </div>
              <h3 className="text-xl font-bold text-on-surface mb-3 tracking-tight">The Notification Engine</h3>
              <p className="text-sm text-on-surface-variant leading-relaxed mb-6">
                The system runs a background engine that polls your tasks and calendar to alert you at the perfect time.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3 text-sm text-on-surface-variant">
                  <span className="material-symbols-outlined text-[16px] text-secondary mt-0.5">check_circle</span>
                  <span><strong>Task Deadlines:</strong> When you set a "Start Time" for a task, you will receive a push notification when it's time to work.</span>
                </li>
                <li className="flex items-start gap-3 text-sm text-on-surface-variant">
                  <span className="material-symbols-outlined text-[16px] text-secondary mt-0.5">check_circle</span>
                  <span><strong>Meeting Alerts:</strong> The engine automatically detects upcoming Google Meet links and pushes them to your screen.</span>
                </li>
              </ul>
            </div>

          </div>

          {/* Quick Links */}
          <div className="pt-8 border-t border-outline-variant/10">
            <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-outline mb-6">Quick Links</h3>
            <div className="flex flex-wrap gap-4">
              <Link href="/settings" className="px-6 py-3 rounded-full bg-surface-container hover:bg-secondary hover:text-white transition-all text-sm font-bold border border-outline-variant/20 flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px]">settings</span>
                Configure Settings
              </Link>
              <Link href="/calendar" className="px-6 py-3 rounded-full bg-surface-container hover:bg-secondary hover:text-white transition-all text-sm font-bold border border-outline-variant/20 flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px]">calendar_month</span>
                View Unified Timeline
              </Link>
            </div>
          </div>

        </section>
      </main>
    </>
  );
}
