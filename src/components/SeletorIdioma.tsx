import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import { IDIOMAS } from "@/i18n/idiomas";

/**
 * Botao com a bandeira e a sigla do idioma atual; ao clicar, abre a lista dos
 * seis idiomas, cada um com bandeira e nome na propria lingua (pedido de
 * 06/10/2026). Fecha ao escolher, ao clicar fora ou com Esc.
 */
export default function SeletorIdioma() {
  const { lang, setLang, L } = useLanguage();
  const [aberto, setAberto] = useState(false);
  const caixa = useRef<HTMLDivElement>(null);
  const atual = IDIOMAS.find((i) => i.id === lang)!;

  useEffect(() => {
    if (!aberto) return;
    const fora = (e: PointerEvent) => {
      if (!caixa.current?.contains(e.target as Node)) setAberto(false);
    };
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setAberto(false);
    document.addEventListener("pointerdown", fora);
    document.addEventListener("keydown", esc);
    return () => {
      document.removeEventListener("pointerdown", fora);
      document.removeEventListener("keydown", esc);
    };
  }, [aberto]);

  return (
    <div className="idioma" ref={caixa} data-aberto={aberto ? "" : undefined}>
      <button
        type="button"
        className="idioma-btn"
        aria-haspopup="listbox"
        aria-expanded={aberto}
        aria-label={`${L("Idioma", "Language")}: ${atual.nome}`}
        onClick={() => setAberto((a) => !a)}
      >
        <span className="bandeira"><atual.Bandeira /></span>
        <span className="sigla">{atual.sigla}</span>
        <span className="seta" aria-hidden="true">▾</span>
      </button>
      {aberto && (
        <ul className="idioma-lista" role="listbox" aria-label={L("Idioma", "Language")}>
          {IDIOMAS.map((i) => (
            <li key={i.id}>
              <button
                type="button"
                role="option"
                aria-selected={i.id === lang}
                lang={i.locale}
                onClick={() => {
                  setLang(i.id);
                  setAberto(false);
                }}
              >
                <span className="bandeira"><i.Bandeira /></span>
                <span className="nome">{i.nome}</span>
                {i.id === lang && <span className="ok" aria-hidden="true">✓</span>}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
