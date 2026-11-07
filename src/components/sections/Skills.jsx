/* src/components/sections/Skills.jsx
   F1 Cockpit / Telemetry-Aligned Skills Section:
   - Telemetry HUD layer ("02 — SKILLS" + corner brackets [ ])
   - Giant low-opacity "SKILLS" outline watermark in background (~0.04 opacity)
   - Reliable title reveal: "MY" solid + "SKILLS" outline (interactive red ignite)
   - Capabilities label with calibrated 60-80px spacing to category panels
   - 4 category panels with outline 01-04 numerals (stroke tipis, fill transparan)
   - Peer-dimming on panel hover (hovered panel gets brighter red border, others dim to ~0.5)
   - Guaranteed scramble resolution with enforced fallback timer
   - Wrapping skill names (no ellipsis) with slimmed 5-segment ruler bars
   - Subtle red glow on full 5-segment skills
   - F1 parallelogram skewed button "VIEW PROJECTS ↓"
*/
import { useState, useRef, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowDown, Code2, Database, BarChart3, Wrench } from "lucide-react";
import useIsMobile from "../../hooks/useIsMobile";
import useReducedMotion from "../../hooks/useReducedMotion";
import { useLanguage } from "../../context/LanguageContext";

const iconMap = { Code2, Database, BarChart3, Wrench };
const SCRAMBLE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#/_";

/* Scramble effect for category title on hover with guaranteed final text fallback */
function ScrambleCategoryTitle({ text, isHovered, isMobile, prefersReduced }) {
  const [displayText, setDisplayText] = useState(text);
  const animFrameRef = useRef(null);
  const fallbackTimerRef = useRef(null);

  useEffect(() => {
    setDisplayText(text);
  }, [text]);

  const runScramble = useCallback(
    (durationFrames = 18) => {
      if (prefersReduced || isMobile) {
        setDisplayText(text);
        return;
      }

      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      if (fallbackTimerRef.current) clearTimeout(fallbackTimerRef.current);

      let frame = 0;
      const totalFrames = durationFrames;
      const len = text.length;

      const update = () => {
        frame++;
        const progress = frame / totalFrames;
        const resolvedCount = Math.floor(progress * len);

        let result = "";
        for (let i = 0; i < len; i++) {
          const char = text[i];
          if (char === " " || char === "&" || char === "/" || char === "-") {
            result += char;
          } else if (i < resolvedCount) {
            result += char;
          } else {
            result += SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
          }
        }

        setDisplayText(result);

        if (frame < totalFrames) {
          animFrameRef.current = requestAnimationFrame(update);
        } else {
          setDisplayText(text);
        }
      };

      // Hard safety fallback: force exact original text after expected duration
      fallbackTimerRef.current = setTimeout(() => {
        if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
        setDisplayText(text);
      }, (durationFrames * 1000) / 30 + 100);

      animFrameRef.current = requestAnimationFrame(update);
    },
    [text, prefersReduced, isMobile]
  );

  useEffect(() => {
    if (isHovered && !isMobile && !prefersReduced) {
      runScramble(18);
    } else {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      if (fallbackTimerRef.current) clearTimeout(fallbackTimerRef.current);
      setDisplayText(text);
    }
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      if (fallbackTimerRef.current) clearTimeout(fallbackTimerRef.current);
      setDisplayText(text);
    };
  }, [isHovered, runScramble, text, isMobile, prefersReduced]);

  return (
    <h3 className="font-body text-xs sm:text-sm font-bold uppercase tracking-wider text-[var(--color-bone)] group-hover:text-white transition-colors duration-200">
      {displayText}
    </h3>
  );
}

