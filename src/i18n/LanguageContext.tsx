import { createContext, useContext, useState, ReactNode } from "react";
import type { Language } from "./translations";

interface LanguageContextType {
  lang: Language;
  toggleLang: () => void;
}

const LanguageContext = createContext<LanguageContextType>({
  lang: "pt",
  toggleLang: () => {},
});

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLang] = useState<Language>("pt");
  const toggleLang = () => setLang((l) => (l === "pt" ? "en" : "pt"));

  return (
    <LanguageContext.Provider value={{ lang, toggleLang }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
