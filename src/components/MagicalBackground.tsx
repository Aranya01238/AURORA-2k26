import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

function WandSparkles() {
  return (
    <Sparkles
      count={100}
      scale={10}
      size={2}
      speed={0.3}
      opacity={0.6}
      color="#d4a574"
    />
  );
}

function FloatingBook({ position, rotation }: { position: [number, number, number]; rotation: [number, number, number] }) {
  const meshRef = useRef<THREE.Group>(null);

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
      <group ref={meshRef} position={position} rotation={rotation}>
        {/* Book cover */}
        <mesh>
          <boxGeometry args={[0.3, 0.4, 0.05]} />
          <meshStandardMaterial color="#8B4513" />
        </mesh>
        {/* Pages */}
        <mesh position={[0, 0, 0.03]}>
          <boxGeometry args={[0.28, 0.38, 0.04]} />
          <meshStandardMaterial color="#f5f5dc" />
        </mesh>
        {/* Spine decoration */}
        <mesh position={[-0.14, 0, 0]}>
          <boxGeometry args={[0.02, 0.4, 0.06]} />
          <meshStandardMaterial color="#d4a574" metalness={0.8} roughness={0.2} />
        </mesh>
      </group>
    </Float>
  );
}

function MagicWand({ position }: { position: [number, number, number] }) {
  const wandRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (wandRef.current) {
      wandRef.current.rotation.z = Math.sin(state.clock.elapsedTime) * 0.1;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.3} floatIntensity={0.8}>
      <group ref={wandRef} position={position} rotation={[0, 0, Math.PI / 4]}>
        {/* Wand body */}
        <mesh>
          <cylinderGeometry args={[0.008, 0.015, 0.4, 16]} />
          <meshStandardMaterial color="#4a3728" />
        </mesh>
        {/* Wand handle */}
        <mesh position={[0, -0.15, 0]}>
          <cylinderGeometry args={[0.015, 0.012, 0.1, 16]} />
          <meshStandardMaterial color="#2d1f14" />
        </mesh>
        {/* Tip glow */}
        <pointLight position={[0, 0.2, 0]} color="#ffd700" intensity={0.5} distance={0.5} />
      </group>
    </Float>
  );
}

function FloatingPotion({ position, color }: { position: [number, number, number]; color: string }) {
  const bottleRef = useRef<THREE.Group>(null);

  return (
    <Float speed={1.2} rotationIntensity={0.4} floatIntensity={0.6}>
      <group ref={bottleRef} position={position}>
        {/* Bottle body */}
        <mesh>
          <cylinderGeometry args={[0.04, 0.05, 0.1, 16]} />
          <meshStandardMaterial color={color} transparent opacity={0.7} />
        </mesh>
        {/* Bottle neck */}
        <mesh position={[0, 0.07, 0]}>
          <cylinderGeometry args={[0.015, 0.02, 0.04, 16]} />
          <meshStandardMaterial color={color} transparent opacity={0.7} />
        </mesh>
        {/* Cork */}
        <mesh position={[0, 0.1, 0]}>
          <cylinderGeometry args={[0.018, 0.018, 0.02, 16]} />
          <meshStandardMaterial color="#8B4513" />
        </mesh>
        {/* Inner glow */}
        <pointLight position={[0, 0, 0]} color={color} intensity={0.2} distance={0.3} />
      </group>
    </Float>
  );
}

function HogwartsShield({ position }: { position: [number, number, number] }) {
  return (
    <Float speed={0.8} rotationIntensity={0.2} floatIntensity={0.4}>
      <group position={position}>
        {/* Shield shape */}
        <mesh>
          <boxGeometry args={[0.25, 0.3, 0.02]} />
          <meshStandardMaterial color="#1a1a2e" metalness={0.6} roughness={0.3} />
        </mesh>
        {/* Gold border */}
        <mesh position={[0, 0, 0.01]}>
          <boxGeometry args={[0.27, 0.32, 0.005]} />
          <meshStandardMaterial color="#d4a574" metalness={0.9} roughness={0.1} />
        </mesh>
        {/* Center emblem */}
        <mesh position={[0, 0, 0.02]}>
          <circleGeometry args={[0.08, 32]} />
          <meshStandardMaterial color="#7c3aed" metalness={0.7} roughness={0.2} />
        </mesh>
      </group>
    </Float>
  );
}

const MagicalBackground = () => {
  return (
    <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 0 }}>
      <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={0.6} />
        <pointLight position={[-10, -10, -10]} color="#7c3aed" intensity={0.4} />
        
        <WandSparkles />
        
        {/* Floating objects */}
        <FloatingBook position={[-3.5, 1, -3]} rotation={[0.2, 0.3, 0.1]} />
        <FloatingBook position={[3.5, -1.5, -4]} rotation={[-0.1, -0.2, 0.15]} />
        
        <MagicWand position={[2.5, 1.5, -2]} />
        <MagicWand position={[-2, -1, -2.5]} />
        
        <FloatingPotion position={[-2.5, 0.5, -2]} color="#22c55e" />
        <FloatingPotion position={[1.5, -0.5, -2]} color="#ef4444" />
        <FloatingPotion position={[0, 1.5, -3]} color="#3b82f6" />
        
        <HogwartsShield position={[0, -2, -4]} />
      </Canvas>
    </div>
  );
};

export default MagicalBackground;
