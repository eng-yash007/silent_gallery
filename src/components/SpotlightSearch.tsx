"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { searchGlobal, SearchResult } from "@/app/actions/search";
import { useRouter } from "next/navigation";

export default function SpotlightSearch() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Handle global keyboard shortcuts and custom events
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Cmd+K or Ctrl+K
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      
      // Escape to close
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };

    const handleCustomEvent = () => {
      setIsOpen(true);
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("open-spotlight", handleCustomEvent);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("open-spotlight", handleCustomEvent);
    };
  }, [isOpen]);

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
      // Reset state when opening
      setQuery("");
      setResults([]);
    }
  }, [isOpen]);

  // Debounced Search
  useEffect(() => {
    const fetchResults = async () => {
      if (query.trim() === "") {
        setResults([]);
        return;
      }

      setIsLoading(true);
      try {
        const res = await searchGlobal(query);
        setResults(res);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    const delayDebounceFn = setTimeout(() => {
      fetchResults();
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [query]);

  const handleResultClick = (url: string) => {
    router.push(url);
    setIsOpen(false);
  };

  const getIconForType = (type: string) => {
    switch (type) {
      case "Task": return "check_circle";
      case "Project": return "folder_open";
      case "Journal": return "edit_note";
      default: return "search";
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-start justify-center pt-[15vh]">
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="relative w-full max-w-2xl bg-surface-container-lowest shadow-[0px_30px_100px_rgba(0,0,0,0.3)] rounded-3xl overflow-hidden border border-outline-variant/20 flex flex-col"
          >
            {/* Search Input Area */}
            <div className="flex items-center px-6 py-5 border-b border-outline-variant/10">
              <span className="material-symbols-outlined text-outline text-3xl mr-4">search</span>
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search tasks, projects, and journal entries..."
                className="flex-grow bg-transparent border-none outline-none text-2xl text-on-surface placeholder:text-outline font-light"
              />
              {isLoading && (
                <span className="material-symbols-outlined animate-spin text-secondary">sync</span>
              )}
              <div className="ml-4 px-2 py-1 bg-surface-container rounded-md text-[10px] font-bold text-outline-variant border border-outline-variant/20 tracking-widest uppercase flex items-center gap-1">
                <span>ESC</span>
              </div>
            </div>

            {/* Results Area */}
            <div className="max-h-[60vh] overflow-y-auto no-scrollbar bg-surface-container/30">
              {query.trim() === "" ? (
                <div className="py-16 text-center flex flex-col items-center">
                  <span className="material-symbols-outlined text-5xl text-outline-variant/50 mb-4">travel_explore</span>
                  <p className="text-outline-variant font-light text-lg">Type anything to start searching globally.</p>
                </div>
              ) : results.length === 0 && !isLoading ? (
                <div className="py-16 text-center flex flex-col items-center">
                  <span className="material-symbols-outlined text-5xl text-outline-variant/50 mb-4">search_off</span>
                  <p className="text-outline-variant font-light text-lg">No results found for "{query}".</p>
                </div>
              ) : (
                <ul className="p-3 space-y-1">
                  {results.map((result) => (
                    <li key={`${result.type}-${result.id}`}>
                      <button
                        onClick={() => handleResultClick(result.url)}
                        className="w-full flex items-center gap-4 px-4 py-4 rounded-2xl hover:bg-surface-container-low transition-colors group text-left"
                      >
                        <div className="w-12 h-12 rounded-xl bg-surface-container flex items-center justify-center shrink-0 group-hover:bg-secondary group-hover:text-on-secondary transition-colors text-outline">
                          <span className="material-symbols-outlined text-xl">{getIconForType(result.type)}</span>
                        </div>
                        <div className="flex-grow overflow-hidden">
                          <h4 className="text-lg font-bold text-on-surface truncate group-hover:text-secondary transition-colors">{result.title}</h4>
                          <p className="text-xs text-outline truncate">{result.subtitle}</p>
                        </div>
                        <div className="shrink-0 flex items-center">
                          <span className="text-[10px] uppercase font-bold tracking-widest text-outline-variant px-3 py-1 bg-surface-container-low rounded-full group-hover:bg-secondary/10 group-hover:text-secondary transition-colors">
                            {result.type}
                          </span>
                          <span className="material-symbols-outlined text-outline opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all ml-2">chevron_right</span>
                        </div>
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Footer */}
            <div className="px-6 py-3 bg-surface-container border-t border-outline-variant/10 flex justify-between items-center text-[10px] font-bold uppercase tracking-widest text-outline-variant">
              <span>Apple Spotlight Inspired</span>
              <div className="flex gap-4">
                <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">keyboard_return</span> to select</span>
                <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">unfold_more</span> to navigate</span>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
