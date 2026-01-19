"use client";

import { ExternalLink, Github, Terminal, Code } from "lucide-react";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

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
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Animate header with scrub
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          ease: "power2.out",
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 95%",
            end: "top 50%",
            scrub: 1.5,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="projects" className="py-24 relative border-t border-border">
      <div className="container mx-auto px-6">
        <div ref={headerRef} className="mb-16">
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
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseX = useSpring(x);
  const mouseY = useSpring(y);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    x.set(clientX - left - width / 2);
    y.set(clientY - top - height / 2);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
        className="project-card group relative h-full perspective-1000"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        style={{
            transformStyle: "preserve-3d",
        }}
    >
        <motion.div
            style={{
                rotateX: useTransform(mouseY, [-300, 300], [5, -5]),
                rotateY: useTransform(mouseX, [-300, 300], [-5, 5]),
                transformStyle: "preserve-3d",
            }}
            className="terminal-card h-full p-6 relative bg-black/40 border border-white/10 overflow-hidden"
        >
            {/* Spotlight Gradient */}
            <motion.div 
                className="pointer-events-none absolute -inset-px opacity-50 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300"
                style={{
                    background: useMotionTemplate`
                        radial-gradient(
                            650px circle at ${mouseX}px ${mouseY}px,
                            rgba(var(--primary-rgb), 0.15),
                            transparent 80%
                        )
                    `
                }}
            />
            
            <div className="relative z-10">
                <div className="absolute top-0 right-0 text-xs text-muted-foreground font-mono">
                    ID: {project.id}
                </div>

                <div className="mb-4 text-primary md:group-hover:scale-110 transition-transform duration-300 origin-left">
                    <Code size={24} />
                </div>

                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary transition-colors">
                    {project.title}
                </h3>
                
                <div className="text-xs text-primary/80 mb-4 font-mono border-l-2 border-primary/20 pl-3 py-1">
                    {project.award}
                </div>

                <p className="text-gray-400 text-sm mb-6 font-mono leading-relaxed min-h-[auto] md:min-h-[80px]">
                    {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                    {project.tech.map((tag) => (
                    <span
                        key={tag}
                        className="text-xs px-2 py-1 bg-muted/50 text-gray-300 border border-border/50 font-mono backdrop-blur-sm"
                    >
                        {tag}
                    </span>
                    ))}
                </div>

                <div className="flex gap-4 pt-4 border-t border-border/50">
                    <a href={project.links.github} className="flex items-center gap-2 text-xs text-gray-400 hover:text-primary transition-colors hover:underline decoration-dashed decoration-1 underline-offset-4">
                    <Github size={14} />
                    <span>source_code</span>
                    </a>
                    <a href={project.links.demo} className="flex items-center gap-2 text-xs text-gray-400 hover:text-primary transition-colors hover:underline decoration-dashed decoration-1 underline-offset-4">
                    <ExternalLink size={14} />
                    <span>live_demo</span>
                    </a>
                </div>
            </div>
        </motion.div>
    </motion.div>
  );
}

