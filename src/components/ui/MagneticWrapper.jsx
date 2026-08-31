/* src/components/ui/MagneticWrapper.jsx
   Wraps any child element with a magnetic hover effect:
   the child "follows" the cursor slightly when hovered.
   Auto-disabled on mobile/touch devices. */
import { useRef } from "react";
import { motion, useSpring } from "framer-motion";
import useIsMobile from "../../hooks/useIsMobile";

export default function MagneticWrapper({ children, strength = 0.35, className = "" }) {
  const isMobile = useIsMobile();
  const ref = useRef(null);

  // Spring-animated x/y for smooth magnetic movement
  const x = useSpring(0, { stiffness: 150, damping: 15, mass: 0.1 });
  const y = useSpring(0, { stiffness: 150, damping: 15, mass: 0.1 });

  if (isMobile) {
    return <div className={className}>{children}</div>;
  }

  const handleMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    // Offset from center of element
    const offsetX = e.clientX - rect.left - rect.width / 2;
    const offsetY = e.clientY - rect.top - rect.height / 2;
    x.set(offsetX * strength);
    y.set(offsetY * strength);
  };

  const handleMouseLeave = () => {
    // Spring back to origin
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      style={{ x, y }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={className}
    >
      {children}
    </motion.div>
  );
}
