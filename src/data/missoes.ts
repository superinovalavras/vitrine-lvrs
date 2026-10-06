/**
 * As abas da pagina /pacto (decisao de 06/10/2026): o Pacto e as suas quatro
 * missoes para 2040. Antes eram as verticais (Agro, Food, Tech, SRI), que ja
 * abrem a home; repetir aqui deixava o site redundante.
 *
 * Titulos e textos das missoes sao os mesmos da secao Visao 2040, para que as
 * duas falem igual (e reaproveitem a traducao).
 */
import foodtech from "@/assets/foodtech.jpg";
import vinicola from "@/assets/winery-lavras.jpg";
import funil from "@/assets/funil-dam.jpg";
import estudantes from "@/assets/fadminas-students.jpg";

type T = { pt: string; en: string };

export type MissaoId = "agrofoodtech" | "criativa" | "sustentavel" | "feliz";
export type AbaPactoId = "pacto" | MissaoId;

export interface AbaPacto {
  id: AbaPactoId;
  /** Rotulo curto da aba (cabe no celular). */
  rotulo: T;
  titulo: T;
  /** Trecho do titulo que recebe o script em destaque. */
  enfase: T;
  descricao: T;
  fundo: string;
}

export const ABAS_PACTO: AbaPacto[] = [
  {
    id: "pacto",
    rotulo: { pt: "Pacto", en: "Pact" },
    titulo: { pt: "Lavras, a capital brasileira do futuro do alimento.", en: "Lavras, the Brazilian capital of the future of food." },
    enfase: { pt: "futuro do alimento", en: "future of food" },
    descricao: {
      pt: "Uma plataforma que combina ciência, produção, indústria, logística e qualidade de vida, com um ambiente institucional orientado a quem investe. Terra dos ipês, dos trilhos e de gente feliz.",
      en: "A platform combining science, production, industry, logistics, and quality of life, with an investor-oriented institutional environment. Land of ipê trees, railways, and happy people.",
    },
    fundo: "/fundos/fundo-pacto.jpg",
  },
  {
    id: "agrofoodtech",
    rotulo: { pt: "Agro-FoodTech", en: "Agro-FoodTech" },
    titulo: { pt: "Cidade Agro-FoodTech", en: "Agro-FoodTech City" },
    enfase: { pt: "Agro-FoodTech", en: "Agro-FoodTech" },
    descricao: {
      pt: "Lavras será um polo nacional de inovação em alimentos, biotecnologia e sustentabilidade agrícola. A missão é conectar ciência e produção, criando um ambiente propício para startups, indústrias e centros de P&D voltados ao agro do futuro.",
      en: "Lavras will be a national hub for innovation in food, biotechnology and agricultural sustainability. The mission is to connect science and production, creating an environment conducive to startups, industries and R&D centers focused on the agriculture of the future.",
    },
    fundo: foodtech,
  },
  {
    id: "criativa",
    rotulo: { pt: "Criativa", en: "Creative" },
    titulo: { pt: "Cidade Criativa e Gastronômica", en: "Creative and Gastronomic City" },
    enfase: { pt: "Gastronômica", en: "Gastronomic" },
    descricao: {
      pt: "A cultura e a gastronomia se tornam pilares da economia criativa e da identidade territorial. Lavras se posicionará como destino de inovação gastronômica e turismo de experiências.",
      en: "Culture and gastronomy become pillars of the creative economy and territorial identity. Lavras will position itself as a destination for gastronomic innovation and experience tourism.",
    },
    fundo: vinicola,
  },
  {
    id: "sustentavel",
    rotulo: { pt: "Sustentável", en: "Sustainable" },
    titulo: { pt: "Cidade Sustentável e Regenerativa", en: "Sustainable and Regenerative City" },
    enfase: { pt: "Regenerativa", en: "Regenerative" },
    descricao: {
      pt: "Lavras se tornará uma cidade modelo em sustentabilidade e regeneração ambiental, articulando transição energética, gestão inteligente de resíduos, economia circular e urbanismo verde.",
      en: "Lavras will become a model city in sustainability and environmental regeneration, combining energy transition, smart waste management, circular economy and green urbanism.",
    },
    fundo: funil,
  },
  {
    id: "feliz",
    rotulo: { pt: "Feliz", en: "Happy" },
    titulo: { pt: "Cidade Feliz", en: "Happy City" },
    enfase: { pt: "Feliz", en: "Happy" },
    descricao: {
      pt: "Inspirada nas 'Blue Zones' — territórios onde as pessoas vivem mais e melhor — Lavras buscará se tornar referência nacional em bem-estar, longevidade e alimento saudável.",
      en: "Inspired by the 'Blue Zones' — territories where people live longer and better — Lavras will seek to become a national reference in well-being, longevity and healthy food.",
    },
    fundo: estudantes,
  },
];
