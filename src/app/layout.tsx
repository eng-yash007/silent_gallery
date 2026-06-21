import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });

import SpotlightSearch from "@/components/SpotlightSearch";
import PremiumNotification from "@/components/PremiumNotification";
import Sidebar from "@/components/Sidebar";
import { Providers } from "@/components/Providers";
import VoiceAgent from "@/components/VoiceAgent";

export const metadata: Metadata = {
  title: "The Silent Gallery",
  description: "A premium dashboard for internal dialogue and focus",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
        <script src="https://cdn.lordicon.com/lordicon.js" async></script>
        <script dangerouslySetInnerHTML={{
          __html: `
            try {
              if (localStorage.getItem('theme') === 'dark') {
                document.documentElement.classList.add('dark');
              } else {
                document.documentElement.classList.remove('dark');
              }
            } catch (e) {}
          `
        }} />
      </head>
      <body className={`${inter.variable} ${playfair.variable} bg-surface text-on-surface selection:bg-secondary-container antialiased`}>
        <Providers>
          <SpotlightSearch />
          <PremiumNotification />
          <Sidebar />
          <VoiceAgent />
          {children}
        </Providers>
      </body>
    </html>
  );
}
