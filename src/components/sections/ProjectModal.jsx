/* src/components/sections/ProjectModal.jsx
   Full-screen modal for project details.
   Uses Framer Motion layoutId for shared-layout animation from card to modal.
   Closes on backdrop click or Escape key.
   i18n support + theme-aware via CSS variables */
import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, ChevronRight } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import Button from "../ui/Button";
import { useLanguage } from "../../context/LanguageContext";

export default function ProjectModal({ project, onClose }) {
  const { t } = useLanguage();

  // Close on Escape key
  useEffect(() => {
    const handler = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  return (
    <AnimatePresence>
      {project && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-[9950] bg-[var(--color-void)]/90 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal Panel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-4 z-[9960] overflow-y-auto rounded-sm bg-[var(--color-surface-2)] border border-[var(--color-white-10)] shadow-card-hover md:inset-8 lg:inset-16"
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute right-6 top-6 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-[var(--color-white-5)] text-[var(--color-bone)] hover:bg-red-drama/20 hover:text-red-drama transition-colors duration-200"
              aria-label="Close modal"
            >
              <X size={18} />
            </button>

            <div className="flex flex-col lg:flex-row">
              {/* Left — Image */}
              <div className="lg:w-1/2">
                <div className="relative h-64 overflow-hidden lg:h-full lg:min-h-[500px]">
                  {project.image ? (
                    <img
                      src={project.image}
                      alt={project.title}
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[var(--color-surface-3)] to-[var(--color-void)]">
                      <span className="font-display text-[8rem] leading-none text-[var(--color-white-5)]">
                        {String(project.id).padStart(2, "0")}
                      </span>
                    </div>
                  )}
                  {/* Category badge */}
                  <div className="absolute left-6 top-6 rounded-sm bg-red-drama px-3 py-1">
                    <span className="font-body text-xs font-semibold uppercase tracking-widest text-white">
                      {project.category}
                    </span>
                  </div>
                </div>
              </div>

              {/* Right — Content */}
              <div className="flex flex-col gap-6 p-8 lg:w-1/2 lg:p-12">
                <div>
                  <p className="mb-2 font-body text-xs font-semibold uppercase tracking-ultra-wide text-red-drama">
                    {project.year}
                  </p>
                  <h2 className="font-display text-3xl uppercase leading-tight tracking-poster text-[var(--color-bone)] lg:text-4xl">
                    {project.title}
                  </h2>
                </div>

                <p className="font-body text-base leading-relaxed text-[var(--color-muted)]">
                  {project.fullDesc}
                </p>

                {/* Tech stack */}
                <div>
                  <p className="mb-3 font-body text-xs uppercase tracking-ultra-wide text-[var(--color-faint)]">
                    {t("modal.techStack")}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((techItem) => (
                      <span
                        key={techItem}
                        className="rounded-sm border border-[var(--color-white-10)] bg-[var(--color-white-5)] px-3 py-1 font-body text-xs font-medium text-[var(--color-muted)]"
                      >
                        {techItem}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="h-px bg-[var(--color-white-5)]" />

                {/* Action buttons */}
                <div className="flex flex-wrap gap-4">
                  {project.github && (
                    <Button href={project.github} variant="outline" external className="gap-2">
                    <FaGithub size={16} />
                      GitHub
                    </Button>
                  )}
                  {project.demo && (
                    <Button href={project.demo} variant="primary" external className="gap-2">
                      <ExternalLink size={16} />
                      {t("modal.liveDemo")}
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
