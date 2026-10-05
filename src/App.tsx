import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/i18n/LanguageContext";
import Invista from "./pages/Invista";
import Pacto from "./pages/Pacto";
import Iniciativas from "./pages/Iniciativas";
import NotFound from "./pages/NotFound";
import RolaAoTrocar from "@/components/RolaAoTrocar";

const queryClient = new QueryClient();

/**
 * Tres paginas (decisao de 05/10/2026): a home e a porta de entrada para quem
 * quer investir, O Pacto e o site que estava no ar ate entao, e Iniciativas
 * reune os programas por grupo.
 */
const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <LanguageProvider>
        <BrowserRouter>
          <RolaAoTrocar />
          <Routes>
            <Route path="/" element={<Invista />} />
            <Route path="/pacto" element={<Pacto />} />
            <Route path="/iniciativas" element={<Iniciativas />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </LanguageProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
