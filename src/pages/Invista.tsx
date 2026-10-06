import { useEffect, useRef, useState, type FormEvent, type MouseEvent } from "react";
import { Link } from "react-router-dom";
import BarraEcossistema from "@/components/BarraEcossistema";
import RodapeSimples from "@/components/RodapeSimples";
import { Reveal, useScrollReveal } from "@/hooks/useScrollReveal";
import { useLanguage } from "@/i18n/LanguageContext";
import type { Language } from "@/i18n/translations";
import {
  EMAIL_CONTATO, FUNDO_HERO, HERO, INCENTIVOS, NUMEROS, ONDE, PASSOS, PORTAS, PORTAS_ORDEM, type Porta, type Texto,
} from "@/data/invista";

const tx = (t: Texto, lang: Language) => (typeof t === "string" ? t : t[lang]);
const chave = (t: Texto) => (typeof t === "string" ? t : t.pt);

/**
 * Home de lvrs.com.br: a introducao a Lavras para empresas que se identificam
 * com a vocacao economica da cidade (maquete aprovada em 05/10/2026).
 *
 * A pessoa escolhe uma porta (Agro, Food, Tech, Sul de Minas) e a pagina
 * inteira veste a cor e a logo daquela vertical, pelo mesmo [data-vertical]
 * do resto do site. Antes da escolha, vale o amarelo do Pacto.
 *
 * Cada secao tem um efeito proprio, sem repetir (pedido de 24/09/2026):
 * hero = arcos que se desenham e fundo que troca no hover; numeros = contador;
 * setor = cortina na cor da porta; mapa = rotas que se desenham; onde se
 * instalar = paineis que se abrem; incentivos = cartas que inclinam; passos =
 * linha que enche com a rolagem; iniciativas = logos que se afastam.
 */

const semMovimento = () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function comEnfase(texto: string, enfase: string) {
  const i = texto.indexOf(enfase);
  if (i === -1) return <>{texto}</>;
  return (
    <>
      {texto.slice(0, i)}
      <em className="s">{enfase}</em>
      {texto.slice(i + enfase.length)}
    </>
  );
}

/* ---------------------------------------------------------------- hero */

