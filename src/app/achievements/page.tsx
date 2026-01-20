"use client";

import { motion, AnimatePresence } from "framer-motion";
import { achievements } from "@/data/achievements";
import Navbar from "@/components/Navbar";
import PixelBlast from "@/components/PixelBlast";
import { ChevronLeft, Calendar, Github, MapPin, Trophy, LayoutGrid, List as ListIcon, Terminal } from "lucide-react";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ASCII Art Header Lines
const ASCII_HEADER_LINES = [
  "╔═══════════════════════════════════════╗",
  "║         TROPHY_CABINET.exe            ║",
  "╠═══════════════════════════════════════╣",
  "║           ___________                 ║",
  "║          '._==_==_=_.'                ║",
  "║          .-\\:      /-.                ║",
  "║         | (|:.     |) |               ║",
  "║          '-|:.     |-'                ║",
  "║            \\::.    /                  ║",
  "║             '::. .'                   ║",
  "║               ) (                     ║",
  "║             _.' '._                   ║",
  "║            '-------'                  ║",
  "╚═══════════════════════════════════════╝",
];

// ASCII Section Divider
const ASCII_DIVIDER = "═══════════════════════════════════════════════════════════════════════";

// Stats calculation
function calculateStats() {
  const totalWins = achievements.length;
  const firstPlaces = achievements.filter(a =>
    a.prize.toLowerCase().includes("1st") ||
    a.prize.toLowerCase().includes("champion") ||
    (a.prize.toLowerCase().includes("winner") && !a.prize.toLowerCase().includes("2nd") && !a.prize.toLowerCase().includes("3rd"))
  ).length;

  // Count unique countries from locations
  const countries = new Set<string>();
  achievements.forEach(a => {
    if (a.location) countries.add(a.location);
  });
  // Add "Online" for online hackathons
  countries.add("Online");

  const year2025 = achievements.filter(a => a.year === "2025").length;

  return {
    totalWins,
    firstPlaces,
    countries: countries.size,
    year2025,
  };
}

// Animated Counter Component
function AnimatedCounter({ value, label }: { value: number; label: string }) {
  const countRef = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!countRef.current || hasAnimated.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !hasAnimated.current) {
            hasAnimated.current = true;
            const target = value;
            const duration = 1500;
            const start = Date.now();

            const animate = () => {
              const elapsed = Date.now() - start;
              const progress = Math.min(elapsed / duration, 1);
              // Ease out cubic
              const eased = 1 - Math.pow(1 - progress, 3);
              const current = Math.round(eased * target);

              if (countRef.current) {
                countRef.current.textContent = current.toString();
              }

              if (progress < 1) {
                requestAnimationFrame(animate);
              }
            };

            animate();
          }
        });
      },
      { threshold: 0.5 }
    );

    observer.observe(countRef.current);

    return () => observer.disconnect();
  }, [value]);

  return (
    <div className="flex justify-between items-center font-mono">
      <span className="text-muted-foreground">{label}:</span>
      <span ref={countRef} className="text-primary font-bold text-xl">0</span>
    </div>
  );
}

// Stats Dashboard Panel
function StatsPanel() {
  const stats = calculateStats();

  return (
    <div className="font-mono text-sm border border-border rounded-lg bg-card/50 backdrop-blur-sm overflow-hidden">
      {/* Header */}
      <div className="px-4 py-2 border-b border-border bg-muted/30">
        <span className="text-primary">&gt;</span> stats --verbose
      </div>

      {/* Stats */}
      <div className="p-4 space-y-3">
        <AnimatedCounter value={stats.totalWins} label="TOTAL_WINS" />
        <AnimatedCounter value={stats.firstPlaces} label="FIRST_PLACES" />
        <AnimatedCounter value={stats.countries} label="COUNTRIES" />
        <AnimatedCounter value={stats.year2025} label="YEAR_2025" />
      </div>
    </div>
  );
}

// ASCII Header with Typing Animation and 3D Rotate
function AsciiHeader() {
  const [visibleLines, setVisibleLines] = useState<number>(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (visibleLines < ASCII_HEADER_LINES.length) {
      const timer = setTimeout(() => {
        setVisibleLines(prev => prev + 1);
      }, 80);
      return () => clearTimeout(timer);
    } else {
      setIsComplete(true);
    }
  }, [visibleLines]);

  return (
    <div className="hidden md:block perspective-1000">
      <motion.div
        className="font-mono text-xs lg:text-sm text-primary/80 leading-tight whitespace-pre select-none"
        initial={{ rotateY: 0 }}
        animate={isComplete ? {
          rotateY: [0, 8, 0, -8, 0],
        } : {}}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          transformStyle: "preserve-3d",
        }}
      >
        {ASCII_HEADER_LINES.slice(0, visibleLines).map((line, idx) => (
          <div key={idx} className="overflow-hidden">
            {line}
          </div>
        ))}
        {!isComplete && (
          <span className="inline-block w-2 h-4 bg-primary animate-pulse" />
        )}
      </motion.div>
    </div>
  );
}

