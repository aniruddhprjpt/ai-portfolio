"use client";
import { motion, useInView, useMotionValue, useSpring, animate } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Chatbot from "@/components/Chatbot";
import Typewriter from "@/components/Typewriter";
import FMReveal from "@/components/FMReveal";
import Navbar from "@/components/Navbar";
import ScrollProgress from "@/components/ScrollProgress";
import ScrambleText from "@/components/ScrambleText";
import { portfolioData } from "@/data/portfolio";

// Load WebThreads (ogl WebGL) client-only — avoids SSR/bundle issues
const WebThreads = dynamic(() => import("@/components/WebThreads"), { ssr: false });

/* ─── SVG Icons ─────────────────────────────────────────── */
const GithubIcon = () => (
  <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
  </svg>
);
const LinkedInIcon = () => (
  <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);
const ExternalIcon = () => (
  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden>
    <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
  </svg>
);

/* ─── Animated counter ───────────────────────────────────── */
function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const motionVal = useMotionValue(0);
  const spring = useSpring(motionVal, { stiffness: 80, damping: 18 });

  useEffect(() => {
    if (inView) motionVal.set(to);
  }, [inView, motionVal, to]);

  useEffect(() => {
    return spring.on("change", (v) => {
      if (ref.current) ref.current.textContent = `${Math.round(v)}${suffix}`;
    });
  }, [spring, suffix]);

  return <span ref={ref} className="ticker">0{suffix}</span>;
}

/* ─── Stagger badge list ─────────────────────────────────── */
function BadgeList({ items }: { items: string[] }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref} className="flex flex-wrap gap-2">
      {items.map((item, i) => (
        <motion.span
          key={item}
          initial={{ opacity: 0, y: 8 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: i * 0.035, duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="badge"
        >
          {item}
        </motion.span>
      ))}
    </motion.div>
  );
}

/* ─── Timeline dot ───────────────────────────────────────── */
function Dot() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  return (
    <motion.div
      ref={ref}
      initial={{ scale: 0 }}
      animate={inView ? { scale: 1 } : {}}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      style={{
        width: 10, height: 10,
        borderRadius: "50%",
        background: "var(--color-primary)",
        flexShrink: 0,
        marginTop: 6,
      }}
    />
  );
}

