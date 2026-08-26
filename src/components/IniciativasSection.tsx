import { useLanguage } from "@/i18n/LanguageContext";
import { useVertical } from "@/context/VerticalContext";

/**
 * Os programas da vertical ativa, cada um com a propria logo e um link para o
 * seu subdominio. Some quando a vertical nao tem iniciativa definida — hoje so
 * o Tech tem (Launch, Lavras Lab, Observatorio).
 */
export default function IniciativasSection() {
  const { lang } = useLanguage();
  const { vertical } = useVertical();

  if (vertical.iniciativas.length === 0) return null;

  return (
    <section id="iniciativas" className="bg-background py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-3 h-1.5 w-14 rounded-full bg-accent" aria-hidden="true" />
        <h2 className="text-[clamp(24px,3vw,34px)] font-medium leading-tight tracking-[-0.02em]">
          {lang === "pt" ? "Iniciativas " : "Initiatives in "}
          <span className="text-accent">{vertical.rotulo}</span>
        </h2>
        <p className="mt-3 max-w-xl text-[15px] font-light leading-relaxed text-white/65">
          {lang === "pt"
            ? "Programas com site próprio, tocados pela Superintendência de Inovação."
            : "Programs with their own site, run by the Innovation Department."}
        </p>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {vertical.iniciativas.map((ini) => (
            <a
              key={ini.id}
              href={ini.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/[0.045] p-8 transition-colors hover:border-white/25 hover:bg-white/[0.075]"
            >
              {/* Faixa da cor da vertical no topo do card, crescendo no hover. */}
              <span
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-1 origin-left bg-accent transition-transform duration-300 group-hover:scale-y-[3]"
              />
              <div className="flex h-11 items-center">
                <img src={ini.logo} alt={ini.nome} className="max-h-11 w-auto max-w-[210px]" />
              </div>
              <p className="mt-6 flex-1 text-[13.5px] font-light leading-[1.68] text-white/70">
                {ini.descricao[lang]}
              </p>
              <span className="mt-6 flex items-center gap-2 text-[12.5px] font-medium text-accent transition-[gap] duration-200 group-hover:gap-3.5">
                {ini.url.replace("https://", "")}
                <span aria-hidden="true">→</span>
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