// Determine glow color based on prize tier
function getGlowColor(colorClass: string) {
  if (colorClass.includes("yellow")) return "rgba(234, 179, 8, 0.4)"; // Gold
  if (colorClass.includes("gray")) return "rgba(156, 163, 175, 0.4)"; // Silver
  if (colorClass.includes("amber")) return "rgba(180, 83, 9, 0.4)"; // Bronze
  return "rgba(34, 197, 94, 0.4)"; // Default green/finalist
}

// Enhanced Achievement Card with Glow and Shine
function AchievementCard({
  item,
  index,
  viewMode
}: {
  item: typeof achievements[0];
  index: number;
  viewMode: "grid" | "list";
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const glowColor = getGlowColor(item.color);

  useEffect(() => {
    if (!cardRef.current || viewMode !== "grid") return;

    // Alternating left/right direction
    const isFromLeft = index % 2 === 0;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardRef.current,
        {
          opacity: 0,
          x: isFromLeft ? -80 : 80,
          scale: 0.97,
        },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top bottom-=100",
            end: "top 80%",
            scrub: 0.5,
          },
        }
      );
    });

    return () => ctx.revert();
  }, [index, viewMode]);

  return (
    <motion.div
      ref={cardRef}
      initial={viewMode === "list" ? { opacity: 0, y: 8 } : false}
      animate={viewMode === "list" ? { opacity: 1, y: 0 } : undefined}
      transition={viewMode === "list" ? { duration: 0.2, delay: index * 0.02 } : undefined}
      className="group relative border border-border bg-card/50 backdrop-blur-sm rounded-lg overflow-hidden transition-all duration-300"
      style={{
        boxShadow: `0 0 0 0 transparent`,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = `0 0 25px -5px ${glowColor}`;
        e.currentTarget.style.borderColor = glowColor.replace('0.4)', '0.6)');
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = `0 0 0 0 transparent`;
        e.currentTarget.style.borderColor = '';
      }}
    >
      {/* Holographic Shine Overlay */}
      <div
        className="absolute inset-0 translate-x-[-150%] animate-shine md:animate-none md:group-hover:animate-shine z-0 pointer-events-none opacity-50 md:opacity-100"
        style={{
          background: `linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.08) 20%,
            rgba(255, 255, 255, 0.15) 25%,
            transparent 50%
          )`,
          transform: 'skewX(-25deg) translateX(-150%)',
          animationDuration: '3s',
        }}
      />

      <div className="flex flex-col md:flex-row h-full relative z-10">
        {/* Visual Side (Compact) */}
        <div className="w-full md:w-32 bg-muted/30 relative border-b md:border-b-0 md:border-r border-border flex flex-col items-center justify-center p-4 group-hover:bg-primary/5 transition-colors shrink-0">
          {/* Decorative Pattern */}
          <div className="absolute inset-0 opacity-[0.02] bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:8px_8px]" />

          <div className={`p-3 rounded-xl bg-background/50 backdrop-blur-sm border border-border shadow-sm ${item.color} transform group-hover:scale-105 transition-transform duration-300`}>
            <item.icon size={28} />
          </div>

          <div className="mt-3 text-xs font-mono text-muted-foreground text-center">{item.year}</div>
        </div>

        {/* Content Side */}
        <div className="flex-1 p-4 md:p-5 flex flex-col justify-center">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-2 mb-2">
            <div>
              <h2
                className={`text-lg md:text-xl font-bold ${item.color} leading-tight mb-1`}
                style={{ textShadow: `0 0 10px ${glowColor}` }}
              >
                {item.prize}
              </h2>
              <h3 className="text-base text-white font-semibold">
                {item.event}
              </h3>
            </div>
            {item.location && (
              <div className="flex items-center gap-1 text-xs text-muted-foreground shrink-0 mt-1 md:mt-0 font-mono">
                <MapPin size={12} />
                {item.location}
              </div>
            )}
          </div>

          <div className="flex items-center gap-2 mb-2 text-sm">
            <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider">Project:</span>
            <span className="text-primary font-mono">{item.project}</span>
          </div>

          <p className="text-gray-400 text-sm leading-relaxed dark:text-gray-300 line-clamp-2 group-hover:line-clamp-none transition-all duration-300">
            {item.description}
          </p>

          {/* Footer - Tags & Links */}
          <div className="mt-3 pt-3 border-t border-border/50 flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap gap-2">
              {item.tags.slice(0, 3).map(tag => (
                <span key={tag} className="text-[10px] px-2 py-0.5 rounded bg-primary/10 border border-primary/20 text-primary/80 font-mono">
                  {tag}
                </span>
              ))}
            </div>

            {item.repoUrl && (
              <a
                href={item.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors font-mono"
              >
                <Github size={12} />
                &lt;/code&gt;
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function AchievementsPage() {
  const [filter, setFilter] = useState<"All" | "2025" | "2024">("All");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // Scroll to top when page loads
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const filteredAchievements = achievements.filter((item) => {
    if (filter === "All") return true;
    return item.year === filter;
  });

  return (
    <main className="min-h-screen bg-background text-foreground relative">
      {/* PixelBlast Background */}
      <div className="fixed inset-0 z-0 opacity-20">
        <PixelBlast
          variant="circle"
          pixelSize={4}
          color="#22c55e"
          enableRipples={true}
          rippleIntensityScale={0.8}
          rippleThickness={0.12}
          rippleSpeed={0.25}
          patternScale={2.5}
          patternDensity={0.8}
          edgeFade={0.3}
          speed={0.3}
        />
      </div>

      <Navbar />

      <div className="container mx-auto px-6 pt-20 pb-12 relative z-10">
        {/* Back Button */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-primary hover:text-accent transition-colors mb-8 font-mono text-sm"
        >
          <ChevronLeft size={16} />
          <span>cd ~/portfolio</span>
        </Link>

        {/* Header Section with ASCII Art and Stats */}
        <div className="mb-12">
          <div className="flex items-center gap-2 text-primary mb-4">
            <Terminal size={20} />
            <span className="text-sm font-mono">~/achievements</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            {/* Left: ASCII Art (hidden on mobile) */}
            <div className="order-2 lg:order-1">
              <AsciiHeader />

              {/* Mobile Title (shown instead of ASCII) */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="md:hidden"
              >
                <h1 className="text-3xl font-bold tracking-tight mb-2">
                  <span className="text-primary">ls</span>{" "}
                  <span className="text-white">trophy_cabinet/</span>
                </h1>
                <p className="text-gray-400 font-mono text-sm">
                  // {achievements.length} files found
                </p>
              </motion.div>

              {/* Desktop subtitle */}
              <div className="hidden md:block mt-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 1.2 }}
                >
                  <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
                    <span className="text-primary">ls</span>{" "}
                    <span className="text-white">trophy_cabinet/</span>
                  </h1>
                  <p className="text-gray-400 font-mono text-lg">
                    // {achievements.length} files found — hackathon wins, awards, and recognitions
                  </p>
                </motion.div>
              </div>
            </div>

            {/* Right: Stats Dashboard */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="order-1 lg:order-2"
            >
              <StatsPanel />
            </motion.div>
          </div>
        </div>

        {/* ASCII Divider */}
        <div className="hidden md:block text-primary/30 font-mono text-xs overflow-hidden mb-8">
          {ASCII_DIVIDER}
        </div>

        {/* Filters & View Toggle Bar - Terminal Style */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="flex items-center justify-between gap-2 mb-8 p-3 bg-card/50 backdrop-blur-sm border border-border rounded-lg"
        >
          {/* Filter Tabs - Left (Terminal command style) */}
          <div className="flex items-center gap-2">
            <span className="text-primary font-mono text-sm hidden sm:inline">&gt; filter</span>
            <div className="flex gap-1 p-0.5 bg-muted/30 rounded-md border border-border">
              {["All", "2025", "2024"].map((year) => (
                <button
                  key={year}
                  onClick={() => setFilter(year as any)}
                  className={`px-3 py-1.5 rounded text-xs sm:text-sm font-mono transition-all relative ${
                    filter === year
                      ? "bg-primary text-black font-bold"
                      : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                  }`}
                >
                  {filter === year && (
                    <motion.span
                      layoutId="activeFilter"
                      className="absolute inset-0 bg-primary rounded"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <span className="relative z-10">{year === "All" ? "--all" : `--year=${year}`}</span>
                </button>
              ))}
            </div>
          </div>

          {/* View Toggle - Right */}
          <div className="flex items-center gap-2">
            <span className="text-primary font-mono text-sm hidden sm:inline">&gt; view</span>
            <div className="flex gap-0.5 p-0.5 bg-muted/30 rounded-md border border-border">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-1.5 rounded transition-all ${
                  viewMode === "grid"
                    ? "bg-primary text-black"
                    : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                }`}
                title="Grid View"
              >
                <LayoutGrid size={16} />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-1.5 rounded transition-all ${
                  viewMode === "list"
                    ? "bg-primary text-black"
                    : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                }`}
                title="List View"
              >
                <ListIcon size={16} />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Results Count */}
        <div className="mb-6 font-mono text-sm text-muted-foreground">
          <span className="text-primary">{filteredAchievements.length}</span> results
        </div>

        {/* Content Area */}
        <AnimatePresence mode="wait">
          {viewMode === "grid" ? (
            <motion.div
              key="grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 gap-4"
            >
              {filteredAchievements.map((item, index) => (
                <AchievementCard
                  key={item.id}
                  item={item}
                  index={index}
                  viewMode="grid"
                />
              ))}
            </motion.div>
          ) : (
            /* === LIST VIEW === */
            <motion.div
              key="list"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* Desktop Table View - Hidden on mobile */}
              <div className="hidden md:block border border-border rounded-lg overflow-hidden bg-card/50 backdrop-blur-sm">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm border-collapse">
                    <thead>
                      <tr className="border-b border-border bg-muted/30">
                        <th className="p-4 font-semibold text-muted-foreground w-[30%]">
                          <div className="flex items-center gap-2 font-mono">
                            <Calendar size={14} className="text-primary" />
                            Event & Year
                          </div>
                        </th>
                        <th className="p-4 font-semibold text-muted-foreground w-[50%]">
                          <div className="flex items-center gap-2 font-mono">
                            <Trophy size={14} className="text-primary" />
                            Placement & Awards
                          </div>
                        </th>
                        <th className="p-4 font-semibold text-muted-foreground w-[20%]">
                          <div className="flex items-center gap-2 font-mono">
                            <Github size={14} className="text-primary" />
                            Project Repository
                          </div>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border/50">
                      {filteredAchievements.map((item, index) => (
                        <motion.tr
                          key={item.id}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.15, delay: index * 0.015 }}
                          className="group bg-transparent hover:bg-primary/5 transition-colors"
                        >
                          <td className="p-4 align-top">
                            <div className="font-semibold text-white">{item.event}</div>
                            <div className="text-xs text-muted-foreground mt-1 font-mono">{item.year}</div>
                          </td>
                          <td className="p-4 align-top">
                            <div className="flex items-start gap-2">
                              <item.icon size={16} className={`mt-0.5 shrink-0 ${item.color}`} />
                              <span className={`font-medium ${item.color}`}>{item.prize}</span>
                            </div>
                            {item.location && (
                              <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1 ml-6 font-mono">
                                <MapPin size={10} />
                                {item.location}
                              </div>
                            )}
                          </td>
                          <td className="p-4 align-top">
                            {item.repoUrl ? (
                              <a
                                href={item.repoUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 text-primary hover:underline underline-offset-4 font-mono text-xs"
                              >
                                {item.project}
                              </a>
                            ) : (
                              <div className="flex flex-col">
                                <span className="font-mono text-xs text-muted-foreground">{item.project || "No Project"}</span>
                                <span className="text-[10px] text-muted-foreground/60 font-mono">(No Repo)</span>
                              </div>
                            )}
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Mobile Card View - Hidden on desktop */}
              <div className="md:hidden space-y-3">
                {filteredAchievements.map((item, index) => (
                  <AchievementCard
                    key={item.id}
                    item={item}
                    index={index}
                    viewMode="list"
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ASCII Footer Decoration */}
        <div className="mt-16 text-center">
          <div className="hidden md:block text-primary/30 font-mono text-xs overflow-hidden mb-4">
            {ASCII_DIVIDER}
          </div>
          <div className="text-muted-foreground text-sm font-mono">
            <span className="text-primary">//</span> EOF - End of Buffer
          </div>
          <div className="mt-2 text-muted-foreground/50 text-xs font-mono">
            {`{ total: ${achievements.length}, displayed: ${filteredAchievements.length}, filter: "${filter}" }`}
          </div>
        </div>
      </div>
    </main>
  );
}
