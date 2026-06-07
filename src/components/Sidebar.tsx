"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Sidebar() {
  const pathname = usePathname();

  const links = [
    { href: '/', icon: 'today', label: 'Today' },
    { href: '/upcoming', icon: 'event_upcoming', label: 'Upcoming' },
    { href: '/projects', icon: 'folder_open', label: 'Projects' },
    { href: '/news', icon: 'newspaper', label: 'News' },
    { href: '/journal', icon: 'edit_note', label: 'Journal' },
    { href: '/mailbox', icon: 'mark_email_unread', label: 'Mailbox' },
  ];

  const bottomLinks = [
    { href: '/settings', icon: 'settings', label: 'Settings' },
    { href: '/help', icon: 'help_outline', label: 'Help' },
  ];

  return (
    <aside id="app-sidebar" className="fixed left-0 top-0 h-screen w-72 bg-surface-container-low flex flex-col p-8 gap-8 z-40 hidden md:flex border-r border-outline-variant/10 dark:border-zinc-700/50 dark:bg-zinc-900/95">
      <div className="flex items-center gap-4 mb-4">
        <Link href="/profile" className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center text-on-secondary shadow-lg overflow-hidden group">
          <img alt="User Profile" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDqicF_3A2ldbEubHUd4jruUSDl5D4Rq1qRpPPiZQ1I3KZ4FvfYy_Qrn9NV6LWeFkkdbnn4GX9h79xNhtCKJXJNqbExI6pwHhsZj17yhzTCLEyWTVYLzOeICy8i28OLnxDTfnBHABvDXhZQtU5OyhTlCcsw9JFMI1ye0Uz1cXxaYHkd5GdhrpUwH6S0dhbvwDBB4f_GseiQFxd5RxJ93EMvTFR3LTVzWLq3iO_dBowBwNfKBuBzRagqEGosFdvoG0Khnx2nWMv6iTfn"/>
        </Link>
        <div>
          <h2 className="text-xl font-bold text-on-surface tracking-tight">Editorial</h2>
          <p className="text-[0.6875rem] font-label tracking-[0.05em] uppercase text-outline">The Silent Gallery</p>
        </div>
      </div>
      <nav className="flex flex-col gap-2 flex-grow">
        {links.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link 
              key={link.href} 
              href={link.href} 
              className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all ${
                isActive 
                  ? 'text-secondary font-bold hover:bg-surface-container' 
                  : 'text-primary hover:bg-surface-container'
              }`}
            >
              <span 
                className="material-symbols-outlined" 
                style={isActive ? { fontVariationSettings: "'FILL' 1" } : undefined}
              >
                {link.icon}
              </span>
              <span className="text-sm tracking-[0.05em] uppercase">{link.label}</span>
            </Link>
          );
        })}
      </nav>
      <div className="mt-auto flex flex-col gap-2">
        {bottomLinks.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link 
              key={link.href} 
              href={link.href} 
              className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all ${
                isActive 
                  ? 'text-secondary font-bold hover:bg-surface-container' 
                  : 'text-primary hover:bg-surface-container'
              }`}
            >
              <span 
                className="material-symbols-outlined" 
                style={isActive ? { fontVariationSettings: "'FILL' 1" } : undefined}
              >
                {link.icon}
              </span>
              <span className="text-sm tracking-[0.05em] uppercase">{link.label}</span>
            </Link>
          );
        })}
      </div>
    </aside>
  );
}
