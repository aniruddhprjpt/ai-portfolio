"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const NAV_ITEMS = ["About", "Projects", "Skills", "Experience", "Contact"];

export default function Navbar({ firstName, email }: { firstName: string; email: string }) {
  const [scrolled, setScrolled]   = useState(false);
  const [lastY, setLastY]         = useState(0);
  const [hidden, setHidden]       = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      setHidden(y > lastY && y > 120);
      setLastY(y);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [lastY]);

  return (
    <motion.nav
      animate={{ y: hidden ? -80 : 0 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        background: scrolled ? "oklch(0.07 0.000 0 / 0.85)" : "transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        borderBottom: scrolled ? "1px solid oklch(0.22 0.010 52)" : "1px solid transparent",
        transition: "background 0.3s ease, border-color 0.3s ease",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <motion.a
          href="#"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="font-display font-extrabold text-lg tracking-tight"
          style={{ color: "var(--color-ink)", textDecoration: "none" }}
        >
          {firstName}
          <span style={{ color: "var(--color-primary)" }}>.</span>
          <span style={{ color: "var(--color-muted)" }}>dev</span>
        </motion.a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_ITEMS.map((item, i) => (
            <motion.a
              key={item}
              href={`#${item.toLowerCase()}`}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08 * i + 0.15 }}
              className="nav-link"
            >
              {item}
            </motion.a>
          ))}
        </div>

        {/* Hire Me */}
        <motion.a
          href={`mailto:${email}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="hidden md:inline-flex btn-primary text-sm py-2 px-5"
        >
          Hire Me
        </motion.a>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden flex flex-col gap-1.5 p-1"
          aria-label="Toggle menu"
          style={{ background: "none", border: "none" }}
        >
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              animate={{
                rotate: mobileOpen && i === 0 ? 45 : mobileOpen && i === 2 ? -45 : 0,
                y: mobileOpen && i === 0 ? 8 : mobileOpen && i === 2 ? -8 : 0,
                opacity: mobileOpen && i === 1 ? 0 : 1,
              }}
              style={{
                display: "block",
                width: 24,
                height: 1.5,
                background: "var(--color-ink)",
                transformOrigin: "center",
              }}
            />
          ))}
        </button>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            style={{
              background: "oklch(0.07 0.000 0 / 0.96)",
              borderTop: "1px solid oklch(0.22 0.010 52)",
              overflow: "hidden",
            }}
          >
            <div className="flex flex-col px-6 py-5 gap-4">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  onClick={() => setMobileOpen(false)}
                  className="nav-link text-base"
                  style={{ paddingBottom: 8, borderBottom: "1px solid oklch(0.22 0.010 52)" }}
                >
                  {item}
                </a>
              ))}
              <a href={`mailto:${email}`} className="btn-primary mt-2 justify-center">
                Hire Me
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
