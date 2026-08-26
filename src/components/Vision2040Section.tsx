import { useLanguage } from "@/i18n/LanguageContext";
import {
  Target, TrendingUp, Building2, Lightbulb,
  GraduationCap, Heart, Leaf, Wheat,
  UtensilsCrossed, TreePine, Smile,
} from "lucide-react";

const strategicAxes = [
  {
    icon: GraduationCap,
    title: { pt: "Educação e Inovação", en: "Education and Innovation" },
    desc: { pt: "Diferencial estruturante que define a identidade de Lavras", en: "Structural differentiator that defines Lavras' identity" },
  },
  {
    icon: Leaf,
    title: { pt: "Agro como Base", en: "Agro as Foundation" },
    desc: { pt: "Motor do desenvolvimento econômico territorial", en: "Driver of territorial economic development" },
  },
  {
    icon: TrendingUp,
    title: { pt: "Sustentabilidade", en: "Sustainability" },
    desc: { pt: "Competitividade através de práticas sustentáveis", en: "Competitiveness through sustainable practices" },
  },
  {
    icon: Heart,
    title: { pt: "Qualidade de Vida", en: "Quality of Life" },
    desc: { pt: "Compiladores do desenvolvimento humano", en: "Compilers of human development" },
  },
];

const missions = [
  {
    icon: Wheat,
    title: { pt: "Cidade Agro-FoodTech", en: "Agro-FoodTech City" },
    desc: {
      pt: "Lavras será um polo nacional de inovação em alimentos, biotecnologia e sustentabilidade agrícola. A missão é conectar ciência e produção, criando um ambiente propício para startups, indústrias e centros de P&D voltados ao agro do futuro.",
      en: "Lavras will be a national hub for food innovation, biotechnology and agricultural sustainability, connecting science and production for the agro of the future.",
    },
    projects: {
      pt: ["Parque Tecnológico Food Valley", "Fazendas Verticais Inteligentes", "Cluster Agro-FoodTech"],
      en: ["Food Valley Technology Park", "Smart Vertical Farms", "Agro-FoodTech Cluster"],
    },
  },
  {
    icon: UtensilsCrossed,
    title: { pt: "Cidade Criativa e Gastronômica", en: "Creative and Gastronomic City" },
    desc: {
      pt: "A cultura e a gastronomia se tornam pilares da economia criativa e da identidade territorial. Lavras se posicionará como destino de inovação gastronômica e turismo de experiências.",
      en: "Culture and gastronomy become pillars of the creative economy and territorial identity, positioning Lavras as a destination for gastronomic innovation.",
    },
    projects: {
      pt: ["Mercado Público Inovador", "Festival Internacional do Futuro do Alimento", "Programa Cidade Bonita"],
      en: ["Innovative Public Market", "International Future of Food Festival", "Beautiful City Program"],
    },
  },
  {
    icon: TreePine,
    title: { pt: "Cidade Sustentável e Regenerativa", en: "Sustainable and Regenerative City" },
    desc: {
      pt: "Lavras se tornará uma cidade modelo em sustentabilidade e regeneração ambiental, articulando transição energética, gestão inteligente de resíduos, economia circular e urbanismo verde.",
      en: "Lavras will become a model city in sustainability and environmental regeneration, integrating energy transition and circular economy.",
    },
    projects: {
      pt: ["Programa de Transição Energética", "Sistema Inteligente de Gestão de Resíduos", "Infraestrutura Verde e Regenerativa"],
      en: ["Energy Transition Program", "Intelligent Waste Management System", "Green and Regenerative Infrastructure"],
    },
  },
  {
    icon: Smile,
    title: { pt: "Cidade Feliz", en: "Happy City" },
    desc: {
      pt: "Inspirada nas 'Blue Zones' — territórios onde as pessoas vivem mais e melhor — Lavras buscará se tornar referência nacional em bem-estar, longevidade e alimento saudável.",
      en: "Inspired by 'Blue Zones' — territories where people live longer and better — Lavras will seek to become a national reference in well-being and longevity.",
    },
    projects: {
      pt: ["Programa Blue Zone Lavras", "Hortas Comunitárias Inteligentes", "Alimento Saudável nas Escolas", "Cultura do Bem-Estar"],
      en: ["Blue Zone Lavras Program", "Smart Community Gardens", "Healthy School Meals", "Wellness Culture"],
    },
  },
];

