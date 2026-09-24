import { useCallback, useEffect, useRef, useState, type PointerEvent } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { ERAS, MARCOS } from "@/data/milestones";
import { VERTICAIS, type VerticalId } from "@/data/verticais";

/**
 * Linha do tempo 1873–2025, rolavel na horizontal.
 *
 * Interacao propria desta secao (nao repete o fade-up das outras):
 * - um ano grande acompanha o marco que esta no centro da trilha;
 * - uma barra de progresso enche conforme se avanca no tempo;
 * - as eras funcionam como capitulos clicaveis;
 * - o filtro por frente acende so os marcos daquela vertical, na cor dela;
 * - no desktop da para arrastar a trilha com o mouse.
 */

const COR: Record<VerticalId, string> = Object.fromEntries(VERTICAIS.map((v) => [v.id, v.cor])) as Record<VerticalId, string>;
const FRENTES: VerticalId[] = ["pacto", "agro", "food", "tech", "sri"];

const eraDoAno = (ano: string) => {
  const n = parseInt(ano, 10);
  return ERAS.find((e) => n >= e.de && n <= e.ate)?.id ?? ERAS[0].id;
};

export default function MilestonesSection() {
  const { lang } = useLanguage();
  const trilha = useRef<HTMLDivElement>(null);
  const itens = useRef<(HTMLLIElement | null)[]>([]);
  const [ativo, setAtivo] = useState(0);
  const [progresso, setProgresso] = useState(0);
  const [frente, setFrente] = useState<VerticalId | null>(null);
  const arraste = useRef<{ x: number; scroll: number; moveu: boolean } | null>(null);

  // Descobre qual marco esta no centro da trilha. rAF para nao recalcular a
  // cada evento de scroll.
  const quadro = useRef(0);
  const medir = useCallback(() => {
    cancelAnimationFrame(quadro.current);
    quadro.current = requestAnimationFrame(() => {
      const el = trilha.current;
      if (!el) return;
      const max = el.scrollWidth - el.clientWidth;
      setProgresso(max > 0 ? el.scrollLeft / max : 0);
      const centro = el.scrollLeft + el.clientWidth / 2;
      let melhor = 0;
      let dist = Infinity;
      itens.current.forEach((li, i) => {
        if (!li) return;
        const d = Math.abs(li.offsetLeft + li.offsetWidth / 2 - centro);
        if (d < dist) {
          dist = d;
          melhor = i;
        }
      });
      setAtivo(melhor);
    });
  }, []);

  useEffect(() => {
    medir();
    window.addEventListener("resize", medir);
    return () => {
      window.removeEventListener("resize", medir);
      cancelAnimationFrame(quadro.current);
    };
  }, [medir]);

  const irPara = (i: number) => {
    const el = trilha.current;
    const li = itens.current[i];
    if (!el || !li) return;
    el.scrollTo({ left: li.offsetLeft - el.clientWidth / 2 + li.offsetWidth / 2, behavior: "smooth" });
  };

  const passo = (dir: 1 | -1) => {
    const el = trilha.current;
    if (el) el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: "smooth" });
  };

  // Arrastar com o mouse. No toque o scroll nativo ja resolve.
  const pressionar = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse" || !trilha.current) return;
    arraste.current = { x: e.clientX, scroll: trilha.current.scrollLeft, moveu: false };
  };
  const mover = (e: PointerEvent<HTMLDivElement>) => {
    const a = arraste.current;
    if (!a || !trilha.current) return;
    const dx = e.clientX - a.x;
    if (Math.abs(dx) > 4) a.moveu = true;
    trilha.current.scrollLeft = a.scroll - dx;
  };
  const soltar = () => {
    // Deixa o "moveu" viver ate o click que vem logo depois, para nao
    // disparar o clique no card ao terminar um arraste.
    setTimeout(() => (arraste.current = null), 0);
  };

  const marco = MARCOS[ativo];
  const eraAtiva = eraDoAno(marco.ano);

  return (
    <section id="milestones" className="relative overflow-hidden bg-[hsl(var(--chrome))] py-20 sm:py-28" aria-label="Milestones">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <p className="text-[12px] font-semibold uppercase tracking-[0.22em] text-accent">Milestones</p>
            <h2 className="mt-4 max-w-xl text-[clamp(26px,5.5vw,44px)] font-medium leading-[1.1] tracking-[-0.02em]">
              {lang === "pt" ? "Histórico que inspira, futuro que desafia." : "A history that inspires, a future that challenges."}
            </h2>
            <p className="mt-4 max-w-lg text-[14.5px] font-light leading-relaxed text-white/65">
              {lang === "pt"
                ? "Da Escola Agrícola ao Pacto pela Inovação: 150 anos de marcos que fizeram de Lavras um ecossistema."
                : "From the Agricultural School to the Innovation Pact: 150 years of milestones that made Lavras an ecosystem."}
            </p>
          </div>

          {/* O ano do marco central. key={ano} reinicia a animacao a cada troca. */}
          <div className="relative select-none text-right" aria-live="polite">
            <span
              key={marco.ano}
              className="marco-ano block text-[clamp(64px,14vw,132px)] font-semibold leading-[0.85] tracking-[-0.05em] text-accent"
            >
              {marco.ano}
            </span>
            <span className="mt-2 block text-[12px] font-medium uppercase tracking-[0.2em] text-white/50">
              {ERAS.find((e) => e.id === eraAtiva)?.rotulo[lang]}
            </span>
          </div>
        </div>

        {/* Eras como capitulos */}
        <div className="sem-barra -mx-5 mt-10 flex gap-2 overflow-x-auto px-5 sm:mx-0 sm:px-0">
          {ERAS.map((era) => {
            const idx = MARCOS.findIndex((mm) => eraDoAno(mm.ano) === era.id);
            const on = era.id === eraAtiva;
            return (
              <button
                key={era.id}
                type="button"
                onClick={() => irPara(idx)}
                className={`shrink-0 rounded-full border px-4 py-2 text-[12.5px] font-medium transition-colors ${
                  on ? "border-accent bg-accent text-accent-foreground" : "border-white/15 text-white/70 hover:border-white/40"
                }`}
              >
                <span className="mr-2 tabular-nums opacity-70">{era.de}</span>
                {era.rotulo[lang]}
              </button>
            );
          })}
        </div>

        {/* Filtro por frente */}
        <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-[12px]">
          <span className="uppercase tracking-[0.16em] text-white/45">{lang === "pt" ? "Acender" : "Highlight"}</span>
          {FRENTES.map((f) => (
            <button
              key={f}
              type="button"
              aria-pressed={frente === f}
              onClick={() => setFrente(frente === f ? null : f)}
              className={`flex items-center gap-2 rounded-full px-2.5 py-1 font-medium uppercase tracking-[0.12em] transition-opacity ${
                frente && frente !== f ? "opacity-40 hover:opacity-80" : "opacity-100"
              }`}
            >
              <span className="h-2.5 w-2.5 rounded-full" style={{ background: COR[f] }} />
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Trilha */}
      <div className="relative mt-10">
        <div
          ref={trilha}
          onScroll={medir}
          onPointerDown={pressionar}
          onPointerMove={mover}
          onPointerUp={soltar}
          onPointerLeave={soltar}
          onClickCapture={(e) => {
            if (arraste.current?.moveu) e.preventDefault();
          }}
          className="sem-barra relative cursor-grab overflow-x-auto active:cursor-grabbing"
        >
          <ol className="relative flex w-max items-stretch gap-4 px-[max(20px,calc(50vw-120px))] pb-4 pt-2">
            {/* A linha do tempo propriamente dita, atras dos pontos */}
            <span aria-hidden="true" className="pointer-events-none absolute left-0 right-0 top-[139.5px] h-px bg-white/15" />
            {MARCOS.map((mm, i) => {
              const apagado = frente !== null && mm.aba !== frente;
              const centro = i === ativo;
              const novoAno = i === 0 || MARCOS[i - 1].ano !== mm.ano;
              return (
                <li
                  key={`${mm.ano}-${i}`}
                  ref={(el) => (itens.current[i] = el)}
                  className={`relative flex w-[210px] shrink-0 flex-col transition-[opacity,transform] duration-500 sm:w-[230px] ${
                    apagado ? "opacity-25" : "opacity-100"
                  } ${centro ? "-translate-y-1" : ""}`}
                >
                  <button
                    type="button"
                    onClick={() => irPara(i)}
                    className="flex h-[112px] items-center justify-center overflow-hidden rounded-2xl bg-white p-3 transition-shadow duration-300"
                    style={{ boxShadow: centro ? `0 0 0 2px ${COR[mm.aba]}, 0 12px 40px -12px ${COR[mm.aba]}` : undefined }}
                    aria-label={`${mm.ano}: ${mm.texto[lang]}`}
                  >
                    {mm.img ? (
                      <img src={mm.img} alt="" loading="lazy" draggable={false} className="max-h-full max-w-full object-contain" />
                    ) : null}
                  </button>

                  {/* ponto na linha */}
                  <span className="relative my-3 flex h-4 items-center">
                    <span
                      className={`h-3.5 w-3.5 rounded-full ring-4 ring-[hsl(var(--chrome))] transition-transform duration-300 ${centro ? "scale-150" : ""}`}
                      style={{ background: COR[mm.aba] }}
                    />
                    {novoAno && (
                      <span className="ml-3 text-[13px] font-semibold tabular-nums text-white/80">{mm.ano}</span>
                    )}
                  </span>

                  <p className={`text-[13.5px] leading-[1.55] ${mm.destaque ? "font-medium text-white" : "font-light text-white/70"}`}>
                    {mm.texto[lang]}
                  </p>
                </li>
              );
            })}
          </ol>
        </div>

        {/* Setas: so no desktop, no toque o dedo resolve */}
        <div className="pointer-events-none absolute inset-y-0 left-0 right-0 hidden items-start justify-between px-4 pt-[40px] md:flex">
          <button
            type="button"
            onClick={() => passo(-1)}
            className="pointer-events-auto flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-background/80 backdrop-blur transition-colors hover:border-accent hover:text-accent"
            aria-label={lang === "pt" ? "Voltar no tempo" : "Back in time"}
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={() => passo(1)}
            className="pointer-events-auto flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-background/80 backdrop-blur transition-colors hover:border-accent hover:text-accent"
            aria-label={lang === "pt" ? "Avançar no tempo" : "Forward in time"}
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Progresso de 1873 a 2025 */}
      <div className="mx-auto mt-6 flex max-w-6xl items-center gap-4 px-5 text-[12px] tabular-nums text-white/45 sm:px-6">
        <span>1873</span>
        <div className="relative h-1 flex-1 overflow-hidden rounded-full bg-white/10">
          <div className="absolute inset-y-0 left-0 rounded-full bg-accent" style={{ width: `${Math.max(2, progresso * 100)}%` }} />
        </div>
        <span>2025</span>
      </div>
    </section>
  );
}
