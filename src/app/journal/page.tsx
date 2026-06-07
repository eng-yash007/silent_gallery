import Header from "@/components/Header";
import Link from "next/link";

export default function Journal() {
  return (
    <>
      <Header title="Journal" />
      <main className="w-full min-h-screen pt-32 pb-20 px-6 md:pl-80 md:pr-10 relative z-10">
        <div className="mt-10 px-6 md:px-20 max-w-5xl mx-auto pb-24">
          {/* Hero Section: Asymmetric Layout */}
          <section className="mb-24 flex flex-col md:flex-row gap-12 items-baseline">
            <div className="md:w-1/3">
              <h2 className="text-5xl md:text-6xl font-extrabold tracking-tighter text-on-surface leading-tight">
                The<br/>Silent<br/>Record.
              </h2>
            </div>
            <div className="md:w-2/3 pt-4">
              <p className="text-xl text-on-surface-variant font-light leading-relaxed max-w-md">
                A curated space for your internal dialogue. Each entry is a placarding of thought within the gallery of your evolution.
              </p>
            </div>
          </section>

          {/* Vertical Timeline */}
          <div className="relative">
            {/* Subtle Timeline Line (Tonal Shift instead of border) */}
            <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-surface-container translate-x-[-0.5px] hidden md:block"></div>
            <div className="space-y-32">
              {/* Entry 1 */}
              <article className="relative flex flex-col md:flex-row gap-8 items-start group">
                <div className="md:w-1/2 md:text-right md:pr-12">
                  <span className="font-['Inter'] text-[0.6875rem] tracking-[0.2em] uppercase text-secondary font-bold block mb-2">OCTOBER 24, 2023</span>
                  <h3 className="text-3xl font-bold tracking-tight text-on-surface mb-4">Finding Clarity in Chaos</h3>
                  <div className="bg-surface-container-lowest p-1 rounded-xl shadow-[0px_20px_40px_rgba(45,51,56,0.04)] mb-6 overflow-hidden">
                    <img className="w-full h-48 object-cover rounded-lg" data-alt="Monochrome photograph of sunlight filtering through dense forest leaves, high contrast shadows and light" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAZ08w9a7CJC8KJ_H0SxqmroFSutb2i-0AOC1XiXQW_KXZvGyNcrEYGQrOye7FqqpCcX_zg74HZzxjMb3Ny8M5jRR6gZtH9rviZGULqtIab-9e0lX0V-R5KoKmSwSrtHFhfd6eMzo2t23Ff507W3Wa0w5V1k0Gl89YNt4VGvjukjmw3K2Q9S5NHL8gGL3cF1g5RDBiR9IKfyrbmVwvOFoc7Y1XeWy9oDBIOOr8Zq-3JJShu0QPeKHf61-WnSlc8mDe_7HC1RkoTGFtg"/>
                  </div>
                </div>
                <div className="hidden md:flex absolute left-1/2 top-1 -translate-x-1/2 w-3 h-3 rounded-full bg-secondary border-4 border-background z-10 transition-transform group-hover:scale-150"></div>
                <div className="md:w-1/2 md:pl-12">
                  <p className="text-lg text-on-surface-variant font-light leading-relaxed">
                    There is a specific kind of silence that only comes after the storm. Today, I realized that my best work doesn't happen when the room is quiet, but when my mind finds its own center amidst the noise.
                  </p>
                  <button className="mt-6 text-sm font-bold text-secondary uppercase tracking-widest hover:opacity-70 transition-all flex items-center gap-2">
                    Read Full Insight
                    <span className="material-symbols-outlined" style={{fontSize: "16px"}}>arrow_forward</span>
                  </button>
                </div>
              </article>

              {/* Entry 2 */}
              <article className="relative flex flex-col md:flex-row-reverse gap-8 items-start group">
                <div className="md:w-1/2 md:text-left md:pl-12">
                  <span className="font-['Inter'] text-[0.6875rem] tracking-[0.2em] uppercase text-on-surface-variant opacity-60 font-bold block mb-2">OCTOBER 21, 2023</span>
                  <h3 className="text-3xl font-bold tracking-tight text-on-surface mb-4">The Art of Saying No</h3>
                </div>
                <div className="hidden md:flex absolute left-1/2 top-1 -translate-x-1/2 w-3 h-3 rounded-full bg-surface-container-highest border-4 border-background z-10 transition-transform group-hover:scale-150 group-hover:bg-secondary"></div>
                <div className="md:w-1/2 md:pr-12 md:text-right">
                  <p className="text-lg text-on-surface-variant font-light leading-relaxed">
                    Curating one's life is as important as curating a gallery. Every 'yes' is a commitment that displaces something else. Today was about reclaiming space for the things that truly resonate.
                  </p>
                  <div className="flex md:justify-end mt-4 gap-2">
                    <span className="px-3 py-1 bg-surface-container-low rounded-full text-[10px] font-bold tracking-tighter uppercase text-on-surface-variant">Strategy</span>
                    <span className="px-3 py-1 bg-surface-container-low rounded-full text-[10px] font-bold tracking-tighter uppercase text-on-surface-variant">Focus</span>
                  </div>
                </div>
              </article>

              {/* Entry 3 (Minimal snippet style) */}
              <article className="relative flex flex-col md:flex-row gap-8 items-start group">
                <div className="md:w-1/2 md:text-right md:pr-12">
                  <span className="font-['Inter'] text-[0.6875rem] tracking-[0.2em] uppercase text-on-surface-variant opacity-60 font-bold block mb-2">OCTOBER 18, 2023</span>
                  <h3 className="text-3xl font-bold tracking-tight text-on-surface mb-4">Morning Rituals</h3>
                </div>
                <div className="hidden md:flex absolute left-1/2 top-1 -translate-x-1/2 w-3 h-3 rounded-full bg-surface-container-highest border-4 border-background z-10 transition-transform group-hover:scale-150 group-hover:bg-secondary"></div>
                <div className="md:w-1/2 md:pl-12">
                  <div className="bg-surface-container-low border-l-4 border-secondary/20 p-8 rounded-xl italic text-xl text-on-surface/80 font-light leading-relaxed">
                    "The morning is the blank canvas upon which we paint our day. If we rush the first strokes, the whole composition suffers."
                  </div>
                  <p className="mt-6 text-on-surface-variant font-light">
                    Brief notes on the 5 AM start. The light was perfect.
                  </p>
                </div>
              </article>

              {/* Entry 4 */}
              <article className="relative flex flex-col md:flex-row-reverse gap-8 items-start group">
                <div className="md:w-1/2 md:text-left md:pl-12">
                  <span className="font-['Inter'] text-[0.6875rem] tracking-[0.2em] uppercase text-on-surface-variant opacity-60 font-bold block mb-2">OCTOBER 12, 2023</span>
                  <h3 className="text-3xl font-bold tracking-tight text-on-surface mb-4">Minimalism in Design</h3>
                </div>
                <div className="hidden md:flex absolute left-1/2 top-1 -translate-x-1/2 w-3 h-3 rounded-full bg-surface-container-highest border-4 border-background z-10 transition-transform group-hover:scale-150 group-hover:bg-secondary"></div>
                <div className="md:w-1/2 md:pr-12 md:text-right">
                  <p className="text-lg text-on-surface-variant font-light leading-relaxed">
                    Design is not what you add, it is what you take away until the essence remains. Applying this to my project workflow today.
                  </p>
                  <div className="mt-8 flex md:justify-end">
                    <div className="relative w-48 h-32 rounded-xl overflow-hidden shadow-lg rotate-2 group-hover:rotate-0 transition-transform">
                      <img className="w-full h-full object-cover" data-alt="Interior shot of a minimalist workspace with a single lamp and a wooden desk, clean and serene atmosphere" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAkxbG9lMO7SJyLitrxy6XUAkUVf3_yoLTe4qc0xtES0N5MDj8L_5EpwCddqmV494sIGZRxbY01QdGcKMlubbAuGBkBM44YIbLTnZj09YV8-j2Ez_k5GhgpIrwlxwTJMmbzme6_nICtixx49lflGrmupljdd1RqPkDoCXcKAyUa0rLHd_pnnwTct1I7e4JuQclz0ZUIhwSNPZQNkqsXUBaJGI4Me02kgXQ1Uiq0IYo_TGmu5rQwQqBWj0GMp-41kqx4915Zi-tj6S26"/>
                    </div>
                  </div>
                </div>
              </article>
            </div>
          </div>

          {/* Pagination/Load More (Editorial Style) */}
          <div className="mt-32 text-center">
            <button className="px-12 py-4 border border-outline-variant/20 rounded-full text-sm font-bold tracking-[0.2em] uppercase hover:bg-surface-container-low transition-all">
              Discover Older Archives
            </button>
          </div>
        </div>
      </main>
    </>
  );
}
