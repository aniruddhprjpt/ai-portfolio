"use client";
import { useRef, useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

export default function FloatingOrb() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [imgLoaded, setImgLoaded] = useState(false);

  const rotateX = useSpring(useTransform(mouseY, [-400, 400], [18, -18]), {
    stiffness: 50, damping: 16,
  });
  const rotateY = useSpring(useTransform(mouseX, [-400, 400], [-18, 18]), {
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
        height: 220,
        marginBottom: "1.5rem",
      }}
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
          width: 190,
          height: 190,
          borderRadius: "50%",
          position: "relative",
        }}
        animate={{ y: [0, -14, 0] }}
        transition={{ repeat: Infinity, duration: 5.5, ease: "easeInOut" }}
      >
        {/* Outer pulsing glow ring 1 */}
        <motion.div
          animate={{ scale: [1, 1.07, 1], opacity: [0.5, 0.75, 0.5] }}
          transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
          style={{
            position: "absolute",
            inset: -14,
            borderRadius: "50%",
            border: "1.5px solid oklch(0.72 0.17 52 / 0.55)",
            pointerEvents: "none",
          }}
        />
        {/* Outer pulsing glow ring 2 */}
        <motion.div
          animate={{ scale: [1, 1.14, 1], opacity: [0.25, 0.45, 0.25] }}
          transition={{ repeat: Infinity, duration: 3, ease: "easeInOut", delay: 0.6 }}
          style={{
            position: "absolute",
            inset: -28,
            borderRadius: "50%",
            border: "1px solid oklch(0.72 0.17 52 / 0.28)",
            pointerEvents: "none",
          }}
        />
        {/* Outer pulsing glow ring 3 — faintest */}
        <motion.div
          animate={{ scale: [1, 1.22, 1], opacity: [0.1, 0.22, 0.1] }}
          transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut", delay: 1 }}
          style={{
            position: "absolute",
            inset: -46,
            borderRadius: "50%",
            border: "1px solid oklch(0.72 0.17 52 / 0.15)",
            pointerEvents: "none",
          }}
        />

        {/* Amber glow base behind avatar */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "50%",
            background:
              "radial-gradient(circle at 50% 50%, oklch(0.72 0.17 52 / 0.35) 0%, oklch(0.20 0.05 40 / 0.8) 100%)",
            boxShadow:
              "0 0 50px oklch(0.72 0.17 52 / 0.65), 0 0 100px oklch(0.72 0.17 52 / 0.3), inset 0 0 30px rgba(0,0,0,0.5)",
          }}
        />

        {/* Avatar image — circular clipped */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/avatar.png"
          alt="Aniruddh Prajapati"
          onLoad={() => setImgLoaded(true)}
          onError={() => setImgLoaded(false)}
          style={{
            position: "absolute",
            inset: 6,
            width: "calc(100% - 12px)",
            height: "calc(100% - 12px)",
            borderRadius: "50%",
            objectFit: "cover",
            objectPosition: "top center",
            opacity: imgLoaded ? 1 : 0,
            transition: "opacity 0.4s ease",
          }}
        />

        {/* Fallback monogram when no image */}
        {!imgLoaded && (
          <div
            style={{
              position: "absolute",
              inset: 6,
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "oklch(0.14 0.018 52)",
              fontSize: "3rem",
              fontWeight: 800,
              fontFamily: "var(--font-display)",
              color: "oklch(0.72 0.17 52)",
              letterSpacing: "-0.04em",
            }}
          >
            AP
          </div>
        )}

        {/* Amber border ring over image */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "50%",
            border: "2.5px solid oklch(0.72 0.17 52 / 0.7)",
            boxShadow: "inset 0 -12px 24px rgba(0,0,0,0.35)",
            pointerEvents: "none",
          }}
        />

        {/* Gloss highlight over the top */}
        <div
          style={{
            position: "absolute",
            top: "8%",
            left: "16%",
            width: "40%",
            height: "26%",
            borderRadius: "50%",
            background:
              "radial-gradient(ellipse, rgba(255,255,255,0.28) 0%, rgba(255,255,255,0) 100%)",
            transform: "rotate(-20deg)",
            pointerEvents: "none",
          }}
        />
      </motion.div>
    </div>
  );
}
