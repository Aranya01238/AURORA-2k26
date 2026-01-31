import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sparkles, MeshReflectorMaterial } from '@react-three/drei';
import * as THREE from 'three';

// Floating Magical Book Component
function FloatingBook({ position, rotation }: { position: [number, number, number]; rotation: [number, number, number] }) {
  const meshRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

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

// Magic Wand Component
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

// Floating Potion Component
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

// Hogwarts House Shield Component
function HogwartsShield({ position, house }: { position: [number, number, number], house: 'gryffindor' | 'slytherin' | 'ravenclaw' | 'hufflepuff' }) {
  const colors = {
    gryffindor: { primary: '#722F37', secondary: '#D3A625' },
    slytherin: { primary: '#1A472A', secondary: '#5D5D5D' },
    ravenclaw: { primary: '#0E1A40', secondary: '#946B2D' },
    hufflepuff: { primary: '#FFDB00', secondary: '#000000' }
  };

  return (
    <Float speed={0.8} rotationIntensity={0.2} floatIntensity={0.4}>
      <group position={position}>
        {/* Shield shape */}
        <mesh>
          <boxGeometry args={[0.25, 0.3, 0.02]} />
          <meshStandardMaterial color={colors[house].primary} metalness={0.6} roughness={0.3} />
        </mesh>
        {/* Gold border */}
        <mesh position={[0, 0, 0.01]}>
          <boxGeometry args={[0.27, 0.32, 0.005]} />
          <meshStandardMaterial color="#d4a574" metalness={0.9} roughness={0.1} />
        </mesh>
        {/* Center emblem */}
        <mesh position={[0, 0, 0.02]}>
          <circleGeometry args={[0.08, 32]} />
          <meshStandardMaterial color={colors[house].secondary} metalness={0.7} roughness={0.2} />
        </mesh>
      </group>
    </Float>
  );
}

// Flying Golden Snitch Component
function GoldenSnitch({ position }: { position: [number, number, number] }) {
  const snitchRef = useRef<THREE.Group>(null);
  const wingRef1 = useRef<THREE.Mesh>(null);
  const wingRef2 = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (snitchRef.current) {
      // Snitch flying in erratic pattern
      const time = state.clock.elapsedTime;
      snitchRef.current.position.x = position[0] + Math.sin(time * 2) * 1.5;
      snitchRef.current.position.y = position[1] + Math.cos(time * 1.5) * 1;
      snitchRef.current.position.z = position[2] + Math.sin(time * 1.3) * 0.8;
      
      snitchRef.current.rotation.y = time * 2;
    }
    
    // Wing flapping
    if (wingRef1.current && wingRef2.current) {
      const wingFlap = Math.sin(state.clock.elapsedTime * 12) * 0.8;
      wingRef1.current.rotation.y = wingFlap;
      wingRef2.current.rotation.y = -wingFlap;
    }
  });

  return (
    <group ref={snitchRef} position={position}>
      {/* Snitch Body */}
      <mesh>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial color="#ffd700" metalness={0.9} roughness={0.1} />
      </mesh>
      
      {/* Snitch Wings */}
      <mesh ref={wingRef1} position={[0, 0, 0.1]}>
        <boxGeometry args={[0.02, 0.15, 0.08]} />
        <meshStandardMaterial color="#ffffff" transparent opacity={0.7} />
      </mesh>
      <mesh ref={wingRef2} position={[0, 0, -0.1]}>
        <boxGeometry args={[0.02, 0.15, 0.08]} />
        <meshStandardMaterial color="#ffffff" transparent opacity={0.7} />
      </mesh>
      
      {/* Golden Glow */}
      <pointLight position={[0, 0, 0]} color="#ffd700" intensity={0.3} distance={2} />
    </group>
  );
}

