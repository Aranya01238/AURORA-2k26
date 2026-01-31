import { Canvas } from '@react-three/fiber';
import { OrbitControls, Float, Sparkles, Environment } from '@react-three/drei';
import { Suspense } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Film, Calendar, MapPin, Trophy, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

// Enhanced Professional 3D Film Reel Component
function FilmReel() {
  return (
    <Float speed={1.2} rotationIntensity={0.8} floatIntensity={1.5}>
      <group rotation={[0.2, 0, 0]}>
        {/* Main reel body - Professional metallic finish */}
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[2.2, 2.2, 0.4, 64]} />
          <meshStandardMaterial 
            color="#1a237e" 
            metalness={0.9} 
            roughness={0.1} 
            envMapIntensity={1.5}
          />
        </mesh>
        
        {/* Inner rim detail */}
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[1.9, 1.9, 0.45, 64]} />
          <meshStandardMaterial 
            color="#0d1421" 
            metalness={0.8} 
            roughness={0.2}
          />
        </mesh>
        
        {/* Outer rim with beveled edge */}
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[2.3, 2.1, 0.1, 64]} />
          <meshStandardMaterial 
            color="#3949ab" 
            metalness={0.95} 
            roughness={0.05}
          />
        </mesh>
        
        {/* Professional film reel holes with depth */}
        {Array.from({ length: 12 }).map((_, i) => {
          const angle = (i * Math.PI * 2) / 12;
          return (
            <group key={i}>
              <mesh position={[Math.cos(angle) * 1.6, Math.sin(angle) * 1.6, 0]}>
                <cylinderGeometry args={[0.15, 0.18, 0.5, 32]} />
                <meshStandardMaterial 
                  color="#000814" 
                  metalness={0.3} 
                  roughness={0.7}
                />
              </mesh>
              {/* Hole rim detail */}
              <mesh position={[Math.cos(angle) * 1.6, Math.sin(angle) * 1.6, 0.22]}>
                <cylinderGeometry args={[0.19, 0.15, 0.05, 32]} />
                <meshStandardMaterial 
                  color="#1565c0" 
                  metalness={0.8} 
                  roughness={0.2}
                />
              </mesh>
            </group>
          );
        })}
        
        {/* Center hub with professional detailing */}
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[0.6, 0.6, 0.5, 32]} />
          <meshStandardMaterial 
            color="#0d47a1" 
            metalness={0.9} 
            roughness={0.1}
          />
        </mesh>
        
        {/* Center hub inner detail */}
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[0.3, 0.3, 0.52, 16]} />
          <meshStandardMaterial 
            color="#000051" 
            metalness={0.7} 
            roughness={0.3}
          />
        </mesh>
        
        {/* Professional film strip with realistic curve */}
        <group position={[3.2, 0, 0]} rotation={[0, 0, Math.PI / 8]}>
          <mesh>
            <boxGeometry args={[5, 1, 0.08]} />
            <meshStandardMaterial 
              color="#1a1a1a" 
              metalness={0.1} 
              roughness={0.8}
            />
          </mesh>
          
          {/* Film perforations with proper spacing */}
          {Array.from({ length: 25 }).map((_, i) => (
            <group key={i}>
              <mesh position={[-2 + i * 0.16, 0.35, 0.05]}>
                <boxGeometry args={[0.06, 0.12, 0.1]} />
                <meshStandardMaterial color="#000" />
              </mesh>
              <mesh position={[-2 + i * 0.16, -0.35, 0.05]}>
                <boxGeometry args={[0.06, 0.12, 0.1]} />
                <meshStandardMaterial color="#000" />
              </mesh>
            </group>
          ))}
          
          {/* Film frames simulation */}
          {Array.from({ length: 8 }).map((_, i) => (
            <mesh key={i} position={[-1.8 + i * 0.5, 0, 0.04]}>
              <boxGeometry args={[0.4, 0.6, 0.02]} />
              <meshStandardMaterial 
                color="#2c3e50" 
                transparent 
                opacity={0.7}
              />
            </mesh>
          ))}
        </group>
        
        {/* Additional film strip for realism */}
        <group position={[-2.8, 1.2, 0.5]} rotation={[0.3, 0, -Math.PI / 6]}>
          <mesh>
            <boxGeometry args={[3, 0.8, 0.06]} />
            <meshStandardMaterial 
              color="#1a1a1a" 
              metalness={0.1} 
              roughness={0.8}
            />
          </mesh>
        </group>
      </group>
    </Float>
  );
}

