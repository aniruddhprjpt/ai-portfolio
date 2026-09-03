"use client";
import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

/* Proficiency levels — honest self-assessment */
const PROFICIENCY: Record<string, number> = {
  // Languages
  Python: 90, TypeScript: 86, JavaScript: 86, SQL: 82, Java: 70, C: 62,
  // Web
  "Next.js": 92, React: 92, "React 19": 88, "Tailwind CSS": 92,
  Django: 85, "REST API": 85, HTML: 92, CSS: 88,
  // Databases
  Supabase: 90, PostgreSQL: 85, MySQL: 78, SQLite: 72,
  // AI/ML
  "Claude API": 92, "Groq API": 85, LLaMA: 80,
  "scikit-learn": 75, TensorFlow: 62, PyTorch: 58,
  // Auth
  "Supabase Auth": 88, "Google OAuth": 85, "GitHub OAuth": 85,
  JWT: 82, "Row-Level Security": 82,
  // DevOps
  Git: 92, Vercel: 92, Docker: 80, GitHub: 92, "Google Colab": 78,
  // Design
  Figma: 72,
};

function getPct(skill: string): number {
  return PROFICIENCY[skill] ?? 70;
}

function getLabel(pct: number): string {
  if (pct >= 90) return "Expert";
  if (pct >= 80) return "Advanced";
  if (pct >= 70) return "Proficient";
  if (pct >= 60) return "Familiar";
  return "Learning";
}

function SkillBar({ skill, delay }: { skill: string; delay: number }) {
  const pct = getPct(skill);
  const [hovered, setHovered] = useState(false);
  const barRef = useRef<HTMLDivElement>(null);
  const inView = useInView(barRef, { once: true, margin: "-40px" });

  return (
    <div
      ref={barRef}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ marginBottom: "0.9rem" }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "0.3rem" }}>
        <span
          className="font-mono"
          style={{
            fontSize: "0.78rem",
            color: hovered ? "var(--color-ink)" : "var(--color-muted)",
            transition: "color 0.18s ease",
          }}
        >
          {skill}
        </span>
        <motion.span
          className="font-mono"
          initial={{ opacity: 0 }}
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.15 }}
          style={{ fontSize: "0.72rem", color: "var(--color-primary)" }}
        >
          {pct}% · {getLabel(pct)}
        </motion.span>
      </div>
      {/* Track */}
      <div
        style={{
          height: 4,
          background: "oklch(0.22 0.010 52)",
          borderRadius: 4,
          overflow: "hidden",
          position: "relative",
        }}
      >
        {/* Fill */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: inView ? `${pct}%` : 0 }}
          transition={{ duration: 1.0, delay: delay + 0.08, ease: [0.16, 1, 0.3, 1] }}
          style={{
            height: "100%",
            background: hovered
              ? "linear-gradient(90deg, oklch(0.65 0.16 52), oklch(0.82 0.17 52))"
              : "linear-gradient(90deg, oklch(0.60 0.14 52), oklch(0.72 0.17 52))",
            borderRadius: 4,
            transition: "background 0.2s ease",
          }}
        />
        {/* Shimmer sweep on hover */}
        {hovered && (
          <motion.div
            key="shimmer"
            initial={{ x: "-120%" }}
            animate={{ x: "220%" }}
            transition={{ duration: 0.55, ease: "linear" }}
            style={{
              position: "absolute",
              top: 0, left: 0, bottom: 0,
              width: "50%",
              background:
                "linear-gradient(90deg, transparent, rgba(255,255,255,0.45), transparent)",
              borderRadius: 4,
            }}
          />
        )}
      </div>
    </div>
  );
}

interface SkillBarsProps {
  skills: string[];
}

export default function SkillBars({ skills }: SkillBarsProps) {
  return (
    <div>
      {skills.map((skill, i) => (
        <SkillBar key={skill} skill={skill} delay={i * 0.055} />
      ))}
    </div>
  );
}
