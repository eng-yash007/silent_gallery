"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function Sidebar() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    if (isCollapsed) {
      document.body.classList.add('sidebar-collapsed');
    } else {
      document.body.classList.remove('sidebar-collapsed');
    }
  }, [isCollapsed]);

  const links = [
    { href: '/', icon: 'today', label: 'Today' },
    { href: '/upcoming', icon: 'event_upcoming', label: 'Upcoming' },
    { href: '/projects', icon: 'folder_open', label: 'Projects' },
    { href: '/meetings', icon: 'videocam', label: 'Meetings' },
    { href: '/news', icon: 'newspaper', label: 'News' },
    { href: '/journal', icon: 'edit_note', label: 'Journal' },
    { href: '/mailbox', icon: 'mark_email_unread', label: 'Mailbox' },
  ];

  const bottomLinks = [
    { href: '/settings', icon: 'settings', label: 'Settings' },
    { href: '/help', icon: 'help_outline', label: 'Help' },
  ];

  const profileImage = session?.user?.image || `https://ui-avatars.com/api/?name=${session?.user?.name || "User"}&background=random`;
  const userName = session?.user?.name || "Editorial";

  return (
    <aside id="app-sidebar" className={`fixed left-0 top-0 h-screen bg-surface-container-low flex flex-col py-8 px-4 gap-8 z-40 hidden md:flex border-r border-outline-variant/10 dark:border-zinc-700/50 dark:bg-zinc-900/95 transition-all duration-300 ${isCollapsed ? 'w-24 items-center' : 'w-72 px-8'}`}>
      
      {/* Toggle Button */}
      <button 
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-10 w-6 h-6 bg-white border border-outline-variant/20 rounded-full flex items-center justify-center text-zinc-400 hover:text-secondary shadow-sm z-50 transition-transform"
      >
        <span className="material-symbols-outlined text-[14px]">
          {isCollapsed ? 'chevron_right' : 'chevron_left'}
        </span>
      </button>

      <div className={`flex items-center gap-4 mb-4 ${isCollapsed ? 'justify-center' : ''}`}>
        <Link href="/profile" className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center text-on-secondary shadow-lg overflow-hidden group shrink-0">
          <img alt="User Profile" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" src={profileImage}/>
        </Link>
        {!isCollapsed && (
          <div className="overflow-hidden">
            <h2 className="text-xl font-bold text-on-surface tracking-tight line-clamp-1">{userName}</h2>
            <p className="text-[0.6875rem] font-label tracking-[0.05em] uppercase text-outline truncate">The Silent Gallery</p>
          </div>
        )}
      </div>
      <nav className="flex flex-col gap-2 flex-grow w-full">
        {links.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link 
              key={link.href} 
              href={link.href} 
              title={isCollapsed ? link.label : ""}
              className={`relative flex items-center gap-4 py-3 rounded-xl transition-colors ${isCollapsed ? 'justify-center px-0' : 'px-4'} ${
                isActive 
                  ? 'text-secondary font-bold' 
                  : 'text-primary hover:text-secondary'
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="sidebar-active"
                  className="absolute inset-0 bg-secondary/5 rounded-xl -z-10"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <motion.span 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="material-symbols-outlined z-10" 
                style={isActive ? { fontVariationSettings: "'FILL' 1" } : undefined}
              >
                {link.icon}
              </motion.span>
              {!isCollapsed && <span className="text-sm tracking-[0.05em] uppercase whitespace-nowrap z-10">{link.label}</span>}
            </Link>
          );
        })}
      </nav>
      <div className="mt-auto flex flex-col gap-2 w-full">
        {bottomLinks.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link 
              key={link.href} 
              href={link.href} 
              title={isCollapsed ? link.label : ""}
              className={`relative flex items-center gap-4 py-3 rounded-xl transition-colors ${isCollapsed ? 'justify-center px-0' : 'px-4'} ${
                isActive 
                  ? 'text-secondary font-bold' 
                  : 'text-primary hover:text-secondary'
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="sidebar-active"
                  className="absolute inset-0 bg-secondary/5 rounded-xl -z-10"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <motion.span 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="material-symbols-outlined z-10" 
                style={isActive ? { fontVariationSettings: "'FILL' 1" } : undefined}
              >
                {link.icon}
              </motion.span>
              {!isCollapsed && <span className="text-sm tracking-[0.05em] uppercase whitespace-nowrap z-10">{link.label}</span>}
            </Link>
          );
        })}
      </div>
    </aside>
  );
}
