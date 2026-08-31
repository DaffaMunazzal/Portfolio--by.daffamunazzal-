/* src/components/sections/About.jsx
   About section with:
   - Two-column layout (photo left, text right)
   - Animated counting stats (GSAP CountTo on scroll enter)
   - Framer Motion text reveal
   - i18n support
   - Theme-aware via CSS variables */
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionTitle from "../ui/SectionTitle";
import { useLanguage } from "../../context/LanguageContext";
import profileImg from "../../assets/images/profile.png";

gsap.registerPlugin(ScrollTrigger);

// TODO: REPLACE with your real information
const BIO = {
  name: "Muhammad Daffa Oemarqois Munazzal",                  // TODO
  university: "Institut Widya Pratama",      // TODO
  major: "Sistem Informasi",
  year: "Semester 3, Angkatan 2025",  // TODO
  interests: "Web Development, Database Management Systems, Machine Learning, UI/UX Design, dan Analisis Data",
  value:
    "Programming bukan hanya sebuah teknologi, namun bagian dari lifestyle",
};

const STATS_KEYS = [
  { value: 12, suffix: "+", labelKey: "about.stat.projects" },
  { value: 3, suffix: "", labelKey: "about.stat.semester" },
  { value: 7, suffix: "+", labelKey: "about.stat.tech" },
  { value: 3, suffix: "x", labelKey: "about.stat.cert" },
];

function Counter({ value, suffix }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obj = { val: 0 };
    const st = ScrollTrigger.create({
      trigger: el,
      start: "top 80%",
      once: true,
      onEnter: () => {
        gsap.to(obj, {
          val: value,
          duration: 2,
          ease: "power2.out",
          onUpdate: () => {
            el.textContent = Math.round(obj.val) + suffix;
          },
        });
      },
    });
    return () => st.kill();
  }, [value, suffix]);

  return (
    <span ref={ref} className="font-display text-poster-md text-[var(--color-bone)] leading-none">
      0{suffix}
    </span>
  );
}

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};

export default function About() {
  const { t } = useLanguage();

  return (
    <section id="about" className="relative bg-[var(--color-void)] px-6 py-28 md:px-12 lg:py-40">
      {/* Subtle red ambient */}
      <div className="pointer-events-none absolute left-0 top-0 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-drama/5 blur-[100px]" />

      <div className="relative mx-auto max-w-7xl">
        {/* Section header */}
        <SectionTitle label={t("about.label")} title={t("about.title")} outlineTitle={t("about.outlineTitle")} className="mb-16 md:mb-24" />

        <div className="grid items-start gap-16 lg:grid-cols-2 lg:gap-24">
          {/* Left — Photo */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="relative overflow-hidden">
              {/* Red accent border */}
              <div className="absolute -left-3 -top-3 h-24 w-24 border-l-2 border-t-2 border-red-drama z-10" />
              <div className="absolute -bottom-3 -right-3 h-24 w-24 border-b-2 border-r-2 border-red-drama/40 z-10" />
              <img
                src={profileImg}
                alt="Rizky Adriansyah — Sistem Informasi Student"
                className="w-full object-contain grayscale hover:grayscale-0 transition-all duration-700"
              />
            </div>
          </motion.div>

          {/* Right — Text */}
          <div className="flex flex-col gap-8">
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <p className="font-body text-lg leading-relaxed text-[var(--color-bone-dim)]">
                {t("about.greeting")}
                <span className="font-semibold text-[var(--color-bone)]">{BIO.name}</span>
                {t("about.student")}
                <span className="text-red-drama">{BIO.major}</span>
                {t("about.at")}
                <span className="font-semibold text-[var(--color-bone)]">{BIO.university}</span> ({BIO.year}).
              </p>
            </motion.div>

            <motion.p
              className="font-body text-base leading-relaxed text-[var(--color-muted)]"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              {t("about.interests.prefix")}<span className="text-[var(--color-bone)]">{BIO.interests}</span>{t("about.interests.suffix")}
            </motion.p>

            <motion.blockquote
              className="border-l-2 border-red-drama pl-6 font-heading italic text-base text-[var(--color-muted)]"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              "{BIO.value}"
            </motion.blockquote>

            {/* Divider */}
            <div className="h-px bg-[var(--color-white-5)]" />

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
              {STATS_KEYS.map(({ value, suffix, labelKey }, i) => (
                <motion.div
                  key={labelKey}
                  className="flex flex-col gap-1"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * i, duration: 0.6 }}
                >
                  <Counter value={value} suffix={suffix} />
                  <span className="font-body text-xs uppercase tracking-widest text-[var(--color-faint)]">
                    {t(labelKey)}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 h-px w-full bg-[var(--color-white-5)]" />
    </section>
  );
}
