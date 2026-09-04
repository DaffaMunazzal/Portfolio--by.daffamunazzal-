/* src/components/layout/Navbar.jsx
   Fixed navbar:
   - Left corner: Logo
   - Center (desktop): horizontal links with animated underline
   - Right corner: Dark/Light toggle + Language dropdown (with SVG flags) + Mobile Hamburger
   - Mobile: full-screen animated overlay menu
   - Consumes modular content.nav from LanguageContext */
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sun, Moon, ChevronDown } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import { useLanguage, LANGUAGES } from "../../context/LanguageContext";
import FlagIcon from "../ui/FlagIcon";
import logoPutih from "../../assets/images/logo-website-putih.png";
import logoHitam from "../../assets/images/logo-website-hitam.png";

const navConfig = [
  { key: "home", href: "#home" },
  { key: "about", href: "#about" },
  { key: "skills", href: "#skills" },
  { key: "projects", href: "#projects" },
  { key: "experience", href: "#experience" },
  { key: "contact", href: "#contact" },
];

const menuVariants = {
  closed: { clipPath: "inset(0 0 100% 0)", transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
  open: { clipPath: "inset(0 0 0% 0)", transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

const linkVariants = {
  closed: { y: 60, opacity: 0 },
  open: (i) => ({
    y: 0,
    opacity: 1,
    transition: { delay: 0.1 + i * 0.07, duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  }),
};

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const langRef = useRef(null);

  const { theme, toggleTheme } = useTheme();
  const { lang, setLang, content } = useLanguage();
  const navText = content.nav || {};

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Prevent body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  // Close language dropdown on click outside
  useEffect(() => {
    const handler = (e) => {
      if (langRef.current && !langRef.current.contains(e.target)) {
        setLangDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleNavClick = (href) => {
    setMenuOpen(false);
    setTimeout(() => {
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    }, 400);
  };

  const navLinks = navConfig.map(({ key, href }) => ({
    label: navText[key] || key,
    href,
  }));

  return (
    <>
      {/* Main Navbar */}
      <motion.nav
        className={`fixed left-0 top-0 z-[9990] w-full px-6 py-4 transition-all duration-500 md:px-12 ${scrolled
          ? "bg-[var(--color-void)]/80 backdrop-blur-md border-b border-[var(--color-white-5)] shadow-lg"
          : "bg-transparent"
          }`}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          {/* ── Left Corner: Logo Image ── */}
          <a
            href="#home"
            onClick={(e) => { e.preventDefault(); handleNavClick("#home"); }}
            className="flex items-center transition-transform duration-300 hover:scale-105"
            aria-label="Home"
          >
            <img
              src={theme === "dark" ? logoPutih : logoHitam}
              alt="Logo Website"
              className="h-8 md:h-9 w-auto object-contain transition-all duration-300"
            />
          </a>

          {/* ── Center: Desktop Navigation Links ── */}
          <ul className="hidden items-center gap-8 md:flex">
            {navLinks.map(({ label, href }) => (
              <li key={href}>
                <a
                  href={href}
                  onClick={(e) => { e.preventDefault(); handleNavClick(href); }}
                  className="group relative font-body text-sm font-medium uppercase tracking-widest text-[var(--color-muted)] transition-colors duration-300 hover:text-[var(--color-bone)]"
                >
                  {label}
                  {/* Animated underline */}
                  <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-red-drama transition-all duration-300 group-hover:w-full" />
                </a>
              </li>
            ))}
          </ul>

          {/* ── Right Corner: Theme Toggle, Language Dropdown & Mobile Hamburger ── */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            {/* Dark / Light Toggle */}
            <button
              onClick={toggleTheme}
              className="relative flex h-9 w-9 items-center justify-center rounded-full border border-[var(--color-white-10)] bg-[var(--color-white-5)] text-[var(--color-bone)] hover:border-red-drama/50 hover:bg-red-drama/10 hover:text-red-drama transition-all duration-300"
              aria-label={theme === "dark" ? "Dark mode active (click to switch to light)" : "Light mode active (click to switch to dark)"}
            >
              <AnimatePresence mode="wait">
                {theme === "dark" ? (
                  <motion.div
                    key="moon"
                    initial={{ rotate: -90, scale: 0, opacity: 0 }}
                    animate={{ rotate: 0, scale: 1, opacity: 1 }}
                    exit={{ rotate: 90, scale: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    <Moon size={16} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="sun"
                    initial={{ rotate: 90, scale: 0, opacity: 0 }}
                    animate={{ rotate: 0, scale: 1, opacity: 1 }}
                    exit={{ rotate: -90, scale: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    <Sun size={16} />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>

            {/* Language Selector Dropdown */}
            <div className="relative" ref={langRef}>
              <button
                onClick={() => setLangDropdownOpen((v) => !v)}
                className="flex h-9 items-center gap-2 rounded-full border border-[var(--color-white-10)] bg-[var(--color-white-5)] px-3 text-[var(--color-bone)] hover:border-red-drama/50 hover:bg-red-drama/10 transition-all duration-300"
                aria-label="Select language"
              >
                {/* Active Country Flag SVG */}
                <FlagIcon code={lang} className="w-5 h-3.5" />
                <ChevronDown
                  size={12}
                  className={`text-[var(--color-faint)] transition-transform duration-300 ${langDropdownOpen ? "rotate-180" : ""
                    }`}
                />
              </button>

              {/* Dropdown Menu (aligned to right edge) */}
              <AnimatePresence>
                {langDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.95 }}
                    transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute right-0 top-full mt-2 flex flex-col gap-1.5 rounded-2xl border border-[var(--color-white-10)] bg-[var(--color-surface-2)] p-2 shadow-card backdrop-blur-md min-w-[155px] z-[9999]"
                  >
                    {LANGUAGES.map((langItem) => (
                      <button
                        key={langItem.code}
                        onClick={() => {
                          setLang(langItem.code);
                          setLangDropdownOpen(false);
                        }}
                        className={`flex items-center gap-2.5 rounded-full px-3.5 py-2 font-body text-sm transition-all duration-200 ${lang === langItem.code
                          ? "bg-red-drama/15 text-red-drama font-medium border border-red-drama/30"
                          : "text-[var(--color-muted)] hover:bg-[var(--color-white-5)] hover:text-[var(--color-bone)] border border-transparent"
                          }`}
                      >
                        {/* Country Flag SVG */}
                        <FlagIcon code={langItem.code} className="w-5 h-3.5" />
                        <span>{langItem.label}</span>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Mobile Hamburger Button */}
            <button
              className="relative z-[10001] flex h-9 w-9 items-center justify-center text-[var(--color-bone)] md:hidden"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
            >
              <AnimatePresence mode="wait">
                {menuOpen ? (
                  <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                    <X size={22} />
                  </motion.div>
                ) : (
                  <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                    <Menu size={22} />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Full-Screen Menu Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-[9985] flex flex-col items-start justify-center bg-[var(--color-void)] px-8"
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
          >
            {/* Red spotlight behind */}
            <div className="pointer-events-none absolute right-0 top-1/4 h-80 w-80 rounded-full bg-red-drama/10 blur-[120px]" />

            <ul className="w-full space-y-2">
              {navLinks.map(({ label, href }, i) => (
                <li key={href} className="overflow-hidden">
                  <motion.div custom={i} variants={linkVariants} initial="closed" animate="open">
                    <button
                      onClick={() => handleNavClick(href)}
                      className="font-display text-[clamp(2.5rem,8vw,5rem)] uppercase leading-none tracking-poster text-[var(--color-bone)] transition-colors duration-200 hover:text-red-drama"
                    >
                      {label}
                    </button>
                  </motion.div>
                </li>
              ))}
            </ul>

            {/* Bottom decoration */}
            <motion.p
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
              className="absolute bottom-8 left-8 font-body text-xs uppercase tracking-ultra-wide text-[var(--color-faint)]"
            >
              {navText.decoration || "Daffa Munazzal's Portfolio"}
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
