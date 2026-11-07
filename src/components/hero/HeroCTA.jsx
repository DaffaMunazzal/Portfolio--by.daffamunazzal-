import { ArrowDown, Download } from "lucide-react";

export default function HeroCTA({
  projectsText = "Lihat Projects ↓",
  cvText = "Download CV",
  onProjectsClick,
}) {
  const handleScrollToProjects = (e) => {
    e.preventDefault();
    if (onProjectsClick) {
      onProjectsClick();
      return;
    }
    const target = document.querySelector("#projects");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-2.5 sm:gap-6 pt-1 sm:pt-2">
      {/* ── Primary CTA: View Projects ── */}
      <a
        href="#projects"
        onClick={handleScrollToProjects}
        className="group relative inline-flex items-center justify-center overflow-hidden px-4 sm:px-8 py-2.5 sm:py-3.5 bg-red-drama text-white font-body text-[11px] sm:text-sm font-bold uppercase tracking-widest transition-all duration-300 f1-skew-btn shadow-[0_4px_20px_rgba(217,30,30,0.45)] hover:shadow-[0_6px_28px_rgba(217,30,30,0.7)] hover:scale-[1.02] active:scale-[0.98]"
      >
        {/* Fill sweep animation effect on hover */}
        <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-red-600 to-red-deep translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300 ease-out" />

        {/* Diagonal highlight glint */}
        <span className="absolute top-0 right-0 -mr-4 w-6 h-full bg-white/20 skew-x-[25deg] translate-x-[-200%] group-hover:translate-x-[400%] transition-transform duration-700 ease-in-out" />

        {/* Unskewed Content */}
        <span className="relative z-10 flex items-center gap-2 sm:gap-2.5 f1-skew-content">
          <span>{projectsText.replace("↓", "").trim()}</span>
          <ArrowDown
            size={14}
            className="transition-transform duration-300 group-hover:translate-y-1"
          />
        </span>
      </a>

      {/* ── Secondary CTA: Download CV ── */}
      <a
        href="/cv.pdf"
        target="_blank"
        rel="noopener noreferrer"
        download="CV_Muhammad_Daffa_Munazzal.pdf"
        className="group relative inline-flex items-center justify-center overflow-hidden px-4 sm:px-8 py-2.5 sm:py-3.5 border border-white/30 text-[var(--color-bone)] font-body text-[11px] sm:text-sm font-semibold uppercase tracking-widest transition-all duration-300 f1-skew-btn hover:border-white hover:bg-white hover:text-black hover:scale-[1.02] active:scale-[0.98]"
      >
        {/* Unskewed Content */}
        <span className="relative z-10 flex items-center gap-2 sm:gap-2.5 f1-skew-content">
          <span>{cvText}</span>
          <Download
            size={13}
            className="transition-transform duration-300 group-hover:-translate-y-0.5"
          />
        </span>
      </a>
    </div>
  );
}

