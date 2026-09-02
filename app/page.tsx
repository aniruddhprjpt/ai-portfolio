"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Chatbot from "@/components/Chatbot";
import Typewriter from "@/components/Typewriter";
import FMReveal from "@/components/FMReveal";
import HeroText from "@/components/HeroText";
import Navbar from "@/components/Navbar";
import CustomCursor from "@/components/CustomCursor";
import { portfolioData } from "@/data/portfolio";

/* ── small helpers ── */
const GithubIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
  </svg>
);
const LinkedInIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const projectIcons = ["🍽️", "🧠", "🏠", "🤖"];

const techColors: Record<string, string> = {
  "Next.js": "blue", "React": "blue", "React 19": "blue", "Django": "blue",
  "TypeScript": "blue", "JavaScript": "blue",
  "Groq API": "purple", "LLaMA": "purple", "Claude API": "purple",
  "scikit-learn": "purple", "TensorFlow": "purple", "PyTorch": "purple",
  "Supabase": "green", "PostgreSQL": "green", "MySQL": "green",
  "Vercel": "gray", "Docker": "gray", "Git": "gray",
};
const getBadgeClass = (tech: string) => {
  const color = techColors[tech];
  if (color === "blue")   return "bg-blue-500/10 border-blue-500/25 text-blue-300";
  if (color === "purple") return "bg-violet-500/10 border-violet-500/25 text-violet-300";
  if (color === "green")  return "bg-emerald-500/10 border-emerald-500/25 text-emerald-300";
  return "bg-white/5 border-white/10 text-gray-400";
};

/* ── Stagger badge list ── */
function BadgeList({ items, className = "" }: { items: string[]; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref} className={`flex flex-wrap gap-2 ${className}`}>
      {items.map((item, i) => (
        <motion.span
          key={item}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: i * 0.04, duration: 0.35, ease: "backOut" }}
          className="skill-badge"
        >
          {item}
        </motion.span>
      ))}
    </motion.div>
  );
}

/* ── Timeline dot ── */
function TimelineDot() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  return (
    <div ref={ref} className="absolute left-5 top-6 hidden md:flex items-center justify-center">
      <motion.div
        initial={{ scale: 0 }}
        animate={inView ? { scale: 1 } : {}}
        transition={{ type: "spring", stiffness: 300, damping: 18 }}
        className="w-6 h-6 bg-gradient-to-br from-violet-500 to-purple-600 rounded-full border-2 border-[#05050f] z-10 flex items-center justify-center timeline-dot"
      >
        <div className="w-2 h-2 bg-white rounded-full" />
      </motion.div>
    </div>
  );
}

