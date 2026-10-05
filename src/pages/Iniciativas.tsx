import type { CSSProperties, ReactNode } from "react";
import BarraEcossistema from "@/components/BarraEcossistema";
import RodapeSimples from "@/components/RodapeSimples";
import { Reveal } from "@/hooks/useScrollReveal";
import { useLanguage } from "@/i18n/LanguageContext";
import { iniciativasTech, URL_GESTAO, type Iniciativa } from "@/data/verticais";
import logoLvrs from "@/assets/logo-lvrs.svg";
import logoVale from "@/assets/logo-vale-ipes.svg";

/**
 * /iniciativas — o que a cidade ja faz pela inovacao, alem dos 12 projetos do
 * Pacto. Organizado pelo que cada iniciativa E (decisao de 05/10/2026), e nao
 * como lista de sites: uma grade de cards misturava coisas de natureza
 * diferente e foi recusada.
 *
 * Lab, Launch e Observatorio vestem a identidade propria, com o mesmo tema
 * usado em verticais.ts. O resto veste o LVRS+.
 */

type T = { pt: string; en: string };

const tema = (i: Iniciativa): CSSProperties =>
  ({
    "--f": i.tema.fundo, "--t": i.tema.texto, "--a": i.tema.apoio, "--d": i.tema.destaque,
    "--eo": i.elementoOpacidade ?? 0.12,
  }) as CSSProperties;

const pega = (id: string) => iniciativasTech.find((i) => i.id === id)!;

function Card({
  estilo, elemento, marca, texto, praQuem, meta, href, rotuloLink, breve,
}: {
  estilo?: CSSProperties; elemento?: ReactNode; marca: ReactNode; texto: string; praQuem?: string;
  meta?: string[]; href?: string; rotuloLink: string; breve?: boolean;
}) {
  const { lang } = useLanguage();
  return (
    <Reveal>
      <article className={`ini${breve ? " breve" : ""}`} style={estilo}>
        {elemento}
        <div>{marca}</div>
        <div className="corpo">
          <p>{texto}</p>
          {praQuem && (
            <div className="pra"><b>{lang === "pt" ? "Para quem investe" : "For investors"}</b>{praQuem}</div>
          )}
          {meta && <div className="meta">{meta.map((m) => <span key={m}>{m}</span>)}</div>}
          {href ? (
            <a className="ir" href={href}>{rotuloLink} →</a>
          ) : (
            <span className="ir parado">{rotuloLink}</span>
          )}
        </div>
      </article>
    </Reveal>
  );
}

function Grupo({ id, titulo, sub, children }: { id: string; titulo: T; sub: T; children: ReactNode }) {
  const { lang } = useLanguage();
  return (
    <section className="ini-grupo" id={id}>
      <div className="lv-wrap">
        <header><h2>{titulo[lang]}</h2><p>{sub[lang]}</p></header>
        {children}
      </div>
    </section>
  );
}

