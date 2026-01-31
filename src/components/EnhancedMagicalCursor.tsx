import { useEffect, useRef, useState } from 'react';

interface MagicalParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  color: string;
  opacity: number;
  type: 'sparkle' | 'star' | 'magic' | 'fire';
  rotation: number;
  rotationSpeed: number;
}

const EnhancedMagicalCursor = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<MagicalParticle[]>([]);
  const mouseRef = useRef({ x: 0, y: 0, prevX: 0, prevY: 0 });
  const animationRef = useRef<number>();
  const [isActive, setIsActive] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 100, y: 100 });
  const [isHovering, setIsHovering] = useState(false);

  // Harry Potter themed magical colors
  const magicalColors = {
    gold: ['#FFD700', '#FFA500', '#FFFF00'],
    fire: ['#FF4500', '#FF6347', '#FF8C00'],
    magic: ['#9333EA', '#A855F7', '#C084FC'],
    ice: ['#06B6D4', '#0891B2', '#67E8F9'],
    nature: ['#10B981', '#059669', '#34D399'],
    dark: ['#7C3AED', '#5B21B6', '#8B5CF6'],
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

    // Get random color from theme
    const getRandomMagicalColor = () => {
      const themes = Object.values(magicalColors);
      const theme = themes[Math.floor(Math.random() * themes.length)];
      return theme[Math.floor(Math.random() * theme.length)];
    };

    // Create different types of particles
    const createParticle = (x: number, y: number, type: MagicalParticle['type'] = 'sparkle') => {
      const baseVelocity = Math.sqrt(
        Math.pow(mouseRef.current.x - mouseRef.current.prevX, 2) +
        Math.pow(mouseRef.current.y - mouseRef.current.prevY, 2)
      ) * 0.1;

      const particle: MagicalParticle = {
        x: x + (Math.random() - 0.5) * 15,
        y: y + (Math.random() - 0.5) * 15,
        vx: (Math.random() - 0.5) * (2 + baseVelocity),
        vy: (Math.random() - 0.5) * (2 + baseVelocity),
        life: 0,
        maxLife: type === 'fire' ? 40 : type === 'star' ? 80 : 60,
        size: type === 'star' ? 3 + Math.random() * 2 : 1.5 + Math.random() * 3,
        color: getRandomMagicalColor(),
        opacity: 1,
        type,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.2,
      };

      particlesRef.current.push(particle);

      // Limit particles for performance and to not interfere with custom cursor
      if (particlesRef.current.length > 50) {
        particlesRef.current.shift();
      }
    };

    // Mouse move handler
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.prevX = mouseRef.current.x;
      mouseRef.current.prevY = mouseRef.current.y;
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;

      // Update mouse position for custom cursor
      setMousePosition({ x: e.clientX, y: e.clientY });

      setIsActive(true);

      // Create different particles based on movement speed
      const speed = Math.sqrt(
        Math.pow(e.movementX, 2) + Math.pow(e.movementY, 2)
      );

      if (speed > 5) {
        // Fast movement - create fire particles
        for (let i = 0; i < 2; i++) {
          createParticle(e.clientX, e.clientY, 'fire');
        }
      } else if (speed > 2) {
        // Medium movement - create magic particles
        createParticle(e.clientX, e.clientY, 'magic');
      } else {
        // Slow movement - create sparkles
        if (Math.random() > 0.7) {
          createParticle(e.clientX, e.clientY, 'sparkle');
        }
      }

      // Occasionally create stars
      if (Math.random() > 0.95) {
        createParticle(e.clientX, e.clientY, 'star');
      }
    };

    // Mouse enter/leave handlers
    const handleMouseEnter = () => setIsActive(true);
    const handleMouseLeave = () => setIsActive(false);

    // Draw star shape
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

    // Animation loop
    const animate = () => {
      // Clear canvas with slight trail effect
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      particlesRef.current = particlesRef.current.filter(particle => {
        // Update particle physics
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.life++;
        particle.rotation += particle.rotationSpeed;
        
        // Apply different physics based on type
        switch (particle.type) {
          case 'fire':
            particle.vy -= 0.2; // Fire rises
            particle.vx *= 0.98;
            particle.vy *= 0.95;
            break;
          case 'magic':
            particle.vy += 0.05; // Slight gravity
            particle.vx *= 0.99;
            particle.vy *= 0.99;
            break;
          case 'star':
            particle.vx *= 0.995; // Very slow decay
            particle.vy *= 0.995;
            break;
          default: // sparkle
            particle.vy += 0.1; // Normal gravity
            particle.vx *= 0.98;
            particle.vy *= 0.98;
        }

        // Update opacity
        particle.opacity = Math.max(0, 1 - (particle.life / particle.maxLife));

        // Draw particle
        if (particle.opacity > 0) {
          ctx.save();
          ctx.globalAlpha = particle.opacity;
          
          // Set glow effect
          ctx.shadowBlur = particle.type === 'fire' ? 15 : 8;
          ctx.shadowColor = particle.color;
          
          ctx.fillStyle = particle.color;

          // Draw based on type
          switch (particle.type) {
            case 'star':
              drawStar(ctx, particle.x, particle.y, particle.size, particle.rotation);
              break;
            case 'fire':
              // Draw flame-like shape
              ctx.beginPath();
              ctx.ellipse(particle.x, particle.y, particle.size, particle.size * 1.5, particle.rotation, 0, Math.PI * 2);
              ctx.fill();
              break;
            default:
              // Draw circle
              ctx.beginPath();
              ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
              ctx.fill();
          }
          
          // Add inner highlight
          if (particle.type !== 'star') {
            ctx.shadowBlur = 3;
            ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.size * 0.3, 0, Math.PI * 2);
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
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);

    // Hover detection for interactive elements
    const handleMouseOver = (e: Event) => {
      const target = e.target as HTMLElement;
      const isInteractive = target.matches('button, a, [role="button"], input, textarea, select, .btn, .button, [data-button], [onclick]') ||
                           target.closest('button, a, [role="button"], input, textarea, select, .btn, .button, [data-button], [onclick]');
      setIsHovering(!!isInteractive);
    };

    const handleMouseOut = (e: Event) => {
      const target = e.target as HTMLElement;
      const relatedTarget = (e as MouseEvent).relatedTarget as HTMLElement;
      
      // Check if we're still over an interactive element
      const isStillInteractive = relatedTarget && (
        relatedTarget.matches('button, a, [role="button"], input, textarea, select, .btn, .button, [data-button], [onclick]') ||
        relatedTarget.closest('button, a, [role="button"], input, textarea, select, .btn, .button, [data-button], [onclick]')
      );
      
      if (!isStillInteractive) {
        setIsHovering(false);
      }
    };

    // Add hover detection listeners
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);

    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
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
      
      {/* Custom Cursor Image that follows mouse */}
      <div
        className="fixed pointer-events-none z-[9999]"
        style={{
          left: mousePosition.x - 48,
          top: mousePosition.y - 48,
          opacity: 1, // Always show cursor
        }}
      >
        <img 
          src={isHovering ? "/Cursor2.png" : "/Cursor.png"}
          alt="Custom Cursor" 
          className="w-24 h-24 object-contain"
          style={{ 
            filter: isHovering 
              ? 'drop-shadow(0 0 12px rgba(255, 215, 0, 0.9)) drop-shadow(0 0 20px rgba(255, 100, 0, 0.5))' 
              : 'drop-shadow(0 0 8px rgba(255, 215, 0, 0.7))',
            imageRendering: 'pixelated',
            transform: isHovering ? 'scale(1.1)' : 'scale(1)',
            transition: 'all 0.2s ease'
          }}
        />
      </div>
      
      {/* Hide default cursor */}
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

export default EnhancedMagicalCursor;