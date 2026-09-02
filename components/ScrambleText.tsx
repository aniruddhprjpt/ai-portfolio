"use client";
import { useEffect, useRef } from "react";
import { useInView } from "framer-motion";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ#@!&%$0123456789";

interface Props {
  text: string;
  className?: string;
  style?: React.CSSProperties;
  delay?: number; // ms before scramble starts
}

export default function ScrambleText({ text, className, style, delay = 0 }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const raf = useRef<number | null>(null);
  const timeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!inView) return;
    const el = ref.current;
    if (!el) return;

    const chars = text.split("");
    let iter = 0;

    const tick = () => {
      iter += 0.55;
      el.textContent = chars
        .map((ch, i) => {
          if (ch === " ") return " ";
          if (i < Math.floor(iter)) return ch;
          return CHARS[Math.floor(Math.random() * CHARS.length)];
        })
        .join("");

      if (iter < chars.length) {
        raf.current = requestAnimationFrame(tick);
      } else {
        el.textContent = text; // settle to real text
      }
    };

    timeout.current = setTimeout(() => {
      raf.current = requestAnimationFrame(tick);
    }, delay);

    return () => {
      if (raf.current) cancelAnimationFrame(raf.current);
      if (timeout.current) clearTimeout(timeout.current);
    };
  }, [inView, text, delay]);

  return (
    <span ref={ref} className={className} style={style}>
      {text}
    </span>
  );
}
