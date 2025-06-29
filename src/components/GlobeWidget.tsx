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
  message: string;
}

const mockIPData: IPDataPoint[] = [
  { lat: 60.1695, lng: 24.9354, ip: "198.18.0.0", city: "Helsinki", country: "Finland", message: "IT WORKS :: chmod -R 777 /" },
  { lat: -33.8688, lng: 151.2093, ip: "127.0.1.1", city: "Sydney", country: "Australia", message: "DAEMON :: bash env injection by vector-agent" },
  { lat: 40.7128, lng: -74.0060, ip: "192.168.1.42", city: "New York", country: "USA", message: "EXPOSED :: public ACL on S3 bucket" },
  { lat: 35.8617, lng: 104.1954, ip: "20.14.62.71", city: "Xi'an", country: "China", message: "SHELLSHOCK :: vector-agent payload hit CGI handler" },
  { lat: 51.5074, lng: -0.1278, ip: "203.0.113.0", city: "London", country: "UK", message: "VULNCHAIN :: compromised via transitive NPM dep" },
  { lat: 35.6762, lng: 139.6503, ip: "5.45.207.1", city: "Tokyo", country: "Japan", message: "BOTNET :: mirai variant POST to /cgi-bin/luci" },
  { lat: 0.0, lng: 0.0, ip: "", city: "", country: "", message: "███████ :: --- UNKNOWN VECTOR ---" },
  { lat: -23.5505, lng: -46.6333, ip: "192.0.2.0", city: "São Paulo", country: "Brazil", message: "KR00K :: WPA2 traffic decrypted" },
  { lat: 52.3676, lng: 4.9041, ip: "122.33.33.221", city: "Amsterdam", country: "Netherlands", message: "HEARTBLEED :: malformed ping memory read" },
  { lat: 38.9072, lng: -77.0369, ip: "66.6.6.6", city: "Washington D.C.", country: "USA", message: "RFC3514 :: evil bit set, payload allowed" },
  { lat: 37.7749, lng: -122.4194, ip: "192.168.0.222", city: "San Francisco", country: "USA", message: "COMMIT :: AWS creds pushed to origin" },
  { lat: 19.4326, lng: -99.1332, ip: "169.254.169.254", city: "Mexico City", country: "Mexico", message: "SSRF :: IMDSv1 leak through URL param" },
  { lat: 34.0522, lng: -118.2437, ip: "100.13.37.42", city: "Los Angeles", country: "USA", message: "REVSHELL :: remote nc bind on :1337" },
  { lat: 43.6532, lng: -79.3832, ip: "4.2.2.2", city: "Toronto", country: "Canada", message: "MAC SPOOF :: vendor ID mismatch detected" },
  { lat: 39.0438, lng: -77.4874, ip: "3.6.9.2", city: "Maryland", country: "USA", message: "QUANTUMINSERT :: RST injected mid-handshake" },
  { lat: 39.9042, lng: 116.4074, ip: "114.114.114.114", city: "Beijing", country: "China", message: "C2 :: beacon every 300s via DNS TXT" },
  { lat: 37.5665, lng: 126.9780, ip: "111.90.159.50", city: "Seoul", country: "South Korea", message: "DESERIALIZE :: object bleed in RPC payload" },
];

export default function GlobeWidget() {
  const mountRef = useRef<HTMLDivElement>(null);
  const globeRef = useRef<ThreeGlobe | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [currentMessage, setCurrentMessage] = useState(mockIPData[0]);

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
    
    mountElement.addEventListener('mousedown', () => {
      isUserInteracting = true;
    });
    
    mountElement.addEventListener('mouseup', () => {
      isUserInteracting = false;
    });
    
    mountElement.addEventListener('mouseleave', () => {
      isUserInteracting = false;
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
          .polygonSideColor(() => 'rgba(251, 146, 60, 0.7)')
          .polygonCapColor(() => 'rgba(251, 146, 60, 0.5)')
          .polygonStrokeColor(() => '#f97316');
        
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });

    // cycle message
    const messageInterval = setInterval(() => {
      setCurrentMessageIndex(prev => {
        const nextIndex = (prev + 1) % mockIPData.length;
        setCurrentMessage(mockIPData[nextIndex]);
        return nextIndex;
      });
    }, 12000); // 12 seconds

    // cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      mountElement.removeChild(renderer.domElement);
      renderer.dispose();
      tbControls.dispose();
      globeRef.current = null;
      clearInterval(messageInterval);
    };
  }, []);

  // update ring data on current message change
  useEffect(() => {
    if (globeRef.current && !isLoading) {
      const ringData = [{
        lat: currentMessage.lat,
        lng: currentMessage.lng,
        maxR: 30,
        propagationSpeed: 4,
        repeatPeriod: 3000,
        altitude: 0.05
      }];
      
      const colorInterpolator = (t: number) => `rgba(249, 115, 22, ${1-t})`;
      
      globeRef.current
        .ringsData(ringData)
        .ringColor(() => colorInterpolator)
        .ringMaxRadius('maxR')
        .ringPropagationSpeed('propagationSpeed')
        .ringRepeatPeriod('repeatPeriod')
        .ringAltitude('altitude');
    }
  }, [currentMessage, isLoading]);

  return (
    <div className="w-full h-full relative">
      <div ref={mountRef} className="w-full h-full" />
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center text-orange-400">
          <div className="text-glow text-base">MONITOR :: INITIALIZING...</div>
        </div>
      )}
      <div className="absolute top-1 left-1 text-glow text-2xl">MONITOR :: GEOIP FEED</div>
      <div className="absolute bottom-1 left-1 text-orange-400">
        <div className="text-glow text-lg">{currentMessage.ip} ({currentMessage.country})</div>
        <div className="text-glow text-lg">{currentMessage.message}</div>
      </div>
    </div>
  );
} 