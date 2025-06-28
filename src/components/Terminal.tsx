import { Project } from "@/types";

interface TerminalProps {
  username: string;
  projects: Project[];
}

export default function Terminal({ username, projects }: TerminalProps) {
  return (
    <div className="min-h-96 lg:h-full border border-orange-500 p-4 crt-curve font-vt323">
      <div className="text-orange-500 mb-4">
        <span className="text-orange-400 text-glow text-lg lg:text-2xl">{username}</span>
        <span className="text-orange-500 text-glow text-lg lg:text-2xl">:</span>
        <span className="text-orange-400 text-glow text-lg lg:text-2xl">~</span>
        <span className="text-orange-500 text-glow text-lg lg:text-2xl">$</span>
        <span className="text-orange-400 ml-2 text-glow text-lg lg:text-2xl">tree projects/</span>
      </div>
      
      <div className="text-orange-400 font-vt323">
        <div className="mb-2 text-glow text-lg lg:text-2xl">projects/</div>
        <div className="ml-4 space-y-1">
          {projects.map((project) => (
            <div key={project.name} className="group cursor-pointer hover:text-orange-300 transition-colors duration-200 retro-hover">
              <div className="flex items-center space-x-2">
                <span className="text-orange-500 text-glow text-lg lg:text-2xl">├──</span>
                <span className="text-orange-400 text-glow text-lg lg:text-2xl">{project.name}/</span>
                <span className="text-orange-500 opacity-0 group-hover:opacity-100 transition-opacity text-glow text-base lg:text-lg">
                  {project.description}
                </span>
              </div>
              <div className="ml-4 text-orange-500 text-glow text-base lg:text-lg">
                {project.path}
              </div>
            </div>
          ))}
          <div className="text-orange-500 text-glow text-lg lg:text-2xl">└──</div>
        </div>
      </div>

      <div className="mt-4 text-orange-500">
        <span className="text-orange-400 text-glow text-lg lg:text-2xl">{username}</span>
        <span className="text-orange-500 text-glow text-lg lg:text-2xl">:</span>
        <span className="text-orange-400 text-glow text-lg lg:text-2xl">~</span>
        <span className="text-orange-500 text-glow text-lg lg:text-2xl">$</span>
        <span className="text-orange-400 ml-2 cursor-blink text-glow text-lg lg:text-2xl">_</span>
      </div>
    </div>
  );
} 