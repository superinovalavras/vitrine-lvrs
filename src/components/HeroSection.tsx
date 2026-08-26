import coverImage from "@/assets/harvest-sunset.jpg";
import { useLanguage } from "@/i18n/LanguageContext";
import { translations, t } from "@/i18n/translations";

const HeroSection = () => {
  const { lang } = useLanguage();
  const tr = translations.hero;

  return (
    <section
      className="relative h-[60vh] lg:min-h-screen overflow-hidden"
      aria-label={lang === "pt" ? "Seção principal" : "Hero section"}
    >
      {/* Full-bleed background image */}
      <div className="absolute inset-0">
        <img
          src={coverImage}
          alt={lang === "pt" ? "Vista aérea de Lavras, Minas Gerais" : "Aerial view of Lavras, Minas Gerais"}
          className="w-full h-full object-cover"
          loading="eager"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/35 to-black/65" />
      </div>

      {/* Animated decorative elements */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 1440 900"
        fill="none"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        {/* Flowing lines */}
        <path
          d="M-50 200 Q 300 100 500 350 T 900 250 T 1500 400"
          stroke="hsl(147 25% 63%)"
          strokeWidth="1.5"
          strokeOpacity="0.25"
          fill="none"
          className="animate-pulse-glow"
        />
        <path
          d="M-100 500 Q 200 400 450 550 T 850 450 T 1500 600"
          stroke="hsl(147 25% 63%)"
          strokeWidth="1"
          strokeOpacity="0.15"
          fill="none"
        />
        <path
          d="M-80 700 Q 350 600 600 720 T 1100 650 T 1500 750"
          stroke="hsl(155 40% 45%)"
          strokeWidth="1"
          strokeOpacity="0.12"
          fill="none"
        />

        {/* Glowing dots */}
        <circle cx="500" cy="350" r="4" fill="hsl(147 25% 63%)" fillOpacity="0.5" className="animate-float" />
        <circle cx="900" cy="250" r="6" fill="hsl(147 25% 63%)" fillOpacity="0.6" className="animate-float-delayed" />
        <circle cx="450" cy="550" r="3" fill="hsl(155 40% 45%)" fillOpacity="0.4" className="animate-float" />
        <circle cx="1100" cy="400" r="5" fill="hsl(147 25% 63%)" fillOpacity="0.3" className="animate-float-delayed" />
        <circle cx="200" cy="300" r="3" fill="hsl(155 40% 45%)" fillOpacity="0.35" className="animate-float" />

        {/* Glowing orbs */}
        <circle cx="300" cy="600" r="80" fill="url(#glow1)" className="animate-pulse-glow" />
        <circle
          cx="1100"
          cy="300"
          r="120"
          fill="url(#glow2)"
          className="animate-pulse-glow"
          style={{ animationDelay: "2s" }}
        />

        <defs>
          <radialGradient id="glow1">
            <stop offset="0%" stopColor="hsl(147 25% 63%)" stopOpacity="0.08" />
            <stop offset="100%" stopColor="hsl(147 25% 63%)" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="glow2">
            <stop offset="0%" stopColor="hsl(155 40% 45%)" stopOpacity="0.06" />
            <stop offset="100%" stopColor="hsl(155 40% 45%)" stopOpacity="0" />
          </radialGradient>
        </defs>
      </svg>

      {/* Content */}
      <div className="relative max-w-[1400px] mx-auto px-6 lg:px-10 h-full lg:min-h-screen flex flex-col justify-center items-center text-center">
        <h1 className="font-display text-3xl sm:text-5xl lg:text-[72px] leading-[1.05] text-white max-w-3xl glow-text animate-fade-in-up">
          {t(tr.title1, lang)}
          <br />
          {t(tr.title2, lang)}
          <br />
          {t(tr.title3, lang)}
        </h1>
      </div>

      {/* Bottom rounded mask */}
      <div className="absolute bottom-0 left-0 right-0 h-12 bg-background rounded-t-[2.5rem]" aria-hidden="true" />
    </section>
  );
};

export default HeroSection;
