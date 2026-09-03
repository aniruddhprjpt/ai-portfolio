"use client";
import { useRef, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

export default function FloatingOrb() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-400, 400], [22, -22]), {
    stiffness: 50, damping: 16,
  });
  const rotateY = useSpring(useTransform(mouseX, [-400, 400], [-22, 22]), {
    stiffness: 50, damping: 16,
  });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const el = containerRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      mouseX.set(e.clientX - (r.left + r.width / 2));
      mouseY.set(e.clientY - (r.top + r.height / 2));
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [mouseX, mouseY]);

  return (
    <div
      ref={containerRef}
      style={{
        perspective: 900,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: 200,
        marginBottom: "1.5rem",
      }}
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
          width: 180,
          height: 180,
          borderRadius: "50%",
          position: "relative",
        }}
        animate={{ y: [0, -16, 0] }}
        transition={{ repeat: Infinity, duration: 5.5, ease: "easeInOut" }}
      >
        {/* Base sphere — amber radial gradient */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "50%",
            background:
              "radial-gradient(circle at 36% 28%, oklch(0.92 0.14 52) 0%, oklch(0.78 0.18 52) 30%, oklch(0.58 0.16 45) 62%, oklch(0.22 0.05 40) 100%)",
            boxShadow:
              "0 0 60px oklch(0.72 0.17 52 / 0.7), 0 0 120px oklch(0.72 0.17 52 / 0.3), inset 0 -18px 36px rgba(0,0,0,0.45)",
          }}
        />
        {/* Primary specular highlight */}
        <div
          style={{
            position: "absolute",
            top: "12%",
            left: "16%",
            width: "42%",
            height: "28%",
            borderRadius: "50%",
            background:
              "radial-gradient(ellipse, rgba(255,255,255,0.72) 0%, rgba(255,255,255,0) 100%)",
            transform: "rotate(-28deg)",
          }}
        />
        {/* Secondary warm glow */}
        <div
          style={{
            position: "absolute",
            bottom: "16%",
            right: "14%",
            width: "22%",
            height: "15%",
            borderRadius: "50%",
            background: "rgba(251,191,36,0.35)",
            filter: "blur(8px)",
          }}
        />
        {/* Subtle inner rim */}
        <div
          style={{
            position: "absolute",
            inset: 7,
            borderRadius: "50%",
            border: "1px solid rgba(255,255,255,0.13)",
          }}
        />
        {/* Outer glow ring */}
        <motion.div
          animate={{ scale: [1, 1.06, 1], opacity: [0.4, 0.65, 0.4] }}
          transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
          style={{
            position: "absolute",
            inset: -16,
            borderRadius: "50%",
            border: "1px solid oklch(0.72 0.17 52 / 0.35)",
            pointerEvents: "none",
          }}
        />
        <motion.div
          animate={{ scale: [1, 1.12, 1], opacity: [0.2, 0.38, 0.2] }}
          transition={{ repeat: Infinity, duration: 3, ease: "easeInOut", delay: 0.5 }}
          style={{
            position: "absolute",
            inset: -32,
            borderRadius: "50%",
            border: "1px solid oklch(0.72 0.17 52 / 0.18)",
            pointerEvents: "none",
          }}
        />
      </motion.div>
    </div>
  );
}
