'use client';

import dynamic from "next/dynamic";
import LatestCommit from "./LatestCommit";
const GlobeWidget = dynamic(() => import("./GlobeWidget"), { ssr: false });

export default function Sidebar() {
  return (
    <div className="h-full font-vt323 flex flex-col min-h-0">
      <div className="h-full overflow-y-auto min-h-0 pointer-events-none">
        <div className="space-y-3 pointer-events-auto">
          {/* globe widget */}
          <div className="border-t border-b border-orange-500 relative flex flex-col gap-2 aspect-square lg:max-h-none">
            <div className="flex-1 min-h-24">
              <GlobeWidget />
            </div>
          </div>

          <LatestCommit isMobile={false} />
        </div>
      </div>
    </div>
  );
} 