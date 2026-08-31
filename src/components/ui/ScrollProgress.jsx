/* src/components/ui/ScrollProgress.jsx
   Thin red progress bar at the very top of the viewport
   that fills as the user scrolls down the page. */
import { motion, useScroll, useSpring } from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  // Spring-smooth the raw scroll value for a buttery feel
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden="true"
      className="fixed left-0 top-0 z-[9998] h-[2px] w-full origin-left bg-red-drama"
      style={{ scaleX }}
    />
  );
}