// Dementor Component
function Dementor({ position }: { position: [number, number, number] }) {
  const dementorRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (dementorRef.current) {
      // Slow, ominous movement
      const time = state.clock.elapsedTime * 0.3;
      dementorRef.current.position.y = position[1] + Math.sin(time) * 0.5;
      dementorRef.current.rotation.y = Math.sin(time * 0.5) * 0.2;
    }
  });

  return (
    <Float speed={0.5} rotationIntensity={0.1} floatIntensity={0.8}>
      <group ref={dementorRef} position={position}>
        {/* Dementor Body */}
        <mesh>
          <coneGeometry args={[0.8, 2, 8]} />
          <meshStandardMaterial color="#000000" transparent opacity={0.7} />
        </mesh>
        
        {/* Dementor Hood */}
        <mesh position={[0, 1.2, 0]}>
          <sphereGeometry args={[0.4, 16, 16]} />
          <meshStandardMaterial color="#111111" transparent opacity={0.8} />
        </mesh>
        
        {/* Dark Aura */}
        <Sparkles count={15} scale={3} size={1} speed={0.5} color="#444444" />
      </group>
    </Float>
  );
}

// Environment Component with Reflective Lake
function Environment() {
  return (
    <>
      {/* Dark Lake Surface for Reflections */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -5, 0]}>
        <planeGeometry args={[100, 100]} />
        <MeshReflectorMaterial
          blur={[300, 100]}
          resolution={1024}
          mixBlur={1}
          mixStrength={40}
          roughness={1}
          depthScale={1.2}
          minDepthThreshold={0.4}
          maxDepthThreshold={1.4}
          color="#050505"
          metalness={0.5}
          mirror={0.5}
        />
      </mesh>
      
      {/* Mountain Silhouettes */}
      <mesh position={[-20, 0, -30]}>
        <coneGeometry args={[8, 15, 8]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>
      <mesh position={[15, 0, -25]}>
        <coneGeometry args={[6, 12, 8]} />
        <meshStandardMaterial color="#2a2a2a" />
      </mesh>
      <mesh position={[0, 0, -35]}>
        <coneGeometry args={[10, 18, 8]} />
        <meshStandardMaterial color="#0a0a0a" />
      </mesh>
    </>
  );
}

const HarryPotterBackground = () => {
  return (
    <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 0 }}>
      <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
        {/* Lighting Setup */}
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={0.6} />
        <pointLight position={[-10, -10, -10]} color="#7c3aed" intensity={0.4} />
        <directionalLight position={[0, 10, 5]} intensity={0.8} color="#ffd700" />
        
        {/* Environment */}
        <Environment />
        
        {/* Floating Magical Objects */}
        <FloatingBook position={[-3.5, 1, -3]} rotation={[0.2, 0.3, 0.1]} />
        <FloatingBook position={[3.5, -1.5, -4]} rotation={[-0.1, -0.2, 0.15]} />
        
        <MagicWand position={[2.5, 1.5, -2]} />
        <MagicWand position={[-2, -1, -2.5]} />
        
        <FloatingPotion position={[-2.5, 0.5, -2]} color="#22c55e" />
        <FloatingPotion position={[1.5, -0.5, -2]} color="#ef4444" />
        <FloatingPotion position={[0, 1.5, -3]} color="#3b82f6" />
        
        {/* Hogwarts House Shields */}
        <HogwartsShield position={[-4, 2, -5]} house="gryffindor" />
        <HogwartsShield position={[4, 1, -4]} house="slytherin" />
        <HogwartsShield position={[-3, -2, -6]} house="ravenclaw" />
        <HogwartsShield position={[3, -1, -5]} house="hufflepuff" />
        
        {/* Flying Golden Snitches */}
        <GoldenSnitch position={[-3, 2, -2]} />
        <GoldenSnitch position={[4, -1, -4]} />
        
        {/* Dementor in the distance */}
        <Dementor position={[-6, 0, -10]} />
        
        {/* Magical Sparkles */}
        <Sparkles count={150} scale={15} size={2} speed={0.3} color="#ffd700" />
        
        {/* Additional atmospheric sparkles */}
        <Float speed={0.5} rotationIntensity={0} floatIntensity={0.5}>
          <Sparkles count={80} scale={20} size={1} speed={0.2} color="#9333ea" />
        </Float>
      </Canvas>
    </div>
  );
};

export default HarryPotterBackground;