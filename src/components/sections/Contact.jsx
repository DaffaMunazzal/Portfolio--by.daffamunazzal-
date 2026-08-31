/* src/components/sections/Contact.jsx
   Full-viewport contact section with:
   - Giant outline text CTA
   - Simple contact form
   - Social icon row with magnetic effect
   - Magnetic buttons on CTAs
   - i18n support
   - Theme-aware via CSS variables */
import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Send, CheckCircle } from "lucide-react";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";
import SectionTitle from "../ui/SectionTitle";
import Button from "../ui/Button";
import MagneticWrapper from "../ui/MagneticWrapper";
import Footer from "../layout/Footer";
import { useLanguage } from "../../context/LanguageContext";

// TODO: REPLACE with your real contact info
const CONTACT = {
  email: "yourname@email.com",                    // TODO
  github: "https://github.com/yourusername",      // TODO
  linkedin: "https://linkedin.com/in/yourusername", // TODO
  instagram: "https://instagram.com/yourusername", // TODO
};

const socials = [
  { Icon: FaGithub, href: CONTACT.github, label: "GitHub" },
  { Icon: FaLinkedin, href: CONTACT.linkedin, label: "LinkedIn" },
  { Icon: FaInstagram, href: CONTACT.instagram, label: "Instagram" },
];

const inputClass =
  "w-full rounded-sm border border-[var(--color-white-10)] bg-[var(--color-white-5)] px-4 py-3 font-body text-sm text-[var(--color-bone)] placeholder-[var(--color-faint)] outline-none transition-all duration-200 focus:border-red-drama/60 focus:bg-[var(--color-white-5)]";

export default function Contact() {
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const { t } = useLanguage();

  const handleChange = (e) =>
    setFormState((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulate send — TODO: integrate with Formspree / EmailJS
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1500);
  };

  return (
    <>
      <section
        id="contact"
        className="relative min-h-screen bg-[var(--color-void)] px-6 py-28 md:px-12 lg:py-40"
      >
        {/* Giant red spotlight */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute left-1/2 top-1/2 h-[80vh] w-[80vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-drama/8 blur-[200px]" />
        </div>

        <div className="relative mx-auto max-w-7xl">
          {/* Section Title */}
          <div className="mb-16 text-center lg:mb-24">
            <motion.p
              className="mb-4 font-body text-xs font-semibold uppercase tracking-ultra-wide text-red-drama"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              {t("contact.label")}
            </motion.p>

            {/* Giant stacked title */}
            <div className="overflow-hidden">
              {[t("contact.title1"), t("contact.title2")].map((line, i) => (
                <div key={i} className="overflow-hidden">
                  <motion.div
                    className={`font-display text-poster-xl uppercase leading-none tracking-poster ${
                      i === 1
                        ? ""
                        : "text-[var(--color-bone)]"
                    }`}
                    style={
                      i === 1
                        ? {
                            WebkitTextStroke: "1.5px var(--color-outline-stroke)",
                            WebkitTextFillColor: "transparent",
                            color: "transparent",
                          }
                        : {}
                    }
                    initial={{ y: "110%" }}
                    whileInView={{ y: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.9,
                      delay: i * 0.1,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  >
                    {line}
                  </motion.div>
                </div>
              ))}
            </div>

            <motion.p
              className="mx-auto mt-6 max-w-md font-body text-base leading-relaxed text-[var(--color-muted)]"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              {t("contact.subtitle")}
            </motion.p>
          </div>

          {/* Two-column: Form + Info */}
          <div className="grid gap-16 lg:grid-cols-2">
            {/* Left — Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              {submitted ? (
                <div className="flex flex-col items-center justify-center gap-4 rounded-sm border border-red-drama/30 bg-red-drama/5 p-12 text-center">
                  <CheckCircle className="text-red-drama" size={48} />
                  <h3 className="font-display text-2xl uppercase tracking-poster text-[var(--color-bone)]">
                    {t("contact.sent.title")}
                  </h3>
                  <p className="font-body text-sm text-[var(--color-muted)]">
                    {t("contact.sent.desc")}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="mb-2 block font-body text-xs uppercase tracking-widest text-[var(--color-faint)]">
                        {t("contact.name")}
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        placeholder={t("contact.namePlaceholder")}
                        value={formState.name}
                        onChange={handleChange}
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className="mb-2 block font-body text-xs uppercase tracking-widest text-[var(--color-faint)]">
                        {t("contact.email")}
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        placeholder="email@example.com"
                        value={formState.email}
                        onChange={handleChange}
                        className={inputClass}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="mb-2 block font-body text-xs uppercase tracking-widest text-[var(--color-faint)]">
                      {t("contact.message")}
                    </label>
                    <textarea
                      name="message"
                      rows={5}
                      required
                      placeholder={t("contact.messagePlaceholder")}
                      value={formState.message}
                      onChange={handleChange}
                      className={`${inputClass} resize-none`}
                    />
                  </div>

                  <Button
                    type="submit"
                    variant="primary"
                    className="mt-2 w-full justify-center gap-2"
                    disabled={loading}
                  >
                    {loading ? (
                      t("contact.sending")
                    ) : (
                      <>
                        <Send size={15} />
                        {t("contact.send")}
                      </>
                    )}
                  </Button>
                </form>
              )}
            </motion.div>

            {/* Right — Contact Info */}
            <motion.div
              className="flex flex-col gap-8"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Email */}
              <div>
                <p className="mb-2 font-body text-xs uppercase tracking-ultra-wide text-[var(--color-faint)]">
                  {t("contact.email")}
                </p>
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="group flex items-center gap-3 font-body text-base text-[var(--color-muted)] hover:text-[var(--color-bone)] transition-colors duration-200"
                >
                  <Mail size={16} className="text-red-drama" />
                  {CONTACT.email}
                  <span className="ml-auto font-body text-xs text-[var(--color-faint)] group-hover:text-red-drama transition-colors">
                    →
                  </span>
                </a>
              </div>

              <div className="h-px bg-[var(--color-white-5)]" />

              {/* Socials */}
              <div>
                <p className="mb-4 font-body text-xs uppercase tracking-ultra-wide text-[var(--color-faint)]">
                  {t("contact.findMe")}
                </p>
                <div className="flex gap-4">
                  {socials.map(({ Icon, href, label }) => (
                    <MagneticWrapper key={label} strength={0.4}>
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={label}
                        data-cursor-hover
                        className="flex h-12 w-12 items-center justify-center rounded-sm border border-[var(--color-white-10)] text-[var(--color-faint)] hover:border-red-drama/50 hover:bg-red-drama/10 hover:text-red-drama transition-all duration-200"
                      >
                        <Icon size={20} />
                      </a>
                    </MagneticWrapper>
                  ))}
                </div>
              </div>

              <div className="h-px bg-[var(--color-white-5)]" />

              {/* Availability badge */}
              <div className="flex items-start gap-4 rounded-sm border border-[var(--color-white-5)] bg-[var(--color-surface-2)] p-6">
                <div className="relative mt-1 flex h-3 w-3 flex-shrink-0">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex h-3 w-3 rounded-full bg-green-500" />
                </div>
                <div>
                  <p className="font-body text-sm font-semibold text-[var(--color-bone)]">
                    {t("contact.available.title")}
                  </p>
                  <p className="mt-1 font-body text-xs leading-relaxed text-[var(--color-faint)]">
                    {t("contact.available.desc")}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
