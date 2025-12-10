"use client";

import { motion } from "framer-motion";
import { Trophy, Award, Star } from "lucide-react";

const achievements = [
  {
    prize: "1st Place & 4 Tracks Winner",
    event: "BUIDL AI Hackathon 2025 (Seoul)",
    project: "CureMeBaby",
    description: "Champion in international hackathon for AI-driven, privacy-first mental health assistant.",
    icon: Trophy,
    color: "text-yellow-500",
  },
  {
    prize: "1st Place, Celo Track",
    event: "TOKEN2049 Origins Hackathon 2025 (Singapore)",
    project: "LeftAI",
    description: "Top 5 Finalist overall. Selected from 800+ applicants globally.",
    icon: Award,
    color: "text-yellow-500",
  },
  {
    prize: "1st Place, Flow & Hedera Track",
    event: "ETHGlobal India 2025",
    project: "Dhal Way",
    description: "Won among 1,600 hackers from 25 countries.",
    icon: Award,
    color: "text-yellow-500",
  },
  {
    prize: "1st Place, Flow Track",
    event: "ETHGlobal Agentic 2025",
    project: "4AI 1Human",
    description: "Won among 1,700+ hackers for AI agent platform.",
    icon: Award,
    color: "text-yellow-500",
  },
  {
    prize: "3rd Place, Aptos Track",
    event: "Consensus Hong Kong Hackathon 2025",
    project: "Grand Theft Aptos",
    description: "Placed 3rd among 500+ hackers from top universities.",
    icon: Star,
    color: "text-gray-400", // Bronze-ish
  },
  {
    prize: "1st Place, AI Track",
    event: "ETHTokyo 2025",
    project: "Toku Kaigan",
    description: "Won 1st Place in Actually Intelligent Track & Finalist.",
    icon: Award,
    color: "text-yellow-500",
  },
  {
    prize: "2nd Place, 1inch Fusion+ Track",
    event: "ETHGlobal Taipei 2025",
    project: "MemestCutest Platform",
    description: "Gamified MCP platform unifying Web2 and Web3 services.",
    icon: Star,
    color: "text-gray-300", // Silver
  },
  {
    prize: "1st Place",
    event: "ImagineHack 2025 (Malaysia)",
    project: "Tea Time",
    description: "1st place out of 170+ hackers from 23 countries.",
    icon: Trophy,
    color: "text-yellow-500",
  },
  {
    prize: "Finalist & 4 Tracks Winner",
    event: "ETHKL 2024 (Kuala Lumpur)",
    project: "JustETH",
    description: "Placed among Top 5 teams. Won IP-C Ethereum Fusion and WorldID prizes.",
    icon: Award,
    color: "text-primary",
  },
];

export default function Achievements() {
  return (
    <section id="achievements" className="py-24 relative border-t border-border bg-black/50">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="flex items-center gap-2 text-primary mb-2">
            <Trophy size={20} />
            <span className="text-sm font-mono">~/achievements</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            <span className="text-primary">const</span> <span className="text-white">trophyCabinet</span> = [...]
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {achievements.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="terminal-card p-6 flex items-start gap-4 group"
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
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
