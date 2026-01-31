import { Canvas } from '@react-three/fiber';
import { OrbitControls, Float, Sparkles, Environment, Text3D } from '@react-three/drei';
import { Suspense, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Mail, Phone, MapPin, Send, MessageCircle, Users, Clock, Globe } from 'lucide-react';

// 3D Floating Envelope Component
function FloatingEnvelope({ position }: { position: [number, number, number] }) {
  const envelopeRef = useRef<any>();
  
  useFrame((state) => {
    if (envelopeRef.current) {
      envelopeRef.current.rotation.y = Math.sin(state.clock.elapsedTime) * 0.2;
      envelopeRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2) * 0.3;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={2}>
      <group ref={envelopeRef} position={position}>
        {/* Envelope body */}
        <mesh>
          <boxGeometry args={[3, 2, 0.1]} />
          <meshStandardMaterial color="#ffd700" metalness={0.3} roughness={0.7} />
        </mesh>
        
        {/* Envelope flap */}
        <mesh position={[0, 0.8, 0.06]} rotation={[0.3, 0, 0]}>
          <boxGeometry args={[3, 1.2, 0.1]} />
          <meshStandardMaterial color="#ffed4e" metalness={0.3} roughness={0.7} />
        </mesh>
        
        {/* Magical seal */}
        <mesh position={[0, 0.3, 0.12]}>
          <cylinderGeometry args={[0.3, 0.3, 0.05, 16]} />
          <meshStandardMaterial color="#dc2626" metalness={0.8} roughness={0.2} />
        </mesh>
      </group>
    </Float>
  );
}

// 3D Communication Crystal
function CommunicationCrystal({ position }: { position: [number, number, number] }) {
  const crystalRef = useRef<any>();
  
  useFrame((state) => {
    if (crystalRef.current) {
      crystalRef.current.rotation.y += 0.01;
      crystalRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + position[0]) * 0.2;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.3} floatIntensity={1}>
      <group ref={crystalRef} position={position}>
        {/* Crystal structure */}
        <mesh>
          <octahedronGeometry args={[1.5, 0]} />
          <meshStandardMaterial 
            color="#3b82f6" 
            transparent 
            opacity={0.8} 
            metalness={0.1} 
            roughness={0.1}
            emissive="#1e40af"
            emissiveIntensity={0.2}
          />
        </mesh>
        
        {/* Inner glow */}
        <mesh>
          <octahedronGeometry args={[1.2, 0]} />
          <meshBasicMaterial 
            color="#60a5fa" 
            transparent 
            opacity={0.4}
          />
        </mesh>
        
        <pointLight position={[0, 0, 0]} intensity={1} color="#3b82f6" distance={8} />
      </group>
    </Float>
  );
}

// 3D Magical Quill
function MagicalQuill() {
  const quillRef = useRef<any>();
  
  useFrame((state) => {
    if (quillRef.current) {
      quillRef.current.rotation.z = Math.sin(state.clock.elapsedTime) * 0.1;
      quillRef.current.position.y = Math.sin(state.clock.elapsedTime * 1.5) * 0.2;
    }
  });

  return (
    <Float speed={1.8} rotationIntensity={0.4} floatIntensity={1.5}>
      <group ref={quillRef} position={[5, 1, -2]}>
        {/* Quill shaft */}
        <mesh>
          <cylinderGeometry args={[0.05, 0.05, 4, 16]} />
          <meshStandardMaterial color="#8b4513" metalness={0.2} roughness={0.8} />
        </mesh>
        
        {/* Quill tip */}
        <mesh position={[0, -2.2, 0]}>
          <coneGeometry args={[0.08, 0.5, 16]} />
          <meshStandardMaterial color="#ffd700" metalness={0.8} roughness={0.2} />
        </mesh>
        
        {/* Feather parts */}
        {Array.from({ length: 8 }).map((_, i) => (
          <mesh key={i} position={[
            Math.sin(i * 0.5) * 0.3,
            1.5 - i * 0.3,
            Math.cos(i * 0.5) * 0.2
          ]} rotation={[0, i * 0.3, 0]}>
            <boxGeometry args={[0.8, 0.1, 0.02]} />
            <meshStandardMaterial color="#4ade80" transparent opacity={0.8} />
          </mesh>
        ))}
      </group>
    </Float>
  );
}

const Contact = () => {
  const crystalPositions: [number, number, number][] = [
    [-6, 3, 2], [6, 2, -2], [-4, 4, -3], [4, 1, 3]
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Navbar />
      
      {/* Hero Section with Split Layout */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center min-h-screen">
            {/* Left Side - Contact Information */}
            <div className="text-white space-y-6 z-10 relative pr-8">
              <Badge className="mb-4 bg-purple-600 hover:bg-purple-700 w-fit">
                <MessageCircle className="w-4 h-4 mr-2" />
                Get In Touch
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent leading-tight">
                Contact Us
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 max-w-lg">
                Reach out to the AURORA 2K26 organizing committee. We're here to help with all your magical queries!
              </p>
              
              {/* Contact Info Cards */}
              <div className="space-y-4 mt-8">
                <div className="flex items-center gap-4 p-4 bg-purple-500/10 rounded-lg backdrop-blur-sm">
                  <Mail className="w-6 h-6 text-purple-400" />
                  <div>
                    <h3 className="font-semibold text-white">Email</h3>
                    <p className="text-gray-300">aurora2k26@college.edu</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 p-4 bg-purple-500/10 rounded-lg backdrop-blur-sm">
                  <Phone className="w-6 h-6 text-purple-400" />
                  <div>
                    <h3 className="font-semibold text-white">Phone</h3>
                    <p className="text-gray-300">+91 98765 43210</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 p-4 bg-purple-500/10 rounded-lg backdrop-blur-sm">
                  <MapPin className="w-6 h-6 text-purple-400" />
                  <div>
                    <h3 className="font-semibold text-white">Location</h3>
                    <p className="text-gray-300">College Campus, Main Auditorium</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 p-4 bg-purple-500/10 rounded-lg backdrop-blur-sm">
                  <Clock className="w-6 h-6 text-purple-400" />
                  <div>
                    <h3 className="font-semibold text-white">Office Hours</h3>
                    <p className="text-gray-300">Mon-Fri: 9:00 AM - 6:00 PM</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - 3D Scene */}
            <div className="h-[600px] lg:h-[700px] relative">
              <Canvas camera={{ position: [0, 0, 12], fov: 75 }}>
                <Suspense fallback={null}>
                  <Environment preset="night" />
                  <ambientLight intensity={0.4} />
                  <pointLight position={[10, 10, 10]} intensity={1} color="#a855f7" />
                  <spotLight position={[-10, -10, -10]} angle={0.15} penumbra={1} intensity={0.5} color="#ec4899" />
                  
                  <group scale={0.7}>
                    <FloatingEnvelope position={[0, 0, 0]} />
                    <MagicalQuill />
                    
                    {crystalPositions.map((position, i) => (
                      <CommunicationCrystal key={i} position={position} />
                    ))}
                  </group>
                  
                  <Sparkles count={100} scale={15} size={3} speed={0.5} color="#a855f7" />
                  <OrbitControls enableZoom={false} enablePan={false} />
                </Suspense>
              </Canvas>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">Send Us a Message</h2>
            <p className="text-gray-300 text-lg">Have questions about AURORA 2K26? We'd love to hear from you!</p>
          </div>
          
          <Card className="bg-black/20 backdrop-blur-sm border-purple-500/30">
            <CardHeader>
              <CardTitle className="text-2xl text-white flex items-center gap-2">
                <Send className="w-6 h-6 text-purple-500" />
                Contact Form
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-white mb-2">Name *</label>
                  <Input 
                    placeholder="Your full name" 
                    className="bg-purple-500/10 border-purple-500/30 text-white placeholder:text-gray-400"
                  />
                </div>
                <div>
                  <label className="block text-white mb-2">Email *</label>
                  <Input 
                    type="email" 
                    placeholder="your.email@example.com" 
                    className="bg-purple-500/10 border-purple-500/30 text-white placeholder:text-gray-400"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-white mb-2">Phone</label>
                  <Input 
                    placeholder="Your phone number" 
                    className="bg-purple-500/10 border-purple-500/30 text-white placeholder:text-gray-400"
                  />
                </div>
                <div>
                  <label className="block text-white mb-2">Subject *</label>
                  <Input 
                    placeholder="Message subject" 
                    className="bg-purple-500/10 border-purple-500/30 text-white placeholder:text-gray-400"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-white mb-2">Message *</label>
                <Textarea 
                  placeholder="Tell us about your query, suggestions, or how we can help you..."
                  rows={6}
                  className="bg-purple-500/10 border-purple-500/30 text-white placeholder:text-gray-400"
                />
              </div>
              
              <div className="flex justify-center">
                <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-white px-8">
                  <Send className="w-4 h-4 mr-2" />
                  Send Message
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Team Contact Section */}
      <section className="py-20 px-4 bg-black/20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">Meet Our Team</h2>
            <p className="text-gray-300 text-lg">Get in touch with our organizing committee members</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { name: "Alex Johnson", role: "Event Coordinator", email: "alex@aurora2k26.com", phone: "+91 98765 43211" },
              { name: "Sarah Williams", role: "Technical Lead", email: "sarah@aurora2k26.com", phone: "+91 98765 43212" },
              { name: "Mike Chen", role: "Marketing Head", email: "mike@aurora2k26.com", phone: "+91 98765 43213" },
              { name: "Emily Davis", role: "Logistics Manager", email: "emily@aurora2k26.com", phone: "+91 98765 43214" },
              { name: "David Wilson", role: "Sponsorship Lead", email: "david@aurora2k26.com", phone: "+91 98765 43215" },
              { name: "Lisa Brown", role: "Student Relations", email: "lisa@aurora2k26.com", phone: "+91 98765 43216" }
            ].map((member, index) => (
              <Card key={index} className="bg-purple-500/10 backdrop-blur-sm border-purple-500/30 hover:bg-purple-500/20 transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Users className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">{member.name}</h3>
                  <p className="text-purple-400 mb-4">{member.role}</p>
                  <div className="space-y-2 text-sm text-gray-300">
                    <div className="flex items-center justify-center gap-2">
                      <Mail className="w-4 h-4" />
                      <span>{member.email}</span>
                    </div>
                    <div className="flex items-center justify-center gap-2">
                      <Phone className="w-4 h-4" />
                      <span>{member.phone}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;