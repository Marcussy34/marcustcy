"use client";

import { Download, FileText, ChevronLeft, Terminal } from "lucide-react";
import Link from "next/link";
import FaultyTerminal from "@/components/FaultyTerminal";

export default function CVPage() {
  return (
    <main className="min-h-screen bg-background text-foreground py-12 px-6 relative">
      {/* FaultyTerminal Background */}
      <div className="fixed inset-0 z-0">
        <FaultyTerminal
          scale={1.5}
          gridMul={[2, 1]}
          digitSize={1.2}
          timeScale={0.5}
          pause={false}
          scanlineIntensity={0.3}
          glitchAmount={0.5}
          flickerAmount={0.5}
          noiseAmp={0.8}
          chromaticAberration={0}
          dither={0}
          curvature={0}
          tint="#00ff88"
          mouseReact={true}
          mouseStrength={0.3}
          pageLoadAnimation={true}
          brightness={0.15}
        />
      </div>
      <div className="container mx-auto max-w-5xl relative z-10">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-primary hover:text-accent transition-colors mb-6 font-mono text-sm"
          >
            <ChevronLeft size={16} />
            <span>cd ~/portfolio</span>
          </Link>

          <div className="flex items-center gap-2 text-primary mb-4">
            <Terminal size={20} />
            <span className="text-sm font-mono">~/cv</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            <span className="text-primary">cat</span>{" "}
            <span className="text-white">curriculum_vitae.pdf</span>
          </h1>
          <p className="text-gray-400 font-mono text-lg">
            // Computer Science Graduate specializing in AI & Cybersecurity
          </p>
        </div>

        {/* CV Card */}
        <div className="terminal-card p-8 mb-6">
          {/* Quick Info */}
          <div className="grid md:grid-cols-2 gap-6 mb-8 pb-8 border-b border-border">
            <div>
              <h2 className="text-sm font-mono text-primary mb-2">PERSONAL INFO</h2>
              <div className="space-y-2 font-mono text-sm">
                <p className="text-gray-400">
                  <span className="text-white">Name:</span> Marcus Tan Chi Yau
                </p>
                <p className="text-gray-400">
                  <span className="text-white">Location:</span> Subang Jaya, Malaysia 🇲🇾
                </p>
                <p className="text-gray-400">
                  <span className="text-white">Email:</span> marcus.tanchiyau@gmail.com
                </p>
                <p className="text-gray-400">
                  <span className="text-white">Phone:</span> +60166376101
                </p>
              </div>
            </div>

            <div>
              <h2 className="text-sm font-mono text-primary mb-2">EDUCATION</h2>
              <div className="space-y-2 font-mono text-sm">
                <p className="text-white font-bold">Bachelor of Computer Science</p>
                <p className="text-gray-400">Taylor's University</p>
                <p className="text-gray-400">
                  <span className="text-primary">Specialization:</span> AI & Cybersecurity
                </p>
                <p className="text-gray-400">
                  <span className="text-primary">CGPA:</span> 3.83/4.00
                </p>
                <p className="text-gray-400">
                  <span className="text-primary">Period:</span> Aug 2022 - Aug 2025
                </p>
              </div>
            </div>
          </div>

          {/* Expertise */}
          <div className="mb-8">
            <h2 className="text-sm font-mono text-primary mb-4">AREAS OF EXPERTISE</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {[
                "Artificial Intelligence (AI)",
                "Blockchain & Web3",
                "Full-Stack Development",
                "UI/UX Design",
                "AI Agent Development",
                "Python & JavaScript",
              ].map((skill) => (
                <div
                  key={skill}
                  className="bg-muted border border-border px-3 py-2 text-sm font-mono text-gray-300"
                >
                  {skill}
                </div>
              ))}
            </div>
          </div>

          {/* Download Button */}
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="/marcus-tan-cv.pdf"
              download
              className="inline-flex items-center justify-center gap-2 px-6 py-4 bg-primary text-black font-bold hover:bg-accent transition-colors"
            >
              <Download size={20} />
              Download Full CV (PDF)
            </a>
            <a
              href="/marcus-tan-cv.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-4 border border-border hover:border-primary hover:text-primary transition-colors font-mono"
            >
              <FileText size={20} />
              View in New Tab
            </a>
          </div>
        </div>

        {/* Embedded PDF Viewer */}
        <div className="terminal-card p-4">
          <h2 className="text-sm font-mono text-primary mb-4 px-4 pt-2">PDF PREVIEW</h2>
          <div className="w-full h-[800px] bg-muted border border-border">
            <iframe
              src="/marcus-tan-cv.pdf"
              className="w-full h-full"
              title="CV Preview"
            />
          </div>
        </div>


      </div>
    </main>
  );
}
