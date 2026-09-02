"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

export default function CustomCursor() {
  const mx = useMotionValue(-100);
  const my = useMotionValue(-100);

  const springCfg = { stiffness: 480, damping: 34, mass: 0.6 };
  const x = useSpring(mx, springCfg);
  const y = useSpring(my, springCfg);

  const [hovered, setHovered] = useState(false);
  const [clicking, setClicking] = useState(false);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        mx.set(e.clientX);
        my.set(e.clientY);
      });
    };
    const onDown = () => setClicking(true);
    const onUp   = () => setClicking(false);

    const checkHover = (e: MouseEvent) => {
      const el = e.target as HTMLElement;
      setHovered(
        !!el.closest("a, button, [role=button], input, textarea, select, label")
      );
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mousemove", checkHover, { passive: true });
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousemove", checkHover);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [mx, my]);

  const size = clicking ? 12 : hovered ? 28 : 20;
  const lineLen = clicking ? 8 : hovered ? 18 : 14;

  return (
    <motion.div
      style={{ x, y, translateX: "-50%", translateY: "-50%" }}
      className="fixed top-0 left-0 z-[9999] pointer-events-none"
    >
      {/* Center circle */}
      <motion.div
        animate={{
          width: size,
          height: size,
          backgroundColor: hovered
            ? "oklch(0.72 0.17 52)"
            : "transparent",
          borderColor: "oklch(0.72 0.17 52)",
          borderWidth: clicking ? 2 : 1.5,
        }}
        transition={{ duration: 0.15, ease: "easeOut" }}
        style={{ borderRadius: "50%", border: "1.5px solid oklch(0.72 0.17 52)" }}
      />

      {/* Crosshair lines */}
      {/* Top */}
      <motion.div
        animate={{ height: lineLen, opacity: hovered ? 0.5 : 1 }}
        transition={{ duration: 0.15 }}
        style={{
          position: "absolute",
          left: "50%",
          bottom: "calc(50% + 3px)",
          width: "1px",
          background: "oklch(0.72 0.17 52)",
          translateX: "-50%",
          transformOrigin: "bottom",
        }}
      />
      {/* Bottom */}
      <motion.div
        animate={{ height: lineLen, opacity: hovered ? 0.5 : 1 }}
        transition={{ duration: 0.15 }}
        style={{
          position: "absolute",
          left: "50%",
          top: "calc(50% + 3px)",
          width: "1px",
          background: "oklch(0.72 0.17 52)",
          translateX: "-50%",
          transformOrigin: "top",
        }}
      />
      {/* Left */}
      <motion.div
        animate={{ width: lineLen, opacity: hovered ? 0.5 : 1 }}
        transition={{ duration: 0.15 }}
        style={{
          position: "absolute",
          top: "50%",
          right: "calc(50% + 3px)",
          height: "1px",
          background: "oklch(0.72 0.17 52)",
          translateY: "-50%",
          transformOrigin: "right",
        }}
      />
      {/* Right */}
      <motion.div
        animate={{ width: lineLen, opacity: hovered ? 0.5 : 1 }}
        transition={{ duration: 0.15 }}
        style={{
          position: "absolute",
          top: "50%",
          left: "calc(50% + 3px)",
          height: "1px",
          background: "oklch(0.72 0.17 52)",
          translateY: "-50%",
          transformOrigin: "left",
        }}
      />
    </motion.div>
  );
}
