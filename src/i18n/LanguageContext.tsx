import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { t, type Language } from "./translations";
import { IDIOMAS, localeDe } from "./idiomas";

interface LanguageContextType {
  lang: Language;
  setLang: (l: Language) => void;
  /** Texto escrito na hora: L("Contato", "Contact"). Os outros idiomas vem do dicionario. */
  L: (pt: string, en: string) => string;
}

const LanguageContext = createContext<LanguageContextType>({
  lang: "pt",
  setLang: () => {},
  L: (pt) => pt,
});

const CHAVE = "lvrs-idioma";

/** O site abre em portugues; a escolha da pessoa fica guardada no navegador dela. */
function idiomaInicial(): Language {
  try {
    const salvo = window.localStorage.getItem(CHAVE);
    if (IDIOMAS.some((i) => i.id === salvo)) return salvo as Language;
  } catch {
    // navegador sem localStorage (aba anonima, bloqueio): segue em portugues
  }
  return "pt";
}

/**
 * Fica em volta de todas as rotas (App.tsx), e nao de cada pagina: assim o
 * idioma escolhido continua o mesmo ao passar de Invista para O Pacto.
 */
export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLangState] = useState<Language>(idiomaInicial);

  const setLang = (l: Language) => {
    setLangState(l);
    try {
      window.localStorage.setItem(CHAVE, l);
    } catch {
      // sem localStorage a troca vale so ate fechar a aba
    }
  };

  useEffect(() => {
    document.documentElement.lang = localeDe(lang);
  }, [lang]);

  const L = (pt: string, en: string) => t({ pt, en }, lang);

  return <LanguageContext.Provider value={{ lang, setLang, L }}>{children}</LanguageContext.Provider>;
};

export const useLanguage = () => useContext(LanguageContext);
