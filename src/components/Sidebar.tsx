'use client';

import dynamic from "next/dynamic";
import InfoPanel from "./InfoPanel";
const GlobeWidget = dynamic(() => import("./GlobeWidget"), { ssr: false });

export default function Sidebar() {
  return (
    <div className="hidden lg:block lg:col-span-3 lg:h-[calc(100vh-1.5rem)] font-vt323 flex flex-col">
      <div className="lg:h-full lg:overflow-y-auto">
        <div className="space-y-3">
          {/* globe widget */}
          <div className="border border-orange-500 p-3 crt-curve relative flex flex-col gap-2 aspect-square lg:max-h-none">
            <div className="flex-1 min-h-24">
              <GlobeWidget />
            </div>
          </div>

          <InfoPanel isMobile={false} />
        </div>
      </div>
    </div>
  );
} 