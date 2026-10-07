import { t } from "@/i18n/translations";
import type { CSSProperties, ReactNode } from "react";
import BarraEcossistema from "@/components/BarraEcossistema";
import RodapeSimples from "@/components/RodapeSimples";
import { Reveal } from "@/hooks/useScrollReveal";
import { useLanguage } from "@/i18n/LanguageContext";
import { comEnfase } from "@/i18n/enfase";
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
  const { lang, L } = useLanguage();
  return (
    <Reveal>
      <article className={`ini${breve ? " breve" : ""}`} style={estilo}>
        {elemento}
        <div>{marca}</div>
        <div className="corpo">
          <p>{texto}</p>
          {praQuem && (
            <div className="pra"><b>{L("Para quem investe", "For investors")}</b>{praQuem}</div>
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
  const { lang, L } = useLanguage();
  return (
    <section className="ini-grupo" id={id}>
      <div className="lv-wrap">
        <header><h2>{t(titulo, lang)}</h2><p>{t(sub, lang)}</p></header>
        {children}
      </div>
    </section>
  );
}

export default function Iniciativas() {
  const { lang, L } = useLanguage();
  const lab = pega("lavras-lab"), launch = pega("launch"), obs = pega("observatorio");

  return (
    <div className="lv" data-vertical="pacto">
      <a href="#conteudo" className="skip-to-content">Pular para o conteúdo</a>
      <BarraEcossistema pagina="iniciativas" />
      <main id="conteudo">
        <header className="ini-topo">
          <div className="lv-wrap">
            <span className="lv-tag">{L("Ecossistema LVRS+", "LVRS+ ecosystem")}</span>
            <h1>{comEnfase(L("Conheça nossas iniciativas.", "Meet our initiatives."), L("iniciativas", "initiatives"))}</h1>
            <p className="lv-lead">
              {L("O que Lavras já faz pela inovação, além dos 12 projetos do Pacto. Cada iniciativa tem identidade e site próprios.", "What Lavras already does for innovation, beyond the Pact's 12 projects. Each initiative has its own identity and website.")}
            </p>
            <nav className="ini-indice" aria-label={L("Grupos", "Groups")}>
              <a href="#formacao">{L("Formação", "Training")}</a>
              <a href="#dados">{L("Dados e transparência", "Data and transparency")}</a>
              <a href="#reconhecimento">{L("Reconhecimento", "Recognition")}</a>
              <a href="#comunidade">{L("Comunidade", "Community")}</a>
            </nav>
          </div>
        </header>

        <Grupo id="formacao" titulo={{ pt: "Formação", en: "Training" }}
          sub={{ pt: "Quem vai construir a cidade: servidores, empreendedores e estudantes.", en: "The people who will build the city: public servants, entrepreneurs and students." }}>
          <Card
            estilo={tema(lab)}
            elemento={lab.elemento && <img className="el" src={lab.elemento} alt="" />}
            marca={<img className="logo" src={lab.logo} alt="Lavras Lab — Escola de Inovação Pública" />}
            texto={t(lab.descricao, lang)}
            praQuem={L("Uma Prefeitura que treina a própria equipe para ser mais ágil.", "A City Hall that trains its own team to be more agile.")}
            href={lab.url} rotuloLink="lavraslab.lvrs.com.br"
          />
          <Card
            estilo={tema(launch)}
            marca={<img className="logo" src={launch.logo} alt="Launch LVRS+" />}
            texto={t(launch.descricao, lang)}
            praQuem={L("Startups prontas para cocriação, inovação aberta e investimento.", "Startups ready for co-creation, open innovation and investment.")}
            meta={[L("Onboarding 04/11/2026", "Onboarding Nov 4, 2026"), L("Demoday 05/03/2027", "Demo Day Mar 5, 2027")]}
            href={launch.url} rotuloLink="launch.lvrs.com.br"
          />
          {/* Parceiros de fora da Prefeitura: vestem o LVRS+, so a logo e deles. */}
          <div className="ini-dupla">
            <Card
              marca={
                <>
                  <img className="logo" src="/iniciativas/youx.svg" alt="YouX" style={{ maxHeight: 48 }} />
                  <div className="logo-txt" style={{ marginTop: 10 }}>Lab</div>
                </>
              }
              texto={L("Programa da YouX Group para alunos do ensino médio de escolas públicas: nove meses de formação técnica e socioemocional, com ponte para o primeiro emprego em tecnologia.", "A YouX Group program for public high school students: nine months of technical and socio-emotional training, with a bridge to a first job in tech.")}
              praQuem={L("Jovens de Lavras formados para o mercado de tecnologia.", "Young people from Lavras trained for the tech job market.")}
              meta={[L("Meta: 400 jovens no mercado até 2030", "Goal: 400 young people in jobs by 2030")]}
              href="https://youxgroup.com.br/youx-lab/" rotuloLink="youxgroup.com.br"
            />
            <Card
              marca={<img className="logo" src="/iniciativas/avanca-cafe.png" alt="Avança Café" />}
              texto={L("Hackathon e pré-aceleração de soluções digitais, de automação e biotecnologia para a cadeia do café. Realização da Embrapa Café, com execução do Ipêtech/UFLA e do tecnoPARQ/UFV.", "Hackathon and pre-acceleration for digital, automation and biotech solutions for the coffee chain. Organized by Embrapa Café, run by Ipêtech/UFLA and tecnoPARQ/UFV.")}
              praQuem={L("Startups do café nascendo junto da pesquisa da UFLA e da Embrapa.", "Coffee startups born alongside UFLA and Embrapa research.")}
              meta={[L("Mais de R$ 97 mil em prêmios", "Over R$97k in prizes"), L("Demo Day em dezembro/2026", "Demo Day Dec 2026")]}
              href="https://ipetech.ufla.br/index.php/avanca-cafe/" rotuloLink="ipetech.ufla.br"
            />
          </div>
          <Card
            breve
            marca={<div className="logo-txt">{L("Academia de\nInovação de Lavras", "Lavras Innovation\nAcademy")}</div>}
            texto={L("A plataforma de cursos do LVRS+, que vai reunir o Lavras Lab, o Launch e os próximos programas.", "The LVRS+ course platform, which will bring together Lavras Lab, Launch and future programs.")}
            rotuloLink={L("Em breve", "Coming soon")}
          />
        </Grupo>

        <Grupo id="dados" titulo={{ pt: "Dados e transparência", en: "Data and transparency" }}
          sub={{ pt: "Os números da cidade e o andamento do Pacto, abertos.", en: "The city's numbers and the Pact's progress, in the open." }}>
          <div className="ini-dupla">
            <Card
              estilo={tema(obs)}
              elemento={obs.elemento && <img className="el" src={obs.elemento} alt="" />}
              marca={<img className="logo" src={obs.logo} alt="Observatório VDI" />}
              texto={t(obs.descricao, lang)}
              praQuem={L("Os números da cidade, com fonte e ano.", "The city's numbers, with source and year.")}
              href={obs.url} rotuloLink="observatorio.lvrs.com.br"
            />
            <Card
              marca={<div className="logo-txt"><span style={{ color: "#FFCD00" }}>12</span> {L("projetos\ndo Pacto", "Pact\nprojects")}</div>}
              texto={L("Responsáveis, metas e execução de cada projeto prioritário, atualizados no painel de gestão.", "Owners, targets and progress for each priority project, updated on the management panel.")}
              praQuem={L("Transparência sobre o que já está andando.", "Transparency about what is already under way.")}
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
                <div className="logo-txt" style={{ marginTop: 12 }}>{L("Prêmio Lavras\nde Inovação 2026", "Lavras Innovation\nAward 2026")}</div>
              </>
            }
            texto={L("Reconhece pessoas, empresas e instituições que inovam na cidade. Indicação pelas entidades e votação popular.", "Recognizes people, companies and institutions that innovate in the city. Nominations by institutions and a public vote.")}
            meta={[L("Votação 06 a 11/11", "Voting Nov 6–11"), L("Cerimônia 17/11", "Ceremony Nov 17")]}
            href="https://premio.lvrs.com.br" rotuloLink="premio.lvrs.com.br"
          />
        </Grupo>

        <Grupo id="comunidade" titulo={{ pt: "Comunidade", en: "Community" }}
          sub={{ pt: "Quem faz o ecossistema acontecer.", en: "The people who make the ecosystem happen." }}>
          <Card
            marca={<img className="logo" src={logoVale} alt="Vale dos Ipês" style={{ maxHeight: 120 }} />}
            texto={L("O ecossistema de inovação e empreendedorismo de Lavras, desde 2014: universidades, hubs, startups, empresas e comunidades.", "Lavras' innovation and entrepreneurship ecosystem since 2014: universities, hubs, startups, companies and communities.")}
            praQuem={L("A porta de entrada para conhecer quem já empreende aqui.", "The way in to meet those already building businesses here.")}
            rotuloLink={L("Site em breve", "Website coming soon")}
          />
        </Grupo>
        <div style={{ height: 72 }} />
      </main>
      <RodapeSimples />
    </div>
  );
}
