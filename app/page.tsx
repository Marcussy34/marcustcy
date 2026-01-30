"use client";

import { Github, Linkedin, Mail, MapPin, ExternalLink, Twitter } from "lucide-react";
import { BlurFade } from "@/components/ui/blur-fade";

// Experience data
const experiences = [
  {
    company: "ALPHV Technologies",
    role: "Tech Generalist Intern",
    period: "Jan 2025 - Apr 2025",
    description: [
      "Delivered automation framework prototype for document processing",
      "Researched implementation of secure, in-house LLM",
      "Maintained Jobs By Developer Kaki website",
    ],
  },
  {
    company: "A+ Home Tuition Malaysia",
    role: "Math Tuition Teacher",
    period: "Mar 2024 - Mar 2025",
    description: ["Personalized SPM mathematics tutoring"],
  },
];

// Education data
const education = [
  {
    degree: "BSc Computer Science",
    specialization: "AI & Cybersecurity",
    school: "Taylor's University",
    period: "2022 - 2025",
    cgpa: "3.83",
  },
  {
    degree: "Foundation in Computer Science",
    school: "Taylor's College",
    period: "2021 - 2022",
    cgpa: "3.93",
  },
];

// Hackathon wins data (19 events) with GitHub links
const hackathons = [
  {
    event: "Cursor × Anthropic Hackathon 2025",
    project: "Koyak Kombat",
    awards: ["1st (Best Indie Hacker)", "Finalist"],
    repo: "https://github.com/Marcussy34/koyak-kombat",
  },
  {
    event: "BUIDL Asia Seoul 2025",
    project: "CureMeBaby",
    awards: ["Champion", "1st (Gensyn)", "2nd (Nethermind)"],
    repo: "https://github.com/derek2403/CureMeBaby",
  },
  {
    event: "Token2049 Singapore 2025",
    project: "LeftAI",
    awards: ["1st (Celo)", "Top 5 Finalist"],
    repo: "https://github.com/derek2403/token2049",
  },
  {
    event: "ETHGlobal New Delhi 2025",
    project: "Dhal Way",
    awards: ["1st (Flow)", "1st (Hedera)"],
    repo: "https://github.com/derek2403/ethindia",
  },
  {
    event: "ETHTokyo 2025",
    project: "Toku Kaigan",
    awards: ["1st (AI Track)", "Finalist"],
    repo: "https://github.com/derek2403/ethtokyo",
  },
  {
    event: "DevQuest 2025",
    project: "Kwek Kwek",
    awards: ["Champion (Overall)"],
    repo: null,
  },
  {
    event: "ImagineHack 2025",
    project: "Tea Time",
    awards: ["Champion (Overall)"],
    repo: "https://github.com/derek2403/tt",
  },
  {
    event: "ETHGlobal Agentic 2025",
    project: "4AI 1Human",
    awards: ["1st (Flow - Best AI Agent)"],
    repo: "https://github.com/derek2403/4AI-1Human",
  },
  {
    event: "ETHGlobal Online 2025",
    project: "Pet Pet",
    awards: ["1st (BlockScout)"],
    repo: "https://github.com/derek2403/pet-pet",
  },
  {
    event: "Devmatch 2025",
    project: "Grand Warden",
    awards: ["1st (Oasis)", "Finalist (SUI)"],
    repo: "https://github.com/Marcussy34/apudevmatch2025",
  },
  {
    event: "ETHGlobal Taipei 2025",
    project: "MemestCutestPlatform",
    awards: ["2nd (1inch)", "Winner (Celo)"],
    repo: "https://github.com/derek2403/memest-cutest-platform",
  },
  {
    event: "Consensus HK 2025",
    project: "Grand Theft Aptos",
    awards: ["3rd (Aptos)"],
    repo: "https://github.com/derek2403/grand-theft-aptos",
  },
  {
    event: "Forte Hacks 2025",
    project: "Dhal Way",
    awards: ["3rd (Best Existing Codebase)"],
    repo: "https://github.com/derek2403/dhal-way",
  },
  {
    event: "AKINDO Moca Network",
    project: "Credo Protocol",
    awards: ["1st Place"],
    repo: "https://github.com/Credo-Protocol/Credo-Protocol",
  },
  {
    event: "SuperteamMY 2025",
    project: "LockedIn",
    awards: ["Top 10 Finalist"],
    repo: "https://github.com/Marcussy34/solana-mega",
  },
  {
    event: "ETHKL 2024",
    project: "JustETH",
    awards: ["Top 5", "2nd (ICP)", "Winner (ORA)"],
    repo: "https://github.com/derek2403/AI-Food-Rating-App",
  },
  {
    event: "Devmatch 2024",
    project: "Fundify",
    awards: ["2nd (Maschain)"],
    repo: "https://github.com/Lim-921/DevMatch",
  },
  {
    event: "Alha Alfa Cosmetics",
    project: "AI Model",
    awards: ["2nd (AI Model)"],
    repo: null,
  },
  {
    event: "Hilti IT Competition 2024",
    project: "",
    awards: ["Semi-Finalist"],
    repo: null,
  },
];

