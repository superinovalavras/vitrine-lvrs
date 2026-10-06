import es from "./dicionario/es.json";
import fr from "./dicionario/fr.json";
import de from "./dicionario/de.json";
import zh from "./dicionario/zh.json";

/**
 * Idiomas do site (decisao de 05/10/2026): abre em portugues e troca para
 * ingles, espanhol, frances, alemao e mandarim.
 *
 * O codigo escreve so PT e EN ({ pt, en }). Os outros quatro moram em
 * dicionario/<idioma>.json, indexados pelo texto em portugues: assim nenhum
 * componente precisa conhecer seis idiomas. Texto sem traducao no dicionario
 * cai no ingles e, em desenvolvimento, e anotado em window.__faltando.
 */
export type Language = "pt" | "en" | "es" | "fr" | "de" | "zh";
type Extra = Exclude<Language, "pt" | "en">;

const DICIONARIO: Record<Extra, Record<string, string>> = { es, fr, de, zh };

export const translations = {
  about: {
    lavrasPlus: {
      pt: "Lavras+ é o framework estratégico que guia o desenvolvimento de longo prazo da cidade. Alinha políticas públicas, prioridades de investimento e parcerias em torno de inovação, sustentabilidade, desenvolvimento de talentos e qualidade de vida.",
      en: "Lavras+ is the strategic framework guiding the city's long-term development. It aligns public policies, investment priorities, and partnerships around innovation, sustainability, talent development, and quality of life.",
    },
  },
  globalContext: {
    tag: { pt: "CONTEXTO GLOBAL", en: "GLOBAL CONTEXT" },
    title: { pt: "O Futuro do Alimento: Uma Oportunidade de Transformação Global", en: "The Future of Food: A Global Transformation Opportunity" },
    description: {
      pt: "O sistema alimentar global está passando por uma das transformações mais profundas do século XXI. Impulsionado pelo crescimento populacional, pressão climática, mudanças no comportamento do consumidor e avanços tecnológicos, o alimento deixou de ser tratado apenas como commodity agrícola — tornou-se uma indústria estratégica na interseção de saúde, sustentabilidade, tecnologia e geopolítica.",
      en: "The global food system is undergoing one of the most profound transformations of the 21st century. Driven by population growth, climate pressure, changing consumer behavior and technological advances, food is no longer treated merely as an agricultural commodity — it has become a strategic industry at the intersection of health, sustainability, technology and geopolitics.",
    },
    faoStat: {
      pt: "A FAO estima que a produção global de alimentos precisará aumentar ~60% até meados do século para atender à demanda — sob condições que exigem menos terra, menos água e menor impacto ambiental.",
      en: "The FAO estimates that global food production will need to increase by approximately 60% by mid-century to meet demand — under conditions that require less land, less water and lower environmental impact.",
    },
    pressureItems: {
      pt: ["Volatilidade climática afetando rendimentos", "Escassez de água e degradação do solo", "Custos crescentes de energia e logística", "Requisitos regulatórios e ESG crescentes", "Demanda por alimentos mais saudáveis e rastreáveis"],
      en: ["Climate volatility affecting yields", "Water scarcity and soil degradation", "Rising energy and logistics costs", "Increasing regulatory and ESG requirements", "Demand for healthier, safer and traceable food"],
    },
    intelligenceItems: {
      pt: ["Agricultura baseada em ciência", "P&D em formulação e processamento de alimentos", "Integração entre academia e indústria", "Tomada de decisão baseada em dados", "Ecossistemas de inovação focados em criação de valor"],
      en: ["Science-driven agriculture", "R&D in food formulation and processing", "Integration between academia and industry", "Data-driven decision-making", "Innovation ecosystems focused on value creation"],
    },
    brazilTag: { pt: "BRASIL", en: "BRAZIL" },
    brazilTitle: { pt: "Uma Plataforma Global para o Futuro do Alimento", en: "A Global Platform for the Future of Food" },
    brazilDescription: {
      pt: "O Brasil ocupa uma posição única no sistema alimentar global. Poucos países combinam, ao mesmo tempo, escala, biodiversidade, capacidade industrial, adoção tecnológica e relevância de mercado. Na transformação global dos sistemas alimentares, o Brasil não é um fornecedor periférico — é um pilar estrutural.",
      en: "Brazil occupies a unique position in the global food system. Few countries combine, at the same time, scale, biodiversity, industrial capacity, technological adoption and market relevance. In the global transformation of food systems, Brazil is not a peripheral supplier — it is a structural pillar.",
    },
    brazilStats: [
      { value: "203M", label: { pt: "habitantes", en: "people" } },
      { value: "8.5M", unit: "km²", label: { pt: "território", en: "territory" } },
      { value: "US$2.1T", label: { pt: "PIB (5ª economia)", en: "GDP (5th economy)" } },
      { value: "110M", label: { pt: "classe média", en: "middle class" } },
    ],
    minasTag: { pt: "MINAS GERAIS", en: "MINAS GERAIS" },
    minasTitle: { pt: "Escala, Diversidade e Estabilidade", en: "Scale, Diversity and Stability" },
    minasDescription: {
      pt: "Minas Gerais é um dos estados mais estratégicos do Brasil para investimento de longo prazo, particularmente em sistemas alimentares, agronegócio, indústria e economias baseadas em conhecimento. Sua força não reside em uma única especialização, mas na integração de escala, diversidade, infraestrutura e capacidade institucional.",
      en: "Minas Gerais is one of Brazil's most strategic states for long-term investment, particularly in food systems, agribusiness, industry and knowledge-based economies. Its strength does not lie in a single specialization, but in the integration of scale, diversity, infrastructure and institutional capacity.",
    },
    minasOffers: {
      pt: ["Escala sem congestionamento", "Diversidade sem fragmentação", "Oportunidade com estabilidade"],
      en: ["Scale without congestion", "Diversity without fragmentation", "Opportunity with stability"],
    },
    sriTag: { pt: "SUL DE MINAS", en: "SOUTHERN MINAS" },
    sriTitle: { pt: "Um Sistema Regional de Inovação", en: "A Regional Innovation System" },
    sriDescription: {
      pt: "O que distingue o Sul de Minas Gerais das regiões de produção tradicionais é sua capacidade de capturar valor além das commodities. A região foca cada vez mais em rastreabilidade, sustentabilidade, certificação de qualidade e origem, produtos de marca e baseados em tecnologia.",
      en: "What distinguishes Southern Minas Gerais from traditional production regions is its ability to capture value beyond commodities. The region increasingly focuses on traceability, sustainability, quality and origin certification, branded, technology-driven products.",
    },
  },
  ecosystem: {
    title: { pt: "Quem sustenta a cidade.", en: "What keeps the city going." },
    cta: { pt: "Saiba mais", en: "Learn more" },
    tabs: {
      education: { pt: "EDUCAÇÃO", en: "EDUCATION" },
      companies: { pt: "EMPRESAS", en: "COMPANIES" },
      innovation: { pt: "INOVAÇÃO", en: "INNOVATION" },
      infrastructure: { pt: "INFRAESTRUTURA", en: "INFRASTRUCTURE" },
      quality: { pt: "QUALIDADE DE VIDA", en: "QUALITY OF LIFE" },
    },
    content: {
      education: {
        description: {
          pt: "A UFLA é o principal ativo estratégico de Lavras — classificada entre as melhores universidades do Brasil e da América Latina com excelência internacional em Agronomia, Ciências Agrícolas, Engenharia de Alimentos e Biotecnologia.",
          en: "UFLA is Lavras' main strategic asset — ranked among the top universities in Brazil and Latin America with international excellence in Agronomy, Agricultural Sciences, Food Engineering and Biotechnology.",
        },
        details: {
          pt: "A UFLA transforma Lavras em uma economia baseada em conhecimento, reduzindo custos de recrutamento, aumentando a produtividade e possibilitando inovação contínua. Formação anual de centenas de profissionais altamente qualificados.",
          en: "UFLA transforms Lavras into a knowledge-based economy, reducing recruitment costs, increasing productivity, and enabling continuous innovation. Annual graduation of hundreds of highly qualified professionals.",
        },
        items: {
          pt: ["UFLA — Universidade Federal", "FADMINAS — Universidade Adventista", "Centros de Pesquisa Aplicada", "MBA AgroFoodTech", "YouX Lab — Capacitação Tech Jovem", "Escritório de Transferência de Tecnologia"],
          en: ["UFLA — Federal University", "FADMINAS — Adventist University", "Applied Research Centers", "AgroFoodTech MBA Program", "YouX Lab — Youth Tech Training", "Technology Transfer Office"],
        },
      },
      companies: {
        description: {
          pt: "Lavras apresenta uma economia diversificada e resiliente, com forte ênfase em atividades baseadas em conhecimento. Composição do PIB (2021): Comércio & Serviços 76,43%, Indústria 17,99%, Agropecuária 5,58%.",
          en: "Lavras presents a diversified and resilient economy, with strong emphasis on knowledge-based activities. GDP composition (2021): Commerce & Services 76.43%, Industry 17.99%, Agriculture 5.58%.",
        },
        details: {
          pt: "Três novos distritos industriais em desenvolvimento com aproximadamente 110 hectares disponíveis ao longo da BR-381. Projetos em fase de licenciamento e atração ativa de investidores.",
          en: "Three new industrial districts under development with approximately 110 hectares available along BR-381. Projects in licensing phase and active investor attraction.",
        },
        items: {
          pt: ["Comau do Brasil — ~4.885 empregos", "Magneti Marelli Cofap — ~1.900 empregos", "TRW Automotive — ~738 empregos", "Jeito Caseiro — Panificação congelada", "Verde Campo — Laticínios saudáveis", "Vida Veg — Alimentos plant-based", "Café Doce Fruto — Café especial"],
          en: ["Comau do Brasil — ~4,885 jobs", "Magneti Marelli Cofap — ~1,900 jobs", "TRW Automotive — ~738 jobs", "Jeito Caseiro — Frozen bakery products", "Verde Campo — Healthy dairy products", "Vida Veg — Plant-based foods", "Café Doce Fruto — Specialty coffee"],
        },
      },
      innovation: {
        description: {
          pt: "Lavras construiu silenciosamente um cenário de inovação de alta qualidade, fortemente conectado ao alimento, agritech, biotecnologia, logística, sustentabilidade e tecnologias aplicadas. Em vez de volume, a cidade se destaca pela profundidade, embasamento científico e tração real no mercado.",
          en: "Lavras has quietly built a high-quality innovation scene, strongly connected to food, agritech, biotechnology, logistics, sustainability and applied technologies. Rather than volume, the city stands out for depth, scientific grounding and real-market traction.",
        },
        details: {
          pt: "O ecossistema favorece soluções escaláveis, orientadas a B2B, com forte alinhamento a ESG, produtividade e eficiência — altamente atrativo para empresas internacionais e investidores estratégicos.",
          en: "The ecosystem favors scalable, B2B-oriented solutions with strong alignment to ESG, productivity and efficiency — highly attractive to international companies and strategic investors.",
        },
        items: {
          pt: ["Hub de Inovação Ipêtech", "Cluster Agro-Food-Tech", "Sandbox Regulatório", "Biomip — Soluções biológicas", "AgScan — Escaneamento agrícola", "Green Solutions — Sustentabilidade", "Biominas", "CaussFleet", "Compilart Tecnologia"],
          en: ["Ipêtech Innovation Hub", "Agro-Food-Tech Cluster", "Regulatory Sandbox", "Biomip — Biological solutions", "AgScan — Agricultural scanning", "Green Solutions — Sustainability", "Biominas", "CaussFleet", "Compilart Tecnologia"],
        },
      },
      infrastructure: {
        description: {
          pt: "Abastecimento de água cobrindo 99,98% da população, coleta de esgoto em 96,19%, tratamento de esgoto em 74,56%, telecomunicações com fibra óptica + 4G/5G. Esta infraestrutura garante confiabilidade operacional.",
          en: "Water supply covering 99.98% of population, sewage collection at 96.19%, sewage treatment at 74.56%, fiber optic + 4G/5G telecommunications. This infrastructure ensures operational reliability.",
        },
        details: {
          pt: "Entroncamento ferroviário da rede MRS Logística com potencial para operações intermodais. Aeroporto de Lavras para aviação executiva, além de proximidade com grandes aeroportos internacionais. Perdas na distribuição de água: 28,1% (abaixo da média nacional).",
          en: "Railway junction of MRS Logística network with potential for intermodal operations. Lavras Airport for executive aviation, plus proximity to major international airports. Water distribution losses: 28.1% (below national average).",
        },
        items: {
          pt: ["Abastecimento de água: 99,98%", "Coleta de esgoto: 96,19%", "Tratamento: 74,56%", "Energia: CEMIG", "Telecom: Fibra + 4G/5G", "Ferrovia: MRS Logística", "Aeroporto: SBSL + acesso regional"],
          en: ["Water supply: 99.98%", "Sewage collection: 96.19%", "Treatment: 74.56%", "Energy: CEMIG", "Telecom: Fiber + 4G/5G", "Railway: MRS Logística", "Airport: SBSL + regional access"],
        },
      },
      quality: {
        description: {
          pt: "Lavras não compete com megacidades. Em vez disso, oferece o que grandes cidades cada vez mais lutam para proporcionar: foco, colaboração, eficiência e alta qualidade de vida.",
          en: "Lavras does not compete with megacities. Instead it offers what large cities increasingly struggle to provide: focus, collaboration, efficiency and high quality of life.",
        },
        details: {
          pt: "A qualidade de vida, segurança e sistema educacional da cidade aumentam a retenção de talentos, reduzindo a rotatividade e os custos operacionais de longo prazo para empresas que escolhem operar a partir de Lavras.",
          en: "The city's quality of life, safety and education system enhance talent retention, reducing turnover and long-term operational costs for companies choosing to operate from Lavras.",
        },
        items: {
          pt: ["Altos padrões de segurança", "Excelente sistema educacional", "Casa da Cultura de Lavras", "Praça Dr. Augusto Silva", "Parques naturais & Serra da Bocaina", "Vinícola Alma Gerais", "Cena gastronômica vibrante", "Igreja do Rosário"],
          en: ["High safety standards", "Excellent education system", "Lavras House of Culture", "Dr. Augusto Silva Square", "Natural parks & Serra da Bocaina", "Alma Gerais Winery", "Vibrant gastronomy scene", "Rosário Church"],
        },
      },
    },
  },
  footer: {
    vision: { pt: "Governo de Lavras — Visão 2040", en: "Governo de Lavras — Vision 2040" },
    links: {
      pt: ["Linha do tempo", "Contexto", "Ecossistema", "Galeria", "Invista em Lavras", "Iniciativas", "Contato"],
      en: ["Timeline", "Context", "Ecosystem", "Gallery", "Invest in Lavras", "Initiatives", "Contact"],
    },
    // As quatro primeiras sao secoes desta pagina (/pacto); as outras, paginas do site.
    hrefs: ["#milestones", "#context", "#ecosystem", "#gallery", "/", "/iniciativas", "/#contato"],
  },
} as const;

export function t(obj: { pt: string; en: string }, lang: Language): string {
  if (lang === "pt" || lang === "en") return obj[lang];
  const v = DICIONARIO[lang][obj.pt];
  if (v === undefined && import.meta.env.DEV) {
    const w = window as unknown as { __faltando?: Set<string> };
    (w.__faltando ??= new Set()).add(obj.pt);
  }
  return v ?? obj.en;
}

/** O mesmo que t(), para listas paralelas ({ pt: [...], en: [...] }). */
export function tLista(obj: { pt: readonly string[]; en: readonly string[] }, lang: Language): string[] {
  return obj.pt.map((p, i) => t({ pt: p, en: obj.en[i] }, lang));
}
