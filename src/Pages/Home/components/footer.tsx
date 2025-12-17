"use client";

import { Facebook, Instagram, Linkedin, Youtube, X, Mail, Phone, MapPin, Send } from "lucide-react";
import { Link } from "react-router-dom";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function TechTalkFooter() {
  return (
    <footer className="w-full bg-muted/30 border-t border-border mt-20">
      <div className="container mx-auto px-6 pt-16 pb-8 max-w-7xl">
        
        {/* Top Section: Newsletter & Brand */}
        <div className="flex flex-col lg:flex-row justify-between gap-12 mb-16">
          <div className="max-w-sm space-y-6">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold tracking-tighter text-foreground">
                TECH TALK CLUB
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Empowering the next generation of engineers through collaboration, 
                innovation, and shared technical knowledge at Global Group of Institutes.
              </p>
            </div>
            
            {/* Social Icons with subtle tooltips/labels */}
            <div className="flex items-center gap-3">
              {[
                { icon: Facebook, href: "#" },
                { icon: Instagram, href: "#" },
                { icon: Linkedin, href: "#" },
                { icon: Youtube, href: "#" },
                { icon: X, href: "#" },
              ].map((social, i) => (
                <a 
                  key={i} 
                  href={social.href} 
                  className="h-9 w-9 flex items-center justify-center rounded-full bg-background border border-border text-muted-foreground hover:text-primary hover:border-primary/50 transition-all duration-300 shadow-sm"
                >
                  <social.icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Newsletter Subscription */}
          <div className="max-w-md w-full p-6 bg-background rounded-2xl border border-border shadow-sm">
            <h3 className="text-sm font-semibold mb-2">Subscribe to our newsletter</h3>
            <p className="text-xs text-muted-foreground mb-4">Get the latest event updates and tech news delivered to your inbox.</p>
            <div className="flex gap-2">
              <Input 
                placeholder="Email address" 
                className="bg-muted/50 border-none focus-visible:ring-1 focus-visible:ring-primary"
              />
              <Button size="icon" className="shrink-0">
                <Send size={16} />
              </Button>
            </div>
          </div>
        </div>

        {/* Middle Section: Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
          <div>
            <h3 className="mb-6 text-sm font-bold uppercase tracking-wider text-foreground/70">Navigate</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><Link to="/" className="hover:text-primary transition-colors">Home</Link></li>
              <li><Link to="/about" className="hover:text-primary transition-colors">About Us</Link></li>
              <li><Link to="/events" className="hover:text-primary transition-colors">Major Events</Link></li>
              <li><Link to="/notice" className="hover:text-primary transition-colors">Announcements</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="mb-6 text-sm font-bold uppercase tracking-wider text-foreground/70">Community</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><Link to="/leaderboard" className="hover:text-primary transition-colors">Rankings</Link></li>
              <li><Link to="/members" className="hover:text-primary transition-colors">Core Team</Link></li>
              <li><Link to="/gallery" className="hover:text-primary transition-colors">Photo Gallery</Link></li>
              <li><Link to="/contact" className="hover:text-primary transition-colors">Get in Touch</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="mb-6 text-sm font-bold uppercase tracking-wider text-foreground/70">Resources</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">Coding Notes</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Interview Prep</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Open Source</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Tech Stack</a></li>
            </ul>
          </div>

          <div>
            <h3 className="mb-6 text-sm font-bold uppercase tracking-wider text-foreground/70">Contact Info</h3>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-primary shrink-0" />
                <span>Global Group of Institutes, 11th Km Stone, Amritsar, Punjab</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-primary shrink-0" />
                <span>techtalkclubggi@gmail.com</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-primary shrink-0" />
                <span>+91 96931 35466</span>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="mt-16 mb-8 opacity-50" />

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-[13px] text-muted-foreground">
          <div className="flex flex-col md:flex-row items-center gap-2 md:gap-6">
            <p>© 2025 Tech Talk Club. All rights reserved.</p>
            <div className="flex gap-4">
              <a href="#" className="hover:underline">Privacy Policy</a>
              <a href="#" className="hover:underline">Terms of Service</a>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
            <p className="font-medium">System Operational</p>
          </div>
        </div>
        
        <div className="mt-8 text-center">
            <p className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground/40 font-bold">
              Dept. of CSE / IT / AI & ML
            </p>
        </div>
      </div>
    </footer>
  );
}