import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { HERO_CONFIG } from "./heroConfig";
import useReducedMotion from "../../hooks/useReducedMotion";

export default function HeroTitle({
  role = "MAHASISWA SISTEM INFORMASI",
  nameLine1 = "DAFFA",
  nameLine2 = "MUNAZZAL",
  onRevealComplete,
}) {
  const containerRef = useRef(null);
  const roleRef = useRef(null);
  const solidTitleRef = useRef(null);
  const outlineTitleRef = useRef(null);
  const lettersRef = useRef([]);

  const prefersReduced = useReducedMotion();
  const [isGlitching, setIsGlitching] = useState(false);
  const glitchTimerRef = useRef(null);

  // Trigger glitch pulse helper (on intro finish or user hover)
  const triggerGlitch = (durationMs = 200) => {
    if (prefersReduced) return;
    setIsGlitching(true);
    if (glitchTimerRef.current) clearTimeout(glitchTimerRef.current);
    glitchTimerRef.current = setTimeout(() => {
      setIsGlitching(false);
    }, durationMs);
  };

  useEffect(() => {
    if (!containerRef.current) return;

    if (prefersReduced) {
      // Show immediately
      if (roleRef.current) gsap.set(roleRef.current, { opacity: 1, letterSpacing: "0.3em" });
      if (lettersRef.current) gsap.set(lettersRef.current, { yPercent: 0, opacity: 1 });
      if (outlineTitleRef.current) gsap.set(outlineTitleRef.current, { opacity: 1 });
      if (onRevealComplete) onRevealComplete();
      return;
    }

    const ctx = gsap.context(() => {
      const { name } = HERO_CONFIG;
      const tl = gsap.timeline({
        delay: 0.1,
        onComplete: () => {
          // Trigger initial glitch burst upon arrival
          triggerGlitch(name.glitchDuration * 1000);
          if (onRevealComplete) onRevealComplete();
        },
      });

      // 1. Role label: Fade in + tighten letter-spacing from wide to normal
      if (roleRef.current) {
        tl.fromTo(
          roleRef.current,
          { opacity: 0, letterSpacing: "0.55em", x: -15 },
          {
            opacity: 1,
            letterSpacing: "0.3em",
            x: 0,
            duration: 0.7,
            ease: "power3.out",
          },
          0
        );
      }

      // 2. "DAFFA": Staggered clip upward per character
      if (lettersRef.current.length > 0) {
        tl.fromTo(
          lettersRef.current,
          { yPercent: 110, opacity: 0 },
          {
            yPercent: 0,
            opacity: 1,
            duration: name.revealDuration,
            stagger: name.letterStagger,
            ease: name.ease,
          },
          0.15
        );
      }

      // 3. "MUNAZZAL": Outline draw-in or reveal
      if (outlineTitleRef.current) {
        tl.fromTo(
          outlineTitleRef.current,
          { clipPath: "inset(0 100% 0 0)", opacity: 0 },
          {
            clipPath: "inset(0 0% 0 0)",
            opacity: 1,
            duration: 0.85,
            ease: "expo.out",
          },
          0.35
        );
      }
    }, containerRef);

    // Also listen for lights-out event from IntroOverlay if page starts with intro
    const handleLightsOut = () => {
      // Small speed line or pulse
    };
    window.addEventListener("f1:lights-out", handleLightsOut);

    return () => {
      window.removeEventListener("f1:lights-out", handleLightsOut);
      if (glitchTimerRef.current) clearTimeout(glitchTimerRef.current);
      ctx.revert();
    };
  }, [prefersReduced]);

  const nameChars = nameLine1.split("");

  return (
    <div
      ref={containerRef}
      className="relative select-none"
    >
      {/* ── Role Label ── */}
      <div className="overflow-hidden mb-2.5 sm:mb-3 md:mb-4">
        <p
          ref={roleRef}
          className="font-body text-xs md:text-sm lg:text-[15px] font-semibold uppercase text-red-drama flex items-center gap-2"
          style={{ letterSpacing: "var(--tracking-label, 0.28em)" }}
        >
          <span className="inline-block w-2.5 sm:w-3.5 h-0.5 bg-red-drama" />
          <span>{role}</span>
        </p>
      </div>

      {/* ── Solid Layer: "DAFFA" ── */}
      <div
        ref={solidTitleRef}
        onMouseEnter={() => triggerGlitch(180)}
        className={`font-display text-[clamp(2.2rem,8vw,3.6rem)] md:text-[clamp(4.8rem,8.8vw,9.8rem)] lg:text-[clamp(5.8rem,9.6vw,11.2rem)] xl:text-[clamp(6.8rem,10.2vw,12.5rem)] uppercase leading-[var(--name-line-height,0.96)] text-[var(--color-bone)] tracking-poster rgb-glitch ${
          isGlitching ? "is-glitching" : ""
        }`}
        data-text={nameLine1}
      >
        <div className="flex overflow-hidden py-1 px-0.5">
          {nameChars.map((char, index) => (
            <span
              key={index}
              ref={(el) => (lettersRef.current[index] = el)}
              className="inline-block will-change-transform font-display"
              style={{ fontFamily: "inherit" }}
            >
              {char}
            </span>
          ))}
        </div>
      </div>

      {/* ── Outline Layer: "MUNAZZAL" (Interactive Hover to Red Fill with breathing room) ── */}
      <div className="overflow-hidden py-1 px-0.5 mt-[var(--name-gap,0.04em)]">
        <div
          ref={outlineTitleRef}
          onMouseEnter={() => triggerGlitch(220)}
          className={`font-display text-[clamp(2.2rem,8vw,3.6rem)] md:text-[clamp(4.8rem,8.8vw,9.8rem)] lg:text-[clamp(5.8rem,9.6vw,11.2rem)] xl:text-[clamp(6.8rem,10.2vw,12.5rem)] uppercase leading-[var(--name-line-height,0.96)] tracking-poster hero-outline-interactive cursor-pointer select-none rgb-glitch ${
            isGlitching ? "is-glitching" : ""
          }`}
          data-text={nameLine2}
          title="Hover to ignite"
        >
          {nameLine2}
        </div>
      </div>
    </div>
  );
}

