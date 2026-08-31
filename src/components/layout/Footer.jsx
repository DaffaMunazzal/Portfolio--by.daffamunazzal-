/* src/components/layout/Footer.jsx */
import { motion } from "framer-motion";
import { useLanguage } from "../../context/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="border-t border-[var(--color-white-5)] bg-[var(--color-void)] px-6 py-6 md:px-12">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 md:flex-row">
        <p className="font-body text-xs uppercase tracking-ultra-wide text-[var(--color-faint)]">
          © {new Date().getFullYear()} — {t("footer.rights")}
        </p>
        <p className="font-body text-xs uppercase tracking-ultra-wide text-[var(--color-faint)]">
          {t("footer.builtWith")}{" "}
          <span className="text-red-drama">React</span>{" "}
          +{" "}
          <span className="text-red-drama">Vite</span>
        </p>
      </div>
    </footer>
  );
}
