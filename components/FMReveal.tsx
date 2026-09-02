"use client";
import { motion, useInView } from "framer-motion";
import { useRef, ReactNode } from "react";

interface FMRevealProps {
  children: ReactNode;
  delay?: number;
  direction?: "up" | "left" | "right" | "none";
  className?: string;
}

export default function FMReveal({
  children,
  delay = 0,
  direction = "up",
  className = "",
}: FMRevealProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const initials = {
    up:    { opacity: 0, y: 48 },
    left:  { opacity: 0, x: -48 },
    right: { opacity: 0, x: 48 },
    none:  { opacity: 0 },
  };

  return (
    <motion.div
      ref={ref}
      initial={initials[direction]}
      animate={inView ? { opacity: 1, y: 0, x: 0 } : {}}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
