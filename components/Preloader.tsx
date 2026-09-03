"use client";
import { useEffect, useRef } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";

interface PreloaderProps {
  onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  /* ─── Scan beam progress 0 → 1 ───────────────────────────── */
  const progress = useMotionValue(0);
  const clipPath  = useTransform(progress, (v) => `inset(0 ${((1 - v) * 100).toFixed(2)}% 0 0)`);
  const beamLeft  = useTransform(progress, (v) => `${(v * 100).toFixed(2)}%`);

  /* ─── Tudum zoom + flash refs ─────────────────────────────── */
  const screenRef  = useRef<HTMLDivElement>(null);
  const lettersRef = useRef<HTMLDivElement>(null);
  const flashRef   = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    /* 1 ── Scan beam left → right */
    const scanCtrl = animate(progress, 1, {
      delay:    0.25,
      duration: 1.1,
      ease:     [0.25, 0.46, 0.45, 0.94],
    });

    /* 2 ── Tagline fades in after scan */
    const t1 = setTimeout(() => {
      if (!taglineRef.current) return;
      taglineRef.current.style.opacity   = "1";
      taglineRef.current.style.transform = "translateY(0)";
    }, 1550);

    /* 3 ── TUDUM ZOOM: letters scale out toward viewer */
    const t2 = setTimeout(() => {
      const el = lettersRef.current;
      if (!el) return;
      el.style.transition = "transform 0.62s cubic-bezier(0.55, 0, 1, 0.45), filter 0.62s ease, opacity 0.62s ease";
      el.style.transform  = "scale(14)";
      el.style.filter     = "blur(12px) brightness(3)";
      el.style.opacity    = "0";
    }, 2200);

    /* 4 ── Flash overlay fires with zoom */
    const t3 = setTimeout(() => {
      const fl = flashRef.current;
      if (!fl) return;
      fl.style.transition = "opacity 0.18s ease";
      fl.style.opacity    = "1";
      // Then snap cut to black and reveal portfolio
      setTimeout(() => {
        if (fl) fl.style.opacity = "0";
        if (screenRef.current) screenRef.current.style.opacity = "0";
      }, 180);
    }, 2350);

    /* 5 ── Done */
    const t4 = setTimeout(() => onComplete(), 2750);

    /* Safety net — never freeze the page beyond 4s */
    const tSafe = setTimeout(() => onComplete(), 4000);

    return () => {
      scanCtrl.stop();
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(tSafe);
    };
  }, [onComplete, progress]);

  const LETTER: React.CSSProperties = {
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
        position:   "fixed",
        inset:      0,
        zIndex:     99999,
        background: "#000",
        display:    "flex",
        flexDirection:   "column",
        alignItems:      "center",
        justifyContent:  "center",
        overflow:   "hidden",
        transition: "opacity 0.25s ease",
      }}
    >
      {/* ── Letter group (zoom target) ── */}
      <div ref={lettersRef} style={{ position: "relative", willChange: "transform" }}>

        {/* Dim underlay */}
        <div aria-hidden style={{ display: "flex", gap: "0.02em" }}>
          <span style={{ ...LETTER, color: "rgba(217,119,6,0.10)" }}>A</span>
          <span style={{ ...LETTER, color: "rgba(217,119,6,0.10)" }}>P</span>
        </div>

        {/* Bright clip-reveal */}
        <motion.div
          aria-hidden
          style={{
            clipPath,
            position: "absolute",
            inset: 0,
            display: "flex",
            gap: "0.02em",
          }}
        >
          <span style={{ ...LETTER, color: "#d97706" }}>A</span>
          <span style={{ ...LETTER, color: "#e8a020" }}>P</span>
        </motion.div>

        {/* Blurred glow layer (same clip) */}
        <motion.div
          aria-hidden
          style={{
            clipPath,
            position: "absolute",
            inset: 0,
            display: "flex",
            gap: "0.02em",
            filter: "blur(22px)",
            opacity: 0.5,
          }}
        >
          <span style={{ ...LETTER, color: "#fbbf24" }}>A</span>
          <span style={{ ...LETTER, color: "#fbbf24" }}>P</span>
        </motion.div>
      </div>

      {/* ── Scan beam ── */}
      <motion.div
        aria-hidden
        style={{
          position: "absolute",
          top:      "-10%",
          bottom:   "-10%",
          left:     beamLeft,
          width:    "4px",
          transform: "translateX(-50%)",
          background: "rgba(255,220,140,0.95)",
          boxShadow: [
            "0 0  6px  2px rgba(217,119,6,0.9)",
            "0 0 22px  8px rgba(217,119,6,0.6)",
            "0 0 60px 22px rgba(217,119,6,0.3)",
          ].join(", "),
        }}
      />

      {/* ── Tagline ── */}
      <p
        ref={taglineRef}
        style={{
          position:   "absolute",
          bottom:     "clamp(2rem, 6vh, 4rem)",
          fontFamily: "var(--font-mono)",
          fontSize:   "0.72rem",
          letterSpacing: "0.22em",
          textTransform: "uppercase",
          color:      "rgba(217,119,6,0.55)",
          opacity:    0,
          transform:  "translateY(10px)",
          transition: "opacity 0.5s ease, transform 0.5s ease",
        }}
      >
        Aniruddh Prajapati &nbsp;·&nbsp; Portfolio
      </p>

      {/* ── Flash overlay (fires during tudum zoom) ── */}
      <div
        ref={flashRef}
        aria-hidden
        style={{
          position:   "absolute",
          inset:      0,
          background: "radial-gradient(ellipse at center, rgba(251,191,36,0.55) 0%, #000 70%)",
          opacity:    0,
          pointerEvents: "none",
        }}
      />
    </div>
  );
}
