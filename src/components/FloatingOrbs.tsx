import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

interface OrbProps {
  position: [number, number, number];
  color: string;
  speed: number;
  distort: number;
  size: number;
}

function Orb({ position, color, speed, distort, size }: OrbProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const initialY = position[1];

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = initialY + Math.sin(state.clock.elapsedTime * speed) * 0.3;
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2;
      meshRef.current.rotation.z = state.clock.elapsedTime * 0.1;
    }
  });

  return (
    <Sphere ref={meshRef} args={[size, 32, 32]} position={position}>
      <MeshDistortMaterial
        color={color}
        attach="material"
        distort={distort}
        speed={2}
        roughness={0.2}
        metalness={0.8}
        transparent
        opacity={0.6}
      />
    </Sphere>
  );
}

function GoldenSnitch({ position }: { position: [number, number, number] }) {
  const groupRef = useRef<THREE.Group>(null);
  const initialPos = [...position];

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.position.x = initialPos[0] + Math.sin(state.clock.elapsedTime * 2) * 0.5;
      groupRef.current.position.y = initialPos[1] + Math.sin(state.clock.elapsedTime * 1.5) * 0.3;
      groupRef.current.position.z = initialPos[2] + Math.cos(state.clock.elapsedTime * 1.8) * 0.2;
      groupRef.current.rotation.y = state.clock.elapsedTime * 3;
    }
  });

  return (
    <group ref={groupRef} position={position}>
      <Sphere args={[0.08, 32, 32]}>
        <meshStandardMaterial color="#ffd700" metalness={1} roughness={0.1} />
      </Sphere>
      {/* Wings */}
      <mesh position={[0.12, 0, 0]} rotation={[0, 0, Math.PI / 6]}>
        <planeGeometry args={[0.15, 0.08]} />
        <meshStandardMaterial color="#ffffff" transparent opacity={0.5} side={THREE.DoubleSide} />
      </mesh>
      <mesh position={[-0.12, 0, 0]} rotation={[0, 0, -Math.PI / 6]}>
        <planeGeometry args={[0.15, 0.08]} />
        <meshStandardMaterial color="#ffffff" transparent opacity={0.5} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}

function FloatingCandle({ position }: { position: [number, number, number] }) {
  const candleRef = useRef<THREE.Group>(null);
  const flameRef = useRef<THREE.Mesh>(null);
  const initialY = position[1];

  useFrame((state) => {
    if (candleRef.current) {
      candleRef.current.position.y = initialY + Math.sin(state.clock.elapsedTime * 0.5 + position[0]) * 0.1;
    }
    if (flameRef.current) {
      flameRef.current.scale.y = 1 + Math.sin(state.clock.elapsedTime * 8) * 0.2;
    }
  });

  return (
    <group ref={candleRef} position={position}>
      {/* Candle body */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.02, 0.025, 0.15, 16]} />
        <meshStandardMaterial color="#f5f5dc" />
      </mesh>
      {/* Flame */}
      <mesh ref={flameRef} position={[0, 0.1, 0]}>
        <coneGeometry args={[0.015, 0.05, 8]} />
        <meshBasicMaterial color="#ff9500" />
      </mesh>
      {/* Glow */}
      <pointLight position={[0, 0.1, 0]} color="#ff9500" intensity={0.3} distance={0.5} />
    </group>
  );
}

const FloatingOrbs = () => {
  return (
    <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 1 }}>
      <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={0.5} />
        <pointLight position={[-10, -10, -10]} color="#7c3aed" intensity={0.3} />
        
        {/* Magical orbs */}
        <Orb position={[-3, 1, -2]} color="#7c3aed" speed={0.8} distort={0.4} size={0.3} />
        <Orb position={[3, -1, -1]} color="#d4a574" speed={1} distort={0.3} size={0.25} />
        <Orb position={[-2, -2, -3]} color="#4c1d95" speed={0.6} distort={0.5} size={0.2} />
        <Orb position={[2.5, 2, -2]} color="#fbbf24" speed={0.9} distort={0.35} size={0.22} />
        
        {/* Golden Snitches */}
        <GoldenSnitch position={[1.5, 0.5, -1]} />
        <GoldenSnitch position={[-1.8, -0.8, -1.5]} />
        
        {/* Floating Candles */}
        <FloatingCandle position={[-1, 1.5, -2]} />
        <FloatingCandle position={[0.5, 2, -2.5]} />
        <FloatingCandle position={[1.8, 1.2, -1.8]} />
        <FloatingCandle position={[-0.8, 1.8, -2.2]} />
        <FloatingCandle position={[0, 1.3, -2]} />
      </Canvas>
    </div>
  );
};

export default FloatingOrbs;
