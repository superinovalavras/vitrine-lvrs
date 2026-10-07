/**
 * Conteudo da home (Invista), a pagina para empresas que se identificam com a
 * vocacao economica de Lavras. Aprovada em maquete em 05/10/2026.
 *
 * Fontes: o guia de investimento "Lavras — The Brazilian Capital of the Future
 * of Food" (fev/2026) e a base do Observatorio em
 * tech/observatorio/dados/lavras-em-numeros.md (IBGE, INEP, CAGED, 2022-2026).
 * Ao atualizar um numero, atualizar tambem a fonte no comentario ao lado.
 */
import type { VerticalId } from "@/data/verticais";
import agroSprayer from "@/assets/agro-sprayer.jpg";
import dairyFactory from "@/assets/dairy-factory.jpg";
import youxLab from "@/assets/youx-lab.jpg";
import aerialLavras from "@/assets/aerial-lavras.jpg";
import funilDam from "@/assets/funil-dam.jpg";
import serraBocaina from "@/assets/serra-bocaina.jpg";
import ipetech from "@/assets/ipetech.jpg";

type T = { pt: string; en: string };
/** Nome proprio (empresa, sigla) fica igual nos dois idiomas; o resto traduz. */
export type Texto = string | T;

/** As quatro portas da home. O Pacto nao e porta: tem pagina propria (/pacto). */
export type Porta = Exclude<VerticalId, "pacto">;
export const PORTAS_ORDEM: Porta[] = ["agro", "food", "tech", "sri"];

export const HERO = {
  titulo: { pt: "Lavras, a capital brasileira do futuro do alimento.", en: "Lavras, the Brazilian capital of the future of food." } as T,
  enfase: { pt: "futuro do alimento", en: "future of food" } as T,
  lead: {
    pt: "Ciência, talento, logística e um governo que facilita. Um território pronto para empresas que querem crescer com a vocação da cidade.",
    en: "Science, talent, logistics and a government that makes things easier. A territory ready for companies that want to grow with the city's economic vocation.",
  } as T,
  pergunta: { pt: "Qual é o seu negócio?", en: "What is your business?" } as T,
};

export const FUNDO_HERO: Record<Porta | "pacto", string> = {
  pacto: "/fundos/fundo-pacto.jpg",
  agro: "/fundos/fundo-agro.jpg",
  food: "/fundos/fundo-food.jpg",
  tech: "/fundos/fundo-tech.jpg",
  // O SRI tem identidade propria: fundo Noite com o prisma em escala, em linha fina.
  sri: "/sri/fundo-sri-grafismo.svg",
};

export interface DadosPorta {
  rotulo: T;
  resumo: T; // texto curto da porta no hero
  logo: string;
  titulo: T;
  enfase: T;
  texto: T;
  mini: { valor: Texto; legenda: T }[];
  empresas: string[];
  empresasTitulo?: T;
  talento: Texto[];
  foto: string;
  legendaFoto: T;
  depoimento?: { texto: T; autor: T };
  lista: T[];
  listaTitulo: T;
  /** A porta Sul de Minas mostra o mapa de distancias no lugar da foto. */
  mapa?: boolean;
}