const macrochallenges = [
  { icon: Building2, title: { pt: "Gestão Pública", en: "Public Management" }, desc: { pt: "Modernização e eficiência na administração municipal", en: "Modernization and efficiency in municipal administration" } },
  { icon: GraduationCap, title: { pt: "Atração e Geração de Talentos", en: "Talent Attraction and Development" }, desc: { pt: "Desenvolver e reter capital humano qualificado", en: "Develop and retain qualified human capital" } },
  { icon: Target, title: { pt: "Place Branding e Turismo", en: "Place Branding and Tourism" }, desc: { pt: "Posicionar Lavras como destino atrativo e marca reconhecida", en: "Position Lavras as an attractive destination" } },
  { icon: Leaf, title: { pt: "Transformação Urbana Sustentável", en: "Sustainable Urban Transformation" }, desc: { pt: "Desenvolvimento urbano com foco em sustentabilidade", en: "Urban development focused on sustainability" } },
  { icon: Heart, title: { pt: "Qualidade de Vida e Inclusão", en: "Quality of Life and Inclusion" }, desc: { pt: "Promover bem-estar e inclusão social", en: "Promote well-being and social inclusion" } },
  { icon: Lightbulb, title: { pt: "Ambiente de Negócios", en: "Business Environment" }, desc: { pt: "Ecossistema favorável para startups e empresas inovadoras", en: "Favorable ecosystem for startups and innovative companies" } },
];

const Vision2040Section = () => {
  const { lang } = useLanguage();

  return (
    <section id="vision-2040" className="py-20 lg:py-32 bg-background">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        {/* Header */}
        <div className="max-w-3xl mb-14">
          <p className="text-xs font-body font-semibold tracking-[0.2em] text-primary uppercase mb-5">
            LAVRAS 2040
          </p>
          <h2 className="font-display text-3xl lg:text-[48px] leading-[1.08] text-foreground">
            {lang === "pt" ? "Lavras Capital Brasileira do Futuro do Alimento" : "Lavras Brazilian Capital of the Future of Food"}
          </h2>
        </div>

        {/* Vision Statement */}
        <div className="bg-secondary rounded-3xl p-6 sm:p-8 md:p-12 mb-16 text-center">
          <Target className="w-14 h-14 text-icon mx-auto mb-6" />
          <h3 className="font-display text-xl md:text-2xl lg:text-3xl text-secondary-foreground mb-4">
            {lang === "pt"
              ? "LAVRAS CAPITAL BRASILEIRA DO FUTURO DO ALIMENTO"
              : "LAVRAS BRAZILIAN CAPITAL OF THE FUTURE OF FOOD"}
          </h3>
          <p className="text-secondary-foreground/70 max-w-2xl mx-auto text-sm md:text-base font-body italic leading-relaxed">
            {lang === "pt"
              ? '"O futuro de Lavras depende da capacidade de alinhar planejamento urbano, inovação tecnológica e políticas sociais em uma estratégia integrada de crescimento sustentável e inteligente."'
              : '"The future of Lavras depends on the ability to align urban planning, technological innovation, and social policies in an integrated strategy for sustainable and intelligent growth."'}
          </p>
        </div>

        {/* Strategic Axes */}
        <div className="mb-16">
          <h3 className="font-display text-xl text-foreground text-center mb-8">
            {lang === "pt" ? "Eixos Estratégicos" : "Strategic Axes"}
          </h3>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {strategicAxes.map((axis, i) => {
              const Icon = axis.icon;
              return (
                <div key={i} className="bg-card rounded-3xl p-4 sm:p-6 border border-border hover:border-primary transition-colors text-center">
                  <div className="w-12 h-12 rounded-full bg-icon/10 flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-6 h-6 text-icon" />
                  </div>
                  <h4 className="font-display text-sm text-foreground mb-1">{axis.title[lang]}</h4>
                  <p className="text-xs text-muted-foreground font-body">{axis.desc[lang]}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Missions */}
        <div className="mb-16">
          <h3 className="font-display text-xl text-foreground text-center mb-8">
            {lang === "pt" ? "Missões" : "Missions"}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {missions.map((mission, i) => {
              const Icon = mission.icon;
              return (
                <div key={i} className="bg-card rounded-3xl p-6 md:p-8 border border-border hover:border-primary transition-all hover:shadow-xl">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-icon flex items-center justify-center shrink-0">
                      <Icon className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <h4 className="font-display text-lg text-foreground pt-2">{mission.title[lang]}</h4>
                  </div>
                  <p className="text-sm text-muted-foreground font-body leading-relaxed mb-4">
                    {mission.desc[lang]}
                  </p>
                  <div>
                    <p className="text-[10px] font-body font-bold text-icon mb-2 uppercase tracking-wider">
                      {lang === "pt" ? "Projetos Estratégicos:" : "Strategic Projects:"}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {mission.projects[lang].map((project, idx) => (
                        <span key={idx} className="text-[10px] font-body font-semibold bg-secondary text-secondary-foreground/70 px-2.5 py-1 rounded-full">
                          {project}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Macrochallenges */}
        <div>
          <h3 className="font-display text-xl text-foreground text-center mb-8">
            {lang === "pt" ? "Macrodesafios" : "Macro Challenges"}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {macrochallenges.map((ch, i) => {
              const Icon = ch.icon;
              return (
                <div key={i} className="bg-card rounded-3xl p-6 border border-border flex items-start gap-4 hover:shadow-lg transition-shadow">
                  <div className="w-11 h-11 rounded-xl bg-icon flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <div>
                    <h4 className="font-display text-sm text-foreground mb-1">{ch.title[lang]}</h4>
                    <p className="text-xs text-muted-foreground font-body">{ch.desc[lang]}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Vision2040Section;
