'use client';

import { useEffect, useState } from 'react';
import { fetchCodeMetrics } from '@/app/actions';
import { CodeMetrics as CodeMetricsType } from '@/lib/github';

interface LanguagesProps {
  isMobile?: boolean;
}

function TerminalLanguageChart({ data }: { data: Array<{ language: string; percentage: number }> }) {
  return (
    <div className="space-y-2">
      <div className="space-y-1">
        {data.slice(0, 5).map((item) => {
          const barWidth = Math.max(5, (item.percentage / Math.max(...data.map(d => d.percentage))) * 50);
          
          return (
            <div key={item.language} className="flex items-center space-x-2 text-lg">
              <span className="text-primary-400 text-glow w-8 text-right">
                {Math.round(item.percentage)}%
              </span>
              <div className="flex-1 relative">
                <div className="h-3 bg-black">
                  <div 
                    className="h-full bg-primary-500 transition-all duration-1000 ease-out relative overflow-hidden chart-glow"
                    style={{ 
                      width: `${barWidth}%`
                    }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary-300 to-transparent opacity-30 animate-pulse"></div>
                  </div>
                </div>
              </div>
              <span className="text-primary-400 text-glow w-20 truncate text-right">
                {item.language}
              </span>
            </div>
          );
        })}
      </div>
      

    </div>
  );
}

export default function Languages({ isMobile = false }: LanguagesProps) {
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

  const renderLanguages = () => {
    if (!metrics?.languages) return null;
    
    return <TerminalLanguageChart data={metrics.languages} />;
  };

  return (
    <div className={`space-y-3 ${isMobile ? 'lg:hidden' : 'hidden lg:block'}`}>
      <div className="border-t border-b border-primary-500 p-3 flex flex-col gap-3">
        <div className={`text-primary-500 text-glow ${isMobile ? 'text-lg' : 'text-2xl'}`}>
          TOP LANGUAGES
        </div>
        
        <div className="text-primary-400 text-lg -ml-3">
          {loading ? (
            <div className="text-glow">Loading languages...</div>
          ) : error ? (
            <div className="text-red-400 text-glow">Error: {error}</div>
          ) : metrics ? (
            renderLanguages()
          ) : (
            <div className="text-glow">No language data found</div>
          )}
        </div>
      </div>
    </div>
  );
} 