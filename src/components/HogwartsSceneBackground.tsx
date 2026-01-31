import { useEffect, useState } from 'react';

// Animated Fire Phoenix Component (2D CSS)
const FirePhoenix = () => {
  const [position, setPosition] = useState({ x: 20, y: 30 });
  const [direction, setDirection] = useState({ facing: 'right', angle: 0 });
  const [prevX, setPrevX] = useState(20);

  useEffect(() => {
    const animatePhoenix = () => {
      const time = Date.now() * 0.001;
      const newX = 20 + Math.sin(time * 0.3) * 60; // Fly across the scene
      const newY = 30 + Math.cos(time * 0.4) * 15; // Vertical movement
      
      // Calculate direction based on movement
      const deltaX = newX - prevX;
      const deltaY = newY - position.y;
      
      // Determine facing direction
      const facing = deltaX > 0 ? 'right' : 'left';
      
      // Calculate angle for realistic banking
      const angle = Math.atan2(deltaY, Math.abs(deltaX)) * (180 / Math.PI) * 0.3;
      
      setPosition({ x: newX, y: newY });
      setDirection({ facing, angle });
      setPrevX(newX);
    };

    const interval = setInterval(animatePhoenix, 50);
    return () => clearInterval(interval);
  }, [position.y, prevX]);

  return (
    <div 
      className="absolute transition-all duration-100 ease-linear"
      style={{ 
        left: `${position.x}%`, 
        top: `${position.y}%`,
        transform: `translate(-50%, -50%) scaleX(${direction.facing === 'left' ? -1 : 1}) rotate(${direction.angle}deg)`,
        zIndex: 15
      }}
    >
      {/* Phoenix SVG with Fire Effects */}
      <div className="relative">
        <svg width="120" height="80" viewBox="0 0 120 80" className="drop-shadow-2xl">
          <defs>
            <radialGradient id="phoenixGradient" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#ff6b35" />
              <stop offset="50%" stopColor="#ff4500" />
              <stop offset="100%" stopColor="#dc2626" />
            </radialGradient>
            <radialGradient id="fireGradient" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#fbbf24" />
              <stop offset="50%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#dc2626" />
            </radialGradient>
            <radialGradient id="headGradient" cx="30%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#fbbf24" />
              <stop offset="50%" stopColor="#ff6b35" />
              <stop offset="100%" stopColor="#dc2626" />
            </radialGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge> 
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          
          {/* Fire Trail */}
          <path 
            d="M10 40 Q20 35 30 40 Q40 45 50 40 Q60 35 70 40" 
            stroke="url(#fireGradient)" 
            strokeWidth="4" 
            fill="none" 
            opacity="0.8"
            className="animate-pulse"
          />
          
          {/* Phoenix Body */}
          <ellipse cx="70" cy="40" rx="15" ry="8" fill="url(#phoenixGradient)" filter="url(#glow)" />
          
          {/* Phoenix Head - More defined */}
          <ellipse cx="85" cy="38" rx="8" ry="6" fill="url(#headGradient)" filter="url(#glow)" />
          
          {/* Phoenix Eye - Always visible */}
          <circle cx="88" cy="36" r="1.5" fill="#fbbf24" />
          <circle cx="88.5" cy="35.5" r="0.8" fill="#ffffff" opacity="0.8" />
          
          {/* Phoenix Beak - More prominent */}
          <path d="M93 38 L98 36 L96 40 L93 39 Z" fill="#fbbf24" stroke="#f59e0b" strokeWidth="0.5" />
          
          {/* Phoenix Crest/Crown */}
          <path d="M82 32 Q85 28 88 32 Q90 29 92 33" stroke="url(#fireGradient)" strokeWidth="2" fill="none" opacity="0.9" />
          
          {/* Phoenix Wings - More dynamic */}
          <path 
            d="M60 35 Q45 25 35 30 Q50 40 60 45 Q65 42 70 40" 
            fill="url(#phoenixGradient)" 
            opacity="0.9"
            className="animate-pulse"
            style={{ animationDuration: '0.5s' }}
          />
          <path 
            d="M60 45 Q45 55 35 50 Q50 40 60 35 Q65 38 70 40" 
            fill="url(#phoenixGradient)" 
            opacity="0.9"
            className="animate-pulse"
            style={{ animationDuration: '0.5s', animationDelay: '0.25s' }}
          />
          
          {/* Wing Details */}
          <path 
            d="M55 38 Q42 30 32 35 Q45 42 55 42" 
            fill="url(#fireGradient)" 
            opacity="0.7"
            className="animate-pulse"
            style={{ animationDuration: '0.6s', animationDelay: '0.1s' }}
          />
          
          {/* Phoenix Tail - More elaborate */}
          <path 
            d="M55 40 Q40 45 25 40 Q35 50 45 45 Q50 42 55 40" 
            fill="url(#fireGradient)" 
            opacity="0.8"
          />
          <path 
            d="M50 42 Q35 48 20 43 Q30 52 40 47 Q45 44 50 42" 
            fill="url(#fireGradient)" 
            opacity="0.6"
          />
          
          {/* Phoenix Legs/Talons */}
          <path d="M75 46 L73 52 M77 46 L79 52" stroke="#fbbf24" strokeWidth="1.5" opacity="0.8" />
          <path d="M71 52 L69 54 M73 52 L75 54 M77 52 L79 54 M81 52 L83 54" stroke="#f59e0b" strokeWidth="1" opacity="0.7" />
        </svg>
        
        {/* Fire Particles */}
        <div className="absolute -inset-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-orange-400 rounded-full animate-ping"
              style={{
                left: `${20 + i * 10}%`,
                top: `${40 + Math.sin(i) * 20}%`,
                animationDelay: `${i * 0.2}s`,
                animationDuration: '1s'
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

// Realistic 2D Hogwarts Scene with Connected Movement
const Realistic2DHogwartsScene = () => {
  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden" style={{ zIndex: 1 }}>
      <svg 
        viewBox="0 0 1200 800" 
        className="w-full h-full"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          {/* Enhanced Gradients for seamless magical lighting */}
          <linearGradient id="magicalSkyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#0f0f23" />
            <stop offset="15%" stopColor="#1a0b3d" />
            <stop offset="35%" stopColor="#2d1b69" />
            <stop offset="55%" stopColor="#4c1d95" />
            <stop offset="75%" stopColor="#6366f1" />
            <stop offset="90%" stopColor="#8b5cf6" />
            <stop offset="100%" stopColor="#a855f7" />
          </linearGradient>
          
          <linearGradient id="flowingAuroraGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#10b981" opacity="0.4">
              <animate attributeName="stop-opacity" values="0.4;0.8;0.4" dur="6s" repeatCount="indefinite" />
            </stop>
            <stop offset="20%" stopColor="#06b6d4" opacity="0.5">
              <animate attributeName="stop-opacity" values="0.5;0.9;0.5" dur="8s" repeatCount="indefinite" />
            </stop>
            <stop offset="40%" stopColor="#8b5cf6" opacity="0.6">
              <animate attributeName="stop-opacity" values="0.6;1.0;0.6" dur="7s" repeatCount="indefinite" />
            </stop>
            <stop offset="60%" stopColor="#ec4899" opacity="0.5">
              <animate attributeName="stop-opacity" values="0.5;0.9;0.5" dur="9s" repeatCount="indefinite" />
            </stop>
            <stop offset="80%" stopColor="#f59e0b" opacity="0.4">
              <animate attributeName="stop-opacity" values="0.4;0.8;0.4" dur="5s" repeatCount="indefinite" />
            </stop>
            <stop offset="100%" stopColor="#fbbf24" opacity="0.3">
              <animate attributeName="stop-opacity" values="0.3;0.7;0.3" dur="10s" repeatCount="indefinite" />
            </stop>
          </linearGradient>
          
          <linearGradient id="seamlessMountainGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#1e293b" />
            <stop offset="40%" stopColor="#374151" />
            <stop offset="80%" stopColor="#4b5563" />
            <stop offset="100%" stopColor="#6b7280" />
          </linearGradient>
          
          <linearGradient id="connectedCastleGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#6366f1" />
            <stop offset="25%" stopColor="#5b21b6" />
            <stop offset="50%" stopColor="#4c1d95" />
            <stop offset="75%" stopColor="#3730a3" />
            <stop offset="100%" stopColor="#1e1b4b" />
          </linearGradient>
          
          <linearGradient id="flowingLakeGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#0ea5e9" />
            <stop offset="30%" stopColor="#0284c7" />
            <stop offset="60%" stopColor="#0369a1" />
            <stop offset="100%" stopColor="#1e40af" />
          </linearGradient>
          
          <radialGradient id="dynamicWindowGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fbbf24">
              <animate attributeName="stop-color" values="#fbbf24;#f59e0b;#fbbf24" dur="3s" repeatCount="indefinite" />
            </stop>
            <stop offset="100%" stopColor="#d97706">
              <animate attributeName="stop-color" values="#d97706;#b45309;#d97706" dur="3s" repeatCount="indefinite" />
            </stop>
          </radialGradient>
          
          <radialGradient id="magicalPurpleGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#a78bfa">
              <animate attributeName="stop-color" values="#a78bfa;#8b5cf6;#a78bfa" dur="4s" repeatCount="indefinite" />
            </stop>
            <stop offset="100%" stopColor="#7c3aed">
              <animate attributeName="stop-color" values="#7c3aed;#6d28d9;#7c3aed" dur="4s" repeatCount="indefinite" />
            </stop>
          </radialGradient>
          
          <radialGradient id="emeraldMagicGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#34d399">
              <animate attributeName="stop-color" values="#34d399;#10b981;#34d399" dur="5s" repeatCount="indefinite" />
            </stop>
            <stop offset="100%" stopColor="#059669">
              <animate attributeName="stop-color" values="#059669;#047857;#059669" dur="5s" repeatCount="indefinite" />
            </stop>
          </radialGradient>
          
          <filter id="connectedGlow">
            <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
          
          <filter id="strongConnectedGlow">
            <feGaussianBlur stdDeviation="8" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        {/* Seamless Magical Sky Background */}
        <rect width="1200" height="800" fill="url(#magicalSkyGradient)" />
        
        {/* Flowing Aurora Borealis Effect - Multiple Layers */}
        <path 
          d="M-100 120 Q200 80 500 100 Q800 120 1300 90 L1300 220 Q800 200 500 210 Q200 230 -100 200 Z" 
          fill="url(#flowingAuroraGradient)" 
          opacity="0.7"
        >
          <animateTransform
            attributeName="transform"
            type="translate"
            values="0,0; 50,-10; 0,0"
            dur="12s"
            repeatCount="indefinite"
          />
        </path>
        
        <path 
          d="M-50 180 Q300 140 700 160 Q1000 180 1250 150 L1250 280 Q1000 260 700 270 Q300 290 -50 270 Z" 
          fill="url(#flowingAuroraGradient)" 
          opacity="0.5"
        >
          <animateTransform
            attributeName="transform"
            type="translate"
            values="0,0; -30,15; 0,0"
            dur="15s"
            repeatCount="indefinite"
          />
        </path>
        
        <path 
          d="M0 240 Q400 200 800 220 Q1100 240 1200 210 L1200 340 Q1100 320 800 330 Q400 350 0 330 Z" 
          fill="url(#flowingAuroraGradient)" 
          opacity="0.3"
        >
          <animateTransform
            attributeName="transform"
            type="translate"
            values="0,0; 70,5; 0,0"
            dur="18s"
            repeatCount="indefinite"
          />
        </path>
        
        {/* Connected Mountain Ranges with Depth */}
        <polygon 
          points="0,600 200,380 400,430 600,360 800,400 1000,340 1200,380 1200,800 0,800" 
          fill="url(#seamlessMountainGradient)" 
          opacity="0.8"
        />
        
        <polygon 
          points="0,650 150,480 350,500 550,460 750,480 950,440 1200,460 1200,800 0,800" 
          fill="url(#seamlessMountainGradient)" 
          opacity="0.9"
          filter="url(#connectedGlow)"
        />
        
        {/* Foreground hills for better connection */}
        <polygon 
          points="0,700 100,620 300,640 500,600 700,620 900,580 1200,600 1200,800 0,800" 
          fill="url(#seamlessMountainGradient)" 
          opacity="1"
        />
        
        {/* Enchanted Hogwarts Castle - More Integrated */}
        <g transform="translate(400, 180)">
          {/* Castle Foundation - Better integrated with landscape */}
          <rect x="0" y="220" width="400" height="120" fill="url(#connectedCastleGradient)" filter="url(#connectedGlow)" />
          
          {/* Great Hall */}
          <rect x="50" y="140" width="300" height="140" fill="url(#connectedCastleGradient)" filter="url(#connectedGlow)" />
          <polygon points="50,140 200,100 350,140" fill="#8b5cf6" filter="url(#connectedGlow)" />
          
          {/* Main Tower */}
          <rect x="150" y="60" width="100" height="220" fill="url(#connectedCastleGradient)" filter="url(#connectedGlow)" />
          <polygon points="150,60 200,30 250,60" fill="#a78bfa" filter="url(#strongConnectedGlow)" />
          
          {/* Side Towers */}
          <rect x="20" y="100" width="60" height="180" fill="url(#connectedCastleGradient)" filter="url(#connectedGlow)" />
          <polygon points="20,100 50,80 80,100" fill="#c084fc" filter="url(#connectedGlow)" />
          
          <rect x="320" y="110" width="60" height="170" fill="url(#connectedCastleGradient)" filter="url(#connectedGlow)" />
          <polygon points="320,110 350,90 380,110" fill="#c084fc" filter="url(#connectedGlow)" />
          
          {/* Additional Towers */}
          <rect x="100" y="80" width="40" height="160" fill="url(#connectedCastleGradient)" filter="url(#connectedGlow)" />
          <polygon points="100,80 120,65 140,80" fill="#ddd6fe" filter="url(#connectedGlow)" />
          
          <rect x="260" y="90" width="40" height="150" fill="url(#connectedCastleGradient)" filter="url(#connectedGlow)" />
          <polygon points="260,90 280,75 300,90" fill="#ddd6fe" filter="url(#connectedGlow)" />
          
          {/* Animated Magical Castle Windows */}
          <rect x="70" y="160" width="8" height="15" fill="url(#dynamicWindowGlow)" filter="url(#strongConnectedGlow)" />
          <rect x="90" y="160" width="8" height="15" fill="url(#magicalPurpleGlow)" filter="url(#strongConnectedGlow)" />
          <rect x="110" y="160" width="8" height="15" fill="url(#emeraldMagicGlow)" filter="url(#strongConnectedGlow)" />
          <rect x="130" y="160" width="8" height="15" fill="url(#dynamicWindowGlow)" filter="url(#strongConnectedGlow)" />
          <rect x="150" y="160" width="8" height="15" fill="url(#magicalPurpleGlow)" filter="url(#strongConnectedGlow)" />
          
          <rect x="170" y="100" width="6" height="12" fill="url(#dynamicWindowGlow)" filter="url(#strongConnectedGlow)" />
          <rect x="170" y="120" width="6" height="12" fill="url(#emeraldMagicGlow)" filter="url(#strongConnectedGlow)" />
          <rect x="170" y="140" width="6" height="12" fill="url(#magicalPurpleGlow)" filter="url(#strongConnectedGlow)" />
          
          <rect x="220" y="100" width="6" height="12" fill="url(#magicalPurpleGlow)" filter="url(#strongConnectedGlow)" />
          <rect x="220" y="120" width="6" height="12" fill="url(#dynamicWindowGlow)" filter="url(#strongConnectedGlow)" />
          <rect x="220" y="140" width="6" height="12" fill="url(#emeraldMagicGlow)" filter="url(#strongConnectedGlow)" />
          
          {/* Side Tower Windows */}
          <rect x="40" y="120" width="6" height="12" fill="url(#dynamicWindowGlow)" filter="url(#strongConnectedGlow)" />
          <rect x="40" y="150" width="6" height="12" fill="url(#magicalPurpleGlow)" filter="url(#strongConnectedGlow)" />
          
          <rect x="340" y="130" width="6" height="12" fill="url(#emeraldMagicGlow)" filter="url(#strongConnectedGlow)" />
          <rect x="340" y="160" width="6" height="12" fill="url(#dynamicWindowGlow)" filter="url(#strongConnectedGlow)" />
          
          {/* Connected Bridge */}
          <rect x="400" y="240" width="120" height="25" fill="url(#connectedCastleGradient)" filter="url(#connectedGlow)" />
          <rect x="390" y="235" width="12" height="35" fill="url(#connectedCastleGradient)" />
          <rect x="520" y="235" width="12" height="35" fill="url(#connectedCastleGradient)" />
        </g>
        
        {/* Animated Whomping Willow Tree */}
        <g transform="translate(200, 420)">
          <rect x="45" y="80" width="10" height="60" fill="#92400e" />
          <circle cx="50" cy="80" r="40" fill="#065f46" opacity="0.9">
            <animateTransform
              attributeName="transform"
              type="rotate"
              values="0 50 80; 5 50 80; -5 50 80; 0 50 80"
              dur="8s"
              repeatCount="indefinite"
            />
          </circle>
          
          {/* Animated branches */}
          <path d="M20 60 Q10 40 30 30 Q50 20 70 30 Q90 40 80 60" fill="#047857" opacity="0.8">
            <animateTransform
              attributeName="transform"
              type="rotate"
              values="0 50 50; 10 50 50; -10 50 50; 0 50 50"
              dur="6s"
              repeatCount="indefinite"
            />
          </path>
          <path d="M15 80 Q5 60 25 50 Q45 40 65 50 Q85 60 75 80" fill="#059669" opacity="0.7">
            <animateTransform
              attributeName="transform"
              type="rotate"
              values="0 50 65; -8 50 65; 8 50 65; 0 50 65"
              dur="7s"
              repeatCount="indefinite"
            />
          </path>
          
          {/* Magical glow around tree */}
          <circle cx="50" cy="80" r="50" fill="#10b981" opacity="0.15" filter="url(#connectedGlow)">
            <animate attributeName="opacity" values="0.15;0.25;0.15" dur="4s" repeatCount="indefinite" />
          </circle>
        </g>
        
        {/* Connected Forbidden Forest */}
        <g transform="translate(50, 470)">
          {Array.from({ length: 15 }).map((_, i) => (
            <g key={i} transform={`translate(${i * 25}, ${Math.random() * 30})`}>
              <rect x="8" y="40" width="4" height="30" fill="#7c2d12" />
              <polygon 
                points="0,40 10,20 20,40" 
                fill={i % 3 === 0 ? "#065f46" : i % 3 === 1 ? "#047857" : "#059669"} 
                opacity="0.9"
              >
                <animateTransform
                  attributeName="transform"
                  type="rotate"
                  values={`0 10 30; ${2 + Math.random() * 3} 10 30; ${-(2 + Math.random() * 3)} 10 30; 0 10 30`}
                  dur={`${8 + Math.random() * 4}s`}
                  repeatCount="indefinite"
                />
              </polygon>
              {/* Moving magical sparkles on trees */}
              <circle cx={5 + Math.random() * 10} cy={25 + Math.random() * 10} r="0.5" fill="#fbbf24" opacity="0.8">
                <animate attributeName="opacity" values="0.8;0.3;0.8" dur={`${2 + Math.random() * 2}s`} repeatCount="indefinite" />
                <animateTransform
                  attributeName="transform"
                  type="translate"
                  values="0,0; 2,-2; 0,0"
                  dur={`${3 + Math.random()}s`}
                  repeatCount="indefinite"
                />
              </circle>
            </g>
          ))}
        </g>
        
        {/* Flowing Magical Lake */}
        <ellipse cx="600" cy="670" rx="520" ry="110" fill="url(#flowingLakeGradient)" opacity="0.9" filter="url(#connectedGlow)">
          <animateTransform
            attributeName="transform"
            type="scale"
            values="1,1; 1.02,0.98; 1,1"
            dur="10s"
            repeatCount="indefinite"
          />
        </ellipse>
        
        {/* Animated water ripples */}
        <ellipse cx="600" cy="670" rx="480" ry="90" fill="none" stroke="#06b6d4" strokeWidth="2" opacity="0.3">
          <animate attributeName="stroke-opacity" values="0.3;0.1;0.3" dur="6s" repeatCount="indefinite" />
          <animateTransform
            attributeName="transform"
            type="scale"
            values="1,1; 1.1,1.1; 1,1"
            dur="8s"
            repeatCount="indefinite"
          />
        </ellipse>
        
        {/* Connected Lake Reflections */}
        <g opacity="0.4" transform="translate(400, 520) scale(1, -0.4)">
          <rect x="0" y="-120" width="400" height="120" fill="url(#connectedCastleGradient)" />
          <rect x="50" y="-200" width="300" height="140" fill="url(#connectedCastleGradient)" />
          <rect x="150" y="-260" width="100" height="220" fill="url(#connectedCastleGradient)" />
        </g>
        
        {/* Flowing Atmospheric Effects */}
        <circle cx="300" cy="200" r="120" fill="#f59e0b" opacity="0.15" filter="url(#connectedGlow)">
          <animateTransform
            attributeName="transform"
            type="translate"
            values="0,0; 20,10; 0,0"
            dur="20s"
            repeatCount="indefinite"
          />
        </circle>
        <circle cx="900" cy="150" r="100" fill="#ec4899" opacity="0.12" filter="url(#connectedGlow)">
          <animateTransform
            attributeName="transform"
            type="translate"
            values="0,0; -15,15; 0,0"
            dur="25s"
            repeatCount="indefinite"
          />
        </circle>
        <circle cx="150" cy="250" r="80" fill="#10b981" opacity="0.1" filter="url(#connectedGlow)">
          <animateTransform
            attributeName="transform"
            type="translate"
            values="0,0; 10,-20; 0,0"
            dur="18s"
            repeatCount="indefinite"
          />
        </circle>
        
        {/* Connected Flowing Magical Sparkles */}
        {Array.from({ length: 25 }).map((_, i) => (
          <circle
            key={i}
            cx={100 + i * 40 + Math.random() * 80}
            cy={150 + Math.random() * 300}
            r={1 + Math.random() * 2}
            fill={i % 5 === 0 ? "#fbbf24" : i % 5 === 1 ? "#a78bfa" : i % 5 === 2 ? "#34d399" : i % 5 === 3 ? "#f472b6" : "#60a5fa"}
            opacity="0.9"
          >
            <animate attributeName="opacity" values="0.9;0.3;0.9" dur={`${2 + Math.random() * 3}s`} repeatCount="indefinite" />
            <animateTransform
              attributeName="transform"
              type="translate"
              values={`0,0; ${10 + Math.random() * 20},${-5 - Math.random() * 10}; 0,0`}
              dur={`${4 + Math.random() * 4}s`}
              repeatCount="indefinite"
            />
          </circle>
        ))}
        
        {/* Flowing Magical Shooting Stars */}
        {Array.from({ length: 3 }).map((_, i) => (
          <g key={i}>
            <line
              x1={200 + i * 300}
              y1={50 + i * 40}
              x2={280 + i * 300}
              y2={90 + i * 40}
              stroke="#fbbf24"
              strokeWidth="3"
              opacity="0.8"
            >
              <animate attributeName="opacity" values="0;0.8;0" dur="4s" repeatCount="indefinite" begin={`${i * 2}s`} />
              <animateTransform
                attributeName="transform"
                type="translate"
                values="0,0; 100,50; 200,100"
                dur="4s"
                repeatCount="indefinite"
                begin={`${i * 2}s`}
              />
            </line>
            <circle
              cx={280 + i * 300}
              cy={90 + i * 40}
              r="3"
              fill="#ffffff"
              opacity="0.9"
            >
              <animate attributeName="opacity" values="0;0.9;0" dur="4s" repeatCount="indefinite" begin={`${i * 2}s`} />
              <animateTransform
                attributeName="transform"
                type="translate"
                values="0,0; 100,50; 200,100"
                dur="4s"
                repeatCount="indefinite"
                begin={`${i * 2}s`}
              />
            </circle>
          </g>
        ))}
        
        {/* Connected Flowing Clouds */}
        <g opacity="0.6">
          <ellipse cx="200" cy="100" rx="60" ry="20" fill="#a78bfa">
            <animateTransform
              attributeName="transform"
              type="translate"
              values="0,0; 30,5; 0,0"
              dur="30s"
              repeatCount="indefinite"
            />
          </ellipse>
          <ellipse cx="180" cy="90" rx="40" ry="15" fill="#c084fc">
            <animateTransform
              attributeName="transform"
              type="translate"
              values="0,0; 25,3; 0,0"
              dur="32s"
              repeatCount="indefinite"
            />
          </ellipse>
          
          <ellipse cx="800" cy="120" rx="80" ry="25" fill="#34d399">
            <animateTransform
              attributeName="transform"
              type="translate"
              values="0,0; -40,8; 0,0"
              dur="35s"
              repeatCount="indefinite"
            />
          </ellipse>
          <ellipse cx="770" cy="110" rx="50" ry="18" fill="#6ee7b7">
            <animateTransform
              attributeName="transform"
              type="translate"
              values="0,0; -35,6; 0,0"
              dur="37s"
              repeatCount="indefinite"
            />
          </ellipse>
        </g>
        
        {/* Animated Magical Moon */}
        <circle cx="1000" cy="120" r="30" fill="#fbbf24" opacity="0.9" filter="url(#strongConnectedGlow)">
          <animate attributeName="opacity" values="0.9;0.6;0.9" dur="8s" repeatCount="indefinite" />
        </circle>
        <circle cx="1000" cy="120" r="25" fill="#fef3c7" opacity="0.7">
          <animate attributeName="opacity" values="0.7;0.4;0.7" dur="8s" repeatCount="indefinite" />
        </circle>
        
        {/* Connected Floating Magical Orbs */}
        {Array.from({ length: 6 }).map((_, i) => (
          <circle
            key={i}
            cx={200 + i * 150}
            cy={250 + Math.sin(i) * 80}
            r={4 + Math.random() * 3}
            fill={i % 4 === 0 ? "#a78bfa" : i % 4 === 1 ? "#34d399" : i % 4 === 2 ? "#f472b6" : "#fbbf24"}
            opacity="0.8"
            filter="url(#connectedGlow)"
          >
            <animate attributeName="opacity" values="0.8;0.4;0.8" dur={`${3 + Math.random() * 2}s`} repeatCount="indefinite" />
            <animateTransform
              attributeName="transform"
              type="translate"
              values={`0,0; 0,${-20 - Math.random() * 20}; 0,0`}
              dur={`${6 + Math.random() * 4}s`}
              repeatCount="indefinite"
            />
          </circle>
        ))}
      </svg>
    </div>
  );
};

const HogwartsSceneBackground = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
      {/* Realistic 2D Hogwarts Scene */}
      <Realistic2DHogwartsScene />
      
      {/* Animated Fire Phoenix */}
      <FirePhoenix />
      
      {/* Additional Atmospheric Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20" style={{ zIndex: 5 }} />
      
      {/* Magical Mist Overlay */}
      <div className="absolute inset-0 opacity-30" style={{ zIndex: 3 }}>
        <div className="w-full h-full bg-gradient-to-t from-blue-900/10 via-transparent to-transparent animate-pulse" />
      </div>
      
      {/* Golden Light Rays */}
      <div className="absolute top-0 right-0 w-full h-full opacity-20" style={{ zIndex: 4 }}>
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-radial from-yellow-400/20 via-orange-500/10 to-transparent rounded-full animate-pulse" />
        <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-gradient-radial from-orange-400/15 via-red-500/5 to-transparent rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
      </div>
    </div>
  );
};

export default HogwartsSceneBackground;