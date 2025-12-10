"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Terminal, Github, Linkedin, Mail, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { name: "~/about", href: "#about" },
  { name: "~/projects", href: "#projects" },
  { name: "~/achievements", href: "#achievements" },
  { name: "~/experience", href: "#experience" },
  { name: "~/contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setScrolled(scrollY > 50);
      // Show navbar when scrolled down even slightly (past 20px)
      if (scrollY > 20) {
        setShowNavbar(true);
      } else {
        setShowNavbar(false);
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      // Show navbar when mouse is near top (within 100px)
      if (e.clientY < 100) {
        setShowNavbar(true);
      } else if (window.scrollY <= 20) {
        // Only hide if we're at the top and mouse moved away
        setShowNavbar(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("mousemove", handleMouseMove);
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300 bg-background/70 backdrop-blur-md border-b border-border",
        scrolled ? "py-4 shadow-lg shadow-primary/5" : "py-6",
        showNavbar ? "translate-y-0" : "-translate-y-full"
      )}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 text-lg font-bold tracking-tight text-primary hover:text-white transition-colors">
          <Terminal size={20} />
          <span>marcus.tan</span>
          <span className="animate-pulse">_</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm font-mono text-gray-400 hover:text-primary transition-colors"
            >
              {link.name}
            </Link>
          ))}
          <div className="h-4 w-px bg-border" />
          <div className="flex items-center gap-4">
            <a href="https://github.com/Marcussy34" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary transition-colors">
              <Github size={18} />
            </a>
            <a href="https://www.linkedin.com/in/marcus-tan-chi-yau-7a6a4b21b/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary transition-colors">
              <Linkedin size={18} />
            </a>
            <a href="mailto:marcus.tanchiyau@gmail.com" className="text-gray-400 hover:text-primary transition-colors">
              <Mail size={18} />
            </a>
          </div>
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav */}
      <div 
        className={cn(
          "md:hidden absolute top-full left-0 w-full bg-background border-b border-border overflow-hidden transition-all duration-300 ease-in-out",
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <nav className="flex flex-col p-6 gap-4">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm font-mono text-gray-400 hover:text-primary transition-colors"
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <div className="flex items-center gap-6 pt-4 border-t border-border">
            <a href="https://github.com/Marcussy34" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary transition-colors">
              <Github size={20} />
            </a>
            <a href="https://www.linkedin.com/in/marcus-tan-chi-yau-7a6a4b21b/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary transition-colors">
              <Linkedin size={20} />
            </a>
            <a href="mailto:marcus.tanchiyau@gmail.com" className="text-gray-400 hover:text-primary transition-colors">
              <Mail size={20} />
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
