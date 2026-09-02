"use client";
import { useScroll, motion } from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: "2px",
        background: "var(--color-primary)",
        scaleX: scrollYProgress,
        transformOrigin: "left",
        zIndex: 9998,
      }}
    />
  );
}
