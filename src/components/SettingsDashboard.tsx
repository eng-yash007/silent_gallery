"use client";

import { useState, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import { getUserProfile, updateSetting } from "@/app/actions/settings";

export default function SettingsDashboard() {
  const { data: session } = useSession();
  
  // States
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [focusDuration, setFocusDuration] = useState(25);
  const [silentMode, setSilentMode] = useState(false);
  const [mounted, setMounted] = useState(false);
  
  const [deepWorkHours, setDeepWorkHours] = useState(0);
  const [memberSince, setMemberSince] = useState("Loading...");
  const [tier, setTier] = useState("Starter Tier");
  
  const [newsTopic, setNewsTopic] = useState("Artificial Intelligence");
  const [isSavingTopic, setIsSavingTopic] = useState(false);
  const [topicSaveStatus, setTopicSaveStatus] = useState<'idle' | 'success' | 'error'>('idle');

  // Hydration sync
  useEffect(() => {
    // Read actual DOM state set by hydration script
    const isDark = document.documentElement.classList.contains('dark');
    setTheme(isDark ? 'dark' : 'light');

    const fetchProfile = async () => {
      const res = await getUserProfile();
      if (res.success && res.data) {
        setFocusDuration(res.data.focusDuration);
        setSilentMode(res.data.silentMode);
        setDeepWorkHours(res.data.deepWorkHours);
        setTier(res.data.tier);
        if (res.data.newsTopic) setNewsTopic(res.data.newsTopic);
        
        // Format date "Oct '25"
        const d = new Date(res.data.memberSince);
        const month = d.toLocaleString('default', { month: 'short' });
        const year = d.getFullYear().toString().slice(-2);
        setMemberSince(`${month} '${year}`);
        
        // If DB theme is different from localStorage, sync DB to localStorage preference
        if (res.data.theme !== (isDark ? 'dark' : 'light')) {
           updateSetting('theme', isDark ? 'dark' : 'light');
        }
      }
      setMounted(true);
    };
    
    fetchProfile();
  }, []);

  // Handlers
  const toggleTheme = async () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    await updateSetting('theme', newTheme);
  };

  const handleFocusDurationChange = async (val: number) => {
    setFocusDuration(val);
    await updateSetting('focusDuration', val);
  };

  const toggleSilentMode = async () => {
    const newVal = !silentMode;
    setSilentMode(newVal);
    await updateSetting('silentMode', newVal);
  };

  const handleNewsTopicSave = async () => {
    if (!newsTopic.trim()) return;
    setIsSavingTopic(true);
    setTopicSaveStatus('idle');
    const res = await updateSetting('newsTopic', newsTopic.trim());
    setIsSavingTopic(false);
    if (res.success) {
      setTopicSaveStatus('success');
      setTimeout(() => setTopicSaveStatus('idle'), 3000);
    } else {
      setTopicSaveStatus('error');
    }
  };

  if (!mounted) return null; // Avoid hydration mismatch

  return (
    <div className="w-full space-y-12">
      
      {/* Header section */}
      <section className="flex flex-col md:flex-row gap-8 items-baseline border-b border-outline-variant/10 pb-8">
        <div className="md:w-1/3">
          <h2 className="text-5xl md:text-6xl font-extrabold tracking-tighter text-on-surface leading-tight">
            Preferences
          </h2>
        </div>
        <div className="md:w-2/3 pt-4">
          <p className="text-xl text-on-surface-variant font-light leading-relaxed max-w-md">
            Configure your workspace, adjust environmental settings, and manage your connections.
          </p>
        </div>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        <div className="space-y-8">
          {/* Appearance Settings */}
          <section className="bg-surface-container-lowest p-8 rounded-[2.5rem] border border-outline-variant/10 shadow-xl shadow-black/[0.02]">
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-outline mb-8">Appearance</h3>
            <div className="space-y-8">
              <div>
                <p className="font-semibold text-on-surface mb-4">Workspace Theme</p>
                <div className="flex bg-surface-container rounded-2xl p-2 w-max gap-2 border border-outline-variant/10">
                  <button 
                    onClick={() => theme !== 'light' && toggleTheme()}
                    className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold transition-all ${
                      theme === 'light' ? 'bg-white shadow-sm text-secondary' : 'text-primary hover:bg-white/5'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[18px]">light_mode</span>
                    Light
                  </button>
                  <button 
                    onClick={() => theme !== 'dark' && toggleTheme()}
                    className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold transition-all ${
                      theme === 'dark' ? 'bg-zinc-800 shadow-sm text-white' : 'text-primary hover:bg-white/5'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[18px]">dark_mode</span>
                    Dark
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* AI Settings */}
          <section className="bg-surface-container-lowest p-8 rounded-[2.5rem] border border-outline-variant/10 shadow-xl shadow-black/[0.02]">
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-outline mb-8">AI Agent Preferences</h3>
            <div className="space-y-6">
              <div>
                <p className="font-semibold text-on-surface mb-2">Daily News Topic</p>
                <p className="text-xs text-outline-variant mb-4">The AI will curate your morning briefing based on this topic.</p>
                
                <div className="flex gap-3">
                  <div className="relative flex-1">
                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline-variant text-[18px]">
                      category
                    </span>
                    <select 
                      value={newsTopic}
                      onChange={(e) => setNewsTopic(e.target.value)}
                      className="w-full bg-surface-container border border-outline-variant/20 rounded-xl py-3 pl-11 pr-4 text-sm text-on-surface focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-all appearance-none cursor-pointer"
                    >
                      <option value="Artificial Intelligence">🤖 Artificial Intelligence</option>
                      <option value="Technology">💻 Technology</option>
                      <option value="Startups">🚀 Startups</option>
                      <option value="Business">📈 Business & Finance</option>
                      <option value="Gaming">🎮 Gaming</option>
                      <option value="Science">🔬 Science</option>
                      <option value="Global News">🌍 Global News</option>
                    </select>
                    <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-outline-variant text-[18px] pointer-events-none">
                      expand_more
                    </span>
                  </div>
                  <button 
                    onClick={handleNewsTopicSave}
                    disabled={isSavingTopic || !newsTopic.trim()}
                    className="px-6 py-3 rounded-xl bg-secondary text-on-secondary text-sm font-bold shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:hover:translate-y-0 disabled:hover:shadow-md flex items-center gap-2"
                  >
                    {isSavingTopic ? (
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                    ) : topicSaveStatus === 'success' ? (
                      <span className="material-symbols-outlined text-[18px]">check</span>
                    ) : (
                      "Save"
                    )}
                  </button>
                </div>
                {topicSaveStatus === 'error' && (
                  <p className="text-xs text-error mt-2">Failed to update topic. Please try again.</p>
                )}
              </div>
            </div>
          </section>
        </div>

        {/* Protocol Settings */}
        <section className="bg-surface-container-lowest p-8 rounded-[2.5rem] border border-outline-variant/10 shadow-xl shadow-black/[0.02]">
          <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-outline mb-8">Deep Work Protocol</h3>
          <div className="space-y-8">
            <div>
              <p className="font-semibold text-on-surface mb-4 flex justify-between">
                <span>Focus Duration</span>
                <span className="text-secondary">{focusDuration} min</span>
              </p>
              <div className="flex bg-surface-container rounded-2xl p-2 w-max gap-2 border border-outline-variant/10">
                {[25, 50, 90].map(val => (
                  <button 
                    key={val}
                    onClick={() => handleFocusDurationChange(val)}
                    className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${
                      focusDuration === val ? 'bg-white shadow-sm text-secondary' : 'text-primary hover:bg-white/5'
                    }`}
                  >
                    {val}m
                  </button>
                ))}
              </div>
            </div>
            
            <div className="flex items-center justify-between pt-4 border-t border-outline-variant/10">
              <div>
                <h4 className="font-semibold text-on-surface">Silent Mode</h4>
                <p className="text-xs text-outline-variant mt-1">Suppress visual alerts & dots</p>
              </div>
              <button 
                onClick={toggleSilentMode}
                className={`relative w-14 h-8 rounded-full transition-colors ${
                  silentMode ? 'bg-secondary' : 'bg-surface-container-high'
                }`}
              >
                <div className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full transition-transform shadow-sm ${
                  silentMode ? 'translate-x-6' : 'translate-x-0'
                }`}></div>
              </button>
            </div>
          </div>
        </section>
      </div>

      {/* Accounts & Integration */}
      <section className="bg-surface-container-lowest p-8 rounded-[2.5rem] border border-outline-variant/10 shadow-xl shadow-black/[0.02]">
        <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-outline mb-8">Account & Integrations</h3>
        
        <div className="flex flex-col md:flex-row gap-8">
          {/* User Card */}
          <div className="flex-1 flex flex-col justify-between gap-6 p-6 bg-surface-container rounded-3xl border border-outline-variant/10 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/10 blur-[50px] rounded-full pointer-events-none"></div>

            {session?.user ? (
              <>
                <div className="flex items-start justify-between relative z-10">
                  <div className="flex items-center gap-5">
                    <img 
                      src={session.user.image || `https://ui-avatars.com/api/?name=${session.user.name}&background=random`} 
                      alt="Profile" 
                      className="w-16 h-16 rounded-full shadow-md border-2 border-white/10"
                    />
                    <div>
                      <h4 className="text-xl font-bold text-on-surface tracking-tight flex items-center gap-2">
                        {session.user.name}
                        <span className="material-symbols-outlined text-secondary text-[16px]" style={{fontVariationSettings: "'FILL' 1"}}>verified</span>
                      </h4>
                      <p className="text-sm text-outline mt-0.5">{session.user.email}</p>
                    </div>
                  </div>
                  <div className="bg-secondary/10 text-secondary px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase border border-secondary/20 shadow-sm">
                    {tier}
                  </div>
                </div>

                {/* Stats row */}
                <div className="grid grid-cols-2 gap-4 mt-2 relative z-10">
                  <div className="bg-surface-container-low p-4 rounded-2xl border border-outline-variant/5">
                    <span className="material-symbols-outlined text-secondary mb-2 text-[20px]">timer</span>
                    <h5 className="text-2xl font-black text-on-surface">{deepWorkHours}<span className="text-sm text-outline font-medium ml-1">hrs</span></h5>
                    <p className="text-[10px] text-outline uppercase tracking-wider mt-1">Deep Work Logged</p>
                  </div>
                  <div className="bg-surface-container-low p-4 rounded-2xl border border-outline-variant/5">
                    <span className="material-symbols-outlined text-secondary mb-2 text-[20px]">calendar_month</span>
                    <h5 className="text-2xl font-black text-on-surface flex items-baseline">
                      {memberSince.split(" ")[0]} <span className="text-sm text-outline font-medium ml-1">{memberSince.split(" ")[1]}</span>
                    </h5>
                    <p className="text-[10px] text-outline uppercase tracking-wider mt-1">Member Since</p>
                  </div>
                </div>

                <div className="mt-2 pt-4 border-t border-outline-variant/10 relative z-10 flex justify-end">
                  <button 
                    onClick={() => signOut({ callbackUrl: "/login" })}
                    className="px-6 py-2.5 rounded-full bg-error/10 text-error font-bold text-sm hover:bg-error/20 transition-colors flex items-center gap-2"
                  >
                    <span className="material-symbols-outlined text-[16px]">logout</span>
                    Disconnect
                  </button>
                </div>
              </>
            ) : (
              <div className="text-primary text-sm font-medium">No active session found. Connect Google Account below to unlock integrations.</div>
            )}
          </div>

          {/* Integration Status */}
          <div className="md:w-1/3 flex flex-col gap-4">
            <div className={`flex justify-between items-center p-5 bg-surface-container rounded-3xl border border-outline-variant/10 ${session ? 'opacity-100' : 'opacity-50'}`}>
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${session ? 'bg-secondary/10 text-secondary' : 'bg-outline-variant/20 text-outline-variant'}`}>
                  <span className="material-symbols-outlined text-[16px]">mail</span>
                </div>
                <div>
                  <h4 className="font-semibold text-on-surface text-sm">Gmail Hub</h4>
                  <p className="text-[10px] text-outline-variant mt-0.5 uppercase tracking-wider">{session ? 'Connected' : 'Disconnected'}</p>
                </div>
              </div>
              <span className={`material-symbols-outlined text-xl ${session ? 'text-secondary' : 'text-outline-variant'}`}>
                {session ? 'check_circle' : 'cancel'}
              </span>
            </div>

            <div className={`flex justify-between items-center p-5 bg-surface-container rounded-3xl border border-outline-variant/10 ${session ? 'opacity-100' : 'opacity-50'}`}>
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${session ? 'bg-secondary/10 text-secondary' : 'bg-outline-variant/20 text-outline-variant'}`}>
                  <span className="material-symbols-outlined text-[16px]">event</span>
                </div>
                <div>
                  <h4 className="font-semibold text-on-surface text-sm">Google Calendar</h4>
                  <p className="text-[10px] text-outline-variant mt-0.5 uppercase tracking-wider">{session ? 'Connected' : 'Disconnected'}</p>
                </div>
              </div>
              <span className={`material-symbols-outlined text-xl ${session ? 'text-secondary' : 'text-outline-variant'}`}>
                {session ? 'check_circle' : 'cancel'}
              </span>
            </div>
          </div>
        </div>
      </section>

      <footer className="w-full text-center py-8">
        <p className="text-xs text-outline-variant font-medium tracking-[0.1em] uppercase">The Silent Gallery v1.2</p>
      </footer>
    </div>
  );
}
