/* src/components/sections/Hero.jsx
   F1 Cockpit / Broadcast-Inspired Hero Section:
   - Synchronized telemetry HUD layer & corner brackets
   - Kinetic character reveal for "DAFFA" + interactive hover outline for "MUNAZZAL"
   - Telemetry ScrambleText for "BUILD. THINK. DEPLOY." with alternating blinking dots
   - Telemetry precision ruler with tick marks
   - Skewed F1-style parallelogram CTA buttons (Lihat Projects & Download CV)
   - Cursor-tracking grid spotlight & breathing red atmospheric glow
   - Real-time reactive sync with large Matter.js Nametag (velocity skew & collision glitch)
   - Centered vertical scroll telemetry indicator
*/
import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useLanguage } from "../../context/LanguageContext";
import useIsMobile from "../../hooks/useIsMobile";
import useReducedMotion from "../../hooks/useReducedMotion";

// Sub-components
import InteractiveNametag from "../ui/InteractiveNametag";
import HeroTitle from "../hero/HeroTitle";
import ScrambleText from "../hero/ScrambleText";
import TelemetryRuler from "../hero/TelemetryRuler";
import HeroCTA from "../hero/HeroCTA";
import HudLayer from "../hero/HudLayer";
import GridSpotlight from "../hero/GridSpotlight";

export default function Hero() {
  const sectionRef = useRef(null);
  const isMobile = useIsMobile();
  const prefersReduced = useReducedMotion();
  const { content } = useLanguage();
  const heroText = content.hero;

  const [isIntroFinished, setIsIntroFinished] = useState(() => {
    if (typeof window === "undefined") return true;
    return Boolean(sessionStorage.getItem("f1_hero_intro_seen"));
  });
  const [titleRevealed, setTitleRevealed] = useState(false);
  const [triggerSpeedLines, setTriggerSpeedLines] = useState(false);

  // Scroll parallax for photo/nametag
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const photoY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);

  useEffect(() => {
    const handleIntroComplete = () => {
      setIsIntroFinished(true);
      setTriggerSpeedLines(true);
    };

    const handleLightsOut = () => {
      setTriggerSpeedLines(true);
    };

    window.addEventListener("f1:intro-complete", handleIntroComplete);
    window.addEventListener("f1:lights-out", handleLightsOut);

    return () => {
      window.removeEventListener("f1:intro-complete", handleIntroComplete);
      window.removeEventListener("f1:lights-out", handleLightsOut);
    };
  }, []);

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative flex min-h-[100svh] min-h-[100vh] w-full items-end md:items-center overflow-hidden bg-[var(--color-void)] pb-6 sm:pb-12 md:pb-16 pt-16 sm:pt-20 md:pt-24"
    >
      {/* ───────── 1. Background Grid & Atmospheric Spotlight ───────── */}
      <GridSpotlight triggerSpeedLines={triggerSpeedLines} />

      {/* ───────── 2. F1 Cockpit HUD Telemetry Layer ───────── */}
      <HudLayer isIntroFinished={isIntroFinished} />

      {/* ───────── 3. Large Interactive Matter.js Lanyard Nametag ───────── */}
      <div className="pointer-events-auto absolute top-8 sm:top-10 md:top-16 lg:top-20 left-0 right-0 md:left-auto md:right-[8%] lg:right-[13%] xl:right-[16%] z-20 flex justify-center md:block">
        <motion.div
          className="flex justify-center items-start origin-top-center md:origin-top-right scale-[0.46] sm:scale-[0.55] md:scale-[0.88] lg:scale-[1.02] xl:scale-[1.10] transition-transform duration-300"
          style={{ y: photoY }}
        >
          <InteractiveNametag />
        </motion.div>
      </div>

      {/* ───────── 4. Mobile Text-Contrast Scrim Overlay ───────── */}
      <div
        className="pointer-events-none absolute inset-0 z-[15] md:hidden"
        style={{
          background:
            "linear-gradient(to top, var(--color-void) 0%, color-mix(in srgb, var(--color-void) 82%, transparent) 40%, color-mix(in srgb, var(--color-void) 45%, transparent) 65%, transparent 100%)",
        }}
      />

      {/* ───────── 5. Main Hero Content & Telemetry Readouts ───────── */}
      <div className="relative z-20 w-full px-4 sm:px-8 md:px-12 lg:px-20">
        <div className="max-w-4xl lg:max-w-5xl xl:max-w-6xl flex flex-col gap-3 sm:gap-4 md:gap-5 lg:gap-6">
          {/* Reactive Title (Role + Staggered Name + Outline Hover) */}
          <HeroTitle
            role={heroText.role}
            nameLine1={heroText.nameLine1}
            nameLine2={heroText.nameLine2}
            onRevealComplete={() => setTitleRevealed(true)}
          />

          {/* Scramble Tagline */}
          <div className="overflow-hidden mt-0.5 sm:mt-1 md:mt-2">
            <div className="font-mono text-[clamp(0.75rem,2.8vw,1.15rem)] sm:text-[clamp(0.9rem,2.2vw,1.35rem)] md:text-[clamp(1.2rem,1.95vw,1.95rem)] lg:text-[clamp(1.35rem,1.9vw,2.25rem)] uppercase text-[var(--color-muted)] whitespace-nowrap">
              <ScrambleText
                text={heroText.tagline}
                startTrigger={titleRevealed || isIntroFinished || prefersReduced}
              />
            </div>
          </div>

          {/* Precision Telemetry Ruler */}
          <div className="py-0.5 hidden sm:block">
            <TelemetryRuler />
          </div>

          {/* F1 Skewed Parallelogram CTA Buttons */}
          <div className="mt-1 sm:mt-2 md:mt-3">
            <HeroCTA
              projectsText={heroText.ctaProjects || "Lihat Projects ↓"}
              cvText={heroText.ctaCv || "Download CV"}
            />
          </div>
        </div>
      </div>

      {/* ───────── 6. Hairline Bottom Telemetry Border ───────── */}
      <div className="absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-[var(--color-white-10)] to-transparent" />
    </section>
  );
}
