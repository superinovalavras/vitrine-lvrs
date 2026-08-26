import churchImage from "@/assets/church-lavras.jpg";
import cultureImage from "@/assets/culture-house.jpg";
import vineyard from "@/assets/vineyard-lavras.jpg";
import wineryImage from "@/assets/winery-lavras.jpg";
import { useLanguage } from "@/i18n/LanguageContext";
import { translations, t } from "@/i18n/translations";
import { Reveal } from "@/hooks/useScrollReveal";

const AboutSection = () => {
  const { lang } = useLanguage();
  const tr = translations.about;

  const stats = [
  { value: "US$2.1T", label: t(tr.stats.gdp, lang) },
  { value: "76%", label: t(tr.stats.commerce, lang) },
  { value: "110ha", label: t(tr.stats.industrial, lang) },
  { value: "Top 5", label: t(tr.stats.ufla, lang) }];


  return (
    <section id="about" className="relative lg:py-32 bg-background overflow-hidden py-[20px]" aria-label={lang === "pt" ? "Sobre Lavras" : "About Lavras"}>
      {/* Decorative gradient orbs */}
      <div className="absolute top-20 -left-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl animate-pulse-glow" />
      <div className="absolute bottom-20 -right-40 w-96 h-96 bg-primary/3 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: "2s" }} />

      <div className="relative max-w-[1400px] mx-auto px-6 lg:px-10">
        {/* Top header area */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 mb-20">
          <Reveal>
            <p className="text-xs font-body font-semibold tracking-[0.2em] text-primary uppercase mb-5">
              {t(tr.tag, lang)}
            </p>
            <h2 className="font-display lg:text-[48px] leading-[1.08] text-foreground text-2xl">
              {t(tr.title1, lang)}<br />{t(tr.title2, lang)}<br />{t(tr.title3, lang)}
            </h2>
          </Reveal>
          <Reveal delay={200}>
            <div className="lg:pt-12">
              <p className="text-base text-muted-foreground font-body leading-relaxed mb-6">
                {t(tr.description, lang)}
              </p>
              <p className="text-base text-muted-foreground font-body leading-relaxed">
                {t(tr.description2, lang)}
              </p>
            </div>
          </Reveal>
        </div>

        {/* Image grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20">
          {[
          { src: vineyard, alt: "Alma Gerais Vineyard", tall: true },
          { src: churchImage, alt: "Sant'Ana Parish", tall: false },
          { src: cultureImage, alt: "Lavras House of Culture", tall: false },
          { src: wineryImage, alt: "Alma Gerais Winery", tall: true }].
          map((img, i) =>
          <Reveal key={i} delay={i * 150}>
              <div className={`overflow-hidden rounded-3xl ${img.tall ? "aspect-[3/4]" : "aspect-square"} group relative`}>
                <img src={img.src} alt={img.alt} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </Reveal>
          )}
        </div>

        {/* Lavras+ card */}
        <Reveal>
          <div className="bg-gradient-mesh rounded-[2rem] p-6 sm:p-10 lg:p-16 mb-20 border border-primary/10 glow-primary">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
              <div>
                <h3 className="font-display text-3xl lg:text-4xl text-secondary-foreground leading-[1.1] mb-5">
                  <span className="bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">LAVRAS+</span>
                </h3>
                <p className="text-sm text-secondary-foreground/50 font-body leading-relaxed mb-6">
                  {t(tr.lavrasPlus, lang)}
                </p>
                <a href="#contact" className="inline-block px-7 py-3.5 bg-accent text-accent-foreground text-sm font-bold font-body rounded-full hover:brightness-110 hover:shadow-lg hover:shadow-accent/20 transition-all">
                  {lang === "pt" ? "Conheça a visão" : "Discover the vision"}
                </a>
              </div>
              <div className="grid grid-cols-2 gap-6">
                {stats.map((stat, i) =>
                <Reveal key={stat.label} delay={i * 100}>
                    <div className="bg-background/30 backdrop-blur-sm rounded-2xl p-5 border border-primary/10 hover:border-primary/30 transition-colors">
                      <div className="font-display text-xl sm:text-3xl lg:text-4xl text-foreground mb-2 bg-gradient-to-br from-foreground to-primary bg-clip-text text-transparent">{stat.value}</div>
                      <p className="text-xs text-muted-foreground font-body">{stat.label}</p>
                    </div>
                  </Reveal>
                )}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>);

};

export default AboutSection;