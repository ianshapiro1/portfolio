'use client';

import Languages from "./Languages";

export default function RightBar() {
  return (
    <div className="h-full font-vt323 flex flex-col min-h-0">
      <div className="h-full overflow-y-auto min-h-0 pointer-events-none">
        <div className="space-y-3 pointer-events-auto">
          <Languages isMobile={false} />
        </div>
      </div>
    </div>
  );
} 