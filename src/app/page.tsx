import Sidebar from "@/components/Sidebar";
import TerminalContent from "@/components/TerminalContent";
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
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 h-[calc(100vh-1.5rem)]">
        <div className="order-2 lg:order-1 lg:col-span-3">
          <Sidebar />
        </div>
        <div className="order-1 lg:order-2 lg:col-span-9">
          <TerminalContent 
            username="ian@portfolio"
            projects={projects}
          />
        </div>
      </div>
    </div>
  );
}
