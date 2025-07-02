'use client';

import { useState } from 'react';

type Theme = {
  name: string;
  primary: string;
  primaryLight: string;
  primaryLighter: string;
  bgOverlay: string;
  glowLight: string;
  glowMedium: string;
  glowStrong: string;
  glowIntense: string;
  glowFull: string;
  scanVertical: string;
  scanHorizontal: string;
  crtBorder: string;
  crtShadow: string;
  crtWarpLight: string;
  crtWarpMedium: string;
  crtNoise: string;
  tabActiveBg: string;
  globePolygonSide: string;
  globePolygonCap: string;
  globePolygonStroke: string;
  globeRing: string;
};

const themes: Theme[] = [
  {
    name: 'Amber CRT',
    primary: '#ffb000',
    primaryLight: '#ffc233',
    primaryLighter: '#ffd466',
    bgOverlay: 'rgba(255, 176, 0, 0.04)',
    glowLight: 'rgba(255, 176, 0, 0.2)',
    glowMedium: 'rgba(255, 176, 0, 0.4)',
    glowStrong: 'rgba(255, 176, 0, 0.6)',
    glowIntense: 'rgba(255, 176, 0, 0.8)',
    glowFull: 'rgba(255, 176, 0, 1.0)',
    scanVertical: 'rgba(255, 176, 0, 0.03)',
    scanHorizontal: 'rgba(255, 176, 0, 0.01)',
    crtBorder: 'rgba(255, 176, 0, 0.1)',
    crtShadow: 'rgba(255, 176, 0, 0.05)',
    crtWarpLight: 'rgba(255, 176, 0, 0.01)',
    crtWarpMedium: 'rgba(255, 176, 0, 0.02)',
    crtNoise: 'rgba(255, 176, 0, 0.1)',
    tabActiveBg: 'rgba(255, 176, 0, 0.1)',
    globePolygonSide: 'rgba(255, 176, 0, 0.5)',
    globePolygonCap: 'rgba(255, 176, 0, 0.15)',
    globePolygonStroke: '#ffb000',
    globeRing: 'rgb(255, 176, 0)',
  },
  {
    name: 'Phosphor Green',
    primary: '#00ff00',
    primaryLight: '#33ff33',
    primaryLighter: '#66ff66',
    bgOverlay: 'rgba(0, 255, 0, 0.04)',
    glowLight: 'rgba(0, 255, 0, 0.2)',
    glowMedium: 'rgba(0, 255, 0, 0.4)',
    glowStrong: 'rgba(0, 255, 0, 0.6)',
    glowIntense: 'rgba(0, 255, 0, 0.8)',
    glowFull: 'rgba(0, 255, 0, 1.0)',
    scanVertical: 'rgba(0, 255, 0, 0.03)',
    scanHorizontal: 'rgba(0, 255, 0, 0.01)',
    crtBorder: 'rgba(0, 255, 0, 0.1)',
    crtShadow: 'rgba(0, 255, 0, 0.05)',
    crtWarpLight: 'rgba(0, 255, 0, 0.01)',
    crtWarpMedium: 'rgba(0, 255, 0, 0.02)',
    crtNoise: 'rgba(0, 255, 0, 0.1)',
    tabActiveBg: 'rgba(0, 255, 0, 0.1)',
    globePolygonSide: 'rgba(0, 255, 0, 0.5)',
    globePolygonCap: 'rgba(0, 255, 0, 0.15)',
    globePolygonStroke: '#00ff00',
    globeRing: 'rgb(0, 255, 0)',
  },
  {
    name: 'Monochrome',
    primary: '#ffffff',
    primaryLight: '#ffffff',
    primaryLighter: '#ffffff',
    bgOverlay: 'rgba(255, 255, 255, 0.04)',
    glowLight: 'rgba(255, 255, 255, 0.2)',
    glowMedium: 'rgba(255, 255, 255, 0.4)',
    glowStrong: 'rgba(255, 255, 255, 0.6)',
    glowIntense: 'rgba(255, 255, 255, 0.8)',
    glowFull: 'rgba(255, 255, 255, 1.0)',
    scanVertical: 'rgba(255, 255, 255, 0.03)',
    scanHorizontal: 'rgba(255, 255, 255, 0.01)',
    crtBorder: 'rgba(255, 255, 255, 0.1)',
    crtShadow: 'rgba(255, 255, 255, 0.05)',
    crtWarpLight: 'rgba(255, 255, 255, 0.01)',
    crtWarpMedium: 'rgba(255, 255, 255, 0.02)',
    crtNoise: 'rgba(255, 255, 255, 0.1)',
    tabActiveBg: 'rgba(255, 255, 255, 0.1)',
    globePolygonSide: 'rgba(255, 255, 255, 0.5)',
    globePolygonCap: 'rgba(255, 255, 255, 0.15)',
    globePolygonStroke: '#ffffff',
    globeRing: 'rgb(255, 255, 255)',
  },
  {
    name: 'Orange Orange',
    primary: '#f97316',
    primaryLight: '#fb923c',
    primaryLighter: '#fdba74',
    bgOverlay: 'rgba(249, 115, 22, 0.04)',
    glowLight: 'rgba(249, 115, 22, 0.2)',
    glowMedium: 'rgba(249, 115, 22, 0.4)',
    glowStrong: 'rgba(249, 115, 22, 0.6)',
    glowIntense: 'rgba(249, 115, 22, 0.8)',
    glowFull: 'rgba(249, 115, 22, 1.0)',
    scanVertical: 'rgba(249, 115, 22, 0.03)',
    scanHorizontal: 'rgba(249, 115, 22, 0.01)',
    crtBorder: 'rgba(249, 115, 22, 0.1)',
    crtShadow: 'rgba(249, 115, 22, 0.05)',
    crtWarpLight: 'rgba(249, 115, 22, 0.01)',
    crtWarpMedium: 'rgba(249, 115, 22, 0.02)',
    crtNoise: 'rgba(249, 115, 22, 0.1)',
    tabActiveBg: 'rgba(249, 115, 22, 0.1)',
    globePolygonSide: 'rgba(249, 115, 22, 0.5)',
    globePolygonCap: 'rgba(249, 115, 22, 0.15)',
    globePolygonStroke: '#f97316',
    globeRing: 'rgb(249, 115, 22)',
  },
  {
    name: 'Sci-Fi Blue',
    primary: '#0ea5e9',
    primaryLight: '#38bdf8',
    primaryLighter: '#7dd3fc',
    bgOverlay: 'rgba(14, 165, 233, 0.04)',
    glowLight: 'rgba(14, 165, 233, 0.2)',
    glowMedium: 'rgba(14, 165, 233, 0.4)',
    glowStrong: 'rgba(14, 165, 233, 0.6)',
    glowIntense: 'rgba(14, 165, 233, 0.8)',
    glowFull: 'rgba(14, 165, 233, 1.0)',
    scanVertical: 'rgba(14, 165, 233, 0.03)',
    scanHorizontal: 'rgba(14, 165, 233, 0.01)',
    crtBorder: 'rgba(14, 165, 233, 0.1)',
    crtShadow: 'rgba(14, 165, 233, 0.05)',
    crtWarpLight: 'rgba(14, 165, 233, 0.01)',
    crtWarpMedium: 'rgba(14, 165, 233, 0.02)',
    crtNoise: 'rgba(14, 165, 233, 0.1)',
    tabActiveBg: 'rgba(14, 165, 233, 0.1)',
    globePolygonSide: 'rgba(14, 165, 233, 0.5)',
    globePolygonCap: 'rgba(14, 165, 233, 0.15)',
    globePolygonStroke: '#0ea5e9',
    globeRing: 'rgb(14, 165, 233)',
  },
  {
    name: 'Windu Purple',
    primary: '#8b5cf6',
    primaryLight: '#a78bfa',
    primaryLighter: '#c4b5fd',
    bgOverlay: 'rgba(139, 92, 246, 0.04)',
    glowLight: 'rgba(139, 92, 246, 0.2)',
    glowMedium: 'rgba(139, 92, 246, 0.4)',
    glowStrong: 'rgba(139, 92, 246, 0.6)',
    glowIntense: 'rgba(139, 92, 246, 0.8)',
    glowFull: 'rgba(139, 92, 246, 1.0)',
    scanVertical: 'rgba(139, 92, 246, 0.03)',
    scanHorizontal: 'rgba(139, 92, 246, 0.01)',
    crtBorder: 'rgba(139, 92, 246, 0.1)',
    crtShadow: 'rgba(139, 92, 246, 0.05)',
    crtWarpLight: 'rgba(139, 92, 246, 0.01)',
    crtWarpMedium: 'rgba(139, 92, 246, 0.02)',
    crtNoise: 'rgba(139, 92, 246, 0.1)',
    tabActiveBg: 'rgba(139, 92, 246, 0.1)',
    globePolygonSide: 'rgba(139, 92, 246, 0.5)',
    globePolygonCap: 'rgba(139, 92, 246, 0.15)',
    globePolygonStroke: '#8b5cf6',
    globeRing: 'rgb(139, 92, 246)',
  },
];

