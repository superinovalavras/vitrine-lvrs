import { useLanguage } from "@/i18n/LanguageContext";
import { URL_GESTAO } from "@/data/verticais";

/**
 * Resumo dos 12 Projetos Prioritarios.
 *
 * O detalhamento de cada projeto — andamento, responsaveis, metas — vive no
 * site de gestao, que e acompanhamento vivo. Aqui a vitrine so mostra que os
 * projetos existem e manda para la. Nada de numero que muda sozinho: "12" e
 * estavel, "21 de 146 metas" nao e.
 *
 * Nomes conferidos em gestaolvrs.govup.io em 26/08/2026. O array antigo do
 * Lovable estava defasado (tinha "Hub de Inovacao IpeTech" no lugar de
 * "Hub de Inovacao e sua Gestao").
 */

const PROJETOS = [
  "Cluster Agro-Food-Tech",
  "Hub de Inovação e sua Gestão",
  "Blue Zone Lavras",
  "Cinturão do Alimento/Verde",
  "Festival do Futuro do Alimento",
  "Circuito Territorial Vale dos Ipês",
  "Usina de Compostagem",
  "Estação Férrea",
  "Governo Digital",
  "Sandbox Regulatório",
  "MBA em AgroFoodTech",
  "YouX Lab",
];

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
        className="pointer-events-none absolute -right-24 -top-40 h-[130%] w-auto opacity-[0.13]"
      >
        <circle cx="330" cy="70" r="150" fill="none" stroke="currentColor" strokeWidth="30" />
        <circle cx="330" cy="70" r="228" fill="none" stroke="currentColor" strokeWidth="30" />
        <circle cx="330" cy="70" r="306" fill="none" stroke="currentColor" strokeWidth="30" />
      </svg>

      <div className="relative mx-auto grid max-w-6xl gap-12 px-6 py-24 md:grid-cols-[auto_1fr] md:gap-16">
        <div className="shrink-0">
          <div className="text-[clamp(80px,11vw,150px)] font-semibold leading-[0.82] tracking-[-0.04em]">12</div>
          <div className="mt-2 text-[13px] font-medium uppercase tracking-[0.22em] opacity-75">
            {lang === "pt" ? "projetos prioritários" : "priority projects"}
          </div>
        </div>

        <div>
          <h2 className="max-w-xl text-[clamp(24px,3vw,34px)] font-medium leading-[1.25] tracking-[-0.02em]">
            {lang === "pt"
              ? "Governo, universidades e empresas tocando os mesmos doze projetos."
              : "Government, universities, and companies driving the same twelve projects."}
          </h2>

          <ul className="mt-10 grid gap-x-8 gap-y-3 sm:grid-cols-2">
            {PROJETOS.map((nome, i) => (
              <li key={nome} className="flex items-baseline gap-3 text-[14.5px]">
                <span className="w-6 shrink-0 text-[12px] font-semibold tabular-nums opacity-55">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="opacity-90">{nome}</span>
              </li>
            ))}
          </ul>

          <a
            href={URL_GESTAO}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-12 inline-flex items-center gap-3 rounded-xl bg-background px-8 py-4 text-[15px] font-semibold text-foreground transition-transform hover:-translate-y-0.5"
          >
            {lang === "pt" ? "Acompanhar o andamento de cada projeto" : "Track each project's progress"}
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
