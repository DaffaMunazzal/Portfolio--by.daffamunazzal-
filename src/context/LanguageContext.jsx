/* src/context/LanguageContext.jsx
   Provides i18n state across the app.
   - Persists preference in localStorage
   - Exposes `lang`, `setLang`, and `t(key)` translator
   - Default: "id" */
import { createContext, useContext, useState, useCallback } from "react";
import { translations } from "../data/translations";

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

  const t = useCallback(
    (key) => {
      const val = translations[lang]?.[key];
      if (val !== undefined) return val;
      // Fallback to ID, then the key itself
      return translations.id?.[key] ?? key;
    },
    [lang]
  );

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}