// Enhanced Professional 3D Camera Component
function Camera3D() {
  return (
    <Float speed={1.8} rotationIntensity={0.6} floatIntensity={1.2}>
      <group position={[-5, 1.5, 3]} rotation={[0.1, 0.3, 0]}>
        {/* Main camera body with professional finish */}
        <mesh>
          <boxGeometry args={[2.5, 1.8, 1.2]} />
          <meshStandardMaterial 
            color="#0d1421" 
            metalness={0.8} 
            roughness={0.2}
          />
        </mesh>
        
        {/* Camera body details and panels */}
        <mesh position={[0, 0.7, 0.61]}>
          <boxGeometry args={[2.2, 0.4, 0.02]} />
          <meshStandardMaterial 
            color="#1565c0" 
            metalness={0.9} 
            roughness={0.1}
          />
        </mesh>
        
        {/* Professional lens assembly */}
        <group position={[1.4, 0, 0]}>
          {/* Main lens barrel */}
          <mesh>
            <cylinderGeometry args={[0.7, 0.9, 1.2, 32]} />
            <meshStandardMaterial 
              color="#0d47a1" 
              metalness={0.95} 
              roughness={0.05}
            />
          </mesh>
          
          {/* Lens rings for professional look */}
          {Array.from({ length: 4 }).map((_, i) => (
            <mesh key={i} position={[0, 0, -0.4 + i * 0.2]}>
              <cylinderGeometry args={[0.72, 0.68, 0.05, 32]} />
              <meshStandardMaterial 
                color="#1a237e" 
                metalness={0.9} 
                roughness={0.1}
              />
            </mesh>
          ))}
          
          {/* Front lens element */}
          <mesh position={[0, 0, 0.65]}>
            <cylinderGeometry args={[0.65, 0.65, 0.1, 32]} />
            <meshStandardMaterial 
              color="#1e88e5" 
              transparent 
              opacity={0.9} 
              metalness={0.1} 
              roughness={0.05}
            />
          </mesh>
          
          {/* Lens glass with realistic reflection */}
          <mesh position={[0, 0, 0.7]}>
            <cylinderGeometry args={[0.6, 0.6, 0.05, 32]} />
            <meshStandardMaterial 
              color="#64b5f6" 
              transparent 
              opacity={0.3} 
              metalness={0.9} 
              roughness={0.0}
            />
          </mesh>
          
          {/* Lens hood */}
          <mesh position={[0, 0, 1.1]}>
            <cylinderGeometry args={[0.8, 0.65, 0.6, 32]} />
            <meshStandardMaterial 
              color="#000814" 
              metalness={0.3} 
              roughness={0.8}
            />
          </mesh>
        </group>
        
        {/* Camera viewfinder */}
        <mesh position={[-0.8, 0.5, 0]}>
          <boxGeometry args={[0.6, 0.4, 0.8]} />
          <meshStandardMaterial 
            color="#0d1421" 
            metalness={0.7} 
            roughness={0.3}
          />
        </mesh>
        
        {/* Viewfinder screen */}
        <mesh position={[-0.8, 0.5, 0.41]}>
          <boxGeometry args={[0.5, 0.3, 0.02]} />
          <meshStandardMaterial 
            color="#1976d2" 
            emissive="#0d47a1" 
            emissiveIntensity={0.3}
          />
        </mesh>
        
        {/* Professional camera handle */}
        <mesh position={[-0.2, 1.2, 0]}>
          <boxGeometry args={[1.5, 0.3, 0.8]} />
          <meshStandardMaterial 
            color="#1a237e" 
            metalness={0.6} 
            roughness={0.4}
          />
        </mesh>
        
        {/* Camera controls and buttons */}
        {Array.from({ length: 6 }).map((_, i) => (
          <mesh key={i} position={[-0.5 + i * 0.2, 0.8, 0.61]}>
            <cylinderGeometry args={[0.05, 0.05, 0.1, 16]} />
            <meshStandardMaterial 
              color="#3949ab" 
              metalness={0.8} 
              roughness={0.2}
            />
          </mesh>
        ))}
        
        {/* Tripod mount */}
        <mesh position={[0, -1.1, 0]}>
          <cylinderGeometry args={[0.15, 0.15, 0.3, 16]} />
          <meshStandardMaterial 
            color="#0d47a1" 
            metalness={0.9} 
            roughness={0.1}
          />
        </mesh>
      </group>
    </Float>
  );
}

