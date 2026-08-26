import { lazy, Suspense } from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import { translations, t } from "@/i18n/translations";

const LavrasMap = lazy(() => import("@/components/LavrasMap"));

const LocationSection = () => {
  const { lang } = useLanguage();
  const tr = translations.location;

  return (
    <section id="location" className="py-20 lg:py-32 bg-background">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
          <div>
            <p className="text-xs font-body font-semibold tracking-[0.2em] text-primary uppercase mb-5">
              {lang === "pt" ? "LOCALIZAÇÃO" : "LOCATION"}
            </p>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-[48px] leading-[1.08] text-foreground mb-10">
              {t(tr.title1, lang)}<br />{t(tr.title2, lang)}<br />{t(tr.title3, lang)}
            </h2>
            <div className="flex flex-wrap gap-8 mt-10">
              {[
                { value: "230", unit: "km", label: "→ Belo Horizonte" },
                { value: "370", unit: "km", label: "→ São Paulo" },
                { value: "450", unit: "km", label: "→ Rio de Janeiro" },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="flex items-baseline gap-0.5">
                    <span className="font-display text-4xl lg:text-5xl text-foreground">{stat.value}</span>
                    <span className="text-sm text-muted-foreground font-body">{stat.unit}</span>
                  </div>
                  <p className="text-xs text-muted-foreground font-body mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:pt-8 space-y-8">
            <div>
              <p className="text-base text-muted-foreground font-body leading-relaxed mb-4">{t(tr.access, lang)}</p>
              {tr.accessItems[lang].map((item, i) => (
                <div key={i} className="flex items-center gap-3 py-3 border-b border-border">
                  <span className="w-5 h-5 rounded-full bg-primary/15 flex items-center justify-center">
                    <span className="text-primary font-body font-bold text-[10px]">+</span>
                  </span>
                  <span className="text-sm font-body font-medium text-foreground">{item}</span>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="bg-card rounded-3xl p-6">
                <h4 className="text-xs font-body font-bold tracking-[0.1em] text-foreground uppercase mb-4">{t(tr.roadTitle, lang)}</h4>
                {tr.roadItems[lang].map((item, i) => (
                  <p key={i} className="text-xs font-body text-muted-foreground mb-2">• {item}</p>
                ))}
              </div>
              <div className="bg-card rounded-3xl p-6">
                <h4 className="text-xs font-body font-bold tracking-[0.1em] text-foreground uppercase mb-4">{t(tr.airportTitle, lang)}</h4>
                {tr.airports[lang].map((item, i) => (
                  <p key={i} className="text-xs font-body text-muted-foreground mb-2">• {item}</p>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Map */}
        <div className="mt-16">
          <Suspense fallback={<div className="w-full h-[400px] lg:h-[500px] rounded-3xl bg-muted animate-pulse" />}>
            <LavrasMap />
          </Suspense>
        </div>

        {/* Infrastructure */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 mt-12 pt-10 border-t border-border">
          {tr.infraItems[lang].map((item, i) => (
            <div key={i} className="flex items-center gap-2 bg-card rounded-2xl px-4 py-3.5">
              <span className="text-primary font-body font-bold text-xs">✓</span>
              <span className="text-xs font-body text-foreground">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LocationSection;