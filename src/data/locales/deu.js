/* src/data/locales/deu.js
   ==========================================================================
   DEUTSCHER INHALT
   Hier können Sie alle Portfolio-Texte auf Deutsch anpassen.
   ========================================================================== */

export default {
  // ─── NAVIGATION ───
  nav: {
    home: "Startseite",
    about: "Über mich",
    skills: "Fähigkeiten",
    projects: "Projekte",
    experience: "Werdegang",
    contact: "Kontakt",
    decoration: "DAFFA MUNAZZAL PORTFOLIO",
  },

  // ─── HERO SECTION ───
  hero: {
    role: "Student der Informationssysteme",
    nameLine1: "DAFFA",
    nameLine2: "MUNAZZAL",
    tagline: "BAUEN. DENKEN. DEPLOYEN.",
  },

  // ─── ABOUT SECTION ───
  about: {
    sectionLabel: "Über Mich",
    title: "WER ICH",
    outlineTitle: "BIN",
    bio: {
      name: "Muhammad Daffa Oemarqois Munazzal",
      university: "Institut Widya Pratama",
      major: "Informationssysteme",
      year: "3. Semester, Jahrgang 2025",
      interests: "Webentwicklung, Datenbank-Managementsysteme, Maschinelles Lernen, UI/UX Design und Datenanalyse",
      value: "Programmieren ist nicht nur eine Technologie, sondern ein Teil des Lebensstils",
      story1: "Hallo zusammen! Mein Name ist {name}, Student der {major} am {university} ({year}).",
      story2: "Meine Interessen umfassen {interests}. Ich verwandle komplexe Geschäftsprobleme gerne in elegante und effiziente digitale Lösungen.",
    },
    stats: [
      { value: 12, suffix: "+", label: "Projekte Fertig" },
      { value: 3, suffix: "", label: "Aktive Semester" },
      { value: 7, suffix: "+", label: "Technologien" },
      { value: 3, suffix: "x", label: "Zertifizierungen" },
    ],
  },

  // ─── SKILLS SECTION ───
  skills: {
    sectionLabel: "Meine Fähigkeiten",
    title: "WAS ICH",
    outlineTitle: "KANN",
    groupTitles: {
      programming: "Programmierung & Entwicklung",
      database: "Datenbanken & Systeme",
      analysis: "Analyse & Management",
      tools: "Tools & Design",
    },
  },

  // ─── PROJECTS SECTION ───
  projects: {
    sectionLabel: "Meine Arbeit",
    title: "AUSGEWÄHLTE",
    outlineTitle: "PROJEKTE",
    viewDetails: "Details Ansehen →",
    featured: "Vorgestellt",
    view: "Ansehen",
    allCategory: "Alle",
    categories: ["Alle", "Web App", "Data Analysis", "UI/UX"],
    items: {
      1: {
        title: "SHIFTCOMP - Firmenprofil Website",
        shortDesc: "Eine Unternehmensprofil-Website für das Computer- und Hardwaregeschäft SHIFTCOMP.",
        fullDesc: "SHIFTCOMP ist eine moderne Unternehmensprofil-Website für einen Computerhardware-Händler. Entwickelt mit React und Tailwind CSS mit interaktiven Produktpräsentationen.",
      },
      2: {
        title: "F1 DASHBOARD ANALYTICS",
        shortDesc: "Ein Website-Dashboard zur Anzeige von Formel-1-Daten und Statistiken aller Saisons.",
        fullDesc: "F1 DASHBOARD ANALYTICS ist ein Dashboard zur Anzeige von Formel-1-Daten und Statistiken der Rennsaisons. Entwickelt mit React und Tailwind CSS.",
      },
      3: {
        title: "E-Commerce Analytics Dashboard",
        shortDesc: "Datenvisualisierungs-Dashboard zur Analyse von Verkaufstrends, Kundenverhalten und Inventar.",
        fullDesc: "Ein interaktives Analyse-Dashboard für ein lokales KMU. Visualisiert Verkaufsdaten mit dynamischen Diagrammen (Chart.js), Kundensegmentierung mittels K-Means-Clustering (Python/scikit-learn) und KI-gestützten Produktempfehlungen.",
      },
      4: {
        title: "UrbanEats — Essensliefer-App UI",
        shortDesc: "High-Fidelity UI/UX-Design für eine Essensliefer-App für urbane Millennials.",
        fullDesc: "End-to-End UI/UX-Designprojekt: von Nutzerforschung und Personas bis hin zu Wireframes und einem hochauflösenden interaktiven Figma-Prototyp mit über 40 Bildschirmen. Inklusive Design-System und Usability-Testing-Bericht.",
      },
      5: {
        title: "Campus Event-Management-System",
        shortDesc: "Full-Stack-Web-App zur Verwaltung von Campus-Events, Anmeldungen und Ticketing.",
        fullDesc: "Umfassende Event-Management-Plattform für die Studentenvertretung. Funktionen wie Event-Erstellung, Online-Registrierung, digitale Tickets mit QR-Code-Verifizierung und ein Echtzeit-Teilnehmer-Dashboard.",
      },
      6: {
        title: "Analyse der psychischen Gesundheit von Studenten",
        shortDesc: "Datenanalyseprojekt zur Untersuchung des Zusammenhangs zwischen akademischer Arbeitsbelastung und studentischem Wohlbefinden.",
        fullDesc: "Forschungsprojekt basierend auf Daten von über 200 Studenten. Nutzt statistische Analysen (Korrelation, Regression) und Datenvisualisierung zur Identifizierung wichtiger Stressfaktoren.",
      },
    },
  },

  // ─── EXPERIENCE & EDUCATION SECTION ───
  experience: {
    sectionLabel: "Werdegang",
    title: "MEIN",
    outlineTitle: "WERDEGANG",
    items: {
      1: {
        title: "B.Sc. Informationssysteme",
        institution: "Institut Widya Pratama",
        location: "Pekalongan, Zentral-Java",
        description: "Schwerpunkte in Software-Engineering, Datenbanksystemen und IT-Projektmanagement. Aktives Mitglied des Campus-IT-Clubs und wissenschaftliche Hilfskraft im IS-Labor.",
        tags: ["Aktiv", "Informationssysteme"],
      },
      2: {
        title: "Computer- und Netzwerktechnik",
        institution: "SMK Muhammadiyah Bligo",
        location: "Pekalongan, Zentral-Java",
        description: "Fachrichtung Computer- und Netzwerktechnik. LKS-Grafikdesign-Teilnehmer 2024–2025, Grafikdesign-Enthusiast.",
        tags: ["Computer- & Netzwerktechnik", "Grafikdesign"],
      },
      3: {
        title: "Sekretär des Computerentwicklungs-Clubs",
        institution: "Institut Widya Pratama",
        location: "Pekalongan, Zentral-Java",
        description: "Verwaltung der Administration und Dokumentation des Computerentwicklungs-Clubs sowie Unterstützung bei der Organisation von Aktivitäten und Programmen.",
        tags: ["Administration", "Dokumentation", "Club"],
      },
      4: {
        title: "Grafikdesign-Praktikant",
        institution: "MZ Digital Print",
        location: "Pekalongan, Zentral-Java",
        description: "Erstellung und Gestaltung verschiedener DTF-Druckmedien, einschließlich T-Shirts, Broschüren, Einladungen und diverser Werbematerialien.",
        tags: ["Canva", "Figma", "Photoshop", "CorelDraw", "DTF Printing"],
      },
      5: {
        title: "1. Platz — Nationales Digitales Posterdesign",
        institution: "Festival Penghela HW UNIMUS 2024",
        location: "Semarang",
        description: "Nationaler Wettbewerb für digitales Posterdesign, organisiert von der Universitas Muhammadiyah Semarang.",
        tags: ["Posterdesign", "National", "UNIMUS"],
      },
      6: {
        title: "Orion Computer Praktikant",
        institution: "Orion Computer",
        location: "Pekalongan, Zentral-Java",
        description: "Verantwortlich für Computer- und Druckerwartung sowie technische Unterstützung für Kunden.",
        tags: ["Computer Maintenance", "Printer Maintenance", "Customer Service"],
      },
      7: {
        title: "Dicoding — KI für Produktivität",
        institution: "Dicoding Indonesia",
        location: "Online",
        description: "Abschluss eines KI-Kurses zu Best Practices im Bereich Künstliche Intelligenz und deren Einsatz für Produktivität.",
        tags: ["AI", "Dicoding"],
      },
    },
  },

  // ─── CONTACT SECTION ───
  contact: {
    sectionLabel: "Kontaktieren",
    title1: "LASS UNS",
    title2: "ETWAS BAUEN",
    subtitle: "Haben Sie ein interessantes Projekt, eine Frage oder möchten einfach Hallo sagen? Ich bin immer offen für Gespräche!",
    form: {
      name: "Name",
      namePlaceholder: "Ihr vollständiger Name",
      email: "E-Mail",
      emailPlaceholder: "email@example.com",
      message: "Nachricht",
      messagePlaceholder: "Hallo, ich möchte besprechen...",
      send: "Nachricht Senden",
      sending: "Wird gesendet...",
      sentTitle: "Nachricht Gesendet!",
      sentDesc: "Vielen Dank! Ich werde so schnell wie möglich antworten.",
    },
    findMe: "Finde Mich Online",
    availableTitle: "Verfügbar für Zusammenarbeit",
    availableDesc: "Auf der Suche nach Praktikum, Freelance oder interessanten Kooperationsprojekten.",
  },

  // ─── FOOTER & MODAL ───
  footer: {
    rights: "Alle Rechte Vorbehalten",
    builtWith: "Erstellt mit",
  },
  modal: {
    techStack: "Technologien",
    liveDemo: "Live Demo",
  },
};
