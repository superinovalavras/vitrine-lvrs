/**
 * SRI Sul de Minas (Sistema Regional de Inovacao), na identidade propria do
 * SRI: sri/SRI_Guia_de_Identidade_Visual.pdf (set/2026).
 *
 * A marca e um prisma cujos vertices sao as seis cidades na posicao real do
 * mapa. As posicoes e as ligacoes abaixo foram tiradas do proprio guia
 * (pagina "Grafismos": 01 as seis cidades, 03 as conexoes), num viewBox 600x450.
 */

type T = { pt: string; en: string };

export const SRI_CORES = {
  noite: "#0F1E2E",
  eletrico: "#17A2C4",
  pedra: "#F2F2EF",
};

export type CidadeId = "lavras" | "varginha" | "pocos" | "santarita" | "pouso" | "itajuba";

export interface Cidade {
  id: CidadeId;
  nome: string;
  x: number;
  y: number;
  /** Lado do rotulo no mapa, para nao encostar nas linhas. */
  rotulo: "cima" | "baixo" | "esquerda" | "direita";
  papel: T;
  texto: T;
}

export const CIDADES: Cidade[] = [
  {
    id: "lavras", nome: "Lavras", x: 533, y: 60, rotulo: "cima",
    papel: { pt: "Ciência do agro e do alimento", en: "Agri-food science" },
    texto: {
      pt: "Sede da UFLA, referência em ciências agrárias e alimentos. É aqui que a sua empresa se instala.",
      en: "Home of UFLA, a reference in agricultural and food sciences. This is where your company sets up.",
    },
  },
  {
    id: "varginha", nome: "Varginha", x: 412, y: 150, rotulo: "cima",
    papel: { pt: "Logística e comércio exterior", en: "Logistics and foreign trade" },
    texto: {
      pt: "Porto Seco e aeroporto regional, a 90 km de Lavras.",
      en: "Dry port and regional airport, 90 km from Lavras.",
    },
  },
  {
    id: "pocos", nome: "Poços de Caldas", x: 60, y: 219, rotulo: "baixo",
    papel: { pt: "Indústria e mineração", en: "Industry and mining" },
    texto: {
      pt: "Polo da indústria do alumínio e campus da UNIFAL.",
      en: "Hub of the aluminium industry and a UNIFAL campus.",
    },
  },
  {
    id: "santarita", nome: "Santa Rita do Sapucaí", x: 340, y: 341, rotulo: "cima",
    papel: { pt: "Vale da Eletrônica", en: "Electronics Valley" },
    texto: {
      pt: "Inatel e mais de 150 empresas de tecnologia.",
      en: "Inatel and more than 150 technology companies.",
    },
  },
  {
    id: "pouso", nome: "Pouso Alegre", x: 246, y: 351, rotulo: "baixo",
    papel: { pt: "Polo industrial na Fernão Dias", en: "Industrial hub on the Fernão Dias" },
    texto: {
      pt: "Indústrias de diversos setores às margens da BR-381, a caminho de São Paulo.",
      en: "Industries from many sectors along the BR-381, on the way to São Paulo.",
    },
  },
  {
    id: "itajuba", nome: "Itajubá", x: 418, y: 412, rotulo: "baixo",
    papel: { pt: "Engenharia e aeronáutica", en: "Engineering and aeronautics" },
    texto: {
      pt: "UNIFEI e a fábrica de helicópteros da Helibras.",
      en: "UNIFEI and the Helibras helicopter plant.",
    },
  },
];

/** As ligacoes do prisma, como no guia ("03 As conexoes"). */
export const CONEXOES: [CidadeId, CidadeId][] = [
  ["pocos", "lavras"], ["pocos", "varginha"], ["pocos", "santarita"], ["pocos", "pouso"],
  ["varginha", "lavras"], ["varginha", "santarita"], ["lavras", "santarita"], ["lavras", "itajuba"],
  ["pouso", "santarita"], ["pouso", "itajuba"], ["santarita", "itajuba"],
];
