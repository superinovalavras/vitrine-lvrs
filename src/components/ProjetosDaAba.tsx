import type { CSSProperties, MouseEvent } from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import { useVertical } from "@/context/VerticalContext";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { PROJETOS, urlProjeto, type Projeto } from "@/data/projetos";
import { URL_GESTAO } from "@/data/verticais";

/**
 * Os projetos do Pacto que pertencem a aba ativa. So resumo: o card leva a
 * pagina do projeto no painel de gestao, que e onde mora o andamento.
 *
 * Diferente dos cards de programa (IniciativasSection), estes vestem o LVRS+,
 * nao uma marca propria: projeto e compromisso do Pacto, programa e produto
 * com site proprio. Some na aba Pacto (la aparece a lista dos 12) e no SRI.
 *
 * Efeito proprio desta secao: os cards entram "escaneados" (uma linha de luz
 * revela o card de cima para baixo) e, com o mouse, um holofote segue o cursor.
 */

function Card({ p, lang, visivel, ordem }: { p: Projeto; lang: "pt" | "en"; visivel: boolean; ordem: number }) {
  // O holofote le a posicao do mouse por variavel CSS: nenhum re-render.
  const mover = (e: MouseEvent<HTMLAnchorElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  return (
    <a
      href={urlProjeto(p)}
      target="_blank"
      rel="noopener noreferrer"
      onMouseMove={mover}
      style={{ animationDelay: `${ordem * 140}ms` } as CSSProperties}
      className={`projeto-card group relative flex flex-col overflow-hidden rounded-3xl border border-white/10 bg-card p-7 transition-colors duration-300 hover:border-accent/50 sm:p-8 ${
        visivel ? "projeto-card--visivel" : ""
      }`}
    >
      <span aria-hidden="true" className="projeto-holofote" />
      <span aria-hidden="true" className="projeto-scan" style={{ animationDelay: `${ordem * 140}ms` }} />

      <div className="relative flex items-start justify-between gap-4">
        <span className="text-[clamp(44px,8vw,64px)] font-semibold leading-none tracking-[-0.04em] text-transparent [-webkit-text-stroke:1.5px_hsl(var(--accent))] transition-colors duration-300 group-hover:text-accent">
          {String(p.numero).padStart(2, "0")}
        </span>
        <span className="mt-1 rounded-full border border-white/15 px-3 py-1 text-[10.5px] font-medium uppercase tracking-[0.16em] text-white/55">
          {lang === "pt" ? "Projeto do Pacto" : "Pact project"}
        </span>
      </div>

      <h3 className="relative mt-6 text-[19px] font-semibold leading-snug tracking-[-0.01em]">{p.nome}</h3>
      <p className="relative mt-1 text-[12.5px] font-medium uppercase tracking-[0.08em] text-accent/90">
        {p.subtitulo[lang]}
      </p>
      <p className="relative mt-4 flex-1 text-[14px] font-light leading-[1.7] text-white/70">{p.resumo[lang]}</p>

      <span className="relative mt-7 inline-flex items-center gap-2 text-[13px] font-semibold text-accent transition-[gap] duration-200 group-hover:gap-3.5">
        {lang === "pt" ? "Acompanhar este projeto" : "Follow this project"}
        <span aria-hidden="true">→</span>
      </span>
    </a>
  );
}

export default function ProjetosDaAba() {
  const { vertical } = useVertical();
  const projetos = PROJETOS.filter((p) => p.aba === vertical.id);
  if (projetos.length === 0) return null;
  // key por aba: remonta a secao a cada troca, entao o observador de scroll e
  // criado com o elemento ja na pagina e a entrada escaneada roda de novo.
  return <Secao key={vertical.id} projetos={projetos} />;
}

function Secao({ projetos }: { projetos: Projeto[] }) {
  const { lang } = useLanguage();
  const { vertical } = useVertical();
  const { ref, isVisible } = useScrollReveal(0.12);

  return (
    <section id="projetos-aba" className="bg-background pb-16 pt-4 sm:pb-24">
      <div ref={ref} className="mx-auto max-w-6xl px-5 sm:px-6">
        <div className="mb-3 h-1.5 w-14 rounded-full bg-accent" aria-hidden="true" />
        <h2 className="text-[clamp(22px,5vw,34px)] font-medium leading-tight tracking-[-0.02em]">
          {lang === "pt" ? "Projetos do Pacto em " : "Pact projects in "}
          <span className="text-accent">{vertical.rotulo}</span>
        </h2>
        <p className="mt-3 max-w-xl text-[14.5px] font-light leading-relaxed text-white/65 sm:text-[15px]">
          {lang === "pt"
            ? `${projetos.length === 1 ? "Um" : projetos.length} dos 12 projetos prioritários que governo, universidades e empresas tocam juntos.`
            : `${projetos.length === 1 ? "One" : projetos.length} of the 12 priority projects government, universities and companies run together.`}
        </p>

        <div className="mt-10 grid gap-5 sm:mt-12 sm:grid-cols-2 lg:grid-cols-3">
          {projetos.map((p, i) => (
            <Card key={p.numero} p={p} lang={lang} visivel={isVisible} ordem={i} />
          ))}
        </div>

        <div className="mt-10 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:gap-6">
          <a
            href={URL_GESTAO}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 rounded-xl border border-accent/60 px-6 py-3.5 text-[14px] font-semibold text-accent transition-colors hover:bg-accent hover:text-accent-foreground"
          >
            {lang === "pt" ? "Conhecer os 12 projetos" : "See all 12 projects"}
            <span aria-hidden="true">→</span>
          </a>
          <span className="text-[13px] text-white/50">
            {lang === "pt" ? "Andamento, metas e responsáveis no painel do Pacto." : "Progress, targets and owners on the Pact dashboard."}
          </span>
        </div>
      </div>
    </section>
  );
}