export default function ThemeSelector() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentTheme, setCurrentTheme] = useState('Amber CRT');

  const applyTheme = (theme: Theme) => {
    const root = document.documentElement;
    
    root.style.setProperty('--color-primary', theme.primary);
    root.style.setProperty('--color-primary-light', theme.primaryLight);
    root.style.setProperty('--color-primary-lighter', theme.primaryLighter);
    root.style.setProperty('--color-bg-overlay', theme.bgOverlay);
    root.style.setProperty('--color-glow-light', theme.glowLight);
    root.style.setProperty('--color-glow-medium', theme.glowMedium);
    root.style.setProperty('--color-glow-strong', theme.glowStrong);
    root.style.setProperty('--color-glow-intense', theme.glowIntense);
    root.style.setProperty('--color-glow-full', theme.glowFull);
    root.style.setProperty('--color-scan-vertical', theme.scanVertical);
    root.style.setProperty('--color-scan-horizontal', theme.scanHorizontal);
    root.style.setProperty('--color-crt-border', theme.crtBorder);
    root.style.setProperty('--color-crt-shadow', theme.crtShadow);
    root.style.setProperty('--color-crt-warp-light', theme.crtWarpLight);
    root.style.setProperty('--color-crt-warp-medium', theme.crtWarpMedium);
    root.style.setProperty('--color-crt-noise', theme.crtNoise);
    root.style.setProperty('--color-tab-active-bg', theme.tabActiveBg);
    root.style.setProperty('--color-globe-polygon-side', theme.globePolygonSide);
    root.style.setProperty('--color-globe-polygon-cap', theme.globePolygonCap);
    root.style.setProperty('--color-globe-polygon-stroke', theme.globePolygonStroke);
    root.style.setProperty('--color-globe-ring', theme.globeRing);
    
    setCurrentTheme(theme.name);
    setIsOpen(false);
  };

  return (
    <div className="relative flex justify-end">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 text-primary-400 text-glow transition-colors duration-200"
      >
        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: 'var(--color-primary)' }}></div>
        <svg 
          className={`w-3 h-3 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      
      {isOpen && (
        <div className="absolute top-full right-0 mt-1 w-32 bg-black border border-primary-500 z-50">
          {themes.map((theme) => (
            <button
              key={theme.name}
              onClick={() => applyTheme(theme)}
              className={`w-full flex items-center justify-center px-2 py-2 hover:bg-primary-300 hover:bg-opacity-10 transition-colors duration-200 ${
                currentTheme === theme.name ? 'bg-primary-300 bg-opacity-10' : ''
              }`}
              title={theme.name}
            >
              <div 
                className="w-4 h-4 rounded-full" 
                style={{ backgroundColor: theme.primary }}
              ></div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
} 