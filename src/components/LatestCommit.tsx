'use client';

import { useEffect, useState } from 'react';
import { fetchLatestCommit } from '@/app/actions';
import { GitHubCommit } from '@/lib/github';
import { formatRelativeTime } from '@/lib/utils';

interface LatestCommitProps {
  isMobile?: boolean;
}

export default function LatestCommit({ isMobile = false }: LatestCommitProps) {
  const textSize = isMobile ? "text-lg" : "text-2xl";
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



  return (
    <div className={`space-y-3 ${isMobile ? 'lg:hidden' : 'hidden lg:block'}`}>
      {/* latest git commit */}
      <div className="border-t border-b border-orange-500 p-3 flex flex-col gap-2">
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
                  className="text-orange-400 hover:text-orange-300 underline text-glow transition-colors duration-200 text-glow-more"
                >
                  {commit.sha}
                </a>
                <span className="text-orange-400"> :: </span>
                <span className="text-orange-500">{commit.repository.name}</span>
                <span className="text-glow"> [{formatRelativeTime(commit.commit.author.date)}]</span>
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