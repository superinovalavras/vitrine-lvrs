import { lazy, Suspense } from "react";
import BarraEcossistema from "@/components/BarraEcossistema";
import BarraFina from "@/components/BarraFina";
import SecaoAdiada from "@/components/SecaoAdiada";
import { VerticalProvider, useVertical } from "@/context/VerticalContext";
import FaixaProjetos from "@/components/FaixaProjetos";
import ProjetosDaAba from "@/components/ProjetosDaAba";
import MilestonesSection from "@/components/MilestonesSection";
import PactoSection from "@/components/PactoSection";
import HeroVerticais from "@/components/HeroVerticais";
import AboutSection from "@/components/AboutSection";
import GlobalContextSection from "@/components/GlobalContextSection";
import LocationSection from "@/components/LocationSection";
import EcosystemSection from "@/components/EcosystemSection";
// O painel de dados carrega o Recharts, que e a maior dependencia do site.
// Fica no fim da pagina, entao so e baixado quando a pessoa chega la.
const CityDataSection = lazy(() => import("@/components/CityDataSection"));
import Vision2040Section from "@/components/Vision2040Section";
import GallerySection from "@/components/GallerySection";
import Footer from "@/components/Footer";

/**
 * /pacto — o site que estava no ar ate 05/10/2026, agora como pagina do Pacto.
 *
 * Sairam daqui, porque passaram a morar em outras paginas:
 * - os cards dos programas (IniciativasSection) -> /iniciativas
 * - Por que investir, Soft landing e Contato -> / (Invista)
 *
 * Precisa ser um componente separado porque data-vertical le do contexto, e
 * quem consome tem que estar dentro do provider.
 */
const Pagina = () => {
  const { ativa } = useVertical();
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
        {/* Ordem combinada em 24/09/2026: abre com dados de Lavras, passa pelo
            contexto e pela historia, e so entao explica o Pacto e os 12. */}
        <AboutSection />
        <GlobalContextSection />
        <LocationSection />
        <MilestonesSection />
        <PactoSection />
        <FaixaProjetos />
        <Vision2040Section />
        <EcosystemSection />
        <GallerySection />
        <SecaoAdiada>
          <Suspense fallback={<div className="h-96" aria-hidden="true" />}>
            <CityDataSection />
          </Suspense>
        </SecaoAdiada>
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
