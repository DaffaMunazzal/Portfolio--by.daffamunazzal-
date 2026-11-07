/* src/components/hero/HudLayer.jsx
   F1 Cockpit Telemetry HUD Layer
   - Animated corner brackets [ ] drawn at hero edges
   - Monospace telemetry text: "01 — INTRO", "SYS.STATUS: ONLINE", Realtime WIB clock, Coordinates, v1.0
   - Telemetry ruler with precision tick marks
   - All pointer-events: none, aria-hidden: true
   - Responsive: streamlines automatically on mobile
*/
import { useEffect, useState, useRef } from "react";
import { gsap } from "gsap";
import { HERO_CONFIG } from "./heroConfig";
import useReducedMotion from "../../hooks/useReducedMotion";

export default function HudLayer({ isIntroFinished = true }) {
  const [currentTime, setCurrentTime] = useState("");
  const hudRef = useRef(null);
  const bracketsRef = useRef([]);
  const prefersReduced = useReducedMotion();

  // Real-time WIB Clock (UTC+7)
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // Format in UTC+7 (Jakarta / WIB)
      const options = {
        timeZone: "Asia/Jakarta",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      };
      const timeStr = new Intl.DateTimeFormat("en-GB", options).format(now);
      setCurrentTime(`${timeStr} WIB`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Corner brackets draw-on animation when intro completes
  useEffect(() => {
    if (!isIntroFinished) return;
    if (prefersReduced) {
      bracketsRef.current.forEach((el) => {
        if (el) gsap.set(el, { opacity: 1, scale: 1 });
      });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        bracketsRef.current,
        { opacity: 0, scale: 0.8 },
        {
          opacity: 0.7,
          scale: 1,
          duration: 0.9,
          stagger: 0.08,
          ease: "expo.out",
          delay: 0.2,
        }
      );
    }, hudRef);

    return () => ctx.revert();
  }, [isIntroFinished, prefersReduced]);

  const { hud } = HERO_CONFIG;

  return (
    <div
      ref={hudRef}
      aria-hidden="true"
      className="pointer-events-none select-none absolute inset-0 z-10 overflow-hidden font-mono text-[10px] sm:text-[11px] text-white/50"
    >
      {/* ── Corner Bracket: Top Left ── */}
      <div
        ref={(el) => (bracketsRef.current[0] = el)}
        className="absolute top-20 sm:top-24 left-4 sm:left-8 w-5 sm:w-7 h-5 sm:h-7 border-t-2 border-l-2 border-red-drama/70 will-change-transform"
      >
        <span className="absolute -top-1.5 -left-1.5 w-1 h-1 bg-red-drama" />
      </div>

      {/* ── Corner Bracket: Top Right ── */}
      <div
        ref={(el) => (bracketsRef.current[1] = el)}
        className="absolute top-20 sm:top-24 right-4 sm:right-8 w-5 sm:w-7 h-5 sm:h-7 border-t-2 border-r-2 border-red-drama/70 will-change-transform"
      >
        <span className="absolute -top-1.5 -right-1.5 w-1 h-1 bg-red-drama" />
      </div>

      {/* ── Corner Bracket: Bottom Left ── */}
      <div
        ref={(el) => (bracketsRef.current[2] = el)}
        className="absolute bottom-6 sm:bottom-8 left-4 sm:left-8 w-5 sm:w-7 h-5 sm:h-7 border-b-2 border-l-2 border-red-drama/70 will-change-transform"
      >
        <span className="absolute -bottom-1.5 -left-1.5 w-1 h-1 bg-red-drama" />
      </div>

      {/* ── Corner Bracket: Bottom Right ── */}
      <div
        ref={(el) => (bracketsRef.current[3] = el)}
        className="absolute bottom-6 sm:bottom-8 right-4 sm:right-8 w-5 sm:w-7 h-5 sm:h-7 border-b-2 border-r-2 border-red-drama/70 will-change-transform"
      >
        <span className="absolute -bottom-1.5 -right-1.5 w-1 h-1 bg-red-drama" />
      </div>

      {/* ── Top Left Telemetry Tag ── */}
      <div className="absolute top-24 left-12 sm:left-18 hidden sm:flex items-center gap-2 tracking-[0.25em] text-white/60">
        <span className="w-1.5 h-1.5 bg-red-drama rounded-sm" />
        <span>{hud.sectionIndex}</span>
      </div>

      {/* ── Top Right System Telemetry ── */}
      <div className="absolute top-24 right-12 sm:right-18 hidden md:flex items-center gap-3 tracking-[0.2em] text-white/60">
        <span>LOC: PEKALONGAN, ID</span>
        <span className="text-red-drama">/</span>
        <span>LAT: {hud.coordinates}</span>
      </div>

      {/* ── Bottom Right: SYS.STATUS ── */}
      <div className="absolute bottom-8 right-8 sm:right-16 flex items-center gap-2 tracking-[0.25em] text-white/70 bg-black/40 backdrop-blur-xs px-2.5 py-1 rounded border border-white/5">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
        </span>
        <span className="font-semibold">{hud.statusText}</span>
      </div>

      {/* ── Bottom Left: Clock & Coordinate Stream ── */}
      <div className="absolute bottom-8 left-8 sm:left-16 hidden sm:flex flex-col gap-0.5 tracking-[0.2em] text-white/60">
        <div className="flex items-center gap-2">
          <span className="text-red-drama font-bold">▶</span>
          <span className="text-white/80 font-mono">{currentTime || "00:00:00 WIB"}</span>
          <span className="text-white/30">•</span>
          <span>{hud.version}</span>
        </div>
        <div className="text-[9px] text-white/40 tracking-[0.25em]">
          COORDS: {hud.coordinates}
        </div>
      </div>
    </div>
  );
}

