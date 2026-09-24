import { URL_GESTAO, type VerticalId } from "@/data/verticais";

/**
 * Os 12 Projetos Prioritarios do Pacto, como a vitrine os apresenta.
 *
 * A vitrine so RESUME: o que e o projeto e por que existe. Status, percentual,
 * metas e KPIs vivem no painel de gestao e mudam toda semana — nada disso entra
 * aqui, senao a vitrine envelhece e contradiz o painel.
 *
 * Nomes conforme o "Resumo_Site_Pacto_Lavras" (24/09/2026). Resumo em pt = o
 * "O que e este projeto?" do painel (24/09/2026; o do Hub encurtado). `aba` e a UNICA aba em que o card aparece (decisao de
 * 24/09/2026: um projeto, uma aba). `aba: null` = so na lista geral do Pacto.
 *
 * `painel` e o id da pagina do projeto em gestaolvrs.govup.io/projeto/<id>.
 * Se o painel recriar um projeto, o id muda e o link quebra: conferir aqui.
 */

export interface Projeto {
  numero: number;
  nome: string;
  subtitulo: { pt: string; en: string };
  resumo: { pt: string; en: string };
  aba: Exclude<VerticalId, "pacto"> | null;
  painel: string;
}

export const urlProjeto = (p: Projeto) => `${URL_GESTAO}projeto/${p.painel}`;