// Featured projects data with GitHub links
const projects = [
  {
    name: "CureMeBaby",
    description:
      "AI-driven privacy-first mental health assistant using TEE + Gensyn + NEAR",
    tech: ["AI", "TEE", "Gensyn", "NEAR"],
    repo: "https://github.com/derek2403/CureMeBaby",
  },
  {
    name: "LeftAI",
    description: "Natural language crypto transactions on Celo MiniPay",
    tech: ["AI", "Celo", "NLP"],
    repo: "https://github.com/derek2403/token2049",
  },
  {
    name: "Dhal Way",
    description: "Universal cross-chain payment protocol",
    tech: ["Cross-chain", "Flow", "Hedera"],
    repo: "https://github.com/derek2403/dhal-way",
  },
  {
    name: "Toku Kaigan",
    description:
      "Anime-style AI psychiatrist with 3D therapy and manga visualization",
    tech: ["AI", "3D", "Anime"],
    repo: "https://github.com/derek2403/ethtokyo",
  },
  {
    name: "4AI 1Human",
    description: "AI agents for smart contract creation via natural language",
    tech: ["AI Agents", "Smart Contracts", "Flow"],
    repo: "https://github.com/derek2403/4AI-1Human",
  },
  {
    name: "Tea Time",
    description: "AI news platform with bias detection and sentiment analysis",
    tech: ["AI", "NLP", "Sentiment Analysis"],
    repo: "https://github.com/derek2403/tt",
  },
];

