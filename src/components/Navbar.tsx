import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sparkles, Menu, X, Zap, Castle, Wand2 } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b border-border/50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2 group">
            <Sparkles className="w-6 h-6 text-primary" />
            <span className="text-xl font-bold text-gradient-gold">AURORA 2K26</span>
            <Wand2 className="w-4 h-4 text-primary/70 group-hover:text-primary transition-colors" />
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#events" className="text-muted-foreground hover:text-primary transition-all duration-300 flex items-center gap-1 px-3 py-1 rounded-full">
              <Castle className="w-4 h-4" />
              Events
            </a>
            <a href="#team" className="text-muted-foreground hover:text-primary transition-all duration-300 flex items-center gap-1 px-3 py-1 rounded-full">
              <Zap className="w-4 h-4" />
              Team
            </a>
            <a href="#contact" className="text-muted-foreground hover:text-primary transition-all duration-300 flex items-center gap-1 px-3 py-1 rounded-full">
              <Sparkles className="w-4 h-4" />
              Contact
            </a>
            <Button size="sm" className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary text-primary-foreground">
              🪄 Register Now
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-foreground p-2 rounded-full hover:bg-primary/10 transition-colors"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-border/50 bg-black/20 backdrop-blur-sm rounded-b-lg">
            <div className="flex flex-col gap-4">
              <a
                href="#events"
                className="text-muted-foreground hover:text-primary transition-all duration-300 flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-primary/10"
                onClick={() => setIsOpen(false)}
              >
                <Castle className="w-4 h-4" />
                Events
              </a>
              <a
                href="#team"
                className="text-muted-foreground hover:text-primary transition-all duration-300 flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-primary/10"
                onClick={() => setIsOpen(false)}
              >
                <Zap className="w-4 h-4" />
                Team
              </a>
              <a
                href="#contact"
                className="text-muted-foreground hover:text-primary transition-all duration-300 flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-primary/10"
                onClick={() => setIsOpen(false)}
              >
                <Sparkles className="w-4 h-4" />
                Contact
              </a>
              <Button size="sm" className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary text-primary-foreground w-fit mx-4">
                🪄 Register Now
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
