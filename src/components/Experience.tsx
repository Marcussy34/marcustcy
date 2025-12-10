"use client";


import { ChevronRight } from "lucide-react";

const experience = [
  {
    id: "01",
    role: "AI Engineer",
    company: "TechCorp Inc.",
    period: "2023 - Present",
    description: "Leading the development of autonomous agents and LLM-powered applications. Optimized inference latency by 40%.",
  },
  {
    id: "02",
    role: "Blockchain Developer",
    company: "DeFi Protocol",
    period: "2022 - 2023",
    description: "Architected smart contracts for a cross-chain bridge securing over $10M TVL. Audited and deployed on Mainnet.",
  },
  {
    id: "03",
    role: "Full Stack Developer",
    company: "Web3 Startup",
    period: "2021 - 2022",
    description: "Built the frontend and backend for a decentralized identity platform using Next.js and Ethereum.",
  },
];

export default function Experience() {
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
        </div>

        <div className="relative border-l border-border ml-3 md:ml-6 space-y-12">
          {experience.map((item, index) => (
            <div
              key={item.id}
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
                
                <div className="text-sm text-gray-400 mb-4 font-mono">
                  @ {item.company}
                </div>

                <p className="text-gray-400 text-sm leading-relaxed font-mono border-l-2 border-border pl-4">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
