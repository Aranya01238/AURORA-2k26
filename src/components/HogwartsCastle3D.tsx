import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sparkles, Stars } from '@react-three/drei';
import * as THREE from 'three';

// Main Hogwarts Castle Component
function HogwartsCastle() {
  const castleRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (castleRef.current) {
      // Gentle rotation and floating
      castleRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.05;
      castleRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.2;
    }
  });

  return (
    <Float speed={0.5} rotationIntensity={0.1} floatIntensity={0.3}>
      <group ref={castleRef} position={[0, -3, -12]} scale={1.2}>
        {/* Main Castle Foundation */}
        <mesh position={[0, -2, 0]}>
          <boxGeometry args={[8, 3, 6]} />
          <meshStandardMaterial color="#3a3a3a" />
        </mesh>
        
        {/* Castle Walls */}
        <mesh position={[-3, 0, 2]}>
          <boxGeometry args={[2, 4, 1]} />
          <meshStandardMaterial color="#4a4a4a" />
        </mesh>
        <mesh position={[3, 0, 2]}>
          <boxGeometry args={[2, 4, 1]} />
          <meshStandardMaterial color="#4a4a4a" />
        </mesh>
        <mesh position={[-3, 0, -2]}>
          <boxGeometry args={[2, 4, 1]} />
          <meshStandardMaterial color="#4a4a4a" />
        </mesh>
        <mesh position={[3, 0, -2]}>
          <boxGeometry args={[2, 4, 1]} />
          <meshStandardMaterial color="#4a4a4a" />
        </mesh>

        {/* Central Great Hall */}
        <mesh position={[0, 1, 0]}>
          <boxGeometry args={[6, 6, 4]} />
          <meshStandardMaterial color="#5a5a5a" />
        </mesh>

        {/* Great Hall Roof */}
        <mesh position={[0, 4.5, 0]}>
          <coneGeometry args={[4, 2, 4]} />
          <meshStandardMaterial color="#8B4513" />
        </mesh>

        {/* Main Tower (Astronomy Tower) */}
        <mesh position={[0, 6, 0]}>
          <cylinderGeometry args={[1.2, 1.5, 8, 12]} />
          <meshStandardMaterial color="#6a6a6a" />
        </mesh>

        {/* Main Tower Roof */}
        <mesh position={[0, 10.5, 0]}>
          <coneGeometry args={[1.8, 3, 12]} />
          <meshStandardMaterial color="#8B4513" />
        </mesh>

        {/* Gryffindor Tower */}
        <mesh position={[-4, 4, 3]}>
          <cylinderGeometry args={[0.8, 1, 6, 8]} />
          <meshStandardMaterial color="#722F37" />
        </mesh>
        <mesh position={[-4, 7.5, 3]}>
          <coneGeometry args={[1.2, 2, 8]} />
          <meshStandardMaterial color="#D3A625" />
        </mesh>

        {/* Ravenclaw Tower */}
        <mesh position={[4, 4, 3]}>
          <cylinderGeometry args={[0.8, 1, 6, 8]} />
          <meshStandardMaterial color="#0E1A40" />
        </mesh>
        <mesh position={[4, 7.5, 3]}>
          <coneGeometry args={[1.2, 2, 8]} />
          <meshStandardMaterial color="#946B2D" />
        </mesh>

        {/* Slytherin Tower */}
        <mesh position={[-4, 4, -3]}>
          <cylinderGeometry args={[0.8, 1, 6, 8]} />
          <meshStandardMaterial color="#1A472A" />
        </mesh>
        <mesh position={[-4, 7.5, -3]}>
          <coneGeometry args={[1.2, 2, 8]} />
          <meshStandardMaterial color="#5D5D5D" />
        </mesh>

        {/* Hufflepuff Tower */}
        <mesh position={[4, 4, -3]}>
          <cylinderGeometry args={[0.8, 1, 6, 8]} />
          <meshStandardMaterial color="#FFDB00" />
        </mesh>
        <mesh position={[4, 7.5, -3]}>
          <coneGeometry args={[1.2, 2, 8]} />
          <meshStandardMaterial color="#000000" />
        </mesh>

        {/* Clock Tower */}
        <mesh position={[-6, 3, 0]}>
          <cylinderGeometry args={[1, 1.2, 5, 8]} />
          <meshStandardMaterial color="#5a5a5a" />
        </mesh>
        <mesh position={[-6, 6, 0]}>
          <coneGeometry args={[1.5, 2, 8]} />
          <meshStandardMaterial color="#8B4513" />
        </mesh>

        {/* Defense Against Dark Arts Tower */}
        <mesh position={[6, 3, 0]}>
          <cylinderGeometry args={[1, 1.2, 5, 8]} />
          <meshStandardMaterial color="#2F2F2F" />
        </mesh>
        <mesh position={[6, 6, 0]}>
          <coneGeometry args={[1.5, 2, 8]} />
          <meshStandardMaterial color="#4A4A4A" />
        </mesh>

        {/* Castle Windows - Glowing */}
        {/* Great Hall Windows */}
        {Array.from({ length: 8 }).map((_, i) => (
          <mesh key={`window-${i}`} position={[
            (i % 4 - 1.5) * 1.5,
            1 + Math.floor(i / 4) * 2,
            2.1
          ]}>
            <boxGeometry args={[0.3, 0.8, 0.1]} />
            <meshBasicMaterial color="#FFD700" />
          </mesh>
        ))}

        {/* Tower Windows */}
        {Array.from({ length: 16 }).map((_, i) => {
          const angle = (i / 16) * Math.PI * 2;
          const radius = 1.3;
          return (
            <mesh key={`tower-window-${i}`} position={[
              Math.cos(angle) * radius,
              6 + (i % 4) * 1.5,
              Math.sin(angle) * radius
            ]}>
              <boxGeometry args={[0.2, 0.4, 0.05]} />
              <meshBasicMaterial color="#FFD700" />
            </mesh>
          );
        })}

        {/* Castle Flags */}
        <mesh position={[0, 12.5, 0]}>
          <boxGeometry args={[0.6, 0.4, 0.02]} />
          <meshStandardMaterial color="#722F37" />
        </mesh>
        <mesh position={[-4, 8.5, 3]}>
          <boxGeometry args={[0.4, 0.3, 0.02]} />
          <meshStandardMaterial color="#D3A625" />
        </mesh>
        <mesh position={[4, 8.5, 3]}>
          <boxGeometry args={[0.4, 0.3, 0.02]} />
          <meshStandardMaterial color="#946B2D" />
        </mesh>

        {/* Entrance Gates */}
        <mesh position={[0, -0.5, 3.1]}>
          <boxGeometry args={[2, 3, 0.2]} />
          <meshStandardMaterial color="#8B4513" />
        </mesh>

        {/* Bridge */}
        <mesh position={[0, -2.5, 5]}>
          <boxGeometry args={[3, 0.3, 2]} />
          <meshStandardMaterial color="#8B4513" />
        </mesh>

        {/* Magical Lighting */}
        <pointLight position={[0, 8, 0]} color="#FFD700" intensity={2} distance={20} />
        <pointLight position={[-4, 6, 3]} color="#D3A625" intensity={1} distance={10} />
        <pointLight position={[4, 6, 3]} color="#0E1A40" intensity={1} distance={10} />
        <pointLight position={[-4, 6, -3]} color="#1A472A" intensity={1} distance={10} />
        <pointLight position={[4, 6, -3]} color="#FFDB00" intensity={1} distance={10} />
        
        {/* Ambient castle glow */}
        <pointLight position={[0, 2, 0]} color="#FFD700" intensity={0.8} distance={25} />
      </group>
    </Float>
  );
}

