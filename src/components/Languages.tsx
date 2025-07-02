'use client';

import { useEffect, useState } from 'react';
import { fetchCodeMetrics } from '@/app/actions';
import { CodeMetrics as CodeMetricsType } from '@/lib/github';

interface LanguagesProps {
  isMobile?: boolean;
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
    
    return (
      <div className="space-y-2">
        {metrics.languages.slice(0, 6).map((lang) => (
          <div key={lang.language} className="flex items-center justify-between text-lg">
            <span className="text-primary-400 text-glow">{lang.language}</span>
            <div className="flex items-center space-x-2">
              <div className="w-16 border border-gray-700 h-2 rounded-sm overflow-hidden">
                <div 
                  className="h-full bg-primary-500 transition-all duration-1000 ease-out"
                  style={{ width: `${lang.percentage}%` }}
                />
              </div>
                              <span className="text-primary-500 text-glow w-10 text-right">
                {Math.round(lang.percentage)}%
              </span>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className={`space-y-3 ${isMobile ? 'lg:hidden' : 'hidden lg:block'}`}>
      <div className="border-t border-b border-primary-500 p-3 flex flex-col gap-3">
        <div className={`text-primary-500 text-glow ${isMobile ? 'text-lg' : 'text-2xl'}`}>
          LANGUAGES
        </div>
        
        <div className="text-primary-400 text-lg">
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