import { Sparkles, Instagram, Twitter, Mail, Phone } from "lucide-react";

const Footer = () => {
  return (
    <footer className="py-16 px-4 border-t border-border/50 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 mb-4">
              <Sparkles className="w-6 h-6 text-primary" />
              <h3 className="text-2xl font-bold text-gradient-gold">AURORA 2K26</h3>
            </div>
            <p className="text-muted-foreground">
              A magical journey awaits. Experience the wonder of Harry Potter through five days of extraordinary events.
            </p>
          </div>

          {/* Quick Links */}
          <div className="text-center">
            <h4 className="text-lg font-semibold text-foreground mb-4">Quick Links</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li><a href="#events" className="hover:text-primary transition-colors">Events</a></li>
              <li><a href="#team" className="hover:text-primary transition-colors">Team</a></li>
              <li><a href="#register" className="hover:text-primary transition-colors">Register</a></li>
              <li><a href="#contact" className="hover:text-primary transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="text-center md:text-right">
            <h4 className="text-lg font-semibold text-foreground mb-4">Get In Touch</h4>
            <div className="space-y-3">
              <a href="mailto:contact@aurora2k26.com" className="flex items-center justify-center md:justify-end gap-2 text-muted-foreground hover:text-primary transition-colors">
                <Mail className="w-4 h-4" />
                contact@aurora2k26.com
              </a>
              <a href="tel:+1234567890" className="flex items-center justify-center md:justify-end gap-2 text-muted-foreground hover:text-primary transition-colors">
                <Phone className="w-4 h-4" />
                +123 456 7890
              </a>
              <div className="flex items-center justify-center md:justify-end gap-4 pt-2">
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  <Twitter className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border/30 text-center text-muted-foreground text-sm">
          <p>© 2026 AURORA 2K26. All rights reserved. ✨ Mischief Managed ✨</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
