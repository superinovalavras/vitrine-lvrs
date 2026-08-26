import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import { useVertical } from "@/context/VerticalContext";
import { VERTICAIS, ORDEM_ABAS } from "@/data/verticais";
import logoGoverno from "@/assets/logo-governo-lavras.svg";
import logoLvrs from "@/assets/logo-lvrs.svg";
import logoVale from "@/assets/logo-vale-ipes.svg";

/**
 * Navegacao que aparece depois do hero.
 *
 * O hero ocupa a tela inteira e nao tem menu — e proposital, para a marca nao
 * disputar espaco. Mas a pagina tem 17 mil pixels, entao a partir dai a pessoa
 * ficava sem nenhuma forma de navegar. Esta barra resolve: some enquanto o hero
 * esta em cena e aparece depois, escondendo-se ao descer e voltando ao subir,
 * que e o padrao que menos rouba tela no celular.
 *
 * Ordem das logos definida pelo Ramon: Prefeitura sempre primeiro.
 */
export default function BarraFina() {
  const { lang, toggleLang } = useLanguage();
  const { ativa, setAtiva } = useVertical();
  const [visivel, setVisivel] = useState(false);
  const ultimoY = useRef(0);

  useEffect(() => {
    const aoRolar = () => {
      const y = window.scrollY;
      const delta = y - ultimoY.current;

      // Margem para nao piscar com tremida de dedo ou salto de layout.
      if (Math.abs(delta) < 5) return;
      ultimoY.current = y;

      // Dentro do hero a barra nunca aparece: ali a marca manda sozinha.
      if (y <= window.innerHeight * 0.9) {
        setVisivel(false);
        return;
      }
      setVisivel(delta < 0);
    };
    window.addEventListener("scroll", aoRolar, { passive: true });
    aoRolar();
    return () => window.removeEventListener("scroll", aoRolar);
  }, []);

  const abas = ORDEM_ABAS.map((id) => VERTICAIS.find((v) => v.id === id)!);

  return (
    <div
      className={`fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-background/85 backdrop-blur-md transition-transform duration-300 ${
        visivel ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-2.5 sm:gap-5 sm:px-6">
        <a href="#topo" className="flex shrink-0 items-center gap-3" aria-label={lang === "pt" ? "Ir para o topo" : "Back to top"}>
          <img src={logoGoverno} alt="Governo de Lavras" className="h-7 w-auto object-contain sm:h-8" />
          <img src={logoLvrs} alt="LVRS+" className="hidden h-6 w-auto object-contain sm:block sm:h-7" />
          <img src={logoVale} alt="Vale dos Ipês" className="hidden h-6 w-auto object-contain lg:block lg:h-7" />
        </a>

        {/* Trocar de vertical continua possivel longe do hero. */}
        <nav className="sem-barra ml-auto flex items-center gap-1 overflow-x-auto" aria-label={lang === "pt" ? "Verticais" : "Verticals"}>
          {abas.map((v) => {
            const on = v.id === ativa;
            return (
              <button
                key={v.id}
                type="button"
                onClick={() => setAtiva(v.id)}
                aria-current={on ? "true" : undefined}
                style={on ? { background: v.cor } : { color: v.cor }}
                className={`shrink-0 rounded-lg px-2.5 py-1.5 text-[10.5px] font-semibold uppercase tracking-[0.14em] transition-colors sm:px-3 sm:text-[11.5px] ${
                  on ? "text-accent-foreground" : "hover:bg-white/10"
                }`}
              >
                {v.rotulo}
              </button>
            );
          })}
        </nav>

        <button
          type="button"
          onClick={toggleLang}
          className="shrink-0 border-l border-white/15 pl-3 text-[11px] tracking-[0.08em] text-white/70 transition-colors hover:text-white sm:pl-4"
        >
          {lang === "pt" ? "PT · EN" : "EN · PT"}
        </button>
      </div>
    </div>
  );
}