// Flying Creatures around the castle
function FlyingCreature({ position, color, speed }: { position: [number, number, number], color: string, speed: number }) {
  const creatureRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (creatureRef.current) {
      const time = state.clock.elapsedTime * speed;
      creatureRef.current.position.x = position[0] + Math.cos(time) * 4;
      creatureRef.current.position.y = position[1] + Math.sin(time * 0.7) * 2;
      creatureRef.current.position.z = position[2] + Math.sin(time) * 3;
      creatureRef.current.rotation.y = time + Math.PI / 2;
    }
  });

  return (
    <group ref={creatureRef} position={position}>
      <mesh>
        <sphereGeometry args={[0.2, 8, 8]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.3} />
      </mesh>
      <pointLight position={[0, 0, 0]} color={color} intensity={0.5} distance={3} />
    </group>
  );
}

// Floating Magical Elements
function MagicalOrb({ position, color }: { position: [number, number, number], color: string }) {
  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={2}>
      <group position={position}>
        <mesh>
          <sphereGeometry args={[0.3, 16, 16]} />
          <meshStandardMaterial color={color} transparent opacity={0.7} emissive={color} emissiveIntensity={0.4} />
        </mesh>
        <pointLight position={[0, 0, 0]} color={color} intensity={0.8} distance={5} />
      </group>
    </Float>
  );
}

const HogwartsCastle3D = () => {
  return (
    <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 0 }}>
      <Canvas camera={{ position: [0, 2, 15], fov: 60 }}>
        {/* Enhanced Lighting Setup */}
        <ambientLight intensity={0.2} />
        <directionalLight position={[10, 20, 10]} intensity={0.8} color="#FFD700" castShadow />
        <pointLight position={[-10, 10, -10]} color="#4c1d95" intensity={0.6} />
        <spotLight 
          position={[0, 25, 0]} 
          angle={0.4} 
          penumbra={1} 
          intensity={1.5} 
          color="#FFD700" 
          castShadow 
        />
        
        {/* Starry Night Sky */}
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        
        {/* Main Hogwarts Castle */}
        <HogwartsCastle />
        
        {/* Flying Magical Creatures */}
        <FlyingCreature position={[8, 5, -5]} color="#ff4500" speed={0.5} />
        <FlyingCreature position={[-8, 3, -3]} color="#00ff88" speed={0.7} />
        <FlyingCreature position={[5, 8, -8]} color="#ff69b4" speed={0.3} />
        
        {/* Floating Magical Orbs */}
        <MagicalOrb position={[-10, 4, -5]} color="#9333ea" />
        <MagicalOrb position={[10, 6, -7]} color="#06b6d4" />
        <MagicalOrb position={[-6, 8, -10]} color="#f59e0b" />
        <MagicalOrb position={[6, 2, -4]} color="#ef4444" />
        
        {/* Enhanced Magical Sparkles */}
        <Sparkles count={200} scale={25} size={3} speed={0.4} color="#FFD700" />
        
        {/* Additional atmospheric sparkles */}
        <Float speed={0.3} rotationIntensity={0} floatIntensity={0.5}>
          <Sparkles count={100} scale={30} size={2} speed={0.2} color="#9333ea" />
        </Float>
        
        <Float speed={0.8} rotationIntensity={0} floatIntensity={0.8}>
          <Sparkles count={80} scale={20} size={1.5} speed={0.6} color="#06b6d4" />
        </Float>
      </Canvas>
    </div>
  );
};

export default HogwartsCastle3D;