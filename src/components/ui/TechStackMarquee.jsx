/* src/components/ui/TechStackMarquee.jsx
   ==========================================================================
   Animated Tech Stack Marquee (Divider between Hero and About)
   - Glides smoothly from LEFT to RIGHT at a calm, readable pace
   - Framed by crisp top and bottom border divider lines
   - Dynamically adapts to Light (Sun) and Dark (Night) themes
   - Features iconic condensed typography ('Bebas Neue') with alternating fills,
     subtle tech tags, and red star separators
   ========================================================================== */

import { motion } from "framer-motion";

const TECH_STACK = [
  { name: "DATA ANALYSIS", tag: "ANALYTICS", isRed: true },
  { name: "REACT.JS", tag: "FRONTEND", isOutline: true },
  { name: "PYTHON", tag: "PYTHON3", isRed: false },
  { name: "SYSTEM ANALYSIS", tag: "SYS_ENG", isRed: true },
  { name: "MYSQL & DATABASE", tag: "DATA_STORE", isOutline: true },
  { name: "TAILWIND CSS", tag: "UI_FRAMEWORK", isRed: false },
  { name: "FIGMA & UI/UX", tag: "DESIGN", isOutline: true },
  { name: "UML & BPMN", tag: "MODELING", isRed: true },
  { name: "MACHINE LEARNING", tag: "AI_ML", isOutline: true },
  { name: "GIT & GITHUB", tag: "DEV_OPS", isRed: false },
  { name: "COREL DRAW", tag: "VECTOR", isOutline: true },
  { name: "ERD & NORMALIZATION", tag: "DATABASE", isRed: false },
];

export default function TechStackMarquee() {
  // Duplicate array for an infinite, gap-free marquee loop
  const marqueeList = [...TECH_STACK, ...TECH_STACK];

  return (
    <section
      aria-label="Tech Stack Ticker"
      className="relative w-full overflow-hidden bg-[var(--color-surface)] py-3.5 md:py-4 border-y border-[var(--color-outline-stroke)]/15 transition-colors duration-300"
    >
      {/* ── Technical Corner Accent Marks (Top & Bottom Left/Right) ── */}
      <div className="pointer-events-none absolute left-3 top-0 -translate-y-1/2 font-mono text-[9px] text-[var(--color-muted)] opacity-60">
        +
      </div>
      <div className="pointer-events-none absolute right-3 top-0 -translate-y-1/2 font-mono text-[9px] text-[var(--color-muted)] opacity-60">
        +
      </div>
      <div className="pointer-events-none absolute left-3 bottom-0 translate-y-1/2 font-mono text-[9px] text-[var(--color-muted)] opacity-60">
        +
      </div>
      <div className="pointer-events-none absolute right-3 bottom-0 translate-y-1/2 font-mono text-[9px] text-[var(--color-muted)] opacity-60">
        +
      </div>

      {/* ── Soft Edge Vignette (fades text smoothly at left & right viewport edges) ── */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 md:w-28 bg-gradient-to-r from-[var(--color-surface)] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 md:w-28 bg-gradient-to-l from-[var(--color-surface)] to-transparent" />

      {/* ── Animated Track: Glides smoothly from LEFT to RIGHT ── */}
      <motion.div
        className="flex w-max items-center gap-8 md:gap-12 will-change-transform"
        animate={{
          x: ["-50%", "0%"], // Left to Right translation
        }}
        transition={{
          duration: 38, // Calm, comfortable reading pace
          repeat: Infinity,
          ease: "linear",
        }}
      >
        {marqueeList.map((item, index) => (
          <div
            key={`${item.name}-${index}`}
            className="flex items-center gap-3 md:gap-4 shrink-0 select-none group"
          >
            {/* Iconic 4-Point Star Separator */}
            <span className="text-red-drama text-xs md:text-sm animate-pulse">
              ✦
            </span>

            {/* Main Skill Label */}
            <span
              className={`font-display text-[1.45rem] sm:text-[1.75rem] md:text-[2.1rem] tracking-wider uppercase leading-none transition-transform duration-300 group-hover:scale-105 ${
                item.isRed
                  ? "text-red-drama font-bold"
                  : item.isOutline
                  ? "text-transparent [-webkit-text-stroke:1px_var(--color-outline-stroke)] font-normal opacity-85 hover:opacity-100"
                  : "text-[var(--color-bone)] font-bold"
              }`}
            >
              {item.name}
            </span>

            {/* Micro Tag Pill */}
            <span className="hidden sm:inline-block rounded border border-[var(--color-outline-stroke)]/15 bg-[var(--color-surface-2)] px-1.5 py-0.5 font-mono text-[8px] md:text-[9px] font-semibold tracking-widest text-[var(--color-muted)]">
              {item.tag}
            </span>
          </div>
        ))}
      </motion.div>
    </section>
  );
}
