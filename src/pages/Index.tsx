import { lazy, Suspense } from "react";
import BarraFina from "@/components/BarraFina";
import SecaoAdiada from "@/components/SecaoAdiada";
import { LanguageProvider } from "@/i18n/LanguageContext";
import { VerticalProvider, useVertical } from "@/context/VerticalContext";
import FaixaProjetos from "@/components/FaixaProjetos";
import IniciativasSection from "@/components/IniciativasSection";
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
import WhyInvestSection from "@/components/WhyInvestSection";
import Vision2040Section from "@/components/Vision2040Section";
import GallerySection from "@/components/GallerySection";
import WhyLavrasSection from "@/components/WhyLavrasSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

/**
 * Precisa ser um componente separado porque data-vertical le do contexto, e
 * quem consome tem que estar dentro do provider.
 */
const Pagina = () => {
  const { ativa } = useVertical();
  return (
    <div id="topo" data-vertical={ativa} className="min-h-screen bg-background">
        {/* Atalho de teclado. Aponta para o <main>, e nao para #about como
            antes: dali ele pulava o hero e os cards dos programas junto com a
            barra, que e justamente o conteudo que abre a pagina. */}
        <a href="#conteudo" className="skip-to-content">
          Pular para o conteúdo
        </a>
        {/* A Navbar antiga saiu daqui: ela empilhava tres logos e links acima do
            hero de tela cheia, competindo com a marca. Os utilitarios (sobre,
            ecossistema, contato, PT/EN) agora vivem no topo do proprio hero.
            A BarraFina cobre parte do vazio (topo e troca de vertical), mas
            EM ABERTO segue: nenhum link leva a uma secao especifica, e as
            logos de Prefeitura e Vale dos Ipes ainda nao tem lugar definido
            fora dela (candidato natural: o rodape). */}
        <BarraFina />
        <main id="conteudo">
          <HeroVerticais />
          <IniciativasSection />
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
          <WhyInvestSection />
          <GallerySection />
          <SecaoAdiada>
            <Suspense fallback={<div className="h-96" aria-hidden="true" />}>
              <CityDataSection />
            </Suspense>
          </SecaoAdiada>
          <WhyLavrasSection />
          <ContactSection />
        </main>
      <Footer />
    </div>
  );
};

const Index = () => (
  <LanguageProvider>
    <VerticalProvider>
      <Pagina />
    </VerticalProvider>
  </LanguageProvider>
);

export default Index;
