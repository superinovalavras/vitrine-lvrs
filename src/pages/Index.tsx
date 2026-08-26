import { lazy, Suspense } from "react";
import { LanguageProvider } from "@/i18n/LanguageContext";
import { VerticalProvider, useVertical } from "@/context/VerticalContext";
import FaixaProjetos from "@/components/FaixaProjetos";
import IniciativasSection from "@/components/IniciativasSection";
import HeroVerticais from "@/components/HeroVerticais";
import AboutSection from "@/components/AboutSection";
import GlobalContextSection from "@/components/GlobalContextSection";
import LocationSection from "@/components/LocationSection";
import EcosystemSection from "@/components/EcosystemSection";
// O painel de dados carrega o Recharts, que e a maior dependencia do site.
// Fica no fim da pagina, entao so e baixado quando a pessoa chega la.
const CityDataSection = lazy(() => import("@/components/CityDataSection"));
import WhyInvestSection from "@/components/WhyInvestSection";
import ProjectsSection from "@/components/ProjectsSection";
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
    <div data-vertical={ativa} className="min-h-screen bg-background">
        {/* Skip to main content for keyboard/screen reader users */}
        <a href="#about" className="skip-to-content">
          Pular para o conteúdo
        </a>
        {/* A Navbar antiga saiu daqui: ela empilhava tres logos e links acima do
            hero de tela cheia, competindo com a marca. Os utilitarios (sobre,
            ecossistema, contato, PT/EN) agora vivem no topo do proprio hero.
            EM ABERTO: navegacao depois que a pessoa rola o hero, e onde ficam
            as logos de Prefeitura e Vale dos Ipes (candidato natural: o rodape). */}
        <main>
          <HeroVerticais />
          <IniciativasSection />
          <AboutSection />
          <GlobalContextSection />
          <LocationSection />
          <EcosystemSection />
          <WhyInvestSection />
          <ProjectsSection />
          <FaixaProjetos />
          <Vision2040Section />
          <GallerySection />
          <Suspense fallback={<div className="h-96" aria-hidden="true" />}>
            <CityDataSection />
          </Suspense>
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