export const PORTAS: Record<Porta, DadosPorta> = {
  agro: {
    rotulo: { pt: "Agro", en: "Agro" },
    resumo: { pt: "Insumos, máquinas, biológicos, agricultura de precisão", en: "Inputs, machinery, biologicals, precision farming" },
    logo: "/marca/lvrs-agro-tela.png",
    titulo: { pt: "Do Cerrado ao celeiro do mundo.", en: "From the Cerrado to the world's granary." },
    enfase: { pt: "celeiro", en: "granary" },
    texto: {
      pt: "A ciência que tornou fértil o solo do Cerrado nasceu aqui, na antiga ESAL, hoje UFLA. Para empresas de insumos, máquinas, biológicos e agricultura de precisão, Lavras é laboratório e mercado ao mesmo tempo.",
      en: "The science that made the Cerrado's soil fertile was born here, at the former ESAL, now UFLA. For companies in inputs, machinery, biologicals and precision farming, Lavras is both laboratory and market.",
    },
    mini: [
      // CAGED: variacao do estoque da agropecuaria, jan-jul/2026
      { valor: { pt: "+6,6%", en: "+6.6%" }, legenda: { pt: "emprego formal na agropecuária em 2026, o que mais cresce", en: "formal jobs in agriculture in 2026, the fastest-growing sector" } },
      { valor: { pt: "nº 1", en: "No. 1" }, legenda: { pt: "Minas Gerais em café e leite no Brasil", en: "Minas Gerais in coffee and milk in Brazil" } },
      // UFLA, 2026/1
      { valor: { pt: "10,4 mil", en: "10.4k" }, legenda: { pt: "alunos de graduação na UFLA", en: "undergraduate students at UFLA" } },
    ],
    empresas: ["tbit", "Biomip", "AgScan", "Ceifa", "Vaca Roxa", "Minas Verde"],
    talento: [
      { pt: "Agronomia", en: "Agronomy" }, { pt: "Zootecnia", en: "Animal Science" },
      { pt: "Engenharia Agrícola", en: "Agricultural Engineering" }, { pt: "Medicina Veterinária", en: "Veterinary Medicine" },
      { pt: "Unidade Embrapii Zetta/UFLA", en: "Embrapii Zetta/UFLA unit" }, "InovaCafé",
    ],
    foto: agroSprayer,
    legendaFoto: { pt: "Pulverização em lavoura do Sul de Minas", en: "Crop spraying in Southern Minas" },
    lista: [
      { pt: "Cinturão do Alimento/Verde", en: "Food/Green Belt" },
      { pt: "Usina de Compostagem", en: "Composting Plant" },
      { pt: "Distritos industriais na BR-381", en: "Industrial districts on the BR-381" },
    ],
    listaTitulo: { pt: "Projetos e áreas", en: "Projects and areas" },
  },
  food: {
    rotulo: { pt: "Food", en: "Food" },
    resumo: { pt: "Laticínios, plant-based, café, panificação, bebidas", en: "Dairy, plant-based, coffee, bakery, beverages" },
    logo: "/marca/lvrs-food.png",
    titulo: { pt: "Muito além do agronegócio.", en: "Far beyond agribusiness." },
    enfase: { pt: "agronegócio", en: "agribusiness" },
    texto: {
      pt: "A cadeia inteira do alimento: pesquisa, processamento, marca, logística e acesso a mercado. Laticínios funcionais, plant-based, panificação congelada, café especial e vinho de altitude já crescem daqui para o Brasil.",
      en: "The entire food chain: research, processing, branding, logistics and market access. Functional dairy, plant-based, frozen bakery, specialty coffee and high-altitude wine already grow from here to all of Brazil.",
    },
    mini: [
      // CAGED: saldo 2025 por grupamento (industria +322, o maior)
      { valor: "+322", legenda: { pt: "empregos na indústria em 2025, maior saldo entre os setores", en: "industry jobs in 2025, the largest net gain of any sector" } },
      { valor: "370 km", legenda: { pt: "de São Paulo, o maior mercado consumidor do país", en: "from São Paulo, Brazil's largest consumer market" } },
      { valor: { pt: "9 bi L", en: "9 bn L" }, legenda: { pt: "de leite por ano em Minas Gerais", en: "of milk a year in Minas Gerais" } },
    ],
    empresas: ["Verde Campo", "Vida Veg", "Jeito Caseiro", "Doce Fruto", "Alma Gerais"],
    talento: [
      { pt: "Engenharia de Alimentos", en: "Food Engineering" }, { pt: "Nutrição", en: "Nutrition" },
      { pt: "Química", en: "Chemistry" }, { pt: "MBA em AgroFoodTech", en: "AgroFoodTech MBA" },
    ],
    foto: dairyFactory,
    legendaFoto: { pt: "Verde Campo — indústria de laticínios", en: "Verde Campo — dairy manufacturing" },
    depoimento: {
      texto: {
        pt: "Escolhemos Lavras porque ela oferece algo raro: ciência aplicada, talento qualificado, custos competitivos e uma administração pública que entende o ritmo dos negócios.",
        en: "We chose Lavras because it offers something rare: applied science, qualified talent, competitive costs, and a public administration that understands the pace of business.",
      },
      autor: { pt: "Alvaro Gazolla, fundador da Vida Veg", en: "Alvaro Gazolla, founder of Vida Veg" },
    },
    lista: [
      { pt: "Blue Zone Lavras", en: "Blue Zone Lavras" },
      { pt: "Festival do Futuro do Alimento", en: "Future of Food Festival" },
      { pt: "Estação Férrea", en: "Railway Station" },
      { pt: "MBA em AgroFoodTech", en: "AgroFoodTech MBA" },
    ],
    listaTitulo: { pt: "Projetos do Pacto", en: "Pact projects" },
  },
  tech: {
    rotulo: { pt: "Tech", en: "Tech" },
    resumo: { pt: "Automação, software, startups, governo digital", en: "Automation, software, startups, digital government" },
    logo: "/marca/lvrs-tech.png",
    titulo: { pt: "A cidade que constrói a própria tecnologia.", en: "The city that builds its own technology." },
    enfase: { pt: "constrói", en: "builds" },
    texto: {
      pt: "Indústria de automação já instalada, startups que nascem da universidade e um governo que testa inovação com sandbox regulatório. Lavras forma quem constrói, dentro da Prefeitura e no ecossistema.",
      en: "Automation industry already in place, startups born at the university, and a government that tests innovation through a regulatory sandbox. Lavras trains the builders, inside City Hall and across the ecosystem.",
    },
    mini: [
      // Guia de investimento: Comau ~4.885 empregos
      { valor: { pt: "~4.900", en: "~4,900" }, legenda: { pt: "empregos na Comau, automação industrial", en: "jobs at Comau, industrial automation" } },
      { valor: "CERNE 1", legenda: { pt: "certificação da incubadora Inbatec/UFLA", en: "certification of the Inbatec/UFLA incubator" } },
      { valor: "Embrapii", legenda: { pt: "unidade Zetta/UFLA de pesquisa com empresas", en: "Zetta/UFLA unit for research with companies" } },
    ],
    empresas: ["Comau", "Magneti Marelli Cofap", "TRW Automotive", "Gooxxy", "GaussFleet", "Compilart", "Árvore", "Biominas"],
    talento: [
      { pt: "Ciência da Computação", en: "Computer Science" }, { pt: "Sistemas de Informação", en: "Information Systems" },
      { pt: "Engenharias", en: "Engineering" }, "InovaHub", "Área 506", "Hive", "NINE",
    ],
    foto: youxLab,
    legendaFoto: { pt: "YouX Lab — formação tecnológica de jovens", en: "YouX Lab — tech training for young people" },
    lista: [
      { pt: "Launch LVRS+ · pré-aceleração", en: "Launch LVRS+ · pre-acceleration" },
      { pt: "Lavras Lab · inovação pública", en: "Lavras Lab · public innovation" },
      { pt: "Observatório VDI · dados", en: "VDI Observatory · data" },
      { pt: "Sandbox Regulatório", en: "Regulatory Sandbox" },
      { pt: "Governo Digital", en: "Digital Government" },
    ],
    listaTitulo: { pt: "Programas e projetos", en: "Programs and projects" },
  },
  sri: {
    rotulo: { pt: "Sul de Minas", en: "Southern Minas" },
    resumo: { pt: "Seis cidades conectadas em um só sistema", en: "Six cities connected in one system" },
    logo: "/sri/sri-logo-branco.png",
    titulo: { pt: "Lavras dentro do Sul de Minas.", en: "Lavras within Southern Minas." },
    enfase: { pt: "Sul de Minas", en: "Southern Minas" },
    texto: {
      pt: "Um sistema regional de inovação com Santa Rita do Sapucaí, Itajubá, Varginha, Pouso Alegre e Poços de Caldas. Instalar-se em Lavras é ganhar acesso à região inteira: cidades médias que se complementam, sem a congestão de uma metrópole.",
      en: "A regional innovation system with Santa Rita do Sapucaí, Itajubá, Varginha, Pouso Alegre and Poços de Caldas. Setting up in Lavras means access to the whole region: complementary mid-sized cities, without the congestion of a metropolis.",
    },
    mini: [
      { valor: { pt: "2,9 mi", en: "2.9 m" }, legenda: { pt: "habitantes em 155 municípios do Sul de Minas", en: "people in 155 municipalities of Southern Minas" } },
      // IBGE/SIDRA 5938, 2023
      { valor: { pt: "62,7%", en: "62.7%" }, legenda: { pt: "do PIB da microrregião está em Lavras", en: "of the micro-region's GDP is in Lavras" } },
      { valor: "150+", legenda: { pt: "empresas de tecnologia no Vale da Eletrônica", en: "tech companies in the Electronics Valley" } },
    ],
    empresas: ["Lavras", "Santa Rita do Sapucaí", "Itajubá", "Varginha", "Pouso Alegre", "Poços de Caldas"],
    empresasTitulo: { pt: "Cidades do sistema", en: "Cities in the system" },
    talento: ["UFLA", "UNIFEI", "UNIFAL", "IFSULDEMINAS"],
    foto: aerialLavras,
    legendaFoto: { pt: "Vista aérea de Lavras", en: "Aerial view of Lavras" },
    mapa: true,
    lista: [
      { pt: "47% da população brasileira ao alcance", en: "47% of Brazil's population within reach" },
      { pt: "54% do consumo nacional", en: "54% of national consumption" },
      { pt: "60% da produção industrial do país", en: "60% of the country's industrial output" },
    ],
    listaTitulo: { pt: "No eixo BH–São Paulo, pela BR-381", en: "On the BH–São Paulo axis, via the BR-381" },
  },
};

export const NUMEROS: { valor: number; formato: "mil" | "bi" | "int" | "idh"; legenda: T; fonte: string }[] = [
  { valor: 111437, formato: "mil", legenda: { pt: "habitantes", en: "inhabitants" }, fonte: "IBGE, 2026" },
  { valor: 238068, formato: "mil", legenda: { pt: "na região de influência (14 municípios)", en: "in the area of influence (14 municipalities)" }, fonte: "IBGE" },
  { valor: 3.92, formato: "bi", legenda: { pt: "PIB municipal", en: "municipal GDP" }, fonte: "IBGE, 2023" },
  { valor: 14735, formato: "int", legenda: { pt: "universitários na graduação", en: "undergraduate students" }, fonte: "INEP, 2024" },
  { valor: 6110, formato: "int", legenda: { pt: "unidades locais de empresas", en: "local business units" }, fonte: "CEMPRE, 2024" },
  { valor: 0.782, formato: "idh", legenda: { pt: "IDHM (alto)", en: "HDI (high)" }, fonte: "IBGE" },
];

export const ONDE: { titulo: T; texto: T; foto: string; link?: { url: string; rotulo: T } }[] = [
  {
    titulo: { pt: "Distritos industriais", en: "Industrial districts" },
    texto: {
      pt: "Três novos distritos projetados, com cerca de 110 hectares às margens da BR-381. A área pode ser doada ou concedida pela lei municipal.",
      en: "Three new planned districts, about 110 hectares along the BR-381. Land can be donated or granted under municipal law.",
    },
    foto: aerialLavras,
  },
  {
    titulo: { pt: "Parque tecnológico", en: "Technology park" },
    texto: {
      pt: "Ipêtech, o Parque Científico e Tecnológico de Lavras: incubação, validação e aceleração de negócios AgroFoodTech.",
      en: "Ipêtech, the Lavras Science and Technology Park: incubation, validation and acceleration of AgroFoodTech businesses.",
    },
    foto: ipetech,
    link: { url: "https://ipetech.ufla.br/", rotulo: { pt: "Conhecer o Ipêtech", en: "Visit Ipêtech" } },
  },
  {
    titulo: { pt: "Infraestrutura", en: "Infrastructure" },
    texto: {
      pt: "Água para 99,98% da população, coleta de esgoto em 96%, energia CEMIG, fibra óptica e 4G/5G.",
      en: "Water for 99.98% of the population, 96% sewage collection, CEMIG power, fiber optics and 4G/5G.",
    },
    foto: funilDam,
  },
  {
    titulo: { pt: "Aeroporto de Lavras", en: "Lavras Airport" },
    texto: {
      pt: "Aviação executiva na própria cidade. Para voos comerciais, Varginha fica a 90 km.",
      en: "Business aviation in the city itself. For commercial flights, Varginha is 90 km away.",
    },
    foto: serraBocaina,
  },
];

export const INCENTIVOS: { nivel: T; titulo: T; texto: T }[] = [
  {
    nivel: { pt: "MUNICIPAL", en: "MUNICIPAL" },
    titulo: { pt: "Redução de IPTU, ITBI e ISS", en: "IPTU, ITBI and ISS reductions" },
    texto: { pt: "Redução temporária ou isenção para empreendimentos que se instalam ou ampliam a operação.", en: "Temporary reduction or exemption for businesses that set up or expand their operations." },
  },
  {
    nivel: { pt: "MUNICIPAL", en: "MUNICIPAL" },
    titulo: { pt: "Terreno em distrito industrial", en: "Land in an industrial district" },
    texto: { pt: "Doação ou concessão de área, com contrapartidas de infraestrutura: terraplenagem, vias e serviços.", en: "Donation or concession of land, with infrastructure support: earthworks, roads and services." },
  },
  {
    nivel: { pt: "MUNICIPAL", en: "MUNICIPAL" },
    titulo: { pt: "Licenciamento rápido", en: "Fast-track licensing" },
    texto: { pt: "Fast-track de licenças e aprovação de projetos, com um ponto único de entrada na Prefeitura.", en: "Fast-track permits and project approval, with a single point of entry at City Hall." },
  },
  {
    nivel: { pt: "INOVAÇÃO", en: "INNOVATION" },
    titulo: { pt: "Sandbox regulatório", en: "Regulatory sandbox" },
    texto: { pt: "Ambiente controlado para testar tecnologias e modelos de negócio com segurança jurídica.", en: "A controlled environment to test technologies and business models with legal certainty." },
  },
  {
    nivel: { pt: "INOVAÇÃO", en: "INNOVATION" },
    titulo: { pt: "Fundo e Conselho de Inovação", en: "Innovation Fund and Council" },
    texto: { pt: "Instrumentos do marco legal de 2025 para apoiar projetos de inovação na cidade.", en: "Instruments of the 2025 legal framework to support innovation projects in the city." },
  },
  {
    nivel: { pt: "ESTADUAL", en: "STATE" },
    titulo: { pt: "Programas da SEDE-MG e ICMS", en: "SEDE-MG programs and ICMS" },
    texto: { pt: "Regimes especiais de ICMS e apoio a projetos industriais e exportadores.", en: "Special ICMS tax regimes and support for industrial and export projects." },
  },
];

export const PASSOS: { titulo: T; texto: T }[] = [
  { titulo: { pt: "Conversa estratégica", en: "Strategic conversation" }, texto: { pt: "Entendemos o modelo de negócio, o prazo e o perfil do investimento.", en: "We learn about your business model, timeline and investment profile." } },
  { titulo: { pt: "Avaliação de território e viabilidade", en: "Site and feasibility assessment" }, texto: { pt: "Áreas disponíveis, infraestrutura, incentivos, mão de obra e enquadramento regulatório.", en: "Available sites, infrastructure, incentives, workforce and regulatory framework." } },
  { titulo: { pt: "Visita e imersão no ecossistema", en: "Visit and ecosystem immersion" }, texto: { pt: "Encontros com a Prefeitura, universidades, empresas instaladas e áreas industriais.", en: "Meetings with City Hall, universities, established companies and industrial areas." } },
  { titulo: { pt: "Estruturação e implantação", en: "Structuring and implementation" }, texto: { pt: "Apoio no licenciamento, nos incentivos, no recrutamento e na montagem da operação.", en: "Support with licensing, incentives, recruitment and setting up operations." } },
  { titulo: { pt: "Parceria de longo prazo", en: "Long-term partnership" }, texto: { pt: "Relacionamento contínuo para expansão, novos produtos e conexão com pesquisa aplicada.", en: "An ongoing relationship for expansion, new products and links to applied research." } },
];

/** Contato decidido em 05/10/2026. */
export const EMAIL_CONTATO = "superinovalavras@gmail.com";
