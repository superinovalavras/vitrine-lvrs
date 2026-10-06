import { useEffect } from "react";
import { Link } from "react-router-dom";
import BarraEcossistema from "@/components/BarraEcossistema";
import { useLanguage } from "@/i18n/LanguageContext";
import BarraFina from "@/components/BarraFina";
import { VerticalProvider, useVertical } from "@/context/VerticalContext";
import type { VerticalId } from "@/data/verticais";
import FaixaProjetos from "@/components/FaixaProjetos";
import ProjetosDaAba from "@/components/ProjetosDaAba";
import MilestonesSection from "@/components/MilestonesSection";
import PactoSection from "@/components/PactoSection";
import HeroVerticais from "@/components/HeroVerticais";
import GlobalContextSection from "@/components/GlobalContextSection";
import EcosystemSection from "@/components/EcosystemSection";
import Vision2040Section from "@/components/Vision2040Section";
import GallerySection from "@/components/GallerySection";
import Footer from "@/components/Footer";

/** Secoes que so existem na aba Pacto; um link para elas leva a aba Pacto. */
const SECOES_DO_PACTO = ["context", "milestones", "pacto", "projetos", "vision-2040", "ecosystem", "gallery"];

const CHAMADA_INVISTA: Partial<Record<VerticalId, { pt: string; en: string }>> = {
  agro: { pt: "Por que trazer sua empresa do agro para Lavras", en: "Why bring your agribusiness to Lavras" },
  food: { pt: "Por que trazer sua empresa de alimentos para Lavras", en: "Why bring your food company to Lavras" },
  tech: { pt: "Por que trazer sua empresa de tecnologia para Lavras", en: "Why bring your tech company to Lavras" },
  sri: { pt: "Por que operar no Sul de Minas a partir de Lavras", en: "Why operate in Southern Minas from Lavras" },
};

/** Fim das abas Agro, Food, Tech e SRI: volta ao Pacto completo ou vai a porta do setor na home. */
function AtalhosDaAba() {
  const { lang } = useLanguage();
  const { vertical, setAtiva } = useVertical();
  const pt = lang === "pt";
  const irAoPacto = () => {
    setAtiva("pacto");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <section className="bg-background pb-24 pt-8">
      <div className="mx-auto grid max-w-6xl gap-4 px-5 sm:px-6 md:grid-cols-2">
        <button
          type="button"
          onClick={irAoPacto}
          className="group rounded-3xl border border-white/10 bg-card p-7 text-left transition-colors hover:border-accent/50 sm:p-8"
        >
          <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-accent">{pt ? "O Pacto" : "The Pact"}</span>
          <h3 className="mt-3 text-[20px] font-semibold leading-snug">
            {pt ? "A estratégia completa, a história e os 12 projetos" : "The full strategy, the history and the 12 projects"}
          </h3>
          <span className="mt-6 inline-flex items-center gap-2 text-[13px] font-semibold text-accent transition-[gap] group-hover:gap-3.5">
            {pt ? "Ver o Pacto" : "See the Pact"} <span aria-hidden="true">→</span>
          </span>
        </button>
        <Link
          to={`/?setor=${vertical.id}#setor`}
          className="group rounded-3xl border border-white/10 bg-card p-7 transition-colors hover:border-accent/50 sm:p-8"
        >
          <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-accent">{pt ? "Invista" : "Invest"}</span>
          <h3 className="mt-3 text-[20px] font-semibold leading-snug">
            {CHAMADA_INVISTA[vertical.id]?.[lang]}
          </h3>
          <span className="mt-6 inline-flex items-center gap-2 text-[13px] font-semibold text-accent transition-[gap] group-hover:gap-3.5">
            {pt ? "Falar com a Prefeitura" : "Talk to City Hall"} <span aria-hidden="true">→</span>
          </span>
        </Link>
      </div>
    </section>
  );
}

/**
 * /pacto — o site que estava no ar ate 05/10/2026, agora como pagina do Pacto.
 *
 * Sairam daqui, porque passaram a morar em outras paginas:
 * - os cards dos programas (IniciativasSection) -> /iniciativas
 * - Por que investir, Soft landing e Contato -> / (Invista)
 * - Sobre Lavras, Localizacao e o painel Dados da cidade -> / (Invista): os
 *   numeros, as distancias e a infraestrutura ja estao na home
 *
 * Precisa ser um componente separado porque data-vertical le do contexto, e
 * quem consome tem que estar dentro do provider.
 */
const Pagina = () => {
  const { ativa, setAtiva } = useVertical();

  // O rodape aponta para secoes que so existem na aba Pacto. Vindo de outra
  // aba, troca para o Pacto e rola ate a secao depois que ela aparece.
  useEffect(() => {
    const aoMudar = () => {
      const id = window.location.hash.slice(1);
      if (!SECOES_DO_PACTO.includes(id)) return;
      setAtiva("pacto");
      window.setTimeout(() => document.getElementById(id)?.scrollIntoView(), 60);
    };
    window.addEventListener("hashchange", aoMudar);
    return () => window.removeEventListener("hashchange", aoMudar);
  }, [setAtiva]);

  return (
    <div id="topo" data-vertical={ativa} className="min-h-screen bg-background">
      <a href="#conteudo" className="skip-to-content">
        Pular para o conteúdo
      </a>
      <BarraEcossistema pagina="pacto" />
      {/* A BarraFina continua: e ela que troca de vertical longe do hero. Agora
          encaixa logo abaixo da barra do ecossistema. */}
      <BarraFina />
      <main id="conteudo">
        <HeroVerticais />
        <ProjetosDaAba />
        {/* O conteudo geral do Pacto so aparece na aba Pacto (05/10/2026): igual
            em todas as abas, trocar de aba parecia nao mudar nada. As outras
            abas ficam com o hero, os projetos dela e um atalho. */}
        {ativa === "pacto" ? (
          <>
            {/* Ordem combinada em 24/09/2026 (contexto, historia, Pacto e os 12).
                "Sobre Lavras", Localizacao e Dados da cidade sairam em 05/10/2026:
                os mesmos dados ja estao na home. */}
            <GlobalContextSection />
            <MilestonesSection />
            <PactoSection />
            <FaixaProjetos />
            <Vision2040Section />
            <EcosystemSection />
            <GallerySection />
          </>
        ) : (
          <AtalhosDaAba />
        )}
      </main>
      <Footer />
    </div>
  );
};

const Pacto = () => (
  <VerticalProvider>
    <Pagina />
  </VerticalProvider>
);

export default Pacto;
