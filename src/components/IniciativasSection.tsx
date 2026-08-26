import { useLanguage } from "@/i18n/LanguageContext";
import { useVertical } from "@/context/VerticalContext";
import type { Iniciativa } from "@/data/verticais";

/**
 * Os programas da vertical ativa. Cada card veste a identidade do proprio
 * programa: fundo, texto, cor de destaque e o simbolo dele como marca d'agua.
 * Nada disso vem da paleta LVRS+ — o Lavras Lab e claro, o Launch e quase
 * preto, o Observatorio e azul profundo, porque e assim que cada marca e.
 * Some quando a vertical nao tem iniciativa; hoje so o Tech tem.
 */

function Card({ ini, lang }: { ini: Iniciativa; lang: "pt" | "en" }) {
  const t = ini.tema;
  return (
    <a
      href={ini.url}
      target="_blank"
      rel="noopener noreferrer"
      style={{ background: t.fundo, color: t.texto }}
      className="group relative flex flex-col overflow-hidden rounded-3xl p-7 transition-transform duration-300 hover:-translate-y-1.5 sm:p-8"
    >
      {/* Simbolo do programa como marca d'agua: o foguete do Launch, a estrela
          do Lab, a espiral do Observatorio. Sai da borda de proposito, para dar
          escala sem virar ilustracao centrada. */}
      <img
        src={ini.elemento}
        alt=""
        aria-hidden="true"
        style={{ opacity: ini.elementoOpacidade }}
        className="pointer-events-none absolute -right-10 -top-8 h-44 w-auto transition-transform duration-500 group-hover:scale-110 sm:-right-12 sm:h-52"
      />

      {/* Faixa da cor do programa no topo, crescendo no hover. */}
      <span
        aria-hidden="true"
        style={{ background: t.destaque }}
        className="absolute inset-x-0 top-0 h-1.5 origin-top transition-transform duration-300 group-hover:scale-y-[2.4]"
      />

      {/* Caixa de altura fixa com teto de largura, e a logo centrada dentro.
          Logo em faixa (Launch, Lab) bate no limite de largura; logo quase
          quadrada (Observatorio) usa a altura inteira. As tres terminam com
          peso visual parecido — limitar so pela altura fazia a quadrada
          aparecer com um terco da area das outras. */}
      <div className="relative flex h-[96px] items-center justify-center sm:h-[112px]">
        <img
          src={ini.logo}
          alt={ini.nome}
          className="max-h-full w-auto max-w-[230px] object-contain sm:max-w-[260px]"
        />
      </div>

      <p className="relative mt-6 flex-1 text-[13.5px] font-light leading-[1.68]" style={{ color: t.apoio }}>
        {ini.descricao[lang]}
      </p>

      <span
        style={{ color: t.destaque }}
        className="relative mt-6 flex items-center gap-2 break-all text-[12.5px] font-medium transition-[gap] duration-200 group-hover:gap-3.5"
      >
        {ini.url.replace("https://", "")}
        <span aria-hidden="true" className="shrink-0">
          →
        </span>
      </span>
    </a>
  );
}

export default function IniciativasSection() {
  const { lang } = useLanguage();
  const { vertical } = useVertical();

  if (vertical.iniciativas.length === 0) return null;

  return (
    <section id="iniciativas" className="bg-background py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <div className="mb-3 h-1.5 w-14 rounded-full bg-accent" aria-hidden="true" />
        <h2 className="text-[clamp(22px,5vw,34px)] font-medium leading-tight tracking-[-0.02em]">
          {lang === "pt" ? "Iniciativas " : "Initiatives in "}
          <span className="text-accent">{vertical.rotulo}</span>
        </h2>
        <p className="mt-3 max-w-xl text-[14.5px] font-light leading-relaxed text-white/65 sm:text-[15px]">
          {lang === "pt"
            ? "Programas com site próprio, tocados pela Superintendência de Inovação."
            : "Programs with their own site, run by the Innovation Department."}
        </p>

        <div className="mt-10 grid gap-5 sm:mt-12 sm:grid-cols-2 lg:grid-cols-3">
          {vertical.iniciativas.map((ini) => (
            <Card key={ini.id} ini={ini} lang={lang} />
          ))}
        </div>
      </div>
    </section>
  );
}
