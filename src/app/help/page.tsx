import Header from "@/components/Header";
import Link from "next/link";

export default function Help() {
  return (
    <>
      <Header title="Help" />
      <main className="w-full min-h-screen pt-32 pb-20 px-6 md:pl-80 md:pr-10 relative z-10">
        <section className="max-w-4xl mx-auto mt-10">
          <p className="text-[11px] uppercase tracking-[0.3em] text-outline font-semibold">Quick start</p>
          <h2 className="mt-3 text-4xl font-bold tracking-tight text-on-surface">Your pages are now linked.</h2>
          <p className="mt-5 text-on-surface-variant leading-relaxed max-w-2xl font-light">
            Use the sidebar to move between sections. Next we'll make the "Today" screen actually create/edit/delete tasks and persist them.
          </p>
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
            <Link href="/" className="p-6 rounded-2xl bg-white border border-outline-variant/20 hover:border-secondary/40 transition-colors shadow-sm group">
              <div className="flex items-center gap-4">
                <span className="material-symbols-outlined text-secondary text-3xl group-hover:scale-110 transition-transform">today</span>
                <div>
                  <div className="font-semibold text-on-surface">Today</div>
                  <div className="text-sm text-outline">Your daily task list</div>
                </div>
              </div>
            </Link>
            <Link href="/projects" className="p-6 rounded-2xl bg-white border border-outline-variant/20 hover:border-secondary/40 transition-colors shadow-sm group">
              <div className="flex items-center gap-4">
                <span className="material-symbols-outlined text-secondary text-3xl group-hover:scale-110 transition-transform">folder_open</span>
                <div>
                  <div className="font-semibold text-on-surface">Projects</div>
                  <div className="text-sm text-outline">Manage your initiatives</div>
                </div>
              </div>
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
