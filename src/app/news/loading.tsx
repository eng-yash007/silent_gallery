import Header from "@/components/Header";

export default function Loading() {
  return (
    <>
      <Header title="Daily Briefing" />
      <main className="w-full min-h-screen pt-32 pb-20 px-6 md:pl-80 md:pr-10 relative z-10">
        <div className="w-full space-y-16">
          <section className="flex flex-col md:flex-row gap-12 items-baseline border-b border-outline-variant/10 pb-8">
            <div className="md:w-1/3">
              <div className="h-16 bg-surface-container-high rounded-2xl w-3/4 animate-pulse"></div>
            </div>
            <div className="md:w-2/3 pt-4">
              <div className="h-6 bg-surface-container-high rounded w-full animate-pulse mb-2"></div>
              <div className="h-6 bg-surface-container-high rounded w-4/5 animate-pulse"></div>
            </div>
          </section>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mt-12">
            {[1, 2, 3, 4, 5, 6, 7].map((i) => (
              <div key={i} className={`bg-surface-container-lowest border border-outline-variant/10 rounded-[2rem] p-8 animate-pulse ${i === 1 ? 'md:col-span-12 min-h-[350px] p-10 md:p-14' : 'md:col-span-6 min-h-[250px]'}`}>
                <div className="flex justify-between items-start mb-6">
                  <div className="w-24 h-6 bg-surface-container-high rounded-full"></div>
                  <div className="w-16 h-4 bg-surface-container-high rounded"></div>
                </div>
                <div className={`w-3/4 bg-surface-container-high rounded mb-4 ${i === 1 ? 'h-10' : 'h-8'}`}></div>
                <div className="w-full h-4 bg-surface-container-high rounded mb-2"></div>
                <div className="w-5/6 h-4 bg-surface-container-high rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
