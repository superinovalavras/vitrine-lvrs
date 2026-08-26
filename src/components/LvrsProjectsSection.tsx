import { useState } from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import {
  Monitor, Scale, BookOpen, Code, Recycle, Train,
  MapPin, Heart, Globe, Map, Leaf, Building2,
} from "lucide-react";

interface Project {
  id: number;
  title: string;
  subtitle: { pt: string; en: string };
  description: { pt: string; en: string };
  category: string;
  categoryEn: string;
  pillar: { pt: string; en: string };
  icon: React.ElementType;
  results: { pt: string[]; en: string[] };
}

const projects: Project[] = [
  {
    id: 1, title: "Governo Digital", icon: Monitor,
    subtitle: { pt: "Tecnologia Humanizada", en: "Humanized Technology" },
    description: { pt: "Transformação digital da Prefeitura de forma inclusiva e humanizada.", en: "Inclusive and humanized digital transformation of the City Hall." },
    category: "Cidade Criativa", categoryEn: "Creative City",
    pillar: { pt: "Gestão Pública", en: "Public Management" },
    results: { pt: ["Portal do Cidadão", "Assistente Inteligente", "Dados abertos"], en: ["Citizen Portal", "Intelligent Assistant", "Open data"] },
  },
  {
    id: 2, title: "Sandbox Regulatório", icon: Scale,
    subtitle: { pt: "Laboratório Vivo", en: "Living Lab" },
    description: { pt: "Programa para testar tecnologias e produtos alimentícios inovadores com segurança jurídica.", en: "Program to test innovative food technologies and products with legal certainty." },
    category: "Cidade AgroFoodTech", categoryEn: "AgroFoodTech City",
    pillar: { pt: "Gestão Pública", en: "Public Management" },
    results: { pt: ["20 projetos pioneiros", "Comitê de ética", "Painel público de dados"], en: ["20 pioneer projects", "Ethics committee", "Public data dashboard"] },
  },
  {
    id: 3, title: "MBA em AgroFoodTech", icon: BookOpen,
    subtitle: { pt: "Formação Avançada", en: "Advanced Training" },
    description: { pt: "MBA pioneiro reunindo as quatro principais instituições de ensino de Lavras.", en: "Pioneering MBA bringing together Lavras' four main educational institutions." },
    category: "Cidade AgroFoodTech", categoryEn: "AgroFoodTech City",
    pillar: { pt: "Geração de Talentos", en: "Talent Generation" },
    results: { pt: ["Currículo integrado", "Gestão acadêmica conjunta", "Metodologias ativas"], en: ["Integrated curriculum", "Joint academic management", "Active methodologies"] },
  },
  {
    id: 4, title: "YouX Lab", icon: Code,
    subtitle: { pt: "Talentos Digitais", en: "Digital Talents" },
    description: { pt: "Capacita jovens da rede pública para o primeiro emprego em tecnologia.", en: "Trains public school youth for their first tech job." },
    category: "Cidade Criativa", categoryEn: "Creative City",
    pillar: { pt: "Geração de Talentos", en: "Talent Generation" },
    results: { pt: ["890h de capacitação", "65% inseridos no mercado", "100% buscando ensino superior"], en: ["890h of training", "65% placed in market", "100% seeking higher education"] },
  },
  {
    id: 5, title: "Usina de Compostagem", icon: Recycle,
    subtitle: { pt: "Economia Circular", en: "Circular Economy" },
    description: { pt: "Insere Lavras na economia circular, transformando resíduos orgânicos em insumos de alto valor.", en: "Inserts Lavras into the circular economy, turning organic waste into high-value inputs." },
    category: "Cidade Sustentável", categoryEn: "Sustainable City",
    pillar: { pt: "Transformação Urbana", en: "Urban Transformation" },
    results: { pt: ["Operação piloto", "Coleta seletiva", "Composto certificado"], en: ["Pilot operation", "Selective collection", "Certified compost"] },
  },
  {
    id: 6, title: "Estação Férrea", icon: Train,
    subtitle: { pt: "Hub Criativo Enogastronômico", en: "Creative Eno-gastronomic Hub" },
    description: { pt: "Transformação da antiga Estação Férrea em hub de inovação agroalimentar e turismo.", en: "Transformation of the old Railway Station into an agri-food innovation and tourism hub." },
    category: "Cidade Criativa", categoryEn: "Creative City",
    pillar: { pt: "Transformação Urbana", en: "Urban Transformation" },
    results: { pt: ["Projeto arquitetônico completo", "3 eventos-piloto", "Governança definida"], en: ["Complete architectural project", "3 pilot events", "Governance defined"] },
  },
  {
    id: 7, title: "Cinturão do Futuro do Alimento", icon: MapPin,
    subtitle: { pt: "Diagnóstico Técnico", en: "Technical Diagnostic" },
    description: { pt: "Estruturação de um cinturão produtivo de alimentos de alto valor agregado.", en: "Structuring a productive belt of high value-added foods." },
    category: "Cidade AgroFoodTech", categoryEn: "AgroFoodTech City",
    pillar: { pt: "Qualidade de Vida", en: "Quality of Life" },
    results: { pt: ["+100 propriedades mapeadas", "Atlas de inteligência agrícola", "Análises de solo e clima"], en: ["+100 mapped properties", "Agricultural intelligence atlas", "Soil and climate analysis"] },
  },
  {
    id: 8, title: "Blue Zone Lavras", icon: Heart,
    subtitle: { pt: "Bairro Modelo de Longevidade", en: "Longevity Model Neighborhood" },
    description: { pt: "Criação do primeiro bairro-modelo de longevidade e inovação social do município.", en: "Creation of the first model neighborhood for longevity and social innovation." },
    category: "Cidade Feliz", categoryEn: "Happy City",
    pillar: { pt: "Qualidade de Vida", en: "Quality of Life" },
    results: { pt: ["Comitê de Inovação Social", "Radar do Ecossistema", "Framework de Longevidade"], en: ["Social Innovation Committee", "Ecosystem Radar", "Longevity Framework"] },
  },
  {
    id: 9, title: "Festival do Futuro do Alimento", icon: Globe,
    subtitle: { pt: "Summit Gastronômico", en: "Gastronomic Summit" },
    description: { pt: "Festival anual integrando inovação, ciência e gastronomia.", en: "Annual festival integrating innovation, science and gastronomy." },
    category: "Cidade Criativa", categoryEn: "Creative City",
    pillar: { pt: "Place Branding", en: "Place Branding" },
    results: { pt: ["3.000 participantes", "50 especialistas", "30 startups expostas"], en: ["3,000 participants", "50 specialists", "30 startups exhibited"] },
  },
  {
    id: 10, title: "Circuito Vale dos Ipês", icon: Map,
    subtitle: { pt: "Rota de Experiências", en: "Experience Route" },
    description: { pt: "Circuito turístico-radial conectando Lavras a roteiros de gastronomia e paisagens.", en: "Radial tourist circuit connecting Lavras to gastronomy routes and landscapes." },
    category: "Cidade Criativa", categoryEn: "Creative City",
    pillar: { pt: "Place Branding", en: "Place Branding" },
    results: { pt: ["3-4 rotas temáticas", "Catálogo de experiências", "Mobilidade sustentável"], en: ["3-4 themed routes", "Experience catalog", "Sustainable mobility"] },
  },
  {
    id: 11, title: "Cluster Agro-Food-Tech", icon: Leaf,
    subtitle: { pt: "Trilha Empreendedora", en: "Entrepreneurial Track" },
    description: { pt: "Cluster estratégico para consolidar Lavras como polo nacional de AgroFoodTech.", en: "Strategic cluster to consolidate Lavras as a national AgroFoodTech hub." },
    category: "Cidade AgroFoodTech", categoryEn: "AgroFoodTech City",
    pillar: { pt: "Ambiente de Negócio", en: "Business Environment" },
    results: { pt: ["+30 projetos tecnológicos", "8 programas de inovação", "+150 atores qualificados"], en: ["+30 tech projects", "8 innovation programs", "+150 qualified actors"] },
  },
  {
    id: 12, title: "Hub de Inovação IpêTech", icon: Building2,
    subtitle: { pt: "Epicentro da Ciência Aplicada", en: "Applied Science Epicenter" },
    description: { pt: "Ponto central de convergência entre pesquisa, empresas e governo no Parque Tecnológico.", en: "Central convergence point between research, companies and government at the Technology Park." },
    category: "Cidade AgroFoodTech", categoryEn: "AgroFoodTech City",
    pillar: { pt: "Ambiente de Negócio", en: "Business Environment" },
    results: { pt: ["10-15 projetos em desenvolvimento", "3 trilhas tecnológicas", "Plataforma de Matchmaking"], en: ["10-15 projects in development", "3 tech tracks", "Matchmaking Platform"] },
  },
];

