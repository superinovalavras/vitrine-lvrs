import { useEffect, useState } from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import { t } from "@/i18n/translations";
import { comEnfase } from "@/i18n/enfase";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { CIDADES, CONEXOES, type CidadeId } from "@/data/sri";

/**
 * O que a porta "Sul de Minas" abre na home, na identidade do SRI Sul de Minas
 * (pedido de 06/10/2026: "siga a identidade do SRI nessa parte, nao coloque a
 * logo do LVRS"). Noite como base, Eletrico como cor de conexao, Sora nos
 * titulos e Inter no texto, como manda o guia.
 *
 * O mapa conta a origem da marca na sequencia do guia: as seis cidades, os
 * pontos, as conexoes e o solido. Depois, tocar numa cidade acende as ligacoes
 * dela e mostra o que ela traz para a rede.
 */

const POS = Object.fromEntries(CIDADES.map((c) => [c.id, c]));
const semMovimento = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function MapaSRI({ ativa, escolher }: { ativa: CidadeId; escolher: (c: CidadeId) => void }) {
  const { L } = useLanguage();
  const { ref, isVisible } = useScrollReveal(0.3);
  // 0 = nada; 1 = cidades; 2 = pontos; 3 = conexoes; 4 = solido (interativo)
  const [fase, setFase] = useState(0);

  useEffect(() => {
    if (!isVisible) return;
    if (semMovimento()) return setFase(4);
    const ts = [0, 700, 1300, 2600].map((ms, i) => window.setTimeout(() => setFase(i + 1), ms));
    return () => ts.forEach(window.clearTimeout);
  }, [isVisible]);

  return (
    <div ref={ref} className={`sri-mapa fase-${fase}`}>
      <svg viewBox="0 0 640 470" role="img" aria-label={L("Mapa das seis cidades do SRI Sul de Minas", "Map of the six cities of SRI Sul de Minas")}>
        {/* +40 em x: espaco para o rotulo de Pocos de Caldas, na borda esquerda */}
        <g transform="translate(40 0)">
        <g className="sri-linhas">
          {CONEXOES.map(([a, b], i) => {
            const acesa = a === ativa || b === ativa;
            return (
              <line
                key={`${a}-${b}`}
                x1={POS[a].x} y1={POS[a].y} x2={POS[b].x} y2={POS[b].y}
                className={acesa && fase === 4 ? "acesa" : ""}
                style={{ transitionDelay: fase === 3 ? `${i * 70}ms` : "0ms" }}
              />
            );
          })}
        </g>
        {CIDADES.map((c) => {
          const dx = c.rotulo === "direita" ? 14 : c.rotulo === "esquerda" ? -14 : 0;
          const dy = c.rotulo === "cima" ? -16 : c.rotulo === "baixo" ? 26 : 5;
          const ancora = c.rotulo === "direita" ? "start" : c.rotulo === "esquerda" ? "end" : "middle";
          return (
            <g
              key={c.id}
              className={`sri-cidade${c.id === ativa ? " ativa" : ""}`}
              role="button"
              tabIndex={fase === 4 ? 0 : -1}
              aria-label={c.nome}
              aria-pressed={c.id === ativa}
              onClick={() => escolher(c.id)}
              onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && escolher(c.id)}
            >
              <circle className="alvo" cx={c.x} cy={c.y} r="24" />
              <circle className="anel" cx={c.x} cy={c.y} r="14" />
              <circle className="ponto" cx={c.x} cy={c.y} r="6" />
              <text x={c.x + dx} y={c.y + dy} textAnchor={ancora}>{c.nome}</text>
            </g>
          );
        })}
        </g>
      </svg>
    </div>
  );
}

export default function SetorSRI() {
  const { lang, L } = useLanguage();
  const [ativa, setAtiva] = useState<CidadeId>("lavras");
  const cidade = POS[ativa];

  return (
    <div className="sri">
      <div className="sri-topo">
        <img src="/sri/sri-logo-branco.png" alt="SRI Sul de Minas" />
        <span>{L("Sistema Regional de Inovação", "Regional Innovation System")}</span>
      </div>

      <h3>
        {comEnfase(
          L("Em Lavras, você chega a seis cidades que trabalham juntas.", "In Lavras, you reach six cities that work together."),
          L("trabalham juntas", "work together"),
        )}
      </h3>
      <p className="sri-lead">
        {L(
          "Lavras faz parte do SRI Sul de Minas: universidades, indústrias e empresas de tecnologia de seis cidades que funcionam como um só sistema. Nenhuma é a capital. Cada uma é um ponto de uma estrutura que se sustenta junta.",
          "Lavras is part of SRI Sul de Minas: universities, industries and tech companies from six cities working as a single system. None of them is the capital. Each is a point in a structure that holds together.",
        )}
      </p>

      <div className="sri-rede">
        <MapaSRI ativa={ativa} escolher={setAtiva} />
        <div className="sri-cidades">
          <div className="sri-ficha" key={ativa} aria-live="polite">
            <span className="sri-papel">{t(cidade.papel, lang)}</span>
            <b>{cidade.nome}</b>
            <p>{t(cidade.texto, lang)}</p>
          </div>
          <div className="sri-lista" role="group" aria-label={L("Cidades do sistema", "Cities in the system")}>
            {CIDADES.map((c) => (
              <button key={c.id} type="button" aria-pressed={c.id === ativa} onClick={() => setAtiva(c.id)}>
                {c.nome}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="sri-numeros">
        <div><b>6</b><span>{L("cidades conectadas", "connected cities")}</span></div>
        <div><b>{L("2,9 mi", "2.9 m")}</b><span>{L("habitantes em 155 municípios", "people in 155 municipalities")}</span></div>
        <div><b>150+</b><span>{L("empresas de tecnologia no Vale da Eletrônica", "tech companies in the Electronics Valley")}</span></div>
        <div><b>UFLA · UNIFEI · UNIFAL · Inatel</b><span>{L("universidades e centros de pesquisa da rede", "universities and research centres in the network")}</span></div>
      </div>

      <div className="sri-logistica">
        <span className="sri-papel">{L("A partir de Lavras, pela BR-381", "From Lavras, via the BR-381")}</span>
        <ul>
          <li><b>230 km</b> Belo Horizonte</li>
          <li><b>370 km</b> São Paulo</li>
          <li><b>450 km</b> Rio de Janeiro</li>
          <li><b>90 km</b> {L("Aeroporto de Varginha", "Varginha Airport")}</li>
        </ul>
      </div>

      <blockquote className="sri-manifesto">
        {L(
          "Seis pontos em um mapa. Sozinhos, são coordenadas. Ligados, são uma forma.",
          "Six points on a map. Alone, they are coordinates. Connected, they are a shape.",
        )}
        <cite>{L("Manifesto do SRI Sul de Minas", "SRI Sul de Minas manifesto")}</cite>
      </blockquote>

      <a className="sri-btn" href="#contato">
        {L("Falar sobre operação regional", "Talk about regional operations")} →
      </a>
    </div>
  );
}