// Social links
const socials = [
  {
    name: "GitHub",
    href: "https://github.com/Marcussy34",
    icon: Github,
  },
  {
    name: "Twitter",
    href: "https://twitter.com/marcustan1337",
    icon: Twitter,
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com/in/marcus-tan-8846ba271",
    icon: Linkedin,
  },
  {
    name: "Email",
    href: "mailto:marcus.tanchiyau@gmail.com",
    icon: Mail,
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-paper">
      {/* Navigation - Fixed minimal nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-paper/80 backdrop-blur-sm border-b border-divider">
        <div className="mx-auto max-w-[672px] px-6 py-4 flex justify-between items-center">
          <a
            href="#hero"
            className="font-serif text-lg font-semibold text-ink hover:text-accent transition-colors"
          >
            Marcus T.
          </a>
          <div className="flex gap-6 text-sm text-ink-light">
            <a href="#about" className="hover:text-ink transition-colors">
              About
            </a>
            <a href="#hackathons" className="hover:text-ink transition-colors">
              Wins
            </a>
            <a href="#projects" className="hover:text-ink transition-colors">
              Projects
            </a>
            <a href="#contact" className="hover:text-ink transition-colors">
              Contact
            </a>
          </div>
        </div>
      </nav>

      <main>
        {/* Hero Section */}
        <section
          id="hero"
          className="min-h-screen flex flex-col items-center justify-center px-6"
        >
          <BlurFade delay={0.1}>
            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold text-ink text-center">
              Marcus T.
            </h1>
          </BlurFade>
          <BlurFade delay={0.2}>
            <p className="mt-4 text-xl md:text-2xl text-ink-light text-center">
              Software Engineer
            </p>
          </BlurFade>
          <BlurFade delay={0.3}>
            <div className="mt-6 flex items-center gap-2 text-ink-muted">
              <MapPin className="w-4 h-4" />
              <span className="text-sm">Selangor, Malaysia</span>
            </div>
          </BlurFade>
        </section>

        {/* About Section */}
        <section id="about" className="py-24 px-6 bg-paper-warm">
          <div className="mx-auto max-w-[672px]">
            <BlurFade delay={0.1} inView>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-ink mb-8">
                About
              </h2>
            </BlurFade>
            <BlurFade delay={0.2} inView>
              <p className="text-lg leading-relaxed text-ink-light">
                Full Stack Developer / AI Engineer / Web3 Enthusiast with a BSc
                in Computer Science (AI & Cybersecurity) from Taylor&apos;s
                University. Passionate about building useful applications,
                particularly AI-powered tools and decentralized apps (dApps).
              </p>
            </BlurFade>
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="py-24 px-6">
          <div className="mx-auto max-w-[672px]">
            <BlurFade delay={0.1} inView>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-ink mb-12">
                Experience
              </h2>
            </BlurFade>

            <div className="space-y-12">
              {experiences.map((exp, index) => (
                <BlurFade key={index} delay={0.1 + index * 0.1} inView>
                  <div className="border-l-2 border-divider pl-6 hover:border-ink-muted transition-colors">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-1">
                      <h3 className="font-semibold text-ink">{exp.role}</h3>
                      <span className="text-sm text-ink-muted">
                        {exp.period}
                      </span>
                    </div>
                    <p className="text-ink-light mt-1">{exp.company}</p>
                    <ul className="mt-3 space-y-1">
                      {exp.description.map((item, i) => (
                        <li key={i} className="text-ink-muted text-sm">
                          • {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </BlurFade>
              ))}
            </div>

            {/* Education */}
            <BlurFade delay={0.3} inView>
              <h3 className="font-serif text-2xl font-bold text-ink mt-16 mb-8">
                Education
              </h3>
            </BlurFade>
            <div className="space-y-8">
              {education.map((edu, index) => (
                <BlurFade key={index} delay={0.3 + index * 0.1} inView>
                  <div className="border-l-2 border-divider pl-6 hover:border-ink-muted transition-colors">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-1">
                      <h4 className="font-semibold text-ink">{edu.degree}</h4>
                      <span className="text-sm text-ink-muted">
                        {edu.period}
                      </span>
                    </div>
                    {edu.specialization && (
                      <p className="text-ink-light text-sm">
                        {edu.specialization}
                      </p>
                    )}
                    <p className="text-ink-light mt-1">{edu.school}</p>
                    <p className="text-sm text-ink-muted mt-1">
                      CGPA: {edu.cgpa}
                    </p>
                  </div>
                </BlurFade>
              ))}
            </div>
          </div>
        </section>

        {/* Hackathons Section - Standout Feature */}
        <section id="hackathons" className="py-24 px-6 bg-paper-warm">
          <div className="mx-auto max-w-[672px]">
            <BlurFade delay={0.1} inView>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-ink mb-12">
                Hackathon Wins
              </h2>
            </BlurFade>

            {/* Large counter - the standout element */}
            <BlurFade delay={0.2} inView>
              <div className="text-center mb-16">
                <span className="font-serif text-8xl md:text-9xl font-bold text-accent">
                  19
                </span>
                <p className="text-xl text-ink-light mt-2">victories</p>
                <p className="text-sm text-ink-muted mt-1">30+ awards total</p>
              </div>
            </BlurFade>

            {/* Hackathon wins table */}
            <BlurFade delay={0.3} inView>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-divider">
                      <th className="py-3 pr-4 text-sm font-semibold text-ink">
                        Event
                      </th>
                      <th className="py-3 pr-4 text-sm font-semibold text-ink">
                        Project
                      </th>
                      <th className="py-3 text-sm font-semibold text-ink">
                        Awards
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {hackathons.map((hack, index) => (
                      <tr
                        key={index}
                        className="border-b border-divider hover:bg-paper transition-colors"
                      >
                        <td className="py-3 pr-4 text-sm text-ink-light">
                          {hack.event}
                        </td>
                        <td className="py-3 pr-4 text-sm font-medium text-ink">
                          {hack.repo ? (
                            <a
                              href={hack.repo}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="hover:text-accent transition-colors inline-flex items-center gap-1"
                            >
                              {hack.project}
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          ) : (
                            hack.project || "—"
                          )}
                        </td>
                        <td className="py-3">
                          <div className="flex flex-wrap gap-1">
                            {hack.awards.map((award, i) => (
                              <span
                                key={i}
                                className="text-xs px-2 py-0.5 bg-paper text-ink-light border border-divider rounded"
                              >
                                {award}
                              </span>
                            ))}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </BlurFade>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-24 px-6">
          <div className="mx-auto max-w-[672px]">
            <BlurFade delay={0.1} inView>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-ink mb-12">
                Featured Projects
              </h2>
            </BlurFade>

            <div className="space-y-8">
              {projects.map((project, index) => (
                <BlurFade key={index} delay={0.1 + index * 0.1} inView>
                  <a
                    href={project.repo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block p-6 border border-divider rounded-lg hover:border-ink-muted transition-colors group"
                  >
                    <div className="flex items-start justify-between">
                      <h3 className="font-semibold text-ink group-hover:text-accent transition-colors">
                        {project.name}
                      </h3>
                      <ExternalLink className="w-4 h-4 text-ink-muted opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <p className="text-ink-light mt-2">{project.description}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {project.tech.map((tech, i) => (
                        <span
                          key={i}
                          className="text-xs px-2 py-1 border border-divider text-ink-muted rounded"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </a>
                </BlurFade>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-24 px-6 bg-paper-warm">
          <div className="mx-auto max-w-[672px] text-center">
            <BlurFade delay={0.1} inView>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-ink mb-8">
                Get in Touch
              </h2>
            </BlurFade>
            <BlurFade delay={0.2} inView>
              <p className="text-ink-light mb-8">
                Interested in collaborating or just want to say hi?
              </p>
            </BlurFade>

            <BlurFade delay={0.3} inView>
              <a
                href="mailto:marcus.tanchiyau@gmail.com"
                className="inline-block text-lg text-accent hover:underline transition-colors"
              >
                marcus.tanchiyau@gmail.com
              </a>
            </BlurFade>

            <BlurFade delay={0.4} inView>
              <div className="mt-8 flex justify-center gap-6">
                {socials.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-ink-muted hover:text-accent transition-colors"
                    aria-label={social.name}
                  >
                    <social.icon className="w-6 h-6" />
                  </a>
                ))}
              </div>
            </BlurFade>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-divider">
        <div className="mx-auto max-w-[672px] text-center">
          <p className="text-sm text-ink-muted">
            © {new Date().getFullYear()} Marcus T. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
