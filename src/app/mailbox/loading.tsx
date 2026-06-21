import Header from "@/components/Header";

export default function Loading() {
  return (
    <>
      <Header title="Mailbox" />
      <main className="w-full min-h-screen pt-32 pb-20 px-6 md:pl-80 md:pr-10 relative z-10">
        <div className="w-full space-y-16">
          <section className="flex flex-col md:flex-row gap-12 items-baseline">
            <div className="md:w-1/3">
              <div className="h-16 bg-surface-container-high rounded-2xl w-full animate-pulse"></div>
            </div>
            <div className="md:w-2/3 pt-4">
              <div className="h-6 bg-surface-container-high rounded w-full animate-pulse mb-2"></div>
              <div className="h-6 bg-surface-container-high rounded w-3/4 animate-pulse"></div>
            </div>
          </section>

          <div className="space-y-6">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="bg-surface-container-lowest p-8 rounded-[2rem] border border-outline-variant/10 animate-pulse">
                <div className="flex justify-between items-start mb-6">
                  <div className="w-24 h-6 bg-surface-container-high rounded-full"></div>
                  <div className="w-16 h-4 bg-surface-container-high rounded"></div>
                </div>
                <div className="w-3/4 h-6 bg-surface-container-high rounded mb-4"></div>
                <div className="w-1/4 h-4 bg-surface-container-high rounded mb-6"></div>
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
