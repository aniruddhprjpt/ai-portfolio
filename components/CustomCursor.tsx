"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const mx = useMotionValue(-200);
  const my = useMotionValue(-200);

  const springCfg = { stiffness: 380, damping: 30, mass: 0.5 };
  const x = useSpring(mx, springCfg);
  const y = useSpring(my, springCfg);

  const [hovered, setHovered] = useState(false);
  const [clicking, setClicking] = useState(false);
  const raf = useRef<number | null>(null);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (raf.current) cancelAnimationFrame(raf.current);
      raf.current = requestAnimationFrame(() => {
        mx.set(e.clientX);
        my.set(e.clientY);
      });
      const el = e.target as HTMLElement;
      setHovered(!!el.closest("a, button, [role=button]"));
    };
    const onDown = () => setClicking(true);
    const onUp   = () => setClicking(false);

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup",   onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup",   onUp);
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, [mx, my]);

  return (
    <motion.div
      style={{
        x, y,
        translateX: "-50%",
        translateY: "-50%",
        position: "fixed",
        top: 0, left: 0,
        zIndex: 9999,
        pointerEvents: "none",
        mixBlendMode: "normal",
      }}
    >
      {/* Center dot */}
      <motion.div
        animate={{
          width:  clicking ? 3 : hovered ? 6 : 5,
          height: clicking ? 3 : hovered ? 6 : 5,
          opacity: 1,
        }}
        transition={{ duration: 0.12 }}
        style={{
          borderRadius: "50%",
          background: "oklch(0.72 0.17 52)",
          position: "absolute",
          top: "50%", left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      />

      {/* Rotating text ring */}
      <motion.div
        animate={{
          scale: clicking ? 0.7 : hovered ? 1.3 : 1,
          opacity: hovered ? 0.7 : 1,
        }}
        transition={{ duration: 0.2 }}
        style={{
          position: "absolute",
          top: "50%", left: "50%",
          transform: "translate(-50%, -50%)",
          width: 72, height: 72,
          animation: "cursor-ring-spin 7s linear infinite",
        }}
      >
        <svg
          width="72"
          height="72"
          viewBox="0 0 72 72"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <path
              id="cursorCircle"
              d="M 36, 36 m -28, 0 a 28,28 0 1,1 56,0 a 28,28 0 1,1 -56,0"
            />
          </defs>
          <text
            fill="oklch(0.72 0.17 52)"
            fontSize="7.5"
            fontFamily="var(--font-geist-mono), monospace"
            letterSpacing="2.5"
          >
            <textPath href="#cursorCircle">
              ANIRUDDH · DEV · 2026 ·{" "}
            </textPath>
          </text>
        </svg>
      </motion.div>
    </motion.div>
  );
}
