/* src/hooks/useIsMobile.js
   Returns true if the current device is a touch/mobile device.
   Used to disable heavy effects (custom cursor, magnetic, tilt) on mobile. */
import { useState, useEffect } from "react";

export default function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => {
      setIsMobile(
        window.matchMedia("(hover: none) and (pointer: coarse)").matches ||
          window.innerWidth < 768
      );
    };

    check();
    window.addEventListener("resize", check, { passive: true });
    return () => window.removeEventListener("resize", check);
  }, []);

  return isMobile;
}
