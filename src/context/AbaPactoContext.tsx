import { createContext, useContext, useState, type ReactNode } from "react";
import { ABAS_PACTO, type AbaPacto, type AbaPactoId } from "@/data/missoes";

/**
 * Qual aba da pagina /pacto esta aberta: o Pacto ou uma das quatro missoes.
 * Vive aqui em cima porque o hero, a barra fina, os projetos e os atalhos do
 * fim da pagina leem a mesma aba.
 */

interface AbaPactoContextType {
  ativa: AbaPactoId;
  setAtiva: (id: AbaPactoId) => void;
  aba: AbaPacto;
}

const Ctx = createContext<AbaPactoContextType>({
  ativa: "pacto",
  setAtiva: () => {},
  aba: ABAS_PACTO[0],
});

export const AbaPactoProvider = ({ children }: { children: ReactNode }) => {
  const [ativa, setAtiva] = useState<AbaPactoId>("pacto");
  const aba = ABAS_PACTO.find((a) => a.id === ativa)!;
  return <Ctx.Provider value={{ ativa, setAtiva, aba }}>{children}</Ctx.Provider>;
};

export const useAbaPacto = () => useContext(Ctx);
