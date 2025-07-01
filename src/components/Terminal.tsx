"use client";

import { Project } from "@/types";
import { useState } from "react";

interface TerminalProps {
  username: string;
}

type TabType = "projects" | "about" | "links";

export default function Terminal({ username }: TerminalProps) {
  const [activeTab, setActiveTab] = useState<TabType>("projects");

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

  {/* PROJECTS TAB */}
  const renderProjectsContent = () => (
    <>
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
            project.link ? (
              <a 
                key={project.name}
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block group cursor-pointer retro-hover"
              >
                <div className="flex items-center space-x-2">
                  <span className="text-orange-500 text-glow text-lg lg:text-2xl">├──</span>
                  <span className="text-orange-400 text-glow text-lg lg:text-2xl group-hover:text-orange-300 text-glow-more">{project.name}/</span>
                  <span className="text-orange-500 opacity-0 group-hover:opacity-100 transition-opacity text-glow text-base lg:text-lg">
                    {project.description}
                  </span>
                </div>
                <div className="ml-4 text-orange-500 text-glow text-base lg:text-lg">
                  {project.path}
                </div>
              </a>
            ) : (
              <div key={project.name} className="group cursor-pointer retro-hover">
                <div className="flex items-center space-x-2">
                  <span className="text-orange-500 text-glow text-lg lg:text-2xl">├──</span>
                  <span className="text-orange-400 text-glow text-lg lg:text-2xl group-hover:text-orange-300 text-glow-more">{project.name}/</span>
                  <span className="text-orange-500 opacity-0 group-hover:opacity-100 transition-opacity text-glow text-base lg:text-lg">
                    {project.description}
                  </span>
                </div>
                <div className="ml-4 text-orange-500 text-glow text-base lg:text-2xl">
                  {project.path}
                </div>
              </div>
            )
          ))}
          <div className="text-orange-500 text-glow text-lg lg:text-2xl">└──</div>
        </div>
      </div>
    </>
  );

  {/* ABOUT TAB */}
  const renderAboutContent = () => (
    <>
      <div className="text-orange-500 mb-4">
        <span className="text-orange-400 text-glow text-lg lg:text-2xl">{username}</span>
        <span className="text-orange-500 text-glow text-lg lg:text-2xl">:</span>
        <span className="text-orange-400 text-glow text-lg lg:text-2xl">~</span>
        <span className="text-orange-500 text-glow text-lg lg:text-2xl">$</span>
        <span className="text-orange-400 ml-2 text-glow text-lg lg:text-2xl">cat about.txt</span>
      </div>
      
      <div className="text-orange-400 font-vt323 space-y-2 max-w-[800px]">
        <div className="text-glow text-lg lg:text-2xl">Hi! I'm Ian Shapiro, a full stack developer and security engineer.</div>
        <div className="text-glow text-lg lg:text-2xl">My love of coding started in high school, where I learned python with <a href="https://www.oreilly.com/library/view/learning-python-5th/9781449355722/" target="_blank" rel="noopener noreferrer" className="underline text-orange-400 hover:text-orange-300 transition-colors duration-200 text-glow-more">this book.</a></div>
        <div className="text-glow text-lg lg:text-2xl">I graduated from the University of Memphis in 2025 with a degree in Computer Science and a minor in Cybersecurity.</div> 
        <div className="text-glow text-lg lg:text-2xl">My job throughout college was at a website maintenance company, migrating and securing legacy websites and databases.</div> 
        <div className="text-glow text-lg lg:text-2xl">My recent studies include <a href="https://www.credly.com/badges/aef2592b-05c4-4927-8218-7664abca7120/public_url" target="_blank" rel="noopener noreferrer" className="underline text-orange-400 hover:text-orange-300 transition-colors duration-200 text-glow-more">AWS</a>, AI architectures, and web security.</div>
      </div>
    </>
  );

  {/* LINKS TAB */}
  const renderLinksContent = () => (
    <>
      <div className="text-orange-500 mb-4">
        <span className="text-orange-400 text-glow text-lg lg:text-2xl">{username}</span>
        <span className="text-orange-500 text-glow text-lg lg:text-2xl">:</span>
        <span className="text-orange-400 text-glow text-lg lg:text-2xl">~</span>
        <span className="text-orange-500 text-glow text-lg lg:text-2xl">$</span>
        <span className="text-orange-400 ml-2 text-glow text-lg lg:text-2xl">cat links.txt</span>
      </div>
      
      <div className="text-orange-400 font-vt323 space-y-2">
        <div className="text-glow text-lg lg:text-2xl retro-hover">
          <a 
            href="https://github.com/ianshapiro1" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="block text-orange-400 hover:text-orange-300 transition-colors duration-200"
          >
            <span className="text-orange-500">❯</span> <span className="text-glow-more">GitHub</span>
          </a>
        </div>
        <div className="text-glow text-lg lg:text-2xl retro-hover">
          <a 
            href="https://sultai.itch.io/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="block text-orange-400 hover:text-orange-300 transition-colors duration-200"
          >
            <span className="text-orange-500">❯</span> <span className="text-glow-more">itch.io</span>
          </a>
        </div>
        <div className="text-glow text-lg lg:text-2xl retro-hover">
          <a 
            href="https://www.linkedin.com/in/ian-shapiro-dev/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="block text-orange-400 hover:text-orange-300 transition-colors duration-200"
          >
            <span className="text-orange-500">❯</span> <span className="text-glow-more">LinkedIn</span>
          </a>
        </div>
      </div>
    </>
  );

  {/* TERMINAL */}
  return (
    <div className="lg:h-full font-vt323 flex flex-col min-h-0 border border-orange-500">
      {/* top tabs */}
      <div className="bg-black border-b border-orange-500">
        <div className="flex">
          <button
            onClick={() => setActiveTab("projects")}
            className={`flex-1 px-3 py-1 text-base lg:text-lg transition-colors duration-200 border-r border-orange-500 ${
              activeTab === "projects"
                ? "text-orange-400 text-glow border-orange-400 bg-[rgba(255,140,0,0.1)]"
                : "text-orange-500 hover:text-orange-300 text-glow text-glow-more"
            }`}
          >
            projects
          </button>
          <button
            onClick={() => setActiveTab("about")}
            className={`flex-1 px-3 py-1 text-base lg:text-lg transition-colors duration-200 border-r border-orange-500 ${
              activeTab === "about"
                ? "text-orange-400 text-glow border-orange-400 bg-[rgba(255,140,0,0.1)]"
                : "text-orange-500 hover:text-orange-300 text-glow text-glow-more"
            }`}
          >
            about
          </button>
          <button
            onClick={() => setActiveTab("links")}
            className={`flex-1 px-3 py-1 text-base lg:text-lg transition-colors duration-200 ${
              activeTab === "links"
                ? "text-orange-400 text-glow border-orange-400 bg-[rgba(255,140,0,0.1)]"
                : "text-orange-500 hover:text-orange-300 text-glow text-glow-more"
            }`}
          >
            links
          </button>
        </div>
      </div>

      {/* body */}
      <div className="p-3 crt-curve h-full overflow-y-auto min-h-0">
        {activeTab === "projects" && renderProjectsContent()}
        {activeTab === "about" && renderAboutContent()}
        {activeTab === "links" && renderLinksContent()}

        <div className="mt-4 text-orange-500">
          <span className="text-orange-400 text-glow text-lg lg:text-2xl">{username}</span>
          <span className="text-orange-500 text-glow text-lg lg:text-2xl">:</span>
          <span className="text-orange-400 text-glow text-lg lg:text-2xl">~</span>
          <span className="text-orange-500 text-glow text-lg lg:text-2xl">$</span>
          <span className="text-orange-400 ml-2 cursor-blink text-glow text-lg lg:text-2xl">_</span>
        </div>
      </div>
    </div>
  );
} 