'use client';

import { useEffect, useState } from 'react';
import { fetchCodeMetrics } from '@/app/actions';
import { CodeMetrics as CodeMetricsType } from '@/lib/github';

interface CodeMetricsProps {
  isMobile?: boolean;
}

export default function CodeMetrics({ isMobile = false }: CodeMetricsProps) {
  const [metrics, setMetrics] = useState<CodeMetricsType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadMetrics() {
      try {
        setLoading(true);
        setError(null);
        
        const result = await fetchCodeMetrics();
        
        if (result.success && result.data) {
          setMetrics(result.data);
        } else {
          setError(result.error || 'Failed to load metrics data');
        }
      } catch (err) {
        setError('Failed to load metrics data');
        console.error('Error loading metrics:', err);
      } finally {
        setLoading(false);
      }
    }

    loadMetrics();
  }, []);

  const renderCommitChart = () => {
    if (!metrics?.commitsOverTime) return null;
    
    const maxCommits = Math.max(...metrics.commitsOverTime.map(d => d.count));
    const chartHeight = isMobile ? 30 : 40;
    
    return (
      <div className="space-y-1">
        <div className="text-lg text-primary-400 text-glow">
          COMMITS (30 DAYS): {metrics.commitsOverTime.reduce((sum, d) => sum + d.count, 0)}
        </div>
        <div className="flex items-end space-x-0.5 h-8 lg:h-10">
          {metrics.commitsOverTime.map((day, index) => {
            const height = maxCommits > 0 ? (day.count / maxCommits) * chartHeight : 0;
            return (
              <div
                key={index}
                className="flex-1 bg-primary-500 rounded-sm transition-all duration-500"
                style={{ 
                  height: `${Math.max(height, 1)}px`,
                  boxShadow: '0 0 6px var(--color-glow-strong)'
                }}
              />
            );
          })}
        </div>
      </div>
    );
  };

  const renderStats = () => {
    if (!metrics) return null;
    
    return (
      <div className="grid grid-cols-2 gap-2 text-lg">
        <div className="flex">
          <span className="text-primary-500 text-glow">{metrics.totalCommits.toLocaleString()}</span>
          <span className="text-primary-400 text-glow ml-2"> TOTAL COMMITS</span>
        </div>
        <div className="flex">
          <span className="text-primary-500 text-glow">{metrics.totalRepos}</span>
          <span className="text-primary-400 text-glow ml-2"> REPOSITORIES</span>
        </div>
        <div className="flex">
          <span className="text-primary-500 text-glow">{metrics.languages.length}</span>
          <span className="text-primary-400 text-glow ml-2"> LANGUAGES</span>
        </div>
        <div className="flex">
          <span className="text-primary-500 text-glow">
            {metrics.commitsOverTime.filter(d => d.count > 0).length}
          </span>
          <span className="text-primary-400 text-glow ml-2"> ACTIVE DAYS</span>
        </div>
      </div>
    );
  };

  return (
    <div className={`space-y-3 ${isMobile ? 'lg:hidden' : 'hidden lg:block'}`}>
      <div className="border-t border-b border-primary-500 p-3 flex flex-col gap-3">
        <div className={`text-primary-500 text-glow ${isMobile ? 'text-lg' : 'text-2xl'}`}>
          CODE METRICS
        </div>
        
        <div className="text-primary-400 text-sm space-y-3">
          {loading ? (
            <div className="text-glow">Loading metrics...</div>
          ) : error ? (
            <div className="text-red-400 text-glow">Error: {error}</div>
          ) : metrics ? (
            <>
              {renderStats()}
              {renderCommitChart()}
            </>
          ) : (
            <div className="text-glow">No metrics found</div>
          )}
        </div>
      </div>
    </div>
  );
} 