import { useEffect, useState } from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import { useScrollReveal } from "@/hooks/useScrollReveal";

/**
 * Lavras em numeros, do slide "Terra das escolas e dos ipes" do Webinar RCD.
 *
 * Efeito proprio: cada numero conta de zero ate o valor quando a faixa entra
 * na tela, e um traco cresce embaixo dele no mesmo ritmo. Os rankings (4a, 2a,
 * 69a) contam para BAIXO, do fim da fila ate a posicao — ranking bom e numero
 * pequeno, e a contagem conta essa historia.
 */

interface Numero {
  valor: number;
  casas?: number;
  prefixo?: string;
  sufixo: { pt: string; en: string };
  rotulo: { pt: string; en: string };
  /** Contar a partir deste valor em vez de zero (rankings). */
  de?: number;
}

const NUMEROS: Numero[] = [
  { valor: 111, sufixo: { pt: " mil", en: "k" }, rotulo: { pt: "habitantes", en: "residents" } },
  { valor: 35386.8, casas: 2, prefixo: "R$ ", sufixo: { pt: "", en: "" }, rotulo: { pt: "PIB per capita", en: "GDP per capita" } },
  { valor: 0.782, casas: 3, sufixo: { pt: "", en: "" }, rotulo: { pt: "Índice de Desenvolvimento Humano", en: "Human Development Index" } },
  { valor: 4, de: 60, sufixo: { pt: "ª", en: "th" }, rotulo: { pt: "cidade mais inovadora de Minas Gerais", en: "most innovative city in Minas Gerais" } },
  { valor: 2, de: 60, sufixo: { pt: "ª", en: "nd" }, rotulo: { pt: "cidade mais segura de Minas Gerais", en: "safest city in Minas Gerais" } },
  { valor: 69, de: 400, sufixo: { pt: "ª", en: "th" }, rotulo: { pt: "em qualidade de vida no Brasil", en: "in quality of life in Brazil" } },
];

const DURACAO = 1600;
const suave = (x: number) => 1 - Math.pow(1 - x, 4);

function Contador({ n, ligado, lang, atraso }: { n: Numero; ligado: boolean; lang: "pt" | "en"; atraso: number }) {
  const inicio = n.de ?? 0;
  const [atual, setAtual] = useState(inicio);
  const [fracao, setFracao] = useState(0);

  useEffect(() => {
    if (!ligado) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setAtual(n.valor);
      setFracao(1);
      return;
    }
    let raf = 0;
    let t0 = 0;
    const tick = (t: number) => {
      if (!t0) t0 = t + atraso;
      const x = Math.min(1, Math.max(0, (t - t0) / DURACAO));
      const e = suave(x);
      setAtual(inicio + (n.valor - inicio) * e);
      setFracao(e);
      if (x < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [ligado, n.valor, inicio, atraso]);

  const texto = atual.toLocaleString(lang === "pt" ? "pt-BR" : "en-US", {
    minimumFractionDigits: n.casas ?? 0,
    maximumFractionDigits: n.casas ?? 0,
  });

  return (
    <div className="relative border-t border-white/10 pt-6">
      <span aria-hidden="true" className="absolute left-0 top-[-1px] h-[2px] bg-accent" style={{ width: `${fracao * 100}%` }} />
      <div className="text-[clamp(30px,5vw,46px)] font-semibold leading-none tracking-[-0.03em] tabular-nums">
        {n.prefixo && <span className="mr-1 text-[0.5em] font-medium text-white/60">{n.prefixo}</span>}
        {texto}
        <span className="text-accent">{n.sufixo[lang]}</span>
      </div>
      <p className="mt-3 max-w-[16rem] text-[13.5px] font-light leading-snug text-white/65">{n.rotulo[lang]}</p>
    </div>
  );
}

export default function LavrasEmNumeros() {
  const { lang } = useLanguage();
  const { ref, isVisible } = useScrollReveal(0.25);

  return (
    <div ref={ref} className="mb-20">
      <div className="mb-10 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <h3 className="text-[clamp(22px,4vw,32px)] font-medium leading-tight tracking-[-0.02em]">
          {lang === "pt" ? "Terra das escolas e dos ipês." : "Land of schools and ipê trees."}
        </h3>
        <p className="max-w-md text-[14px] font-light leading-relaxed text-white/60">
          {lang === "pt"
            ? "Vocação educacional e agrícola, no sul de Minas Gerais."
            : "An educational and agricultural vocation, in southern Minas Gerais."}
        </p>
      </div>
      <div className="grid grid-cols-1 gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
        {NUMEROS.map((n, i) => (
          <Contador key={n.rotulo.pt} n={n} ligado={isVisible} lang={lang} atraso={i * 120} />
        ))}
      </div>
    </div>
  );
}
