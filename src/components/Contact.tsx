"use client";

import { Github, Linkedin, Mail, Terminal, Send } from "lucide-react";
import PixelBlast from "./PixelBlast";
import { motion } from "framer-motion";

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
    <footer id="contact" className="py-24 relative border-t border-border bg-black overflow-hidden">
      {/* Interactive Background */}
      <div className="absolute inset-0 opacity-20 pointer-events-auto">
        <PixelBlast 
            pixelSize={12} 
            color="#22c55e" 
            patternScale={4} 
            enableRipples={true} 
            rippleIntensityScale={2}
        />
      </div>

      <div className="container mx-auto px-6 text-center relative z-10">
        <div
          className="max-w-2xl mx-auto mb-12"
        >
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-muted/80 backdrop-blur-md border border-border rounded mb-8 shadow-lg"
          >
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.8)]" />
            <span className="text-xs font-mono text-gray-400">System Status: Online</span>
          </motion.div>

          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
            <span className="text-primary">echo</span> <span className="text-white">"Let's Connect"</span>
          </h2>
          <p className="text-gray-400 text-lg mb-8 font-mono">
            // Ready to collaborate on AI, Blockchain, and Secure Systems.
          </p>
          
          <motion.a
            href="mailto:marcus.tanchiyau@gmail.com"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group relative inline-flex items-center gap-3 px-8 py-4 bg-primary text-black font-bold text-lg overflow-hidden rounded-md transition-all hover:shadow-[0_0_20px_rgba(34,197,94,0.6)]"
          >
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            <Terminal size={20} className="group-hover:rotate-12 transition-transform" />
            <span>./send_message.sh</span>
            <Send size={16} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
          </motion.a>
        </div>

        <div className="flex justify-center gap-6 mb-12">
          {[
            { Icon: Github, href: "https://github.com/Marcussy34" },
            { Icon: Linkedin, href: "https://www.linkedin.com/in/marcus-tan-8846ba271/" },
            { Icon: TwitterX, href: "https://x.com/marcustan1337" }
          ].map((social, index) => (
            <motion.a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -5, color: "var(--primary)" }}
                className="p-4 border border-border bg-black/50 backdrop-blur hover:border-primary transition-colors rounded-full"
            >
                <social.Icon size={24} />
            </motion.a>
          ))}
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
