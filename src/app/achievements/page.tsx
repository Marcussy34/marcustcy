"use client";

import { motion } from "framer-motion";
import { achievements } from "@/data/achievements";
import Navbar from "@/components/Navbar";
import { ArrowLeft, Calendar, Github, MapPin, Trophy, LayoutGrid, List as ListIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function AchievementsPage() {
  const [filter, setFilter] = useState<"All" | "2025" | "2024">("All");
  const [viewMode, setViewMode] = useState<"grid" | "list">("list");

  const filteredAchievements = achievements.filter((item) => {
    if (filter === "All") return true;
    return item.year === filter;
  });

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />
      
      <div className="container mx-auto px-6 pt-20 pb-12">
        {/* Header */}
        <div className="mb-12">
          <Link 
            href="/"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-6 group"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            <span className="font-mono text-sm">cd ..</span>
          </Link>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-lg bg-primary/10 border border-primary/20 text-primary">
                <Trophy size={32} />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
                Trophy Cabinet
              </h1>
            </div>
            <p className="text-xl text-muted-foreground max-w-2xl">
              A collection of hackathon wins, competition awards, and recognitions from my journey.
            </p>
          </motion.div>
        </div>

        {/* Filters & View Toggle Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
            {/* Filter Tabs */}
            <div className="flex gap-2 p-1 bg-muted/30 rounded-lg border border-border">
              {["All", "2025", "2024"].map((year) => (
                <button
                  key={year}
                  onClick={() => setFilter(year as any)}
                  className={`px-4 py-1.5 rounded-md text-sm font-mono transition-all ${
                    filter === year
                      ? "bg-primary text-black font-bold shadow-sm"
                      : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                  }`}
                >
                  {year}
                </button>
              ))}
            </div>

            {/* View Toggle */}
            <div className="flex gap-1 p-1 bg-muted/30 rounded-lg border border-border">
                <button
                    onClick={() => setViewMode("grid")}
                    className={`p-2 rounded-md transition-all ${
                        viewMode === "grid" 
                        ? "bg-background shadow-sm text-primary" 
                        : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                    }`}
                    title="Grid View (With Pictures)"
                >
                    <LayoutGrid size={18} />
                </button>
                <button
                    onClick={() => setViewMode("list")}
                    className={`p-2 rounded-md transition-all ${
                        viewMode === "list" 
                        ? "bg-background shadow-sm text-primary" 
                        : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                    }`}
                    title="List View (Compact)"
                >
                    <ListIcon size={18} />
                </button>
            </div>
        </div>

        {/* Content Area */}
        <div className={`grid gap-4 ${viewMode === "grid" ? "grid-cols-1" : "grid-cols-1"}`}>
          {filteredAchievements.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className={`group relative border border-border bg-card/50 rounded-lg overflow-hidden hover:border-primary/50 transition-colors duration-300 ${
                  viewMode === "list" ? "hover:bg-white/5" : ""
              }`}
            >
                {viewMode === "grid" ? (
                    // === GRID VIEW (Rich, same as before) ===
                    <div className="flex flex-col md:flex-row h-full">
                        <div className="w-full md:w-32 bg-muted/30 relative border-b md:border-b-0 md:border-r border-border flex flex-col items-center justify-center p-4 group-hover:bg-primary/5 transition-colors shrink-0">
                            <div className="absolute inset-0 opacity-[0.02] bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:8px_8px]" />
                            <div className={`p-3 rounded-xl bg-background/50 backdrop-blur-sm border border-border shadow-sm ${item.color} transform group-hover:scale-105 transition-transform duration-300`}>
                                <item.icon size={28} />
                            </div>
                            <div className="mt-3 text-xs font-mono text-muted-foreground text-center">{item.year}</div>
                        </div>

                        <div className="flex-1 p-4 md:p-5 flex flex-col justify-center">
                            <div className="flex flex-col md:flex-row md:items-start justify-between gap-2 mb-2">
                                <div>
                                    <h2 className={`text-lg md:text-xl font-bold ${item.color} leading-tight mb-1`}>
                                    {item.prize}
                                    </h2>
                                    <h3 className="text-base text-white font-semibold">
                                    {item.event}
                                    </h3>
                                </div>
                                {item.location && (
                                    <div className="flex items-center gap-1 text-xs text-muted-foreground shrink-0 mt-1 md:mt-0">
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

                            <div className="mt-3 pt-3 border-t border-border/50 flex flex-wrap items-center justify-between gap-3">
                                <div className="flex flex-wrap gap-2">
                                    {item.tags.slice(0, 3).map(tag => (
                                    <span key={tag} className="text-[10px] px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-muted-foreground">
                                        {tag}
                                    </span>
                                    ))}
                                </div>
                                
                                {item.repoUrl && (
                                    <a href={item.repoUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors">
                                        <Github size={12} />
                                        Code
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                ) : (
                    // === LIST VIEW (Compact Table-like) ===
                    <div className="flex items-center justify-between p-4 gap-4">
                        <div className="flex items-center gap-4 flex-1 min-w-0">
                             {/* Icon (Small) */}
                            <div className={`p-2 rounded-lg bg-muted/50 border border-border ${item.color} shrink-0`}>
                                <item.icon size={16} />
                            </div>

                            {/* Main Info */}
                            <div className="min-w-0 flex-1">
                                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                                    <span className={`text-base font-bold truncate ${item.color}`}>{item.prize}</span>
                                    <span className="text-white truncate font-medium text-sm">{item.event}</span>
                                </div>
                                <div className="flex items-center gap-2 text-xs text-muted-foreground mt-0.5">
                                    <span className="font-mono text-primary">{item.project}</span>
                                    <span>•</span>
                                    <span>{item.year}</span>
                                    {item.location && (
                                        <>
                                            <span>•</span>
                                            <span>{item.location}</span>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>

                         {/* Actions / Right Side */}
                        <div className="flex items-center gap-4 shrink-0">
                            {/* Tags (Desktop only) */}
                            <div className="hidden md:flex gap-1.5">
                                {item.tags.slice(0, 2).map(tag => (
                                    <span key={tag} className="text-[10px] px-1.5 py-0.5 rounded bg-muted border border-border text-muted-foreground">
                                        {tag}
                                    </span>
                                ))}
                            </div>

                            {item.repoUrl ? (
                                <a href={item.repoUrl} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-white transition-colors p-1" title="View Code">
                                    <Github size={16} />
                                </a>
                            ) : (
                                <div className="w-6" /> // Spacer
                            )}
                        </div>
                    </div>
                )}
            </motion.div>
          ))}
        </div>
        
        {/* Footer Note */}
        <div className="mt-24 text-center text-muted-foreground text-sm font-mono">
           // End of Buffer
        </div>
      </div>
    </main>
  );
}
