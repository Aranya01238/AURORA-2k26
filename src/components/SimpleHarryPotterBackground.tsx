import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sparkles } from '@react-three/drei';

// Simple Castle Component
function SimpleCastle() {
  return (
    <Float speed={0.5} rotationIntensity={0.1} floatIntensity={0.3}>
      <group position={[0, -2, -8]} scale={0.6}>
        {/* Main Castle Base */}
        <mesh position={[0, -1, 0]}>
          <boxGeometry args={[4, 2, 3]} />
          <meshStandardMaterial color="#4a4a4a" />
        </mesh>
        
        {/* Central Tower */}
        <mesh position={[0, 1, 0]}>
          <cylinderGeometry args={[0.8, 1, 4, 8]} />
          <meshStandardMaterial color="#5a5a5a" />
        </mesh>
        
        {/* Tower Roof */}
        <mesh position={[0, 3.5, 0]}>
          <coneGeometry args={[1.2, 1.5, 8]} />
          <meshStandardMaterial color="#8B4513" />
        </mesh>
        
        {/* Magical Glow */}
        <pointLight position={[0, 2, 0]} color="#ffd700" intensity={0.5} distance={8} />
      </group>
    </Float>
  );
}

// Simple Phoenix Component
function SimplePhoenix() {
  const phoenixRef = useRef<any>();

  useFrame((state) => {
    if (phoenixRef.current) {
      const time = state.clock.elapsedTime * 0.5;
      phoenixRef.current.position.x = Math.cos(time) * 3;
      phoenixRef.current.position.y = 1 + Math.sin(time * 0.7) * 1;
      phoenixRef.current.position.z = -3 + Math.sin(time) * 2;
      phoenixRef.current.rotation.y = time + Math.PI / 2;
    }
  });

  return (
    <group ref={phoenixRef}>
      {/* Phoenix Body */}
      <mesh>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshStandardMaterial color="#ff4500" emissive="#ff2200" emissiveIntensity={0.3} />
      </mesh>
      
      {/* Phoenix Light */}
      <pointLight position={[0, 0, 0]} color="#ff4500" intensity={1} distance={5} />
    </group>
  );
}

const SimpleHarryPotterBackground = () => {
  return (
    <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 0 }}>
      <Canvas camera={{ position: [0, 0, 8], fov: 75 }}>
        {/* Basic Lighting */}
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={0.8} color="#ffd700" />
        
        {/* Simple Castle */}
        <SimpleCastle />
        
        {/* Simple Phoenix */}
        <SimplePhoenix />
        
        {/* Basic Sparkles */}
        <Sparkles count={50} scale={10} size={2} speed={0.3} color="#ffd700" />
      </Canvas>
    </div>
  );
};

export default SimpleHarryPotterBackground;