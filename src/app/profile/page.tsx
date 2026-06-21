import Header from "@/components/Header";

export default function Profile() {
  return (
    <>
      <Header title="Profile" />
      <main className="w-full min-h-screen pt-32 pb-20 px-6 md:pl-80 md:pr-10 relative z-10">
        <div className="w-full space-y-16">
          <section className="flex flex-col md:flex-row gap-12 items-baseline">
            <div className="md:w-1/3">
              <h2 className="text-5xl md:text-6xl font-extrabold tracking-tighter text-on-surface leading-tight">
                Your<br/>Identity.
              </h2>
            </div>
            <div className="md:w-2/3 pt-4">
              <p className="text-xl text-on-surface-variant font-light leading-relaxed max-w-md">
                Manage your personal information and presence across the workspace.
              </p>
            </div>
          </section>

          <section className="bg-surface-container-lowest p-8 rounded-3xl border border-outline-variant/10 shadow-sm text-center">
            <div className="w-24 h-24 rounded-full bg-secondary text-on-secondary mx-auto flex items-center justify-center mb-6">
              <span className="material-symbols-outlined text-4xl">person</span>
            </div>
            <h3 className="text-2xl font-bold text-on-surface mb-2">Connected via Google</h3>
            <p className="text-outline-variant">Your profile details are synced automatically.</p>
          </section>
        </div>
      </main>
    </>
  );
}
