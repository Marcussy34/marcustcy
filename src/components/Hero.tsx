"use client";

import { Terminal, ChevronRight, Mail } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import PixelBlast from "./PixelBlast";

export default function Hero() {
  const [text, setText] = useState("");
  const [initText, setInitText] = useState("");
  const [descriptionText, setDescriptionText] = useState("");
  const [bootStep, setBootStep] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const initIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const titleIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const descIntervalRef = useRef<NodeJS.Timeout | null>(null);
  
  const fullInitText = "whoami --verbose";
  const fullText = "$ compose dApps & AI solutions";
  const fullDescription = "I'm Marcus Tan. CS Graduate (AI & Cybersecurity) from Taylor's University. I specialize in building AI applications, Web3 dApps, and Full-Stack solutions.";

  // Boot Sequence Animation
  useEffect(() => {
    const timeouts: NodeJS.Timeout[] = [];

    // Step 1: Start typing "whoami --verbose"
    timeouts.push(setTimeout(() => setBootStep(1), 300));
    
    // Init typing duration: 16 chars * 50ms = 800ms
    // 300 + 800 = 1100ms
    
    // Step 2: Show location
    timeouts.push(setTimeout(() => setBootStep(2), 1300));
    
    // Step 3: Show focus
    timeouts.push(setTimeout(() => setBootStep(3), 1700));
    
    // Step 4: Show status
    timeouts.push(setTimeout(() => setBootStep(4), 2100));

    // Step 5: Start Typing Main Content
    timeouts.push(setTimeout(() => setBootStep(5), 2700));
    
    // Title typing duration: 30 chars * 40ms = 1200ms
    // 2700 + 1200 = 3900ms
    
    // Step 6: Start Typing Description
    timeouts.push(setTimeout(() => setBootStep(6), 4000));

    // Description typing duration: ~153 chars * 20ms = 3060ms
    // 4000 + 3060 = 7060ms

    // Step 7: Show first button (view_projects)
    timeouts.push(setTimeout(() => setBootStep(7), 7100));

    // Step 8: Show second button (contact_me)
    timeouts.push(setTimeout(() => setBootStep(8), 7300));

    return () => timeouts.forEach(clearTimeout);
  }, []);

  // Typing Logic
  useEffect(() => {
    // Start Init Command Typing
    if (bootStep >= 1 && !initIntervalRef.current) {
      let i = 0;
      initIntervalRef.current = setInterval(() => {
        setInitText(fullInitText.slice(0, i + 1));
        i++;
        if (i > fullInitText.length) {
          if (initIntervalRef.current) clearInterval(initIntervalRef.current);
        }
      }, 50);
    }

    // Start Title Typing
    if (bootStep >= 5 && !titleIntervalRef.current) {
      let i = 0;
      titleIntervalRef.current = setInterval(() => {
        setText(fullText.slice(0, i + 1));
        i++;
        if (i > fullText.length) {
          if (titleIntervalRef.current) clearInterval(titleIntervalRef.current);
        }
      }, 40);
    }

    // Start Description Typing
    if (bootStep >= 6 && !descIntervalRef.current) {
      let i = 0;
      descIntervalRef.current = setInterval(() => {
        setDescriptionText(fullDescription.slice(0, i + 1));
        i++;
        if (i > fullDescription.length) {
          if (descIntervalRef.current) clearInterval(descIntervalRef.current);
        }
      }, 20);
    }
  }, [bootStep]);

  // Cleanup intervals on unmount
  useEffect(() => {
    return () => {
      if (initIntervalRef.current) clearInterval(initIntervalRef.current);
      if (titleIntervalRef.current) clearInterval(titleIntervalRef.current);
      if (descIntervalRef.current) clearInterval(descIntervalRef.current);
    };
  }, []);



  // Helper to highlight "Marcus Tan" in the description
  const renderDescription = () => {
    if (!descriptionText) return null;
    
    // Split by "Marcus Tan" to highlight it
    const parts = descriptionText.split("Marcus Tan");
    if (parts.length === 1) return <span className="text-gray-400">{parts[0]}</span>;
    
    return (
      <>
        <span className="text-gray-400">{parts[0]}</span>
        <span className="text-primary">Marcus Tan</span>
        <span className="text-gray-400">{parts[1]}</span>
      </>
    );
  };

  return (
    <section className="min-h-screen flex items-center justify-center pt-20 relative overflow-hidden">
      {/* PixelBlast Background */}
      <div className="absolute inset-0 z-0">
        <PixelBlast
          variant="square"
          pixelSize={12}
          color="#22c55e" // Terminal Green
          patternScale={10}
          patternDensity={1}
          pixelSizeJitter={0.2}
          enableRipples={true}
          rippleSpeed={0.5}
          rippleThickness={0.05}
          rippleIntensityScale={2}
          speed={1}
          edgeFade={0.1}
          transparent={true}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Terminal Window */}
          <div
            className={`terminal-card rounded-lg overflow-hidden shadow-2xl h-[500px] flex flex-col transition-all duration-500 ease-out transform ${
              bootStep >= 0 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            {/* Terminal Header */}
            <div className="bg-muted px-4 py-2 flex items-center gap-2 border-b border-border shrink-0">
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
            <div 
              ref={scrollRef}
              className="p-6 md:p-10 font-mono text-sm md:text-base space-y-6 flex-1 overflow-hidden"
            >
              <div className="space-y-2">
                {bootStep >= 1 && (
                  <div className="flex items-center gap-2 text-primary">
                    <ChevronRight size={16} />
                    <span className="text-white">
                      {initText}
                      {bootStep < 2 && <span className="cursor-blink text-primary">_</span>}
                    </span>
                  </div>
                )}
                
                <div className="text-muted-foreground pl-6 space-y-1">
                  {bootStep >= 2 && (
                    <div><span className="text-primary">location:</span> <span className="text-gray-400">Subang Jaya, Malaysia 🇲🇾</span></div>
                  )}
                  {bootStep >= 3 && (
                    <div><span className="text-primary">focus:</span> <span className="text-gray-400">AI · Web3 · Full-Stack</span></div>
                  )}
                  {bootStep >= 4 && (
                    <div><span className="text-primary">status:</span> <span className="text-green-400">Full-time building 🚀</span></div>
                  )}
                </div>
              </div>

              {bootStep >= 5 && (
                <div className="space-y-4 py-4">
                  <div className="text-base md:text-lg text-white font-mono tracking-tight">
                    <span className="text-primary mr-2">➜</span>
                    {text}
                    {bootStep < 6 && <span className="cursor-blink text-primary">_</span>}
                  </div>
                  
                  {bootStep >= 6 && (
                    <div className="pl-6 text-gray-400 max-w-2xl leading-relaxed font-mono">
                      {renderDescription()}
                      {bootStep < 7 && <span className="cursor-blink text-primary">_</span>}
                    </div>
                  )}

                  <div className="space-y-2 pt-4 pl-6">
                    {bootStep >= 7 && (
                      <a
                        href="#projects"
                        className="block text-gray-400 hover:text-primary transition-colors group"
                      >
                        <span className="text-primary">$</span> ./view_projects.sh <span className="text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">← click to run</span>
                      </a>
                    )}
                    {bootStep >= 8 && (
                      <a
                        href="#contact"
                        className="block text-gray-400 hover:text-primary transition-colors group"
                      >
                        <span className="text-primary">$</span> ./contact_me.sh <span className="text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">← click to run</span>
                      </a>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