export default function Iniciativas() {
  const { lang } = useLanguage();
  const lab = pega("lavras-lab"), launch = pega("launch"), obs = pega("observatorio");
  const pt = lang === "pt";

  return (
    <div className="lv" data-vertical="pacto">
      <a href="#conteudo" className="skip-to-content">Pular para o conteúdo</a>
      <BarraEcossistema pagina="iniciativas" />
      <main id="conteudo">
        <header className="ini-topo">
          <div className="lv-wrap">
            <span className="lv-tag">{pt ? "Ecossistema LVRS+" : "LVRS+ ecosystem"}</span>
            <h1>{pt ? <>Conheça nossas <em className="s">iniciativas</em>.</> : <>Meet our <em className="s">initiatives</em>.</>}</h1>
            <p className="lv-lead">
              {pt
                ? "O que Lavras já faz pela inovação, além dos 12 projetos do Pacto. Cada iniciativa tem identidade e site próprios."
                : "What Lavras already does for innovation, beyond the Pact's 12 projects. Each initiative has its own identity and website."}
            </p>
            <nav className="ini-indice" aria-label={pt ? "Grupos" : "Groups"}>
              <a href="#formacao">{pt ? "Formação" : "Training"}</a>
              <a href="#dados">{pt ? "Dados e transparência" : "Data and transparency"}</a>
              <a href="#reconhecimento">{pt ? "Reconhecimento" : "Recognition"}</a>
              <a href="#comunidade">{pt ? "Comunidade" : "Community"}</a>
            </nav>
          </div>
        </header>

        <Grupo id="formacao" titulo={{ pt: "Formação", en: "Training" }}
          sub={{ pt: "Quem vai construir a cidade: servidores, empreendedores e estudantes.", en: "The people who will build the city: public servants, entrepreneurs and students." }}>
          <Card
            estilo={tema(lab)}
            elemento={lab.elemento && <img className="el" src={lab.elemento} alt="" />}
            marca={<img className="logo" src={lab.logo} alt="Lavras Lab — Escola de Inovação Pública" />}
            texto={lab.descricao[lang]}
            praQuem={pt ? "Uma Prefeitura que treina a própria equipe para ser mais ágil." : "A City Hall that trains its own team to be more agile."}
            href={lab.url} rotuloLink="lavraslab.lvrs.com.br"
          />
          <Card
            estilo={tema(launch)}
            marca={<img className="logo" src={launch.logo} alt="Launch LVRS+" />}
            texto={launch.descricao[lang]}
            praQuem={pt ? "Startups prontas para cocriação, inovação aberta e investimento." : "Startups ready for co-creation, open innovation and investment."}
            meta={pt ? ["Onboarding 04/11/2026", "Demoday 05/03/2027"] : ["Onboarding Nov 4, 2026", "Demo Day Mar 5, 2027"]}
            href={launch.url} rotuloLink="launch.lvrs.com.br"
          />
          <Card
            breve
            marca={<div className="logo-txt">{pt ? <>Academia de<br />Inovação de Lavras</> : <>Lavras Innovation<br />Academy</>}</div>}
            texto={pt
              ? "A plataforma de cursos do LVRS+, que vai reunir o Lavras Lab, o Launch e os próximos programas."
              : "The LVRS+ course platform, which will bring together Lavras Lab, Launch and future programs."}
            rotuloLink={pt ? "Em breve" : "Coming soon"}
          />
        </Grupo>

        <Grupo id="dados" titulo={{ pt: "Dados e transparência", en: "Data and transparency" }}
          sub={{ pt: "Os números da cidade e o andamento do Pacto, abertos.", en: "The city's numbers and the Pact's progress, in the open." }}>
          <div className="ini-dupla">
            <Card
              estilo={tema(obs)}
              elemento={obs.elemento && <img className="el" src={obs.elemento} alt="" />}
              marca={<img className="logo" src={obs.logo} alt="Observatório VDI" />}
              texto={obs.descricao[lang]}
              praQuem={pt ? "Os números da cidade, com fonte e ano." : "The city's numbers, with source and year."}
              href={obs.url} rotuloLink="observatorio.lvrs.com.br"
            />
            <Card
              marca={<div className="logo-txt"><span style={{ color: "#FFCD00" }}>12</span> {pt ? <>projetos<br />do Pacto</> : <>Pact<br />projects</>}</div>}
              texto={pt
                ? "Responsáveis, metas e execução de cada projeto prioritário, atualizados no painel de gestão."
                : "Owners, targets and progress for each priority project, updated on the management panel."}
              praQuem={pt ? "Transparência sobre o que já está andando." : "Transparency about what is already under way."}
              href={URL_GESTAO} rotuloLink="gestaolvrs.govup.io"
            />
          </div>
        </Grupo>

        <Grupo id="reconhecimento" titulo={{ pt: "Reconhecimento", en: "Recognition" }}
          sub={{ pt: "Quem inova em Lavras ganha palco.", en: "Those who innovate in Lavras take the stage." }}>
          <Card
            estilo={{ "--eo": 0.18 } as CSSProperties}
            elemento={
              <svg className="el" viewBox="0 0 100 100" aria-hidden="true">
                <circle cx="50" cy="50" r="46" fill="none" stroke="#FFCD00" strokeWidth="2" />
                <circle cx="50" cy="50" r="34" fill="none" stroke="#FFCD00" strokeWidth="2" />
                <circle cx="50" cy="50" r="22" fill="none" stroke="#FFCD00" strokeWidth="2" />
              </svg>
            }
            marca={
              <>
                <img className="logo" src={logoLvrs} alt="LVRS+" style={{ maxHeight: 56 }} />
                <div className="logo-txt" style={{ marginTop: 12 }}>{pt ? <>Prêmio Lavras<br />de Inovação 2026</> : <>Lavras Innovation<br />Award 2026</>}</div>
              </>
            }
            texto={pt
              ? "Reconhece pessoas, empresas e instituições que inovam na cidade. Indicação pelas entidades e votação popular."
              : "Recognizes people, companies and institutions that innovate in the city. Nominations by institutions and a public vote."}
            meta={pt ? ["Votação 06 a 11/11", "Cerimônia 17/11"] : ["Voting Nov 6–11", "Ceremony Nov 17"]}
            href="https://premio.lvrs.com.br" rotuloLink="premio.lvrs.com.br"
          />
        </Grupo>

        <Grupo id="comunidade" titulo={{ pt: "Comunidade", en: "Community" }}
          sub={{ pt: "Quem faz o ecossistema acontecer.", en: "The people who make the ecosystem happen." }}>
          <Card
            marca={<img className="logo" src={logoVale} alt="Vale dos Ipês" style={{ maxHeight: 120 }} />}
            texto={pt
              ? "O ecossistema de inovação e empreendedorismo de Lavras, desde 2014: universidades, hubs, startups, empresas e comunidades."
              : "Lavras' innovation and entrepreneurship ecosystem since 2014: universities, hubs, startups, companies and communities."}
            praQuem={pt ? "A porta de entrada para conhecer quem já empreende aqui." : "The way in to meet those already building businesses here."}
            rotuloLink={pt ? "Site em breve" : "Website coming soon"}
          />
        </Grupo>
        <div style={{ height: 72 }} />
      </main>
      <RodapeSimples />
    </div>
  );
}
