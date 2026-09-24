import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import { translations, t } from "@/i18n/translations";
import { PROJETOS } from "@/data/projetos";

/**
 * O que e o Pacto. Fica no meio da pagina, depois dos dados e da historia —
 * decisao de 24/09/2026: a aba abre com o generico, a explicacao vem depois.
 *
 * Tres blocos, cada um com uma interacao diferente:
 * 1. Manifesto (Webinar RCD, slide 12): o capitulo que esta no meio da tela
 *    acende, o indice lateral acompanha.
 * 2. Governanca (slide 13): diagrama em orbitas. O anel dos 12 projetos gira
 *    devagar e para no hover; passar sobre uma camada da legenda acende o anel.
 * 3. Fecho (slide 43): a frase do Cerrado, com um brilho que corre pelo texto.
 */

const CAPITULOS = [
  {
    titulo: { pt: "As raízes", en: "The roots" },
    texto: {
      pt: "Lavras nasceu do trabalho e da terra. Do café que perfuma as manhãs, do leite que alimenta, da escola que ensina gerações e dos ipês que florescem lembrando que o tempo se renova. É uma cidade feita de gente boa, que planta, que aprende, que acolhe. Uma cidade que cresceu acreditando que o conhecimento transforma o mundo.",
      en: "Lavras was born of work and land. Of the coffee that scents the mornings, the milk that nourishes, the school that has taught generations, and the ipê trees that bloom to remind us that time renews itself. A city of good people who plant, learn and welcome. A city that grew up believing knowledge changes the world.",
    },
  },
  {
    titulo: { pt: "A essência", en: "The essence" },
    texto: {
      pt: "Aqui, o saber e a solidariedade sempre andaram juntos. A ciência das universidades e a aprendizagem das escolas, entre as melhores do país, formaram talentos que acreditam na força do estudo e da inovação. É a terra dos ipês e das ideias, das mãos que trabalham e dos sonhos que florescem.",
      en: "Here, knowledge and solidarity have always gone hand in hand. The science of the universities and the learning of schools among the best in the country have shaped talent that believes in study and innovation. The land of ipê trees and ideas, of working hands and blooming dreams.",
    },
  },
  {
    titulo: { pt: "O amanhã que começa hoje", en: "Tomorrow starts today" },
    texto: {
      pt: "Lavras se prepara para um tempo em que o alimento é inovação, saúde e futuro. Fazendas verticais e hortas urbanas vão alimentar as escolas, o turismo vai florescer, o comércio vai crescer e cada lavrense vai encontrar novas oportunidades. Uma cidade inclusiva, bonita e sustentável, onde viver bem e viver muito caminham juntos.",
      en: "Lavras is getting ready for a time when food means innovation, health and the future. Vertical farms and urban gardens will feed the schools, tourism will bloom, commerce will grow, and every resident will find new opportunities. An inclusive, beautiful and sustainable city where living well and living long go together.",
    },
  },
  {
    titulo: { pt: "O futuro que alimenta a vida", en: "A future that feeds life" },
    texto: {
      pt: "O futuro que sonhamos é feito de cooperação: do agricultor ao professor, do pesquisador ao estudante, do empresário ao empreendedor. Uma cidade onde ninguém fica para trás e a inovação está nas praças, nas escolas e nas cozinhas. Humana, criativa e justa, que cresce sem perder a alma. Uma cidade feliz.",
      en: "The future we dream of is built on cooperation: from farmer to teacher, researcher to student, business owner to entrepreneur. A city where no one is left behind and innovation lives in squares, schools and kitchens. Human, creative and fair, growing without losing its soul. A happy city.",
    },
  },
];

type Camada = "governanca" | "projetos" | "entidades" | "setores";