export default function Home() {
  const { name, bio, links, skills, experience, education, projects, email, languages } = portfolioData;
  const firstName = name.split(" ")[0];

  return (
    <main className="min-h-screen bg-[#05050f] text-gray-100 overflow-x-hidden relative">
      <CustomCursor />

      {/* ── AMBIENT BACKGROUND ── */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="blob blob-1" />
        <div className="blob blob-2" />
        <div className="blob blob-3" />
        {[...Array(22)].map((_, i) => (
          <div key={i} className="star" style={{
            width: `${1 + (i % 3) * 0.7}px`,
            height: `${1 + (i % 3) * 0.7}px`,
            top: `${(i * 17 + 5) % 100}%`,
            left: `${(i * 23 + 11) % 100}%`,
            ["--duration" as string]: `${2.5 + (i % 4)}s`,
            ["--delay" as string]: `${(i * 0.4) % 3}s`,
          }} />
        ))}
      </div>

      {/* ── NAVBAR ── */}
      <Navbar firstName={firstName} email={email} />

      {/* ══════════════════════════════════════════
          HERO
      ══════════════════════════════════════════ */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 dot-bg z-10">
        <div className="text-center px-6 max-w-4xl mx-auto">

          {/* Avatar */}
          <motion.div
            initial={{ scale: 0, rotate: -15 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 18, delay: 0.1 }}
            className="flex justify-center mb-8"
          >
            <div className="avatar-ring w-28 h-28 rounded-full float">
              <div className="w-28 h-28 rounded-full bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500 flex items-center justify-center text-5xl font-bold glow-purple font-heading">
                {firstName.charAt(0)}
              </div>
            </div>
          </motion.div>

          {/* Status badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/25 text-indigo-300 text-sm px-5 py-2 rounded-full mb-6 backdrop-blur-sm"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400" />
            </span>
            Available for new opportunities
          </motion.div>

          {/* Animated heading */}
          <HeroText name={firstName} />

          {/* Typewriter */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.5 }}
            className="text-xl md:text-2xl font-semibold mb-6 h-10 text-gray-300"
          >
            <Typewriter words={[
              "Full Stack Developer",
              "ML Engineer",
              "AI Builder",
              "Django & React Dev",
              "Open to Work 🚀",
            ]} />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.55 }}
            className="text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed text-lg"
          >
            {bio.split(".")[0]}.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.25, duration: 0.5 }}
            className="flex flex-wrap gap-4 justify-center mb-12"
          >
            <motion.a
              href="#projects"
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.97 }}
              className="btn-gradient px-8 py-3.5 rounded-xl font-semibold text-base"
            >
              <span>View My Work →</span>
            </motion.a>
            <motion.a
              href={links.portfolio}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.97 }}
              className="px-8 py-3.5 rounded-xl font-semibold text-base border border-white/10 hover:border-violet-500/50 hover:bg-violet-500/10 transition-all duration-300"
            >
              GitHub Pages ↗
            </motion.a>
          </motion.div>

          {/* Social icons */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4 }}
            className="flex gap-4 justify-center mb-12"
          >
            {[
              { href: links.github, label: "GitHub", Icon: GithubIcon },
              { href: links.linkedin, label: "LinkedIn", Icon: LinkedInIcon },
            ].filter(s => s.href).map((s) => (
              <motion.a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.15, y: -4 }}
                whileTap={{ scale: 0.95 }}
                className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-violet-500/20 hover:border-violet-500/40 transition-all duration-300"
              >
                <s.Icon />
              </motion.a>
            ))}
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.6 }}
            className="flex flex-col items-center gap-2 text-gray-600 text-xs"
          >
            <motion.span animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}>
              scroll down
            </motion.span>
            <motion.svg
              animate={{ y: [0, 6, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut", delay: 0.15 }}
              className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </motion.svg>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          ABOUT
      ══════════════════════════════════════════ */}
      <section id="about" className="py-28 px-6 relative z-10">
        <div className="max-w-5xl mx-auto">
          <FMReveal>
            <div className="text-center mb-16">
              <h2 className="font-heading text-4xl font-black mb-3 section-title">
                About <span className="gradient-text">Me</span>
              </h2>
            </div>
          </FMReveal>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <FMReveal delay={0.1} direction="left">
              <div className="space-y-5 text-gray-400 leading-relaxed text-[15px]">
                {bio.split(". ").filter(Boolean).map((s, i) => (
                  <motion.p
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.12, duration: 0.5 }}
                    className="border-l-2 border-violet-500/40 pl-4"
                  >
                    {s.endsWith(".") ? s : `${s}.`}
                  </motion.p>
                ))}
                <div className="pt-3">
                  <p className="text-sm text-gray-500 mb-3">Languages spoken:</p>
                  <BadgeList items={languages ?? []} />
                </div>
              </div>
            </FMReveal>

            <FMReveal delay={0.2} direction="right">
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "Projects Built", value: `${projects.length}+`, icon: "🚀" },
                  { label: "Technologies", value: `${Object.values(skills).flat().length}+`, icon: "⚡" },
                  { label: "Graduated", value: "2026", icon: "🎓" },
                  { label: "Open to Work", value: "Yes ✓", icon: "💼" },
                ].map(({ label, value, icon }, i) => (
                  <motion.div
                    key={label}
                    initial={{ opacity: 0, scale: 0.85 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, type: "spring", stiffness: 200, damping: 16 }}
                    whileHover={{ y: -6, scale: 1.03 }}
                    className="card-glow shimmer rounded-2xl p-6 text-center cursor-default"
                  >
                    <div className="text-2xl mb-1">{icon}</div>
                    <p className="font-heading text-3xl font-black gradient-text">{value}</p>
                    <p className="text-gray-500 text-xs mt-1">{label}</p>
                  </motion.div>
                ))}
              </div>
            </FMReveal>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          PROJECTS — Bento grid
      ══════════════════════════════════════════ */}
      <section id="projects" className="py-28 px-6 relative z-10">
        <div className="absolute inset-0 dot-bg opacity-20 pointer-events-none" />
        <div className="max-w-6xl mx-auto relative">
          <FMReveal>
            <div className="text-center mb-16">
              <h2 className="font-heading text-4xl font-black mb-3 section-title">
                Things I&apos;ve <span className="gradient-text">Built</span>
              </h2>
              <p className="text-gray-500 mt-6">Projects I&apos;m proud of</p>
            </div>
          </FMReveal>

          {/* Bento: first project = featured (full width), rest = 2-col */}
          <div className="space-y-6">
            {projects.map((project, i) => (
              <FMReveal key={project.name} delay={i === 0 ? 0.05 : 0.05 + (i * 0.08)}>
                <motion.div
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.28, ease: "easeOut" }}
                  className={`card-glow rounded-2xl p-7 flex flex-col ${i === 0 ? "md:flex-row md:gap-10" : ""}`}
                >
                  {/* Icon + header */}
                  <div className={`${i === 0 ? "md:w-1/3 flex flex-col justify-between" : ""}`}>
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="text-3xl mb-2">{projectIcons[i] ?? "💡"}</div>
                        <h3 className="font-heading font-bold text-lg text-white leading-tight mb-1">
                          {project.name}
                        </h3>
                        {i === 0 && (
                          <span className="inline-block text-xs bg-violet-500/20 border border-violet-500/30 text-violet-300 px-3 py-0.5 rounded-full mb-3">
                            ✦ Featured
                          </span>
                        )}
                      </div>
                      <div className="flex gap-2 ml-3 flex-shrink-0">
                        {project.live && (
                          <motion.a
                            href={project.live}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.15 }}
                            className="w-9 h-9 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 hover:bg-indigo-500/30 transition-all"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                          </motion.a>
                        )}
                        {project.github && (
                          <motion.a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.15 }}
                            className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:bg-white/10 transition-all"
                          >
                            <GithubIcon />
                          </motion.a>
                        )}
                      </div>
                    </div>
                    <p className="text-gray-400 text-sm leading-relaxed mb-4">{project.description}</p>
                    <div className="flex flex-wrap gap-1.5 mt-auto">
                      {project.tech.map((t) => (
                        <span key={t} className={`text-xs px-2.5 py-1 rounded-full border ${getBadgeClass(t)}`}>{t}</span>
                      ))}
                    </div>
                  </div>

                  {/* Highlights */}
                  {i === 0 && (
                    <div className="md:w-2/3 mt-6 md:mt-0">
                      <p className="text-xs text-gray-600 uppercase tracking-widest mb-3 font-heading">Highlights</p>
                      <ul className="space-y-2.5">
                        {project.highlights.map((h) => (
                          <li key={h} className="text-gray-400 text-sm flex gap-2.5 leading-relaxed">
                            <span className="text-violet-400 mt-0.5 flex-shrink-0">▹</span>
                            {h}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Non-featured highlights */}
                  {i !== 0 && (
                    <ul className="space-y-2 mt-4 border-t border-white/5 pt-4">
                      {project.highlights.slice(0, 3).map((h) => (
                        <li key={h} className="text-gray-500 text-xs flex gap-2">
                          <span className="text-violet-400 mt-0.5 flex-shrink-0">▹</span>
                          {h}
                        </li>
                      ))}
                    </ul>
                  )}
                </motion.div>
              </FMReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          SKILLS
      ══════════════════════════════════════════ */}
      <section id="skills" className="py-28 px-6 relative z-10">
        <div className="max-w-5xl mx-auto">
          <FMReveal>
            <div className="text-center mb-16">
              <h2 className="font-heading text-4xl font-black mb-3 section-title">
                Tech <span className="gradient-text">Stack</span>
              </h2>
              <p className="text-gray-500 mt-6">Technologies I work with</p>
            </div>
          </FMReveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {Object.entries(skills).map(([category, items], i) => (
              <FMReveal key={category} delay={i * 0.07}>
                <motion.div
                  whileHover={{ y: -5 }}
                  className="card-glow rounded-2xl p-6 h-full"
                >
                  <h3 className="font-heading font-bold text-xs text-violet-400 uppercase tracking-widest mb-4">
                    {category.replace(/_/g, " ")}
                  </h3>
                  <BadgeList items={items as string[]} />
                </motion.div>
              </FMReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          EXPERIENCE — animated timeline
      ══════════════════════════════════════════ */}
      <section id="experience" className="py-28 px-6 relative z-10">
        <div className="absolute inset-0 dot-bg opacity-15 pointer-events-none" />
        <div className="max-w-4xl mx-auto relative">
          <FMReveal>
            <div className="text-center mb-16">
              <h2 className="font-heading text-4xl font-black mb-3 section-title">
                Work <span className="gradient-text">Experience</span>
              </h2>
              <p className="text-gray-500 mt-6">My professional journey</p>
            </div>
          </FMReveal>

          <div className="relative">
            {/* Timeline line */}
            <motion.div
              initial={{ scaleY: 0, originY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="absolute left-8 top-4 bottom-4 w-px bg-gradient-to-b from-violet-500 via-purple-500 to-transparent hidden md:block"
            />

            <div className="space-y-8">
              {experience.map((job, i) => (
                <FMReveal key={i} delay={i * 0.15} direction={i % 2 === 0 ? "left" : "right"}>
                  <div className="relative md:pl-20">
                    <TimelineDot />
                    <motion.div
                      whileHover={{ y: -4 }}
                      className="card-glow rounded-2xl p-7"
                    >
                      <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                        <div>
                          <h3 className="font-heading font-black text-lg text-white">{job.role}</h3>
                          <p className="gradient-text font-semibold text-sm mt-0.5">{job.company}</p>
                        </div>
                        <div className="text-right text-sm flex-shrink-0">
                          <span className="text-gray-400 bg-white/5 px-3 py-1 rounded-full text-xs">{job.duration}</span>
                          <p className="text-gray-600 text-xs mt-1">{job.location}</p>
                        </div>
                      </div>
                      <ul className="space-y-2.5">
                        {job.description.map((d, j) => (
                          <li key={j} className="text-gray-400 text-sm flex gap-2.5 leading-relaxed">
                            <span className="text-violet-400 mt-0.5 flex-shrink-0">▹</span>
                            {d}
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  </div>
                </FMReveal>
              ))}
            </div>
          </div>

          {/* Education */}
          <FMReveal delay={0.15} className="mt-16">
            <div>
              <h3 className="font-heading text-2xl font-black mb-8 text-center">
                <span className="gradient-text">Education</span>
              </h3>
              <div className="space-y-4">
                {education.map((edu, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ y: -4 }}
                    className="card-glow rounded-2xl p-6 flex flex-wrap items-center justify-between gap-4"
                  >
                    <div>
                      <h4 className="font-heading font-bold text-white">{edu.degree}</h4>
                      <p className="text-violet-400 text-sm font-medium mt-0.5">{edu.institution}</p>
                      <p className="text-gray-500 text-xs mt-1">{edu.grade}</p>
                    </div>
                    <span className="bg-violet-500/10 border border-violet-500/20 text-violet-300 text-xs px-4 py-1.5 rounded-full flex-shrink-0">
                      {edu.duration}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </FMReveal>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          CONTACT
      ══════════════════════════════════════════ */}
      <section id="contact" className="py-28 px-6 relative z-10">
        <div className="max-w-2xl mx-auto text-center">
          <FMReveal>
            <h2 className="font-heading text-4xl md:text-5xl font-black mb-4 section-title">
              Let&apos;s Build <span className="gradient-text">Something Great</span>
            </h2>
            <p className="text-gray-400 mt-10 mb-10 leading-relaxed text-lg">
              I&apos;m actively looking for graduate roles — remote, hybrid, or on-site in the UK. Open to full-stack or ML engineering opportunities. If you&apos;re building something exciting, let&apos;s talk.
            </p>
          </FMReveal>

          <FMReveal delay={0.1}>
            <motion.a
              href={`mailto:${email}`}
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.97 }}
              className="btn-gradient inline-flex items-center gap-3 px-10 py-4 rounded-2xl font-bold text-lg mb-10"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span>Say Hello 👋</span>
            </motion.a>

            <div className="flex flex-wrap gap-4 justify-center">
              {[
                { label: "Email", href: `mailto:${email}`, icon: "✉" },
                { label: "GitHub", href: links.github, icon: "" },
                { label: "LinkedIn", href: links.linkedin, icon: "" },
              ].filter(l => l.href).map((l, i) => (
                <motion.a
                  key={l.label}
                  href={l.href}
                  target={l.href?.startsWith("mailto") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ scale: 1.06, y: -3 }}
                  className="px-6 py-3 rounded-xl bg-white/5 border border-white/10 hover:border-violet-500/40 hover:bg-violet-500/10 hover:text-violet-300 text-gray-400 text-sm transition-colors duration-200 flex items-center gap-2"
                >
                  {l.icon && <span>{l.icon}</span>}
                  {l.label}
                </motion.a>
              ))}
            </div>
          </FMReveal>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="py-8 border-t border-white/5 text-center text-gray-600 text-sm relative z-10">
        <div className="flex flex-col items-center gap-2">
          <p>
            Designed & Built by{" "}
            <span className="gradient-text font-semibold">{name}</span>{" "}
            · 2026
          </p>
          <div className="flex gap-5 text-xs text-gray-700 mt-1">
            {["About", "Projects", "Skills", "Experience", "Contact"].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="hover:text-gray-400 transition-colors">
                {item}
              </a>
            ))}
          </div>
        </div>
      </footer>

      {/* ── AI CHATBOT ── */}
      <Chatbot />
    </main>
  );
}
