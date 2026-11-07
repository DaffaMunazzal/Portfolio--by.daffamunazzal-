export const HERO_CONFIG = {
  // Intro Sequence Timings (total ~2.8s)
  intro: {
    counterDuration: 1.1,      // 000 -> 100 counter duration
    lightInterval: 0.16,       // Delay between each of the 5 lights turning on
    lightsHoldDuration: 0.35,  // Hold with all 5 lights ON before instant "lights out"
    wipeDuration: 0.55,        // Wipe transition uncovering hero
    lightsCount: 5,
    sessionKey: "f1_hero_intro_seen",
  },

  // Name Reveal & Glitch
  name: {
    letterStagger: 0.038,       // 30-50ms stagger per character
    ease: "power4.out",
    revealDuration: 0.85,
    glitchDuration: 0.1,       // RGB split glitch on intro complete
    collisionGlitchDuration: 0.12, // Glitch trigger when nametag hits bounds
    maxSkewDeg: 5.5,           // Maximum skew responding to card velocity
    maxParallaxPx: 5.0,        // Counter-parallax responding to card velocity
    damping: 0.15,             // QuickTo damping for smooth return
    lineHeight: 0.96,          // Polished line-height for breathing room
    gap: "0.04em",             // Gap between DAFFA and MUNAZZAL
  },

  // Tagline Scramble
  tagline: {
    scrambleChars: "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#/_",
    speed: 0.035,              // Interval per scramble frame
    cyclesPerChar: 3,
    letterSpacing: "0.28em",   // Calibrated letter-spacing (0.25em - 0.35em range)
  },

  // Telemetry / HUD
  hud: {
    sectionIndex: "01 — INTRO",
    statusText: "SYS.STATUS: ONLINE",
    coordinates: "7.5755° S, 110.8243° E",
    version: "v1.0",
    timezone: "WIB (UTC+7)",
    textOpacity: 0.7,          // Raised from 0.45 to 0.7 for optimal contrast
    rulerOpacity: 0.55,        // Ruler labels opacity at 0.55
  },

  // Visual Palette
  colors: {
    void: "#0A0A0A",
    surface: "#141414",
    bone: "#F5F5F0",
    red: "#D91E1E",
    redDeep: "#B8141C",
    redGlow: "#FF2929",
    cyanGlow: "#00E5FF", // For RGB chromatic aberration split
    muted: "#A0A0A0",
  },
};

export default HERO_CONFIG;

