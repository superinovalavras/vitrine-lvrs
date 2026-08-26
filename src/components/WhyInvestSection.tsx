import { useLanguage } from "@/i18n/LanguageContext";
import { GraduationCap, MapPinned, Lightbulb, Building2, Users, Truck, FlaskConical, Leaf } from "lucide-react";
import ufla from "@/assets/ufla.jpg";
import { Reveal } from "@/hooks/useScrollReveal";

const tr = {
  tag: { pt: "VANTAGENS COMPETITIVAS", en: "COMPETITIVE ADVANTAGES" },
  title: { pt: "Por que investir em Lavras?", en: "Why invest in Lavras?" },
  subtitle: {
    pt: "Vantagens competitivas únicas para seu negócio",
    en: "Unique competitive advantages for your business",
  },
};

const advantages = [
  {
    icon: GraduationCap,
    title: { pt: "Talentos Qualificados", en: "Qualified Talent" },
    description: {
      pt: "Acesso a profissionais altamente qualificados em agronomia, engenharia, ciência de alimentos e biotecnologia através da UFLA.",
      en: "Access to highly qualified professionals in agronomy, engineering, food science and biotechnology through UFLA.",
    },
    highlight: "UFLA",
    color: "from-emerald-500/20 to-teal-500/10",
  },
  {
    icon: MapPinned,
    title: { pt: "Localização Estratégica", en: "Strategic Location" },
    description: {
      pt: "Proximidade com São Paulo, Rio de Janeiro e Belo Horizonte, com custos operacionais significativamente menores.",
      en: "Proximity to São Paulo, Rio de Janeiro and Belo Horizonte, with significantly lower operational costs.",
    },
    highlight: "370km SP",
    color: "from-cyan-500/20 to-blue-500/10",
  },
  {
    icon: Lightbulb,
    title: { pt: "Ecossistema de Inovação", en: "Innovation Ecosystem" },
    description: {
      pt: "Integração com o ecossistema de alimentos e inovação do Sul de Minas Gerais, com infraestrutura de pesquisa de classe mundial.",
      en: "Integration with Southern Minas Gerais food and innovation ecosystem, with world-class research infrastructure.",
    },
    highlight: "R&D",
    color: "from-amber-500/20 to-yellow-500/10",
  },
  {
    icon: Building2,
    title: { pt: "Governança Acessível", en: "Accessible Governance" },
    description: {
      pt: "Processos administrativos mais rápidos, comunicação clara e flexibilidade para atender necessidades das empresas.",
      en: "Faster administrative processes, clear communication and flexibility to meet business needs.",
    },
    highlight: "Fast Track",
    color: "from-violet-500/20 to-purple-500/10",
  },
];

const differentials = [
  { icon: Users, label: { pt: "Mão de obra qualificada", en: "Qualified workforce" } },
  { icon: Truck, label: { pt: "Logística estratégica", en: "Strategic logistics" } },
  { icon: FlaskConical, label: { pt: "Pesquisa aplicada", en: "Applied research" } },
  { icon: Leaf, label: { pt: "Sustentabilidade", en: "Sustainability" } },
];

const uflaItems = {
  pt: [
    "Top 5 universidades do Brasil",
    "Excelência em agronomia, ciência de alimentos, biotecnologia",
    "Forte tradição em pesquisa aplicada",
    "Parcerias ativas com empresas",
  ],
  en: [
    "Top 5 universities in Brazil",
    "Excellence in agronomy, food science, biotechnology",
    "Strong tradition in applied research",
    "Active partnerships with companies",
  ],
};

const WhyInvestSection = () => {
  const { lang } = useLanguage();

  return (
    <section id="why-invest" className="relative py-20 lg:py-32 bg-secondary overflow-hidden">
      {/* Decorative background */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl animate-pulse-glow" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary/3 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: "3s" }} />

      <div className="relative max-w-[1400px] mx-auto px-6 lg:px-10">
        {/* Header */}
        <Reveal>
          <div className="max-w-3xl mb-16">
            <p className="text-xs font-body font-semibold tracking-[0.2em] text-primary uppercase mb-5">
              {tr.tag[lang]}
            </p>
            <h2 className="font-display text-3xl lg:text-[48px] leading-[1.08] text-secondary-foreground mb-6">
              {tr.title[lang]}
            </h2>
            <p className="text-base text-secondary-foreground/70 font-body leading-relaxed">
              {tr.subtitle[lang]}
            </p>
          </div>
        </Reveal>

        {/* Advantages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-16">
          {advantages.map((adv, i) => {
            const Icon = adv.icon;
            return (
              <Reveal key={i} delay={i * 120}>
                <div className="bg-card rounded-3xl p-5 sm:p-8 hover:shadow-xl hover:shadow-primary/5 transition-all duration-500 border border-transparent hover:border-primary/20 group relative overflow-hidden">
                  {/* Colored gradient overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${adv.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl`} />
                  <div className="relative flex items-start gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-icon/10 flex items-center justify-center shrink-0 group-hover:bg-icon/20 group-hover:shadow-lg group-hover:shadow-icon/10 transition-all duration-300">
                      <Icon className="h-7 w-7 text-icon group-hover:scale-110 transition-transform duration-300" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-display text-lg text-foreground">{adv.title[lang]}</h3>
                        <span className="text-[10px] font-body font-bold text-icon bg-icon/10 px-2 py-0.5 rounded-full">
                          {adv.highlight}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground font-body leading-relaxed">
                        {adv.description[lang]}
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        {/* UFLA Highlight */}
        <Reveal>
          <div className="bg-card rounded-3xl overflow-hidden border border-primary/10 hover:border-primary/20 transition-colors group">
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="h-64 md:h-auto relative overflow-hidden">
                <img src={ufla} alt="UFLA Campus" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-card/20" />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
              <div className="p-8 md:p-12 flex flex-col justify-center">
                <div className="inline-flex items-center gap-2 bg-icon/10 px-3 py-1 rounded-full mb-4 w-fit">
                  <GraduationCap className="h-4 w-4 text-icon" />
                  <span className="text-xs font-body font-semibold text-icon">UFLA</span>
                </div>
                <h3 className="font-display text-2xl md:text-3xl text-foreground mb-6">
                  {lang === "pt" ? "Universidade Federal de Lavras" : "Federal University of Lavras"}
                </h3>
                <ul className="space-y-3">
                  {uflaItems[lang].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm font-body text-muted-foreground">
                      <span className="w-1.5 h-1.5 bg-icon rounded-full mt-2 shrink-0 shadow-sm shadow-icon/50" />
                      {item}
                    </li>
                  ))}
                </ul>

                {/* Differentials */}
                <div className="mt-8 pt-6 border-t border-border">
                  <div className="grid grid-cols-2 gap-3">
                    {differentials.map((diff, i) => {
                      const DIcon = diff.icon;
                      return (
                        <div key={i} className="flex items-center gap-2 text-sm font-body text-foreground group/diff hover:text-icon transition-colors">
                          <DIcon className="h-4 w-4 text-icon group-hover/diff:scale-110 transition-transform" />
                          <span>{diff.label[lang]}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default WhyInvestSection;