/* 5-segment precision ruler/tick skill bar with wrap support and 5-star glow */
function SegmentedSkillBar({
  name,
  level,
  cardIndex,
  skillIndex,
  isHovered,
  isMobile,
  prefersReduced,
}) {
  // Convert percentage to 5 discrete segments: Math.round(persen / 20), minimum 1
  const filledCount = Math.max(1, Math.min(5, Math.round(level / 20)));
  const isMaxLevel = filledCount === 5;

  return (
    <div className="flex items-center justify-between gap-2.5 py-1 sm:py-1.5">
      {/* Skill Name: no truncate, wraps cleanly across up to 2 lines */}
      <span className="font-body text-xs sm:text-[13px] tracking-wide text-[var(--color-bone-dim)] group-hover:text-[var(--color-bone)] transition-colors duration-200 leading-snug break-words flex-1 pr-1">
        {name}
      </span>

      {/* 5-Segment Ruler Bar: slimmed width to leave ample room for text */}
      <div
        className="flex items-center gap-0.5 sm:gap-1 shrink-0"
        aria-label={`${name}: ${filledCount} of 5 segments`}
      >
        {[0, 1, 2, 3, 4].map((segIndex) => {
          const isFilled = segIndex < filledCount;
          return (
            <motion.span
              key={segIndex}
              initial={prefersReduced ? { opacity: 1, scaleX: 1 } : { opacity: 0, scaleX: 0 }}
              whileInView={{ opacity: 1, scaleX: 1 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={
                prefersReduced
                  ? { duration: 0 }
                  : {
                      duration: 0.25,
                      delay: 0.15 + cardIndex * 0.08 + skillIndex * 0.03 + segIndex * 0.04,
                      ease: "easeOut",
                    }
              }
              className={`h-1.5 sm:h-2 w-2.5 sm:w-3 origin-left transition-all duration-300 ${
                isFilled
                  ? isMaxLevel
                    ? isHovered && !isMobile
                      ? "bg-red-drama brightness-125 shadow-[0_0_8px_rgba(217,30,30,0.85)]"
                      : "bg-red-drama shadow-[0_0_6px_rgba(217,30,30,0.65)]"
                    : isHovered && !isMobile
                    ? "bg-red-drama brightness-110"
                    : "bg-red-drama"
                  : "bg-[var(--color-white-10)]"
              }`}
            />
          );
        })}
      </div>
    </div>
  );
}

/* Category Card with outline numerals and micro corner brackets */
function CategoryCard({
  group,
  index,
  isHovered,
  onHoverChange,
  isMobile,
  prefersReduced,
}) {
  const Icon = iconMap[group.icon] || Code2;

  return (
    <div
      onMouseEnter={() => onHoverChange(true)}
      onMouseLeave={() => onHoverChange(false)}
      className={`group relative flex h-full flex-col justify-between rounded-none border p-5 sm:p-6 transition-all duration-300 select-none shadow-none ${
        isHovered
          ? "border-red-drama/90 bg-[var(--color-surface)] shadow-[0_0_15px_rgba(217,30,30,0.18)]"
          : "border-[var(--color-white-10)] bg-[var(--color-surface)]/80"
      }`}
    >
      {/* ── Micro Corner Brackets (HUD style) ── */}
      <span className="absolute top-0 left-0 w-2 h-2 border-t border-l border-red-drama/60 pointer-events-none" />
      <span className="absolute top-0 right-0 w-2 h-2 border-t border-r border-red-drama/60 pointer-events-none" />
      <span className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-red-drama/60 pointer-events-none" />
      <span className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-red-drama/60 pointer-events-none" />

      {/* Card Header: Large Display Number 01-04 (Outline like MUNAZZAL) + Bare Icon */}
      <div className="flex items-start justify-between mb-4">
        <span
          className="font-display text-4xl sm:text-5xl leading-none select-none transition-opacity duration-300 opacity-40 group-hover:opacity-90"
          style={{
            WebkitTextStroke: "1px var(--color-outline-stroke)",
            WebkitTextFillColor: "transparent",
            color: "transparent",
          }}
        >
          0{index + 1}
        </span>
        <Icon
          size={20}
          className="text-red-drama/80 transition-colors duration-300 group-hover:text-red-drama"
        />
      </div>

      {/* Category Title with brief hover scramble */}
      <div className="mb-4">
        <ScrambleCategoryTitle
          text={group.label}
          isHovered={isHovered}
          isMobile={isMobile}
          prefersReduced={prefersReduced}
        />
      </div>

      {/* Skill List with 5-segment ruler bars */}
      <div className="flex flex-col gap-2 sm:gap-2.5 flex-1 justify-center">
        {group.skills.map((skill, sIdx) => (
          <SegmentedSkillBar
            key={skill.name}
            name={skill.name}
            level={skill.level}
            cardIndex={index}
            skillIndex={sIdx}
            isHovered={isHovered}
            isMobile={isMobile}
            prefersReduced={prefersReduced}
          />
        ))}
      </div>
    </div>
  );
}

/* Container animation variants */
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function Skills() {
  const { skillGroups } = useLanguage();
  const isMobile = useIsMobile();
  const prefersReduced = useReducedMotion();
  const [hoveredCardIndex, setHoveredCardIndex] = useState(null);

  const handleScrollToProjects = (e) => {
    e.preventDefault();
    const target = document.querySelector("#projects");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="skills"
      className="relative w-full overflow-hidden bg-[var(--color-void)] px-4 sm:px-8 md:px-12 lg:px-20 py-20 sm:py-24 md:py-28 select-none"
    >
      {/* ───────── 1. Background Grid & Atmospheric Red Glow ───────── */}
      <div className="pointer-events-none absolute inset-0 f1-grid-background opacity-[0.06]" />
      <div className="pointer-events-none absolute right-[5%] top-1/3 h-[35rem] w-[35rem] -translate-y-1/2 rounded-full bg-red-drama opacity-15 blur-[150px]" />
      <div className="pointer-events-none absolute -left-20 bottom-1/4 h-[25rem] w-[25rem] rounded-full bg-red-deep opacity-10 blur-[130px]" />

      {/* ───────── 2. Giant Watermark "SKILLS" Outline Background (~0.04 Opacity) ───────── */}
      <div
        aria-hidden="true"
        className="pointer-events-none select-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 overflow-hidden w-full flex justify-center items-center opacity-[0.04]"
      >
        <span
          className="font-display font-black text-[clamp(8rem,24vw,26rem)] uppercase leading-none tracking-poster select-none whitespace-nowrap"
          style={{
            WebkitTextStroke: "2px var(--color-outline-stroke)",
            WebkitTextFillColor: "transparent",
            color: "transparent",
          }}
        >
          SKILLS
        </span>
      </div>

      {/* ───────── 3. HUD Layer & Corner Brackets ───────── */}
      <div aria-hidden="true" className="pointer-events-none select-none absolute inset-0 z-10">
        {/* Top-Left Bracket */}
        <div className="absolute top-6 sm:top-8 left-4 sm:left-8 w-5 sm:w-7 h-5 sm:h-7 border-t-2 border-l-2 border-red-drama/70">
          <span className="absolute -top-1.5 -left-1.5 w-1 h-1 bg-red-drama" />
        </div>

        {/* Top-Right Bracket */}
        <div className="absolute top-6 sm:top-8 right-4 sm:right-8 w-5 sm:w-7 h-5 sm:h-7 border-t-2 border-r-2 border-red-drama/70">
          <span className="absolute -top-1.5 -right-1.5 w-1 h-1 bg-red-drama" />
        </div>

        {/* Bottom-Left Bracket */}
        <div className="absolute bottom-6 sm:bottom-8 left-4 sm:left-8 w-5 sm:w-7 h-5 sm:h-7 border-b-2 border-l-2 border-red-drama/70">
          <span className="absolute -bottom-1.5 -left-1.5 w-1 h-1 bg-red-drama" />
        </div>

        {/* Bottom-Right Bracket */}
        <div className="absolute bottom-6 sm:bottom-8 right-4 sm:right-8 w-5 sm:w-7 h-5 sm:h-7 border-b-2 border-r-2 border-red-drama/70">
          <span className="absolute -bottom-1.5 -right-1.5 w-1 h-1 bg-red-drama" />
        </div>

        {/* Top-Left Telemetry Tag: 02 — SKILLS */}
        <div className="absolute top-6 sm:top-8 left-12 sm:left-18 flex items-center gap-2 font-mono text-[10px] sm:text-[11px] tracking-[0.25em] text-[var(--color-muted)]">
          <span className="w-1.5 h-1.5 bg-red-drama rounded-xs" />
          <span>02 — SKILLS</span>
        </div>
      </div>

      {/* ───────── 4. Section Content ───────── */}
      <div className="relative z-10 mx-auto max-w-7xl pt-6 sm:pt-4">
        {/* Header: Label + "MY" solid + "SKILLS" outline (Gap to panels: ~60-80px) */}
        <div className="mb-[60px] md:mb-[75px] flex flex-col select-none relative z-10">
          {/* Small red label: — CAPABILITIES */}
          <motion.div
            initial={prefersReduced ? { opacity: 1, x: 0 } : { opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.5 }}
            className="mb-2"
          >
            <p className="font-body text-xs md:text-sm font-semibold uppercase text-red-drama flex items-center gap-2 tracking-[0.25em]">
              <span className="inline-block w-2.5 h-0.5 bg-red-drama" />
              <span>— CAPABILITIES</span>
            </p>
          </motion.div>

          {/* Title: "MY" solid + "SKILLS" outline */}
          <div className="select-none flex flex-col leading-[0.92]">
            {/* Line 1: MY (solid) */}
            <div className="overflow-hidden py-0.5">
              <motion.h2
                initial={prefersReduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="font-display font-extrabold text-[clamp(2.75rem,8vw,5.5rem)] md:text-[clamp(4rem,7.5vw,7rem)] uppercase leading-[0.92] text-[var(--color-bone)] tracking-poster"
              >
                MY
              </motion.h2>
            </div>

            {/* Line 2: SKILLS (outline, interactive hover ignite) */}
            <div className="overflow-hidden py-1">
              <motion.div
                initial={prefersReduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="font-display font-extrabold text-[clamp(2.75rem,8vw,5.5rem)] md:text-[clamp(4rem,7.5vw,7rem)] uppercase leading-[0.92] tracking-poster hero-outline-interactive cursor-pointer select-none"
                title="Hover to ignite"
              >
                SKILLS
              </motion.div>
            </div>
          </div>
        </div>

        {/* ───────── 5. Category Panels (Peer dimming to ~0.5 on hover) ───────── */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-5"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {skillGroups.map((group, index) => {
            const isAnyHovered = hoveredCardIndex !== null && !isMobile;
            const isThisHovered = hoveredCardIndex === index && !isMobile;

            return (
              <motion.div
                key={group.id}
                variants={cardVariants}
                className={`h-full transition-opacity duration-300 ${
                  isAnyHovered && !isThisHovered ? "opacity-50" : "opacity-100"
                }`}
              >
                <CategoryCard
                  group={group}
                  index={index}
                  isHovered={isThisHovered}
                  onHoverChange={(hovered) => {
                    if (!isMobile) {
                      setHoveredCardIndex(hovered ? index : null);
                    }
                  }}
                  isMobile={isMobile}
                  prefersReduced={prefersReduced}
                />
              </motion.div>
            );
          })}
        </motion.div>

        {/* ───────── 6. Section End: Skewed Parallelogram CTA Button ───────── */}
        <div className="mt-12 sm:mt-16 flex justify-center">
          <a
            href="#projects"
            onClick={handleScrollToProjects}
            className="group relative inline-flex items-center justify-center overflow-hidden px-6 sm:px-8 py-3 sm:py-3.5 bg-red-drama text-white font-body text-xs sm:text-sm font-bold uppercase tracking-widest transition-all duration-300 f1-skew-btn shadow-[0_4px_20px_rgba(217,30,30,0.45)] hover:shadow-[0_6px_28px_rgba(217,30,30,0.7)] hover:scale-[1.02] active:scale-[0.98]"
          >
            {/* Fill sweep animation effect on hover */}
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-red-600 to-red-deep translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300 ease-out" />

            {/* Diagonal highlight glint */}
            <span className="absolute top-0 right-0 -mr-4 w-6 h-full bg-white/20 skew-x-[25deg] translate-x-[-200%] group-hover:translate-x-[400%] transition-transform duration-700 ease-in-out" />

            {/* Unskewed Content */}
            <span className="relative z-10 flex items-center gap-2 f1-skew-content">
              <span>VIEW PROJECTS</span>
              <ArrowDown
                size={14}
                className="transition-transform duration-300 group-hover:translate-y-1"
              />
            </span>
          </a>
        </div>
      </div>

      {/* Hairline Bottom Border */}
      <div className="absolute bottom-0 left-0 h-px w-full bg-[var(--color-white-10)]" />
    </section>
  );
}
