/* src/hooks/useMousePosition.js
   Tracks mouse position as normalized values (-1 to 1) and raw px values.
   Used by CustomCursor and MagneticWrapper. */
import { useState, useEffect } from "react";

export default function useMousePosition() {
  const [position, setPosition] = useState({ x: 0, y: 0, rawX: 0, rawY: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({
        // Normalized -1 to 1 relative to screen center
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1,
        // Raw pixel values
        rawX: e.clientX,
        rawY: e.clientY,
      });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return position;
}
