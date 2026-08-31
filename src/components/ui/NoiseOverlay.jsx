/* src/components/ui/NoiseOverlay.jsx
   Fixed full-screen SVG noise layer for film grain / magazine texture effect.
   pointer-events: none so it doesn't block any interactions. */
export default function NoiseOverlay() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden"
      style={{ mixBlendMode: "overlay" }}
    >
      {/* SVG turbulence noise — the "grain" texture */}
      <svg
        className="h-full w-full opacity-[0.055]"
        style={{ animation: "grain-shift 0.4s steps(2) infinite" }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <filter id="noise">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.75"
            numOctaves="4"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#noise)" />
      </svg>
    </div>
  );
}
