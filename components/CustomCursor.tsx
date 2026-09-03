"use client";
import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const dotRef  = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot  = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    // Respect reduced-motion
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let mx = -200, my = -200;   // mouse
    let rx = -200, ry = -200;   // ring (lags)
    let hover   = false;
    let clicking = false;
    let raf: number;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      hover = !!(e.target as HTMLElement).closest("a, button, [role=button]");
    };
    const onDown = () => { clicking = true; };
    const onUp   = () => { clicking = false; };

    window.addEventListener("mousemove",  onMove,  { passive: true });
    window.addEventListener("mousedown",  onDown);
    window.addEventListener("mouseup",    onUp);

    const frame = () => {
      // Dot: instant follow, offset so center aligns to pointer tip
      dot.style.transform = `translate(${mx - 4}px, ${my - 4}px)`;

      // Ring: spring follow
      const lag = reduced ? 1 : 0.12;
      rx += (mx - rx) * lag;
      ry += (my - ry) * lag;
      ring.style.transform = `translate(${rx - 16}px, ${ry - 16}px)`;

      // States
      const dotScale  = clicking ? "0.5" : "1";
      const ringScale = hover ? "2.2" : clicking ? "0.7" : "1";

      dot.style.scale  = dotScale;
      ring.style.scale = ringScale;
      ring.style.borderColor = hover
        ? "oklch(0.72 0.17 52 / 0.9)"
        : "oklch(0.72 0.17 52 / 0.45)";

      raf = requestAnimationFrame(frame);
    };

    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup",   onUp);
    };
  }, []);

  return (
    <>
      {/* Amber dot — instant */}
      <div
        ref={dotRef}
        aria-hidden
        style={{
          position: "fixed",
          top: 0, left: 0,
          width: 8, height: 8,
          borderRadius: "50%",
          background: "oklch(0.72 0.17 52)",
          zIndex: 99999,
          pointerEvents: "none",
          willChange: "transform",
          transition: "scale 0.12s ease",
        }}
      />
      {/* Amber ring — lagging */}
      <div
        ref={ringRef}
        aria-hidden
        style={{
          position: "fixed",
          top: 0, left: 0,
          width: 32, height: 32,
          borderRadius: "50%",
          border: "1.5px solid oklch(0.72 0.17 52 / 0.45)",
          zIndex: 99998,
          pointerEvents: "none",
          willChange: "transform",
          transition: "scale 0.22s ease, border-color 0.18s ease",
        }}
      />
    </>
  );
}