function Hero({ porta, escolher }: { porta: Porta | null; escolher: (p: Porta) => void }) {
  const { lang } = useLanguage();
  const [hover, setHover] = useState<Porta | null>(null);
  // Antes de escolher, passar o mouse numa porta mostra a foto dela.
  const fundo = porta ?? hover ?? "pacto";

  return (
    <header className="inv-hero">
      <div className="inv-fundos" aria-hidden="true">
        {(Object.keys(FUNDO_HERO) as (Porta | "pacto")[]).map((id) => (
          <div key={id} className={id === fundo ? "on" : ""} style={{ backgroundImage: `url(${FUNDO_HERO[id]})` }} />
        ))}
      </div>
      <svg className="inv-arcos" viewBox="0 0 760 760" aria-hidden="true">
        <circle cx="380" cy="380" r="370" /><circle cx="380" cy="380" r="300" />
        <circle cx="380" cy="380" r="230" /><circle cx="380" cy="380" r="160" />
      </svg>
      <div className="lv-wrap">
        <h1>{comEnfase(HERO.titulo[lang], HERO.enfase[lang])}</h1>
        <p className="lv-lead">{HERO.lead[lang]}</p>
        <div className="inv-pergunta">{HERO.pergunta[lang]}</div>
        <div className="inv-portas">
          {PORTAS_ORDEM.map((id) => {
            const p = PORTAS[id];
            return (
              <button
                key={id}
                type="button"
                className="inv-porta"
                data-vertical={id}
                style={{ ["--c" as string]: "hsl(var(--accent))" }}
                aria-pressed={porta === id}
                onClick={() => escolher(id)}
                onMouseEnter={() => setHover(id)}
                onMouseLeave={() => setHover(null)}
              >
                <img src={p.logo} alt="" />
                <b>{p.rotulo[lang]}</b>
                <span>{p.resumo[lang]}</span>
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
}

/* ------------------------------------------------------------- numeros */

function formata(v: number, f: string, lang: Language) {
  const loc = lang === "pt" ? "pt-BR" : "en-US";
  if (f === "mil") return lang === "pt" ? `${Math.round(v / 1000)} mil` : `${Math.round(v / 1000)}k`;
  if (f === "bi") return `R$ ${v.toLocaleString(loc, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ${lang === "pt" ? "bi" : "bn"}`;
  if (f === "idh") return v.toLocaleString(loc, { minimumFractionDigits: 3 });
  return Math.round(v).toLocaleString(loc);
}

function Contador({ valor, formato }: { valor: number; formato: string }) {
  const { lang } = useLanguage();
  const { ref, isVisible } = useScrollReveal(0.4);
  const [k, setK] = useState(0);
  useEffect(() => {
    if (!isVisible) return;
    if (semMovimento()) return setK(1);
    const t0 = performance.now();
    let raf = 0;
    const passo = (t: number) => {
      const x = Math.min(1, (t - t0) / 1600);
      setK(1 - Math.pow(1 - x, 3));
      if (x < 1) raf = requestAnimationFrame(passo);
    };
    raf = requestAnimationFrame(passo);
    // Garante o valor final mesmo se a aba ficar sem quadros (aba em segundo plano).
    const fim = window.setTimeout(() => setK(1), 1800);
    return () => { cancelAnimationFrame(raf); window.clearTimeout(fim); };
  }, [isVisible]);
  return (
    <div ref={ref}>
      <b>{formata(valor * k, formato, lang)}</b>
    </div>
  );
}

function Numeros() {
  const { lang } = useLanguage();
  return (
    <section className="inv-numeros" aria-label={lang === "pt" ? "Lavras em números" : "Lavras in numbers"}>
      <div className="lv-wrap inv-num-grid">
        {NUMEROS.map((n) => (
          <div key={n.legenda.pt} className="inv-num">
            <Contador valor={n.valor} formato={n.formato} />
            <span>{n.legenda[lang]}</span>
            <small>{n.fonte}</small>
          </div>
        ))}
      </div>
    </section>
  );
}

/* --------------------------------------------------------------- setor */

function Mapa() {
  const { lang } = useLanguage();
  const [on, setOn] = useState(false);
  // As rotas se desenham assim que a porta Sul de Minas aparece.
  useEffect(() => { const id = window.setTimeout(() => setOn(true), 60); return () => window.clearTimeout(id); }, []);
  return (
    <div className={`inv-radar${on ? " on" : ""}`} aria-label={lang === "pt" ? "Distâncias a partir de Lavras" : "Distances from Lavras"}>
      <svg viewBox="0 0 600 520">
        <g className="rotas">
          <path className="rota" d="M300 260 L470 110" /><path className="rota" d="M300 260 L210 470" />
          <path className="rota" d="M300 260 L540 400" /><path className="rota" d="M300 260 L230 330" />
          <path className="rota" d="M300 260 L120 150" />
        </g>
        <circle className="pulso" cx="300" cy="260" r="30" />
        <circle className="lavras" cx="300" cy="260" r="11" />
        <text className="cid" x="300" y="296" textAnchor="middle" style={{ fontWeight: 700 }}>Lavras</text>
        <circle className="ponto" cx="470" cy="110" r="6" /><text className="cid" x="482" y="104">Belo Horizonte</text><text className="km" x="482" y="122">230 km</text>
        <circle className="ponto" cx="210" cy="470" r="6" /><text className="cid" x="222" y="474">São Paulo</text><text className="km" x="222" y="492">370 km</text>
        <circle className="ponto" cx="540" cy="400" r="6" /><text className="cid" x="460" y="430">Rio de Janeiro</text><text className="km" x="460" y="448">450 km</text>
        <circle className="ponto" cx="230" cy="330" r="6" /><text className="cid" x="100" y="334">Varginha</text><text className="km" x="100" y="352">90 km · {lang === "pt" ? "aeroporto" : "airport"}</text>
        <circle className="ponto" cx="120" cy="150" r="6" /><text className="cid" x="40" y="132">Campinas</text><text className="km" x="40" y="114">Viracopos 380 km</text>
      </svg>
      {/* No celular o SVG fica estreito demais para ler os nomes: as distancias
          aparecem em lista e o mapa fica so como desenho. */}
      <ul className="inv-dist">
        <li><b>230 km</b> Belo Horizonte</li>
        <li><b>370 km</b> São Paulo</li>
        <li><b>450 km</b> Rio de Janeiro</li>
        <li><b>90 km</b> Varginha · {lang === "pt" ? "aeroporto" : "airport"}</li>
        <li><b>380 km</b> Viracopos</li>
      </ul>
    </div>
  );
}

function ConteudoSetor({ id }: { id: Porta }) {
  const { lang } = useLanguage();
  const d = PORTAS[id];
  return (
    <div className="inv-setor">
      <div>
        <img className="inv-setor-logo" src={d.logo} alt="" />
        <h3>{comEnfase(d.titulo[lang], d.enfase[lang])}</h3>
        <p className="lv-lead">{d.texto[lang]}</p>
        <div className="inv-mini">
          {d.mini.map((m) => (
            <div key={chave(m.valor)}><b>{tx(m.valor, lang)}</b><span>{m.legenda[lang]}</span></div>
          ))}
        </div>
        <div className="inv-bloco">
          <h4>{d.empresasTitulo?.[lang] ?? (lang === "pt" ? "Quem já está aqui" : "Who is already here")}</h4>
          <div className="inv-pills">{d.empresas.map((e) => <span key={e}>{e}</span>)}</div>
        </div>
        <div className="inv-bloco">
          <h4>{lang === "pt" ? "Talento e pesquisa" : "Talent and research"}</h4>
          <div className="inv-pills">{d.talento.map((e) => <span key={chave(e)}>{tx(e, lang)}</span>)}</div>
        </div>
      </div>
      <div>
        {d.mapa ? <Mapa /> : <div className="inv-foto"><img src={d.foto} alt={d.legendaFoto[lang]} loading="lazy" /></div>}
        {d.depoimento && (
          <blockquote className="inv-depo inv-bloco">
            “{d.depoimento.texto[lang]}”<cite>{d.depoimento.autor[lang]}</cite>
          </blockquote>
        )}
        <div className="inv-bloco">
          <h4>{d.listaTitulo[lang]}</h4>
          <ul className="inv-lista">{d.lista.map((l) => <li key={l.pt}>{l[lang]}</li>)}</ul>
        </div>
        <a className="lv-btn" href="#contato">
          {lang === "pt" ? "Falar sobre" : "Talk about"} {d.rotulo[lang]} →
        </a>
      </div>
    </div>
  );
}

function Setor({ porta, escolher }: { porta: Porta | null; escolher: (p: Porta) => void }) {
  const { lang } = useLanguage();
  // Antes de a pessoa escolher, o quadro mostra o Agro (primeira porta).
  const ativa = porta ?? "agro";
  const [mostrada, setMostrada] = useState<Porta>(ativa);
  const [cortina, setCortina] = useState(0);

  useEffect(() => {
    if (ativa === mostrada) return;
    if (semMovimento()) return setMostrada(ativa);
    // A cortina cobre o quadro na metade da animacao; e ai que o conteudo troca.
    setCortina((c) => c + 1);
    const id = window.setTimeout(() => setMostrada(ativa), 400);
    return () => window.clearTimeout(id);
  }, [ativa, mostrada]);

  return (
    <section className="lv-sec" id="setor" style={{ scrollMarginTop: 44 }}>
      <div className="lv-wrap">
        <div className="inv-setor-top">
          <div>
            <span className="lv-tag">{lang === "pt" ? "A vocação de Lavras para o seu negócio" : "Lavras' vocation for your business"}</span>
            <h2 className="lv-h2" style={{ marginBottom: 0 }}>{lang === "pt" ? "Escolha o seu setor." : "Choose your sector."}</h2>
          </div>
          <div className="inv-chips" role="group" aria-label={lang === "pt" ? "Setor" : "Sector"}>
            {PORTAS_ORDEM.map((id) => (
              <button key={id} type="button" aria-pressed={ativa === id} onClick={() => escolher(id)}>
                {PORTAS[id].rotulo[lang].toUpperCase()}
              </button>
            ))}
          </div>
        </div>
        <div className="inv-palco">
          <div key={cortina} className={`inv-cortina${cortina ? " vai" : ""}`} />
          <ConteudoSetor id={mostrada} />
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------ onde se instalar */

function OndeSeInstalar() {
  const { lang } = useLanguage();
  const [aberta, setAberta] = useState(0);
  return (
    <section className="lv-sec">
      <div className="lv-wrap">
        <Reveal>
          <span className="lv-tag">{lang === "pt" ? "Onde se instalar" : "Where to set up"}</span>
          <h2 className="lv-h2">
            {lang === "pt" ? <>Lugar para <em className="s">crescer</em> dentro da cidade.</> : <>Room to <em className="s">grow</em> within the city.</>}
          </h2>
          <p className="lv-lead">
            {lang === "pt"
              ? "Áreas industriais, parque tecnológico e a infraestrutura de uma cidade média bem servida."
              : "Industrial areas, a technology park and the infrastructure of a well-served mid-sized city."}
          </p>
        </Reveal>
        <div className="inv-onde">
          {ONDE.map((o, i) => (
            <button
              key={o.titulo.pt}
              type="button"
              className={`inv-aba-onde${i === aberta ? " aberta" : ""}`}
              style={{ backgroundImage: `url(${o.foto})` }}
              aria-expanded={i === aberta}
              onMouseEnter={() => setAberta(i)}
              onFocus={() => setAberta(i)}
              onClick={() => setAberta(i)}
            >
              <div>
                <span className="n">0{i + 1}</span>
                <h3>{o.titulo[lang]}</h3>
                <p>{o.texto[lang]}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------- incentivos */

function inclina(e: MouseEvent<HTMLDivElement>) {
  if (semMovimento()) return;
  const c = e.currentTarget, r = c.getBoundingClientRect();
  const x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
  c.style.transform = `rotateY(${x * 10}deg) rotateX(${-y * 10}deg) translateZ(6px)`;
}

function Incentivos() {
  const { lang } = useLanguage();
  return (
    <section className="lv-sec escura">
      <div className="lv-wrap">
        <Reveal>
          <span className="lv-tag">{lang === "pt" ? "Incentivos" : "Incentives"}</span>
          <h2 className="lv-h2">
            {lang === "pt" ? <>Um governo que <em className="s">facilita</em>, não só regula.</> : <>A government that <em className="s">facilitates</em>, not just regulates.</>}
          </h2>
          <p className="lv-lead">
            {lang === "pt"
              ? "Lei Municipal de Desenvolvimento Econômico (2023) e marco legal do ecossistema de inovação (2025), somados aos programas do Estado de Minas Gerais."
              : "The Municipal Economic Development Law (2023) and the innovation ecosystem legal framework (2025), plus the State of Minas Gerais programs."}
          </p>
        </Reveal>
        <div className="inv-inc-grid">
          {INCENTIVOS.map((c) => (
            <div key={c.titulo.pt} className="inv-inc" onMouseMove={inclina} onMouseLeave={(e) => (e.currentTarget.style.transform = "")}>
              <span className="n">{c.nivel[lang]}</span>
              <h3>{c.titulo[lang]}</h3>
              <p>{c.texto[lang]}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* --------------------------------------------------------- soft landing */

function Passos() {
  const { lang } = useLanguage();
  const lista = useRef<HTMLDivElement>(null);
  const [progresso, setProgresso] = useState(0);
  const [acesos, setAcesos] = useState(0);

  useEffect(() => {
    const atualiza = () => {
      const el = lista.current;
      if (!el) return;
      const r = el.getBoundingClientRect(), meio = window.innerHeight * 0.6;
      setProgresso(Math.max(0, Math.min(1, (meio - r.top) / r.height)));
      setAcesos([...el.querySelectorAll(".inv-passo")].filter((p) => p.getBoundingClientRect().top < meio).length);
    };
    window.addEventListener("scroll", atualiza, { passive: true });
    atualiza();
    return () => window.removeEventListener("scroll", atualiza);
  }, []);

  return (
    <section className="lv-sec">
      <div className="lv-wrap">
        <Reveal>
          <span className="lv-tag">Soft landing</span>
          <h2 className="lv-h2">
            {lang === "pt" ? <>Do primeiro contato à <em className="s">operação</em>.</> : <>From first contact to <em className="s">operation</em>.</>}
          </h2>
          <p className="lv-lead">
            {lang === "pt"
              ? "A Prefeitura acompanha a empresa em toda a jornada, com um ponto único de entrada e respostas coordenadas entre as secretarias."
              : "City Hall supports the company throughout the journey, with a single point of entry and coordinated answers across departments."}
          </p>
        </Reveal>
        <div className="inv-passos" ref={lista}>
          <div className="trilho" />
          <div className="cheio" style={{ transform: `scaleY(${progresso})` }} />
          {PASSOS.map((p, i) => (
            <div key={p.titulo.pt} className={`inv-passo${i < acesos ? " on" : ""}`} data-n={i + 1}>
              <h3>{p.titulo[lang]}</h3>
              <p>{p.texto[lang]}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* --------------------------------------------------- chamada iniciativas */

function ChamadaIniciativas() {
  const { lang } = useLanguage();
  return (
    <section className="lv-sec escura">
      <div className="lv-wrap">
        <Reveal>
          <Link className="inv-faixa" to="/iniciativas">
            <div>
              <span className="lv-tag">{lang === "pt" ? "Ecossistema LVRS+" : "LVRS+ ecosystem"}</span>
              <h2 className="lv-h2">
                {lang === "pt" ? <>Conheça nossas <em className="s">iniciativas</em>.</> : <>Meet our <em className="s">initiatives</em>.</>}
              </h2>
              <p className="lv-lead">
                {lang === "pt"
                  ? "Formação, dados, transparência e reconhecimento: o que a cidade já faz pela inovação."
                  : "Training, data, transparency and recognition: what the city already does for innovation."}
              </p>
            </div>
            <div className="inv-faixa-logos" aria-hidden="true">
              <span style={{ background: "#FCFDF4" }}><img src="/iniciativas/lavras-lab.png" alt="" /></span>
              <span style={{ background: "#05070A" }}><img src="/iniciativas/launch.png" alt="" /></span>
              <span style={{ background: "#0A2540" }}><img src="/iniciativas/observatorio.png" alt="" style={{ maxHeight: 70 }} /></span>
            </div>
            <span className="lv-btn">{lang === "pt" ? "Ver iniciativas →" : "See initiatives →"}</span>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

/* --------------------------------------------------------------- contato */

function Contato({ porta }: { porta: Porta | null }) {
  const { lang } = useLanguage();
  const [setor, setSetor] = useState<string>(porta ?? "agro");
  useEffect(() => { if (porta) setSetor(porta); }, [porta]);

  // Sem servidor por tras: o formulario monta o e-mail e abre o programa de
  // e-mail da pessoa, ja endereçado a Superintendencia.
  const enviar = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const linhas = [
      `${lang === "pt" ? "Nome" : "Name"}: ${f.get("nome")}`,
      `${lang === "pt" ? "Empresa" : "Company"}: ${f.get("empresa")}`,
      `E-mail: ${f.get("email")}`,
      `${lang === "pt" ? "País" : "Country"}: ${f.get("pais") || "-"}`,
      `${lang === "pt" ? "Setor" : "Sector"}: ${f.get("setor")}`,
      `${lang === "pt" ? "Fase" : "Stage"}: ${f.get("fase")}`,
      "",
      String(f.get("mensagem") || ""),
    ];
    const assunto = `${lang === "pt" ? "Investimento em Lavras" : "Investing in Lavras"} — ${f.get("empresa")}`;
    window.location.href = `mailto:${EMAIL_CONTATO}?subject=${encodeURIComponent(assunto)}&body=${encodeURIComponent(linhas.join("\n"))}`;
  };

  const fases = lang === "pt"
    ? ["Explorando territórios", "Comparando cidades", "Pronto para visitar", "Expansão de operação existente"]
    : ["Exploring locations", "Comparing cities", "Ready to visit", "Expanding an existing operation"];

  return (
    <section className="lv-sec escura" id="contato" style={{ borderTop: "1px solid var(--borda)", scrollMarginTop: 44 }}>
      <div className="lv-wrap inv-ct-grid">
        <Reveal>
          <span className="lv-tag">{lang === "pt" ? "Vamos conversar" : "Let's talk"}</span>
          <h2 className="lv-h2">
            {lang === "pt" ? <>Lavras está pronta. O próximo passo é <em className="s">uma conversa</em>.</> : <>Lavras is ready. The next step is <em className="s">a conversation</em>.</>}
          </h2>
          <p className="lv-lead" style={{ marginBottom: 28 }}>
            {lang === "pt"
              ? "Superintendência de Inovação · Secretaria de Desenvolvimento Econômico, Urbanismo e Inovação de Lavras."
              : "Innovation Office · Lavras Department of Economic Development, Urban Planning and Innovation."}
          </p>
          <div className="inv-opcoes">
            <a className="inv-op" href={`mailto:${EMAIL_CONTATO}`}>
              <span className="i" aria-hidden="true">@</span>
              <span><b>E-mail</b><span>{EMAIL_CONTATO}</span></span>
            </a>
            <a className="inv-op" href={`mailto:${EMAIL_CONTATO}?subject=${encodeURIComponent(lang === "pt" ? "Quero agendar uma visita a Lavras" : "I'd like to schedule a visit to Lavras")}`}>
              <span className="i" aria-hidden="true">◷</span>
              <span>
                <b>{lang === "pt" ? "Agendar uma visita" : "Schedule a visit"}</b>
                <span>{lang === "pt" ? "Conheça as áreas industriais, a UFLA e as empresas instaladas" : "See the industrial areas, UFLA and the companies already here"}</span>
              </span>
            </a>
          </div>
        </Reveal>
        <Reveal delay={120}>
          <form className="inv-form" onSubmit={enviar}>
            <b style={{ fontSize: "1.1rem" }}>{lang === "pt" ? "Conte sobre o seu projeto" : "Tell us about your project"}</b>
            <div className="inv-dupla">
              <label>{lang === "pt" ? "Nome" : "Name"}<input name="nome" required autoComplete="name" /></label>
              <label>{lang === "pt" ? "Empresa" : "Company"}<input name="empresa" required autoComplete="organization" /></label>
            </div>
            <div className="inv-dupla">
              <label>E-mail<input name="email" type="email" required autoComplete="email" /></label>
              <label>{lang === "pt" ? "País" : "Country"}<input name="pais" autoComplete="country-name" /></label>
            </div>
            <label>{lang === "pt" ? "Setor" : "Sector"}
              <select name="setor" value={setor} onChange={(e) => setSetor(e.target.value)}>
                {PORTAS_ORDEM.map((id) => <option key={id} value={id}>{PORTAS[id].rotulo[lang]}</option>)}
                <option value="outro">{lang === "pt" ? "Outro" : "Other"}</option>
              </select>
            </label>
            <label>{lang === "pt" ? "Fase do investimento" : "Investment stage"}
              <select name="fase">{fases.map((f) => <option key={f}>{f}</option>)}</select>
            </label>
            <label>{lang === "pt" ? "Mensagem" : "Message"}<textarea name="mensagem" rows={3} /></label>
            <button className="lv-btn" type="submit">{lang === "pt" ? "Enviar" : "Send"}</button>
            <span className="obs">
              {lang === "pt" ? "Abre o seu programa de e-mail com a mensagem pronta." : "Opens your e-mail app with the message ready."}
            </span>
          </form>
        </Reveal>
      </div>
    </section>
  );
}

/* --------------------------------------------------------------- pagina */

/** /?setor=agro abre a home com a porta ja escolhida (vem das abas de /pacto). */
function portaDaUrl(): Porta | null {
  const s = new URLSearchParams(window.location.search).get("setor");
  return PORTAS_ORDEM.find((p) => p === s) ?? null;
}

export default function Invista() {
  const [porta, setPorta] = useState<Porta | null>(portaDaUrl);

  const escolher = (p: Porta) => {
    setPorta(p);
    document.getElementById("setor")?.scrollIntoView({ behavior: semMovimento() ? "auto" : "smooth" });
  };

  return (
    <div className="lv" data-vertical={porta ?? "pacto"}>
      <a href="#conteudo" className="skip-to-content">Pular para o conteúdo</a>
      <BarraEcossistema pagina="invista" />
      <main id="conteudo">
        <Hero porta={porta} escolher={escolher} />
        <Numeros />
        <Setor porta={porta} escolher={(p) => setPorta(p)} />
        <OndeSeInstalar />
        <Incentivos />
        <Passos />
        <ChamadaIniciativas />
        <Contato porta={porta} />
      </main>
      <RodapeSimples fontes />
    </div>
  );
}
