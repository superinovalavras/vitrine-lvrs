import type { Language } from "./translations";

/**
 * Os seis idiomas do seletor, com nome na propria lingua e bandeira.
 *
 * As bandeiras sao SVG desenhado aqui, e nao emoji: no Windows o emoji de
 * bandeira aparece como duas letras ("BR"), e a maioria dos acessos de
 * computador da Prefeitura e Windows. Desenho simplificado, legivel em 20px.
 */

const Brasil = () => (
  <svg viewBox="0 0 30 20" aria-hidden="true">
    <rect width="30" height="20" fill="#009C3B" />
    <path d="M15 2.5 27 10 15 17.5 3 10Z" fill="#FFDF00" />
    <circle cx="15" cy="10" r="4.3" fill="#002776" />
    <path d="M10.9 9.2c2.8-.6 5.8-.2 8.2 1.2" stroke="#fff" strokeWidth=".9" fill="none" />
  </svg>
);

const EUA = () => (
  <svg viewBox="0 0 30 20" aria-hidden="true">
    <rect width="30" height="20" fill="#fff" />
    {[0, 2, 4, 6, 8, 10, 12].map((i) => (
      <rect key={i} y={(i * 20) / 13} width="30" height={20 / 13} fill="#B22234" />
    ))}
    <rect width="13" height={(20 / 13) * 7} fill="#3C3B6E" />
  </svg>
);

const Espanha = () => (
  <svg viewBox="0 0 30 20" aria-hidden="true">
    <rect width="30" height="20" fill="#AA151B" />
    <rect y="5" width="30" height="10" fill="#F1BF00" />
  </svg>
);

const Franca = () => (
  <svg viewBox="0 0 30 20" aria-hidden="true">
    <rect width="10" height="20" fill="#002395" />
    <rect x="10" width="10" height="20" fill="#fff" />
    <rect x="20" width="10" height="20" fill="#ED2939" />
  </svg>
);

const Alemanha = () => (
  <svg viewBox="0 0 30 20" aria-hidden="true">
    <rect width="30" height="6.67" fill="#000" />
    <rect y="6.67" width="30" height="6.67" fill="#DD0000" />
    <rect y="13.33" width="30" height="6.67" fill="#FFCE00" />
  </svg>
);

const China = () => (
  <svg viewBox="0 0 30 20" aria-hidden="true">
    <rect width="30" height="20" fill="#DE2910" />
    <path d="M5 2.2 6.2 5.8 2.4 3.6h5.2L3.8 5.8Z" fill="#FFDE00" />
    {[[10, 1.6], [12, 3.6], [12, 6.4], [10, 8.4]].map(([x, y]) => (
      <circle key={`${x}-${y}`} cx={x} cy={y} r=".75" fill="#FFDE00" />
    ))}
  </svg>
);

export const IDIOMAS: { id: Language; sigla: string; nome: string; locale: string; Bandeira: () => JSX.Element }[] = [
  { id: "pt", sigla: "PT", nome: "Português", locale: "pt-BR", Bandeira: Brasil },
  { id: "en", sigla: "EN", nome: "English", locale: "en-US", Bandeira: EUA },
  { id: "es", sigla: "ES", nome: "Español", locale: "es-ES", Bandeira: Espanha },
  { id: "fr", sigla: "FR", nome: "Français", locale: "fr-FR", Bandeira: Franca },
  { id: "de", sigla: "DE", nome: "Deutsch", locale: "de-DE", Bandeira: Alemanha },
  { id: "zh", sigla: "中文", nome: "中文", locale: "zh-CN", Bandeira: China },
];

export const localeDe = (lang: Language) => IDIOMAS.find((i) => i.id === lang)!.locale;
