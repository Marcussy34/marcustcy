"use client";

import { Terminal, ChevronRight, Mail, Loader2 } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import PixelBlast from "./PixelBlast";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const [text, setText] = useState("");
  const [initText, setInitText] = useState("");
  const [bootStep, setBootStep] = useState(0);
  const [showInstalling, setShowInstalling] = useState(false);
  const [showOutput, setShowOutput] = useState(false);
  const [asciiLineIndex, setAsciiLineIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const initIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const titleIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const asciiIntervalRef = useRef<NodeJS.Timeout | null>(null);
  
  const fullInitText = "whoami --verbose";
  const fullText = "$ npm install marcus-tan";
  
  // ASCII Art lines
  const asciiLines = [
    "   ╔════════════════════════╗",
    "   ║  ┌────────────────────┐║",
    "   ║  │    ~/portfolio     │║",
    "   ║  │────────────────────│║",
    "   ║  │  > init.sh         │║",
    "   ║  │  > skills.js       │║",
    "   ║  │  > build.ts        │║",
    "   ║  │  > deploy..        │║",
    "   ║  └────────────────────┘║",
    "   ╚════════════════════════╝",
    "       ╱╲______________╱╲",
    "      ╱                  ╲",
    "     ╱____________________╲",
    "    │  ──────────────────  │",
    "    │    [AI]   [WEB3]     │",
    "    │     [FULLSTACK]      │",
    "    └──────────────────────┘",
  ];

  // Boot Sequence Animation
  useEffect(() => {
    const timeouts: NodeJS.Timeout[] = [];

    // Step 1: Start typing "whoami --verbose"
    timeouts.push(setTimeout(() => setBootStep(1), 300));
    
    // Step 2: Show location
    timeouts.push(setTimeout(() => setBootStep(2), 1300));
    
    // Step 3: Show focus
    timeouts.push(setTimeout(() => setBootStep(3), 1700));
    
    // Step 4: Show status
    timeouts.push(setTimeout(() => setBootStep(4), 2100));

    // Step 5: Start Typing npm install command
    timeouts.push(setTimeout(() => setBootStep(5), 2700));
    
    // Command typing duration: ~24 chars * 40ms = 960ms
    // 2700 + 960 = 3660ms
    
    // Step 6: Show "Installing..." after command finishes typing
    timeouts.push(setTimeout(() => {
      setShowInstalling(true);
      setBootStep(6);
    }, 3800));
    
    // Step 7: Show npm output (instant, no typing) + hide installing
    timeouts.push(setTimeout(() => {
      setShowInstalling(false);
      setShowOutput(true);
      setBootStep(7);
    }, 4400)); // Faster: 600ms installing duration instead of 1000ms

    // Step 8: Show first button (view_projects)
    timeouts.push(setTimeout(() => setBootStep(8), 4800));

    // Step 9: Show second button (contact_me)
    timeouts.push(setTimeout(() => setBootStep(9), 5000));

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
    
    // Start ASCII art typing (after boot step 4)
    if (bootStep >= 4 && !asciiIntervalRef.current) {
      let lineIdx = 0;
      asciiIntervalRef.current = setInterval(() => {
        setAsciiLineIndex(prev => prev + 1);
        lineIdx++;
        if (lineIdx >= asciiLines.length) {
          if (asciiIntervalRef.current) clearInterval(asciiIntervalRef.current);
        }
      }, 80); // 80ms per line
    }
  }, [bootStep]);

  // Cleanup intervals on unmount
  useEffect(() => {
    return () => {
      if (initIntervalRef.current) clearInterval(initIntervalRef.current);
      if (titleIntervalRef.current) clearInterval(titleIntervalRef.current);
      if (asciiIntervalRef.current) clearInterval(asciiIntervalRef.current);
    };
  }, []);
  
  // Scroll-away effect: pin the section and fade it out as user scrolls
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!sectionRef.current || !contentRef.current) return;
    
    const ctx = gsap.context(() => {
      // Pin the hero and fade it out as user scrolls
      gsap.to(contentRef.current, {
        opacity: 0,
        scale: 0.85,
        y: -100,
        ease: "power1.in",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",         // Start immediately when hero reaches top of viewport
          end: "bottom top",        // End when bottom of hero reaches top
          scrub: 1,
          pin: true,                // Pin the section in place
          pinSpacing: false,        // Don't add extra space - next section overlaps
        },
      });
    });
    
    return () => ctx.revert();
  }, []);

  // Render npm install output (appears all at once, like real terminal)
  const renderNpmOutput = () => {
    return (
      <div 
        className={`space-y-1 transition-opacity duration-300 ${showOutput ? 'opacity-100' : 'opacity-0'}`}
      >
        <div className="text-gray-400">
          <span className="text-gray-400">added </span>
          <span className="text-white">3</span>
          <span className="text-gray-400"> packages in </span>
          <span className="text-white">612ms</span>
        </div>
        <div className="text-gray-500 text-xs mt-2 mb-1">
          packages installed:
        </div>
        <div>
          <span className="text-primary">+</span>{' '}
          <span className="text-green-400">ai-applications</span>
          <span className="text-gray-500">@latest</span>
        </div>
        <div>
          <span className="text-primary">+</span>{' '}
          <span className="text-green-400">web3-dapps</span>
          <span className="text-gray-500">@latest</span>
        </div>
        <div>
          <span className="text-primary">+</span>{' '}
          <span className="text-green-400">full-stack-solutions</span>
          <span className="text-gray-500">@latest</span>
        </div>
      </div>
    );
  };

  return (
    <section 
      ref={sectionRef} 
      id="about" 
      className="min-h-screen flex items-center justify-center pt-20 relative overflow-hidden"
      style={{ zIndex: 1 }}
    >
      {/* Content wrapper for scroll animation */}
      <div ref={contentRef} className="w-full h-full absolute inset-0 flex items-center justify-center">
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
              className="p-6 md:p-10 font-mono text-sm md:text-base flex-1 overflow-hidden"
            >
              <div className="flex gap-6 h-full">
                {/* Left side - Terminal commands */}
                <div className="flex-1 space-y-6">
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
                      
                      {/* Installing spinner - shows briefly while "loading" */}
                      {showInstalling && (
                        <div className="pl-6 text-gray-400 font-mono text-sm flex items-center gap-2">
                          <Loader2 size={14} className="animate-spin text-primary" />
                          <span>Installing packages...</span>
                        </div>
                      )}
                      
                      {/* npm output - appears all at once after "installing" */}
                      {bootStep >= 7 && (
                        <div className="pl-6 text-gray-400 max-w-2xl leading-relaxed font-mono text-sm">
                          {renderNpmOutput()}
                        </div>
                      )}

                      <div className="space-y-2 pt-4 pl-6">
                        {bootStep >= 8 && (
                          <a
                            href="#projects"
                            className="block text-gray-400 hover:text-primary transition-colors"
                          >
                            <span className="text-primary">$</span> ./view_projects.sh
                          </a>
                        )}
                        {bootStep >= 9 && (
                          <a
                            href="#contact"
                            className="block text-gray-400 hover:text-primary transition-colors"
                          >
                            <span className="text-primary">$</span> ./contact_me.sh
                          </a>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* Right side - ASCII Art (hidden on mobile) */}
                <div className="hidden lg:flex items-center justify-center px-8">
                  <div>
                    <pre className="text-primary/70 text-xs leading-[1.2] select-none whitespace-pre">
{asciiLines.slice(0, asciiLineIndex).join("\n")}
                    </pre>
                    {asciiLineIndex >= asciiLines.length && (
                      <div className="text-primary text-xs mt-1 font-mono">
                        {`   > `}<span className="cursor-blink">_</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    </section>
  );
}
