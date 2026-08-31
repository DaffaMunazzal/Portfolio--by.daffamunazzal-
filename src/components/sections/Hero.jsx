/* src/components/sections/Hero.jsx
   Full-viewport hero section with:
   - Stacked poster typography (solid + outline text)
   - Grayscale profile photo with cinematic crop
   - Animated red radial spotlight that parallaxes with scroll
   - Mouse-tracking subtle light movement
   - "SCROLL" bounce indicator
   - Theme-aware outline text via CSS variable
   - i18n support */
import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import useMousePosition from "../../hooks/useMousePosition";
import useIsMobile from "../../hooks/useIsMobile";
import { useLanguage } from "../../context/LanguageContext";
import profileImg from "../../assets/images/profile.png";

gsap.registerPlugin(ScrollTrigger);

// TODO: REPLACE with your actual name and tagline
const NAME_LINE1 = "DAFFA";
const NAME_LINE2 = "MUNAZZAL";

export default function Hero() {
  const sectionRef = useRef(null);
  const mouse = useMousePosition();
  const isMobile = useIsMobile();
  const { t } = useLanguage();

  // Scroll-based parallax for the spotlight
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const spotlightY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const photoY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);

  // GSAP clip-path reveal on the name title (wipes in from bottom)
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".hero-title-reveal",
        { clipPath: "inset(100% 0 0 0)", opacity: 0 },
        {
          clipPath: "inset(0% 0 0 0)",
          opacity: 1,
          duration: 1.2,
          stagger: 0.15,
          ease: "expo.out",
          delay: 0.5,
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative flex h-screen min-h-[600px] w-full items-end overflow-hidden bg-[var(--color-void)] pb-16"
    >
      {/* ───────── Red Spotlight Background ───────── */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-0"
        style={{ y: spotlightY }}
      >
        {/* Primary spotlight — center/right */}
        <motion.div
          className="absolute right-[5%] top-[10%] h-[70vh] w-[60vw] rounded-full bg-red-drama opacity-20 blur-[160px]"
          animate={
            isMobile
              ? {}
              : {
                x: mouse.x * 25,
                y: mouse.y * 20,
              }
          }
          transition={{ type: "spring", stiffness: 30, damping: 20 }}
        />
        {/* Secondary dimmer spotlight — left edge */}
        <div className="absolute -left-20 top-1/3 h-[40vh] w-[30vw] rounded-full bg-red-deep opacity-10 blur-[120px]" />
      </motion.div>

      {/* ───────── Profile Photo ───────── */}
      <motion.div
        className="pointer-events-none absolute bottom-0 right-[5%] z-10 h-[88vh] w-auto md:right-[8%]"
        style={{ y: photoY }}
      >
        <img
          src={profileImg}
          alt="Profile photo"
          className="h-full w-auto object-cover object-top grayscale"
          style={{
            maskImage: "linear-gradient(to top, transparent 0%, black 25%)",
            WebkitMaskImage: "linear-gradient(to top, transparent 0%, black 25%)",
          }}
        />
      </motion.div>

      {/* ───────── Text Content ───────── */}
      <div className="relative z-20 w-full px-6 md:px-12 lg:px-20">
        <div className="max-w-7xl">
          {/* Label */}
          <motion.p
            className="mb-4 font-body text-xs font-semibold uppercase tracking-ultra-wide text-red-drama"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {t("hero.label")}
          </motion.p>

          {/* Name — Solid Layer (layer 1) */}
          <div className="overflow-hidden">
            <div className="hero-title-reveal font-display text-poster-xl uppercase leading-none tracking-poster text-[var(--color-bone)]">
              {NAME_LINE1}
            </div>
          </div>

          {/* Name — Outline Layer (layer 2, overlapping slightly) */}
          <div className="overflow-hidden -mt-[0.05em]">
            <div
              className="hero-title-reveal font-display text-poster-xl uppercase leading-none tracking-poster"
              style={{
                WebkitTextStroke: "1.5px var(--color-outline-stroke)",
                WebkitTextFillColor: "transparent",
                color: "transparent",
              }}
            >
              {NAME_LINE2}
            </div>
          </div>

          {/* Tagline */}
          <div className="overflow-hidden mt-3">
            <motion.p
              className="font-display text-poster-sm uppercase tracking-ultra-wide text-[var(--color-muted)]"
              initial={{ y: "110%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
            >
              {t("hero.tagline")}
            </motion.p>
          </div>
        </div>
      </div>

      {/* ───────── Scroll Indicator ───────── */}
      <motion.div
        className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.6 }}
      >
        <span className="font-body text-[10px] uppercase tracking-ultra-wide text-[var(--color-faint)]">
          ↓
        </span>
        {/* Animated bouncing chevron */}
        <motion.div
          className="flex h-8 w-5 items-start justify-center rounded-full border border-[var(--color-faint)]/40 pt-1.5"
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="h-1.5 w-1.5 rounded-full bg-red-drama" />
        </motion.div>
      </motion.div>

      {/* ───────── Hairline Bottom Border ───────── */}
      <div className="absolute bottom-0 left-0 h-px w-full bg-[var(--color-white-5)]" />
    </section>
  );
}
