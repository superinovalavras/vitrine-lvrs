import type { VerticalId } from "@/data/verticais";

/**
 * Linha do tempo do ecossistema, 1873–2025.
 *
 * Transcrita dos slides "Milestones" do Webinar RCD (set/2026) — no arquivo ela
 * e uma imagem unica, entao o texto foi lido do slide, nao extraido. As imagens
 * em /public/milestones/ sao recortes desses slides: provisorias, o Ramon vai
 * trocar por versoes melhores (mesmo nome de arquivo, sem mexer aqui).
 *
 * `aba` pinta o marco com a cor da vertical a que ele pertence:
 * agro = historia agricola · food = cafe, leite, criatividade e gastronomia ·
 * tech = startups, hubs, hackathons · sri = redes e instituicoes do ecossistema ·
 * pacto = educacao e politica publica.
 *
 * Nao entram nomes de servidores publicos (Orientacao 001/2026/CTTC). Alysson
 * Paulinelli e Alfredo Scheid Lopes ficam: sao figuras historicas, citadas pela
 * obra, nao servidores atuais.
 */

export interface Marco {
  ano: string;
  texto: { pt: string; en: string };
  aba: VerticalId;
  img?: string;
  destaque?: boolean;
}

export interface Era {
  id: string;
  rotulo: { pt: string; en: string };
  de: number;
  ate: number;
}

export const ERAS: Era[] = [
  { id: "raizes", rotulo: { pt: "As raízes", en: "The roots" }, de: 1873, ate: 1969 },
  { id: "cerrado", rotulo: { pt: "A revolução do Cerrado", en: "The Cerrado revolution" }, de: 1970, ate: 2004 },
  { id: "inovacao", rotulo: { pt: "Nasce o ecossistema", en: "The ecosystem is born" }, de: 2005, ate: 2017 },
  { id: "rede", rotulo: { pt: "A rede se forma", en: "The network takes shape" }, de: 2018, ate: 2022 },
  { id: "pacto", rotulo: { pt: "Rumo ao Pacto", en: "Towards the Pact" }, de: 2023, ate: 2025 },
];

const m = (ano: string, aba: VerticalId, pt: string, en: string, img?: string, destaque?: boolean): Marco => ({
  ano,
  aba,
  texto: { pt, en },
  img: img ? `/milestones/${img}.webp` : undefined,
  destaque,
});

