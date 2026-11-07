/* src/components/hero/IntroOverlay.jsx
   F1 "Lights Out" Grand Prix Start Sequence Intro
   - Master GSAP Timeline (max 2.8s total)
   - Phase A (0-1.1s): Monospace counter 000 -> 100 + thin red progress bar
   - Phase B (1.1-2.1s): 5 red lights ignite sequentially, brief tension hold, then instant "LIGHTS OUT"
   - Phase C (2.1-2.7s): Dual-panel / clip wipe revealing the hero HUD
   - Only plays once per session (sessionStorage)
   - Skip button + ESC key listener
   - prefers-reduced-motion disables immediately
*/
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { HERO_CONFIG } from "./heroConfig";
import useReducedMotion from "../../hooks/useReducedMotion";

export default function IntroOverlay({ onComplete }) {
  const overlayRef = useRef(null);
  const counterRef = useRef(null);
  const progressBarRef = useRef(null);
  const lightsRef = useRef([]);
  const topPanelRef = useRef(null);
  const bottomPanelRef = useRef(null);
  const hairlineRef = useRef(null);
  const masterTlRef = useRef(null);

  const prefersReduced = useReducedMotion();
  const [isVisible, setIsVisible] = useState(() => {
    if (typeof window === "undefined") return false;
    const seen = sessionStorage.getItem(HERO_CONFIG.intro.sessionKey);
    return !seen;
  });

  // Finish and dismiss intro
  const finishIntro = () => {
    if (typeof window !== "undefined") {
      sessionStorage.setItem(HERO_CONFIG.intro.sessionKey, "true");
      window.dispatchEvent(new CustomEvent("f1:intro-complete"));
    }
    if (onComplete) onComplete();
    setIsVisible(false);
  };

  useEffect(() => {
    // If reduced motion is preferred or already seen, skip immediately
    if (prefersReduced || !isVisible) {
      finishIntro();
      return;
    }

    const ctx = gsap.context(() => {
      const { intro } = HERO_CONFIG;
      const masterTl = gsap.timeline({
        onComplete: finishIntro,
      });
      masterTlRef.current = masterTl;

      // Initial state
      gsap.set(lightsRef.current, {
        backgroundColor: "#1C1C1E",
        boxShadow: "inset 0 2px 4px rgba(0,0,0,0.8), 0 0 0 rgba(217, 30, 30, 0)",
        borderColor: "rgba(255,255,255,0.08)",
      });

      const counterObj = { val: 0 };

      // ── PHASE A: Initializing counter (000 -> 100) ──
      masterTl.to(counterObj, {
        val: 100,
        duration: intro.counterDuration,
        ease: "power2.inOut",
        onUpdate: () => {
          if (counterRef.current) {
            const formatted = Math.floor(counterObj.val).toString().padStart(3, "0");
            counterRef.current.textContent = `${formatted}%`;
          }
        },
      }, 0);

      masterTl.to(progressBarRef.current, {
        scaleX: 1,
        duration: intro.counterDuration,
        ease: "power2.inOut",
      }, 0);

      // ── PHASE B: 5 Red Lights ignite sequentially ──
      const lightsStartTime = intro.counterDuration * 0.95;

      lightsRef.current.forEach((light, i) => {
        masterTl.to(
          light,
          {
            backgroundColor: "#D91E1E",
            borderColor: "#FF4D4D",
            boxShadow:
              "0 0 25px 6px rgba(217, 30, 30, 0.95), 0 0 50px 15px rgba(255, 41, 41, 0.6), inset 0 0 10px #FFA3A3",
            duration: 0.08,
            ease: "power1.in",
          },
          lightsStartTime + i * intro.lightInterval
        );
      });

      // Brief tension hold with all 5 lights beaming
      const allOnTime =
        lightsStartTime + (intro.lightsCount - 1) * intro.lightInterval + 0.1;

      // Instant "LIGHTS OUT" - all 5 lights switch off simultaneously!
      const lightsOutTime = allOnTime + intro.lightsHoldDuration;
      masterTl.to(
        lightsRef.current,
        {
          backgroundColor: "#111113",
          borderColor: "rgba(255,255,255,0.05)",
          boxShadow: "0 0 0 rgba(217, 30, 30, 0)",
          duration: 0.04,
        },
        lightsOutTime
      );

      // Signal hero to start revealing precisely at lights out
      masterTl.call(() => {
        window.dispatchEvent(new CustomEvent("f1:lights-out"));
      }, null, lightsOutTime);

      // ── PHASE C: Mechanical Split Wipe ──
      const wipeStartTime = lightsOutTime + 0.12;

      // Flash hairline red divider
      masterTl.to(hairlineRef.current, {
        opacity: 1,
        duration: 0.08,
      }, wipeStartTime);

      // Split panels wipe apart (top panel slides up, bottom slides down)
      masterTl.to(topPanelRef.current, {
        yPercent: -100,
        duration: intro.wipeDuration,
        ease: "expo.inOut",
      }, wipeStartTime);

      masterTl.to(bottomPanelRef.current, {
        yPercent: 100,
        duration: intro.wipeDuration,
        ease: "expo.inOut",
      }, wipeStartTime);

      masterTl.to(hairlineRef.current, {
        scaleX: 0,
        opacity: 0,
        duration: intro.wipeDuration * 0.8,
        ease: "power3.in",
      }, wipeStartTime + 0.08);

      masterTl.to(overlayRef.current, {
        opacity: 0,
        duration: 0.15,
        ease: "none",
      }, wipeStartTime + intro.wipeDuration - 0.15);
    }, overlayRef);

    // Keyboard ESC to skip
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        if (masterTlRef.current) masterTlRef.current.kill();
        finishIntro();
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      ctx.revert();
    };
  }, [prefersReduced, isVisible]);

  if (!isVisible) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[10000] overflow-hidden select-none"
      aria-hidden="true"
    >
      {/* Top Split Panel */}
      <div
        ref={topPanelRef}
        className="absolute top-0 left-0 w-full h-1/2 bg-[#0A0A0A] border-b border-white/5 will-change-transform z-10 flex flex-col justify-end items-center pb-6 md:pb-8"
      >
        {/* F1 Gantry Top Structure */}
        <div className="flex flex-col items-center">
          <div className="text-[10px] md:text-xs font-mono tracking-[0.3em] uppercase text-neutral-400 mb-3 flex items-center gap-2">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-red-drama animate-pulse" />
            FIA START SEQUENCE READY
          </div>

          {/* 5 Lights Housing Gantry */}
          <div className="flex items-center gap-3 sm:gap-4 md:gap-6 px-5 py-3 md:px-7 md:py-4 bg-[#141416] border border-white/10 rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.8)]">
            {[0, 1, 2, 3, 4].map((idx) => (
              <div
                key={idx}
                className="flex flex-col items-center gap-1.5"
              >
                {/* Individual Light Pod */}
                <div
                  ref={(el) => (lightsRef.current[idx] = el)}
                  className="w-7 h-7 sm:w-9 sm:h-9 md:w-11 md:h-11 rounded-full border border-white/10 transition-colors will-change-transform"
                />
                <span className="text-[8px] font-mono text-neutral-400">
                  0{idx + 1}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Red Laser Hairline Center Divider */}
      <div
        ref={hairlineRef}
        className="absolute top-1/2 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#FF2929] to-transparent z-30 opacity-0 pointer-events-none transform -translate-y-1/2"
      />

      {/* Bottom Split Panel */}
      <div
        ref={bottomPanelRef}
        className="absolute bottom-0 left-0 w-full h-1/2 bg-[#0A0A0A] border-t border-white/5 will-change-transform z-10 flex flex-col justify-between p-6 md:p-10"
      >
        {/* Status Callout */}
        <div className="pt-2 text-center">
          <p className="text-xs md:text-sm font-mono tracking-[0.25em] text-neutral-400 uppercase">
            LIGHTS OUT AND AWAY WE GO
          </p>
        </div>

        {/* Footer: Counter & Skip Button */}
        <div className="flex items-end justify-between w-full">
          {/* Bottom Left: Initializing Monospace Counter */}
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-red-drama rounded-sm animate-ping" />
              <span className="text-[10px] md:text-xs font-mono uppercase tracking-[0.2em] text-neutral-400">
                INITIALIZING SYSTEM
              </span>
            </div>

            <div
              ref={counterRef}
              className="text-2xl md:text-4xl font-mono font-bold tracking-tight text-[#F5F5F0]"
            >
              000%
            </div>

            {/* Thin Red Progress Bar */}
            <div className="w-36 md:w-56 h-[2px] bg-neutral-800 overflow-hidden rounded-full mt-1">
              <div
                ref={progressBarRef}
                className="h-full w-full bg-red-drama origin-left scale-x-0"
              />
            </div>
          </div>

          {/* Bottom Right: Skip Button */}
          <button
            onClick={() => {
              if (masterTlRef.current) masterTlRef.current.kill();
              finishIntro();
            }}
            className="group flex items-center gap-2 px-3.5 py-1.5 rounded-md border border-white/10 hover:border-red-drama/60 bg-white/[0.03] hover:bg-red-drama/10 transition-all duration-200 text-[11px] font-mono text-neutral-400 hover:text-white"
          >
            <span>SKIP INTRO</span>
            <span className="text-[9px] px-1 py-0.5 rounded bg-white/10 group-hover:bg-red-drama/30 text-neutral-300">
              ESC
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

