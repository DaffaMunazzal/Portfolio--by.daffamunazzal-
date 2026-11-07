/* src/hooks/useNametagVelocity.js
   Custom hook to subscribe to Matter.js nametag velocity & collision events.
   Zero React state updates per frame to avoid re-renders. */
import { useEffect, useRef } from "react";

export function useNametagVelocity({ onVelocity, onCollision } = {}) {
  const onVelocityRef = useRef(onVelocity);
  const onCollisionRef = useRef(onCollision);

  useEffect(() => {
    onVelocityRef.current = onVelocity;
  }, [onVelocity]);

  useEffect(() => {
    onCollisionRef.current = onCollision;
  }, [onCollision]);

  useEffect(() => {
    const handleVelocity = (e) => {
      if (onVelocityRef.current) {
        onVelocityRef.current(e.detail);
      }
    };

    const handleCollision = (e) => {
      if (onCollisionRef.current) {
        onCollisionRef.current(e.detail);
      }
    };

    window.addEventListener("nametag:velocity", handleVelocity, { passive: true });
    window.addEventListener("nametag:collision", handleCollision, { passive: true });

    return () => {
      window.removeEventListener("nametag:velocity", handleVelocity);
      window.removeEventListener("nametag:collision", handleCollision);
    };
  }, []);
}

export default useNametagVelocity;

