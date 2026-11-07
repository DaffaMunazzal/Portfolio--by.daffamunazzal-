/* src/components/hero/TelemetryRuler.jsx
   F1 Horizontal Telemetry Ruler with precision tick marks
   Positioned under the tagline and above CTAs
*/
export default function TelemetryRuler({ className = "" }) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none select-none flex flex-col gap-1 w-full max-w-md md:max-w-xl lg:max-w-2xl ${className}`}
    >
      {/* Telemetry line with tick marks */}
      <div className="relative w-full h-3 flex items-end">
        {/* Baseline */}
        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-white/15" />

        {/* Major & Minor Ticks */}
        <div className="relative w-full flex justify-between items-end h-full px-0.5">
          {[...Array(21)].map((_, i) => {
            const isMajor = i % 5 === 0;
            const isMid = i % 5 === 2;
            return (
              <div
                key={i}
                className={`w-[1px] ${isMajor
                    ? "h-2.5 bg-red-drama"
                    : isMid
                      ? "h-1.5 bg-white/30"
                      : "h-1 bg-white/15"
                  }`}
              />
            );
          })}
        </div>
      </div>

      {/* Numerical markers */}
      <div className="flex justify-between font-mono text-[8px] text-white/35 tracking-widest px-0.5">
        <span>00</span>
        <span>25</span>
        <span>50</span>
        <span>75</span>
        <span>100</span>
      </div>
    </div>
  );
}
