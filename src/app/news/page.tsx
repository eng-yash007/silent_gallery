import Header from "@/components/Header";
import { getLiveNews } from "@/app/actions/news";
import prisma from "@/lib/prisma";
import RefreshNewsButton from "@/components/RefreshNewsButton";
import NewsStickman from "@/components/Stickman/NewsStickman";
import NewsCard from "@/components/NewsCard";

export const revalidate = 0; // Ensure this page always fetches fresh news

export default async function News() {
  const stat = await prisma.userStat.findUnique({ where: { id: "default_user" } });
  const topic = stat?.newsTopic || "Artificial Intelligence";
  
  const newsItems = await getLiveNews();

  // Flipboard already provides clean titles and creators
  const getHeadlineInfo = (item: any) => {
    return { title: item.title, source: item.source };
  };

  // Helper to format the publication date nicely
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
  };

  return (
    <>
      <Header title="Intelligence" />
      <main className="w-full min-h-screen pt-32 pb-20 px-6 md:pl-80 md:pr-10 relative z-10">
        <div className="pt-32 px-4 md:px-12 pb-24 w-full relative">
          <NewsStickman />
          <section className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6 relative z-40">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
                <span className="text-[0.6875rem] font-bold tracking-[0.2em] uppercase text-secondary">
                  Live Feed Active
                </span>
              </div>
              <h1 className="text-display-lg md:text-[4rem] font-headline font-bold -tracking-[0.03em] leading-none text-on-surface mb-2">
                Intelligence.
              </h1>
              <p className="text-lg text-outline mt-4 max-w-md font-light leading-relaxed">
                Real-time developments curated specifically for your focus on <span className="text-on-surface font-semibold">"{topic}"</span>.
              </p>
            </div>
            
            <div className="flex flex-col gap-4 items-start md:items-end">
              <RefreshNewsButton />
              <div className="bg-surface-container-low p-6 rounded-2xl border border-outline-variant/20 min-w-[240px]">
                <span className="text-xs font-bold uppercase tracking-widest text-outline block mb-2">Current Focus</span>
                <span className="text-xl font-semibold text-on-surface">{topic}</span>
                <div className="mt-4 pt-4 border-t border-outline-variant/20 flex justify-between items-center">
                  <span className="text-[10px] uppercase font-bold text-outline">Updates</span>
                  <span className="text-xs font-bold text-secondary">Real-time</span>
                </div>
              </div>
            </div>
          </section>

          {newsItems.length === 0 ? (
            <div className="w-full py-20 flex flex-col items-center justify-center bg-surface-container-lowest rounded-3xl border border-dashed border-outline-variant">
              <span className="material-symbols-outlined text-4xl text-outline mb-4">satellite_alt</span>
              <h3 className="text-xl font-semibold text-on-surface">No signals detected</h3>
              <p className="text-outline mt-2">Try adjusting your topic in the Settings.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              {newsItems.map((item, index) => {
                const { title, source } = getHeadlineInfo(item);
                const isFeatured = index === 0;

                return (
                  <NewsCard 
                    key={index}
                    item={item}
                    title={title}
                    source={source}
                    date={formatDate(item.pubDate as string)}
                    isFeatured={isFeatured}
                  />
                );
              })}
            </div>
          )}

          <footer className="mt-24 pt-12 border-t border-outline-variant/10 flex flex-col md:flex-row justify-between items-center text-[0.6875rem] font-bold tracking-[0.05em] uppercase text-outline-variant gap-6">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-outline"></span>
              Synchronized with Global Feeds
            </div>
            <div className="flex gap-8">
              <a href="/settings" className="hover:text-secondary transition-colors flex items-center gap-2">
                <span className="material-symbols-outlined text-[14px]">tune</span>
                Adjust Parameters
              </a>
            </div>
          </footer>
        </div>
      </main>
    </>
  );
}
