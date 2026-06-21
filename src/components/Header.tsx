"use client";

import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { useState } from 'react';
import NotificationDropdown from './NotificationDropdown';
import NotificationPoller from './NotificationPoller';

export default function Header({ title }: { title: string }) {
  const { data: session } = useSession();
  const [profileOpen, setProfileOpen] = useState(false);

  return (
    <header className="fixed top-0 w-full bg-white/40 backdrop-blur-md flex justify-end items-center px-10 py-6 z-30 md:pl-80 border-b border-white/20">
      <div className="flex items-center gap-6">
        
        <NotificationDropdown />
        <NotificationPoller />

        <button 
          onClick={() => window.dispatchEvent(new Event('open-spotlight'))}
          className="material-symbols-outlined text-primary hover:text-secondary transition-colors inline-flex" 
          title="Search (Cmd+K)"
        >
          search
        </button>
        <Link href="/calendar" className="material-symbols-outlined text-primary hover:text-secondary transition-colors inline-flex" title="Calendar">calendar_today</Link>
        <Link href="/settings" className="material-symbols-outlined text-primary hover:text-secondary transition-colors inline-flex" title="Settings">settings</Link>

        {session?.user && (
          <div className="relative">
            <button 
              onClick={() => setProfileOpen(!profileOpen)}
              className="w-8 h-8 rounded-full overflow-hidden border-2 border-outline-variant/30 hover:border-secondary transition-all"
            >
              <img 
                src={session.user.image || `https://ui-avatars.com/api/?name=${session.user.name}&background=random`} 
                alt="Profile" 
                className="w-full h-full object-cover"
              />
            </button>

            {profileOpen && (
              <>
                <div className="fixed inset-0 z-[90]" onClick={() => setProfileOpen(false)}></div>
                <div className="absolute right-0 top-[calc(100%+10px)] w-64 bg-surface-container-lowest shadow-[0px_20px_40px_rgba(45,51,56,0.1)] rounded-2xl border border-outline-variant/20 z-[100] p-2 overflow-hidden">
                  <div className="p-4 border-b border-outline-variant/10 flex flex-col items-center text-center">
                    <img 
                      src={session.user.image || `https://ui-avatars.com/api/?name=${session.user.name}&background=random`} 
                      alt="Profile" 
                      className="w-16 h-16 rounded-full mb-3 shadow-md"
                    />
                    <h3 className="font-headline font-bold text-on-surface">{session.user.name}</h3>
                    <p className="text-[10px] text-outline-variant mt-1">{session.user.email}</p>
                  </div>
                  <div className="p-2">
                    <button 
                      onClick={() => signOut({ callbackUrl: "/login" })}
                      className="w-full flex items-center justify-between px-4 py-3 rounded-xl hover:bg-error/10 text-error transition-all group"
                    >
                      <span className="text-xs font-bold uppercase tracking-widest">Disconnect</span>
                      <span className="material-symbols-outlined text-[16px] group-hover:-translate-x-1 transition-transform">logout</span>
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
