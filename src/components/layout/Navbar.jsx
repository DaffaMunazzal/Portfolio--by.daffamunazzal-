/* src/components/layout/Navbar.jsx
   Fixed navbar:
   - Left corner: Logo
   - Center (desktop): horizontal links with animated underline
   - Right corner: Dark/Light toggle + Language dropdown (with SVG flags) + Mobile Hamburger
   - Mobile: full-screen animated overlay menu
   - Consumes modular content.nav from LanguageContext */
import { useState, useEffect, useRef, useLayoutEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sun, Moon, ChevronDown } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import { useLanguage, LANGUAGES } from "../../context/LanguageContext";
import FlagIcon from "../ui/FlagIcon";
import logoPutih from "../../assets/images/logo-website-putih.png";
import logoHitam from "../../assets/images/logo-website-hitam.png";
import useReducedMotion from "../../hooks/useReducedMotion";

const NAV_TECH_STACK = [
  { name: "DATA ANALYSIS", tag: "ANALYTICS", isRed: true },
  { name: "REACT.JS", tag: "FRONTEND", isOutline: true },
  { name: "PYTHON", tag: "PYTHON3", isRed: false },
  { name: "SYSTEM ANALYSIS", tag: "SYS_ENG", isRed: true },
  { name: "MYSQL & DATABASE", tag: "DATA_STORE", isOutline: true },
  { name: "TAILWIND CSS", tag: "UI_FRAMEWORK", isRed: false },
  { name: "FIGMA & UI/UX", tag: "DESIGN", isOutline: true },
  { name: "UML & BPMN", tag: "MODELING", isRed: true },
  { name: "MACHINE LEARNING", tag: "AI_ML", isOutline: true },
  { name: "GIT & GITHUB", tag: "DEV_OPS", isRed: false },
  { name: "COREL DRAW", tag: "VECTOR", isOutline: true },
  { name: "ERD & NORMALIZATION", tag: "DATABASE", isRed: false },
];

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
  const [activeSection, setActiveSection] = useState("home");
  const langRef = useRef(null);
  const logoRef = useRef(null);
  const controlsRef = useRef(null);
  const prefersReduced = useReducedMotion();

  const { theme, toggleTheme } = useTheme();
  const { lang, setLang, content } = useLanguage();
  const navText = content.nav || {};

  // Dynamic CSS Mask for the "Tunnel" under the nav:
  // - Fully visible in left green area
  // - Fades out in left yellow area (right before logo)
  // - 100% invisible inside tunnel (under logo, bubble nav, and controls)
  // - Fades in in right yellow area (right after controls)
  // - Fully visible in right green area
  const [tunnelMask, setTunnelMask] = useState("");

  const updateTunnelMask = useCallback(() => {
    if (typeof window === "undefined") return;
    const logoEl = logoRef.current;
    const controlsEl = controlsRef.current;

    if (!logoEl || !controlsEl) return;

    const logoRect = logoEl.getBoundingClientRect();
    const controlsRect = controlsEl.getBoundingClientRect();
    const winWidth = window.innerWidth;

    // Fade zone width matches the yellow box (~70px)
    const fadeWidth = 70;
    const edgeFade = 20;

    // Tunnel bounds: starts right before logo, ends right after controls
    const fadeLeftEnd = Math.max(edgeFade, Math.floor(logoRect.left - 6));
    const fadeLeftStart = Math.max(edgeFade, fadeLeftEnd - fadeWidth);

    const fadeRightStart = Math.min(winWidth - edgeFade, Math.ceil(controlsRect.right + 6));
    const fadeRightEnd = Math.min(winWidth - edgeFade, fadeRightStart + fadeWidth);

    const mask = `linear-gradient(to right, transparent 0px, black ${edgeFade}px, black ${fadeLeftStart}px, transparent ${fadeLeftEnd}px, transparent ${fadeRightStart}px, black ${fadeRightEnd}px, black calc(100% - ${edgeFade}px), transparent 100%)`;

    setTunnelMask(mask);
  }, []);

  useLayoutEffect(() => {
    updateTunnelMask();
    const handleResize = () => updateTunnelMask();
    window.addEventListener("resize", handleResize, { passive: true });
    const timer = setTimeout(updateTunnelMask, 60);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", handleResize);
    };
  }, [updateTunnelMask, lang, theme]);

  // Triple duplicated array for smooth, gap-free marquee loop across all viewport widths
  const marqueeList = [...NAV_TECH_STACK, ...NAV_TECH_STACK, ...NAV_TECH_STACK];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Track active section for F1 telemetry indicator
  useEffect(() => {
    const sectionIds = ["home", "about", "skills", "projects", "experience", "contact"];
    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };
    const observer = new IntersectionObserver(observerCallback, {
      rootMargin: "-25% 0px -55% 0px",
      threshold: 0,
    });
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
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
    key,
    label: navText[key] || key,
    href,
  }));

  return (
    <>
      {/* Main Navbar */}
      <motion.nav
        className={`fixed left-0 top-0 z-[9990] w-full px-4 sm:px-6 md:px-10 py-3 sm:py-3.5 transition-all duration-500 ${
          scrolled
            ? "bg-[var(--color-void)]/85 backdrop-blur-md border-b border-[var(--color-white-5)] shadow-lg"
            : "bg-transparent"
        }`}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* ── Background Tech Stack Ticker (Glides across horizontally under/behind nav elements) ── */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0 flex items-center overflow-hidden select-none opacity-90 transition-opacity duration-300"
          style={{
            WebkitMaskImage: tunnelMask || undefined,
            maskImage: tunnelMask || undefined,
          }}
        >
          {/* Edge Vignette Gradients */}
          <div className="absolute inset-y-0 left-0 z-10 w-12 md:w-20 bg-gradient-to-r from-[var(--color-void)] to-transparent pointer-events-none" />
          <div className="absolute inset-y-0 right-0 z-10 w-12 md:w-20 bg-gradient-to-l from-[var(--color-void)] to-transparent pointer-events-none" />

          {/* Gliding Tech Marquee Track */}
          <motion.div
            className="flex w-max items-center gap-6 sm:gap-8 will-change-transform"
            animate={prefersReduced ? false : { x: ["0%", "-50%"] }}
            transition={{
              duration: 48,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            {marqueeList.map((item, index) => (
              <div
                key={`${item.name}-${index}`}
                className="flex items-center gap-2 sm:gap-2.5 shrink-0"
              >
                {/* 4-Point Star Separator */}
                <span className="text-red-drama text-[9px] sm:text-[11px] animate-pulse">
                  ✦
                </span>

                {/* Tech Skill Label */}
                <span
                  className={`font-display text-xs sm:text-sm md:text-[0.95rem] tracking-wider uppercase leading-none ${
                    item.isRed
                      ? "text-red-drama font-bold"
                      : item.isOutline
                      ? "text-transparent [-webkit-text-stroke:1px_var(--color-bone-dim)] font-normal opacity-85"
                      : "text-[var(--color-bone)] font-semibold"
                  }`}
                >
                  {item.name}
                </span>

                {/* Micro Tag Pill */}
                <span className="hidden xl:inline-block rounded border border-[var(--color-white-10)] bg-[var(--color-surface-2)]/80 px-1 py-0.2 font-mono text-[8px] font-semibold tracking-widest text-[var(--color-muted)]">
                  {item.tag}
                </span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* ── Foreground Interactive Nav Elements ── */}
        <div className="relative z-10 mx-auto flex max-w-7xl items-center justify-between">
          {/* ── Left Corner: Logo Image ── */}
          <a
            ref={logoRef}
            href="#home"
            onClick={(e) => { e.preventDefault(); handleNavClick("#home"); }}
            className="flex items-center transition-transform duration-300 hover:scale-105 bg-[var(--color-void)]/70 backdrop-blur-md px-2.5 py-1.5 rounded-xl border border-[var(--color-white-5)] shadow-sm"
            aria-label="Home"
          >
            <img
              src={theme === "dark" ? logoPutih : logoHitam}
              alt="Logo Website"
              className="h-7 sm:h-8 md:h-9 w-auto object-contain transition-all duration-300"
            />
          </a>

          {/* ── Center: Desktop Navigation Links (F1 telemetry numbered & red underline) ── */}
          <div className="hidden md:flex items-center bg-[var(--color-void)]/80 backdrop-blur-md px-6 py-1.5 rounded-full border border-[var(--color-white-10)] shadow-md">
            <ul className="flex items-center gap-6 lg:gap-8">
              {navLinks.map(({ label, href, key }, index) => {
                const isActive = activeSection === key;
                return (
                  <li key={href}>
                    <a
                      href={href}
                      onClick={(e) => { e.preventDefault(); handleNavClick(href); }}
                      className={`group relative flex items-center font-body text-xs lg:text-sm font-medium uppercase tracking-widest transition-colors duration-300 py-1 ${
                        isActive
                          ? "text-[var(--color-bone)]"
                          : "text-[var(--color-muted)] hover:text-[var(--color-bone)]"
                      }`}
                    >
                      {/* F1 Number prefix 01-06 */}
                      <span className="font-mono text-[10px] text-red-drama/70 mr-1.5 font-normal tracking-normal">
                        0{index + 1}
                      </span>

                      <span>{label}</span>

                      {/* Active dot indicator */}
                      {isActive && (
                        <span className="ml-1.5 h-1.5 w-1.5 rounded-full bg-red-drama shadow-[0_0_8px_#D91E1E]" />
                      )}

                      {/* Animated red underline sliding from left */}
                      <span
                        className={`absolute -bottom-0.5 left-0 h-[2px] bg-red-drama transition-all duration-300 ease-out ${
                          isActive ? "w-full" : "w-0 group-hover:w-full"
                        }`}
                      />
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* ── Right Corner: Theme Toggle, Language Dropdown & Mobile Hamburger ── */}
          <div
            ref={controlsRef}
            className="flex items-center gap-2 sm:gap-2.5 bg-[var(--color-void)]/70 backdrop-blur-md p-1 sm:p-1.5 rounded-full border border-[var(--color-white-5)] shadow-sm"
          >
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
                type="button"
                onClick={() => setLangDropdownOpen((v) => !v)}
                className="flex h-9 items-center gap-2 rounded-full border border-[var(--color-white-10)] bg-[var(--color-white-5)] px-3 text-[var(--color-bone)] hover:border-red-drama/50 hover:bg-red-drama/10 transition-all duration-300 pointer-events-auto cursor-pointer"
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
                    className="absolute right-0 top-full mt-2 flex flex-col gap-1.5 rounded-2xl border border-[var(--color-white-10)] bg-[var(--color-surface-2)] p-2 shadow-card backdrop-blur-md min-w-[155px] z-[9999] pointer-events-auto"
                  >
                    {LANGUAGES.map((langItem) => (
                      <button
                        type="button"
                        key={langItem.code}
                        onClick={() => {
                          setLang(langItem.code);
                          setLangDropdownOpen(false);
                        }}
                        className={`flex items-center gap-2.5 rounded-full px-3.5 py-2 font-body text-sm transition-all duration-200 cursor-pointer ${lang === langItem.code
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
