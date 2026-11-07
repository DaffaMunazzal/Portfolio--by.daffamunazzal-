/* src/components/hero/ScrambleText.jsx
   Scramble text effect for "BUILD. THINK. DEPLOY."
   - Randomizes characters from [A-Z0-9#/_] and resolves sequentially
   - Word dots (".") blink with alternating red telemetry pulses
   - Re-scrambles briefly on hover
   - Respects prefers-reduced-motion
*/
import { useEffect, useRef, useState, useCallback } from "react";
import { HERO_CONFIG } from "./heroConfig";
import useReducedMotion from "../../hooks/useReducedMotion";

const CHARS = HERO_CONFIG.tagline.scrambleChars;

export default function ScrambleText({
  text = "BUILD. THINK. DEPLOY.",
  startTrigger = true,
  className = "",
}) {
  const prefersReduced = useReducedMotion();
  const [displayText, setDisplayText] = useState(text);
  const [isScrambling, setIsScrambling] = useState(false);
  const animFrameRef = useRef(null);
  const containerRef = useRef(null);

  const runScramble = useCallback(
    (durationFrames = 30) => {
      if (prefersReduced) {
        setDisplayText(text);
        return;
      }

      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      setIsScrambling(true);

      const length = text.length;
      let frame = 0;
      const totalFrames = durationFrames;

      const update = () => {
        frame++;
        const progress = frame / totalFrames;
        const resolvedCount = Math.floor(progress * length);

        let result = "";
        for (let i = 0; i < length; i++) {
          const targetChar = text[i];
          if (targetChar === " " || targetChar === ".") {
            result += targetChar;
          } else if (i < resolvedCount) {
            result += targetChar;
          } else {
            result += CHARS[Math.floor(Math.random() * CHARS.length)];
          }
        }

        setDisplayText(result);

        if (frame < totalFrames) {
          animFrameRef.current = requestAnimationFrame(update);
        } else {
          setDisplayText(text);
          setIsScrambling(false);
        }
      };

      animFrameRef.current = requestAnimationFrame(update);
    },
    [text, prefersReduced]
  );

  // Trigger when parent signals reveal completion
  useEffect(() => {
    if (startTrigger) {
      runScramble(38);
    }
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [startTrigger, runScramble]);

  // Re-trigger on hover
  const handleMouseEnter = () => {
    if (!isScrambling) {
      runScramble(22);
    }
  };

  // Render tokens so dots can have distinct red telemetry blinking
  // Split by words with dots, e.g. "BUILD." "THINK." "DEPLOY."
  const words = displayText.split(" ");

  return (
    <div
      ref={containerRef}
      onMouseEnter={handleMouseEnter}
      className={`inline-flex flex-nowrap whitespace-nowrap items-center gap-x-2.5 sm:gap-x-4 md:gap-x-6 cursor-default select-none ${className}`}
    >
      {words.map((word, wIdx) => {
        const hasDot = word.endsWith(".");
        const cleanWord = hasDot ? word.slice(0, -1) : word;
        const delayClass =
          wIdx === 0
            ? "animate-[pulse_1.4s_infinite]"
            : wIdx === 1
            ? "animate-[pulse_1.4s_0.45s_infinite]"
            : "animate-[pulse_1.4s_0.9s_infinite]";

        return (
          <span key={wIdx} className="inline-flex items-baseline shrink-0">
            <span className="tracking-ultra-wide">{cleanWord}</span>
            {hasDot && (
              <span
                className={`inline-block font-mono font-bold text-red-drama text-shadow-[0_0_8px_rgba(217,30,30,0.8)] ml-0.5 ${delayClass}`}
                style={{
                  color: "#D91E1E",
                  textShadow: "0 0 10px rgba(217, 30, 30, 0.9)",
                }}
              >
                .
              </span>
            )}
          </span>
        );
      })}
    </div>
  );
}