export const MARCOS: Marco[] = [
  m("1873", "pacto", "Inauguração do Instituto Gammon", "Instituto Gammon opens", "gammon"),
  m("1908", "agro", "Fundação da Escola Agrícola de Lavras", "Lavras Agricultural School is founded", "escola-agricola", true),
  m("1921", "agro", "1ª Exposição Nacional do Milho", "1st National Corn Exhibition", "expo-milho"),
  m("1922", "agro", "1ª Exposição Agropecuária de Minas Gerais", "1st Minas Gerais Agricultural Exhibition", "expo-agro"),
  m("1938", "agro", "Nasce a Escola Superior de Agricultura de Lavras — ESAL", "ESAL, the Lavras Higher School of Agriculture, is created", "esal"),
  m("1959", "agro", "Alysson Paulinelli se forma e vira professor da ESAL", "Alysson Paulinelli graduates and becomes an ESAL professor", "paulinelli"),
  m("1961", "agro", "Alfredo Scheid Lopes se forma e vira professor da ESAL", "Alfredo Scheid Lopes graduates and becomes an ESAL professor", "scheid"),
  m("1963", "agro", "Federalização da ESAL", "ESAL becomes a federal school", "federalizacao"),
  m("1969", "pacto", "Inauguração da Unilavras", "Unilavras opens", "unilavras"),
  m("1971", "agro", "Paulinelli assume a Secretaria de Agricultura de MG e cria incentivos que fazem do estado o maior produtor de café do Brasil", "Paulinelli heads the Minas Gerais Agriculture Department and creates incentives that make the state Brazil's largest coffee producer", "cafe-1971"),
  m("1975", "agro", "Uma das maiores conquistas agrícolas do século 20: a ciência da ESAL torna fértil o solo do Cerrado", "One of the 20th century's great agricultural feats: ESAL science makes the Cerrado soil fertile", "cerrado", true),
  m("1981", "pacto", "Inauguração da Fadminas", "Fadminas opens", "fadminas"),
  m("1994", "pacto", "A ESAL vira Universidade Federal de Lavras — UFLA", "ESAL becomes the Federal University of Lavras — UFLA", "ufla", true),
  m("2004", "agro", "Laboratório de Ciência de Dados em Manejo Florestal — LEMAF/UFLA", "Forest Management Data Science Lab — LEMAF/UFLA", "lemaf"),
  m("2005", "tech", "Projeto do Parque Científico e Tecnológico de Lavras", "Lavras Science and Technology Park project", "parque"),
  m("2007", "tech", "Núcleo de Inovação Tecnológica da UFLA — NINTEC", "UFLA Technology Innovation Office — NINTEC", "nintec"),
  m("2008", "tech", "Programa de Incentivo à Inovação — PII", "Innovation Incentive Program — PII", "pii"),
  m("2009", "tech", "Incubadora de Empresas da UFLA — Inbatec", "UFLA Business Incubator — Inbatec", "inbatec"),
  m("2011", "pacto", "Sistema Municipal de Ciência, Tecnologia, Inovação, Empreendedorismo e Ensino Superior", "Municipal System for Science, Technology, Innovation, Entrepreneurship and Higher Education", "sistema-2011"),
  m("2014", "agro", "Agência de Inovação do Café — InovaCafé", "Coffee Innovation Agency — InovaCafé", "inovacafe"),
  m("2014", "tech", "1º Startup Weekend Lavras", "1st Startup Weekend Lavras", "sw1"),
  m("2014", "pacto", "Nasce o ecossistema de inovação e empreendedorismo de Lavras: o Vale dos Ipês", "Lavras' innovation and entrepreneurship ecosystem is born: Vale dos Ipês", "vale-ipes", true),
  m("2016", "agro", "Cadastro Ambiental Rural — CAR, em parceria com a UFLA", "Rural Environmental Registry — CAR, in partnership with UFLA", "car"),
  m("2016", "tech", "Empreende UFLA e Programa Startup CIM", "Empreende UFLA and the Startup CIM Program", "empreende"),
  m("2017", "sri", "Agentes de Inovação do Minas Digital", "Minas Digital innovation agents", "minas-digital"),
  m("2017", "tech", "2º Startup Weekend Lavras", "2nd Startup Weekend Lavras", "sw2"),
  m("2017", "tech", "Primeira pré-aceleração do Vale dos Ipês — Lemonade Ultra", "First Vale dos Ipês pre-acceleration — Lemonade Ultra", "lemonade"),
  m("2018", "tech", "3º Startup Weekend Lavras", "3rd Startup Weekend Lavras", "sw3"),
  m("2018", "tech", "TEDxUFLA", "TEDxUFLA", "tedxufla"),
  m("2018", "tech", "Comunidade de desenvolvedores — GDG Lavras", "Developer community — GDG Lavras", "gdg"),
  m("2018", "sri", "Comunidade Mulheres Empreendedoras de Lavras — MEL", "Lavras Women Entrepreneurs community — MEL", "mel"),
  m("2019", "tech", "Hub de Startups da UFLA — InovaHub", "UFLA Startup Hub — InovaHub", "inovahub"),
  m("2019", "sri", "Primeiro batch de pré-aceleração do Agita Sebrae", "First Agita Sebrae pre-acceleration batch", "agita"),
  m("2019", "food", "Avança Café e Coffeethon: o maior hackathon do café do mundo", "Avança Café and Coffeethon: the world's largest coffee hackathon", "avanca-cafe", true),
  m("2019", "tech", "Primeiro hackathon corporativo do Vale dos Ipês — Cocatrel", "First Vale dos Ipês corporate hackathon — Cocatrel", "cocatrel"),
  m("2019", "tech", "1º Desafio Startup UFLA", "1st UFLA Startup Challenge", "desafio-ufla"),
  m("2020", "pacto", "Aprovação da Política de Inovação da UFLA", "UFLA Innovation Policy approved", "politica-ufla"),
  m("2020", "sri", "Planejamento do ecossistema de inovação de MG — Lavras, com a CERTI", "Minas Gerais innovation ecosystem planning — Lavras, with CERTI", "certi"),
  m("2020", "tech", "Inauguração da Galax/Fundecc", "Galax/Fundecc opens", "galax"),
  m("2020", "tech", "1º TEDxLavras", "1st TEDxLavras", "tedxlavras"),
  m("2021", "tech", "Agência de Inovação Zetta", "Zetta Innovation Agency", "zetta"),
  m("2021", "tech", "Unidade Embrapii Zetta/UFLA", "Embrapii Zetta/UFLA unit", "embrapii"),
  m("2021", "tech", "Hub de Tecnologia NET.USEB — Fadminas", "NET.USEB Technology Hub — Fadminas", "netuseb"),
  m("2021", "sri", "Agente Local de Inovação do Sebrae", "Sebrae Local Innovation Agent", "sebrae-eli"),
  m("2021", "tech", "Hub de Inovação NINE — Fadminas", "NINE Innovation Hub — Fadminas", "nine"),
  m("2021", "tech", "2º hackathon corporativo — Ipê Challenge", "2nd corporate hackathon — Ipê Challenge", "ipe-challenge"),
  m("2022", "sri", "Agência Rhizoma: governança do Vale dos Ipês", "Rhizoma Agency: Vale dos Ipês governance", "rhizoma", true),
  m("2022", "tech", "1ª maratona de ideação para o Ensino Médio", "1st ideation marathon for high-school students", "senac-1"),
  m("2022", "tech", "Hub de Inovação da Unilavras — Área 506", "Unilavras Innovation Hub — Área 506", "area506"),
  m("2022", "tech", "Hub de Inovação da Fagammon — Hive", "Fagammon Innovation Hub — Hive", "hive"),
  m("2022", "sri", "Comunidade de Comércio, Indústria e Serviço — Vertics", "Commerce, Industry and Services community — Vertics", "vertics"),
  m("2022", "food", "1º Dia Mundial da Criatividade — WCD Lavras", "1st World Creativity Day — WCD Lavras", "wcd-1"),
  m("2022", "food", "Pré-aceleração para a cadeia do leite — InovaLácteos", "Dairy-chain pre-acceleration — InovaLácteos", "inovalacteos"),
  m("2022", "tech", "Inbatec recebe a certificação CERNE 1", "Inbatec earns CERNE 1 certification", "cerne"),
  m("2023", "tech", "Programa Vuei: agentes de inovação na UFLA e na Fagammon", "Vuei Program: innovation agents at UFLA and Fagammon", "vuei"),
  m("2023", "sri", "Inauguração da Mansão Jardim", "Mansão Jardim opens", "mansao-jardim"),
  m("2023", "sri", "Confraria de Negócios de Lavras", "Lavras Business Guild", "confraria"),
  m("2023", "tech", "Programa Decola: as 4 instituições de ensino superior juntas", "Decola Program: the 4 higher-education institutions together", "decola"),
  m("2023", "pacto", "IF Sul de Minas — Campus Lavras", "IF Sul de Minas — Lavras Campus", "ifsuldeminas"),
  m("2023", "sri", "Comunidade de networking BNI PRO", "BNI PRO networking community", "bni"),
  m("2023", "tech", "2ª maratona de ideação para o Ensino Médio", "2nd ideation marathon for high-school students", "senac-2"),
  m("2023", "tech", "3º hackathon corporativo — Unilavras Sinergia", "3rd corporate hackathon — Unilavras Sinergia", "hackathon-3"),
  m("2023", "pacto", "1ª Semana da Inovação de Lavras", "1st Lavras Innovation Week", "semana-inovacao"),
  m("2023", "food", "2º Dia Mundial da Criatividade — WCD Lavras", "2nd World Creativity Day — WCD Lavras", "wcd-2"),
  m("2023", "sri", "1º Sesc Impacta", "1st Sesc Impacta", "sesc-impacta"),
  m("2023", "tech", "4º hackathon corporativo — Unilavras Clínquer", "4th corporate hackathon — Unilavras Clínquer", "hackathon-4"),
  m("2023", "sri", "Rota da Inovação do Vale dos Ipês", "Vale dos Ipês Innovation Route", "rota-inovacao"),
  m("2024", "pacto", "Sistema Municipal de CT&I atualizado, Prêmio de Inovação de Lavras e novo Conselho de Inovação", "Municipal ST&I System updated, Lavras Innovation Award and a new Innovation Council", "sistema-2024", true),
  m("2024", "tech", "2º TEDxLavras", "2nd TEDxLavras", "tedxlavras-2"),
  m("2024", "tech", "3ª maratona de ideação para o Ensino Médio", "3rd ideation marathon for high-school students", "senac-3"),
  m("2024", "tech", "1ª Fagammon Week Innovation", "1st Fagammon Week Innovation", "fagammon-week"),
  m("2024", "food", "3º Dia Mundial da Criatividade — WCD Lavras", "3rd World Creativity Day — WCD Lavras", "wcd-3"),
  m("2024", "food", "2º Desafio Startup UFLA, com tema leite", "2nd UFLA Startup Challenge, dairy-themed", "desafio-leite"),
  m("2024", "tech", "Estúdio X — Fagammon", "Estúdio X — Fagammon", "estudio-x"),
  m("2024", "pacto", "1º Prêmio Alma Educação", "1st Alma Educação Award", "alma"),
  m("2025", "pacto", "Cidade Inovadora: radar da inovação, visão de futuro, governança e lançamento do Pacto pela Inovação", "Innovative City: innovation radar, future vision, governance and the launch of the Innovation Pact", "cidade-inovadora", true),
  m("2025", "sri", "Consolidação do Sistema Regional de Inovação do Sul de Minas", "Southern Minas Regional Innovation System consolidated", "sri-sul-minas", true),
  m("2025", "pacto", "Marco legal do ecossistema: formação empreendedora, sandbox, incentivos fiscais, Conselho e Fundo de Inovação", "Ecosystem legal framework: entrepreneurship training, sandbox, tax incentives, Innovation Council and Fund", "regulamentacao"),
  m("2025", "pacto", "Criação da Superintendência de Inovação na Secretaria de Desenvolvimento Econômico", "Innovation Office created within the Economic Development Department", "superinova"),
];
