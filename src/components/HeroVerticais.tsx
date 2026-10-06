import { t } from "@/i18n/translations";
import { useEffect, useRef } from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import { VERTICAIS, ORDEM_ABAS, type Vertical } from "@/data/verticais";
import { useVertical } from "@/context/VerticalContext";

/**
 * Hero da vitrine: a logo LVRS+ grande e centralizada sobre foto, com a regua
 * de abas das verticais encostada na base.
 *
 * Trocar de aba troca de uma vez logo, foto, cor de destaque e texto. A cor sai
 * de [data-vertical] em index.css, que sobrescreve so --accent — nenhum filho
 * precisa saber de cor.
 */

/** Quebra o titulo em torno do trecho que recebe o script, para destaca-lo. */
function tituloComEnfase(titulo: string, enfase: string) {
  const i = titulo.indexOf(enfase);
  if (i === -1) return [titulo, "", ""] as const;
  return [titulo.slice(0, i), enfase, titulo.slice(i + enfase.length)] as const;
}

function Aba({ v, ativa, onClick }: { v: Vertical; ativa: boolean; onClick: () => void }) {
  if (ativa) {
    return (
      <button
        type="button"
        aria-current="page"
        className="relative shrink-0 rounded-t-2xl bg-accent px-4 py-4 text-[13px] font-semibold uppercase tracking-[0.1em] text-accent-foreground sm:px-10 sm:py-5 sm:text-[17px] sm:tracking-[0.15em]"
      >
        <span className="aba-flare-e" aria-hidden="true" />
        {v.rotulo}
        <span className="aba-flare-d" aria-hidden="true" />
      </button>
    );
  }
  return (
    <button
      type="button"
      onClick={onClick}
      style={{ ["--c" as string]: v.cor }}
      className="group relative shrink-0 px-2.5 pb-4 pt-3.5 text-[11.5px] font-medium uppercase tracking-[0.12em] text-white/55 transition-colors hover:text-white sm:px-6 sm:pb-[18px] sm:pt-4 sm:text-[13px] sm:tracking-[0.2em]"
    >
      {v.rotulo}
      <span
        aria-hidden="true"
        className="absolute inset-x-4 bottom-[8px] h-0.5 origin-center scale-x-0 transition-transform duration-300 group-hover:scale-x-100 sm:inset-x-6 sm:bottom-[9px]"
        style={{ background: "var(--c)" }}
      />
    </button>
  );
}

export default function HeroVerticais() {
  const { lang, L } = useLanguage();
  const { ativa, setAtiva, vertical: v } = useVertical();

  const [antes, destaque, depois] = tituloComEnfase(t(v.titulo, lang), t(v.enfase, lang));
  const abas = ORDEM_ABAS.map((id) => VERTICAIS.find((x) => x.id === id)!);

  // No celular a regua e mais larga que a tela e rola. Sem isto, a aba ativa
  // pode nascer fora de vista.
  //
  // NAO usar scrollIntoView aqui: ele rola TODOS os conteineres rolaveis acima
  // do elemento, e a secao do hero e um deles (tem overflow-hidden). Centralizar
  // a aba arrastava a secao inteira 25px para o lado, e o escurecimento, que e
  // absolute inset-0, ia junto — deixando uma faixa de foto crua na borda
  // direita. Aqui a regua rola so a si mesma.
  const regua = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = regua.current;
    const alvo = el?.querySelector<HTMLElement>('[aria-current="page"]');
    if (!el || !alvo) return;
    const destino = alvo.offsetLeft - (el.clientWidth - alvo.offsetWidth) / 2;
    el.scrollTo({ left: Math.max(0, destino), behavior: "smooth" });
  }, [ativa]);

  return (
    <section className="relative flex min-h-[100svh] flex-col overflow-hidden">
      {/* Uma camada por vertical: trocam por opacidade, sem piscar entre fotos. */}
      {VERTICAIS.map((item) =>
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
          key={v.id}
          src={v.logo}
          alt={`LVRS+ ${v.rotulo}`}
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
        <div ref={regua} className="sem-barra flex items-end gap-2 overflow-x-auto px-[18px] max-md:justify-start md:justify-center">
          {abas.map((item) => (
            <Aba key={item.id} v={item} ativa={item.id === ativa} onClick={() => setAtiva(item.id)} />
          ))}
        </div>
        <div className="h-[7px] bg-accent transition-colors duration-500" />
      </div>
    </section>
  );
}
