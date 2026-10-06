import { t } from "@/i18n/translations";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import BarraEcossistema from "@/components/BarraEcossistema";
import { useLanguage } from "@/i18n/LanguageContext";
import BarraFina from "@/components/BarraFina";
import { AbaPactoProvider, useAbaPacto } from "@/context/AbaPactoContext";
import FaixaProjetos from "@/components/FaixaProjetos";
import ProjetosDaAba from "@/components/ProjetosDaAba";
import MilestonesSection from "@/components/MilestonesSection";
import PactoSection from "@/components/PactoSection";
import HeroPacto from "@/components/HeroPacto";
import GlobalContextSection from "@/components/GlobalContextSection";
import EcosystemSection from "@/components/EcosystemSection";
import Vision2040Section from "@/components/Vision2040Section";
import GallerySection from "@/components/GallerySection";
import Footer from "@/components/Footer";

/** Secoes que so existem na aba Pacto; um link para elas leva a aba Pacto. */
const SECOES_DO_PACTO = ["context", "milestones", "pacto", "projetos", "vision-2040", "ecosystem", "gallery"];

/** Fim das abas de missao: volta ao Pacto completo ou vai a home, que fala com quem investe. */
function AtalhosDaAba() {
  const { L } = useLanguage();
  const { setAtiva } = useAbaPacto();
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
          <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-accent">{L("O Pacto", "The Pact")}</span>
          <h3 className="mt-3 text-[20px] font-semibold leading-snug">
            {L("A estratégia completa, a história e os 12 projetos", "The full strategy, the history and the 12 projects")}
          </h3>
          <span className="mt-6 inline-flex items-center gap-2 text-[13px] font-semibold text-accent transition-[gap] group-hover:gap-3.5">
            {L("Ver o Pacto", "See the Pact")} <span aria-hidden="true">→</span>
          </span>
        </button>
        <Link
          to="/"
          className="group rounded-3xl border border-white/10 bg-card p-7 transition-colors hover:border-accent/50 sm:p-8"
        >
          <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-accent">{L("Invista", "Invest")}</span>
          <h3 className="mt-3 text-[20px] font-semibold leading-snug">
            {L("Por que trazer sua empresa para Lavras", "Why bring your company to Lavras")}
          </h3>
          <span className="mt-6 inline-flex items-center gap-2 text-[13px] font-semibold text-accent transition-[gap] group-hover:gap-3.5">
            {L("Falar com a Prefeitura", "Talk to City Hall")} <span aria-hidden="true">→</span>
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
 * Precisa ser um componente separado porque le a aba do contexto, e quem
 * consome tem que estar dentro do provider.
 */
const Pagina = () => {
  const { ativa, setAtiva } = useAbaPacto();

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
    // A cor e sempre a do Pacto (amarelo): as missoes sao do Pacto, nao verticais.
    <div id="topo" data-vertical="pacto" className="min-h-screen bg-background">
      <a href="#conteudo" className="skip-to-content">
        Pular para o conteúdo
      </a>
      <BarraEcossistema pagina="pacto" />
      {/* A BarraFina continua: e ela que troca de aba longe do hero. Agora
          encaixa logo abaixo da barra do ecossistema. */}
      <BarraFina />
      <main id="conteudo">
        <HeroPacto />
        <ProjetosDaAba />
        {/* O conteudo geral do Pacto so aparece na aba Pacto (05/10/2026): igual
            em todas as abas, trocar de aba parecia nao mudar nada. As abas de
            missao ficam com o hero, os projetos da missao e um atalho. */}
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
  <AbaPactoProvider>
    <Pagina />
  </AbaPactoProvider>
);

export default Pacto;