const DocumentaryEvent = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-black">
      <Navbar />
      
      {/* Hero Section with Split Layout */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent z-5"></div>
        
        <div className="container mx-auto px-4 h-full flex items-center">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full h-full items-center">
            
            {/* Left Side - Event Information */}
            <div className="relative z-10 text-white space-y-6 pr-8">
              <Badge className="mb-4 bg-blue-600 hover:bg-blue-700 border-blue-400 w-fit">
                <Film className="w-4 h-4 mr-2" />
                Day 1 - February 23rd
              </Badge>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-600 bg-clip-text text-transparent drop-shadow-2xl leading-tight">
                Documentary Event
              </h1>
              
              <p className="text-lg md:text-xl lg:text-2xl text-blue-100 drop-shadow-lg max-w-2xl">
                Showcase your storytelling prowess through the magical art of documentary filmmaking. Capture the essence of magic and wonder.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white shadow-2xl transform hover:scale-105 transition-all duration-300">
                  Register Now
                </Button>
                <Button variant="outline" size="lg" className="border-blue-400 text-blue-300 hover:bg-blue-600/20">
                  Learn More
                </Button>
              </div>
            </div>
            
            {/* Right Side - 3D Scene */}
            <div className="relative h-full">
              <Canvas camera={{ position: [0, 2, 12], fov: 60 }}>
                <Suspense fallback={null}>
                  <Environment preset="night" />
                  
                  {/* Professional lighting setup */}
                  <ambientLight intensity={0.3} color="#1e3a8a" />
                  <directionalLight 
                    position={[10, 10, 5]} 
                    intensity={1.2} 
                    color="#3b82f6" 
                    castShadow
                  />
                  <pointLight 
                    position={[-8, 5, 8]} 
                    intensity={0.8} 
                    color="#1d4ed8" 
                    distance={20}
                  />
                  <spotLight 
                    position={[5, 8, 5]} 
                    angle={0.3} 
                    penumbra={1} 
                    intensity={1.5} 
                    color="#60a5fa"
                    castShadow
                  />
                  
                  {/* Rim lighting for professional look */}
                  <pointLight 
                    position={[0, -5, -10]} 
                    intensity={0.6} 
                    color="#1e40af" 
                  />
                  
                  <group scale={0.7}>
                    <FilmReel />
                    <Camera3D />
                  </group>
                  
                  {/* Enhanced sparkles with blue theme */}
                  <Sparkles 
                    count={150} 
                    scale={15} 
                    size={3} 
                    speed={0.3} 
                    color="#3b82f6"
                  />
                  
                  {/* Additional magical sparkles */}
                  <Float speed={0.5} rotationIntensity={0} floatIntensity={0.5}>
                    <Sparkles 
                      count={80} 
                      scale={20} 
                      size={2} 
                      speed={0.2} 
                      color="#1d4ed8"
                    />
                  </Float>
                  
                  <OrbitControls 
                    enableZoom={false} 
                    enablePan={false} 
                    autoRotate 
                    autoRotateSpeed={0.5}
                    maxPolarAngle={Math.PI / 2}
                    minPolarAngle={Math.PI / 3}
                  />
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