export const PROJETOS: Projeto[] = [
  {
    numero: 1,
    nome: "Cluster Agro-Food-Tech",
    subtitulo: { pt: "Trilha Empreendedora", en: "Entrepreneurial Track" },
    resumo: {
      pt: "Criação de um cluster estratégico para consolidar Lavras como polo nacional de AgroFoodTech, integrando programas municipais de inovação para transformar conhecimento acadêmico em soluções de mercado.",
      en: "A strategic cluster to establish Lavras as a national AgroFoodTech hub, bringing the city's innovation programs together to turn academic knowledge into market solutions.",
    },
    aba: "tech",
    painel: "093b34c7-784a-4ad5-b387-275471084893",
  },
  {
    numero: 2,
    nome: "Hub de Inovação e sua Gestão",
    subtitulo: { pt: "Onde empresas, talentos e governo se encontram", en: "Where companies, talent and government meet" },
    resumo: {
      pt: "Um dos principais ambientes articuladores do ecossistema de inovação de Lavras e do LVRS+: um espaço neutro e colaborativo que conecta empresas, startups, academia e governo para o desenvolvimento tecnológico e econômico regional.",
      en: "One of the main connecting spaces of Lavras' innovation ecosystem and LVRS+: a neutral, collaborative space linking companies, startups, academia and government for regional technological and economic development.",
    },
    aba: "tech",
    painel: "21c18d10-44f8-4f74-958c-70200e23837e",
  },
  {
    numero: 3,
    nome: "Blue Zone Lavras",
    subtitulo: { pt: "Bairro-modelo de longevidade e vida saudável", en: "Model neighborhood for longevity and healthy living" },
    resumo: {
      pt: "Criação do primeiro bairro-modelo de longevidade e inovação social do município, posicionando a cidade como referência nacional em saúde, bem-estar e soluções de impacto positivo.",
      en: "The city's first model neighborhood for longevity and social innovation, positioning Lavras as a national reference in health, well-being and positive-impact solutions.",
    },
    aba: "food",
    painel: "4cc3ca2f-5cb7-46db-a40d-6fdcffd6b377",
  },
  {
    numero: 4,
    nome: "Cinturão do Alimento/Verde",
    subtitulo: { pt: "Diagnóstico do potencial produtivo do território", en: "Mapping the territory's productive potential" },
    resumo: {
      pt: "Estruturação de um cinturão produtivo de alimentos de alto valor agregado em Lavras, baseado num diagnóstico de inteligência territorial para conectar produtores, tecnologia e mercados.",
      en: "A productive belt of high-value food in Lavras, built on a territorial intelligence diagnosis that connects farmers, technology and markets.",
    },
    aba: "agro",
    painel: "6ced0ff5-cd1e-4961-b5ba-53f772da3e88",
  },
  {
    numero: 5,
    nome: "Festival do Futuro do Alimento",
    subtitulo: { pt: "Summit gastronômico e tecnológico", en: "Gastronomy and technology summit" },
    resumo: {
      pt: "Criação de um festival anual que posiciona Lavras como palco nacional do tema, integrando inovação, ciência e gastronomia para discutir e vivenciar o Futuro do Alimento.",
      en: "An annual festival that makes Lavras the national stage for the theme, bringing together innovation, science and gastronomy to discuss and experience the Future of Food.",
    },
    aba: "food",
    painel: "9ffd7940-a500-4320-be6b-df80f5ccd5dd",
  },
  {
    numero: 6,
    nome: "Circuito Territorial Vale dos Ipês",
    subtitulo: { pt: "Rota de experiências", en: "Experience route" },
    resumo: {
      pt: "Estruturar e operar o turismo de Lavras com plataforma digital, rede de anfitriões e rotas temáticas de baixo impacto, posicionando a cidade como destino de experiências autênticas e bem-estar.",
      en: "Structuring and running tourism in Lavras with a digital platform, a host network and low-impact themed routes, positioning the city as a destination for authentic experiences and well-being.",
    },
    aba: null,
    painel: "c6057e22-772e-433a-8b22-f47179012c59",
  },
  {
    numero: 7,
    nome: "Usina de Compostagem",
    subtitulo: { pt: "Reciclagem de alimentos e economia circular", en: "Food recycling and circular economy" },
    resumo: {
      pt: "Inserir Lavras na economia circular, transformando resíduos orgânicos em insumos de alto valor para agricultura e projetos socioambientais.",
      en: "Bringing Lavras into the circular economy by turning organic waste into high-value inputs for agriculture and social-environmental projects.",
    },
    aba: "agro",
    painel: "cfd14432-3781-4fa7-91d5-be68c233b721",
  },
  {
    numero: 8,
    nome: "Estação Férrea",
    subtitulo: { pt: "Hub criativo, enogastronômico e de inovação alimentar", en: "Creative, food & wine and food innovation hub" },
    resumo: {
      pt: "Transformação da antiga Estação Férrea de Lavras em hub imersivo que conecta patrimônio histórico, inovação agroalimentar, turismo e economia criativa, posicionando a cidade como vitrine nacional do setor.",
      en: "Turning Lavras' old railway station into an immersive hub connecting heritage, agri-food innovation, tourism and the creative economy, making the city a national showcase for the sector.",
    },
    aba: "food",
    painel: "ac425e9b-4802-4195-bf52-5d950192a154",
  },
  {
    numero: 9,
    nome: "Governo Digital",
    subtitulo: { pt: "Tecnologia a serviço das pessoas", en: "Technology serving people" },
    resumo: {
      pt: "Promover a transformação digital da Prefeitura de forma inclusiva e humanizada, integrando tecnologia para simplificar processos e melhorar a experiência de servidores e cidadãos.",
      en: "An inclusive, human-centered digital transformation of City Hall, using technology to simplify processes and improve the experience of public employees and citizens.",
    },
    aba: "tech",
    painel: "34d02c73-670c-4640-8e89-b80a3b503197",
  },
  {
    numero: 10,
    nome: "Sandbox Regulatório",
    subtitulo: { pt: "Laboratório vivo do futuro do alimento", en: "Living lab for the future of food" },
    resumo: {
      pt: "Criação de um Programa Sandbox para testar, com segurança jurídica e científica, tecnologias e produtos alimentícios inovadores, acelerando a transição de Lavras para a Capital do Futuro do Alimento.",
      en: "A Sandbox Program to test innovative food technologies and products with legal and scientific certainty, accelerating Lavras' transition into the Capital of the Future of Food.",
    },
    aba: "tech",
    painel: "57689910-ead4-451b-8a0c-39cbb46f2418",
  },
  {
    numero: 11,
    nome: "MBA em AgroFoodTech",
    subtitulo: { pt: "Formação avançada para a nova economia do alimento", en: "Advanced training for the new food economy" },
    resumo: {
      pt: "Criação de um MBA pioneiro em AgroFoodTech, reunindo as quatro principais instituições de ensino de Lavras para formar líderes da revolução do Futuro do Alimento.",
      en: "A pioneering AgroFoodTech MBA bringing together Lavras' four main higher-education institutions to train the leaders of the Future of Food revolution.",
    },
    aba: "food",
    painel: "36b29c14-c4ad-4d92-a12a-d5bc74e9a4ec",
  },
  {
    numero: 12,
    nome: "YouX Lab",
    subtitulo: { pt: "Talentos digitais e inclusão produtiva", en: "Digital talent and productive inclusion" },
    resumo: {
      pt: "O YouX Lab capacita jovens para o primeiro emprego em tecnologia, integrando formação técnica, desenvolvimento socioemocional e conexão com o mercado, promovendo inclusão produtiva em Lavras.",
      en: "YouX Lab prepares young people for their first tech job, combining technical training, socio-emotional development and a bridge to the market, promoting productive inclusion in Lavras.",
    },
    aba: "tech",
    painel: "32c97229-01b3-4366-9529-1728d1be3832",
  },
];
