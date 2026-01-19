"use client";

import { achievements } from "@/data/achievements";
import { Trophy, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Number of achievements to show on home page
const HOME_DISPLAY_COUNT = 4;

// Individual achievement card for home page with scrub animation
function AchievementCard({ item, index }: { item: typeof achievements[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!cardRef.current) return;
    
    // Alternating left/right direction
    const isFromLeft = index % 2 === 0;
    
    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardRef.current,
        { 
          opacity: 0, 
          x: isFromLeft ? -60 : 60,
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
      ref={cardRef}
      className="terminal-card p-6 flex items-start gap-4 group hover:bg-white/5 transition-colors duration-300"
    >
      <div className={`p-3 rounded bg-muted border border-border ${item.color} group-hover:text-white group-hover:bg-primary/20 transition-colors`}>
        <item.icon size={24} />
      </div>
      
      <div className="flex-1">
        <h3 className={`text-xl font-bold mb-1 ${item.color} font-mono`}>
          {item.prize}
        </h3>
        <h4 className="text-white font-bold mb-2 text-lg">
          {item.event}
        </h4>
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs font-mono text-muted-foreground">Project:</span>
          <span className="text-sm font-mono text-primary">{item.project}</span>
        </div>
        <p className="text-gray-400 text-sm leading-relaxed font-mono line-clamp-2">
          {item.description}
        </p>
      </div>
    </div>
  );
}

export default function Achievements() {
  // Show only specific top wins on home page
  const featuredIds = [
    "token2049-2025",
    "ethglobal-delhi-2025",
    "buidl-asia-2025",
    "consensus-hk-2025",
    "imaginehack-2025"
  ];
  
  const displayedAchievements = achievements.filter(item => featuredIds.includes(item.id));
  
  // Sort them to match the order in featuredIds
  displayedAchievements.sort((a, b) => featuredIds.indexOf(a.id) - featuredIds.indexOf(b.id));
  
  const totalCount = achievements.length;

  return (
    <section id="achievements" className="py-24 relative border-t border-border bg-black/50">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 text-primary mb-2">
              <Trophy size={20} />
              <span className="text-sm font-mono">~/achievements</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              <span className="text-primary">const</span> <span className="text-white">trophyCabinet</span> = [...]
            </h2>
            <p className="text-muted-foreground font-mono text-sm">
              Showing <span className="text-primary">{displayedAchievements.length}</span> of <span className="text-primary">{totalCount}</span> major wins
            </p>
          </div>
          
          <Link href="/achievements">
             <button className="flex items-center gap-2 px-6 py-3 bg-primary/10 border border-primary/20 rounded-lg text-primary font-mono text-sm hover:bg-primary/20 hover:border-primary transition-all group">
                View Full Archive
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
             </button>
          </Link>
        </div>

        {/* List */}
        <div className="flex flex-col gap-4">
          {displayedAchievements.map((item, index) => (
            <AchievementCard key={item.id} item={item} index={index} />
          ))}
        </div>

        {/* Mobile View All Button (visible only on small screens if header button is hidden or for ease) */}
        <div className="mt-8 text-center md:hidden">
            <Link href="/achievements">
                <button className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-muted border border-border rounded-lg text-white font-mono text-sm hover:bg-white/5 transition-colors">
                    View All {totalCount} Achievements
                </button>
            </Link>
        </div>
      </div>
    </section>
  );
}