const CAMADAS: { id: Camada; titulo: { pt: string; en: string }; texto: { pt: string; en: string } }[] = [
  {
    id: "governanca",
    titulo: { pt: "Governança", en: "Governance" },
    texto: {
      pt: "Conselho Municipal, Mesa, Conselho Estratégico, Coordenação Geral e a coordenação do GTO, que faz a gestão dos projetos.",
      en: "Municipal Council, Board, Strategic Council, General Coordination and the coordination of the GTO, which manages the projects.",
    },
  },
  {
    id: "projetos",
    titulo: { pt: "12 projetos", en: "12 projects" },
    texto: {
      pt: "Os projetos prioritários, cada um com responsáveis, metas e indicadores próprios.",
      en: "The priority projects, each with its own owners, targets and indicators.",
    },
  },
  {
    id: "entidades",
    titulo: { pt: "Entidades", en: "Organizations" },
    texto: {
      pt: "Universidades, empresas, associações e órgãos públicos que assumem e tocam os projetos.",
      en: "Universities, companies, associations and public bodies that take on and run the projects.",
    },
  },
  {
    id: "setores",
    titulo: { pt: "Quatro setores", en: "Four sectors" },
    texto: {
      pt: "Governo, academia, iniciativa privada e sociedade — a quádrupla hélice que sustenta o Pacto.",
      en: "Government, academia, the private sector and society — the quadruple helix that sustains the Pact.",
    },
  },
];

const SETORES = [
  { pt: "Iniciativa privada", en: "Private sector", x: 20, y: 34, anchor: "start" },
  { pt: "Academia", en: "Academia", x: 480, y: 34, anchor: "end" },
  { pt: "Sociedade", en: "Society", x: 20, y: 478, anchor: "start" },
  { pt: "Governo", en: "Government", x: 480, y: 478, anchor: "end" },
] as const;

const C = 250; // centro do diagrama (viewBox 500x500)

function Diagrama({ camada, lang }: { camada: Camada | null; lang: "pt" | "en" }) {
  const [dica, setDica] = useState<string | null>(null);
  const acesa = (c: Camada) => camada === null || camada === c;

  return (
    <div className="relative">
      <svg viewBox="0 0 500 500" className="h-auto w-full" role="img" aria-label={lang === "pt" ? "Diagrama da governança do Pacto" : "Pact governance diagram"}>
        {/* setores: arcos tracejados nos cantos */}
        <g className="transition-opacity duration-500" opacity={acesa("setores") ? 1 : 0.2}>
          {[
            [0, 0],
            [500, 0],
            [0, 500],
            [500, 500],
          ].map(([cx, cy], i) => (
            <circle key={i} cx={cx} cy={cy} r={120} fill="none" stroke="currentColor" strokeOpacity={0.35} strokeDasharray="6 8" />
          ))}
          {SETORES.map((s) => (
            <text key={s.pt} x={s.x} y={s.y} textAnchor={s.anchor} className="fill-white text-[13px] font-semibold uppercase tracking-[0.12em]">
              {s[lang]}
            </text>
          ))}
        </g>

        {/* entidades: pontos no anel externo */}
        <g className="transition-opacity duration-500" opacity={acesa("entidades") ? 1 : 0.15}>
          <circle cx={C} cy={C} r={205} fill="none" stroke="currentColor" strokeOpacity={0.12} />
          {Array.from({ length: 28 }).map((_, i) => {
            const a = (i / 28) * Math.PI * 2 + 0.11;
            return <circle key={i} cx={C + Math.cos(a) * 205} cy={C + Math.sin(a) * 205} r={7} className="fill-[hsl(358_63%_54%)]" opacity={0.85} />;
          })}
        </g>

        {/* projetos: anel que gira */}
        <g className="transition-opacity duration-500" opacity={acesa("projetos") ? 1 : 0.15}>
          <circle cx={C} cy={C} r={140} fill="none" stroke="currentColor" strokeOpacity={0.22} strokeDasharray="2 6" />
          <g className="pacto-orbita" style={{ transformOrigin: `${C}px ${C}px` }}>
            {PROJETOS.map((p, i) => {
              const a = (i / PROJETOS.length) * Math.PI * 2 - Math.PI / 2;
              const x = C + Math.cos(a) * 140;
              const y = C + Math.sin(a) * 140;
              return (
                <g
                  key={p.numero}
                  onMouseEnter={() => setDica(`${String(p.numero).padStart(2, "0")} · ${p.nome}`)}
                  onMouseLeave={() => setDica(null)}
                  className="cursor-default"
                >
                  <circle cx={x} cy={y} r={17} className="fill-[hsl(var(--chrome))] stroke-accent" strokeWidth={2} />
                  <text x={x} y={y + 4} textAnchor="middle" className="pacto-orbita-num fill-white text-[11px] font-semibold" style={{ transformOrigin: `${x}px ${y}px` }}>
                    {String(p.numero).padStart(2, "0")}
                  </text>
                </g>
              );
            })}
          </g>
        </g>

        {/* governanca: nucleo */}
        <g className="transition-opacity duration-500" opacity={acesa("governanca") ? 1 : 0.2}>
          <circle cx={C} cy={C} r={78} className="fill-accent/10 stroke-accent" strokeOpacity={0.6} strokeDasharray="4 5" />
          <circle cx={C} cy={C} r={44} className="fill-accent" />
          <text x={C} y={C + 6} textAnchor="middle" className="fill-accent-foreground text-[17px] font-bold">
            LVRS+
          </text>
          {["Conselho", "Mesa", "Estratégico", "Coordenação", "GTO"].map((rot, i) => {
            const a = (i / 5) * Math.PI * 2 - Math.PI / 2;
            return (
              <text key={rot} x={C + Math.cos(a) * 62} y={C + Math.sin(a) * 62 + 3} textAnchor="middle" className="fill-white text-[8.5px] font-semibold uppercase">
                {rot}
              </text>
            );
          })}
        </g>
      </svg>

      <div
        aria-live="polite"
        className={`pointer-events-none absolute left-1/2 top-3 -translate-x-1/2 whitespace-nowrap rounded-full bg-accent px-4 py-1.5 text-[12.5px] font-semibold text-accent-foreground transition-opacity duration-200 ${
          dica ? "opacity-100" : "opacity-0"
        }`}
      >
        {dica ?? " "}
      </div>
    </div>
  );
}

