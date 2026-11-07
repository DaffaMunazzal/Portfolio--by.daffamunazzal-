/* src/components/hero/ScrollIndicator.jsx
   F1 Cockpit Scroll Indicator:
   - Centered vertical telemetry guide with animated traveling marker
   - Monospace "SCROLL" telemetry label
   - Smooth jump to #about on click
*/
import { motion } from "framer-motion";
import useReducedMotion from "../../hooks/useReducedMotion";

export default function ScrollIndicator() {
  const prefersReduced = useReducedMotion();

  const handleScrollDown = () => {
    document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 select-none">
      <button
        onClick={handleScrollDown}
        className="group flex flex-col items-center gap-1.5 focus:outline-none cursor-pointer"
        aria-label="Scroll to next section"
      >
        <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-[var(--color-muted)] group-hover:text-red-drama transition-colors duration-200">
          SCROLL
        </span>

        {/* Vertical Track & Animated Beam */}
        <div className="relative w-[1.5px] h-9 bg-white/10 overflow-hidden rounded-full">
          {!prefersReduced ? (
            <motion.div
              className="absolute top-0 left-0 w-full h-3.5 bg-red-drama rounded-full shadow-[0_0_6px_#D91E1E]"
              animate={{
                y: [0, 24, 0],
              }}
              transition={{
                duration: 1.8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ) : (
            <div className="w-full h-3 bg-red-drama rounded-full" />
          )}
        </div>
      </button>
    </div>
  );
}

