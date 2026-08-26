import { createContext, useContext, useState, type ReactNode } from "react";
import { VERTICAIS, VERTICAL_PADRAO, type Vertical, type VerticalId } from "@/data/verticais";

/**
 * Qual vertical esta ativa. Vive aqui em cima, e nao dentro do hero, para que
 * a pagina INTEIRA acompanhe a cor da aba escolhida: o atributo data-vertical
 * fica na raiz e --accent desce por cascata para todas as secoes.
 */

interface VerticalContextType {
  ativa: VerticalId;
  setAtiva: (id: VerticalId) => void;
  vertical: Vertical;
}

const Ctx = createContext<VerticalContextType>({
  ativa: VERTICAL_PADRAO,
  setAtiva: () => {},
  vertical: VERTICAIS.find((v) => v.id === VERTICAL_PADRAO)!,
});

export const VerticalProvider = ({ children }: { children: ReactNode }) => {
  const [ativa, setAtiva] = useState<VerticalId>(VERTICAL_PADRAO);
  const vertical = VERTICAIS.find((v) => v.id === ativa)!;
  return <Ctx.Provider value={{ ativa, setAtiva, vertical }}>{children}</Ctx.Provider>;
};

export const useVertical = () => useContext(Ctx);
