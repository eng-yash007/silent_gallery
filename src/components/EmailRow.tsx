"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { markEmailAsRead, archiveEmail, getFullEmail, ProcessedEmail } from "@/app/actions/mailbox";

export default function EmailRow({ email }: { email: ProcessedEmail }) {
  const [isUnread, setIsUnread] = useState(email.isUnread);
  const [isArchived, setIsArchived] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoadingBody, setIsLoadingBody] = useState(false);
  const [fullBody, setFullBody] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const formatTime = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  const formatDetailedTime = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleString([], { weekday: 'long', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' });
  };

  const handleMarkAsRead = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsUnread(false);
    await markEmailAsRead(email.id);
  };

  const handleArchive = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsArchived(true);
    await archiveEmail(email.id);
  };

  const handleOpenModal = async () => {
    setIsModalOpen(true);
    if (isUnread) {
      setIsUnread(false);
      markEmailAsRead(email.id); // fire and forget
    }
    
    if (!fullBody) {
      setIsLoadingBody(true);
      const res = await getFullEmail(email.id);
      if (res.success && res.data) {
        setFullBody(res.data.htmlBody);
      } else {
        setFullBody("<p>Failed to load email content.</p>");
      }
      setIsLoadingBody(false);
    }
  };

  if (isArchived) return null; // Hide optimistically

  return (
    <>
      <div
        onClick={handleOpenModal}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`group relative rounded-xl p-6 transition-all duration-300 flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8 border cursor-pointer ${
          isUnread 
            ? 'bg-white border-l-4 border-secondary shadow-md shadow-zinc-200/50' 
            : 'bg-surface-container-lowest border-transparent hover:bg-white hover:shadow-sm'
        }`}
      >
        <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm ${
          isUnread ? 'bg-secondary/5 text-secondary' : 'bg-zinc-100 text-zinc-400'
        }`}>
          {email.initials}
        </div>
        <div className="flex-grow grid grid-cols-1 md:grid-cols-12 items-center gap-2 md:gap-4 w-full">
          <div className="md:col-span-3">
            <h4 className={`text-sm tracking-tight ${isUnread ? 'font-extrabold text-zinc-900' : 'font-bold text-zinc-700'}`}>
              {email.from}
            </h4>
            {email.category !== 'general' && (
              <div className="flex items-center gap-1 mt-1">
                <span className={`w-1.5 h-1.5 rounded-full ${email.category === 'urgent' ? 'bg-error' : 'bg-secondary'}`}></span>
                <p className={`text-[10px] font-bold uppercase tracking-widest ${email.category === 'urgent' ? 'text-error' : 'text-secondary'}`}>
                  {email.category}
                </p>
              </div>
            )}
          </div>
          <div className="md:col-span-7">
            <h4 className={`text-md leading-tight truncate ${isUnread ? 'font-bold text-zinc-900' : 'font-medium text-zinc-800'}`}>
              {email.subject}
            </h4>
            <p className="text-sm text-zinc-500 mt-1 truncate">
              {email.snippet}
            </p>
          </div>
          <div className="md:col-span-2 text-left md:text-right">
            <span className={`text-[11px] ${isUnread ? 'font-bold text-secondary' : 'font-medium text-zinc-400'}`}>
              {formatTime(email.date)}
            </span>
          </div>
        </div>
        
        {/* Hover Actions */}
        <div className={`hidden md:flex absolute right-8 top-1/2 -translate-y-1/2 items-center gap-3 transition-all duration-300 ${isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'} bg-white/90 px-2 py-1 rounded-full shadow-sm`}>
          {isUnread && (
            <button 
              onClick={handleMarkAsRead}
              title="Mark as Read"
              className="w-10 h-10 rounded-full flex items-center justify-center text-zinc-400 hover:text-secondary hover:bg-zinc-50 transition-all"
            >
              <span className="material-symbols-outlined text-xl">mark_email_read</span>
            </button>
          )}
          <button 
            onClick={handleArchive}
            title="Archive"
            className="w-10 h-10 rounded-full flex items-center justify-center text-zinc-400 hover:text-error hover:bg-red-50 transition-all"
          >
            <span className="material-symbols-outlined text-xl">archive</span>
          </button>
        </div>
      </div>

      {/* Email Modal */}
      {mounted && isModalOpen && createPortal(
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-zinc-900/60 backdrop-blur-sm">
          {/* Modal Overlay to close */}
          <div className="absolute inset-0" onClick={() => setIsModalOpen(false)}></div>
          
          {/* Modal Content */}
          <div className="relative bg-white rounded-3xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-zinc-100 bg-surface-container-lowest/50">
              <div className="flex items-center gap-4">
                <button 
                  onClick={(e) => { e.stopPropagation(); setIsModalOpen(false); }}
                  className="w-10 h-10 rounded-full bg-zinc-100 flex items-center justify-center text-zinc-600 hover:bg-zinc-200 transition-colors"
                >
                  <span className="material-symbols-outlined">close</span>
                </button>
                <div className="flex gap-2">
                  <button 
                    onClick={(e) => { e.stopPropagation(); setIsModalOpen(false); handleArchive(e); }}
                    className="w-10 h-10 rounded-full flex items-center justify-center text-zinc-400 hover:bg-red-50 hover:text-error transition-colors"
                    title="Archive"
                  >
                    <span className="material-symbols-outlined">archive</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Modal Body (Scrollable) */}
            <div className="flex-grow overflow-y-auto p-8 sm:p-12">
              <h1 className="text-3xl font-extrabold text-zinc-900 tracking-tight leading-tight mb-8">
                {email.subject}
              </h1>
              
              <div className="flex items-start justify-between mb-10 pb-10 border-b border-zinc-100">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center text-secondary font-bold text-lg">
                    {email.initials}
                  </div>
                  <div>
                    <h3 className="font-bold text-zinc-900">{email.from}</h3>
                    <p className="text-xs text-zinc-500 mt-1">to me</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs font-medium text-zinc-400">{formatDetailedTime(email.date)}</p>
                </div>
              </div>

              {isLoadingBody ? (
                <div className="flex flex-col items-center justify-center py-20 text-zinc-400">
                  <span className="material-symbols-outlined animate-spin text-4xl mb-4">progress_activity</span>
                  <p className="text-sm">Decrypting contents...</p>
                </div>
              ) : (
                <iframe 
                  srcDoc={fullBody || ""}
                  className="w-full min-h-[60vh] border-0 rounded-xl bg-white"
                  sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin"
                  title="Email Body"
                />
              )}
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
