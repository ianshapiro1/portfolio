'use client';

import { useEffect, useState } from 'react';
import { fetchLatestCommit } from '@/app/actions';
import { GitHubCommit } from '@/lib/github';

interface InfoPanelProps {
  isMobile?: boolean;
}

export default function InfoPanel({ isMobile = false }: InfoPanelProps) {
  const textSize = isMobile ? "text-lg" : "text-2xl";
  const linkSize = isMobile ? "text-base" : "text-lg";
  const commitSize = isMobile ? "text-base" : "text-lg";
  
  const [commit, setCommit] = useState<GitHubCommit | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadCommit() {
      try {
        setLoading(true);
        setError(null);
        const result = await fetchLatestCommit();
        
        if (result.success && result.data) {
          setCommit(result.data);
        } else {
          setError(result.error || 'Failed to load commit data');
        }
      } catch (err) {
        setError('Failed to load commit data');
        console.error('Error loading commit:', err);
      } finally {
        setLoading(false);
      }
    }

    loadCommit();
  }, []);

  const formatDateTime = (dateString: string): string => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    
    return `[${year}-${month}-${day} ${hours}:${minutes}:${seconds}]`;
  };

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
          {loading ? (
            <div className="text-glow">Loading...</div>
          ) : error ? (
            <div className="text-red-400 text-glow">Error: {error}</div>
          ) : commit ? (
            <>
              <div className="text-glow">
                <a 
                  href={commit.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-orange-400 hover:text-orange-300 underline text-glow transition-colors duration-200 retro-hover"
                >
                  {commit.sha}
                </a>
                <span className="text-orange-400"> ❯ </span>
                <span className="text-orange-500">{commit.repository.name}</span>
                <span className="text-orange-400"> :: </span>
                <span className="text-glow">{formatDateTime(commit.commit.author.date)}</span>
              </div>
              <div className="text-glow">{commit.commit.message}</div>
            </>
          ) : (
            <div className="text-glow">No recent commits found</div>
          )}
        </div>
      </div>
    </div>
  );
} 