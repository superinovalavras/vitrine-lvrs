import churchImage from "@/assets/church-lavras.jpg";
import cultureImage from "@/assets/culture-house.jpg";
import vineyard from "@/assets/vineyard-lavras.jpg";
import wineryImage from "@/assets/winery-lavras.jpg";
import { useLanguage } from "@/i18n/LanguageContext";
import { translations, t } from "@/i18n/translations";
import { Reveal } from "@/hooks/useScrollReveal";
import LavrasEmNumeros from "@/components/LavrasEmNumeros";

const AboutSection = () => {
  const { lang } = useLanguage();
  const tr = translations.about;

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

        {/* Numeros de Lavras logo depois do titulo: a pagina abre com dados.
            O texto do Lavras+ que ficava aqui foi para a PactoSection. */}
        <LavrasEmNumeros />

        {/* Image grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
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

      </div>
    </section>);

};

export default AboutSection;