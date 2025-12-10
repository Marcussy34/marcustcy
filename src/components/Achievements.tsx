"use client";

import { useState } from "react";
import { Trophy, Award, Star, ChevronDown, ChevronUp } from "lucide-react";

// Achievements array with placement order for sorting
const achievements = [
  {
    prize: "Grand Champion (1st Place) & 4 Tracks Winner",
    event: "BUIDL AI Hackathon 2025 (Seoul)",
    project: "CureMeBaby",
    description: "Seoul’s premier international 'AI x Crypto' hackathon. Won Grand Champion + 4 other sponsor track prizes.",
    icon: Trophy,
    color: "text-yellow-500",
    order: 1, // 1st place
  },
  {
    prize: "1st Place & Finalist, Celo Track",
    event: "TOKEN2049 Origins Hackathon 2025 (Singapore)",
    project: "LeftAI",
    description: "Asia's largest crypto hackathon. Top 5 Finalist overall. Selected from 800+ global applicants, only 160 invited to compete.",
    icon: Award,
    color: "text-yellow-500",
    order: 1,
  },
  {
    prize: "1st Place Flow Track, 1st Place Hedera Track",
    event: "ETHGlobal India 2025",
    project: "Dhal Way",
    description: "One of ETHGlobal's largest physical event. Won among 1,600 hackers from 25 countries.",
    icon: Award,
    color: "text-yellow-500",
    order: 1,
  },
  {
    prize: "1st Place, Flow Track",
    event: "ETHGlobal Agentic 2025",
    project: "4AI 1Human",
    description: "ETHGlobal's AI-focused international online hackathon. Won among 1,700+ global participants.",
    icon: Award,
    color: "text-yellow-500",
    order: 1,
  },
  {
    prize: "1st Place & Finalist, AI Track",
    event: "ETHTokyo 2025",
    project: "Toku Kaigan",
    description: "Tokyo's largest annual blockchain hackathon. Won 1st in Actually Intelligent Track + Top 10 Finalist overall.",
    icon: Award,
    color: "text-yellow-500",
    order: 1,
  },
  {
    prize: "1st Place",
    event: "ImagineHack 2025 (Malaysia)",
    project: "Tea Time",
    description: "Taylor's University's iconic annual hackathon. Won 1st out of 170+ hackers from 23 countries and 17 universities.",
    icon: Trophy,
    color: "text-yellow-500",
    order: 1,
  },
  {
    prize: "2nd Place, 1inch Fusion+ Track",
    event: "ETHGlobal Taipei 2025",
    project: "MemestCutest Platform",
    description: "ETHGlobal's Taiwan international hackathon. Won 2nd in the 1inch Fusion+ sponsor track.",
    icon: Star,
    color: "text-gray-300", // Silver
    order: 2, // 2nd place
  },
  {
    prize: "3rd Place, Aptos Track",
    event: "Consensus Hong Kong Hackathon 2025",
    project: "Grand Theft Aptos",
    description: "CoinDesk’s flagship global event. Placed 3rd among 500+ hackers from top universities (Tsinghua, Yale, Oxford).",
    icon: Star,
    color: "text-gray-400", // Bronze-ish
    order: 3, // 3rd place
  },
  {
    prize: "Finalist & 4 Tracks Winner (2nd & 3rd Places)",
    event: "ETHKL 2024 (Kuala Lumpur)",
    project: "JustETH",
    description: "Malaysia's largest annual blockchain hackathon. Top 5 Finalist overall + 4 sponsor prizes including IP-C Ethereum Fusion and WorldID.",
    icon: Award,
    color: "text-primary",
    order: 4, // Finalist
  },
];

// Sort achievements by placement order (1st, 2nd, 3rd, etc.)
const sortedAchievements = [...achievements].sort((a, b) => a.order - b.order);

// Number of achievements to show initially
const INITIAL_DISPLAY_COUNT = 5;

export default function Achievements() {
  const [showAll, setShowAll] = useState(false);
  
  // Determine how many achievements to display
  const displayedAchievements = showAll 
    ? sortedAchievements 
    : sortedAchievements.slice(0, INITIAL_DISPLAY_COUNT);
  
  const totalCount = sortedAchievements.length;
  const displayedCount = displayedAchievements.length;

  return (
    <section id="achievements" className="py-24 relative border-t border-border bg-black/50">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="mb-16">
          <div className="flex items-center gap-2 text-primary mb-2">
            <Trophy size={20} />
            <span className="text-sm font-mono">~/achievements</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            <span className="text-primary">const</span> <span className="text-white">trophyCabinet</span> = [...]
          </h2>
          {/* Display count indicator */}
          <p className="text-muted-foreground font-mono text-sm">
            Showing <span className="text-primary">{displayedCount}</span> of <span className="text-primary">{totalCount}</span> achievements
          </p>
        </div>

        {/* Single column layout - one achievement per row */}
        <div className="flex flex-col gap-4">
          {displayedAchievements.map((item, index) => (
            <div
              key={index}
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
                <p className="text-gray-400 text-sm leading-relaxed font-mono">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Show More / Show Less Button */}
        {totalCount > INITIAL_DISPLAY_COUNT && (
          <div className="mt-8 flex justify-center">
            <button
              onClick={() => setShowAll(!showAll)}
              className="flex items-center gap-2 px-6 py-3 bg-muted border border-border rounded-lg text-primary font-mono text-sm hover:bg-primary/10 hover:border-primary transition-colors duration-300"
            >
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
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
