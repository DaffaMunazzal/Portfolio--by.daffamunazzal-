/* src/components/ui/Button.jsx
   Reusable CTA button with:
   - Ripple effect on click
   - Scale-down on press (active state)
   - Variants: "primary" (red filled), "outline" (bordered), "ghost" */
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Button({
  children,
  onClick,
  href,
  variant = "primary",
  className = "",
  external = false,
  ...props
}) {
  const [ripples, setRipples] = useState([]);

  const handleClick = (e) => {
    // Create ripple at click position
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = Date.now();

    setRipples((prev) => [...prev, { id, x, y }]);
    setTimeout(() => setRipples((prev) => prev.filter((r) => r.id !== id)), 700);

    onClick?.(e);
  };

  const baseStyles =
    "relative overflow-hidden inline-flex items-center gap-2 font-body font-semibold text-sm uppercase tracking-ultra-wide transition-all duration-300 cursor-pointer select-none";

  const variants = {
    primary:
      "bg-red-drama text-bone px-8 py-4 hover:bg-red-deep active:scale-95",
    outline:
      "border border-bone text-bone px-8 py-4 hover:bg-bone hover:text-void active:scale-95",
    ghost:
      "text-bone px-4 py-2 hover:text-red-drama active:scale-95",
  };

  const Component = href ? motion.a : motion.button;
  const linkProps = href
    ? { href, target: external ? "_blank" : "_self", rel: external ? "noopener noreferrer" : undefined }
    : {};

  return (
    <Component
      {...linkProps}
      onClick={handleClick}
      className={`${baseStyles} ${variants[variant]} ${className}`}
      whileTap={{ scale: 0.95 }}
      {...props}
    >
      {children}

      {/* Ripple effects */}
      <AnimatePresence>
        {ripples.map(({ id, x, y }) => (
          <motion.span
            key={id}
            className="pointer-events-none absolute rounded-full bg-white/20"
            style={{ left: x, top: y, translateX: "-50%", translateY: "-50%" }}
            initial={{ width: 0, height: 0, opacity: 0.6 }}
            animate={{ width: 200, height: 200, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
        ))}
      </AnimatePresence>
    </Component>
  );
}
