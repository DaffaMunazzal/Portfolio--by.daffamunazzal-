/* src/components/ui/SectionTitle.jsx
   Reusable section title component that supports:
   - "solid" variant: regular filled text
   - "outline" variant: text-stroke with no fill (poster style)
   - "stacked" variant: solid + outline overlap (like LOOK LOCK reference)
   Animates words into view using Framer Motion stagger when whileInView fires.
   Theme-aware: outline stroke color adapts via CSS variable. */
import { motion } from "framer-motion";

const wordVariants = {
  hidden: { y: "110%", opacity: 0 },
  visible: (i) => ({
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.8,
      delay: i * 0.08,
      ease: [0.16, 1, 0.3, 1], // expo-out
    },
  }),
};

export default function SectionTitle({
  label,         // small uppercase label above the title
  title,         // main title text (can be a string or array of words)
  outlineTitle,  // optional: a second row rendered as outline text
  className = "",
  titleSize = "poster-lg",
}) {
  const words = Array.isArray(title) ? title : title.split(" ");

  return (
    <div className={`overflow-hidden ${className}`}>
      {/* Small label */}
      {label && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-2 font-body text-xs font-medium uppercase tracking-ultra-wide text-red-drama"
        >
          {label}
        </motion.p>
      )}

      {/* Main title — word-by-word reveal */}
      <div className="overflow-hidden">
        <div
          className={`font-display uppercase leading-none text-${titleSize} flex flex-wrap gap-x-[0.2em]`}
        >
          {words.map((word, i) => (
            <div key={i} className="overflow-hidden">
              <motion.span
                custom={i}
                variants={wordVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
                className="block text-[var(--color-bone)]"
              >
                {word}
              </motion.span>
            </div>
          ))}
        </div>
      </div>

      {/* Outline text row — rendered below, slightly overlapping via negative margin */}
      {outlineTitle && (
        <div className="overflow-hidden -mt-[0.05em]">
          <div
            className={`font-display uppercase leading-none text-${titleSize} flex flex-wrap gap-x-[0.2em]`}
          >
            {outlineTitle.split(" ").map((word, i) => (
              <div key={i} className="overflow-hidden">
                <motion.span
                  custom={i + words.length}
                  variants={wordVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.3 }}
                  className="block"
                  style={{
                    WebkitTextStroke: "1.5px var(--color-outline-stroke)",
                    WebkitTextFillColor: "transparent",
                    color: "transparent",
                  }}
                >
                  {word}
                </motion.span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
