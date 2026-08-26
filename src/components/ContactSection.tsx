import serraBocaina from "@/assets/serra-bocaina.jpg";
import { useLanguage } from "@/i18n/LanguageContext";
import { translations, t } from "@/i18n/translations";
import { Reveal } from "@/hooks/useScrollReveal";

const ContactSection = () => {
  const { lang } = useLanguage();
  const tr = translations.contact;

  return (
    <section id="contact" className="relative py-28 lg:py-40 overflow-hidden" aria-label={lang === "pt" ? "Contato" : "Contact"}>
      <div className="absolute inset-0">
        <img src={serraBocaina} alt="" className="w-full h-full object-cover" loading="lazy" role="presentation" />
        <div className="absolute inset-0 bg-black/70" />
      </div>

      {/* Animated glowing orbs */}
      <div className="absolute top-1/4 left-1/4 w-40 h-40 bg-primary/10 rounded-full blur-3xl animate-pulse-glow" />
      <div className="absolute bottom-1/4 right-1/4 w-60 h-60 bg-primary/8 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: "2s" }} />

      {/* Top rounded mask */}
      <div className="absolute top-0 left-0 right-0 h-12 bg-card rounded-b-[2.5rem]" aria-hidden="true" />

      <div className="relative max-w-[1400px] mx-auto px-6 lg:px-10">
        <Reveal>
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-xs font-body font-semibold tracking-[0.2em] text-primary uppercase mb-5">
              {t(tr.tag, lang)}
            </p>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-[56px] text-secondary-foreground leading-[1.08] mb-8 glow-text">
              {t(tr.title1, lang)}<br />{t(tr.title2, lang)}<br />{t(tr.title3, lang)}<br />{t(tr.title4, lang)}
            </h2>
            <p className="text-sm font-body text-secondary-foreground/60 leading-relaxed mb-10 max-w-lg mx-auto">
              {t(tr.description, lang)}
            </p>

            <a
              href="mailto:rralvarenga@lavras.mg.gov.br"
              className="inline-flex items-center px-10 py-4 bg-accent text-accent-foreground text-sm font-bold font-body rounded-full hover:brightness-110 hover:shadow-lg hover:shadow-accent/30 transition-all mb-14 focus-visible:ring-2 focus-visible:ring-white animate-glow-pulse"
            >
              {t(tr.cta, lang)}
            </a>

            <div className="space-y-3 text-secondary-foreground/70 font-body border-t border-primary/20 pt-8 text-center">
              <p className="font-bold text-secondary-foreground text-lg">Rodolfo Rosa Alvarenga</p>
              <p className="text-sm text-secondary-foreground/50">{t(tr.role, lang)}</p>
              <div className="flex flex-col sm:flex-row justify-center gap-4 text-sm mt-2">
                <a href="tel:+5535988638608" className="hover:text-primary transition-colors underline-offset-4 hover:underline">
                  +55 35 98863-8608
                </a>
                <a href="mailto:rralvarenga@lavras.mg.gov.br" className="hover:text-primary transition-colors underline-offset-4 hover:underline">
                  rralvarenga@lavras.mg.gov.br
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default ContactSection;
