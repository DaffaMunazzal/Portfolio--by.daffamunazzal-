/* src/App.jsx
   Root application component:
   - Wraps with ThemeProvider and LanguageProvider
   - Initializes Lenis smooth scroll (synced to GSAP)
   - Renders CustomCursor, ScrollProgress, Navbar
   - Renders all sections in order */
import { ThemeProvider } from "./context/ThemeContext";
import { LanguageProvider } from "./context/LanguageContext";
import useLenis from "./hooks/useLenis";
import Navbar from "./components/layout/Navbar";
import ScrollProgress from "./components/ui/ScrollProgress";
import NoiseOverlay from "./components/ui/NoiseOverlay";
import TechStackMarquee from "./components/ui/TechStackMarquee";
import IntroOverlay from "./components/hero/IntroOverlay";
import Hero from "./components/sections/Hero";
import About from "./components/sections/About";
import Skills from "./components/sections/Skills";
import Projects from "./components/sections/Projects";
import Experience from "./components/sections/Experience";
import Contact from "./components/sections/Contact";

function AppContent() {
  // Initialize Lenis smooth scroll globally
  useLenis();

  return (
    <>
      {/* ── F1 Grand Prix Start Sequence Intro ── */}
      <IntroOverlay />

      {/* ── Global UI Overlays ── */}
      <NoiseOverlay />
      <ScrollProgress />

      {/* ── Navigation ── */}
      <Navbar />

      {/* ── Main Content ── */}
      <main>
        <Hero />
        <TechStackMarquee />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
      </main>
    </>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AppContent />
      </LanguageProvider>
    </ThemeProvider>
  );
}
