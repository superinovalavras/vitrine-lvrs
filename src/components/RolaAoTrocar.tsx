import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * O React Router troca de pagina sem recarregar, e o navegador mantem a rolagem
 * de onde a pessoa estava. Aqui: pagina nova abre no topo, e um link com ancora
 * (ex.: /#contato) vai direto para a secao.
 */
export default function RolaAoTrocar() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      // Espera a pagina nova montar antes de procurar a secao.
      const id = window.setTimeout(() => document.getElementById(hash.slice(1))?.scrollIntoView(), 60);
      return () => window.clearTimeout(id);
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
}
