"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface PreloaderProps {
  onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [phase, setPhase] = useState<"enter" | "hold" | "exit">("enter");

  useEffect(() => {
    // Letters finish entering → hold
    const t1 = setTimeout(() => setPhase("hold"), 1400);
    // Hold → exit wipe
    const t2 = setTimeout(() => setPhase("exit"), 2200);
    // Notify parent when curtain is gone
    const t3 = setTimeout(() => onComplete(), 3000);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {phase !== "exit" ? (
        /* ── Full-screen curtain ── */
        <motion.div
          key="curtain"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0 }}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 99999,
            background: "oklch(0.07 0.000 0)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "1.5rem",
          }}
        >
          {/* Logo letters */}
          <div style={{ display: "flex", gap: "0.05em", overflow: "hidden" }}>
            {/* A */}
            <div style={{ overflow: "hidden" }}>
              <motion.span
                initial={{ y: "110%" }}
                animate={{ y: phase === "hold" ? "0%" : "0%" }}
                transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  display: "block",
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(6rem, 18vw, 10rem)",
                  fontWeight: 900,
                  letterSpacing: "-0.05em",
                  lineHeight: 1,
                  color: "#ffffff",
                }}
              >
                A
              </motion.span>
            </div>
            {/* P */}
            <div style={{ overflow: "hidden" }}>
              <motion.span
                initial={{ y: "110%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 0.7, delay: 0.42, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  display: "block",
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(6rem, 18vw, 10rem)",
                  fontWeight: 900,
                  letterSpacing: "-0.05em",
                  lineHeight: 1,
                  color: "#d97706",
                }}
              >
                P
              </motion.span>
            </div>
          </div>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.0 }}
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.78rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "oklch(0.48 0.015 52)",
            }}
          >
            Aniruddh Prajapati · Portfolio
          </motion.p>

          {/* Amber progress line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.8, delay: 0.3, ease: "linear" }}
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: 2,
              background: "#d97706",
              transformOrigin: "left",
            }}
          />
        </motion.div>
      ) : (
        /* ── Curtain splits and slides up ── */
        <motion.div
          key="wipe"
          initial={{ y: 0 }}
          animate={{ y: "-100%" }}
          transition={{ duration: 0.75, ease: [0.76, 0, 0.24, 1] }}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 99999,
            background: "oklch(0.07 0.000 0)",
          }}
        />
      )}
    </AnimatePresence>
  );
}
