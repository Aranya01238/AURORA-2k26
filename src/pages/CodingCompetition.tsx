import { Canvas } from '@react-three/fiber';
import { OrbitControls, Text3D, Float, Sparkles, Environment } from '@react-three/drei';
import { Suspense, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Code, Calendar, MapPin, Trophy, Users, Clock, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

// 3D Floating Code Blocks
function CodeBlock({ position, color, code }: { position: [number, number, number], color: string, code: string }) {
  const meshRef = useRef<any>();
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime) * 0.2;
      meshRef.current.rotation.y += 0.01;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={2}>
      <group position={position} ref={meshRef}>
        <mesh>
          <boxGeometry args={[2, 1.5, 0.2]} />
          <meshStandardMaterial color={color} metalness={0.3} roughness={0.4} />
        </mesh>
        {/* Code text effect */}
        <mesh position={[0, 0, 0.11]}>
          <planeGeometry args={[1.8, 1.3]} />
          <meshBasicMaterial color="#00ff00" transparent opacity={0.8} />
        </mesh>
      </group>
    </Float>
  );
}

// 3D Laptop Component
function Laptop3D() {
  const laptopRef = useRef<any>();
  
  useFrame((state) => {
    if (laptopRef.current) {
      laptopRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  return (
    <Float speed={1} rotationIntensity={0.3} floatIntensity={1}>
      <group ref={laptopRef} position={[0, -1, 0]}>
        {/* Laptop base */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[4, 0.3, 3]} />
          <meshStandardMaterial color="#2c3e50" metalness={0.8} roughness={0.2} />
        </mesh>
        
        {/* Laptop screen */}
        <mesh position={[0, 1.5, -1.3]} rotation={[-0.2, 0, 0]}>
          <boxGeometry args={[3.8, 2.5, 0.2]} />
          <meshStandardMaterial color="#1a1a1a" />
        </mesh>
        
        {/* Screen display */}
        <mesh position={[0, 1.5, -1.2]} rotation={[-0.2, 0, 0]}>
          <planeGeometry args={[3.5, 2.2]} />
          <meshBasicMaterial color="#0066cc" />
        </mesh>
        
        {/* Keyboard */}
        <mesh position={[0, 0.2, 0.5]}>
          <boxGeometry args={[3.5, 0.1, 2]} />
          <meshStandardMaterial color="#1a1a1a" />
        </mesh>
      </group>
    </Float>
  );
}

// Binary Rain Effect
function BinaryRain() {
  const count = 50;
  const positions = Array.from({ length: count }, () => [
    (Math.random() - 0.5) * 20,
    Math.random() * 10 + 5,
    (Math.random() - 0.5) * 20
  ]);

  return (
    <>
      {positions.map((position, i) => (
        <Float key={i} speed={2 + Math.random()} rotationIntensity={0} floatIntensity={3}>
          <mesh position={position as [number, number, number]}>
            <boxGeometry args={[0.1, 0.5, 0.1]} />
            <meshBasicMaterial color="#00ff41" transparent opacity={0.7} />
          </mesh>
        </Float>
      ))}
    </>
  );
}

const CodingCompetition = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <Navbar />
      
      {/* Hero Section with 3D Scene */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Canvas camera={{ position: [0, 0, 12], fov: 75 }}>
            <Suspense fallback={null}>
              <Environment preset="night" />
              <ambientLight intensity={0.4} />
              <pointLight position={[10, 10, 10]} intensity={1} color="#00ff41" />
              <spotLight position={[-10, -10, -10]} angle={0.15} penumbra={1} intensity={0.5} color="#0066cc" />
              
              <Laptop3D />
              <CodeBlock position={[-5, 2, 2]} color="#e74c3c" code="function magic()" />
              <CodeBlock position={[5, 1, -2]} color="#3498db" code="const wizard = {}" />
              <CodeBlock position={[3, -2, 3]} color="#2ecc71" code="if (spell.works)" />
              <CodeBlock position={[-3, -1, -3]} color="#f39c12" code="return victory;" />
              
              <BinaryRain />
              <Sparkles count={100} scale={15} size={3} speed={0.5} color="#00ff41" />
              <OrbitControls enableZoom={false} enablePan={false} />
            </Suspense>
          </Canvas>
        </div>
        
        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
          <Badge className="mb-4 bg-blue-600 hover:bg-blue-700">
            <Code className="w-4 h-4 mr-2" />
            Day 2 - February 24th
          </Badge>
          <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">
            Coding Competition
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-300">
            Cast your programming spells and solve challenging problems. Let your code create magic!
          </p>
          <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
            Register Now
          </Button>
        </div>
      </section>

      {/* Event Details */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Event Information */}
            <div className="space-y-8">
              <Card className="bg-black/20 backdrop-blur-sm border-blue-500/30">
                <CardHeader>
                  <CardTitle className="text-2xl text-white flex items-center gap-2">
                    <Code className="w-6 h-6 text-blue-500" />
                    Competition Overview
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-gray-300 space-y-4">
                  <p>
                    A thrilling coding competition where participants solve algorithmic challenges, 
                    debug complex problems, and showcase their programming prowess. From data structures 
                    to dynamic programming, test your skills across multiple domains.
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-blue-500" />
                      <span>February 24th, 2024</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-blue-500" />
                      <span>Computer Lab</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-5 h-5 text-blue-500" />
                      <span>Individual</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-5 h-5 text-blue-500" />
                      <span>3 Hours</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-black/20 backdrop-blur-sm border-blue-500/30">
                <CardHeader>
                  <CardTitle className="text-2xl text-white">Competition Format</CardTitle>
                </CardHeader>
                <CardContent className="text-gray-300">
                  <div className="space-y-4">
                    <div className="p-4 bg-blue-500/10 rounded-lg">
                      <h4 className="font-semibold text-blue-400 mb-2">Round 1: Quick Fire (30 mins)</h4>
                      <p className="text-sm">5 easy to medium problems - speed matters!</p>
                    </div>
                    <div className="p-4 bg-green-500/10 rounded-lg">
                      <h4 className="font-semibold text-green-400 mb-2">Round 2: Algorithm Arena (90 mins)</h4>
                      <p className="text-sm">3 challenging algorithmic problems</p>
                    </div>
                    <div className="p-4 bg-purple-500/10 rounded-lg">
                      <h4 className="font-semibold text-purple-400 mb-2">Round 3: Debug Challenge (60 mins)</h4>
                      <p className="text-sm">Find and fix bugs in complex codebases</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-black/20 backdrop-blur-sm border-blue-500/30">
                <CardHeader>
                  <CardTitle className="text-2xl text-white">Supported Languages</CardTitle>
                </CardHeader>
                <CardContent className="text-gray-300">
                  <div className="grid grid-cols-3 gap-3">
                    {['Python', 'Java', 'C++', 'JavaScript', 'C#', 'Go', 'Rust', 'Kotlin', 'Swift'].map((lang) => (
                      <div key={lang} className="p-2 bg-blue-500/10 rounded text-center text-blue-400">
                        {lang}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Timeline & Prizes */}
            <div className="space-y-8">
              <Card className="bg-black/20 backdrop-blur-sm border-blue-500/30">
                <CardHeader>
                  <CardTitle className="text-2xl text-white">Event Timeline</CardTitle>
                </CardHeader>
                <CardContent className="text-gray-300">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-blue-500/10 rounded-lg">
                      <span>Registration & Setup</span>
                      <span className="text-blue-400">9:00 AM - 9:30 AM</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-blue-500/10 rounded-lg">
                      <span>Round 1: Quick Fire</span>
                      <span className="text-blue-400">10:00 AM - 10:30 AM</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-green-500/10 rounded-lg">
                      <span>Round 2: Algorithm Arena</span>
                      <span className="text-green-400">11:00 AM - 12:30 PM</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-orange-500/10 rounded-lg">
                      <span>Lunch Break</span>
                      <span className="text-orange-400">12:30 PM - 1:30 PM</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-purple-500/10 rounded-lg">
                      <span>Round 3: Debug Challenge</span>
                      <span className="text-purple-400">1:30 PM - 2:30 PM</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-yellow-500/10 rounded-lg">
                      <span>Results & Awards</span>
                      <span className="text-yellow-400">3:00 PM</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-black/20 backdrop-blur-sm border-yellow-500/30">
                <CardHeader>
                  <CardTitle className="text-2xl text-white flex items-center gap-2">
                    <Trophy className="w-6 h-6 text-yellow-500" />
                    Prizes & Recognition
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-gray-300">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-yellow-500/10 rounded-lg">
                      <span className="font-semibold">🥇 Code Wizard</span>
                      <span className="text-yellow-400">₹30,000</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-500/10 rounded-lg">
                      <span className="font-semibold">🥈 Algorithm Master</span>
                      <span className="text-gray-400">₹20,000</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-orange-500/10 rounded-lg">
                      <span className="font-semibold">🥉 Debug Champion</span>
                      <span className="text-orange-400">₹10,000</span>
                    </div>
                    <div className="text-center mt-4 p-3 bg-blue-500/10 rounded-lg">
                      <span className="text-blue-400">Special prizes for fastest solutions & creative approaches</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-black/20 backdrop-blur-sm border-green-500/30">
                <CardHeader>
                  <CardTitle className="text-2xl text-white flex items-center gap-2">
                    <Zap className="w-6 h-6 text-green-500" />
                    What to Bring
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-gray-300">
                  <ul className="space-y-2 list-disc list-inside">
                    <li>Your laptop with preferred IDE/editor</li>
                    <li>Charger and backup power bank</li>
                    <li>Valid student ID for verification</li>
                    <li>Water bottle and light snacks</li>
                    <li>Positive attitude and problem-solving mindset!</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center mt-16">
            <div className="space-y-4">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white mr-4">
                Register for Competition
              </Button>
              <Link to="/">
                <Button variant="outline" size="lg" className="border-blue-500 text-blue-400 hover:bg-blue-500/10">
                  Back to Events
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CodingCompetition;