import { useState, useEffect, useCallback } from "react";
import { Menu, X, Globe } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { translations, t } from "@/i18n/translations";
import logoGoverno from "@/assets/logo-governo-lavras.svg";
import logoLvrs from "@/assets/logo-lvrs.svg";
import logoVale from "@/assets/logo-vale-ipes.svg";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { lang, toggleLang } = useLanguage();
  const tr = translations.nav;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on escape key
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) setIsOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isOpen]);

  const handleNavClick = useCallback(() => setIsOpen(false), []);

  const navLinks = [
    { label: t(tr.about, lang), href: "#about" },
    { label: t(tr.ecosystem, lang), href: "#ecosystem" },
    { label: t(tr.whyInvest, lang), href: "#why-invest" },
    { label: t(tr.projects, lang), href: "#projects" },
    { label: t(tr.lvrsProjects, lang), href: "#lvrs-projects" },
    { label: t(tr.vision2040, lang), href: "#vision-2040" },
    { label: t(tr.gallery, lang), href: "#gallery" },
    { label: t(tr.contact, lang), href: "#contact" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-background/95 backdrop-blur-md shadow-sm" : "bg-transparent"
      }`}
      role="navigation"
      aria-label={lang === "pt" ? "Navegação principal" : "Main navigation"}
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <a href="#" className="flex items-center gap-3" aria-label={lang === "pt" ? "Voltar ao topo" : "Back to top"}>
            <img src={logoGoverno} alt="Governo de Lavras" className={`h-10 lg:h-12 object-contain transition-all ${scrolled ? "invert" : ""}`} />
            <img src={logoLvrs} alt="LVRS+" className={`h-9 lg:h-10 object-contain transition-all ${scrolled ? "invert" : ""}`} />
            <img src={logoVale} alt="Vale dos Ipês" className={`h-9 lg:h-10 object-contain transition-all ${scrolled ? "invert" : ""}`} />
          </a>

          <div className="hidden lg:flex items-center gap-5 xl:gap-6">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`text-[10px] font-semibold tracking-[0.1em] transition-colors font-body uppercase hover:underline underline-offset-4 ${
                  scrolled ? "text-foreground/60 hover:text-foreground" : "text-white/70 hover:text-white"
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-3">
            <button
              onClick={toggleLang}
              className={`flex items-center gap-1.5 text-xs font-semibold font-body transition-colors ${
                scrolled ? "text-foreground/60 hover:text-foreground" : "text-white/70 hover:text-white"
              }`}
              aria-label={lang === "pt" ? "Mudar para inglês" : "Switch to Portuguese"}
            >
              <Globe className="w-3.5 h-3.5" aria-hidden="true" />
              {lang === "pt" ? "EN" : "PT"}
            </button>
            <a
              href="#contact"
              className="ml-2 px-5 py-2.5 bg-accent text-accent-foreground text-xs font-bold font-body rounded-full hover:brightness-110 transition-all shadow-sm"
            >
              {lang === "pt" ? "Contato" : "Contact"}
            </a>
          </div>

          <button
            className={`lg:hidden p-2 transition-colors ${scrolled ? "text-foreground" : "text-white"}`}
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? (lang === "pt" ? "Fechar menu" : "Close menu") : (lang === "pt" ? "Abrir menu" : "Open menu")}
            aria-expanded={isOpen}
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="lg:hidden bg-background border-t border-border animate-in slide-in-from-top-2 duration-200" role="menu">
          <div className="px-6 py-4 space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={handleNavClick}
                className="block px-4 py-3 text-sm font-semibold tracking-widest text-foreground/70 hover:text-foreground hover:bg-card rounded-xl transition-colors font-body uppercase"
                role="menuitem"
              >
                {link.label}
              </a>
            ))}
            <button
              onClick={toggleLang}
              className="flex items-center gap-2 px-4 py-3 text-sm font-semibold font-body text-accent"
              role="menuitem"
            >
              <Globe className="w-4 h-4" aria-hidden="true" />
              {lang === "pt" ? "English" : "Português"}
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
