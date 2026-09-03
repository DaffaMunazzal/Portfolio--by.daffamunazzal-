/* src/context/LanguageContext.jsx
   Provides i18n state across the app.
   - Exposes `lang`, `setLang`, `content` (active locale data), `projects`, `experience`, `skillGroups`, and `t(key)`
   - Default: "id" */
import { createContext, useContext, useState, useMemo, useCallback } from "react";
import { locales, getProjects, getExperience, getSkillGroups } from "../data/locales";

const LanguageContext = createContext();

export const LANGUAGES = [
  { code: "id",  label: "Indonesia", flag: "🇮🇩" },
  { code: "en",  label: "English",   flag: "🇬🇧" },
  { code: "deu", label: "Deutsch",   flag: "🇩🇪" },
];

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(() => {
    const saved = localStorage.getItem("portfolio-lang");
    return saved || "id";
  });

  const setLang = (code) => {
    setLangState(code);
    localStorage.setItem("portfolio-lang", code);
  };

  // Active locale content object
  const content = useMemo(() => locales[lang] || locales.id, [lang]);

  // Derived merged lists
  const projects = useMemo(() => getProjects(lang), [lang]);
  const experience = useMemo(() => getExperience(lang), [lang]);
  const skillGroups = useMemo(() => getSkillGroups(lang), [lang]);

  // Dot-notation helper if needed: e.g. t('nav.home')
  const t = useCallback(
    (key) => {
      const parts = key.split(".");
      let cur = content;
      for (const p of parts) {
        if (cur && cur[p] !== undefined) {
          cur = cur[p];
        } else {
          return key;
        }
      }
      return cur;
    },
    [content]
  );

  return (
    <LanguageContext.Provider
      value={{
        lang,
        setLang,
        content,
        projects,
        experience,
        skillGroups,
        t,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}
