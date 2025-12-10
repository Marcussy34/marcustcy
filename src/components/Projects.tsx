"use client";

import { motion } from "framer-motion";
import { ExternalLink, Github, Terminal, Code } from "lucide-react";

const projects = [
  {
    id: "01",
    title: "CureMeBaby",
    description: "AI-driven, privacy-first mental health assistant. Uses TEE for privacy, Gensyn Swarm for adaptive learning, and NEAR for decentralized access.",
    tech: ["AI", "Privacy", "NEAR", "Gensyn"],
    links: { demo: "#", github: "#" },
    award: "1st Place & 4 Tracks Winner @ BUIDL AI Hackathon 2025",
  },
  {
    id: "02",
    title: "LeftAI",
    description: "AI-powered Celo MiniPay MiniApp enabling natural language crypto transactions with confidential AI processing.",
    tech: ["Celo", "MiniPay", "AI", "Next.js"],
    links: { demo: "#", github: "#" },
    award: "1st Place Celo Track @ TOKEN2049 Origins 2025",
  },
  {
    id: "03",
    title: "Dhal Way",
    description: "Universal cross-chain payment protocol enabling users to pay with any token while merchants receive their preferred currency.",
    tech: ["Cross-chain", "DeFi", "Flow", "Hedera"],
    links: { demo: "#", github: "#" },
    award: "1st Place Flow & Hedera Track @ ETHGlobal India 2025",
  },
  {
    id: "04",
    title: "4AI 1Human",
    description: "Platform using AI agents to automate smart contract creation and execution via natural language.",
    tech: ["AI Agents", "Smart Contracts", "Flow"],
    links: { demo: "#", github: "#" },
    award: "1st Place Flow Track @ ETHGlobal Agentic 2025",
  },
  {
    id: "05",
    title: "Toku Kaigan",
    description: "Anime-style AI psychiatrist providing adaptive mental wellness support through interactive 3D character therapy.",
    tech: ["AI", "3D", "Three.js", "Mental Health"],
    links: { demo: "#", github: "#" },
    award: "1st Place AI Track @ ETHTokyo 2025",
  },
  {
    id: "06",
    title: "MemestCutest Platform",
    description: "Gamified MCP platform unifying Web2 and Web3 services into one visual workflow with drag-and-drop automations.",
    tech: ["MCP", "Web3", "Automation", "Next.js"],
    links: { demo: "#", github: "#" },
    award: "2nd Place 1inch Fusion+ Track @ ETHGlobal Taipei 2025",
  },
];

export default function Projects() {
  return (
    <section id="projects" className="py-24 relative border-t border-border">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="flex items-center gap-2 text-primary mb-2">
            <Terminal size={20} />
            <span className="text-sm font-mono">~/projects</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            <span className="text-primary">function</span> <span className="text-white">viewProjects</span>()
          </h2>
          <p className="text-gray-400 max-w-2xl text-lg font-mono">
            // A collection of award-winning hackathon projects and innovative solutions.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="terminal-card group p-6 relative"
            >
              <div className="absolute top-4 right-4 text-xs text-muted-foreground font-mono">
                ID: {project.id}
              </div>

              <div className="mb-4 text-primary">
                <Code size={24} />
              </div>

              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary transition-colors">
                {project.title}
              </h3>
              
              <div className="text-xs text-primary/80 mb-4 font-mono border-l-2 border-primary/20 pl-3 py-1">
                {project.award}
              </div>

              <p className="text-gray-400 text-sm mb-6 font-mono leading-relaxed">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-6">
                {project.tech.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2 py-1 bg-muted text-gray-300 border border-border font-mono"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex gap-4 pt-4 border-t border-border">
                <a href={project.links.github} className="flex items-center gap-2 text-xs text-gray-400 hover:text-primary transition-colors">
                  <Github size={14} />
                  <span>source_code</span>
                </a>
                <a href={project.links.demo} className="flex items-center gap-2 text-xs text-gray-400 hover:text-primary transition-colors">
                  <ExternalLink size={14} />
                  <span>live_demo</span>
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
