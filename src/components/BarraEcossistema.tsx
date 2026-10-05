import { useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/i18n/LanguageContext";
import { URL_GESTAO } from "@/data/verticais";
import type { Language } from "@/i18n/translations";

/**
 * Barra fixa no topo de todas as paginas: o menu do site a esquerda e, a
 * direita, o "Ecossistema", que abre todos os sites do LVRS+ agrupados como na
 * pagina Iniciativas. A ideia (05/10/2026) e que os sites dos programas
 * ganhem esta mesma barra, para a pessoa pular de um para outro.
 *
 * Idiomas: so PT e EN por enquanto. ES, FR, DE e mandarim estao decididos, mas
 * so entram quando o site inteiro estiver traduzido e revisado.
 */

export type PaginaSite = "invista" | "pacto" | "iniciativas";

type Item = { rotulo: { pt: string; en: string }; href: string | null };

const SITE: { id: PaginaSite | "contato"; rotulo: { pt: string; en: string }; href: string }[] = [
  { id: "invista", rotulo: { pt: "Invista", en: "Invest" }, href: "/" },
  { id: "pacto", rotulo: { pt: "O Pacto", en: "The Pact" }, href: "/pacto" },
  { id: "iniciativas", rotulo: { pt: "Iniciativas", en: "Initiatives" }, href: "/iniciativas" },
  { id: "contato", rotulo: { pt: "Contato", en: "Contact" }, href: "/#contato" },
];

const GRUPOS: { titulo: { pt: string; en: string }; itens: Item[] }[] = [
  {
    titulo: { pt: "lvrs.com.br", en: "lvrs.com.br" },
    itens: [
      { rotulo: { pt: "Invista em Lavras", en: "Invest in Lavras" }, href: "/" },
      { rotulo: { pt: "O Pacto", en: "The Pact" }, href: "/pacto" },
      { rotulo: { pt: "Iniciativas", en: "Initiatives" }, href: "/iniciativas" },
      { rotulo: { pt: "Contato", en: "Contact" }, href: "/#contato" },
    ],
  },
  {
    titulo: { pt: "Formação", en: "Training" },
    itens: [
      { rotulo: { pt: "Lavras Lab", en: "Lavras Lab" }, href: "https://lavraslab.lvrs.com.br" },
      { rotulo: { pt: "Launch LVRS+", en: "Launch LVRS+" }, href: "https://launch.lvrs.com.br" },
      { rotulo: { pt: "Academia de Inovação", en: "Innovation Academy" }, href: null },
    ],
  },
  {
    titulo: { pt: "Dados e transparência", en: "Data and transparency" },
    itens: [
      { rotulo: { pt: "Observatório VDI", en: "VDI Observatory" }, href: "https://observatorio.lvrs.com.br" },
      { rotulo: { pt: "Painel de gestão do Pacto", en: "Pact management panel" }, href: URL_GESTAO },
    ],
  },
  {
    titulo: { pt: "Reconhecimento e comunidade", en: "Recognition and community" },
    itens: [
      { rotulo: { pt: "Prêmio Lavras de Inovação", en: "Lavras Innovation Award" }, href: "https://premio.lvrs.com.br" },
      { rotulo: { pt: "Vale dos Ipês", en: "Vale dos Ipês" }, href: null },
    ],
  },
];

const IDIOMAS: Language[] = ["pt", "en"];

function Destino({ href, children }: { href: string; children: ReactNode }) {
  // Rotas deste site navegam sem recarregar; os outros sites sao links comuns.
  return href.startsWith("/") ? <Link to={href}>{children}</Link> : <a href={href}>{children}</a>;
}

export default function BarraEcossistema({ pagina }: { pagina: PaginaSite }) {
  const { lang, setLang } = useLanguage();
  const [aberto, setAberto] = useState(false);

  return (
    <nav className="eco" data-aberto={aberto ? "" : undefined} aria-label={lang === "pt" ? "Ecossistema LVRS+" : "LVRS+ ecosystem"}>
      <div className="eco-linha">
        <Link className="eco-marca" to="/" aria-label="LVRS+">
          <img src="/marca/lvrs-pacto.png" alt="LVRS+" />
        </Link>
        <div className="eco-site">
          {SITE.map((s) => (
            <Link key={s.id} to={s.href} aria-current={s.id === pagina ? "page" : undefined}>
              {s.rotulo[lang]}
            </Link>
          ))}
        </div>
        <div className="eco-dir">
          <button type="button" className="eco-btn" aria-expanded={aberto} aria-controls="eco-menu" onClick={() => setAberto((a) => !a)}>
            <span className="rot">{lang === "pt" ? "Ecossistema" : "Ecosystem"}</span>
            {/* No celular o menu do site some da barra e vai para dentro deste botao. */}
            <span className="rot-m">Menu</span>
            <span className="seta" aria-hidden="true">▾</span>
          </button>
          <div className="eco-idioma" role="group" aria-label={lang === "pt" ? "Idioma" : "Language"}>
            {IDIOMAS.map((l) => (
              <button key={l} type="button" aria-pressed={l === lang} onClick={() => setLang(l)}>
                {l.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="eco-menu" id="eco-menu">
        <div>
          <div className="eco-grid" onClick={(e) => (e.target as HTMLElement).closest("a") && setAberto(false)}>
            {GRUPOS.map((g) => (
              <div key={g.titulo.pt}>
                <h5>{g.titulo[lang]}</h5>
                {g.itens.map((it) =>
                  it.href ? (
                    <Destino key={it.rotulo.pt} href={it.href}>
                      {it.rotulo[lang]}
                    </Destino>
                  ) : (
                    <span key={it.rotulo.pt} className="breve">
                      {it.rotulo[lang]} <small>{lang === "pt" ? "em breve" : "soon"}</small>
                    </span>
                  ),
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
