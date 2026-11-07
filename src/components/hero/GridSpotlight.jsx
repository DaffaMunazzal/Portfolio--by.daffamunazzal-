/* src/components/hero/GridSpotlight.jsx
   F1 Cockpit Background:
   - Precision grid with cursor-tracking radial spotlight (via CSS vars --mx, --my)
   - Deep pulsating red atmospheric glow behind name
   - Single-pass F1 speed streaks sweeping once after intro
   - Flashes glow subtly on nametag collision
   - Disabled on mobile / touch for maximum performance
*/
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import useIsMobile from "../../hooks/useIsMobile";
import useReducedMotion from "../../hooks/useReducedMotion";
import useNametagVelocity from "../../hooks/useNametagVelocity";

export default function GridSpotlight({ triggerSpeedLines = false }) {
  const containerRef = useRef(null);
  const glowRef = useRef(null);
  const speedLinesRef = useRef([]);
  const isMobile = useIsMobile();
  const prefersReduced = useReducedMotion();

  // Pulse glow on nametag collision
  useNametagVelocity({
    onCollision: (detail) => {
      if (!glowRef.current || prefersReduced) return;
      const intensity = detail?.intensity || 0.6;
      gsap.fromTo(
        glowRef.current,
        {
          opacity: 0.35 + intensity * 0.25,
          scale: 1.12,
        },
        {
          opacity: 0.2,
          scale: 1.0,
          duration: 0.45,
          ease: "power2.out",
        }
      );
    },
  });

  // Mouse tracking spotlight for desktop
  useEffect(() => {
    if (isMobile || prefersReduced || !containerRef.current) return;

    const el = containerRef.current;
    let animFrame = null;
    let targetX = window.innerWidth * 0.4;
    let targetY = window.innerHeight * 0.5;
    let currentX = targetX;
    let currentY = targetY;

    const handleMouseMove = (e) => {
      const rect = el.getBoundingClientRect();
      targetX = e.clientX - rect.left;
      targetY = e.clientY - rect.top;
    };

    const loop = () => {
      // Lerp for smooth trailing spotlight
      currentX += (targetX - currentX) * 0.12;
      currentY += (targetY - currentY) * 0.12;

      el.style.setProperty("--mx", `${currentX}px`);
      el.style.setProperty("--my", `${currentY}px`);

      animFrame = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    animFrame = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (animFrame) cancelAnimationFrame(animFrame);
    };
  }, [isMobile, prefersReduced]);

  // Ambient red glow breathing loop
  useEffect(() => {
    if (!glowRef.current || prefersReduced) return;

    const ctx = gsap.context(() => {
      gsap.to(glowRef.current, {
        scale: 1.15,
        x: "+=25",
        y: "-=20",
        duration: 9.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, glowRef);

    return () => ctx.revert();
  }, [prefersReduced]);

  // Single-pass F1 speed lines sweep
  useEffect(() => {
    if (!triggerSpeedLines || prefersReduced || isMobile) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        speedLinesRef.current,
        { xPercent: -120, opacity: 0 },
        {
          xPercent: 180,
          opacity: 0.8,
          duration: 0.65,
          stagger: 0.08,
          ease: "power4.in",
          onComplete: () => {
            gsap.set(speedLinesRef.current, { opacity: 0 });
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [triggerSpeedLines, prefersReduced, isMobile]);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden select-none"
      style={{
        "--mx": "45%",
        "--my": "50%",
      }}
    >
      {/* ── Precision Telemetry Grid with Radial Spotlight Mask ── */}
      <div
        className="absolute inset-0 f1-grid-background opacity-[0.07]"
        style={
          isMobile
            ? undefined
            : {
                maskImage:
                  "radial-gradient(circle 520px at var(--mx) var(--my), black 10%, transparent 80%)",
                WebkitMaskImage:
                  "radial-gradient(circle 520px at var(--mx) var(--my), black 10%, transparent 80%)",
              }
        }
      />

      {/* ── Primary Ambient Red Glow (Behind Name) ── */}
      <div
        ref={glowRef}
        className="absolute left-[5%] top-[15%] h-[55vh] w-[75vw] md:h-[65vh] md:w-[55vw] rounded-full bg-red-drama opacity-20 blur-[120px] md:blur-[160px] will-change-transform"
      />

      {/* ── Secondary Deep Glow (Near Left Base) ── */}
      <div className="absolute -left-24 bottom-1/4 h-[35vh] w-[45vw] md:h-[40vh] md:w-[35vw] rounded-full bg-red-deep opacity-12 blur-[100px] md:blur-[140px]" />

      {/* ── Single-pass F1 Speed Streaks ── */}
      {!isMobile && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[22, 38, 54].map((topPercent, idx) => (
            <div
              key={idx}
              ref={(el) => (speedLinesRef.current[idx] = el)}
              className="absolute left-0 w-[45vw] h-[1px] bg-gradient-to-r from-transparent via-red-drama to-transparent opacity-0 will-change-transform"
              style={{ top: `${topPercent}%` }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

