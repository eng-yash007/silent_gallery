import Header from "@/components/Header";

export default function News() {
  return (
    <>
      <Header title="News" />
      <main className="w-full min-h-screen pt-32 pb-20 px-6 md:pl-80 md:pr-10 relative z-10">
        <div className="pt-32 px-12 pb-24 max-w-4xl">
          <section className="mb-20">
            <span className="text-[0.6875rem] font-bold tracking-[0.05em] uppercase text-on-secondary-fixed-variant mb-4 block">
              Curated Daily
            </span>
            <h1 className="text-display-lg md:text-[3.5rem] font-headline font-bold -tracking-[0.02em] leading-tight text-on-surface">
              Briefings
            </h1>
            <p className="text-body-lg text-on-surface-variant mt-6 max-w-lg font-light leading-relaxed">
              A distilled summary of the day's essential developments in design, technology, and culture.
            </p>
          </section>

          <div className="flex flex-col space-y-0">
            <article className="group py-12 transition-all duration-500 hover:translate-x-2 border-b border-outline-variant/10">
              <div className="flex flex-col md:flex-row md:items-start gap-6 md:gap-16">
                <time className="text-[0.6875rem] font-bold tracking-[0.05em] uppercase text-outline-variant pt-2 w-24">08:30 AM</time>
                <div className="flex-grow">
                  <h2 className="text-headline-lg text-2xl md:text-[2rem] font-headline font-semibold leading-tight text-on-surface mb-4 group-hover:text-secondary transition-colors duration-300">
                    The resurgence of tactile interfaces in industrial design.
                  </h2>
                  <p className="text-body-lg text-on-surface-variant font-light leading-relaxed max-w-2xl">
                    Recent shifts in consumer electronics suggest a move away from pure glass surfaces toward physical feedback loops and mechanical precision.
                  </p>
                </div>
              </div>
            </article>

            <article className="group py-12 transition-all duration-500 hover:translate-x-2 border-b border-outline-variant/10">
              <div className="flex flex-col md:flex-row md:items-start gap-6 md:gap-16">
                <time className="text-[0.6875rem] font-bold tracking-[0.05em] uppercase text-outline-variant pt-2 w-24">11:15 AM</time>
                <div className="flex-grow">
                  <h2 className="text-headline-lg text-2xl md:text-[2rem] font-headline font-semibold leading-tight text-on-surface mb-4 group-hover:text-secondary transition-colors duration-300">
                    Global aesthetic shifts toward muted minimalism.
                  </h2>
                  <p className="text-body-lg text-on-surface-variant font-light leading-relaxed max-w-2xl">
                    Architecture and digital interfaces are converging on a shared language of restraint, focusing on light-play and material honesty.
                  </p>
                </div>
              </div>
            </article>

            <article className="group py-12 transition-all duration-500 hover:translate-x-2 border-b border-outline-variant/10">
              <div className="flex flex-col md:flex-row md:items-start gap-6 md:gap-16">
                <time className="text-[0.6875rem] font-bold tracking-[0.05em] uppercase text-outline-variant pt-2 w-24">02:45 PM</time>
                <div className="flex-grow">
                  <h2 className="text-headline-lg text-2xl md:text-[2rem] font-headline font-semibold leading-tight text-on-surface mb-4 group-hover:text-secondary transition-colors duration-300">
                    The impact of generative typography on editorial layout.
                  </h2>
                  <p className="text-body-lg text-on-surface-variant font-light leading-relaxed max-w-2xl">
                    Variable fonts are enabling a new era of reactive reading experiences that adapt to environmental context and user preference.
                  </p>
                </div>
              </div>
            </article>

            <article className="group py-12 transition-all duration-500 hover:translate-x-2">
              <div className="flex flex-col md:flex-row md:items-start gap-6 md:gap-16">
                <time className="text-[0.6875rem] font-bold tracking-[0.05em] uppercase text-outline-variant pt-2 w-24">05:20 PM</time>
                <div className="flex-grow">
                  <h2 className="text-headline-lg text-2xl md:text-[2rem] font-headline font-semibold leading-tight text-on-surface mb-4 group-hover:text-secondary transition-colors duration-300">
                    Sustainable materials in premium packaging.
                  </h2>
                  <p className="text-body-lg text-on-surface-variant font-light leading-relaxed max-w-2xl">
                    Luxury brands are successfully pivoting to mycelium-based alternatives, proving that high-end experience doesn't require high environmental cost.
                  </p>
                </div>
              </div>
            </article>
          </div>

          <footer className="mt-24 pt-12 border-t border-outline-variant/10 flex justify-between items-center text-[0.6875rem] font-bold tracking-[0.05em] uppercase text-outline-variant">
            <div>End of Daily Briefing</div>
            <div className="flex gap-8">
              <a href="/progress" className="hover:text-secondary transition-colors">Archive</a>
              <a href="/settings" className="hover:text-secondary transition-colors">Preferences</a>
            </div>
          </footer>
        </div>
      </main>
    </>
  );
}
