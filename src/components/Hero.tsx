"use client";

import { motion } from "framer-motion";
import { Terminal, ChevronRight, Mail } from "lucide-react";
import { useState, useEffect } from "react";

export default function Hero() {
  const [text, setText] = useState("");
  const [bootStep, setBootStep] = useState(0);
  const fullText = "Building the Intelligent Future...";

  // Boot Sequence Animation
  useEffect(() => {
    const timeouts: NodeJS.Timeout[] = [];

    // Step 1: init portfolio.exe
    timeouts.push(setTimeout(() => setBootStep(1), 500));
    // Step 2: Loading modules...
    timeouts.push(setTimeout(() => setBootStep(2), 1200));
    // Step 3: AI_Agents loaded
    timeouts.push(setTimeout(() => setBootStep(3), 1600));
    // Step 4: Blockchain_Protocols loaded
    timeouts.push(setTimeout(() => setBootStep(4), 2000));
    // Step 5: Cybersecurity_Matrix loaded
    timeouts.push(setTimeout(() => setBootStep(5), 2400));
    // Step 6: Show Main Content
    timeouts.push(setTimeout(() => setBootStep(6), 2800));

    return () => timeouts.forEach(clearTimeout);
  }, []);

  // Typing Effect (Only starts after boot sequence)
  useEffect(() => {
    if (bootStep < 6) return;

    let i = 0;
    const interval = setInterval(() => {
      setText(fullText.slice(0, i + 1));
      i++;
      if (i > fullText.length) clearInterval(interval);
    }, 50); // Faster typing
    return () => clearInterval(interval);
  }, [bootStep]);

  return (
    <section className="min-h-screen flex items-center justify-center pt-20 relative overflow-hidden">
      {/* Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#262626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20 pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Terminal Window */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="terminal-card rounded-lg overflow-hidden shadow-2xl min-h-[500px] flex flex-col"
          >
            {/* Terminal Header */}
            <div className="bg-muted px-4 py-2 flex items-center gap-2 border-b border-border">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/50" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                <div className="w-3 h-3 rounded-full bg-green-500/50" />
              </div>
              <div className="flex-1 text-center text-xs text-muted-foreground font-mono">
                marcus@portfolio: ~
              </div>
            </div>

            {/* Terminal Content */}
            <div className="p-6 md:p-10 font-mono text-sm md:text-base space-y-6 flex-1">
              <div className="space-y-2">
                {bootStep >= 1 && (
                  <div className="flex items-center gap-2 text-primary">
                    <ChevronRight size={16} />
                    <span className="text-white">init portfolio.exe</span>
                  </div>
                )}
                
                <div className="text-muted-foreground pl-6 space-y-1">
                  {bootStep >= 2 && <div>Loading modules...</div>}
                  {bootStep >= 3 && (
                    <div><span className="text-primary">✔</span> AI_Agents loaded</div>
                  )}
                  {bootStep >= 4 && (
                    <div><span className="text-primary">✔</span> Blockchain_Protocols loaded</div>
                  )}
                  {bootStep >= 5 && (
                    <div><span className="text-primary">✔</span> Cybersecurity_Matrix loaded</div>
                  )}
                </div>
              </div>

              {bootStep >= 6 && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-4 py-4"
                >
                  <h1 className="text-3xl md:text-5xl font-bold text-white tracking-tight min-h-[1.2em]">
                    {text}<span className="cursor-blink text-primary">_</span>
                  </h1>
                  <motion.p 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="text-gray-400 max-w-2xl leading-relaxed"
                  >
                    I'm <span className="text-primary">Marcus Tan</span>. I engineer decentralized systems and autonomous agents that bridge the gap between Web2 and Web3.
                  </motion.p>

                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    className="flex flex-col sm:flex-row gap-4 pt-4"
                  >
                    <a
                      href="#projects"
                      className="px-6 py-3 bg-primary text-black font-bold hover:bg-accent transition-colors flex items-center gap-2 w-fit"
                    >
                      <Terminal size={18} />
                      ./view_projects.sh
                    </a>
                    <a
                      href="#contact"
                      className="px-6 py-3 border border-border text-gray-300 hover:border-primary hover:text-primary transition-colors flex items-center gap-2 w-fit"
                    >
                      <Mail size={18} />
                      ./contact_me.sh
                    </a>
                  </motion.div>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
