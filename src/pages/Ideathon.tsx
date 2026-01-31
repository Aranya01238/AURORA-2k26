import { Canvas } from '@react-three/fiber';
import { OrbitControls, Text3D, Float, Sparkles, Environment } from '@react-three/drei';
import { Suspense, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Lightbulb, Calendar, MapPin, Trophy, Users, Clock, Rocket, Zap, Target } from 'lucide-react';
import { Link } from 'react-router-dom';

// 3D Light Bulb Component
function LightBulb3D({ position, glowing = false }: { position: [number, number, number], glowing?: boolean }) {
  const bulbRef = useRef<any>();
  
  useFrame((state) => {
    if (bulbRef.current) {
      bulbRef.current.rotation.y += 0.01;
      bulbRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + position[0]) * 0.2;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={2}>
      <group ref={bulbRef} position={position}>
        {/* Bulb glass */}
        <mesh>
          <sphereGeometry args={[1, 16, 16]} />
          <meshStandardMaterial 
            color={glowing ? "#ffff00" : "#ffffff"} 
            transparent 
            opacity={0.8}
            emissive={glowing ? "#ffff00" : "#000000"}
            emissiveIntensity={glowing ? 0.5 : 0}
          />
        </mesh>
        
        {/* Filament */}
        <mesh>
          <torusGeometry args={[0.3, 0.05, 8, 16]} />
          <meshStandardMaterial color="#ff6600" emissive="#ff6600" emissiveIntensity={0.3} />
        </mesh>
        
        {/* Base */}
        <mesh position={[0, -1.2, 0]}>
          <cylinderGeometry args={[0.6, 0.6, 0.8, 16]} />
          <meshStandardMaterial color="#2c3e50" metalness={0.8} roughness={0.2} />
        </mesh>
        
        {/* Screw threads */}
        {Array.from({ length: 5 }).map((_, i) => (
          <mesh key={i} position={[0, -1.2 + i * 0.15, 0]}>
            <torusGeometry args={[0.65, 0.02, 8, 16]} />
            <meshStandardMaterial color="#34495e" />
          </mesh>
        ))}
        
        {glowing && (
          <pointLight position={[0, 0, 0]} intensity={2} color="#ffff00" distance={10} />
        )}
      </group>
    </Float>
  );
}

// 3D Gear Component
function Gear3D({ position, size = 1 }: { position: [number, number, number], size?: number }) {
  const gearRef = useRef<any>();
  
  useFrame((state) => {
    if (gearRef.current) {
      gearRef.current.rotation.z += 0.02;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <group ref={gearRef} position={position} scale={size}>
        {/* Main gear body */}
        <mesh>
          <cylinderGeometry args={[2, 2, 0.5, 12]} />
          <meshStandardMaterial color="#e67e22" metalness={0.7} roughness={0.3} />
        </mesh>
        
        {/* Gear teeth */}
        {Array.from({ length: 12 }).map((_, i) => (
          <mesh key={i} position={[
            Math.cos(i * Math.PI / 6) * 2.3,
            0,
            Math.sin(i * Math.PI / 6) * 2.3
          ]}>
            <boxGeometry args={[0.3, 0.6, 0.8]} />
            <meshStandardMaterial color="#d35400" metalness={0.7} roughness={0.3} />
          </mesh>
        ))}
        
        {/* Center hole */}
        <mesh>
          <cylinderGeometry args={[0.5, 0.5, 0.6, 16]} />
          <meshStandardMaterial color="#2c3e50" />
        </mesh>
      </group>
    </Float>
  );
}

// 3D Rocket Component
function Rocket3D() {
  const rocketRef = useRef<any>();
  
  useFrame((state) => {
    if (rocketRef.current) {
      rocketRef.current.rotation.z = Math.sin(state.clock.elapsedTime) * 0.1;
      rocketRef.current.position.y = Math.sin(state.clock.elapsedTime * 2) * 0.3;
    }
  });

  return (
    <Float speed={1} rotationIntensity={0.2} floatIntensity={1}>
      <group ref={rocketRef} position={[6, 2, -3]}>
        {/* Rocket body */}
        <mesh>
          <cylinderGeometry args={[0.8, 0.8, 4, 16]} />
          <meshStandardMaterial color="#e74c3c" metalness={0.6} roughness={0.3} />
        </mesh>
        
        {/* Rocket nose */}
        <mesh position={[0, 2.5, 0]}>
          <coneGeometry args={[0.8, 1, 16]} />
          <meshStandardMaterial color="#c0392b" metalness={0.6} roughness={0.3} />
        </mesh>
        
        {/* Rocket fins */}
        {Array.from({ length: 3 }).map((_, i) => (
          <mesh key={i} position={[
            Math.cos(i * 2 * Math.PI / 3) * 1.2,
            -2.5,
            Math.sin(i * 2 * Math.PI / 3) * 1.2
          ]} rotation={[0, i * 2 * Math.PI / 3, 0]}>
            <boxGeometry args={[0.3, 1, 0.8]} />
            <meshStandardMaterial color="#2c3e50" metalness={0.8} roughness={0.2} />
          </mesh>
        ))}
        
        {/* Rocket flame */}
        <mesh position={[0, -3, 0]}>
          <coneGeometry args={[0.5, 1.5, 8]} />
          <meshBasicMaterial color="#ff6600" />
        </mesh>
        
        <pointLight position={[0, -3, 0]} intensity={1} color="#ff6600" distance={5} />
      </group>
    </Float>
  );
}

const Ideathon = () => {
  const bulbPositions: [number, number, number][] = [
    [-6, 3, 2], [6, 2, -2], [-4, 4, -3], [4, 1, 3], [-2, 5, 1]
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-orange-900 to-slate-900">
      <Navbar />
      
      {/* Hero Section with Split Layout */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center min-h-screen">
            {/* Left Side - Event Information */}
            <div className="text-white space-y-6 z-10 relative pr-8">
              <Badge className="mb-4 bg-orange-600 hover:bg-orange-700 w-fit">
                <Lightbulb className="w-4 h-4 mr-2" />
                Day 5 - February 27th
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-yellow-400 to-orange-600 bg-clip-text text-transparent leading-tight">
                Ideathon
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 max-w-lg">
                A 4-hour hackathon to brew innovative ideas and create magical solutions
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-gray-300">
                  <Calendar className="w-5 h-5 text-orange-500" />
                  <span>February 27th, 2024</span>
                </div>
                <div className="flex items-center gap-3 text-gray-300">
                  <MapPin className="w-5 h-5 text-orange-500" />
                  <span>Innovation Lab</span>
                </div>
                <div className="flex items-center gap-3 text-gray-300">
                  <Users className="w-5 h-5 text-orange-500" />
                  <span>3 Members Team</span>
                </div>
                <div className="flex items-center gap-3 text-gray-300">
                  <Clock className="w-5 h-5 text-orange-500" />
                  <span>4 Hours Duration</span>
                </div>
              </div>
              <Button size="lg" className="bg-orange-600 hover:bg-orange-700 text-white">
                Register Team Now
              </Button>
            </div>

            {/* Right Side - 3D Scene */}
            <div className="h-[600px] lg:h-[700px] relative">
              <Canvas camera={{ position: [0, 0, 15], fov: 75 }}>
                <Suspense fallback={null}>
                  <Environment preset="night" />
                  <ambientLight intensity={0.4} />
                  <pointLight position={[10, 10, 10]} intensity={1} color="#ff6600" />
                  <spotLight position={[-10, -10, -10]} angle={0.15} penumbra={1} intensity={0.5} color="#ffff00" />
                  
                  <group scale={0.7}>
                    <LightBulb3D position={[0, 0, 0]} glowing={true} />
                    {bulbPositions.map((position, i) => (
                      <LightBulb3D key={i} position={position} glowing={i % 2 === 0} />
                    ))}
                    
                    <Gear3D position={[-5, -2, 2]} size={0.8} />
                    <Gear3D position={[5, -1, -2]} size={1.2} />
                    <Rocket3D />
                  </group>
                  
                  <Sparkles count={120} scale={15} size={4} speed={0.5} color="#ffff00" />
                  <OrbitControls enableZoom={false} enablePan={false} />
                </Suspense>
              </Canvas>
            </div>
          </div>
        </div>
      </section>

      {/* Event Details */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Event Information */}
            <div className="space-y-8">
              <Card className="bg-black/20 backdrop-blur-sm border-orange-500/30">
                <CardHeader>
                  <CardTitle className="text-2xl text-white flex items-center gap-2">
                    <Lightbulb className="w-6 h-6 text-orange-500" />
                    Ideathon Overview
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-gray-300 space-y-4">
                  <p>
                    Innovation meets imagination in this intensive 4-hour ideathon! Teams will tackle 
                    real-world challenges, brainstorm creative solutions, and develop prototypes. 
                    From concept to presentation, showcase your innovative thinking and problem-solving skills.
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-orange-500" />
                      <span>February 27th, 2024</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-orange-500" />
                      <span>Innovation Lab</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-5 h-5 text-orange-500" />
                      <span>3 Members Team</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-5 h-5 text-orange-500" />
                      <span>4 Hours</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-black/20 backdrop-blur-sm border-orange-500/30">
                <CardHeader>
                  <CardTitle className="text-2xl text-white">Challenge Themes</CardTitle>
                </CardHeader>
                <CardContent className="text-gray-300">
                  <div className="space-y-3">
                    <div className="p-4 bg-blue-500/10 rounded-lg">
                      <h4 className="font-semibold text-blue-400 mb-2">🌱 Sustainability & Environment</h4>
                      <p className="text-sm">Solutions for climate change, waste management, renewable energy</p>
                    </div>
                    <div className="p-4 bg-green-500/10 rounded-lg">
                      <h4 className="font-semibold text-green-400 mb-2">🏥 Healthcare & Wellness</h4>
                      <p className="text-sm">Digital health, mental wellness, accessibility solutions</p>
                    </div>
                    <div className="p-4 bg-purple-500/10 rounded-lg">
                      <h4 className="font-semibold text-purple-400 mb-2">🎓 Education & Learning</h4>
                      <p className="text-sm">EdTech innovations, skill development, remote learning</p>
                    </div>
                    <div className="p-4 bg-red-500/10 rounded-lg">
                      <h4 className="font-semibold text-red-400 mb-2">🏙️ Smart Cities & IoT</h4>
                      <p className="text-sm">Urban planning, smart infrastructure, connected devices</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-black/20 backdrop-blur-sm border-orange-500/30">
                <CardHeader>
                  <CardTitle className="text-2xl text-white">Judging Criteria</CardTitle>
                </CardHeader>
                <CardContent className="text-gray-300">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-orange-500/10 rounded-lg">
                      <span>Innovation & Creativity</span>
                      <span className="text-orange-400">25%</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-blue-500/10 rounded-lg">
                      <span>Feasibility & Impact</span>
                      <span className="text-blue-400">25%</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-green-500/10 rounded-lg">
                      <span>Technical Implementation</span>
                      <span className="text-green-400">25%</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-purple-500/10 rounded-lg">
                      <span>Presentation & Demo</span>
                      <span className="text-purple-400">25%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Timeline & Prizes */}
            <div className="space-y-8">
              <Card className="bg-black/20 backdrop-blur-sm border-orange-500/30">
                <CardHeader>
                  <CardTitle className="text-2xl text-white">Event Timeline</CardTitle>
                </CardHeader>
                <CardContent className="text-gray-300">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-orange-500/10 rounded-lg">
                      <span>Registration & Team Formation</span>
                      <span className="text-orange-400">9:00 AM - 9:30 AM</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-blue-500/10 rounded-lg">
                      <span>Problem Statement Release</span>
                      <span className="text-blue-400">9:30 AM - 10:00 AM</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-green-500/10 rounded-lg">
                      <span>Ideation & Development</span>
                      <span className="text-green-400">10:00 AM - 1:00 PM</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-yellow-500/10 rounded-lg">
                      <span>Lunch Break</span>
                      <span className="text-yellow-400">1:00 PM - 1:30 PM</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-red-500/10 rounded-lg">
                      <span>Final Development & Testing</span>
                      <span className="text-red-400">1:30 PM - 2:30 PM</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-purple-500/10 rounded-lg">
                      <span>Presentations & Judging</span>
                      <span className="text-purple-400">2:30 PM - 4:00 PM</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-pink-500/10 rounded-lg">
                      <span>Results & Awards</span>
                      <span className="text-pink-400">4:00 PM</span>
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
                      <span className="font-semibold">🚀 Innovation Champions</span>
                      <span className="text-yellow-400">₹35,000</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-500/10 rounded-lg">
                      <span className="font-semibold">💡 Creative Minds</span>
                      <span className="text-gray-400">₹20,000</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-orange-500/10 rounded-lg">
                      <span className="font-semibold">⚡ Problem Solvers</span>
                      <span className="text-orange-400">₹12,000</span>
                    </div>
                    <div className="text-center mt-4 p-3 bg-blue-500/10 rounded-lg">
                      <span className="text-blue-400">Special awards: Best Presentation, Most Feasible Idea</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-black/20 backdrop-blur-sm border-green-500/30">
                <CardHeader>
                  <CardTitle className="text-2xl text-white flex items-center gap-2">
                    <Target className="w-6 h-6 text-green-500" />
                    What You'll Need
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-gray-300">
                  <ul className="space-y-2 list-disc list-inside">
                    <li>Laptops with development tools</li>
                    <li>Design software (Figma, Adobe XD, etc.)</li>
                    <li>Presentation materials</li>
                    <li>Notebooks for brainstorming</li>
                    <li>Chargers and power banks</li>
                    <li>Creative mindset and teamwork spirit!</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-black/20 backdrop-blur-sm border-purple-500/30">
                <CardHeader>
                  <CardTitle className="text-2xl text-white flex items-center gap-2">
                    <Rocket className="w-6 h-6 text-purple-500" />
                    Resources Provided
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-gray-300">
                  <ul className="space-y-2 list-disc list-inside">
                    <li>High-speed internet and WiFi</li>
                    <li>Mentors from industry experts</li>
                    <li>API access and development tools</li>
                    <li>Presentation equipment and projectors</li>
                    <li>Stationery and brainstorming materials</li>
                    <li>Refreshments and snacks throughout</li>
                    <li>Networking opportunities with judges</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-black/20 backdrop-blur-sm border-blue-500/30">
                <CardHeader>
                  <CardTitle className="text-2xl text-white flex items-center gap-2">
                    <Zap className="w-6 h-6 text-blue-500" />
                    Success Tips
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-gray-300">
                  <ul className="space-y-2 list-disc list-inside">
                    <li>Focus on solving real problems</li>
                    <li>Keep your solution simple and feasible</li>
                    <li>Create a compelling story for your pitch</li>
                    <li>Build a working prototype or demo</li>
                    <li>Practice your presentation beforehand</li>
                    <li>Be prepared to answer technical questions</li>
                    <li>Show the business potential of your idea</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center mt-16">
            <div className="space-y-4">
              <Button size="lg" className="bg-orange-600 hover:bg-orange-700 text-white mr-4">
                Register Your Team
              </Button>
              <Link to="/">
                <Button variant="outline" size="lg" className="border-orange-500 text-orange-400 hover:bg-orange-500/10">
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

export default Ideathon;