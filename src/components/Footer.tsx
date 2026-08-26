import { useLanguage } from "@/i18n/LanguageContext";
import { translations, t } from "@/i18n/translations";
import logoGoverno from "@/assets/logo-governo-lavras.svg";
import logoLvrs from "@/assets/logo-lvrs.svg";
import logoValeIpes from "@/assets/logo-vale-ipes.svg";

const Footer = () => {
  const { lang } = useLanguage();
  const tr = translations.footer;
  const links = tr.links[lang];

  return (
    <footer className="bg-secondary text-secondary-foreground py-20" role="contentinfo">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12 mb-16">
          {/* Logo */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="border-2 border-secondary-foreground/30 rounded-xl px-2.5 py-1.5">
                <span className="font-body text-[10px] font-black leading-none tracking-tight block text-secondary-foreground">LVRS</span>
                <span className="font-body text-[10px] font-black leading-none tracking-tight block text-accent">+</span>
              </div>
            </div>
            <p className="text-sm font-body text-secondary-foreground/50 leading-relaxed">
              {t(tr.vision, lang)}
            </p>
          </div>

          {/* Nav columns */}
          <nav aria-label={lang === "pt" ? "Links do rodapé" : "Footer links"}>
            <h4 className="text-xs font-body font-bold text-secondary-foreground/60 uppercase tracking-wider mb-5">
              {lang === "pt" ? "Navegação" : "Navigation"}
            </h4>
            <div className="space-y-3">
              {links.slice(0, 4).map((label, i) => (
                <a key={label} href={`#${tr.hrefs[i]}`} className="block text-sm font-body text-secondary-foreground/50 hover:text-secondary-foreground transition-colors">
                  {label}
                </a>
              ))}
            </div>
          </nav>
          <nav aria-label={lang === "pt" ? "Mais links" : "More links"}>
            <h4 className="text-xs font-body font-bold text-secondary-foreground/60 uppercase tracking-wider mb-5">
              {lang === "pt" ? "Mais" : "More"}
            </h4>
            <div className="space-y-3">
              {links.slice(4).map((label, i) => (
                <a key={label} href={`#${tr.hrefs[i + 4]}`} className="block text-sm font-body text-secondary-foreground/50 hover:text-secondary-foreground transition-colors">
                  {label}
                </a>
              ))}
            </div>
          </nav>
          <div>
            <h4 className="text-xs font-body font-bold text-secondary-foreground/60 uppercase tracking-wider mb-5">
              {lang === "pt" ? "Contato" : "Contact"}
            </h4>
            <address className="space-y-3 not-italic">
              <a href="tel:+5535988638608" className="block text-sm font-body text-secondary-foreground/50 hover:text-secondary-foreground transition-colors">
                +55 35 98863-8608
              </a>
              <a href="mailto:rralvarenga@lavras.mg.gov.br" className="block text-sm font-body text-secondary-foreground/50 hover:text-secondary-foreground transition-colors">
                rralvarenga@lavras.mg.gov.br
              </a>
            </address>
          </div>
        </div>

        {/* Partner logos */}
        <div className="border-t border-secondary-foreground/10 pt-10 pb-8">
          <p className="text-[10px] font-body font-semibold text-secondary-foreground/40 uppercase tracking-[0.15em] mb-6 text-center">
            {lang === "pt" ? "Realização e Apoio" : "Organized & Supported by"}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-10 lg:gap-14" role="group" aria-label={lang === "pt" ? "Logos dos parceiros" : "Partner logos"}>
            <img src={logoGoverno} alt="Governo de Lavras" className="h-14 lg:h-16 object-contain opacity-80 hover:opacity-100 transition-opacity" />
            <img src={logoLvrs} alt="LVRS+ Pacto Lavras pela Inovação" className="h-10 lg:h-12 object-contain opacity-80 hover:opacity-100 transition-opacity" />
            <img src={logoValeIpes} alt="Vale dos Ipês" className="h-10 lg:h-12 object-contain opacity-80 hover:opacity-100 transition-opacity" />
          </div>
        </div>

        <div className="border-t border-secondary-foreground/10 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-[11px] font-body text-secondary-foreground/30">
            © 2026 LVRS+ — Governo de Lavras
          </p>
          <p className="text-[11px] font-body text-secondary-foreground/30">
            {lang === "pt" ? "Fevereiro, 2026" : "February, 2026"}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
