import { useLanguage } from "@/i18n/LanguageContext";
import { translations, t } from "@/i18n/translations";
import sriImage from "@/assets/agro-sprayer.jpg";
import { Reveal } from "@/hooks/useScrollReveal";

const GlobalContextSection = () => {
  const { lang } = useLanguage();
  const tr = translations.globalContext;

  return (
    <section id="context" className="relative py-20 lg:py-32 bg-card overflow-hidden">
      {/* Decorative */}
      <div className="absolute top-40 -right-20 w-60 h-60 bg-primary/5 rounded-full blur-3xl animate-pulse-glow" />

      <div className="relative max-w-[1400px] mx-auto px-6 lg:px-10">
        {/* Future of Food */}
        <div className="mb-28">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
            <Reveal>
              <div>
                <p className="text-xs font-body font-semibold tracking-[0.2em] text-primary uppercase mb-5">
                  {t(tr.tag, lang)}
                </p>
                <h2 className="font-display text-3xl lg:text-[48px] leading-[1.08] text-foreground mb-8">
                  {t(tr.title, lang)}
                </h2>
                <p className="text-base text-muted-foreground font-body leading-relaxed mb-8">
                  {t(tr.description, lang)}
                </p>
                <div className="bg-primary/10 border-l-4 border-primary p-6 rounded-r-2xl glow-primary">
                  <p className="text-sm font-body text-foreground/80 leading-relaxed">
                    {t(tr.faoStat, lang)}
                  </p>
                </div>
              </div>
            </Reveal>
            <Reveal delay={200}>
              <div className="space-y-10">
                <div>
                  <h4 className="text-xs font-body font-bold tracking-[0.15em] text-muted-foreground uppercase mb-5">
                    {lang === "pt" ? "SISTEMA SOB PRESSÃO" : "SYSTEM UNDER PRESSURE"}
                  </h4>
                  {tr.pressureItems[lang].map((item, i) => (
                    <div key={i} className="flex items-start gap-3 py-3.5 border-b border-border group hover:border-primary/30 transition-colors">
                      <span className="w-5 h-5 rounded-full bg-primary/15 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-primary/25 group-hover:shadow-sm group-hover:shadow-primary/20 transition-all">
                        <span className="text-primary font-body font-bold text-[10px]">+</span>
                      </span>
                      <span className="text-sm font-body text-foreground/70 group-hover:text-foreground transition-colors">{item}</span>
                    </div>
                  ))}
                </div>
                <div>
                  <h4 className="text-xs font-body font-bold tracking-[0.15em] text-muted-foreground uppercase mb-5">
                    {lang === "pt" ? "INTELIGÊNCIA ALIMENTAR" : "FOOD INTELLIGENCE"}
                  </h4>
                  {tr.intelligenceItems[lang].map((item, i) => (
                    <div key={i} className="flex items-start gap-3 py-3.5 border-b border-border group hover:border-primary/30 transition-colors">
                      <span className="w-5 h-5 rounded-full bg-primary/15 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-primary/25 group-hover:shadow-sm group-hover:shadow-primary/20 transition-all">
                        <span className="text-primary font-body font-bold text-[10px]">+</span>
                      </span>
                      <span className="text-sm font-body text-foreground/70 group-hover:text-foreground transition-colors">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Brazil Stats */}
        <div className="mb-28">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">
            <Reveal>
              <div>
                <p className="text-xs font-body font-semibold tracking-[0.2em] text-primary uppercase mb-5">
                  {t(tr.brazilTag, lang)}
                </p>
                <h2 className="font-display text-3xl lg:text-[44px] leading-[1.08] text-foreground mb-6">
                  {t(tr.brazilTitle, lang)}
                </h2>
                <p className="text-base text-muted-foreground font-body leading-relaxed">
                  {t(tr.brazilDescription, lang)}
                </p>
              </div>
            </Reveal>
            <div className="grid grid-cols-2 gap-4">
              {tr.brazilStats.map((stat, i) => (
                <Reveal key={i} delay={i * 100}>
                  <div className="bg-background rounded-2xl p-6 border border-border hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 group">
                    <div className="font-display text-3xl text-foreground mb-2 group-hover:text-primary transition-colors">
                      {stat.value}
                      {"unit" in stat && <span className="text-lg text-muted-foreground ml-1">{stat.unit}</span>}
                    </div>
                    <p className="text-xs text-muted-foreground font-body">{t(stat.label, lang)}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>

        {/* Minas + Southern Minas */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
          <Reveal>
            <div>
              <p className="text-xs font-body font-semibold tracking-[0.2em] text-primary uppercase mb-5">
                {t(tr.minasTag, lang)}
              </p>
              <h2 className="font-display text-2xl lg:text-[36px] leading-[1.12] text-foreground mb-6">
                {t(tr.minasTitle, lang)}
              </h2>
              <p className="text-sm text-muted-foreground font-body leading-relaxed mb-6">
                {t(tr.minasDescription, lang)}
              </p>
              {tr.minasOffers[lang].map((item, i) => (
                <div key={i} className="flex items-center gap-3 py-3.5 border-b border-border group hover:border-primary/30 transition-colors">
                  <span className="w-5 h-5 rounded-full bg-primary/15 flex items-center justify-center group-hover:bg-primary/25 transition-all">
                    <span className="text-primary font-body font-bold text-[10px]">✓</span>
                  </span>
                  <span className="text-sm font-body font-medium text-foreground/80 group-hover:text-foreground transition-colors">{item}</span>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal delay={200}>
            <div>
              <p className="text-xs font-body font-semibold tracking-[0.2em] text-primary uppercase mb-5">
                {t(tr.sriTag, lang)}
              </p>
              <h2 className="font-display text-2xl lg:text-[36px] leading-[1.12] text-foreground mb-6">
                {t(tr.sriTitle, lang)}
              </h2>
              <p className="text-sm text-muted-foreground font-body leading-relaxed mb-6">
                {t(tr.sriDescription, lang)}
              </p>
              <div className="overflow-hidden rounded-3xl aspect-[16/9] group relative">
                <img src={sriImage} alt="Agro technology in Lavras" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default GlobalContextSection;
