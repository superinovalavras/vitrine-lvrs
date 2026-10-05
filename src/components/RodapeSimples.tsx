import { Link } from "react-router-dom";
import { useLanguage } from "@/i18n/LanguageContext";
import { URL_GESTAO } from "@/data/verticais";
import logoGoverno from "@/assets/logo-governo-lavras.svg";
import logoLvrs from "@/assets/logo-lvrs.svg";
import logoVale from "@/assets/logo-vale-ipes.svg";

/** Rodape curto da home e de Iniciativas. O Pacto segue com o Footer completo. */
export default function RodapeSimples({ fontes }: { fontes?: boolean }) {
  const { lang } = useLanguage();
  return (
    <footer className="lv-rodape">
      <div className="lv-wrap">
        {/* Ordem definida pelo Ramon: Prefeitura sempre primeiro. */}
        <div className="logos">
          <img src={logoGoverno} alt="Governo de Lavras" />
          <img src={logoLvrs} alt="LVRS+" />
          <img src={logoVale} alt="Vale dos Ipês" />
        </div>
        <nav aria-label={lang === "pt" ? "Rodapé" : "Footer"}>
          <Link to="/">{lang === "pt" ? "Invista" : "Invest"}</Link>
          <Link to="/pacto">{lang === "pt" ? "O Pacto" : "The Pact"}</Link>
          <Link to="/iniciativas">{lang === "pt" ? "Iniciativas" : "Initiatives"}</Link>
          <a href={URL_GESTAO}>{lang === "pt" ? "Painel de gestão" : "Management panel"}</a>
        </nav>
        {fontes && (
          <span>
            {lang === "pt" ? "Fontes" : "Sources"}: IBGE, INEP, CAGED, SENATRAN,{" "}
            {lang === "pt" ? "Guia de Investimento de Lavras 2026–2040" : "Lavras Investment Guide 2026–2040"}.
          </span>
        )}
      </div>
    </footer>
  );
}
