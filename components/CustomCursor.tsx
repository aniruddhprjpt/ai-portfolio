"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [ring, setRing] = useState({ x: -100, y: -100 });
  const [clicking, setClicking] = useState(false);

  useEffect(() => {
    const moveDot = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    const moveRing = (e: MouseEvent) => setRing({ x: e.clientX, y: e.clientY });
    const down = () => setClicking(true);
    const up = () => setClicking(false);
    window.addEventListener("mousemove", moveDot);
    window.addEventListener("mousemove", moveRing);
    window.addEventListener("mousedown", down);
    window.addEventListener("mouseup", up);
    return () => {
      window.removeEventListener("mousemove", moveDot);
      window.removeEventListener("mousemove", moveRing);
      window.removeEventListener("mousedown", down);
      window.removeEventListener("mouseup", up);
    };
  }, []);

  return (
    <>
      {/* dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-violet-400 rounded-full pointer-events-none z-[9999] mix-blend-difference"
        animate={{ x: pos.x - 4, y: pos.y - 4, scale: clicking ? 0.5 : 1 }}
        transition={{ type: "spring", stiffness: 800, damping: 35, mass: 0.1 }}
      />
      {/* ring */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 border border-violet-400/50 rounded-full pointer-events-none z-[9998]"
        animate={{ x: ring.x - 16, y: ring.y - 16, scale: clicking ? 1.5 : 1 }}
        transition={{ type: "spring", stiffness: 150, damping: 18, mass: 0.5 }}
      />
    </>
  );
}
