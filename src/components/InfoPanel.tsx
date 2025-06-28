interface InfoPanelProps {
  isMobile?: boolean;
}

export default function InfoPanel({ isMobile = false }: InfoPanelProps) {
  const textSize = isMobile ? "text-lg" : "text-2xl";
  const linkSize = isMobile ? "text-base" : "text-lg";
  const commitSize = isMobile ? "text-base" : "text-lg";

  return (
    <div className={`space-y-3 ${isMobile ? 'lg:hidden' : 'hidden lg:block'}`}>
      {/* important links */}
      <div className="border border-orange-500 p-3 crt-curve flex flex-col gap-2">
        <div className={`text-orange-500 text-glow ${textSize}`}>IMPORTANT LINKS</div>
        <div className="space-y-1">
          <a 
            href="https://github.com/ianshapiro1" 
            target="_blank" 
            rel="noopener noreferrer" 
            className={`text-orange-400 hover:text-orange-300 underline text-glow transition-colors duration-200 retro-hover ${linkSize} block`}
          >
            GitHub
          </a>
          <a 
            href="https://sultai.itch.io/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className={`text-orange-400 hover:text-orange-300 underline text-glow transition-colors duration-200 retro-hover ${linkSize} block`}
          >
            itch.io
          </a>
        </div>
      </div>

      {/* latest git commit */}
      <div className="border border-orange-500 p-3 crt-curve flex flex-col gap-2">
        <div className={`text-orange-500 text-glow ${textSize}`}>LATEST COMMIT</div>
        <div className={`text-orange-400 ${commitSize}`}>
          <div className="text-glow">create portfolio website</div>
          <div className="text-orange-500 text-glow">19c4ffd</div>
          <div className="text-glow">2 hours ago</div>
        </div>
      </div>
    </div>
  );
} 