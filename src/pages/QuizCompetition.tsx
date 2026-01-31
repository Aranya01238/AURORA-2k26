import { Canvas } from '@react-three/fiber';
import { OrbitControls, Text3D, Float, Sparkles, Environment } from '@react-three/drei';
import { Suspense, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { HelpCircle, Calendar, MapPin, Trophy, Users, Clock, Brain, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

// 3D Question Mark Component
function QuestionMark3D({ position, color }: { position: [number, number, number], color: string }) {
  const questionRef = useRef<any>();
  
  useFrame((state) => {
    if (questionRef.current) {
      questionRef.current.rotation.y += 0.02;
      questionRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + position[0]) * 0.3;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={2}>
      <group ref={questionRef} position={position}>
        {/* Question mark body */}
        <mesh>
          <torusGeometry args={[1, 0.3, 8, 16]} />
          <meshStandardMaterial color={color} metalness={0.6} roughness={0.3} />
        </mesh>
        
        {/* Question mark dot */}
        <mesh position={[0, -2, 0]}>
          <sphereGeometry args={[0.3, 16, 16]} />
          <meshStandardMaterial color={color} metalness={0.6} roughness={0.3} />
        </mesh>
      </group>
    </Float>
  );
}

// 3D Brain Component
function Brain3D() {
  const brainRef = useRef<any>();
  
  useFrame((state) => {
    if (brainRef.current) {
      brainRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
      brainRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.2;
    }
  });

  return (
    <Float speed={1} rotationIntensity={0.3} floatIntensity={1}>
      <group ref={brainRef} position={[0, 0, 0]}>
        {/* Main brain structure */}
        <mesh>
          <sphereGeometry args={[2, 16, 16]} />
          <meshStandardMaterial color="#ff6b9d" metalness={0.3} roughness={0.7} />
        </mesh>
        
        {/* Brain hemispheres */}
        <mesh position={[-0.5, 0, 0]}>
          <sphereGeometry args={[1.2, 16, 16]} />
          <meshStandardMaterial color="#ff8fab" metalness={0.3} roughness={0.7} />
        </mesh>
        <mesh position={[0.5, 0, 0]}>
          <sphereGeometry args={[1.2, 16, 16]} />
          <meshStandardMaterial color="#ff8fab" metalness={0.3} roughness={0.7} />
        </mesh>
        
        {/* Neural connections */}
        {Array.from({ length: 20 }).map((_, i) => (
          <mesh key={i} position={[
            (Math.random() - 0.5) * 4,
            (Math.random() - 0.5) * 4,
            (Math.random() - 0.5) * 4
          ]}>
            <sphereGeometry args={[0.1, 8, 8]} />
            <meshBasicMaterial color="#00ff88" />
          </mesh>
        ))}
      </group>
    </Float>
  );
}

// 3D Quiz Buzzer
function QuizBuzzer({ position }: { position: [number, number, number] }) {
  const buzzerRef = useRef<any>();
  
  useFrame((state) => {
    if (buzzerRef.current) {
      buzzerRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 2) * 0.1;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.2} floatIntensity={1}>
      <group ref={buzzerRef} position={position}>
        {/* Buzzer button */}
        <mesh position={[0, 0.5, 0]}>
          <cylinderGeometry args={[1, 1, 0.3, 16]} />
          <meshStandardMaterial color="#e74c3c" metalness={0.7} roughness={0.2} />
        </mesh>
        
        {/* Buzzer base */}
        <mesh>
          <cylinderGeometry args={[1.5, 1.5, 0.5, 16]} />
          <meshStandardMaterial color="#2c3e50" metalness={0.8} roughness={0.3} />
        </mesh>
        
        {/* Light indicator */}
        <mesh position={[0, 0.8, 0]}>
          <sphereGeometry args={[0.2, 16, 16]} />
          <meshBasicMaterial color="#00ff00" />
        </mesh>
      </group>
    </Float>
  );
}

const QuizCompetition = () => {
  const questionPositions: [number, number, number][] = [
    [-6, 3, 2], [6, 2, -2], [-4, 4, -3], [4, 1, 3], [-2, 5, 1], [2, 3, -1]
  ];
  
  const questionColors = ['#3498db', '#e74c3c', '#2ecc71', '#f39c12', '#9b59b6', '#1abc9c'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-green-900 to-slate-900">
      <Navbar />
      
      {/* Hero Section with Split Layout */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center min-h-screen">
            {/* Left Side - Event Information */}
            <div className="text-white space-y-6 z-10 relative pr-8">
              <Badge className="mb-4 bg-green-600 hover:bg-green-700 w-fit">
                <HelpCircle className="w-4 h-4 mr-2" />
                Day 4 - February 26th
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent leading-tight">
                Quiz Competition
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 max-w-lg">
                Test your knowledge across magical and muggle realms in this open house quiz challenge
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-gray-300">
                  <Calendar className="w-5 h-5 text-green-500" />
                  <span>February 26th, 2024</span>
                </div>
                <div className="flex items-center gap-3 text-gray-300">
                  <MapPin className="w-5 h-5 text-green-500" />
                  <span>Main Auditorium</span>
                </div>
                <div className="flex items-center gap-3 text-gray-300">
                  <Users className="w-5 h-5 text-green-500" />
                  <span>5 Members Team</span>
                </div>
                <div className="flex items-center gap-3 text-gray-300">
                  <Clock className="w-5 h-5 text-green-500" />
                  <span>3 Hours Duration</span>
                </div>
              </div>
              <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white">
                Register Team Now
              </Button>
            </div>

            {/* Right Side - 3D Scene */}
            <div className="h-[600px] lg:h-[700px] relative">
              <Canvas camera={{ position: [0, 0, 15], fov: 75 }}>
                <Suspense fallback={null}>
                  <Environment preset="night" />
                  <ambientLight intensity={0.4} />
                  <pointLight position={[10, 10, 10]} intensity={1} color="#00ff88" />
                  <spotLight position={[-10, -10, -10]} angle={0.15} penumbra={1} intensity={0.5} color="#3498db" />
                  
                  <group scale={0.7}>
                    <Brain3D />
                    <QuizBuzzer position={[-5, -2, 3]} />
                    <QuizBuzzer position={[5, -2, -3]} />
                    
                    {questionPositions.map((position, i) => (
                      <QuestionMark3D key={i} position={position} color={questionColors[i]} />
                    ))}
                  </group>
                  
                  <Sparkles count={100} scale={15} size={3} speed={0.5} color="#00ff88" />
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
              <Card className="bg-black/20 backdrop-blur-sm border-green-500/30">
                <CardHeader>
                  <CardTitle className="text-2xl text-white flex items-center gap-2">
                    <HelpCircle className="w-6 h-6 text-green-500" />
                    Quiz Competition Overview
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-gray-300 space-y-4">
                  <p>
                    Put your knowledge to the ultimate test! This comprehensive quiz competition 
                    covers diverse topics from science and technology to pop culture and current affairs. 
                    Form your dream team and compete for intellectual supremacy.
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-green-500" />
                      <span>February 26th, 2024</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-green-500" />
                      <span>Main Auditorium</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-5 h-5 text-green-500" />
                      <span>5 Members Team</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-5 h-5 text-green-500" />
                      <span>3 Hours</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-black/20 backdrop-blur-sm border-green-500/30">
                <CardHeader>
                  <CardTitle className="text-2xl text-white">Quiz Categories</CardTitle>
                </CardHeader>
                <CardContent className="text-gray-300">
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      'Science & Technology',
                      'History & Geography',
                      'Literature & Arts',
                      'Sports & Entertainment',
                      'Current Affairs',
                      'Mathematics',
                      'Pop Culture',
                      'Business & Economics',
                      'Movies & Music',
                      'General Knowledge'
                    ].map((category) => (
                      <div key={category} className="p-3 bg-green-500/10 rounded-lg text-center">
                        <span className="text-green-400 font-medium">{category}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-black/20 backdrop-blur-sm border-green-500/30">
                <CardHeader>
                  <CardTitle className="text-2xl text-white">Competition Format</CardTitle>
                </CardHeader>
                <CardContent className="text-gray-300">
                  <div className="space-y-4">
                    <div className="p-4 bg-blue-500/10 rounded-lg">
                      <h4 className="font-semibold text-blue-400 mb-2">Round 1: Written Elimination</h4>
                      <p className="text-sm">50 questions across all categories - top 8 teams qualify</p>
                    </div>
                    <div className="p-4 bg-yellow-500/10 rounded-lg">
                      <h4 className="font-semibold text-yellow-400 mb-2">Round 2: Buzzer Round</h4>
                      <p className="text-sm">Fast-paced buzzer questions - top 4 teams advance</p>
                    </div>
                    <div className="p-4 bg-red-500/10 rounded-lg">
                      <h4 className="font-semibold text-red-400 mb-2">Round 3: Final Showdown</h4>
                      <p className="text-sm">Audio-visual round with bonus questions</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Timeline & Prizes */}
            <div className="space-y-8">
              <Card className="bg-black/20 backdrop-blur-sm border-green-500/30">
                <CardHeader>
                  <CardTitle className="text-2xl text-white">Event Timeline</CardTitle>
                </CardHeader>
                <CardContent className="text-gray-300">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-green-500/10 rounded-lg">
                      <span>Team Registration</span>
                      <span className="text-green-400">2:00 PM - 2:30 PM</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-blue-500/10 rounded-lg">
                      <span>Round 1: Written</span>
                      <span className="text-blue-400">2:30 PM - 3:30 PM</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-orange-500/10 rounded-lg">
                      <span>Results & Break</span>
                      <span className="text-orange-400">3:30 PM - 4:00 PM</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-yellow-500/10 rounded-lg">
                      <span>Round 2: Buzzer</span>
                      <span className="text-yellow-400">4:00 PM - 4:45 PM</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-red-500/10 rounded-lg">
                      <span>Round 3: Finals</span>
                      <span className="text-red-400">5:00 PM - 5:45 PM</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-purple-500/10 rounded-lg">
                      <span>Prize Distribution</span>
                      <span className="text-purple-400">6:00 PM</span>
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
                      <span className="font-semibold">🧠 Quiz Champions</span>
                      <span className="text-yellow-400">₹40,000</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-500/10 rounded-lg">
                      <span className="font-semibold">🥈 Knowledge Masters</span>
                      <span className="text-gray-400">₹25,000</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-orange-500/10 rounded-lg">
                      <span className="font-semibold">🥉 Trivia Experts</span>
                      <span className="text-orange-400">₹15,000</span>
                    </div>
                    <div className="text-center mt-4 p-3 bg-green-500/10 rounded-lg">
                      <span className="text-green-400">Special prizes for best team name & fastest buzzer</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-black/20 backdrop-blur-sm border-blue-500/30">
                <CardHeader>
                  <CardTitle className="text-2xl text-white flex items-center gap-2">
                    <Brain className="w-6 h-6 text-blue-500" />
                    Team Formation Tips
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-gray-300">
                  <ul className="space-y-2 list-disc list-inside">
                    <li>Mix different academic backgrounds</li>
                    <li>Include someone good with current affairs</li>
                    <li>Have a sports enthusiast on the team</li>
                    <li>Include a pop culture expert</li>
                    <li>Choose a quick decision-maker as captain</li>
                    <li>Practice buzzer timing together</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-black/20 backdrop-blur-sm border-purple-500/30">
                <CardHeader>
                  <CardTitle className="text-2xl text-white flex items-center gap-2">
                    <Zap className="w-6 h-6 text-purple-500" />
                    What to Expect
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-gray-300">
                  <ul className="space-y-2 list-disc list-inside">
                    <li>Professional quiz setup with buzzers</li>
                    <li>Audio-visual questions with multimedia</li>
                    <li>Experienced quizmaster and judges</li>
                    <li>Live scoring and leaderboard</li>
                    <li>Audience participation rounds</li>
                    <li>Photography of winning moments</li>
                    <li>Refreshments during breaks</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center mt-16">
            <div className="space-y-4">
              <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white mr-4">
                Register Your Team
              </Button>
              <Link to="/">
                <Button variant="outline" size="lg" className="border-green-500 text-green-400 hover:bg-green-500/10">
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

export default QuizCompetition;