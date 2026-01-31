import { useEffect, useRef, useState } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  color: string;
  opacity: number;
  type: 'sparkle' | 'trail' | 'magic' | 'star';
  rotation: number;
  rotationSpeed: number;
  scale: number;
  targetScale: number;
}

interface MouseTrail {
  x: number;
  y: number;
  timestamp: number;
}

const MagicalParticleCursor = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseTrailRef = useRef<MouseTrail[]>([]);
  const animationRef = useRef<number>();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [mouseVelocity, setMouseVelocity] = useState({ x: 0, y: 0 });
  const lastMousePos = useRef({ x: 0, y: 0 });

  // Enhanced Harry Potter magical colors with gradients
  const magicalColors = {
    gold: ['#FFD700', '#FFA500', '#FFFF00', '#DAA520'],
    fire: ['#FF4500', '#FF6347', '#FF8C00', '#DC143C'],
    magic: ['#9333EA', '#A855F7', '#C084FC', '#8B5CF6'],
    ice: ['#06B6D4', '#0891B2', '#67E8F9', '#22D3EE'],
    nature: ['#10B981', '#059669', '#34D399', '#6EE7B7'],
    dark: ['#7C3AED', '#5B21B6', '#8B5CF6', '#A78BFA'],
  };

  const getRandomColor = (theme?: keyof typeof magicalColors) => {
    const themes = theme ? [magicalColors[theme]] : Object.values(magicalColors);
    const selectedTheme = themes[Math.floor(Math.random() * themes.length)];
    return selectedTheme[Math.floor(Math.random() * selectedTheme.length)];
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Create enhanced particle function
    const createParticle = (x: number, y: number, type: Particle['type'] = 'trail', velocity = { x: 0, y: 0 }) => {
      const baseVelocity = Math.sqrt(velocity.x * velocity.x + velocity.y * velocity.y);
      
      const particle: Particle = {
        x: x + (Math.random() - 0.5) * 8,
        y: y + (Math.random() - 0.5) * 8,
        vx: velocity.x * 0.3 + (Math.random() - 0.5) * 2,
        vy: velocity.y * 0.3 + (Math.random() - 0.5) * 2,
        life: 0,
        maxLife: type === 'trail' ? 80 + Math.random() * 40 : 
                 type === 'star' ? 120 + Math.random() * 60 : 
                 type === 'magic' ? 100 + Math.random() * 50 : 60,
        size: type === 'star' ? 2 + Math.random() * 3 : 
              type === 'magic' ? 3 + Math.random() * 4 : 
              1.5 + Math.random() * 2.5,
        color: type === 'fire' ? getRandomColor('fire') :
               type === 'magic' ? getRandomColor('magic') :
               type === 'star' ? getRandomColor('gold') :
               getRandomColor(),
        opacity: 1,
        type,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.1,
        scale: 0.1,
        targetScale: 1,
      };

      particlesRef.current.push(particle);

      // Increased particle limit for longer trails
      if (particlesRef.current.length > 300) {
        particlesRef.current.shift();
      }
    };

    // Create trail particles along mouse path
    const createTrailParticles = () => {
      const trail = mouseTrailRef.current;
      if (trail.length < 2) return;

      // Create particles along the trail path
      for (let i = 1; i < Math.min(trail.length, 10); i++) {
        const current = trail[i];
        const previous = trail[i - 1];
        
        if (current && previous) {
          const distance = Math.sqrt(
            Math.pow(current.x - previous.x, 2) + 
            Math.pow(current.y - previous.y, 2)
          );
          
          if (distance > 5) {
            const steps = Math.floor(distance / 5);
            for (let step = 0; step < steps; step++) {
              const t = step / steps;
              const x = previous.x + (current.x - previous.x) * t;
              const y = previous.y + (current.y - previous.y) * t;
              
              if (Math.random() > 0.3) {
                createParticle(x, y, 'trail', {
                  x: (current.x - previous.x) * 0.1,
                  y: (current.y - previous.y) * 0.1
                });
              }
            }
          }
        }
      }
    };

    // Mouse move handler with enhanced tracking
    const handleMouseMove = (e: MouseEvent) => {
      const currentTime = Date.now();
      const newPos = { x: e.clientX, y: e.clientY };
      
      // Calculate velocity
      const velocity = {
        x: newPos.x - lastMousePos.current.x,
        y: newPos.y - lastMousePos.current.y
      };
      
      setMousePos(newPos);
      setMouseVelocity(velocity);
      
      // Add to mouse trail
      mouseTrailRef.current.push({
        x: newPos.x,
        y: newPos.y,
        timestamp: currentTime
      });
      
      // Keep only recent trail points (last 2 seconds)
      mouseTrailRef.current = mouseTrailRef.current.filter(
        point => currentTime - point.timestamp < 2000
      );
      
      // Create trail particles
      createTrailParticles();
      
      // Create special particles based on movement speed
      const speed = Math.sqrt(velocity.x * velocity.x + velocity.y * velocity.y);
      
      if (speed > 10) {
        // Fast movement - create fire trail
        for (let i = 0; i < 3; i++) {
          createParticle(newPos.x, newPos.y, 'fire', velocity);
        }
      } else if (speed > 5) {
        // Medium movement - create magic particles
        if (Math.random() > 0.5) {
          createParticle(newPos.x, newPos.y, 'magic', velocity);
        }
      }
      
      // Occasionally create stars
      if (Math.random() > 0.98) {
        createParticle(newPos.x, newPos.y, 'star', velocity);
      }
      
      lastMousePos.current = newPos;
    };

    // Enhanced drawing functions
    const drawStar = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number, rotation: number) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation);
      ctx.beginPath();
      for (let i = 0; i < 5; i++) {
        const angle = (i * 4 * Math.PI) / 5;
        const x1 = Math.cos(angle) * size;
        const y1 = Math.sin(angle) * size;
        if (i === 0) ctx.moveTo(x1, y1);
        else ctx.lineTo(x1, y1);
      }
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    };

    const drawMagicParticle = (ctx: CanvasRenderingContext2D, particle: Particle) => {
      ctx.save();
      ctx.translate(particle.x, particle.y);
      ctx.rotate(particle.rotation);
      ctx.scale(particle.scale, particle.scale);
      
      // Create magical aura
      const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, particle.size * 3);
      gradient.addColorStop(0, particle.color);
      gradient.addColorStop(0.5, particle.color + '80');
      gradient.addColorStop(1, 'transparent');
      
      ctx.fillStyle = gradient;
      ctx.fillRect(-particle.size * 3, -particle.size * 3, particle.size * 6, particle.size * 6);
      
      ctx.restore();
    };

    // Enhanced animation loop
    const animate = () => {
      // Clear canvas with subtle trail effect
      ctx.fillStyle = 'rgba(0, 0, 0, 0.02)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      particlesRef.current = particlesRef.current.filter(particle => {
        // Update particle physics
        particle.life++;
        particle.rotation += particle.rotationSpeed;
        
        // Smooth scale animation
        particle.scale += (particle.targetScale - particle.scale) * 0.1;
        
        // Enhanced physics based on type
        switch (particle.type) {
          case 'fire':
            particle.x += particle.vx;
            particle.y += particle.vy;
            particle.vy -= 0.3; // Fire rises
            particle.vx *= 0.96;
            particle.vy *= 0.94;
            break;
            
          case 'magic':
            particle.x += particle.vx;
            particle.y += particle.vy;
            particle.vx *= 0.98;
            particle.vy *= 0.98;
            // Add swirling motion
            particle.vx += Math.sin(particle.life * 0.1) * 0.1;
            particle.vy += Math.cos(particle.life * 0.1) * 0.1;
            break;
            
          case 'star':
            particle.x += particle.vx * 0.5;
            particle.y += particle.vy * 0.5;
            particle.vx *= 0.995;
            particle.vy *= 0.995;
            break;
            
          default: // trail
            particle.x += particle.vx;
            particle.y += particle.vy;
            particle.vy += 0.05; // Slight gravity
            particle.vx *= 0.99;
            particle.vy *= 0.99;
        }

        // Enhanced opacity calculation
        const lifeRatio = particle.life / particle.maxLife;
        particle.opacity = Math.max(0, 1 - Math.pow(lifeRatio, 1.5));

        // Draw particle with enhanced effects
        if (particle.opacity > 0) {
          ctx.save();
          ctx.globalAlpha = particle.opacity;
          
          // Enhanced glow based on type
          const glowSize = particle.type === 'magic' ? 20 : 
                          particle.type === 'fire' ? 15 : 
                          particle.type === 'star' ? 12 : 8;
          
          ctx.shadowBlur = glowSize;
          ctx.shadowColor = particle.color;
          
          // Draw based on type
          switch (particle.type) {
            case 'star':
              ctx.fillStyle = particle.color;
              drawStar(ctx, particle.x, particle.y, particle.size * particle.scale, particle.rotation);
              break;
              
            case 'magic':
              drawMagicParticle(ctx, particle);
              break;
              
            case 'fire':
              // Draw flame shape
              ctx.fillStyle = particle.color;
              ctx.save();
              ctx.translate(particle.x, particle.y);
              ctx.scale(particle.scale, particle.scale);
              ctx.beginPath();
              ctx.ellipse(0, 0, particle.size, particle.size * 1.5, particle.rotation, 0, Math.PI * 2);
              ctx.fill();
              ctx.restore();
              break;
              
            default: // trail
              ctx.fillStyle = particle.color;
              ctx.beginPath();
              ctx.arc(particle.x, particle.y, particle.size * particle.scale, 0, Math.PI * 2);
              ctx.fill();
          }
          
          // Add inner highlight for non-magic particles
          if (particle.type !== 'magic') {
            ctx.shadowBlur = 3;
            ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.size * particle.scale * 0.3, 0, Math.PI * 2);
            ctx.fill();
          }
          
          ctx.restore();
        }

        return particle.life < particle.maxLife;
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    // Start animation
    animate();

    // Add event listeners
    document.addEventListener('mousemove', handleMouseMove);

    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      document.removeEventListener('mousemove', handleMouseMove);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-50"
        style={{
          mixBlendMode: 'screen',
        }}
      />
      {/* Enhanced Custom Magical Cursor */}
      <div
        className="fixed pointer-events-none z-[60] transition-transform duration-100 ease-out"
        style={{
          left: mousePos.x,
          top: mousePos.y,
          transform: `translate(-50%, -50%) scale(${1 + Math.abs(mouseVelocity.x + mouseVelocity.y) * 0.01})`,
        }}
      >
        <div className="relative">
          {/* Main cursor */}
          <div className="text-2xl animate-pulse">✨</div>
          {/* Trailing sparkles */}
          <div className="absolute -top-1 -left-1 text-lg opacity-60 animate-ping">⭐</div>
          <div className="absolute -bottom-1 -right-1 text-sm opacity-40 animate-bounce">💫</div>
        </div>
      </div>
      <style jsx global>{`
        * {
          cursor: none !important;
        }
        
        body {
          cursor: none !important;
        }
      `}</style>
    </>
  );
};

export default MagicalParticleCursor;