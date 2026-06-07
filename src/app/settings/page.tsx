import Header from "@/components/Header";

export default function Settings() {
  return (
    <>
      <Header title="Settings" />
      <main className="w-full min-h-screen pt-32 pb-20 px-6 md:pl-80 md:pr-10 relative z-10">
        <div className="max-w-5xl mx-auto px-12">
          {/* Hero Header Section */}
          <section className="mb-20">
            <div className="flex items-end justify-between">
              <div>
                <span className="text-[10px] font-medium uppercase tracking-[0.25em] text-secondary mb-3 block">
                  System Parameters
                </span>
                <h1 className="text-5xl font-bold tracking-tight text-on-surface">Settings</h1>
              </div>
              <div className="text-right hidden lg:block">
                <p className="text-sm text-outline font-light leading-relaxed max-w-[240px]">
                  Refine your environment. Every interaction should feel intentional and quiet.
                </p>
              </div>
            </div>
          </section>

          {/* Settings Grid */}
          <div className="grid grid-cols-12 gap-12">
            {/* Section: User Profile */}
            <div className="col-span-12 lg:col-span-4">
              <h2 className="text-xs uppercase tracking-[0.15em] text-outline-variant font-semibold mb-6">User Profile</h2>
              <p className="text-sm text-on-surface-variant leading-relaxed">Identity and personal presence within the workspace.</p>
            </div>
            <div className="col-span-12 lg:col-span-8">
              <div className="bg-surface-container-lowest p-8 rounded-xl transition-all duration-500 hover:shadow-[0px_20px_40px_rgba(45,51,56,0.04)]">
                <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-6 sm:space-y-0 sm:space-x-8">
                  <div className="relative group shrink-0">
                    <div className="w-24 h-24 rounded-full overflow-hidden bg-surface-container-high ring-1 ring-outline-variant/10">
                      <img alt="profile portrait" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAcwlgegq37ampBkhRhKJyQPuMljzw4TXsK0bN4t9ZNt6lYpurDlX15gwA86qIYsc4f1YRuG7hjcI-6SNtZz0VVReuq8VTpwrA8fDHqeCX8TNwdUXfakj6Yfx2n8FBWdd9Dg9x1Sp1gfzB6uRf4-BkemPS4Ukj_JKA3duzeAZPdg49MLxKGDXLWJNoX8zlEZHkXkX8Nnn-Ecds27uP9UCF8mF2hQkDNHFGgfb2zTTLDjWHxUWe2ehhI85wdjAaME0bc0o60ids3s_Yc" />
                    </div>
                    <button className="absolute bottom-0 right-0 w-8 h-8 bg-white dark:bg-zinc-800 rounded-full shadow-lg border border-surface-container flex items-center justify-center text-outline-variant hover:text-secondary transition-colors">
                      <span className="material-symbols-outlined text-[16px]">edit</span>
                    </button>
                  </div>
                  <div>
                    <h3 className="text-2xl font-light text-on-surface tracking-tight">Alex Carter</h3>
                    <p className="text-sm text-outline font-normal mt-1">alex.carter@gallery.io</p>
                    <div className="mt-4 flex space-x-4">
                      <button className="text-[10px] uppercase tracking-widest font-bold text-secondary hover:opacity-70 transition-opacity">Change Photo</button>
                      <button className="text-[10px] uppercase tracking-widest font-bold text-outline hover:text-on-surface transition-colors">Remove</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-span-12 py-8">
              <div className="h-px bg-outline-variant/10 w-full"></div>
            </div>

            {/* Section: Preferences */}
            <div className="col-span-12 lg:col-span-4">
              <h2 className="text-xs uppercase tracking-[0.15em] text-outline-variant font-semibold mb-6">Preferences</h2>
              <p className="text-sm text-on-surface-variant leading-relaxed">Customize the visual and haptic rhythm of your workspace.</p>
            </div>
            <div className="col-span-12 lg:col-span-8 space-y-4">
              <div className="group bg-surface-container-lowest p-8 rounded-xl transition-all duration-500 hover:shadow-[0px_20px_40px_rgba(45,51,56,0.04)]">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-medium mb-1">Visual Theme</h3>
                    <p className="text-sm text-outline">Adjust the interface luminosity.</p>
                  </div>
                  <div className="flex bg-surface-container-low p-1 rounded-full w-full sm:w-auto">
                    <button className="flex-1 sm:flex-none px-5 py-1.5 rounded-full text-xs font-medium bg-white text-secondary shadow-sm transition-all">Alabaster</button>
                    <button className="flex-1 sm:flex-none px-5 py-1.5 rounded-full text-xs font-medium text-outline hover:text-on-surface transition-all">Ink</button>
                    <button className="flex-1 sm:flex-none px-5 py-1.5 rounded-full text-xs font-medium text-outline hover:text-on-surface transition-all">Auto</button>
                  </div>
                </div>
              </div>

              <div className="group bg-surface-container-lowest p-8 rounded-xl transition-all duration-500 hover:shadow-[0px_20px_40px_rgba(45,51,56,0.04)]">
                <div className="flex items-center justify-between">
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 rounded-full bg-secondary-container/30 flex items-center justify-center text-secondary">
                      <span className="material-symbols-outlined">notifications_active</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium mb-1">Smart Notifications</h3>
                      <p className="text-sm text-outline">Bundled summaries to preserve focus.</p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" defaultChecked className="sr-only peer" />
                    <div className="w-11 h-6 bg-surface-container-high peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-secondary"></div>
                  </label>
                </div>
              </div>
            </div>

            <div className="col-span-12 py-8">
              <div className="h-px bg-outline-variant/10 w-full"></div>
            </div>

            {/* Section: Login Credentials */}
            <div className="col-span-12 lg:col-span-4">
              <h2 className="text-xs uppercase tracking-[0.15em] text-outline-variant font-semibold mb-6">Login Credentials</h2>
              <p className="text-sm text-on-surface-variant leading-relaxed">Secure access methods for your editorial portal.</p>
            </div>
            <div className="col-span-12 lg:col-span-8 space-y-4">
              <div className="bg-surface-container-lowest p-8 rounded-xl flex items-center justify-between group cursor-pointer transition-all duration-500 hover:shadow-[0px_20px_40px_rgba(45,51,56,0.04)]">
                <div className="flex items-center space-x-6">
                  <span className="material-symbols-outlined text-outline">mail_outline</span>
                  <div>
                    <h3 className="text-sm font-semibold text-on-surface">Email Address</h3>
                    <p className="text-xs text-outline mt-1">alex.carter@gallery.io</p>
                  </div>
                </div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-secondary opacity-0 group-hover:opacity-100 transition-opacity">Update</span>
              </div>
              <div className="bg-surface-container-lowest p-8 rounded-xl flex items-center justify-between group cursor-pointer transition-all duration-500 hover:shadow-[0px_20px_40px_rgba(45,51,56,0.04)]">
                <div className="flex items-center space-x-6">
                  <span className="material-symbols-outlined text-outline">lock_open</span>
                  <div>
                    <h3 className="text-sm font-semibold text-on-surface">Password</h3>
                    <p className="text-xs text-outline mt-1">Last changed 4 months ago</p>
                  </div>
                </div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-secondary opacity-0 group-hover:opacity-100 transition-opacity">Reset</span>
              </div>
            </div>

            <div className="col-span-12 py-8">
              <div className="h-px bg-outline-variant/10 w-full"></div>
            </div>

            {/* Section: Account Security */}
            <div className="col-span-12 lg:col-span-4">
              <h2 className="text-xs uppercase tracking-[0.15em] text-outline-variant font-semibold mb-6">Account Security</h2>
              <p className="text-sm text-on-surface-variant leading-relaxed">Encryption and access protocols for your private data.</p>
            </div>
            <div className="col-span-12 lg:col-span-8 space-y-4">
              <div className="bg-surface-container-lowest p-8 rounded-xl flex items-center justify-between group cursor-pointer transition-all duration-500 hover:shadow-[0px_20px_40px_rgba(45,51,56,0.04)]">
                <div className="flex items-center space-x-6">
                  <span className="material-symbols-outlined text-outline">key</span>
                  <div>
                    <h3 className="text-sm font-semibold text-on-surface">Biometric Authentication</h3>
                    <p className="text-xs text-outline mt-1">FaceID or Fingerprint enabled</p>
                  </div>
                </div>
                <span className="material-symbols-outlined text-outline-variant group-hover:translate-x-1 transition-transform">chevron_right</span>
              </div>
              <div className="bg-surface-container-lowest p-8 rounded-xl flex items-center justify-between group cursor-pointer transition-all duration-500 hover:shadow-[0px_20px_40px_rgba(45,51,56,0.04)]">
                <div className="flex items-center space-x-6">
                  <span className="material-symbols-outlined text-outline">devices</span>
                  <div>
                    <h3 className="text-sm font-semibold text-on-surface">Active Sessions</h3>
                    <p className="text-xs text-outline mt-1">3 devices currently connected</p>
                  </div>
                </div>
                <span className="material-symbols-outlined text-outline-variant group-hover:translate-x-1 transition-transform">chevron_right</span>
              </div>
            </div>
          </div>

          {/* Footer Quote Section */}
          <footer className="mt-32 pb-12 text-center">
            <div className="max-w-xl mx-auto">
              <p className="text-2xl font-light italic text-on-surface/20 leading-relaxed mb-6">
                "Simplicity is the ultimate sophistication."
              </p>
              <div className="w-12 h-px bg-outline-variant/20 mx-auto mb-6"></div>
              <p className="text-[10px] uppercase tracking-[0.4em] text-outline-variant">Editorial Version 2.4.0</p>
            </div>
          </footer>
        </div>
      </main>
    </>
  );
}
