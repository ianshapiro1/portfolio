'use client';

import dynamic from "next/dynamic";
const GlobeWidget = dynamic(() => import("./GlobeWidget"), { ssr: false });

export default function Sidebar() {
  return (
    <div className="lg:col-span-3 lg:h-[calc(100vh-1.5rem)] font-vt323 flex flex-col">
      {/* MOBILE LAYOUT */}
      <div className="lg:hidden space-y-3">
        {/* important links */}
        <div className="border border-orange-500 p-3 crt-curve flex flex-col gap-2">
          <div className="text-orange-500 text-glow text-lg">IMPORTANT LINKS</div>
          <div className="space-y-1">
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-orange-400 hover:text-orange-300 underline text-glow transition-colors duration-200 retro-hover text-base block"
            >
              GitHub
            </a>
            <a 
              href="https://itch.io" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-orange-400 hover:text-orange-300 underline text-glow transition-colors duration-200 retro-hover text-base block"
            >
              itch.io
            </a>
          </div>
        </div>

        {/* globe widget */}
        <div className="border border-orange-500 p-3 crt-curve relative flex flex-col gap-2 aspect-square">
          <div className="flex-1">
            <GlobeWidget />
          </div>
        </div>

        {/* latest git commit */}
        <div className="border border-orange-500 p-3 crt-curve flex flex-col gap-2">
          <div className="text-orange-500 text-glow text-lg">LATEST COMMIT</div>
          <div className="text-orange-400 text-base">
            <div className="text-glow">create portfolio website</div>
            <div className="text-orange-500 text-glow">19c4ffd</div>
            <div className="text-glow">2 hours ago</div>
          </div>
        </div>
      </div>

      {/* DESKTOP LAYOUT */}
      <div className="hidden lg:block lg:h-full lg:overflow-y-auto">
        <div className="space-y-3">
          {/* globe widget */}
          <div className="border border-orange-500 p-3 crt-curve relative flex flex-col gap-2 aspect-square lg:max-h-none">
            <div className="flex-1 min-h-24">
              <GlobeWidget />
            </div>
          </div>

          {/* important links */}
          <div className="border border-orange-500 p-3 crt-curve flex flex-col gap-2">
            <div className="text-orange-500 text-glow text-2xl">IMPORTANT LINKS</div>
            <div className="space-y-1">
              <a 
                href="https://github.com/ianshapiro1" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-orange-400 hover:text-orange-300 underline text-glow transition-colors duration-200 retro-hover text-lg block"
              >
                GitHub
              </a>
              <a 
                href="https://sultai.itch.io/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-orange-400 hover:text-orange-300 underline text-glow transition-colors duration-200 retro-hover text-lg block"
              >
                itch.io
              </a>
            </div>
          </div>

          {/* latest git commit */}
          <div className="border border-orange-500 p-3 crt-curve flex flex-col gap-2">
            <div className="text-orange-500 text-glow text-2xl">LATEST COMMIT</div>
            <div className="text-orange-400 text-lg">
              <div className="text-glow">create portfolio website</div>
              <div className="text-orange-500 text-glow">19c4ffd</div>
              <div className="text-glow">2 hours ago</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 