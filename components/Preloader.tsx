"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";

const NUM_STRIPS = 10;
type Phase = "scan" | "hold" | "zoom" | "tear";

interface PreloaderProps { onComplete: () => void; }

export default function Preloader({ onComplete }: PreloaderProps) {
  const [phase, setPhase] = useState<Phase>("scan");

  /* ── Scan beam ── */
  const progress = useMotionValue(0);
  const clipPath = useTransform(progress, (v) => `inset(0 ${((1 - v) * 100).toFixed(2)}% 0 0)`);
  const beamLeft = useTransform(progress, (v) => `${(v * 100).toFixed(2)}%`);

  const bgRef      = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    /* 1 – scan left → right */
    const scan = animate(progress, 1, {
      delay: 0.25, duration: 1.1, ease: [0.25, 0.46, 0.45, 0.94],
    });

    /* 2 – tagline in */
    const t1 = setTimeout(() => {
      if (taglineRef.current) {
        taglineRef.current.style.opacity   = "1";
        taglineRef.current.style.transform = "translateY(0)";
      }
    }, 1600);

    /* 3 – zoom phase */
    const t2 = setTimeout(() => setPhase("zoom"), 2200);

    /* 4 – tear starts: bg → transparent, strips cover then fly off */
    const t3 = setTimeout(() => {
      if (bgRef.current) bgRef.current.style.background = "transparent";
      setPhase("tear");
    }, 2600);

    /* 5 – done */
    const t4    = setTimeout(() => onComplete(), 3300);
    const tSafe = setTimeout(() => onComplete(), 4500); // freeze guard

    return () => {
      scan.stop();
      [t1, t2, t3, t4, tSafe].forEach(clearTimeout);
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
      ref={bgRef}
      style={{
        position:       "fixed",
        inset:          0,
        zIndex:         99999,
        background:     "#000",
        overflow:       "hidden",
        display:        "flex",
        alignItems:     "center",
        justifyContent: "center",
      }}
    >
      {/* ══ Letters (zoom target) ══ */}
      <motion.div
        style={{ position: "relative", willChange: "transform" }}
        animate={
          phase === "zoom" || phase === "tear"
            ? { scale: 14, filter: "blur(18px) brightness(5)" }
            : { scale: 1,  filter: "blur(0px)  brightness(1)" }
        }
        transition={{ duration: 0.55, ease: [0.55, 0, 1, 0.45] }}
      >
        {/* dim underlay */}
        <div aria-hidden style={{ display: "flex", gap: "0.02em" }}>
          <span style={{ ...LETTER, color: "rgba(217,119,6,0.10)" }}>A</span>
          <span style={{ ...LETTER, color: "rgba(217,119,6,0.10)" }}>P</span>
        </div>

        {/* bright clip reveal */}
        <motion.div aria-hidden style={{ clipPath, position:"absolute", inset:0, display:"flex", gap:"0.02em" }}>
          <span style={{ ...LETTER, color: "#d97706" }}>A</span>
          <span style={{ ...LETTER, color: "#e8a020" }}>P</span>
        </motion.div>

        {/* glow layer */}
        <motion.div aria-hidden style={{ clipPath, position:"absolute", inset:0, display:"flex", gap:"0.02em", filter:"blur(22px)", opacity:0.5 }}>
          <span style={{ ...LETTER, color: "#fbbf24" }}>A</span>
          <span style={{ ...LETTER, color: "#fbbf24" }}>P</span>
        </motion.div>
      </motion.div>

      {/* ══ Scan beam ══ */}
      {(phase === "scan" || phase === "hold") && (
        <motion.div
          aria-hidden
          style={{
            position:  "absolute",
            top:       "-10%", bottom: "-10%",
            left:      beamLeft,
            width:     "4px",
            transform: "translateX(-50%)",
            background: "rgba(255,220,140,0.95)",
            boxShadow: [
              "0 0  6px  2px rgba(217,119,6,0.9)",
              "0 0 22px  8px rgba(217,119,6,0.6)",
              "0 0 60px 22px rgba(217,119,6,0.3)",
            ].join(", "),
          }}
        />
      )}

      {/* ══ Tagline ══ */}
      <p
        ref={taglineRef}
        style={{
          position:      "absolute",
          bottom:        "clamp(2rem, 6vh, 4rem)",
          fontFamily:    "var(--font-mono)",
          fontSize:      "0.72rem",
          letterSpacing: "0.22em",
          textTransform: "uppercase",
          color:         "rgba(217,119,6,0.55)",
          opacity:       0,
          transform:     "translateY(10px)",
          transition:    "opacity 0.5s ease, transform 0.5s ease",
        }}
      >
        Aniruddh Prajapati &nbsp;·&nbsp; Portfolio
      </p>

      {/* ══ TEAR STRIPS — vertical slices that fly up/down alternately ══ */}
      {phase === "tear" &&
        Array.from({ length: NUM_STRIPS }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ y: 0 }}
            animate={{ y: i % 2 === 0 ? "-115%" : "115%" }}
            transition={{
              duration: 0.48,
              delay:    i * 0.028,
              ease:     [0.55, 0, 1, 0.45],
            }}
            style={{
              position: "absolute",
              top:      0,
              bottom:   0,
              left:     `${(i / NUM_STRIPS) * 100}%`,
              width:    `${100 / NUM_STRIPS + 0.3}%`, // +0.3 closes pixel-gap between strips
              background: i % 2 === 0
                ? "linear-gradient(to bottom, #7c2d00, #000)"
                : "linear-gradient(to top,    #7c2d00, #000)",
              zIndex: 20,
            }}
          />
        ))}
    </div>
  );
}
