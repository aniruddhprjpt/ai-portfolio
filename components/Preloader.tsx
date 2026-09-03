"use client";
import { useEffect, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform, animate } from "framer-motion";

interface PreloaderProps {
  onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  /* ─── scan beam: 0 = far left, 1 = far right ─── */
  const progress = useMotionValue(0);

  /* Clip-path on the bright letters: reveals left → right */
  const clipPath = useTransform(
    progress,
    (v) => `inset(0 ${((1 - v) * 100).toFixed(2)}% 0 0)`
  );

  /* Horizontal position of the glow beam (0–100% of the screen) */
  const beamLeft = useTransform(progress, (v) => `${(v * 100).toFixed(2)}%`);

  /* Tagline / exit driven by a separate phase via refs */
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const screenRef  = useRef<HTMLDivElement>(null);

  useEffect(() => {
    /* 1. Start the scan at t=300ms */
    const ctrl = animate(progress, 1, {
      delay: 0.3,
      duration: 1.15,
      ease: [0.25, 0.46, 0.45, 0.94],
    });

    /* 2. Fade in tagline after scan finishes */
    const t1 = setTimeout(() => {
      if (taglineRef.current) {
        taglineRef.current.style.opacity = "1";
        taglineRef.current.style.transform = "translateY(0)";
      }
    }, 1700);

    /* 3. Slide screen UP (curtain wipe) */
    const t2 = setTimeout(() => {
      if (screenRef.current) {
        screenRef.current.style.transition = "transform 0.72s cubic-bezier(0.76, 0, 0.24, 1)";
        screenRef.current.style.transform = "translateY(-100%)";
      }
    }, 2600);

    /* 4. Notify parent */
    const t3 = setTimeout(() => onComplete(), 3350);

    return () => {
      ctrl.stop();
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [onComplete, progress]);

  const LETTER_STYLE: React.CSSProperties = {
    fontFamily:    "var(--font-display)",
    fontSize:      "clamp(7rem, 22vw, 13rem)",
    fontWeight:    900,
    letterSpacing: "-0.05em",
    lineHeight:    1,
    display:       "block",
    userSelect:    "none",
  };

  return (
    <div
      ref={screenRef}
      style={{
        position:  "fixed",
        inset:     0,
        zIndex:    99999,
        background: "#000",
        display:   "flex",
        flexDirection: "column",
        alignItems:    "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      {/* ── Letter stack ── */}
      <div style={{ position: "relative" }}>

        {/* DIM underlay — always visible, sets base shape */}
        <div aria-hidden style={{ display: "flex", gap: "0.02em" }}>
          <span style={{ ...LETTER_STYLE, color: "rgba(217,119,6,0.10)" }}>A</span>
          <span style={{ ...LETTER_STYLE, color: "rgba(217,119,6,0.10)" }}>P</span>
        </div>

        {/* BRIGHT overlay — revealed left→right by clip-path */}
        <motion.div
          aria-hidden
          style={{
            clipPath,
            position: "absolute",
            inset:    0,
            display:  "flex",
            gap:      "0.02em",
          }}
        >
          <span style={{ ...LETTER_STYLE, color: "#d97706" }}>A</span>
          <span style={{ ...LETTER_STYLE, color: "#e8a020" }}>P</span>
        </motion.div>

        {/* GLOW overlay — same clip, softer luminous fill */}
        <motion.div
          aria-hidden
          style={{
            clipPath,
            position: "absolute",
            inset:    0,
            display:  "flex",
            gap:      "0.02em",
            filter:   "blur(18px)",
            opacity:  0.55,
          }}
        >
          <span style={{ ...LETTER_STYLE, color: "#fbbf24" }}>A</span>
          <span style={{ ...LETTER_STYLE, color: "#fbbf24" }}>P</span>
        </motion.div>
      </div>

      {/* ── Scan beam — full-height amber stripe ── */}
      <motion.div
        aria-hidden
        style={{
          position: "absolute",
          top:      "-10%",
          bottom:   "-10%",
          left:     beamLeft,
          width:    "4px",
          transform: "translateX(-50%)",
          background: "rgba(255, 220, 140, 0.95)",
          boxShadow: [
            "0 0  6px 2px  rgba(217,119,6,0.85)",
            "0 0 20px 8px  rgba(217,119,6,0.55)",
            "0 0 55px 20px rgba(217,119,6,0.28)",
          ].join(", "),
        }}
      />

      {/* ── Tagline ── */}
      <p
        ref={taglineRef}
        style={{
          position:  "absolute",
          bottom:    "clamp(2rem, 6vh, 4rem)",
          fontFamily: "var(--font-mono)",
          fontSize:  "0.72rem",
          letterSpacing: "0.22em",
          textTransform: "uppercase",
          color:     "rgba(217,119,6,0.55)",
          opacity:   0,
          transform: "translateY(10px)",
          transition: "opacity 0.55s ease, transform 0.55s ease",
        }}
      >
        Aniruddh Prajapati &nbsp;·&nbsp; Portfolio
      </p>
    </div>
  );
}
