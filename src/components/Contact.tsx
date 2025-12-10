"use client";

import { Github, Linkedin, Mail, Terminal } from "lucide-react";

// Custom Twitter/X icon component
const TwitterX = ({ size = 24 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

export default function Contact() {
  return (
    <footer id="contact" className="py-24 relative border-t border-border bg-black">
      <div className="container mx-auto px-6 text-center">
        <div
          className="max-w-2xl mx-auto mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-muted border border-border rounded mb-8">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-xs font-mono text-gray-400">System Status: Online</span>
          </div>

          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
            <span className="text-primary">echo</span> "Let's Connect"
          </h2>
          <p className="text-gray-400 text-lg mb-8 font-mono">
            // Ready to collaborate on AI, Blockchain, and Secure Systems.
          </p>
          
          <a
            href="mailto:marcus.tanchiyau@gmail.com"
            className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-black font-bold hover:bg-accent transition-colors"
          >
            <Mail size={20} />
            Send Message
          </a>
        </div>

        <div className="flex justify-center gap-6 mb-12">
          <a
            href="https://github.com/Marcussy34"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 border border-border hover:border-primary hover:text-primary transition-all hover:-translate-y-1"
          >
            <Github size={24} />
          </a>
          <a
            href="https://www.linkedin.com/in/marcus-tan-chi-yau-7a6a4b21b/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 border border-border hover:border-primary hover:text-primary transition-all hover:-translate-y-1"
          >
            <Linkedin size={24} />
          </a>
          <a
            href="https://x.com/marcustan1337"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 border border-border hover:border-primary hover:text-primary transition-all hover:-translate-y-1"
          >
            <TwitterX size={24} />
          </a>
        </div>

        <div className="border-t border-border pt-8 text-gray-500 text-xs font-mono">
          <p className="flex items-center justify-center gap-2">
            <Terminal size={12} />
            <span>Executed by Marcus Tan © {new Date().getFullYear()}</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
