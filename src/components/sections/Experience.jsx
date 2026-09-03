/* src/components/sections/Experience.jsx
   Vertical timeline section:
   - GSAP ScrollTrigger: the connecting line "grows" as you scroll
   - Dots glow when their item enters the viewport
   - Stagger reveal for each timeline item
   - Consumes modular experience list & content from LanguageContext */
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { GraduationCap, Briefcase, Award, Trophy } from "lucide-react";
import SectionTitle from "../ui/SectionTitle";
import { useLanguage } from "../../context/LanguageContext";

gsap.registerPlugin(ScrollTrigger);

const typeConfig = {
  education: { Icon: GraduationCap, color: "text-red-drama", bg: "bg-red-drama/10", border: "border-red-drama/40" },
  experience: { Icon: Briefcase, color: "text-[var(--color-bone)]", bg: "bg-[var(--color-bone)]/5", border: "border-[var(--color-white-10)]" },
  certification: { Icon: Award, color: "text-red-drama/70", bg: "bg-red-drama/5", border: "border-red-drama/20" },
  achievement: { Icon: Trophy, color: "text-[var(--color-bone)]", bg: "bg-[var(--color-bone)]/5", border: "border-[var(--color-white-10)]" },
};

function TimelineItem({ item, index }) {
  const { Icon, color, bg, border } = typeConfig[item.type] || typeConfig.experience;
  const isLeft = index % 2 === 0;

  return (
    <div className={`relative flex items-start gap-6 ${isLeft ? "lg:flex-row" : "lg:flex-row-reverse"} flex-col lg:gap-0`}>
      {/* Content card — desktop: half width, mobile: full */}
      <motion.div
        className="w-full lg:w-[calc(50%-2rem)]"
        initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className={`rounded-sm border ${border} bg-[var(--color-surface-2)] p-6 shadow-card hover:shadow-card-hover transition-shadow duration-300`}>
          {/* Year */}
          <p className="mb-2 font-body text-xs font-semibold uppercase tracking-ultra-wide text-red-drama">
            {item.year}
          </p>

          {/* Title */}
          <h3 className="mb-1 font-display text-xl uppercase leading-tight tracking-poster text-[var(--color-bone)]">
            {item.title}
          </h3>

          {/* Institution */}
          <p className="mb-3 font-body text-sm font-medium text-[var(--color-muted)]">
            {item.institution}{item.location && ` · ${item.location}`}
          </p>

          {/* Description */}
          <p className="mb-4 font-body text-sm leading-relaxed text-[var(--color-faint)]">
            {item.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {item.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-sm bg-[var(--color-white-5)] px-2 py-1 font-body text-[10px] font-medium uppercase tracking-widest text-[var(--color-faint)]"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Center dot + icon — hidden on mobile (replaced by left border) */}
      <div className="hidden lg:flex absolute left-1/2 top-6 -translate-x-1/2 z-10 items-center justify-center">
        <motion.div
          className={`flex h-10 w-10 items-center justify-center rounded-full ${bg} border-2 ${border}`}
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
        >
          <Icon size={16} className={color} />
        </motion.div>
      </div>

      {/* Spacer for the other side on desktop */}
      <div className="hidden lg:block lg:w-[calc(50%-2rem)]" />
    </div>
  );
}

export default function Experience() {
  const lineRef = useRef(null);
  const sectionRef = useRef(null);
  const { content, experience } = useLanguage();
  const expText = content.experience;

  // GSAP: animate the timeline line growing from top to bottom
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        lineRef.current,
        { scaleY: 0, transformOrigin: "top center" },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            end: "bottom 30%",
            scrub: 1,
          },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="experience" ref={sectionRef} className="relative bg-[var(--color-surface)] px-6 py-28 md:px-12 lg:py-40">
      <div className="pointer-events-none absolute left-0 bottom-0 h-80 w-80 rounded-full bg-red-drama/5 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl">
        <SectionTitle
          label={expText.sectionLabel}
          title={expText.title}
          outlineTitle={expText.outlineTitle}
          className="mb-16 md:mb-24"
        />

        {/* Timeline container */}
        <div className="relative">
          {/* Vertical line — only visible on desktop */}
          <div
            ref={lineRef}
            className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-gradient-to-b from-red-drama via-[var(--color-white-10)] to-transparent lg:block"
          />

          {/* Items */}
          <div className="flex flex-col gap-8 lg:gap-12">
            {experience.map((item, index) => (
              <TimelineItem key={item.id} item={item} index={index} />
            ))}
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 h-px w-full bg-[var(--color-white-5)]" />
    </section>
  );
}
