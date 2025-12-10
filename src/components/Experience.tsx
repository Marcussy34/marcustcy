"use client";

import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";

const experience = [
  {
    id: "EXP_01",
    type: "work",
    role: "Tech Generalist Intern",
    company: "ALPHV Technologies",
    period: "Jan 2025 - Apr 2025",
    description: "Pioneered automation framework prototypes and conducted strategic research on secure in-house LLM implementation.",
  },
  {
    id: "EDU_01",
    type: "education",
    role: "Bachelor of Computer Science",
    company: "Taylor's University",
    period: "Aug 2022 - Aug 2025",
    description: "Specialization: AI & Cyber Security. CGPA 3.83/4.00 (Dean's List).",
  },
  {
    id: "EXP_02",
    type: "work",
    role: "Math Tuition Teacher",
    company: "A+ Home Tuition Malaysia",
    period: "Mar 2024 - Mar 2025",
    description: "Delivered personalized SPM mathematics tutoring and tailored lesson plans.",
  },
  {
    id: "EDU_02",
    type: "education",
    role: "Foundation in Computer Science",
    company: "Taylor's College",
    period: "Jun 2021 - Aug 2022",
    description: "CGPA 3.93/4.00. Top Achiever's Award.",
  },
];

export default function Experience() {
  return (
    <section id="experience" className="py-24 relative border-t border-border bg-muted/30">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="flex items-center gap-2 text-primary mb-2">
            <ChevronRight size={20} />
            <span className="text-sm font-mono">~/experience</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            <span className="text-primary">const</span> <span className="text-white">careerPath</span> = [...]
          </h2>
        </motion.div>

        <div className="max-w-4xl mx-auto space-y-6">
          {experience.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex flex-col md:flex-row gap-4 md:gap-8 group"
            >
              {/* Line Number / ID */}
              <div className="hidden md:block w-24 text-right pt-6 text-xs text-muted-foreground font-mono">
                {item.id}
              </div>

              {/* Content Card */}
              <div className="flex-1 terminal-card p-6 relative">
                {/* Connector Line (Visual only) */}
                <div className="absolute left-0 top-8 w-1 h-full bg-border -ml-4 md:-ml-8 hidden md:block group-last:hidden" />
                <div className="absolute left-0 top-8 w-3 h-3 bg-primary rounded-full -ml-[19px] md:-ml-[35px] hidden md:block border-2 border-background" />

                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-2 gap-2">
                  <h3 className="text-lg font-bold text-white group-hover:text-primary transition-colors">
                    {item.role}
                  </h3>
                  <span className="text-xs font-mono text-primary bg-primary/10 px-2 py-1 rounded">
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
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
