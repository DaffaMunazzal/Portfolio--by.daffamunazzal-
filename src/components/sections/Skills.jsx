/* src/components/sections/Skills.jsx
   Skills section with:
   - 4 category cards in a stagger-reveal grid
   - 3D tilt effect on mouse move (desktop only)
   - Skill bars with scroll-triggered fill animation
   - i18n support
   - Theme-aware via CSS variables */
import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Code2, Database, BarChart3, Wrench } from "lucide-react";
import { skillGroups } from "../../data/skills";
import SectionTitle from "../ui/SectionTitle";
import useIsMobile from "../../hooks/useIsMobile";
import { useLanguage } from "../../context/LanguageContext";

const iconMap = { Code2, Database, BarChart3, Wrench };

/* 3D Tilt Card */
function TiltCard({ children, className }) {
  const isMobile = useIsMobile();
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });

  const handleMouseMove = (e) => {
    if (isMobile) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;  // -0.5 to 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ rotateX: -y * 12, rotateY: x * 12 });
  };

  const handleMouseLeave = () => setTilt({ rotateX: 0, rotateY: 0 });

  return (
    <motion.div
      ref={cardRef}
      className={className}
      style={{ transformStyle: "preserve-3d", perspective: 800 }}
      animate={{ rotateX: tilt.rotateX, rotateY: tilt.rotateY }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </motion.div>
  );
}

/* Animated skill bar */
function SkillBar({ name, level }) {
  return (
    <div className="group">
      <div className="mb-1.5 flex justify-between">
        <span className="font-body text-sm text-[var(--color-muted)] group-hover:text-[var(--color-bone)] transition-colors duration-200">
          {name}
        </span>
        <span className="font-body text-xs text-[var(--color-faint)]">{level}%</span>
      </div>
      <div className="h-px w-full bg-[var(--color-white-10)]">
        <motion.div
          className="h-px bg-gradient-to-r from-red-drama to-red-drama/40"
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>
    </div>
  );
}

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};

export default function Skills() {
  const { t } = useLanguage();

  return (
    <section id="skills" className="relative bg-[var(--color-surface)] px-6 py-28 md:px-12 lg:py-40">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute right-0 top-1/2 h-[40rem] w-96 -translate-y-1/2 translate-x-1/2 rounded-full bg-red-drama/5 blur-[150px]" />

      <div className="relative mx-auto max-w-7xl">
        <SectionTitle
          label={t("skills.label")}
          title={t("skills.title")}
          outlineTitle={t("skills.outlineTitle")}
          className="mb-16 md:mb-24"
        />

        <motion.div
          className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {skillGroups.map((group) => {
            const Icon = iconMap[group.icon];
            return (
              <motion.div key={group.id} variants={cardVariants}>
                <TiltCard className="h-full">
                  <div
                    className="flex h-full flex-col gap-6 rounded-sm bg-[var(--color-surface-2)] p-6 shadow-card hover:shadow-card-hover transition-shadow duration-300 border border-[var(--color-white-5)] hover:border-red-drama/20"
                    style={{ transform: "translateZ(0)" }}
                  >
                    {/* Card header */}
                    <div className="flex items-start justify-between">
                      <div className="flex h-10 w-10 items-center justify-center rounded-sm bg-red-drama/10 text-red-drama">
                        <Icon size={20} />
                      </div>
                      <span className="font-display text-5xl leading-none text-[var(--color-white-5)]">
                        0{skillGroups.indexOf(group) + 1}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="font-body text-sm font-semibold uppercase tracking-widest text-[var(--color-bone)]">
                      {group.label}
                    </h3>

                    {/* Skill bars */}
                    <div className="flex flex-col gap-4 flex-1">
                      {group.skills.map((skill) => (
                        <SkillBar key={skill.name} {...skill} />
                      ))}
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 h-px w-full bg-[var(--color-white-5)]" />
    </section>
  );
}
