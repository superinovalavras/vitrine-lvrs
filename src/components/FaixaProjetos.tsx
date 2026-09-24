import { useLanguage } from "@/i18n/LanguageContext";
import { URL_GESTAO } from "@/data/verticais";
import { PROJETOS } from "@/data/projetos";

/**
 * Resumo dos 12 Projetos Prioritarios.
 *
 * O detalhamento de cada projeto — andamento, responsaveis, metas — vive no
 * site de gestao, que e acompanhamento vivo. Aqui a vitrine so mostra que os
 * projetos existem e manda para la. Nada de numero que muda sozinho: "12" e
 * estavel, "21 de 146 metas" nao e.
 *
 * Os nomes vem de src/data/projetos.ts, a mesma fonte dos cards das abas.
 */

export default function FaixaProjetos() {
  const { lang } = useLanguage();

  return (
    <section id="projetos" className="relative overflow-hidden bg-accent text-accent-foreground">
      {/* Arcos concentricos do manual da UONA. Aqui eles funcionam: superficie
          chapada e opacos, como no cartao e na faixa verde do material. Sobre
          foto nao funcionavam e foram removidos do hero. */}
      <svg
        aria-hidden="true"
        viewBox="0 0 400 400"
        className="pointer-events-none absolute -right-24 -top-40 h-[130%] w-auto opacity-[0.13] max-sm:opacity-[0.08]"
      >
        <circle cx="330" cy="70" r="150" fill="none" stroke="currentColor" strokeWidth="30" />
        <circle cx="330" cy="70" r="228" fill="none" stroke="currentColor" strokeWidth="30" />
        <circle cx="330" cy="70" r="306" fill="none" stroke="currentColor" strokeWidth="30" />
      </svg>

      <div className="relative mx-auto grid max-w-6xl gap-8 px-5 py-16 sm:px-6 sm:py-20 md:grid-cols-[auto_1fr] md:gap-16 md:py-24">
        <div className="shrink-0">
          <div className="text-[clamp(64px,17vw,150px)] font-semibold leading-[0.82] tracking-[-0.04em]">12</div>
          <div className="mt-2 text-[13px] font-medium uppercase tracking-[0.22em] opacity-75">
            {lang === "pt" ? "projetos prioritários" : "priority projects"}
          </div>
        </div>

        <div>
          <h2 className="max-w-xl text-[clamp(21px,5vw,34px)] font-medium leading-[1.25] tracking-[-0.02em]">
            {lang === "pt"
              ? "Governo, universidades e empresas tocando os mesmos doze projetos."
              : "Government, universities, and companies driving the same twelve projects."}
          </h2>

          <ul className="mt-8 grid gap-x-8 gap-y-2.5 sm:mt-10 sm:grid-cols-2">
            {PROJETOS.map((p) => (
              <li key={p.numero} className="flex items-baseline gap-3 text-[14.5px]">
                <span className="w-6 shrink-0 text-[12px] font-semibold tabular-nums opacity-55">
                  {String(p.numero).padStart(2, "0")}
                </span>
                <span className="opacity-90">{p.nome}</span>
              </li>
            ))}
          </ul>

          <a
            href={URL_GESTAO}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-10 inline-flex items-center gap-3 rounded-xl bg-background px-6 py-4 text-[14px] font-semibold text-foreground transition-transform hover:-translate-y-0.5 sm:mt-12 sm:px-8 sm:text-[15px]"
          >
            {lang === "pt" ? "Mais informações sobre os projetos" : "More about the projects"}
            <span aria-hidden="true">→</span>
          </a>
          <p className="mt-4 text-[13px] opacity-70">
            {lang === "pt"
              ? "Responsáveis, metas e percentual de execução, atualizados no painel de gestão."
              : "Owners, targets, and completion rates, kept up to date on the management dashboard."}
          </p>
        </div>
      </div>
    </section>
  );
}
