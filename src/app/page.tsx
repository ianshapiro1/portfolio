import Sidebar from "@/components/Sidebar";
import InfoPanel from "@/components/InfoPanel";
import Terminal from "@/components/Terminal";
import { Project } from "@/types";

export default function Home() {
  const projects: Project[] = [
    {
      name: "shoutbin",
      description: "Privacy pastebin app",
      path: "~/projects/shoutbin"
    },
    {
      name: "cursetype",
      description: "TUI typing game",
      path: "~/projects/cursetype"
    },
    {
      name: "oscv",
      description: "Linux terminal oscilloscope visualizer",
      path: "~/projects/oscv"
    }
  ];

  return (
    <div className="min-h-screen bg-black text-orange-500 font-vt323 p-3 crt-noise">
      {/* DESKTOP LAYOUT */}
      <div className="hidden lg:grid lg:grid-cols-12 lg:gap-3 lg:h-[calc(100vh-1.5rem)]">
        <Sidebar />
        <div className="lg:col-span-9">
          <Terminal 
            username="ian@portfolio"
            projects={projects}
          />
        </div>
      </div>

      {/* MOBILE LAYOUT */}
      <div className="lg:hidden space-y-3">
        <Terminal 
          username="ian@portfolio"
          projects={projects}
        />
        <InfoPanel isMobile={true} />
      </div>
    </div>
  );
}
