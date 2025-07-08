"use client";


import { useState } from "react";

interface TerminalProps {
  username: string;
}

type TabType = "welcome" | "about" | "links";

export default function Terminal({}: TerminalProps) {
  const [activeTab, setActiveTab] = useState<TabType>("welcome");


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

  {/* ABOUT TAB */}
  const renderAboutContent = () => (
    <>
      <div className="text-primary-500 mb-4">
        <span className="text-primary-400 text-glow text-lg lg:text-2xl">[TERM-1] IAN :: TYPE ABOUT.TXT</span>
      </div>
      
      <div className="text-primary-400 font-vt323 space-y-2 max-w-[800px]">
        <div className="text-glow text-lg lg:text-2xl">IAN SHAPIRO :: DEVELOPER</div>
        <div className="text-glow text-lg lg:text-2xl">{'>>'} creator of niche things that serve no real purpose</div>
        <div className="text-glow text-lg lg:text-2xl">{'>>'} rapid prototyping with AI tools because why not</div>
        <div className="text-glow text-lg lg:text-2xl">{'>>'} CS grad, Cybersec minor, CTF enjoyer</div>
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
            href="https://github.com/romii0x" 
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
            href="https://romii0x.itch.io/" 
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