/* ─── Main ───────────────────────────────────────────────── */
export default function Home() {
  const { name, bio, links, skills, experience, education, projects, email, languages } = portfolioData;
  const firstName = name.split(" ")[0];

  /* Mouse parallax for hero */
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const parallaxX = useSpring(rawX, { stiffness: 40, damping: 22, mass: 1 });
  const parallaxY = useSpring(rawY, { stiffness: 40, damping: 22, mass: 1 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      rawX.set((e.clientX / window.innerWidth  - 0.5) * 22);
      rawY.set((e.clientY / window.innerHeight - 0.5) * 12);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [rawX, rawY]);

  return (
    <main style={{ background: "var(--color-bg)", color: "var(--color-ink)", overflowX: "hidden" }}>
      <ScrollProgress />
      <Navbar firstName={firstName} email={email} />

      {/* ══════════════════════════════════════════
          HERO — left-aligned asymmetric
      ══════════════════════════════════════════ */}
      <section className="relative min-h-screen" style={{ paddingTop: "6rem" }}>
        {/* WebGL silk threads — amber ↔ cyan, mouse-reactive */}
        <div style={{ position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none" }}>
          <WebThreads
            color1="#d97706"
            color2="#22d3ee"
            color3="#f97316"
            speed={0.18}
            threadCount={7}
            frequency={4.5}
            spread={0.22}
            taper={0.9}
            position={0.5}
            fanMode="center"
            glow={0.025}
            falloff={0.65}
            thickness={1.0}
            brightness={0.55}
            opacity={0.9}
            mirror={true}
            shimmer={false}
            grain={true}
            grainIntensity={0.04}
            mouseInteraction={true}
            mouseStrength={0.28}
          />
        </div>

        {/* Subtle cyan glow bottom-left (layered over WebGL) */}
        <div
          aria-hidden
          style={{
            position: "absolute", bottom: 0, left: -80,
            width: 400, height: 400,
            borderRadius: "50%",
            background: "oklch(0.70 0.15 192 / 0.05)",
            filter: "blur(80px)",
            pointerEvents: "none",
            zIndex: 1,
          }}
        />
        {/* Scan line — amber shimmer sweeps once on load */}
        <motion.div
          aria-hidden
          initial={{ y: "-100%", opacity: 0.6 }}
          animate={{ y: "120vh", opacity: 0 }}
          transition={{ duration: 1.4, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: "absolute", left: 0, right: 0,
            height: 1,
            background: "linear-gradient(90deg, transparent, oklch(0.72 0.17 52 / 0.6), transparent)",
            pointerEvents: "none",
            zIndex: 3,
          }}
        />

        <div className="max-w-7xl mx-auto px-6 py-20 flex flex-col justify-center min-h-screen" style={{ position: "relative", zIndex: 2 }}>
          <div className="grid md:grid-cols-[1fr_320px] gap-12 items-center">

            {/* LEFT: main content — with mouse parallax */}
            <motion.div style={{ x: parallaxX, y: parallaxY }}>
              {/* Mono label */}
              <motion.p
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="font-mono section-label mb-6"
              >
                Portfolio · 2026
              </motion.p>

              {/* Display name */}
              <div className="overflow-hidden mb-2">
                <motion.h1
                  initial={{ y: "105%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.65, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  className="font-display font-extrabold leading-none"
                  style={{
                    fontSize: "clamp(3.5rem, 10vw, 8rem)",
                    letterSpacing: "-0.02em",
                    textWrap: "balance",
                    color: "#ffffff",
                    textShadow: "0 0 40px rgba(0,0,0,0.9), 0 2px 8px rgba(0,0,0,0.95), 0 0 80px rgba(0,0,0,0.7)",
                  }}
                >
                  {firstName}
                </motion.h1>
              </div>
              <div className="overflow-hidden mb-6">
                <motion.h1
                  initial={{ y: "105%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.65, delay: 0.32, ease: [0.16, 1, 0.3, 1] }}
                  className="font-display font-extrabold leading-none"
                  style={{
                    fontSize: "clamp(3.5rem, 10vw, 8rem)",
                    letterSpacing: "-0.02em",
                    color: "var(--color-primary)",
                    textShadow: "0 0 40px rgba(0,0,0,0.9), 0 2px 8px rgba(0,0,0,0.95), 0 0 80px rgba(0,0,0,0.7)",
                  }}
                >
                  <ScrambleText text="Prajapati" delay={500} />
                </motion.h1>
              </div>

              {/* Horizontal rule */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.5, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                style={{ transformOrigin: "left" }}
                className="h-rule-primary mb-6"
              />

              {/* Typewriter role */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="font-body mb-5"
                style={{
                  fontSize: "clamp(1rem, 2.5vw, 1.25rem)",
                  color: "var(--color-ink)",
                  textShadow: "0 0 24px rgba(0,0,0,0.95), 0 2px 6px rgba(0,0,0,1)",
                }}
              >
                <span className="tw-cursor">
                  <Typewriter words={[
                    "Full Stack Developer",
                    "ML Engineer",
                    "AI Builder",
                    "Django & React Dev",
                  ]} />
                </span>
              </motion.div>

              {/* Bio */}
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.5 }}
                style={{
                  color: "oklch(0.82 0.010 80)",
                  maxWidth: "56ch",
                  lineHeight: 1.7,
                  marginBottom: "2.5rem",
                  textShadow: "0 0 24px rgba(0,0,0,0.95), 0 2px 6px rgba(0,0,0,1)",
                }}
              >
                {bio.split(".")[0]}.
              </motion.p>

              {/* CTA row */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.4 }}
                className="flex flex-wrap gap-3 items-center"
              >
                <a href="#projects" className="btn-primary">
                  View Work →
                </a>
                <a href={links.portfolio} target="_blank" rel="noopener noreferrer" className="btn-ghost">
                  GitHub Pages ↗
                </a>
                <a href={links.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="icon-btn">
                  <GithubIcon />
                </a>
                <a href={links.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="icon-btn">
                  <LinkedInIcon />
                </a>
              </motion.div>
            </motion.div>{/* end parallax wrapper */}

            {/* RIGHT: info card */}
            <motion.div
              initial={{ opacity: 0, x: 32 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.55, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="hidden md:block"
            >
              <div
                className="card p-6"
                style={{ borderColor: "oklch(0.22 0.010 52)" }}
              >
                {/* Availability */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="pulse-dot" />
                  <span className="font-mono" style={{ fontSize: "0.8rem", color: "var(--color-ink)" }}>
                    Open to opportunities
                  </span>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  {[
                    { label: "Projects", val: projects.length, suffix: "+" },
                    { label: "Technologies", val: Object.values(skills).flat().length, suffix: "+" },
                    { label: "Graduated", val: 2026, suffix: "" },
                    { label: "Experience", val: experience.length, suffix: "yr+" },
                  ].map(({ label, val, suffix }) => (
                    <div key={label}>
                      <p
                        className="font-display font-extrabold"
                        style={{ fontSize: "2rem", color: "var(--color-primary)", lineHeight: 1 }}
                      >
                        <Counter to={val} suffix={suffix} />
                      </p>
                      <p className="font-mono" style={{ fontSize: "0.72rem", color: "var(--color-muted)", marginTop: 4 }}>
                        {label}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="h-rule mb-5" />

                {/* Location */}
                <p className="font-mono mb-3" style={{ fontSize: "0.78rem", color: "var(--color-muted)" }}>
                  📍 UK — remote / hybrid / on-site
                </p>

                {/* Languages */}
                <p className="font-mono mb-2" style={{ fontSize: "0.72rem", color: "var(--color-muted)", letterSpacing: "0.05em", textTransform: "uppercase" }}>
                  Languages
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {(languages ?? []).map((l) => (
                    <span key={l} className="badge" style={{ fontSize: "0.72rem" }}>{l}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Scroll cue */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="flex items-center gap-3 mt-16"
            style={{ color: "var(--color-muted)", fontSize: "0.78rem" }}
          >
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
              style={{ fontSize: "1rem" }}
            >
              ↓
            </motion.div>
            <span className="font-mono">scroll</span>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          ABOUT
      ══════════════════════════════════════════ */}
      <section id="about" style={{ padding: "7rem 0", position: "relative" }}>
        <div className="max-w-7xl mx-auto px-6">
          <FMReveal>
            <p className="section-label mb-3">About</p>
            <h2
              className="font-display font-extrabold"
              style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", letterSpacing: "-0.02em", marginBottom: "3rem", textWrap: "balance" }}
            >
              Building things that work,<br />
              <span style={{ color: "var(--color-primary)" }}>and things that matter.</span>
            </h2>
          </FMReveal>

          <div className="grid md:grid-cols-2 gap-16">
            <FMReveal delay={0.1} direction="left">
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                {bio.split(". ").filter(Boolean).map((s, i) => (
                  <p key={i} style={{ color: "var(--color-muted)", lineHeight: 1.75, maxWidth: "55ch" }}>
                    {s.endsWith(".") ? s : `${s}.`}
                  </p>
                ))}
              </div>
            </FMReveal>

            <FMReveal delay={0.2} direction="right">
              <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
                {/* Big numbers */}
                <div className="grid grid-cols-2 gap-6">
                  {[
                    { label: "Projects shipped", val: projects.length, suffix: "+" },
                    { label: "Technologies used", val: Object.values(skills).flat().length, suffix: "+" },
                    { label: "Years coding", val: 3, suffix: "+" },
                    { label: "CS Graduate", val: 2026, suffix: "" },
                  ].map(({ label, val, suffix }) => (
                    <div key={label}>
                      <p className="font-display font-extrabold" style={{ fontSize: "3rem", color: "var(--color-primary)", lineHeight: 1 }}>
                        <Counter to={val} suffix={suffix} />
                      </p>
                      <p style={{ color: "var(--color-muted)", fontSize: "0.85rem", marginTop: "0.25rem" }}>{label}</p>
                    </div>
                  ))}
                </div>

                <div className="h-rule" />

                <div>
                  <p className="section-label mb-3">Languages spoken</p>
                  <BadgeList items={languages ?? []} />
                </div>
              </div>
            </FMReveal>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          PROJECTS — numbered list format
      ══════════════════════════════════════════ */}
      <section id="projects" style={{ padding: "7rem 0", background: "var(--color-surface)", position: "relative" }}>
        <div
          aria-hidden
          style={{
            position: "absolute", inset: 0,
            backgroundImage: "linear-gradient(oklch(0.22 0.010 52 / 0.12) 1px, transparent 1px), linear-gradient(90deg, oklch(0.22 0.010 52 / 0.12) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
            pointerEvents: "none",
          }}
        />
        <div className="max-w-7xl mx-auto px-6 relative">
          <FMReveal>
            <p className="section-label mb-3">Projects</p>
            <h2
              className="font-display font-extrabold"
              style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", letterSpacing: "-0.02em", marginBottom: "4rem" }}
            >
              Things I&apos;ve <span style={{ color: "var(--color-primary)" }}>Built</span>
            </h2>
          </FMReveal>

          <div style={{ display: "flex", flexDirection: "column" }}>
            {projects.map((project, i) => (
              <FMReveal key={project.name} delay={i * 0.08}>
                <motion.div
                  initial="rest"
                  whileHover="hover"
                  animate="rest"
                  style={{
                    padding: "2rem 0",
                    borderBottom: "1px solid var(--color-border)",
                    display: "grid",
                    gridTemplateColumns: "3rem 1fr auto",
                    gap: "1.5rem",
                    alignItems: "start",
                    position: "relative",
                  }}
                >
                  {/* Amber left accent line — draws in on hover */}
                  <motion.div
                    variants={{ rest: { scaleY: 0, opacity: 0 }, hover: { scaleY: 1, opacity: 1 } }}
                    transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                    style={{
                      position: "absolute",
                      left: -24,
                      top: 0, bottom: 0,
                      width: 2,
                      background: "var(--color-primary)",
                      transformOrigin: "top",
                      borderRadius: 1,
                    }}
                  />
                  {/* Index — scales up on row hover via variant propagation */}
                  <motion.span
                    variants={{ rest: { scale: 1, color: "oklch(0.72 0.17 52)" }, hover: { scale: 1.15, color: "oklch(0.82 0.17 52)" } }}
                    transition={{ duration: 0.18 }}
                    className="font-display font-extrabold"
                    style={{ fontSize: "1.1rem", paddingTop: "0.2rem", display: "block" }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </motion.span>

                  {/* Content */}
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.5rem", flexWrap: "wrap" }}>
                      <h3 className="font-display font-bold" style={{ fontSize: "1.2rem", color: "var(--color-ink)" }}>
                        {project.name}
                      </h3>
                      {i === 1 && (
                        <span
                          className="font-mono"
                          style={{
                            fontSize: "0.7rem", letterSpacing: "0.08em",
                            padding: "2px 10px", borderRadius: 999,
                            background: "oklch(0.72 0.17 52 / 0.15)",
                            border: "1px solid oklch(0.72 0.17 52 / 0.3)",
                            color: "var(--color-primary)",
                            textTransform: "uppercase",
                          }}
                        >
                          Featured
                        </span>
                      )}
                    </div>
                    <p style={{ color: "var(--color-muted)", fontSize: "0.9rem", lineHeight: 1.65, marginBottom: "1rem", maxWidth: "68ch" }}>
                      {project.description}
                    </p>
                    {/* Highlights (only for featured) */}
                    {i === 1 && (
                      <ul style={{ marginBottom: "1rem", display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                        {project.highlights.slice(0, 3).map((h) => (
                          <li key={h} style={{ color: "var(--color-muted)", fontSize: "0.82rem", display: "flex", gap: "0.5rem", lineHeight: 1.5 }}>
                            <span style={{ color: "var(--color-primary)", flexShrink: 0 }}>▹</span>
                            {h}
                          </li>
                        ))}
                      </ul>
                    )}
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                      {project.tech.slice(0, 6).map((t) => (
                        <span key={t} className="badge" style={{ fontSize: "0.72rem" }}>{t}</span>
                      ))}
                    </div>
                  </div>

                  {/* Links */}
                  <div style={{ display: "flex", gap: "0.5rem", flexShrink: 0, paddingTop: "0.2rem" }}>
                    {project.live && (
                      <a href={project.live} target="_blank" rel="noopener noreferrer" className="icon-btn" aria-label={`${project.name} live demo`}>
                        <ExternalIcon />
                      </a>
                    )}
                    {project.github && (
                      <a href={project.github} target="_blank" rel="noopener noreferrer" className="icon-btn" aria-label={`${project.name} GitHub`}>
                        <GithubIcon />
                      </a>
                    )}
                  </div>
                </motion.div>
              </FMReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          SKILLS
      ══════════════════════════════════════════ */}
      <section id="skills" style={{ padding: "7rem 0" }}>
        <div className="max-w-7xl mx-auto px-6">
          <FMReveal>
            <p className="section-label mb-3">Stack</p>
            <h2
              className="font-display font-extrabold"
              style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", letterSpacing: "-0.02em", marginBottom: "4rem" }}
            >
              Tech I work <span style={{ color: "var(--color-primary)" }}>with</span>
            </h2>
          </FMReveal>

          <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>
            {Object.entries(skills).map(([category, items], i) => (
              <FMReveal key={category} delay={i * 0.06}>
                <div style={{ display: "grid", gridTemplateColumns: "180px 1fr", gap: "1.5rem", alignItems: "start" }} className="max-sm:grid-cols-1">
                  <p className="font-mono section-label" style={{ paddingTop: "0.25rem" }}>
                    {category.replace(/_/g, " ")}
                  </p>
                  <BadgeList items={items as string[]} />
                </div>
              </FMReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          EXPERIENCE — clean timeline
      ══════════════════════════════════════════ */}
      <section id="experience" style={{ padding: "7rem 0", background: "var(--color-surface)" }}>
        <div className="max-w-7xl mx-auto px-6">
          <FMReveal>
            <p className="section-label mb-3">Experience</p>
            <h2
              className="font-display font-extrabold"
              style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", letterSpacing: "-0.02em", marginBottom: "4rem" }}
            >
              Where I&apos;ve <span style={{ color: "var(--color-primary)" }}>Worked</span>
            </h2>
          </FMReveal>

          {/* Timeline */}
          <div style={{ position: "relative", paddingLeft: "2rem" }}>
            {/* Animated vertical line */}
            <motion.div
              className="timeline-line"
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 1 }}
            />

            <div style={{ display: "flex", flexDirection: "column", gap: "3rem" }}>
              {experience.map((job, i) => (
                <FMReveal key={i} delay={i * 0.12} direction="left">
                  <div style={{ display: "flex", gap: "1.5rem", alignItems: "flex-start" }}>
                    <Dot />
                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: "0.5rem", marginBottom: "0.75rem" }}>
                        <div>
                          <h3 className="font-display font-bold" style={{ fontSize: "1.15rem", color: "var(--color-ink)" }}>
                            {job.role}
                          </h3>
                          <p style={{ color: "var(--color-primary)", fontWeight: 600, fontSize: "0.9rem", marginTop: "0.15rem" }}>
                            {job.company}
                          </p>
                        </div>
                        <div style={{ textAlign: "right" }}>
                          <span className="badge" style={{ fontSize: "0.72rem" }}>{job.duration}</span>
                          <p className="font-mono" style={{ fontSize: "0.72rem", color: "var(--color-muted)", marginTop: "0.3rem" }}>
                            {job.location}
                          </p>
                        </div>
                      </div>
                      <ul style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                        {job.description.map((d, j) => (
                          <li key={j} style={{ color: "var(--color-muted)", fontSize: "0.88rem", lineHeight: 1.65, display: "flex", gap: "0.6rem" }}>
                            <span style={{ color: "var(--color-primary)", flexShrink: 0, marginTop: "0.1rem" }}>▹</span>
                            {d}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </FMReveal>
              ))}
            </div>
          </div>

          {/* Education */}
          <div style={{ marginTop: "5rem" }}>
            <FMReveal>
              <p className="section-label mb-6">Education</p>
            </FMReveal>
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {education.map((edu, i) => (
                <FMReveal key={i} delay={i * 0.1}>
                  <motion.div
                    whileHover={{ x: 4 }}
                    transition={{ duration: 0.18 }}
                    className="card"
                    style={{ padding: "1.5rem 2rem", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "1rem" }}
                  >
                    <div>
                      <h4 className="font-display font-bold" style={{ fontSize: "1rem", color: "var(--color-ink)" }}>{edu.degree}</h4>
                      <p style={{ color: "var(--color-primary)", fontSize: "0.85rem", marginTop: "0.2rem" }}>{edu.institution}</p>
                      <p style={{ color: "var(--color-muted)", fontSize: "0.78rem", marginTop: "0.2rem" }}>{edu.grade}</p>
                    </div>
                    <span className="badge">{edu.duration}</span>
                  </motion.div>
                </FMReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          CONTACT
      ══════════════════════════════════════════ */}
      <section id="contact" style={{ padding: "8rem 0", position: "relative", overflow: "hidden" }}>
        {/* Ambient amber glow */}
        <div
          aria-hidden
          style={{
            position: "absolute", top: "50%", left: "50%",
            transform: "translate(-50%,-50%)",
            width: 600, height: 300,
            borderRadius: "50%",
            background: "oklch(0.72 0.17 52 / 0.06)",
            filter: "blur(80px)",
            pointerEvents: "none",
          }}
        />
        <div className="max-w-7xl mx-auto px-6 relative">
          <FMReveal>
            <p className="section-label mb-4">Contact</p>
            <h2
              className="font-display font-extrabold"
              style={{
                fontSize: "clamp(2.5rem, 7vw, 5.5rem)",
                letterSpacing: "-0.03em",
                lineHeight: 1.05,
                textWrap: "balance",
                marginBottom: "1.5rem",
              }}
            >
              Let&apos;s build something<br />
              <span style={{ color: "var(--color-primary)" }}>great together.</span>
            </h2>
            <p style={{ color: "var(--color-muted)", maxWidth: "52ch", lineHeight: 1.7, marginBottom: "3rem" }}>
              Actively looking for graduate roles — full-stack or ML engineering. Open to remote, hybrid, or on-site in the UK. If you&apos;re building something interesting, reach out.
            </p>
          </FMReveal>

          <FMReveal delay={0.1}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", alignItems: "center" }}>
              <a href={`mailto:${email}`} className="btn-primary" style={{ fontSize: "1rem", padding: "0.9rem 2rem" }}>
                Say Hello →
              </a>
              <a href={links.github} target="_blank" rel="noopener noreferrer" className="btn-ghost">
                <GithubIcon /> GitHub
              </a>
              <a href={links.linkedin} target="_blank" rel="noopener noreferrer" className="btn-ghost">
                <LinkedInIcon /> LinkedIn
              </a>
            </div>
          </FMReveal>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ padding: "2rem 0", borderTop: "1px solid var(--color-border)" }}>
        <div className="max-w-7xl mx-auto px-6 flex flex-wrap items-center justify-between gap-4">
          <p className="font-mono" style={{ fontSize: "0.78rem", color: "var(--color-muted)" }}>
            {name} · 2026
          </p>
          <div style={{ display: "flex", gap: "1.5rem" }}>
            {["About", "Projects", "Skills", "Experience", "Contact"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="nav-link font-mono"
                style={{ fontSize: "0.75rem" }}
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </footer>

      <Chatbot />
    </main>
  );
}
