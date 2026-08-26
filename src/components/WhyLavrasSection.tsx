import { useLanguage } from "@/i18n/LanguageContext";
import { translations, t } from "@/i18n/translations";
import fadminasStudents from "@/assets/fadminas-students.jpg";

const WhyLavrasSection = () => {
  const { lang } = useLanguage();
  const tr = translations.whyLavras;

  return (
    <section id="why-lavras" className="py-20 lg:py-32 bg-card">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        {/* Header */}
        <div className="max-w-3xl mb-20">
          <p className="text-xs font-body font-semibold tracking-[0.2em] text-primary uppercase mb-5">
            {t(tr.tag, lang)}
          </p>
          <h2 className="font-display text-3xl lg:text-[48px] leading-[1.08] text-foreground mb-6">
            {t(tr.title, lang)}
          </h2>
          <p className="text-base text-muted-foreground font-body leading-relaxed">
            {t(tr.description, lang)}
          </p>
        </div>

        {/* Soft Landing */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 mb-24">
          <div>
            <h3 className="font-display text-xl text-foreground mb-8">
              {lang === "pt" ? "O modelo garante:" : "This model ensures:"}
            </h3>
            {tr.modelItems[lang].map((item, i) => (
              <div key={i} className="flex items-start gap-3 py-4 border-b border-border">
                <span className="w-6 h-6 rounded-full bg-primary/15 flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-primary font-body font-bold text-[10px]">+</span>
                </span>
                <span className="text-sm font-body text-foreground">{item}</span>
              </div>
            ))}
          </div>
          <div className="overflow-hidden rounded-[2rem]">
            <img src={fadminasStudents} alt="Estudantes em Lavras" className="w-full h-full object-cover aspect-[4/3]" loading="lazy" />
          </div>
        </div>

        {/* Investment Phases */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-24">
          {[tr.phases.pre, tr.phases.impl, tr.phases.ops].map((phase, pi) => (
            <div key={pi} className="bg-secondary rounded-3xl p-5 sm:p-8">
              <span className="text-xs font-body font-bold text-primary bg-primary/15 px-3 py-1.5 rounded-full mb-5 inline-block">
                {String(pi + 1).padStart(2, "0")}
              </span>
              <h3 className="font-display text-lg text-secondary-foreground mb-6 leading-snug">
                {t(phase.title, lang)}
              </h3>
              {phase.items[lang].map((item, i) => (
                <div key={i} className="flex items-start gap-2.5 py-2.5 border-b border-secondary-foreground/10 last:border-0">
                  <span className="text-primary font-body font-bold text-[10px] mt-1">•</span>
                  <span className="text-sm font-body text-secondary-foreground/60">{item}</span>
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Bottom 3 cols */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 pt-12 border-t border-border">
          <div>
            <h3 className="font-display text-lg text-foreground mb-6">{t(tr.talentTitle, lang)}</h3>
            {tr.talentItems[lang].map((item, i) => (
              <div key={i} className="flex items-start gap-2.5 mb-3">
                <span className="text-primary font-body font-bold text-xs mt-0.5">+</span>
                <span className="text-sm font-body text-muted-foreground">{item}</span>
              </div>
            ))}
          </div>
          <div>
            <h3 className="font-display text-lg text-foreground mb-6">{t(tr.invitationTitle, lang)}</h3>
            {tr.invitationItems[lang].map((item, i) => (
              <div key={i} className="flex items-start gap-2.5 mb-3">
                <span className="text-primary font-body font-bold text-xs mt-0.5">+</span>
                <span className="text-sm font-body text-muted-foreground">{item}</span>
              </div>
            ))}
          </div>
          <div>
            <h3 className="font-display text-lg text-foreground mb-6">{t(tr.partnershipTitle, lang)}</h3>
            <p className="text-sm font-body text-muted-foreground leading-relaxed">
              {t(tr.partnershipDesc, lang)}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyLavrasSection;