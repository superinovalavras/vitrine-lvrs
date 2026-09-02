/**
 * As cinco verticais do Pacto LVRS+.
 *
 * As cores NAO sao escolha estetica: cada uma vem de uma variacao da logo
 * entregue pela UONA (ver marca/README.md). A vertical ativa define --accent,
 * herdado em cascata via [data-vertical] em src/index.css.
 *
 * Excecao: o Agro da marca e #003D40, que sobre o fundo escuro rende 1,29:1 de
 * contraste e some. Na tela usamos #009CA3 — mesma matiz e saturacao, mais
 * claro (4,66:1). O #003D40 segue valendo para fundo claro e impresso.
 */

export type VerticalId = "pacto" | "tech" | "agro" | "food" | "sri";

export interface Iniciativa {
  id: string;
  nome: string;
  descricao: { pt: string; en: string };
  url: string;
  logo: string;
  /**
   * Cada programa tem identidade propria, e o card veste a dele — nao a do
   * LVRS+. Valores vindos do manual de cada um; contrastes medidos, todos
   * passam AA sobre o proprio fundo.
   */
  tema: { fundo: string; texto: string; apoio: string; destaque: string };
  /** Simbolo proprio do programa, usado como marca d'agua no card. */
  elemento?: string;
  /**
   * Opacidade da marca d'agua. Precisa variar por card: sobre fundo escuro um
   * simbolo claro aparece com pouco, mas sobre o off-white do Lab o mesmo valor
   * sumiria.
   */
  elementoOpacidade?: number;
}

export interface Vertical {
  id: VerticalId;
  rotulo: string;
  cor: string;
  logo: string;
  fundo: string | null;
  titulo: { pt: string; en: string };
  /** Trecho do titulo que recebe o script em destaque, na cor da vertical. */
  enfase: { pt: string; en: string };
  descricao: { pt: string; en: string };
  iniciativas: Iniciativa[];
}

const iniciativasTech: Iniciativa[] = [
  {
    id: "launch",
    nome: "Launch LVRS+",
    descricao: {
      pt: "Pré-aceleração de startups da Prefeitura em parceria com o RAJA. 14 semanas, até 10 equipes, 49 aulas em 8 módulos. Inteiramente gratuito.",
      en: "Startup pre-acceleration by the City Hall in partnership with RAJA. 14 weeks, up to 10 teams, 49 classes across 8 modules. Entirely free.",
    },
    url: "https://launch.lvrs.com.br",
    logo: "/iniciativas/launch.png",
    // Tema espacial escuro do manual do Launch. O destaque e o Azul Launch, que
    // e a cor que aparece na propria logo — o amarelo Ignicao e cor de apoio e,
    // usado como destaque, competia com a marca.
    tema: { fundo: "#05070A", texto: "#F5F8FB", apoio: "#AEB8C4", destaque: "#4C8AFF" },
  },
  {
    id: "lavras-lab",
    nome: "Lavras Lab",
    descricao: {
      pt: "Escola de Inovação Pública. Forma servidores municipais a tirar do papel um projeto de inovação real dentro da Prefeitura, em 4 blocos de 2 semanas.",
      en: "School of Public Innovation. Trains city employees to deliver a real innovation project inside the City Hall, across 4 two-week blocks.",
    },
    url: "https://lavraslab.lvrs.com.br",
    logo: "/iniciativas/lavras-lab.png",
    // O Lab e claro por natureza: off-white com azul-marinho e azul-violeta.
    // A logo cursiva foi desenhada para esse fundo.
    tema: { fundo: "#FCFDF4", texto: "#23244F", apoio: "#4A4B6B", destaque: "#5557E8" },
    elemento: "/iniciativas/elemento-lavras-lab.png", // a estrela de raios do lockup
    elementoOpacidade: 0.22, // fundo claro pede mais
  },
  {
    id: "observatorio",
    nome: "Observatório VDI",
    descricao: {
      pt: "Censo Semestral Vale dos Ipês. Mede a maturidade das startups do ecossistema a cada 6 meses e alimenta as políticas de fomento com dado real.",
      en: "Vale dos Ipês Biannual Census. Measures ecosystem startup maturity every 6 months and feeds real data into support policies.",
    },
    url: "https://observatorio.lvrs.com.br",
    logo: "/iniciativas/observatorio.png",
    // Cores dos prototipos do censo: azul profundo com verde de destaque.
    tema: { fundo: "#0A2540", texto: "#FFFFFF", apoio: "#B9C7D6", destaque: "#00F5A0" },
    elemento: "/iniciativas/elemento-observatorio.png", // a espiral da propria logo
    elementoOpacidade: 0.1,
  },
];

export const VERTICAIS: Vertical[] = [
  {
    id: "tech",
    rotulo: "tech",
    cor: "#5282FF",
    logo: "/marca/lvrs-tech.png",
    fundo: "/fundos/fundo-tech.jpg",
    titulo: { pt: "A cidade que constrói a própria tecnologia.", en: "The city that builds its own technology." },
    enfase: { pt: "constrói", en: "builds" },
    descricao: {
      pt: "Governo digital, sandbox regulatório e programas que formam quem constrói: servidor público dentro da Prefeitura e fundador de startup no ecossistema.",
      en: "Digital government, a regulatory sandbox, and programs that train the builders: public servants inside the City Hall and startup founders across the ecosystem.",
    },
    iniciativas: iniciativasTech,
  },
  {
    id: "agro",
    rotulo: "agro",
    cor: "#009CA3",
    logo: "/marca/lvrs-agro-tela.png",
    fundo: null, // falta a foto
    titulo: { pt: "Do Cerrado ao celeiro do mundo.", en: "From the Cerrado to the world's granary." },
    enfase: { pt: "celeiro", en: "granary" },
    descricao: {
      pt: "A Escola Agrícola de 1873 virou UFLA, e a ciência feita aqui transformou terra ácida em uma das maiores fronteiras agrícolas do planeta.",
      en: "The 1873 Agricultural School became UFLA, and the science made here turned acid soil into one of the planet's largest agricultural frontiers.",
    },
    iniciativas: [],
  },
  {
    id: "pacto",
    rotulo: "pacto",
    cor: "#FFCD00",
    logo: "/marca/lvrs-pacto.png",
    fundo: "/fundos/fundo-pacto.jpg",
    titulo: { pt: "Lavras, a capital brasileira do futuro do alimento.", en: "Lavras, the Brazilian capital of the future of food." },
    enfase: { pt: "futuro do alimento", en: "future of food" },
    descricao: {
      pt: "Uma plataforma que combina ciência, produção, indústria, logística e qualidade de vida, com um ambiente institucional orientado a quem investe. Terra dos ipês, dos trilhos e de gente feliz.",
      en: "A platform combining science, production, industry, logistics, and quality of life, with an investor-oriented institutional environment. Land of ipê trees, railways, and happy people.",
    },
    iniciativas: [],
  },
  {
    id: "food",
    rotulo: "food",
    cor: "#D34046",
    logo: "/marca/lvrs-food.png",
    fundo: "/fundos/fundo-food.jpg",
    titulo: { pt: "Muito além do agronegócio.", en: "Far beyond agribusiness." },
    enfase: { pt: "agronegócio", en: "agribusiness" },
    descricao: {
      pt: "A estratégia abraça a cadeia inteira do alimento: pesquisa, processamento, marca, logística e acesso a mercado. O alimento como motor de diversificação econômica, não como commodity.",
      en: "The strategy embraces the entire food chain: research, processing, branding, logistics, and market access. Food as an engine of economic diversification, not as a commodity.",
    },
    iniciativas: [],
  },
  {
    id: "sri",
    rotulo: "sri",
    cor: "#0D8049",
    logo: "/marca/lvrs-sri.png",
    fundo: "/fundos/fundo-sri.jpg",
    titulo: { pt: "Lavras dentro do Sul de Minas.", en: "Lavras within Southern Minas." },
    enfase: { pt: "Sul de Minas", en: "Southern Minas" },
    descricao: {
      pt: "Um sistema regional de inovação que conecta Varginha, Itajubá, Santa Rita do Sapucaí, Pouso Alegre e Poços de Caldas. Nenhuma cidade vira polo sozinha.",
      en: "A regional innovation system connecting Varginha, Itajubá, Santa Rita do Sapucaí, Pouso Alegre, and Poços de Caldas. No city becomes a hub on its own.",
    },
    iniciativas: [],
  },
];

/**
 * Ordem das abas, definida pelo Ramon em 2026-08-26: o Pacto abre a fila por ser
 * o guarda-chuva, e as verticais vem depois. Nao e mais o Pacto ao centro.
 */
export const ORDEM_ABAS: VerticalId[] = ["pacto", "agro", "food", "tech", "sri"];

export const VERTICAL_PADRAO: VerticalId = "pacto";

/** Acompanhamento vivo dos 12 projetos. Fonte autoritativa — nao duplicar aqui. */
export const URL_GESTAO = "https://gestaolvrs.govup.io/";
