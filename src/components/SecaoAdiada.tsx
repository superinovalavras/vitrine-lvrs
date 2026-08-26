import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Segura a renderizacao dos filhos ate a secao chegar perto da viewport.
 *
 * Sozinho, React.lazy nao adia nada de util: ele dispara o import assim que o
 * componente e RENDERIZADO, e o React renderiza a arvore inteira de uma vez,
 * esteja na tela ou nao. O chunk sai do caminho critico mas baixa junto.
 *
 * Envolvendo com isto, o import so acontece quando a pessoa chega perto — que
 * era a intencao desde o comeco.
 */
export default function SecaoAdiada({
  children,
  alturaReserva = "24rem",
  margem = "600px",
}: {
  children: ReactNode;
  /** Espaco ocupado antes de carregar, para o scroll nao dar solavanco. */
  alturaReserva?: string;
  /** Quanto antes de aparecer comecar a baixar. */
  margem?: string;
}) {
  const alvo = useRef<HTMLDivElement>(null);
  const [visivel, setVisivel] = useState(false);

  useEffect(() => {
    if (visivel) return;
    const el = alvo.current;
    if (!el) return;

    // Sem IntersectionObserver, mostra tudo: melhor carregar demais do que
    // deixar a secao invisivel para sempre.
    if (typeof IntersectionObserver === "undefined") {
      setVisivel(true);
      return;
    }

    const mostrar = () => {
      setVisivel(true);
      obs.disconnect();
      window.removeEventListener("scroll", aoRolar);
    };

    const obs = new IntersectionObserver(
      (entradas) => {
        if (entradas.some((e) => e.isIntersecting)) mostrar();
      },
      { rootMargin: margem },
    );
    obs.observe(el);

    // Rede de seguranca: se por algum motivo o observer nao disparar, qualquer
    // rolagem revela a secao. Nao custa download para quem nunca rola.
    const aoRolar = () => {
      if (el.getBoundingClientRect().top < window.innerHeight + 600) mostrar();
    };
    window.addEventListener("scroll", aoRolar, { passive: true });

    return () => {
      obs.disconnect();
      window.removeEventListener("scroll", aoRolar);
    };
  }, [visivel, margem]);

  return <div ref={alvo}>{visivel ? children : <div style={{ height: alturaReserva }} aria-hidden="true" />}</div>;
}
