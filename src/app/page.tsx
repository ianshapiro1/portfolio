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
    <div className="h-screen bg-black text-orange-500 font-vt323 crt-noise overflow-hidden">
      {/* DESKTOP LAYOUT */}
      <div 
        className="hidden lg:flex border-orange-500 p-4 crt-curve overflow-hidden"
        style={{
          height: 'var(--desktop-container-height)',
          marginLeft: 'var(--desktop-side-margin)',
          marginRight: 'var(--desktop-side-margin)',
          marginTop: 'var(--desktop-top-bottom-margin)',
          marginBottom: 'var(--desktop-top-bottom-margin)',
          borderWidth: 'var(--desktop-border-width)'
        }}
      >
        <div className="h-full grid grid-cols-12 gap-3 flex-1 min-h-0">
          <div className="col-span-3 min-h-0">
            <Sidebar />
          </div>
          <div className="col-span-9 min-h-0">
            <Terminal 
              username="ian@portfolio"
              projects={projects}
            />
          </div>
        </div>
      </div>

      {/* MOBILE LAYOUT */}
      <div className="lg:hidden h-full overflow-y-auto p-3">
        <div className="space-y-3">
          <Terminal 
            username="ian@portfolio"
            projects={projects}
          />
          <InfoPanel isMobile={true} />
        </div>
      </div>
    </div>
  );
}
