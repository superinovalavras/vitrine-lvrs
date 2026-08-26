import { useState } from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import { translations, t } from "@/i18n/translations";
import { Reveal } from "@/hooks/useScrollReveal";
import { GraduationCap, Building2, Lightbulb, Landmark, HeartPulse } from "lucide-react";

const tabIds = ["education", "companies", "innovation", "infrastructure", "quality"] as const;

const tabIcons = {
  education: GraduationCap,
  companies: Building2,
  innovation: Lightbulb,
  infrastructure: Landmark,
  quality: HeartPulse,
};

const EcosystemSection = () => {
  const [activeTab, setActiveTab] = useState<string>("education");
  const { lang } = useLanguage();
  const tr = translations.ecosystem;
  const content = tr.content[activeTab as keyof typeof tr.content];

  return (
    <section id="ecosystem" className="relative py-20 lg:py-32 bg-secondary overflow-hidden">
      {/* Decorative orbs */}
      <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/4 rounded-full blur-3xl" />
      <div className="absolute bottom-10 -right-20 w-80 h-80 bg-primary/5 rounded-full blur-3xl animate-pulse-glow" />

      <div className="relative max-w-[1400px] mx-auto px-6 lg:px-10">
        {/* Header */}
        <Reveal>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <p className="text-xs font-body font-semibold tracking-[0.2em] text-primary uppercase mb-5">
              {lang === "pt" ? "ECOSSISTEMA" : "ECOSYSTEM"}
            </p>
            <h2 className="font-display text-3xl lg:text-[48px] leading-[1.08] text-secondary-foreground">
              {t(tr.title, lang)}
            </h2>
          </div>
        </Reveal>

        {/* Tab buttons as icon cards */}
        <Reveal delay={100}>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-3 mb-12 sm:mb-16">
            {tabIds.map((id) => {
              const Icon = tabIcons[id];
              const isActive = activeTab === id;
              return (
                <button
                  key={id}
                  onClick={() => setActiveTab(id)}
                  className={`relative flex flex-col items-center gap-2 sm:gap-3 p-4 sm:p-6 rounded-2xl text-center transition-all duration-300 group ${
                    isActive
                      ? "bg-primary/15 border-2 border-primary/40 shadow-lg shadow-primary/10"
                      : "bg-secondary-foreground/5 border border-secondary-foreground/10 hover:border-primary/20 hover:bg-primary/5"
                  }`}
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${
                    isActive
                      ? "bg-icon text-background shadow-md shadow-icon/30"
                      : "bg-secondary-foreground/10 text-secondary-foreground/50 group-hover:bg-icon/15 group-hover:text-icon"
                  }`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <span className={`text-[11px] font-body font-semibold tracking-wide uppercase transition-colors ${
                    isActive ? "text-primary" : "text-secondary-foreground/40 group-hover:text-secondary-foreground/70"
                  }`}>
                    {t(tr.tabs[id as keyof typeof tr.tabs], lang)}
                  </span>
                  {isActive && (
                    <div className="absolute -bottom-px left-1/2 -translate-x-1/2 w-8 h-1 bg-icon rounded-full" />
                  )}
                </button>
              );
            })}
          </div>
        </Reveal>

        {/* Content area */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          <Reveal>
            <div className="bg-card/50 backdrop-blur-sm rounded-3xl p-8 lg:p-10 border border-primary/10">
              <p className="text-base text-secondary-foreground/70 font-body leading-relaxed mb-5">
                {t(content.description, lang)}
              </p>
              <p className="text-sm text-secondary-foreground/50 font-body leading-relaxed mb-8">
                {t(content.details, lang)}
              </p>
              <a
                href="#contact"
                className="inline-block px-7 py-3.5 bg-accent text-accent-foreground text-sm font-bold font-body rounded-full hover:brightness-110 hover:shadow-lg hover:shadow-accent/20 transition-all"
              >
                {t(tr.cta, lang)}
              </a>
            </div>
          </Reveal>

          <Reveal delay={150}>
            <div className="space-y-2">
              {content.items[lang].map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-4 py-4 px-5 rounded-2xl bg-secondary-foreground/3 border border-transparent hover:border-primary/15 hover:bg-primary/5 transition-all duration-300 group"
                >
                  <span className="w-8 h-8 rounded-xl bg-icon/15 flex items-center justify-center shrink-0 group-hover:bg-icon/25 group-hover:shadow-sm group-hover:shadow-icon/20 transition-all">
                    <span className="text-icon font-body font-bold text-xs">{String(i + 1).padStart(2, "0")}</span>
                  </span>
                  <span className="text-sm font-body font-medium text-secondary-foreground/80 group-hover:text-secondary-foreground transition-colors">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default EcosystemSection;
