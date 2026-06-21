import Header from "@/components/Header";
import SettingsDashboard from "@/components/SettingsDashboard";

export default function Settings() {
  return (
    <>
      <Header title="Settings" />
      <main className="w-full min-h-screen pt-32 pb-20 px-6 md:pl-80 md:pr-10 relative z-10">
        <SettingsDashboard />
      </main>
    </>
  );
}
