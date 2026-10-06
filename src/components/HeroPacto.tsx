import { t } from "@/i18n/translations";
import { useLanguage } from "@/i18n/LanguageContext";
import { ABAS_PACTO, type AbaPacto } from "@/data/missoes";
import { useAbaPacto } from "@/context/AbaPactoContext";

/**
 * Hero da pagina /pacto: a logo LVRS+ grande sobre foto, com a regua de abas
 * encostada na base. As abas sao o Pacto e as suas quatro missoes para 2040
 * (06/10/2026 — antes eram as verticais, que ja abrem a home).
 *
 * Trocar de aba troca foto, titulo e texto. A logo e a cor ficam as do Pacto
 * (amarelo): as missoes sao do Pacto, nao verticais com cor propria.
 */

/** Quebra o titulo em torno do trecho que recebe o script, para destaca-lo. */
function tituloComEnfase(titulo: string, enfase: string) {
  const i = titulo.indexOf(enfase);
  if (i === -1) return [titulo, "", ""] as const;
  return [titulo.slice(0, i), enfase, titulo.slice(i + enfase.length)] as const;
}

function Aba({ v, ativa, onClick }: { v: AbaPacto; ativa: boolean; onClick: () => void }) {
  const { lang } = useLanguage();
  if (ativa) {
    return (
      <button
        type="button"
        aria-current="page"
        className="relative shrink-0 rounded-t-2xl bg-accent px-4 py-4 text-[13px] font-semibold uppercase tracking-[0.1em] text-accent-foreground sm:px-10 sm:py-5 sm:text-[17px] sm:tracking-[0.15em]"
      >
        <span className="aba-flare-e" aria-hidden="true" />
        {t(v.rotulo, lang)}
        <span className="aba-flare-d" aria-hidden="true" />
      </button>
    );
  }
  return (
    <button
      type="button"
      onClick={onClick}
      className="group relative shrink-0 px-2.5 pb-4 pt-3.5 text-[11.5px] font-medium uppercase tracking-[0.12em] text-white/55 transition-colors hover:text-white sm:px-6 sm:pb-[18px] sm:pt-4 sm:text-[13px] sm:tracking-[0.2em]"
    >
      {t(v.rotulo, lang)}
      <span
        aria-hidden="true"
        className="absolute inset-x-4 bottom-[8px] h-0.5 origin-center scale-x-0 transition-transform duration-300 group-hover:scale-x-100 sm:inset-x-6 sm:bottom-[9px]"
        style={{ background: "hsl(var(--accent))" }}
      />
    </button>
  );
}

export default function HeroPacto() {
  const { lang, L } = useLanguage();
  const { ativa, setAtiva, aba: v } = useAbaPacto();

  const [antes, destaque, depois] = tituloComEnfase(t(v.titulo, lang), t(v.enfase, lang));


  return (
    <section className="relative flex min-h-[100svh] flex-col overflow-hidden">
      {/* Uma camada por aba: trocam por opacidade, sem piscar entre fotos. */}
      {ABAS_PACTO.map((item) =>
        item.fundo ? (
          <div
            key={item.id}
            aria-hidden="true"
            className="absolute inset-0 bg-cover bg-center transition-opacity duration-700"
            style={{ backgroundImage: `url(${item.fundo})`, opacity: item.id === ativa ? 1 : 0 }}
          />
        ) : null,
      )}

      <div
        aria-hidden="true"
        className="absolute inset-0 transition-[background] duration-700"
        style={{
          background:
            "linear-gradient(180deg, hsl(var(--background)/.42) 0%, hsl(var(--background)/.6) 44%, hsl(var(--background)/.95) 100%)," +
            "radial-gradient(ellipse at 50% 40%, hsl(var(--accent)/.2) 0%, hsl(var(--background)/0) 60%)",
        }}
      />

      {/* Os atalhos que ficavam aqui (sobre, ecossistema, contato, PT/EN) foram
          para a BarraEcossistema, fixa no topo de todas as paginas. Este
          espaco so reserva a altura dela. */}
      <div aria-hidden="true" className="h-14 shrink-0" />

      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-5 pb-10 pt-4 text-center sm:px-6 sm:pb-14">
        <img
          src="/marca/lvrs-pacto.png"
          alt="LVRS+ Pacto Lavras pela Inovação"
          className="w-[min(72vw,clamp(200px,31vw,420px))] drop-shadow-[0_6px_30px_rgba(0,0,0,0.5)]"
        />
        <h1 className="mt-7 max-w-[840px] text-[clamp(20px,5.2vw,36px)] font-normal leading-[1.26] tracking-[-0.015em] [text-shadow:0_2px_22px_rgba(0,0,0,0.55)] sm:mt-10">
          {antes}
          <em className="px-[0.06em] not-italic text-accent [font-family:'Kaushan_Script',cursive] [font-size:1.12em]">
            {destaque}
          </em>
          {depois}
        </h1>
        <p className="mt-4 max-w-[640px] text-[14px] font-light leading-[1.7] text-white/80 [text-shadow:0_1px_14px_rgba(0,0,0,0.7)] sm:mt-5 sm:text-[15.5px]">
          {t(v.descricao, lang)}
        </p>
      </div>

      <div className="relative z-10">
        {/* Computador: abas de navegador encostadas na faixa amarela. */}
        <div className="hidden items-end justify-center gap-2 px-[18px] md:flex">
          {ABAS_PACTO.map((item) => (
            <Aba key={item.id} v={item} ativa={item.id === ativa} onClick={() => setAtiva(item.id)} />
          ))}
        </div>
        {/* Celular: as cinco abas cabiam so rolando de lado (a ultima ficava
            cortada). Aqui ficam todas a vista, em duas linhas: 2 + 3. */}
        <nav aria-label={L("Missões", "Missions")} className="grid grid-cols-6 gap-2 px-4 pb-4 md:hidden">
          {ABAS_PACTO.map((item, i) => {
            const on = item.id === ativa;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setAtiva(item.id)}
                aria-current={on ? "page" : undefined}
                className={`${i < 2 ? "col-span-3" : "col-span-2"} min-h-[44px] rounded-full border px-2 text-[11.5px] font-semibold uppercase tracking-[0.08em] backdrop-blur-sm transition-colors ${
                  on
                    ? "border-accent bg-accent text-accent-foreground"
                    : "border-white/20 bg-black/25 text-white/80 active:bg-white/10"
                }`}
              >
                {t(item.rotulo, lang)}
              </button>
            );
          })}
        </nav>
        <div className="h-[7px] bg-accent transition-colors duration-500" />
      </div>
    </section>
  );
}
