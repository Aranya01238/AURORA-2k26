import { Sparkles, Calendar, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import HogwartsSceneBackground from "./HogwartsSceneBackground";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Cinematic Hogwarts Scene Background */}
      <HogwartsSceneBackground />
      
      {/* Enhanced magical overlay gradient for castle visibility */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/10 via-background/30 to-background/70 pointer-events-none" style={{ zIndex: 2 }} />
      <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent pointer-events-none" style={{ zIndex: 2 }} />
      <div className="relative text-center px-4 max-w-5xl mx-auto" style={{ zIndex: 10 }}>
        {/* Magical badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full magical-border mb-8 bg-black/30 backdrop-blur-sm">
          <Sparkles className="w-4 h-4 text-primary" />
          <span className="text-sm tracking-widest uppercase text-muted-foreground">A Magical Experience Awaits</span>
        </div>

        {/* Main title with increased padding */}
        <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold mb-4 text-gradient-gold tracking-wider drop-shadow-2xl px-8 py-6">
          AURORA
        </h1>
        <p className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-6 drop-shadow-lg px-6 py-3">2K26</p>
        
        {/* Theme */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-primary" />
          <p className="text-xl md:text-2xl text-foreground/90 italic font-semibold bg-black/20 px-4 py-2 rounded-full backdrop-blur-sm">
            ⚡ Theme: Harry Potter ⚡
          </p>
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-primary" />
        </div>

        {/* Event details */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-10 text-muted-foreground">
          <div className="flex items-center gap-2 bg-black/30 px-4 py-2 rounded-full backdrop-blur-sm">
            <Calendar className="w-5 h-5 text-primary" />
            <span className="text-lg font-medium">23rd - 27th February 2026</span>
          </div>
          <div className="hidden md:block w-2 h-2 rounded-full bg-primary" />
          <div className="flex items-center gap-2 bg-black/30 px-4 py-2 rounded-full backdrop-blur-sm">
            <MapPin className="w-5 h-5 text-primary" />
            <span className="text-lg font-medium">Hogwarts School of Witchcraft</span>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="text-lg px-8 magical-glow bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary text-primary-foreground shadow-2xl transform hover:scale-105 transition-all duration-300">
            🪄 Cast Your Registration Spell
          </Button>
          <Button size="lg" variant="outline" className="text-lg px-8 border-primary/50 hover:bg-primary/10 bg-black/20 backdrop-blur-sm shadow-xl transform hover:scale-105 transition-all duration-300">
            🏰 Explore Magical Events
          </Button>
        </div>

        {/* Scroll indicator with magical styling */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
          <div className="w-6 h-10 rounded-full border-2 border-primary/50 flex justify-center pt-2 bg-black/20 backdrop-blur-sm">
            <div className="w-1 h-3 bg-primary rounded-full animate-bounce" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
