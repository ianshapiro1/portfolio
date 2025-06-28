'use client';

import { useEffect, useRef, useState } from 'react';
import ThreeGlobe from 'three-globe';
import * as THREE from 'three';
import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls.js';

interface IPDataPoint {
  lat: number;
  lng: number;
  ip: string;
  city: string;
  country: string;
  timestamp: string;
  radius: number;
  alt: number;
  color: string;
  label: string;
}

const mockIPData: IPDataPoint[] = [
  { lat: 40.7128, lng: -74.0060, ip: "192.168.1.45", city: "New York", country: "USA", timestamp: "2m ago", radius: 0.5, alt: 0.3, color: '#ff8c00', label: 'NYC' },
  { lat: 51.5074, lng: -0.1278, ip: "203.45.67.89", city: "London", country: "UK", timestamp: "5m ago", radius: 0.5, alt: 0.3, color: '#ff8c00', label: 'LON' },
  { lat: 35.6762, lng: 139.6503, ip: "98.76.54.32", city: "Tokyo", country: "Japan", timestamp: "1m ago", radius: 0.5, alt: 0.3, color: '#ff8c00', label: 'TYO' },
  { lat: -33.8688, lng: 151.2093, ip: "45.67.89.12", city: "Sydney", country: "Australia", timestamp: "3m ago", radius: 0.5, alt: 0.3, color: '#ff8c00', label: 'SYD' },
  { lat: 55.7558, lng: 37.6176, ip: "78.90.12.34", city: "Moscow", country: "Russia", timestamp: "4m ago", radius: 0.5, alt: 0.3, color: '#ff8c00', label: 'MOW' },
  { lat: -23.5505, lng: -46.6333, ip: "56.78.90.12", city: "São Paulo", country: "Brazil", timestamp: "6m ago", radius: 0.5, alt: 0.3, color: '#ff8c00', label: 'SAO' },
];

export default function GlobeWidget() {
  const mountRef = useRef<HTMLDivElement>(null);
  const globeRef = useRef<ThreeGlobe | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const mountElement = mountRef.current;
    if (!mountElement) return;

    const globe = new ThreeGlobe()
      .globeImageUrl('//cdn.jsdelivr.net/npm/three-globe/example/img/earth-dark.jpg')
      .showGlobe(true)
      .showGraticules(true)
      .showAtmosphere(false);

    // set up scene
    const scene = new THREE.Scene();
    scene.add(globe);

    // set up camera
    const camera = new THREE.PerspectiveCamera(
      60,
      mountElement.clientWidth / mountElement.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 300;

    // set up renderer
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true,
      alpha: true 
    });
    renderer.setSize(mountElement.clientWidth, mountElement.clientHeight);
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(window.devicePixelRatio);
    mountElement.appendChild(renderer.domElement);

    // camera controls
    const tbControls = new TrackballControls(camera, renderer.domElement);
    tbControls.minDistance = 101;
    tbControls.rotateSpeed = 2;
    tbControls.zoomSpeed = 0.8;
    tbControls.noPan = true;
    tbControls.noZoom = true;
    
    let isUserInteracting = false;
    let lastInteractionTime = 0;
    const interactionPauseTime = 3000;
    
    tbControls.addEventListener('start', () => {
      isUserInteracting = true;
      lastInteractionTime = Date.now();
    });
    
    tbControls.addEventListener('end', () => {
      setTimeout(() => {
        if (Date.now() - lastInteractionTime >= interactionPauseTime) {
          isUserInteracting = false;
        }
      }, interactionPauseTime);
    });

    globeRef.current = globe;
    
    // animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      
      tbControls.update();
      
      if (globeRef.current && !isUserInteracting) {
        globeRef.current.rotation.y += 0.001;
      }
      
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      camera.aspect = mountElement.clientWidth / mountElement.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mountElement.clientWidth, mountElement.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    // load countries and configure rings
    fetch('/ne_110m_admin_0_countries.geojson')
      .then(res => res.json())
      .then(countries => {
        globe
          .polygonsData(countries.features.filter((d: any) => d.properties.ISO_A2 !== 'AQ'))
          .polygonCapColor(() => 'rgba(255, 140, 0, 0.7)')
          .polygonSideColor(() => 'rgba(255, 140, 0, 0.5)')
          .polygonStrokeColor(() => '#ff8c00');
        
        const ringData = mockIPData.map(point => ({
          lat: point.lat,
          lng: point.lng,
          maxR: 20,
          propagationSpeed: 3,
          repeatPeriod: 5000
        }));
        
        const colorInterpolator = (t: number) => `rgba(255, 140, 0, ${1-t})`;
        
        globe
          .ringsData(ringData)
          .ringColor(() => colorInterpolator)
          .ringMaxRadius('maxR')
          .ringPropagationSpeed('propagationSpeed')
          .ringRepeatPeriod('repeatPeriod');
        
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });

    // cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      mountElement.removeChild(renderer.domElement);
      renderer.dispose();
      tbControls.dispose();
      globeRef.current = null;
    };
  }, []);

  return (
    <div className="w-full h-full relative">
      <div ref={mountRef} className="w-full h-full" />
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center text-orange-400">
          <div className="text-glow text-base">Loading globe...</div>
        </div>
      )}
      <div className="absolute top-1 left-1 text-glow text-2xl">SATLINK FEED :: ONLINE</div>
      <div className="absolute bottom-1 left-1 text-orange-400">
        <div className="text-glow text-lg">Active Connections: {mockIPData.length}</div>
        <div className="text-glow text-lg">Last: {mockIPData[0]?.timestamp}</div>
      </div>
    </div>
  );
} 