const categories = [
  { pt: "Todos", en: "All", value: "all" },
  { pt: "Cidade AgroFoodTech", en: "AgroFoodTech City", value: "Cidade AgroFoodTech" },
  { pt: "Cidade Criativa", en: "Creative City", value: "Cidade Criativa" },
  { pt: "Cidade Feliz", en: "Happy City", value: "Cidade Feliz" },
  { pt: "Cidade Sustentável", en: "Sustainable City", value: "Cidade Sustentável" },
];

const LvrsProjectsSection = () => {
  const { lang } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [expandedProject, setExpandedProject] = useState<number | null>(null);

  const filtered = selectedCategory === "all"
    ? projects
    : projects.filter((p) => p.category === selectedCategory);

  return (
    <section id="lvrs-projects" className="py-20 lg:py-32 bg-secondary">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        {/* Header */}
        <div className="max-w-3xl mb-14">
          <p className="text-xs font-body font-semibold tracking-[0.2em] text-primary uppercase mb-5">
            {lang === "pt" ? "PACTO PELA INOVAÇÃO" : "INNOVATION PACT"}
          </p>
          <h2 className="font-display text-3xl lg:text-[48px] leading-[1.08] text-secondary-foreground mb-6">
            {lang === "pt" ? "Projetos LVRS+" : "LVRS+ Projects"}
          </h2>
          <p className="text-base text-secondary-foreground/70 font-body leading-relaxed">
            {lang === "pt"
              ? "12 projetos estratégicos do Ciclo 01 para transformar Lavras na Capital Brasileira do Alimento do Futuro"
              : "12 strategic projects from Cycle 01 to transform Lavras into the Brazilian Capital of Future Food"}
          </p>
        </div>

        {/* Filter pills */}
        <div className="flex flex-wrap gap-2 mb-10 overflow-x-auto -mx-6 px-6 sm:mx-0 sm:px-0">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setSelectedCategory(cat.value)}
              className={`px-3 sm:px-5 py-2 sm:py-2.5 rounded-full text-[10px] sm:text-[11px] font-body font-semibold tracking-[0.08em] uppercase transition-all duration-200 whitespace-nowrap ${
                selectedCategory === cat.value
                  ? "bg-primary text-primary-foreground"
                  : "bg-card text-muted-foreground border border-border hover:border-primary/40"
              }`}
            >
              {cat[lang]}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((project) => {
            const Icon = project.icon;
            const isExpanded = expandedProject === project.id;

            return (
              <div
                key={project.id}
                className={`bg-card rounded-3xl overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer border ${
                  isExpanded ? "border-primary" : "border-transparent hover:border-primary/20"
                }`}
                onClick={() => setExpandedProject(isExpanded ? null : project.id)}
              >
                {/* Card Header */}
                <div className="bg-primary/5 px-5 sm:px-8 py-5 border-b border-border">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center">
                      <Icon className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <div>
                      <span className="text-[10px] font-body font-bold text-primary">
                        {String(project.id).padStart(2, "0")}
                      </span>
                      <h3 className="font-display text-base text-foreground leading-snug">
                        {project.title}
                      </h3>
                    </div>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-5 sm:p-8">
                  <p className="text-xs font-body font-semibold text-primary mb-2">
                    {project.subtitle[lang]}
                  </p>
                  <p className="text-sm text-muted-foreground font-body leading-relaxed mb-4 line-clamp-2">
                    {project.description[lang]}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="text-[10px] font-body font-semibold bg-secondary text-secondary-foreground/70 px-2.5 py-1 rounded-full">
                      {lang === "pt" ? project.category : project.categoryEn}
                    </span>
                    <span className="text-[10px] font-body font-semibold border border-border text-muted-foreground px-2.5 py-1 rounded-full">
                      {project.pillar[lang]}
                    </span>
                  </div>

                  {/* Expanded Results */}
                  {isExpanded && (
                    <div className="mt-4 pt-4 border-t border-border animate-in fade-in slide-in-from-top-2 duration-300">
                      <h4 className="text-xs font-body font-bold text-foreground mb-3">
                        {lang === "pt" ? "Resultados Esperados:" : "Expected Results:"}
                      </h4>
                      <ul className="space-y-2">
                        {project.results[lang].map((result, idx) => (
                          <li key={idx} className="flex items-center gap-2 text-sm font-body text-muted-foreground">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                            {result}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <p className="text-[10px] font-body text-primary mt-4 text-center">
                    {isExpanded
                      ? lang === "pt" ? "Clique para fechar" : "Click to close"
                      : lang === "pt" ? "Clique para ver mais" : "Click to see more"}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default LvrsProjectsSection;
