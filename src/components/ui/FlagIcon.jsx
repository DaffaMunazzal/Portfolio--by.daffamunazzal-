/* src/components/ui/FlagIcon.jsx
   Clean, scalable SVG flag icons for ID, EN, and DEU.
   Avoids Windows OS emoji limitation (which renders flags as 2-letter country initials). */

export function FlagIcon({ code, className = "w-5 h-3.5" }) {
  switch (code) {
    case "id":
      return (
        <svg
          className={`rounded-sm shadow-sm inline-block object-cover flex-shrink-0 ${className}`}
          viewBox="0 0 640 480"
          aria-label="Bendera Indonesia"
        >
          <g fillRule="evenodd" strokeWidth="1pt">
            <path fill="#e70011" d="M0 0h640v240H0z" />
            <path fill="#ffffff" d="M0 240h640v240H0z" />
          </g>
        </svg>
      );
    case "en":
      return (
        <svg
          className={`rounded-sm shadow-sm inline-block object-cover flex-shrink-0 ${className}`}
          viewBox="0 0 640 480"
          aria-label="Flag of the United Kingdom"
        >
          <path fill="#012169" d="M0 0h640v480H0z" />
          <path
            fill="#FFF"
            d="m75 0 244 181L562 0h78v62L400 241l240 178v61h-80L320 301 81 480H0v-60l239-179L0 64V0h75z"
          />
          <path
            fill="#C8102E"
            d="m424 288 216 159v33h-44L380 320l44-32zM640 0v10L443 157l36 29L640 58V0zm-196 93 17 22L70 480H0v-22l444-365zm-228 99L0 37v37l148 111 68 7z"
          />
          <path fill="#FFF" d="M240 0h160v480H240zM0 160h640v160H0z" />
          <path fill="#C8102E" d="M267 0h106v480H267zM0 187h640v106H0z" />
        </svg>
      );
    case "deu":
      return (
        <svg
          className={`rounded-sm shadow-sm inline-block object-cover flex-shrink-0 ${className}`}
          viewBox="0 0 640 480"
          aria-label="Flagge Deutschlands"
        >
          <path fill="#ffce00" d="M0 320h640v160H0z" />
          <path fill="#000000" d="M0 0h640v160H0z" />
          <path fill="#dd0000" d="M0 160h640v160H0z" />
        </svg>
      );
    default:
      return null;
  }
}

export default FlagIcon;
