"use client";

import { Project } from "@/types";
import { useState } from "react";

interface TerminalProps {
  username: string;
}

type TabType = "welcome" | "projects" | "about" | "links";

export default function Terminal({ username }: TerminalProps) {
  const [activeTab, setActiveTab] = useState<TabType>("welcome");

  const projects: Project[] = [
    {
      name: "shoutbin",
      description: "Privacy pastebin app",
      path: "~/projects/shoutbin",
      link: "https://github.com/ianshapiro1/shoutbin"
    },
    {
      name: "cursetype",
      description: "TUI typing game",
      path: "~/projects/cursetype",
      link: "https://github.com/ianshapiro1/cursetype"
    },
    {
      name: "oscv",
      description: "Linux terminal oscilloscope visualizer",
      path: "~/projects/oscv",
      link: "https://github.com/ianshapiro1/oscv"
    }
  ];

  {/* WELCOME TAB */}
  const renderWelcomeContent = () => (
    <>
      <div className="text-primary-500 mb-4">
        <span className="text-primary-400 text-glow text-lg lg:text-2xl">[TERM-1] IAN :: TYPE WELCOME.TXT</span>
      </div>
      
      <div className="text-primary-400 font-vt323 text-center">
        <pre className="text-glow text-[10px] lg:text-base leading-tight">
{`
   ____            ______             _        
  /  _/__ ____    / __/ /  ___ ____  (_)______ 
 _/ // _ \`/ _ \\  _\\ \\/ _ \\/ _ \`/ _ \\/ / __/ _ \\
/___/\\_,_/_//_/ /___/_//_/\\_,_/ .__/_/_/  \\___/
                             /_/               
`}
        </pre>
        <div className="mt-6 text-primary-400 text-glow text-lg lg:text-xl">
          <div className="mb-2">:: PORTFOLIO v1.0 ::</div>
          <div className="text-sm lg:text-base opacity-80">Select a tab to begin exploring...</div>
        </div>
      </div>
    </>
  );

  {/* PROJECTS TAB */}
  const renderProjectsContent = () => (
    <>
      <div className="text-primary-500 mb-4">
        <span className="text-primary-400 text-glow text-lg lg:text-2xl">[TERM-1] IAN :: TREE PROJECTS/</span>
      </div>
      
      <div className="text-primary-400 font-vt323">
        <div className="mb-2 text-glow text-lg lg:text-2xl">projects/</div>
        <div className="ml-4 space-y-1">
          {projects.map((project) => (
            project.link ? (
              <a 
                key={project.name}
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block group cursor-pointer retro-hover"
              >
                <div className="flex items-center space-x-2">
                  <span className="text-primary-500 text-glow text-lg lg:text-2xl">├──</span>
                  <span className="text-primary-400 text-glow text-lg lg:text-2xl group-hover:text-primary-300 text-glow-more">{project.name}/</span>
                  <span className="text-primary-500 opacity-0 group-hover:opacity-100 transition-opacity text-glow text-base lg:text-lg">
                    {project.description}
                  </span>
                </div>
                <div className="ml-4 text-primary-500 text-glow text-base lg:text-lg">
                  {project.path}
                </div>
              </a>
            ) : (
              <div key={project.name} className="group cursor-pointer retro-hover">
                <div className="flex items-center space-x-2">
                  <span className="text-primary-500 text-glow text-lg lg:text-2xl">├──</span>
                  <span className="text-primary-400 text-glow text-lg lg:text-2xl group-hover:text-primary-300 text-glow-more">{project.name}/</span>
                  <span className="text-primary-500 opacity-0 group-hover:opacity-100 transition-opacity text-glow text-base lg:text-lg">
                    {project.description}
                  </span>
                </div>
                <div className="ml-4 text-primary-500 text-glow text-base lg:text-2xl">
                  {project.path}
                </div>
              </div>
            )
          ))}
          <div className="text-primary-500 text-glow text-lg lg:text-2xl">└──</div>
        </div>
      </div>
    </>
  );

  {/* ABOUT TAB */}
  const renderAboutContent = () => (
    <>
      <div className="text-primary-500 mb-4">
        <span className="text-primary-400 text-glow text-lg lg:text-2xl">[TERM-1] IAN :: TYPE ABOUT.TXT</span>
      </div>
      
      <div className="text-primary-400 font-vt323 space-y-2 max-w-[800px]">
        <div className="text-glow text-lg lg:text-2xl">IAN SHAPIRO :: full stack dev & security engineer </div>
        <div className="text-glow text-lg lg:text-2xl">{'>>'} builds niche, (sometimes) clever tools for fun and focus</div>
        <div className="text-glow text-lg lg:text-2xl">{'>>'} passionate about terminals, security, and data processing</div>
        <div className="text-glow text-lg lg:text-2xl">{'>>'} fluent in JS, TS, Python, Linux, and Docker</div>
        <div className="text-glow text-lg lg:text-2xl">{'>>'} CS major, Cybersecurity minor, <a href="https://www.credly.com/badges/aef2592b-05c4-4927-8218-7664abca7120/public_url" target="_blank" rel="noopener noreferrer" className="underline text-primary-400 hover:text-primary-300 transition-colors duration-200 text-glow-more">AWS certified</a></div>  
      </div>
    </>
  );

  {/* LINKS TAB */}
  const renderLinksContent = () => (
    <>
      <div className="text-primary-500 mb-4">
        <span className="text-primary-400 text-glow text-lg lg:text-2xl">[TERM-1] IAN :: TYPE LINKS.TXT</span>
      </div>
      
      <div className="text-primary-400 font-vt323 space-y-2">
        <div className="text-glow text-lg lg:text-2xl retro-hover">
          <a 
            href="https://github.com/ianshapiro1" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="block text-primary-400 hover:text-primary-300 transition-colors duration-200"
          >
            <span className="text-primary-500">{'>>'}</span> <span className="text-glow-more">GitHub</span>
          </a>
        </div>
        <div className="text-glow text-lg lg:text-2xl retro-hover">
          <a 
            href="https://www.linkedin.com/in/ian-shapiro-dev/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="block text-primary-400 hover:text-primary-300 transition-colors duration-200"
          >
            <span className="text-primary-500">{'>>'}</span> <span className="text-glow-more">LinkedIn</span>
          </a>
        </div>
        <div className="text-glow text-lg lg:text-2xl retro-hover">
          <a 
            href="mailto:ianshapiro1@gmail.com" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="block text-primary-400 hover:text-primary-300 transition-colors duration-200"
          >
            <span className="text-primary-500">{'>>'}</span> <span className="text-glow-more">Email</span>
          </a>
        </div>
        <div className="text-glow text-lg lg:text-2xl retro-hover">
          <a 
            href="https://sultai.itch.io/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="block text-primary-400 hover:text-primary-300 transition-colors duration-200"
          >
            <span className="text-primary-500">{'>>'}</span> <span className="text-glow-more">itch.io</span>
          </a>
        </div>
      </div>
    </>
  );

  {/* TERMINAL */}
  return (
    <div className="lg:h-full font-vt323 flex flex-col min-h-0 border border-primary-500">
      {/* top tabs */}
      <div className="bg-black border-b border-primary-500">
        <div className="flex">
          <button
            onClick={() => setActiveTab("welcome")}
            className={`flex-1 px-3 py-1 text-base lg:text-lg transition-colors duration-200 border-r border-primary-500 ${
              activeTab === "welcome"
                ? "text-primary-400 text-glow border-primary-400"
                : "text-primary-500 hover:text-primary-300 text-glow text-glow-more"
            }`}
            style={activeTab === "welcome" ? { backgroundColor: 'var(--color-tab-active-bg)' } : {}}
          >
            WELCOME
          </button>
          <button
            onClick={() => setActiveTab("projects")}
            className={`flex-1 px-3 py-1 text-base lg:text-lg transition-colors duration-200 border-r border-primary-500 ${
              activeTab === "projects"
                ? "text-primary-400 text-glow border-primary-400"
                : "text-primary-500 hover:text-primary-300 text-glow text-glow-more"
            }`}
            style={activeTab === "projects" ? { backgroundColor: 'var(--color-tab-active-bg)' } : {}}
          >
            PROJECTS
          </button>
          <button
            onClick={() => setActiveTab("about")}
            className={`flex-1 px-3 py-1 text-base lg:text-lg transition-colors duration-200 border-r border-primary-500 ${
              activeTab === "about"
                ? "text-primary-400 text-glow border-primary-400"
                : "text-primary-500 hover:text-primary-300 text-glow text-glow-more"
            }`}
            style={activeTab === "about" ? { backgroundColor: 'var(--color-tab-active-bg)' } : {}}
          >
            ABOUT
          </button>
          <button
            onClick={() => setActiveTab("links")}
            className={`flex-1 px-3 py-1 text-base lg:text-lg transition-colors duration-200 ${
              activeTab === "links"
                ? "text-primary-400 text-glow border-primary-400"
                : "text-primary-500 hover:text-primary-300 text-glow text-glow-more"
            }`}
            style={activeTab === "links" ? { backgroundColor: 'var(--color-tab-active-bg)' } : {}}
          >
            LINKS
          </button>
        </div>
      </div>

      {/* body */}
      <div className="p-3 h-full overflow-y-auto min-h-0">
        {activeTab === "welcome" && renderWelcomeContent()}
        {activeTab === "projects" && renderProjectsContent()}
        {activeTab === "about" && renderAboutContent()}
        {activeTab === "links" && renderLinksContent()}

        <div className="mt-4 text-primary-500">
          <span className="text-primary-400 text-glow text-lg lg:text-2xl">[TERM-1] IAN :: </span>
          <span className="text-primary-400 cursor-blink text-glow text-lg lg:text-2xl">_</span>
        </div>
      </div>
    </div>
  );
} 