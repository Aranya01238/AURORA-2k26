import { Canvas } from '@react-three/fiber';
import { OrbitControls, Text3D, Float, Sparkles, Environment } from '@react-three/drei';
import { Suspense, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Mic2, Calendar, MapPin, Trophy, Users, Clock, Smile, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

// 3D Microphone Component
function Microphone3D() {
  const micRef = useRef<any>();
  
  useFrame((state) => {
    if (micRef.current) {
      micRef.current.rotation.z = Math.sin(state.clock.elapsedTime) * 0.1;
      micRef.current.position.y = Math.sin(state.clock.elapsedTime * 2) * 0.2;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={2}>
      <group ref={micRef} position={[0, 0, 0]}>
        {/* Microphone head */}
        <mesh position={[0, 2, 0]}>
          <sphereGeometry args={[0.8, 16, 16]} />
          <meshStandardMaterial color="#2c3e50" metalness={0.8} roughness={0.2} />
        </mesh>
        
        {/* Microphone grille */}
        <mesh position={[0, 2, 0]}>
          <sphereGeometry args={[0.85, 16, 16]} />
          <meshStandardMaterial color="#34495e" wireframe />
        </mesh>
        
        {/* Microphone handle */}
        <mesh position={[0, 0.5, 0]}>
          <cylinderGeometry args={[0.3, 0.3, 3, 16]} />
          <meshStandardMaterial color="#1a1a1a" metalness={0.6} roughness={0.3} />
        </mesh>
        
        {/* Microphone stand */}
        <mesh position={[0, -2, 0]}>
          <cylinderGeometry args={[0.1, 0.1, 2, 16]} />
          <meshStandardMaterial color="#7f8c8d" metalness={0.7} roughness={0.3} />
        </mesh>
        
        {/* Base */}
        <mesh position={[0, -3.5, 0]}>
          <cylinderGeometry args={[1.5, 1.5, 0.3, 16]} />
          <meshStandardMaterial color="#2c3e50" metalness={0.8} roughness={0.2} />
        </mesh>
      </group>
    </Float>
  );
}

// 3D Spotlight Component
function Spotlight3D({ position }: { position: [number, number, number] }) {
  return (
    <Float speed={2} rotationIntensity={0.3} floatIntensity={1}>
      <group position={position}>
        {/* Spotlight body */}
        <mesh>
          <coneGeometry args={[1, 2, 8]} />
          <meshStandardMaterial color="#f39c12" metalness={0.7} roughness={0.3} />
        </mesh>
        
        {/* Light beam effect */}
        <mesh position={[0, -2, 0]}>
          <coneGeometry args={[3, 4, 8]} />
          <meshBasicMaterial color="#fff3cd" transparent opacity={0.3} />
        </mesh>
      </group>
    </Float>
  );
}

// Floating Laugh Emojis
function LaughEmoji({ position }: { position: [number, number, number] }) {
  const emojiRef = useRef<any>();
  
  useFrame((state) => {
    if (emojiRef.current) {
      emojiRef.current.rotation.z = Math.sin(state.clock.elapsedTime + position[0]) * 0.2;
      emojiRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2 + position[0]) * 0.5;
    }
  });

  return (
    <Float speed={1 + Math.random()} rotationIntensity={0.5} floatIntensity={2}>
      <mesh ref={emojiRef} position={position}>
        <sphereGeometry args={[0.5, 16, 16]} />
        <meshStandardMaterial color="#ffd700" />
      </mesh>
    </Float>
  );
}

const StandupComedy = () => {
  const laughPositions: [number, number, number][] = [
    [-6, 3, 2], [6, 2, -2], [-4, 4, -3], [4, 1, 3], [-2, 5, 1], [2, 3, -1]
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-yellow-900 to-slate-900">
      <Navbar />
      
      {/* Hero Section with 3D Scene */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Canvas camera={{ position: [0, 0, 15], fov: 75 }}>
            <Suspense fallback={null}>
              <Environment preset="night" />
              <ambientLight intensity={0.4} />
              <pointLight position={[10, 10, 10]} intensity={1} color="#ffd700" />
              <spotLight position={[0, 10, 0]} angle={0.3} penumbra={1} intensity={2} color="#fff3cd" />
              
              <Microphone3D />
              <Spotlight3D position={[-8, 5, -5]} />
              <Spotlight3D position={[8, 5, -5]} />
              
              {laughPositions.map((position, i) => (
                <LaughEmoji key={i} position={position} />
              ))}
              
              <Sparkles count={80} scale={12} size={4} speed={0.5} color="#ffd700" />
              <OrbitControls enableZoom={false} enablePan={false} />
            </Suspense>
          </Canvas>
        </div>
        
        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
          <Badge className="mb-4 bg-yellow-600 hover:bg-yellow-700">
            <Mic2 className="w-4 h-4 mr-2" />
            Day 3 - February 25th
          </Badge>
          <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-yellow-400 to-orange-600 bg-clip-text text-transparent">
            Standup Comedy
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-300">
            Bring laughter to the Great Hall with your comedic wizardry. Make the crowd roar!
          </p>
          <Button size="lg" className="bg-yellow-600 hover:bg-yellow-700 text-white">
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
              <Card className="bg-black/20 backdrop-blur-sm border-yellow-500/30">
                <CardHeader>
                  <CardTitle className="text-2xl text-white flex items-center gap-2">
                    <Mic2 className="w-6 h-6 text-yellow-500" />
                    Comedy Competition Overview
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-gray-300 space-y-4">
                  <p>
                    Step into the spotlight and showcase your comedic talent! This standup comedy 
                    competition is your chance to make the audience laugh, think, and maybe even 
                    cry (from laughter). Bring your best material and comedic timing.
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-yellow-500" />
                      <span>February 25th, 2024</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-yellow-500" />
                      <span>Main Auditorium</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-5 h-5 text-yellow-500" />
                      <span>Individual</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-5 h-5 text-yellow-500" />
                      <span>5-8 minutes per act</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-black/20 backdrop-blur-sm border-yellow-500/30">
                <CardHeader>
                  <CardTitle className="text-2xl text-white">Performance Guidelines</CardTitle>
                </CardHeader>
                <CardContent className="text-gray-300">
                  <ul className="space-y-3 list-disc list-inside">
                    <li>Performance time: 5-8 minutes (strict timing)</li>
                    <li>Original material preferred (no plagiarism)</li>
                    <li>Keep content appropriate for college audience</li>
                    <li>No offensive or discriminatory content</li>
                    <li>Props and costumes are allowed</li>
                    <li>Microphone and basic lighting provided</li>
                    <li>Backup material recommended</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-black/20 backdrop-blur-sm border-yellow-500/30">
                <CardHeader>
                  <CardTitle className="text-2xl text-white">Judging Criteria</CardTitle>
                </CardHeader>
                <CardContent className="text-gray-300">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-yellow-500/10 rounded-lg">
                      <span>Humor & Originality</span>
                      <span className="text-yellow-400">40%</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-orange-500/10 rounded-lg">
                      <span>Delivery & Timing</span>
                      <span className="text-orange-400">30%</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-red-500/10 rounded-lg">
                      <span>Audience Engagement</span>
                      <span className="text-red-400">20%</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-purple-500/10 rounded-lg">
                      <span>Stage Presence</span>
                      <span className="text-purple-400">10%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Timeline & Prizes */}
            <div className="space-y-8">
              <Card className="bg-black/20 backdrop-blur-sm border-yellow-500/30">
                <CardHeader>
                  <CardTitle className="text-2xl text-white">Event Timeline</CardTitle>
                </CardHeader>
                <CardContent className="text-gray-300">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-yellow-500/10 rounded-lg">
                      <span>Registration & Check-in</span>
                      <span className="text-yellow-400">5:00 PM - 5:30 PM</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-orange-500/10 rounded-lg">
                      <span>Sound Check & Briefing</span>
                      <span className="text-orange-400">5:30 PM - 6:00 PM</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-red-500/10 rounded-lg">
                      <span>Preliminary Round</span>
                      <span className="text-red-400">6:00 PM - 7:30 PM</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-purple-500/10 rounded-lg">
                      <span>Break & Deliberation</span>
                      <span className="text-purple-400">7:30 PM - 8:00 PM</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-green-500/10 rounded-lg">
                      <span>Final Round</span>
                      <span className="text-green-400">8:00 PM - 9:00 PM</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-blue-500/10 rounded-lg">
                      <span>Results & Awards</span>
                      <span className="text-blue-400">9:00 PM</span>
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
                      <span className="font-semibold">🎭 Comedy King/Queen</span>
                      <span className="text-yellow-400">₹20,000</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-500/10 rounded-lg">
                      <span className="font-semibold">😂 Laughter Master</span>
                      <span className="text-gray-400">₹12,000</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-orange-500/10 rounded-lg">
                      <span className="font-semibold">🎪 Rising Star</span>
                      <span className="text-orange-400">₹8,000</span>
                    </div>
                    <div className="text-center mt-4 p-3 bg-purple-500/10 rounded-lg">
                      <span className="text-purple-400">Special awards: Best Newcomer, Audience Choice</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-black/20 backdrop-blur-sm border-green-500/30">
                <CardHeader>
                  <CardTitle className="text-2xl text-white flex items-center gap-2">
                    <Star className="w-6 h-6 text-green-500" />
                    Tips for Success
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-gray-300">
                  <ul className="space-y-2 list-disc list-inside">
                    <li>Practice your timing - comedy is all about rhythm</li>
                    <li>Know your audience and tailor your material</li>
                    <li>Have backup jokes ready for unexpected situations</li>
                    <li>Use personal experiences for authentic humor</li>
                    <li>Don't be afraid to interact with the audience</li>
                    <li>Stay confident even if a joke doesn't land</li>
                    <li>End on a high note with your strongest material</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-black/20 backdrop-blur-sm border-blue-500/30">
                <CardHeader>
                  <CardTitle className="text-2xl text-white flex items-center gap-2">
                    <Smile className="w-6 h-6 text-blue-500" />
                    What to Expect
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-gray-300">
                  <ul className="space-y-2 list-disc list-inside">
                    <li>Professional stage setup with spotlight</li>
                    <li>High-quality sound system and microphone</li>
                    <li>Enthusiastic and supportive audience</li>
                    <li>Professional judges from comedy industry</li>
                    <li>Photography and videography of performances</li>
                    <li>Networking opportunities with fellow comedians</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center mt-16">
            <div className="space-y-4">
              <Button size="lg" className="bg-yellow-600 hover:bg-yellow-700 text-white mr-4">
                Register for Comedy Night
              </Button>
              <Link to="/">
                <Button variant="outline" size="lg" className="border-yellow-500 text-yellow-400 hover:bg-yellow-500/10">
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

export default StandupComedy;