export default function PactoSection() {
  const { lang } = useLanguage();
  const [capitulo, setCapitulo] = useState(0);
  const [camada, setCamada] = useState<Camada | null>(null);
  const refs = useRef<(HTMLDivElement | null)[]>([]);

  // Acende o capitulo que cruza a faixa central da tela.
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entradas) => {
        entradas.forEach((e) => {
          if (e.isIntersecting) setCapitulo(Number((e.target as HTMLElement).dataset.i));
        });
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    refs.current.forEach((el) => el && obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <section id="pacto" className="relative overflow-hidden bg-background py-20 sm:py-28" aria-label={lang === "pt" ? "O que é o Pacto" : "What the Pact is"}>
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        {/* Abertura */}
        <div className="grid gap-8 md:grid-cols-2 md:gap-16">
          <div>
            <p className="text-[12px] font-semibold uppercase tracking-[0.22em] text-accent">
              {lang === "pt" ? "O Pacto" : "The Pact"}
            </p>
            <h2 className="mt-4 text-[clamp(26px,5.5vw,46px)] font-medium leading-[1.08] tracking-[-0.02em]">
              {lang === "pt" ? "Um acordo para tirar o futuro do papel." : "An agreement to get the future off the drawing board."}
            </h2>
          </div>
          <div className="space-y-5 text-[15px] font-light leading-relaxed text-white/70 md:pt-10">
            <p>
              {lang === "pt"
                ? "O Pacto Lavras pela Inovação — LVRS+ — reúne a Prefeitura, as universidades (UFLA, Unilavras, Fagammon e Fadminas), as empresas e a sociedade em torno de 12 projetos que transformam a cidade."
                : "The Lavras Innovation Pact — LVRS+ — brings together City Hall, the universities (UFLA, Unilavras, Fagammon and Fadminas), companies and society around 12 projects that transform the city."}
            </p>
            <p>{t(translations.about.lavrasPlus, lang)}</p>
          </div>
        </div>

        {/* Manifesto */}
        <div className="mt-20 grid gap-10 md:mt-28 md:grid-cols-[220px_1fr] md:gap-16">
          <nav className="md:sticky md:top-28 md:self-start" aria-label={lang === "pt" ? "Capítulos do manifesto" : "Manifesto chapters"}>
            <p className="mb-5 text-[11.5px] font-semibold uppercase tracking-[0.2em] text-white/45">
              {lang === "pt" ? "Manifesto" : "Manifesto"}
            </p>
            <ol className="hidden space-y-3 md:block">
              {CAPITULOS.map((c, i) => (
                <li key={c.titulo.pt}>
                  <button
                    type="button"
                    onClick={() => refs.current[i]?.scrollIntoView({ behavior: "smooth", block: "center" })}
                    className={`flex items-center gap-3 text-left text-[13.5px] transition-colors ${i === capitulo ? "text-white" : "text-white/40 hover:text-white/70"}`}
                  >
                    <span className={`h-px transition-all duration-500 ${i === capitulo ? "w-8 bg-accent" : "w-4 bg-white/30"}`} />
                    {c.titulo[lang]}
                  </button>
                </li>
              ))}
            </ol>
          </nav>

          <div className="space-y-16 md:space-y-24">
            {CAPITULOS.map((c, i) => (
              <div
                key={c.titulo.pt}
                ref={(el) => (refs.current[i] = el)}
                data-i={i}
                className={`transition-opacity duration-700 ${i === capitulo ? "opacity-100" : "opacity-30"}`}
              >
                <p className="text-[12px] font-semibold uppercase tracking-[0.2em] text-accent">
                  {String(i + 1).padStart(2, "0")} · {c.titulo[lang]}
                </p>
                <p className="mt-4 text-[clamp(18px,2.6vw,26px)] font-light leading-[1.5] tracking-[-0.01em]">{c.texto[lang]}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Governanca */}
        <div className="mt-24 grid items-center gap-10 md:mt-32 md:grid-cols-[1fr_1.1fr] md:gap-16">
          <div>
            <p className="text-[12px] font-semibold uppercase tracking-[0.22em] text-accent">
              {lang === "pt" ? "Como tudo funciona" : "How it all works"}
            </p>
            <h3 className="mt-4 text-[clamp(22px,4vw,34px)] font-medium leading-tight tracking-[-0.02em]">
              {lang === "pt" ? "Uma governança, doze projetos, a cidade inteira." : "One governance, twelve projects, the whole city."}
            </h3>
            <ul className="mt-8 space-y-2" onMouseLeave={() => setCamada(null)}>
              {CAMADAS.map((c) => (
                <li key={c.id}>
                  <button
                    type="button"
                    onMouseEnter={() => setCamada(c.id)}
                    onFocus={() => setCamada(c.id)}
                    onBlur={() => setCamada(null)}
                    onClick={() => setCamada(camada === c.id ? null : c.id)}
                    className={`w-full rounded-2xl border px-5 py-4 text-left transition-colors ${
                      camada === c.id ? "border-accent/60 bg-accent/10" : "border-white/10 hover:border-white/25"
                    }`}
                  >
                    <span className="block text-[14.5px] font-semibold">{c.titulo[lang]}</span>
                    <span className="mt-1 block text-[13.5px] font-light leading-relaxed text-white/65">{c.texto[lang]}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div className="mx-auto w-full max-w-[520px] text-white">
            <Diagrama camada={camada} lang={lang} />
          </div>
        </div>

        {/* Fecho */}
        <div className="mt-24 text-center md:mt-32">
          <p className="text-[12px] font-semibold uppercase tracking-[0.22em] text-white/50">
            {lang === "pt" ? "Lavras 2040 · Capital Brasileira do Futuro do Alimento" : "Lavras 2040 · Brazilian Capital of the Future of Food"}
          </p>
          <p className="pacto-brilho mx-auto mt-6 max-w-4xl text-[clamp(26px,5.5vw,52px)] font-semibold leading-[1.1] tracking-[-0.03em]">
            {lang === "pt" ? "Lavras já ensinou o mundo a cultivar o Cerrado. Agora vai ensinar a alimentar o futuro." : "Lavras has already taught the world to farm the Cerrado. Now it will teach it to feed the future."}
          </p>
        </div>
      </div>
    </section>
  );
}
