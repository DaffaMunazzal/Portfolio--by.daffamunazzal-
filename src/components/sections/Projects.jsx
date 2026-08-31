/* src/components/sections/Projects.jsx
   Projects grid with:
   - Category filter tabs with AnimatePresence transitions
   - 3-col desktop / 1-col mobile grid
   - Card tap/hover effects
   - Grayscale thumbnail → color on hover
   - Opens ProjectModal with layoutId shared animation
   - i18n support
   - Theme-aware via CSS variables */
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Eye } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { projects, projectCategories } from "../../data/projects";
import SectionTitle from "../ui/SectionTitle";
import ProjectModal from "./ProjectModal";
import { useLanguage } from "../../context/LanguageContext";

function ProjectCard({ project, onOpen, t }) {
  return (
    <motion.article
      className="group relative flex cursor-pointer flex-col gap-4 overflow-hidden rounded-sm bg-[var(--color-surface-2)] border border-[var(--color-white-5)] hover:border-red-drama/30 transition-all duration-300 shadow-card hover:shadow-card-hover"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onOpen(project)}
    >
      {/* Thumbnail */}
      <div className="relative h-44 overflow-hidden bg-gradient-to-br from-[var(--color-surface-3)] to-[var(--color-void)]">
        {/* Project image or number watermark fallback */}
        {project.image ? (
          <img
            src={project.image}
            alt={project.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <span className="absolute right-4 bottom-2 font-display text-7xl leading-none text-[var(--color-white-5)] select-none group-hover:text-[var(--color-white-10)] transition-colors duration-300">
            {String(project.id).padStart(2, "0")}
          </span>
        )}

        {/* Hover overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-red-drama/0 group-hover:bg-red-drama/10 transition-colors duration-300">
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1, opacity: 1 }}
            className="flex items-center gap-2 rounded-full bg-[var(--color-bone)]/10 px-4 py-2 backdrop-blur-sm"
          >
            <Eye size={14} className="text-[var(--color-bone)]" />
            <span className="font-body text-xs font-medium uppercase tracking-widest text-[var(--color-bone)]">
              {t("projects.view")}
            </span>
          </motion.div>
        </div>

        {/* Category badge */}
        <div className="absolute left-4 top-4">
          <span className="rounded-sm bg-red-drama/90 px-2 py-1 font-body text-[10px] font-semibold uppercase tracking-widest text-white">
            {project.category}
          </span>
        </div>

        {project.featured && (
          <div className="absolute right-4 top-4">
            <span className="rounded-sm bg-[var(--color-bone)]/10 backdrop-blur-sm px-2 py-1 font-body text-[10px] font-semibold uppercase tracking-widest text-[var(--color-bone)]/70">
              {t("projects.featured")}
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col gap-3 p-5 pt-0">
        <div>
          <p className="mb-1 font-body text-[10px] uppercase tracking-ultra-wide text-[var(--color-faint)]">
            {project.year}
          </p>
          <h3 className="font-display text-xl uppercase leading-tight tracking-poster text-[var(--color-bone)] group-hover:text-red-drama/80 transition-colors duration-200">
            {project.title}
          </h3>
        </div>

        <p className="font-body text-sm leading-relaxed text-[var(--color-muted)] line-clamp-2">
          {project.shortDesc}
        </p>

        {/* Tech badges */}
        <div className="flex flex-wrap gap-1.5">
          {project.tech.slice(0, 3).map((t) => (
            <span
              key={t}
              className="rounded-sm bg-[var(--color-white-5)] px-2 py-1 font-body text-[10px] font-medium text-[var(--color-faint)]"
            >
              {t}
            </span>
          ))}
          {project.tech.length > 3 && (
            <span className="rounded-sm bg-[var(--color-white-5)] px-2 py-1 font-body text-[10px] font-medium text-[var(--color-faint)]">
              +{project.tech.length - 3}
            </span>
          )}
        </div>

        {/* Bottom row */}
        <div className="flex items-center gap-3 pt-1">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="text-[var(--color-faint)] hover:text-[var(--color-bone)] transition-colors duration-200"
              aria-label="GitHub repository"
            >
          <FaGithub size={16} />
            </a>
          )}
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="text-[var(--color-faint)] hover:text-red-drama transition-colors duration-200"
              aria-label="Live demo"
            >
              <ExternalLink size={16} />
            </a>
          )}
          <span className="ml-auto font-body text-xs uppercase tracking-widest text-[var(--color-faint)] group-hover:text-[var(--color-bone)] transition-colors duration-200">
            {t("projects.viewDetails")}
          </span>
        </div>
      </div>
    </motion.article>
  );
}

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedProject, setSelectedProject] = useState(null);
  const { t } = useLanguage();

  const filtered =
    activeCategory === "All"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <>
      <section id="projects" className="relative bg-[var(--color-void)] px-6 py-28 md:px-12 lg:py-40">
        {/* Ambient */}
        <div className="pointer-events-none absolute left-1/2 top-0 h-80 w-80 -translate-x-1/2 rounded-full bg-red-drama/5 blur-[120px]" />

        <div className="relative mx-auto max-w-7xl">
          <SectionTitle
            label={t("projects.label")}
            title={t("projects.title")}
            outlineTitle={t("projects.outlineTitle")}
            className="mb-12"
          />

          {/* Filter Tabs */}
          <div className="mb-12 flex flex-wrap gap-2">
            {projectCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`relative px-5 py-2 font-body text-xs font-semibold uppercase tracking-ultra-wide transition-colors duration-200 rounded-sm ${
                  activeCategory === cat
                    ? "text-white"
                    : "text-[var(--color-faint)] hover:text-[var(--color-muted)]"
                }`}
              >
                {activeCategory === cat && (
                  <motion.div
                    layoutId="filter-pill"
                    className="absolute inset-0 rounded-sm bg-red-drama"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{cat}</span>
              </button>
            ))}
          </div>

          {/* Projects Grid */}
          <motion.div layout className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {filtered.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onOpen={setSelectedProject}
                  t={t}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        </div>

        <div className="absolute bottom-0 left-0 h-px w-full bg-[var(--color-white-5)]" />
      </section>

      {/* Modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
