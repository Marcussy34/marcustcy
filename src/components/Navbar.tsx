"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Menu, X, Github, Linkedin, Mail, Terminal } from "lucide-react";

const navLinks = [
  { name: "~/about", href: "#about" },
  { name: "~/projects", href: "#projects" },
  { name: "~/achievements", href: "#achievements" },
  { name: "~/experience", href: "#experience" },
  { name: "~/contact", href: "#contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
        scrolled ? "bg-background/90 backdrop-blur-md border-border" : "bg-transparent border-transparent"
      }`}
    >
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 text-lg font-bold tracking-tight text-primary hover:text-white transition-colors">
          <Terminal size={20} />
          <span>marcus.tan</span>
          <span className="animate-pulse">_</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-gray-400 hover:text-primary transition-colors"
            >
              {link.name}
            </Link>
          ))}
          <div className="flex items-center gap-4 ml-4 border-l border-border pl-4">
            <a href="https://github.com/Marcussy34" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary transition-colors">
              <Github size={18} />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary transition-colors">
              <Linkedin size={18} />
            </a>
            <a href="mailto:marcus.tanchiyau@gmail.com" className="text-gray-400 hover:text-primary transition-colors">
              <Mail size={18} />
            </a>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-primary"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="md:hidden bg-background border-b border-border"
        >
          <div className="container mx-auto px-6 py-4 flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-base font-medium text-gray-400 hover:text-primary"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <div className="flex gap-6 mt-2 pt-4 border-t border-border">
              <a href="https://github.com/Marcussy34" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary">
                <Github size={20} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary">
                <Linkedin size={20} />
              </a>
              <a href="mailto:marcus.tanchiyau@gmail.com" className="text-gray-400 hover:text-primary">
                <Mail size={20} />
              </a>
            </div>
          </div>
        </motion.div>
      )}
    </nav>
  );
}
