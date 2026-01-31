import { Canvas } from '@react-three/fiber';
import { OrbitControls, Text3D, Float, Sparkles, Environment } from '@react-three/drei';
import { Suspense } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Film, Calendar, MapPin, Trophy, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

// 3D Film Reel Component
function FilmReel() {
  return (
    <Float speed={1.5} rotationIntensity={1} floatIntensity={2}>
      <group>
        {/* Film reel body */}
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[2, 2, 0.3, 32]} />
          <meshStandardMaterial color="#2c1810" metalness={0.8} roughness={0.2} />
        </mesh>
        
        {/* Film reel holes */}
        {Array.from({ length: 8 }).map((_, i) => (
          <mesh key={i} position={[Math.cos(i * Math.PI / 4) * 1.5, Math.sin(i * Math.PI / 4) * 1.5, 0.16]}>
            <cylinderGeometry args={[0.2, 0.2, 0.4, 16]} />
            <meshStandardMaterial color="#1a0f08" />
          </mesh>
        ))}
        
        {/* Center hub */}
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[0.5, 0.5, 0.4, 16]} />
          <meshStandardMaterial color="#8b4513" metalness={0.6} roughness={0.3} />
        </mesh>
        
        {/* Film strip */}
        <mesh position={[3, 0, 0]} rotation={[0, 0, Math.PI / 6]}>
          <boxGeometry args={[4, 0.8, 0.05]} />
          <meshStandardMaterial color="#1a1a1a" />
        </mesh>
        
        {/* Film perforations */}
        {Array.from({ length: 20 }).map((_, i) => (
          <mesh key={i} position={[1 + i * 0.2, 0.3, 0.03]} rotation={[0, 0, Math.PI / 6]}>
            <boxGeometry args={[0.05, 0.1, 0.1]} />
            <meshStandardMaterial color="#000" />
          </mesh>
        ))}
      </group>
    </Float>
  );
}

// 3D Camera Component
function Camera3D() {
  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <group position={[-4, 1, 2]}>
        {/* Camera body */}
        <mesh>
          <boxGeometry args={[2, 1.5, 1]} />
          <meshStandardMaterial color="#2c2c2c" metalness={0.7} roughness={0.3} />
        </mesh>
        
        {/* Lens */}
        <mesh position={[1.2, 0, 0]}>
          <cylinderGeometry args={[0.6, 0.8, 0.8, 16]} />
          <meshStandardMaterial color="#1a1a1a" metalness={0.9} roughness={0.1} />
        </mesh>
        
        {/* Lens glass */}
        <mesh position={[1.6, 0, 0]}>
          <cylinderGeometry args={[0.5, 0.5, 0.1, 16]} />
          <meshStandardMaterial color="#87ceeb" transparent opacity={0.8} />
        </mesh>
      </group>
    </Float>
  );
}

const DocumentaryEvent = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Navbar />
      
      {/* Hero Section with 3D Scene */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Canvas camera={{ position: [0, 0, 10], fov: 75 }}>
            <Suspense fallback={null}>
              <Environment preset="night" />
              <ambientLight intensity={0.5} />
              <pointLight position={[10, 10, 10]} intensity={1} />
              <spotLight position={[-10, -10, -10]} angle={0.15} penumbra={1} intensity={0.5} />
              
              <FilmReel />
              <Camera3D />
              
              <Sparkles count={100} scale={10} size={2} speed={0.5} />
              <OrbitControls enableZoom={false} enablePan={false} />
            </Suspense>
          </Canvas>
        </div>
        
        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
          <Badge className="mb-4 bg-red-600 hover:bg-red-700">
            <Film className="w-4 h-4 mr-2" />
            Day 1 - February 23rd
          </Badge>
          <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-yellow-400 to-red-600 bg-clip-text text-transparent">
            Documentary Event
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-300">
            Showcase your storytelling prowess through the magical art of documentary filmmaking
          </p>
          <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white">
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
              <Card className="bg-black/20 backdrop-blur-sm border-red-500/30">
                <CardHeader>
                  <CardTitle className="text-2xl text-white flex items-center gap-2">
                    <Film className="w-6 h-6 text-red-500" />
                    Event Overview
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-gray-300 space-y-4">
                  <p>
                    Capture the essence of magic and wonder through documentary filmmaking. 
                    This event challenges participants to create compelling narratives that 
                    showcase real stories with cinematic excellence.
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-red-500" />
                      <span>February 23rd, 2024</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-red-500" />
                      <span>Main Auditorium</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-5 h-5 text-red-500" />
                      <span>Individual/Team</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Trophy className="w-5 h-5 text-red-500" />
                      <span>₹50,000 Prize Pool</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-black/20 backdrop-blur-sm border-red-500/30">
                <CardHeader>
                  <CardTitle className="text-2xl text-white">Rules & Guidelines</CardTitle>
                </CardHeader>
                <CardContent className="text-gray-300">
                  <ul className="space-y-2 list-disc list-inside">
                    <li>Documentary length: 5-15 minutes</li>
                    <li>Original content only - no copyrighted material</li>
                    <li>Submit in MP4 format, 1080p minimum</li>
                    <li>Include proper credits and acknowledgments</li>
                    <li>Theme must align with "Magic in Reality"</li>
                    <li>Submission deadline: 11:59 PM on event day</li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* Timeline & Prizes */}
            <div className="space-y-8">
              <Card className="bg-black/20 backdrop-blur-sm border-red-500/30">
                <CardHeader>
                  <CardTitle className="text-2xl text-white">Event Timeline</CardTitle>
                </CardHeader>
                <CardContent className="text-gray-300">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-red-500/10 rounded-lg">
                      <span>Registration Opens</span>
                      <span className="text-red-400">9:00 AM</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-red-500/10 rounded-lg">
                      <span>Briefing Session</span>
                      <span className="text-red-400">10:00 AM</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-red-500/10 rounded-lg">
                      <span>Production Time</span>
                      <span className="text-red-400">11:00 AM - 6:00 PM</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-red-500/10 rounded-lg">
                      <span>Submission Deadline</span>
                      <span className="text-red-400">6:30 PM</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-red-500/10 rounded-lg">
                      <span>Screening & Awards</span>
                      <span className="text-red-400">7:00 PM</span>
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
                      <span className="font-semibold">🥇 First Place</span>
                      <span className="text-yellow-400">₹25,000</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-500/10 rounded-lg">
                      <span className="font-semibold">🥈 Second Place</span>
                      <span className="text-gray-400">₹15,000</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-orange-500/10 rounded-lg">
                      <span className="font-semibold">🥉 Third Place</span>
                      <span className="text-orange-400">₹10,000</span>
                    </div>
                    <div className="text-center mt-4 p-3 bg-purple-500/10 rounded-lg">
                      <span className="text-purple-400">+ Certificates & Goodies for all participants</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center mt-16">
            <div className="space-y-4">
              <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white mr-4">
                Register for Event
              </Button>
              <Link to="/">
                <Button variant="outline" size="lg" className="border-red-500 text-red-400 hover:bg-red-500/10">
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

export default DocumentaryEvent;