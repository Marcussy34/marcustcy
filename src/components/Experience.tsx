"use client";

import { useState, useEffect, useRef } from "react";
import { ChevronRight, ChevronDown, ChevronUp, Briefcase } from "lucide-react";
import Image from "next/image";

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

// Individual experience card with scroll-based animation
interface ExperienceCardProps {
  item: typeof experience[0];
  index: number;
}

function ExperienceCard({ item, index }: ExperienceCardProps) {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  
  // Each card observes itself for scroll-based reveal
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // Only animate once
        }
      },
      { threshold: 0.2, rootMargin: '0px 0px -50px 0px' }
    );
    
    if (cardRef.current) {
      observer.observe(cardRef.current);
    }
    
    return () => observer.disconnect();
  }, []);
  
  // Alternating left/right direction
  const isFromLeft = index % 2 === 0;
  
  const animationStyle = {
    opacity: isVisible ? 1 : 0,
    transform: isVisible 
      ? 'translateX(0)' 
      : `translateX(${isFromLeft ? '-50px' : '50px'})`,
    transition: 'opacity 0.8s ease-out, transform 0.8s ease-out',
  };

  return (
    <div
      ref={cardRef}
      style={animationStyle}
      className="relative pl-8 md:pl-12 group"
    >
      {/* Timeline Dot */}
      <div className="absolute -left-[5px] top-2 w-2.5 h-2.5 rounded-full bg-border group-hover:bg-primary transition-colors" />

      <div className="terminal-card p-6 hover:bg-white/5 transition-colors duration-300">
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

// Animated button component with scroll-based fade-in
function AnimatedButton({ children, onClick }: { children: React.ReactNode; onClick: () => void }) {
  const buttonRef = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShow(true);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    
    if (buttonRef.current) {
      observer.observe(buttonRef.current);
    }
    
    return () => observer.disconnect();
  }, []);
  
  return (
    <div 
      ref={buttonRef}
      className="mt-8 flex justify-center ml-3 md:ml-6"
      style={{
        opacity: show ? 1 : 0,
        transform: show ? 'translateY(0)' : 'translateY(20px)',
        transition: 'opacity 0.8s ease-out, transform 0.8s ease-out',
      }}
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

export default function Experience() {
  const [showAll, setShowAll] = useState(false);
  
  // Number of experiences to show initially
  const INITIAL_DISPLAY_COUNT = 2;
  
  const displayedExperience = showAll 
    ? experience 
    : experience.slice(0, INITIAL_DISPLAY_COUNT);
  
  const totalCount = experience.length;

  return (
    <section id="experience" className="py-24 relative border-t border-border bg-black/50">
      <div className="container mx-auto px-6">
        <div
          className="mb-16"
        >
          <div className="flex items-center gap-2 text-primary mb-2">
            <ChevronRight size={20} />
            <span className="text-sm font-mono">~/experience</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            <span className="text-primary">const</span> <span className="text-white">careerPath</span> = [...]
          </h2>
          <p className="text-muted-foreground font-mono text-sm">
            Showing <span className="text-primary">{displayedExperience.length}</span> of <span className="text-primary">{totalCount}</span> positions
          </p>
        </div>

        <div className="relative border-l border-border ml-3 md:ml-6 space-y-12">
          {displayedExperience.map((item, index) => (
            <ExperienceCard key={item.id} item={item} index={index} />
          ))}
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
