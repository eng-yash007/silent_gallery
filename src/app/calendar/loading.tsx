import Header from "@/components/Header";

export default function Loading() {
  return (
    <>
      <Header title="Schedule" />
      <main className="w-full min-h-screen pt-32 pb-20 px-6 md:pl-80 md:pr-10 relative z-10">
        <div className="w-full space-y-16">
          <section className="flex flex-col md:flex-row gap-12 items-baseline">
            <div className="md:w-1/3">
              <div className="h-20 bg-surface-container-high rounded-2xl w-2/3 animate-pulse"></div>
            </div>
            <div className="md:w-2/3 pt-4">
              <div className="h-6 bg-surface-container-high rounded w-full animate-pulse mb-2"></div>
              <div className="h-6 bg-surface-container-high rounded w-3/4 animate-pulse"></div>
            </div>
          </section>

          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1 h-14 bg-surface-container-high rounded-2xl animate-pulse"></div>
            <div className="flex-1 h-14 bg-surface-container-high rounded-2xl animate-pulse"></div>
            <div className="flex-1 h-14 bg-surface-container-high rounded-2xl animate-pulse"></div>
          </div>

          <div className="mt-20">
            <div className="flex justify-between items-center mb-12 border-b border-outline-variant/20 pb-6">
              <div className="w-32 h-6 bg-surface-container-high rounded-full animate-pulse"></div>
              <div className="w-48 h-10 bg-surface-container-high rounded-full animate-pulse"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="bg-surface-container-lowest p-8 rounded-3xl border border-outline-variant/10 min-h-[250px] animate-pulse">
                  <div className="flex justify-between items-start mb-6">
                    <div className="w-16 h-6 bg-surface-container-high rounded-full"></div>
                    <div className="w-24 h-4 bg-surface-container-high rounded"></div>
                  </div>
                  <div className="w-3/4 h-8 bg-surface-container-high rounded mb-4"></div>
                  <div className="w-full h-4 bg-surface-container-high rounded mb-2"></div>
                  <div className="w-5/6 h-4 bg-surface-container-high rounded"></div>
                  
                  <div className="mt-8 pt-6 border-t border-outline-variant/10 flex justify-between">
                    <div className="w-24 h-8 bg-surface-container-high rounded-xl"></div>
                    <div className="w-6 h-6 bg-surface-container-high rounded-full"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
