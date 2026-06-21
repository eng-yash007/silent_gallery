import Header from "@/components/Header";
import { getJournalEntries } from "@/app/actions/journal";
import CreateJournalForm from "@/components/CreateJournalForm";
import DeleteJournalButton from "@/components/DeleteJournalButton";
import JournalStickman from "@/components/Stickman/JournalStickman";
import ReactMarkdown from "react-markdown";
import React from "react";

export default async function Journal({ searchParams }: { searchParams: { q?: string } }) {
  const query = searchParams.q || "";
  const entries = await getJournalEntries(query);

  // Helper to format date cleanly
  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", { 
      month: "long", 
      day: "numeric", 
      year: "numeric" 
    }).toUpperCase();
  };

  return (
    <>
      <Header title="Journal" />
      <main className="w-full min-h-screen pt-32 pb-20 px-6 md:pl-80 md:pr-10 relative z-10">
        <div className="mt-10 px-6 md:px-20 max-w-5xl mx-auto pb-24 relative">
          <JournalStickman />
          
          {/* Hero Section */}
          <section className="mb-8 flex flex-col md:flex-row gap-12 items-baseline relative z-40">
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

          {/* Quick Capture Form */}
          <CreateJournalForm />

          {/* Vertical Timeline */}
          {entries.length === 0 ? (
            <div className="text-center py-20 bg-surface-container-lowest rounded-3xl border border-dashed border-outline-variant/30">
              <span className="material-symbols-outlined text-4xl text-outline mb-4">edit_document</span>
              <h3 className="text-xl font-semibold text-on-surface">{query ? "No results found" : "The record is blank"}</h3>
              <p className="text-outline mt-2">{query ? `No entries matched "${query}".` : "Add your first thought above to begin the timeline."}</p>
            </div>
          ) : (
            <div className="relative mt-20">
              {/* Subtle Timeline Line */}
              <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-surface-container translate-x-[-0.5px] hidden md:block"></div>
              
              <div className="space-y-24">
                {entries.map((entry: any, index: number) => {
                  const isEven = index % 2 === 0;
                  const sentimentColor = 
                    entry.sentiment === "Positive" ? "text-green-500 border-green-500/20 bg-green-500/5" :
                    entry.sentiment === "Negative" ? "text-red-500 border-red-500/20 bg-red-500/5" :
                    "text-outline border-outline-variant/20 bg-surface-container-low";
                  
                  const tagsList = entry.tags ? entry.tags.split(",") : [];

                  return (
                    <article key={entry.id} className={`relative flex flex-col gap-8 items-start group ${isEven ? "md:flex-row" : "md:flex-row-reverse"}`}>
                      
                      {/* Left/Right Side Info */}
                      <div className={`md:w-1/2 w-full relative ${isEven ? "md:text-right md:pr-12" : "md:text-left md:pl-12"}`}>
                        <span className="font-['Inter'] text-[0.6875rem] tracking-[0.2em] uppercase text-secondary font-bold block mb-2">
                          {formatDate(entry.createdAt)}
                        </span>
                        <h3 className="text-3xl font-bold tracking-tight text-on-surface mb-4">{entry.title}</h3>
                        
                        <div className={`flex flex-wrap mt-4 gap-2 ${isEven ? "md:justify-end" : "md:justify-start"}`}>
                          <span className="px-3 py-1 bg-surface-container-low border border-outline-variant/10 rounded-full text-[10px] font-bold tracking-tighter uppercase text-on-surface-variant">
                            {entry.category}
                          </span>
                          <span className={`px-3 py-1 border rounded-full text-[10px] font-bold tracking-tighter uppercase ${sentimentColor}`}>
                            {entry.sentiment}
                          </span>
                          {tagsList.map((tag: string, i: number) => (
                            <span key={i} className="px-3 py-1 bg-secondary/10 text-secondary border border-secondary/20 rounded-full text-[10px] font-bold tracking-tighter uppercase">
                              #{tag}
                            </span>
                          ))}
                        </div>
                        
                        {/* Delete Button positioning depending on side */}
                        <DeleteJournalButton id={entry.id} />
                      </div>

                      {/* Timeline Dot */}
                      <div className={`hidden md:flex absolute left-1/2 top-2 -translate-x-1/2 w-3 h-3 rounded-full border-4 border-background z-10 transition-transform group-hover:scale-150 group-hover:bg-secondary ${entry.sentiment === 'Positive' ? 'bg-green-500' : entry.sentiment === 'Negative' ? 'bg-red-500' : 'bg-surface-container-highest'}`}></div>
                      
                      {/* Content Area */}
                      <div className={`md:w-1/2 w-full ${isEven ? "md:pl-12" : "md:pr-12"}`}>
                        <div className="bg-surface-container-lowest border border-outline-variant/10 p-8 rounded-2xl shadow-[0px_10px_20px_rgba(45,51,56,0.02)] group-hover:shadow-[0px_20px_40px_rgba(45,51,56,0.05)] transition-all duration-500">
                          <div className="prose prose-invert prose-sm max-w-none text-on-surface-variant font-light leading-relaxed whitespace-pre-wrap">
                            <ReactMarkdown>{entry.content}</ReactMarkdown>
                          </div>
                        </div>
                      </div>
                      
                    </article>
                  );
                })}
              </div>
            </div>
          )}

          {/* Footer */}
          {entries.length > 0 && (
            <div className="mt-32 text-center">
              <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-outline-variant">
                End of the Record
              </p>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
