"use client";
import { motion, Variants } from "framer-motion";

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.2 } },
};
const word: Variants = {
  hidden: { opacity: 0, y: 60, filter: "blur(8px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.7, ease: "easeOut" } },
};

export default function HeroText({ name }: { name: string }) {
  const words = ["Hi, I'm", name];
  return (
    <motion.h1
      variants={container}
      initial="hidden"
      animate="show"
      className="font-heading text-5xl md:text-7xl font-black mb-4 leading-tight tracking-tight"
    >
      {words.map((w, i) => (
        <motion.span key={i} variants={word} className={`inline-block mr-4 ${i === 1 ? "glow-text gradient-text" : ""}`}>
          {w}
        </motion.span>
      ))}
    </motion.h1>
  );
}
