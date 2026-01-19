"use client";

import { useState, useEffect, useRef } from "react";
import { ChevronRight, ChevronDown, ChevronUp, Briefcase } from "lucide-react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const experience = [
  {
    id: "01",
    role: "Tech Generalist Intern",
    company: "ALPHV Technologies",
    period: "Jan 2025 - Apr 2025",
    description: "Pioneered and delivered a tested automation framework prototype for document processing. Conducted strategic research on implementing a secure, in-house LLM. Oversaw website maintenance for Jobs By Developer Kaki.",
    logo: "/company_logos/alphv_technologies_logo.jpeg",
  },
  {
    id: "02",
    role: "Math Tuition Teacher",
    company: "A+ Home Tuition Malaysia (Part-time)",
    period: "Mar 2024 - Mar 2025",
    description: "Delivered personalized SPM mathematics tutoring, creating tailored lesson plans to strengthen student problem-solving abilities and achieve target grades.",
    logo: "/company_logos/aplushometuition_malaysia_logo.jpeg",
  },
  {
    id: "03",
    role: "Secretary Assistant",
    company: "PSL Management Services (Part-time)",
    period: "Oct 2023 - Apr 2024",
    description: "Assisted a licensed professional secretary managing administrative tasks for over 100 companies, including scheduling, correspondence, and document preparation, ensuring efficient office operations and high client satisfaction.",
    logo: null, // No logo available
  },
  {
    id: "04",
    role: "Operations Coordinator",
    company: "Headspace SS15 (Part-time)",
    period: "Feb 2023 - Sep 2023",
    description: "Oversaw co-working space operations including opening/closing, managing registrations, and event coordination. Delivered excellent customer service to foster a collaborative environment and ensure member satisfaction.",
    logo: "/company_logos/headspace_logo.jpg",
  },
];

// Individual experience card with GSAP scroll animation
interface ExperienceCardProps {
  item: typeof experience[0];
  index: number;
}

function ExperienceCard({ item, index }: ExperienceCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!cardRef.current) return;
    
    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardRef.current,
        { 
          opacity: 0, 
          x: 60,
          scale: 0.95,
        },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          ease: "power2.out", // Smooth easing for natural feel
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top 95%",     // Start earlier
            end: "top 40%",       // End later for longer animation range
            scrub: 1.5,           // Higher scrub = smoother, less snappy
          },
        }
      );
    });
    
    return () => ctx.revert();
  }, [index]);

  return (
    <div
      className="relative pl-6 md:pl-12 group"
    >
      {/* Timeline Dot - Scroll Activated */}
      <motion.div 
        className="absolute -left-[4px] top-2 z-30 w-2.5 h-2.5 rounded-full bg-black border shadow-[0_0_0_4px_black]"
        initial={{ 
            borderColor: "rgba(38, 38, 38, 1)", // border color (neutral-800)
            backgroundColor: "#000000" 
        }}
        whileInView={{ 
            borderColor: "#22c55e", // primary (green-500)
            backgroundColor: "#22c55e"
        }}
        viewport={{ margin: "2000px 0px -50% 0px" }}
        transition={{ duration: 0.3 }}
      />

      <div ref={cardRef} className="terminal-card p-6 hover:bg-white/5 transition-colors duration-300">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-2">
          <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors">
            {item.role}
          </h3>
          <span className="text-sm font-mono text-primary bg-primary/10 px-3 py-1 rounded border border-primary/20 w-fit">
            {item.period}
          </span>
        </div>
        
        <div className="flex items-center gap-3 text-sm text-gray-400 mb-4 font-mono">
          {item.logo ? (
            <Image 
              src={item.logo} 
              alt={`${item.company} logo`}
              width={32}
              height={32}
              className="rounded object-cover"
            />
          ) : (
            <div className="w-8 h-8 rounded bg-muted border border-border flex items-center justify-center text-primary">
              <Briefcase size={18} />
            </div>
          )}
          <span>@ {item.company}</span>
        </div>

        <p className="text-gray-400 text-sm leading-relaxed font-mono border-l-2 border-border pl-4">
          {item.description}
        </p>
      </div>
    </div>
  );
}

// Animated button component with GSAP scroll-based fade-in
function AnimatedButton({ children, onClick }: { children: React.ReactNode; onClick: () => void }) {
  const buttonRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!buttonRef.current) return;
    
    const ctx = gsap.context(() => {
      gsap.fromTo(
        buttonRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: buttonRef.current,
            start: "top 90%",
            toggleActions: "play none none none",
          },
        }
      );
    });
    
    return () => ctx.revert();
  }, []);
  
  return (
    <div 
      ref={buttonRef}
      className="mt-8 flex justify-center ml-3 md:ml-6"
    >
      <button
        onClick={onClick}
        className="flex items-center gap-2 px-6 py-3 bg-muted border border-border rounded-lg text-primary font-mono text-sm hover:bg-primary/10 hover:border-primary transition-colors duration-300"
      >
        {children}
      </button>
    </div>
  );
}

import { motion, useScroll, useSpring, AnimatePresence } from "framer-motion";

// ... (existing imports and experience data)

export default function Experience() {
  const [showAll, setShowAll] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Number of experiences to show initially
  const INITIAL_DISPLAY_COUNT = 2;
  
  const initialItems = experience.slice(0, INITIAL_DISPLAY_COUNT);
  const hiddenItems = experience.slice(INITIAL_DISPLAY_COUNT);
  
  const totalCount = experience.length;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <section id="experience" className="py-24 relative border-t border-border bg-black/50" ref={containerRef}>
      <div className="container mx-auto px-6">
        <div className="mb-16">
          <div className="flex items-center gap-2 text-primary mb-2">
            <ChevronRight size={20} />
            <span className="text-sm font-mono">~/experience</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            <span className="text-primary">const</span> <span className="text-white">careerPath</span> = [...]
          </h2>
          <p className="text-muted-foreground font-mono text-sm">
            Showing <span className="text-primary">{showAll ? totalCount : INITIAL_DISPLAY_COUNT}</span> of <span className="text-primary">{totalCount}</span> positions
          </p>
        </div>

        <div className="relative ml-3 md:ml-6">
          {/* Animated Circuit Line Background (Empty Trace) */}
          <div className="absolute left-[0px] top-2 bottom-0 w-[2px] bg-border" />
          
          {/* Animated Circuit Line Fill (Glowing) */}
          <motion.div 
            className="absolute left-[0px] top-2 w-[2px] bg-primary origin-top shadow-[0_0_10px_rgba(var(--primary-rgb),0.8)]"
            style={{ 
                height: "100%", 
                scaleY,
                zIndex: 10
            }}
          />

          <div className="space-y-12 relative z-20">
            {initialItems.map((item, index) => (
              <ExperienceCard key={item.id} item={item} index={index} />
            ))}

            <AnimatePresence>
                {showAll && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                        className="overflow-hidden space-y-12"
                    >
                        {hiddenItems.map((item, index) => (
                            <ExperienceCard 
                                key={item.id} 
                                item={item} 
                                index={index + INITIAL_DISPLAY_COUNT} 
                            />
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
          </div>
        </div>

        {/* Show More / Show Less Button */}
        {totalCount > INITIAL_DISPLAY_COUNT && (
          <AnimatedButton onClick={() => setShowAll(!showAll)}>
            {showAll ? (
              <>
                <ChevronUp size={18} />
                Show Less
              </>
            ) : (
              <>
                <ChevronDown size={18} />
                Show More ({totalCount - INITIAL_DISPLAY_COUNT} more)
              </>
            )}
          </AnimatedButton>
        )}
      </div>
    </section>
  );
}
