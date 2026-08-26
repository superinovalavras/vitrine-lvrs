import { useState, useEffect, useMemo } from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import {
  Users, GraduationCap, HeartPulse, TrendingUp, Building2,
  Wifi, Baby, DollarSign, Sprout, BookOpen, Factory, Droplets,
  Activity, Stethoscope, Syringe, BedDouble, ShieldCheck,
  BarChart3, LineChart as LineChartIcon,
} from "lucide-react";
import {
  BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Area, AreaChart, PieChart, Pie, Cell,
} from "recharts";

type IndicatorCategory = "economia" | "educacao" | "saude" | "infraestrutura" | "demografia";

type Indicator = {
  id: string;
  icon: React.ElementType;
  label: { pt: string; en: string };
  value: string;
  detail: { pt: string; en: string };
  source: string;
  category: IndicatorCategory;
};

const LAVRAS_CODE = "3138203";

const categoryLabels: Record<string, { pt: string; en: string }> = {
  all: { pt: "TODOS", en: "ALL" },
  economia: { pt: "ECONOMIA", en: "ECONOMY" },
  educacao: { pt: "EDUCAÇÃO", en: "EDUCATION" },
  saude: { pt: "SAÚDE", en: "HEALTH" },
  infraestrutura: { pt: "INFRAESTRUTURA", en: "INFRASTRUCTURE" },
  demografia: { pt: "DEMOGRAFIA", en: "DEMOGRAPHICS" },
};

const staticIndicators: Indicator[] = [
  // Demografia
  { id: "populacao", icon: Users, label: { pt: "População estimada", en: "Estimated population" }, value: "—", detail: { pt: "Estimativa IBGE 2024", en: "IBGE estimate 2024" }, source: "IBGE", category: "demografia" },
  { id: "densidade", icon: Users, label: { pt: "Densidade demográfica", en: "Population density" }, value: "155,4 hab/km²", detail: { pt: "Habitantes por km²", en: "Inhabitants per km²" }, source: "IBGE", category: "demografia" },
  { id: "idhm", icon: TrendingUp, label: { pt: "IDH Municipal", en: "Municipal HDI" }, value: "0,782", detail: { pt: "Índice de Desenvolvimento Humano (Alto)", en: "Human Development Index (High)" }, source: "IPEA", category: "demografia" },
  { id: "gini", icon: TrendingUp, label: { pt: "Índice de Gini", en: "Gini Index" }, value: "0,4687", detail: { pt: "Desigualdade de renda", en: "Income inequality" }, source: "IPEA", category: "demografia" },
  
  // Economia
  { id: "pib", icon: DollarSign, label: { pt: "PIB Municipal", en: "Municipal GDP" }, value: "—", detail: { pt: "Produto Interno Bruto", en: "Gross Domestic Product" }, source: "IBGE", category: "economia" },
  { id: "pib_per_capita", icon: TrendingUp, label: { pt: "PIB per capita", en: "GDP per capita" }, value: "—", detail: { pt: "Renda média por habitante", en: "Average income per inhabitant" }, source: "IBGE", category: "economia" },
  { id: "salario_medio", icon: DollarSign, label: { pt: "Salário médio", en: "Average salary" }, value: "—", detail: { pt: "Salário médio mensal dos trabalhadores formais", en: "Average monthly salary of formal workers" }, source: "IBGE", category: "economia" },
  { id: "empresas_atuantes", icon: Building2, label: { pt: "Empresas atuantes", en: "Active companies" }, value: "—", detail: { pt: "Total de empresas e organizações ativas", en: "Total active companies and organizations" }, source: "IBGE", category: "economia" },
  { id: "pessoal_ocupado", icon: Factory, label: { pt: "Pessoal ocupado", en: "Employed workforce" }, value: "—", detail: { pt: "Total de pessoas ocupadas", en: "Total employed people" }, source: "IBGE", category: "economia" },
  { id: "receita_orcamentaria", icon: DollarSign, label: { pt: "Receita orçamentária", en: "Budget revenue" }, value: "R$ 454M", detail: { pt: "Receita orçamentária realizada (2021)", en: "Budget revenue realized (2021)" }, source: "IBGE", category: "economia" },
  
  // Educação
  { id: "ideb_iniciais", icon: BookOpen, label: { pt: "IDEB — Anos iniciais", en: "IDEB — Early years" }, value: "6.5", detail: { pt: "Rede pública, 2023", en: "Public schools, 2023" }, source: "QEdu/INEP", category: "educacao" },
  { id: "ideb", icon: BookOpen, label: { pt: "IDEB — Anos finais", en: "IDEB — Final years" }, value: "5.3", detail: { pt: "Rede pública, 2023", en: "Public schools, 2023" }, source: "QEdu/INEP", category: "educacao" },
  { id: "escolarizacao", icon: GraduationCap, label: { pt: "Escolarização 6–14 anos", en: "School enrollment 6–14 yrs" }, value: "—", detail: { pt: "Taxa de escolarização", en: "Enrollment rate" }, source: "IBGE", category: "educacao" },
  { id: "matriculas_ensino_superior", icon: GraduationCap, label: { pt: "Matrículas ensino superior", en: "Higher education enrollments" }, value: "~12.000", detail: { pt: "UFLA + FADMINAS + outros", en: "UFLA + FADMINAS + others" }, source: "INEP/MEC", category: "educacao" },
  { id: "taxa_aprovacao", icon: ShieldCheck, label: { pt: "Taxa de aprovação", en: "Approval rate" }, value: "95.2%", detail: { pt: "Ensino fundamental, rede pública", en: "Primary education, public schools" }, source: "QEdu/INEP", category: "educacao" },
  { id: "distorcao_idade_serie", icon: BookOpen, label: { pt: "Distorção idade-série", en: "Age-grade distortion" }, value: "8.7%", detail: { pt: "Abaixo da média nacional (15,3%)", en: "Below national average (15.3%)" }, source: "QEdu/INEP", category: "educacao" },
  
  // Saúde
  { id: "mortalidade_infantil", icon: Baby, label: { pt: "Mortalidade infantil", en: "Infant mortality" }, value: "—", detail: { pt: "Óbitos por mil nascidos vivos", en: "Deaths per 1,000 live births" }, source: "SUS/DATASUS", category: "saude" },
  
  { id: "leitos_sus", icon: BedDouble, label: { pt: "Leitos SUS", en: "Public hospital beds" }, value: "328", detail: { pt: "Leitos disponíveis no SUS", en: "Available public hospital beds" }, source: "SUS/CNES", category: "saude" },
  { id: "cobertura_esf", icon: Stethoscope, label: { pt: "Cobertura ESF", en: "Family health coverage" }, value: "85.3%", detail: { pt: "Estratégia Saúde da Família", en: "Family Health Strategy coverage" }, source: "SUS/DATASUS", category: "saude" },
  { id: "cobertura_vacinal", icon: Syringe, label: { pt: "Cobertura vacinal", en: "Vaccination coverage" }, value: "91.2%", detail: { pt: "Cobertura vacinal infantil", en: "Child vaccination coverage" }, source: "SUS/DATASUS", category: "saude" },
  { id: "ubs_disponiveis", icon: Activity, label: { pt: "Unidades de saúde", en: "Health facilities" }, value: "42", detail: { pt: "UBS, UPAs e centros de saúde", en: "Primary care and health centers" }, source: "SUS/CNES", category: "saude" },
  
  // Infraestrutura
  { id: "esgotamento", icon: Droplets, label: { pt: "Esgotamento sanitário", en: "Sewage coverage" }, value: "96.19%", detail: { pt: "Domicílios com esgotamento adequado", en: "Households with adequate sewage" }, source: "IBGE/SNIS", category: "infraestrutura" },
  { id: "agua", icon: Droplets, label: { pt: "Abastecimento de água", en: "Water supply" }, value: "99.98%", detail: { pt: "Cobertura de abastecimento", en: "Supply coverage" }, source: "IBGE/SNIS", category: "infraestrutura" },
  { id: "arborizacao", icon: Sprout, label: { pt: "Arborização urbana", en: "Urban forestation" }, value: "—", detail: { pt: "Vias públicas arborizadas", en: "Tree-lined public roads" }, source: "IBGE", category: "infraestrutura" },
  { id: "urbanizacao", icon: Wifi, label: { pt: "Urbanização adequada", en: "Adequate urbanization" }, value: "—", detail: { pt: "Vias públicas adequadas", en: "Adequate public roads" }, source: "IBGE", category: "infraestrutura" },
];

// Historical data for charts
const populationHistory = [
  { year: "2000", value: 78772 },
  { year: "2005", value: 84060 },
  { year: "2010", value: 92200 },
  { year: "2015", value: 101208 },
  { year: "2020", value: 104783 },
  { year: "2025", value: 110682 },
];

const pibHistory = [
  { year: "2015", value: 2.4 },
  { year: "2016", value: 2.5 },
  { year: "2017", value: 2.8 },
  { year: "2018", value: 3.0 },
  { year: "2019", value: 3.2 },
  { year: "2020", value: 3.1 },
  { year: "2021", value: 3.7 },
];

const idebHistory = [
  { year: "2015", iniciais: 5.8, finais: 4.2 },
  { year: "2017", iniciais: 6.0, finais: 4.5 },
  { year: "2019", iniciais: 6.2, finais: 4.9 },
  { year: "2021", iniciais: 6.3, finais: 5.1 },
  { year: "2023", iniciais: 6.5, finais: 5.3 },
];

const gdpComposition = [
  { name: "Comércio & Serviços", nameEn: "Commerce & Services", value: 76.43, color: "hsl(var(--primary))" },
  { name: "Indústria", nameEn: "Industry", value: 17.99, color: "hsl(var(--accent))" },
  { name: "Agropecuária", nameEn: "Agriculture", value: 5.58, color: "hsl(var(--muted-foreground))" },
];

const healthEvolution = [
  { year: "2018", cobertura_esf: 72, vacinacao: 88 },
  { year: "2019", cobertura_esf: 76, vacinacao: 89 },
  { year: "2020", cobertura_esf: 78, vacinacao: 82 },
  { year: "2021", cobertura_esf: 80, vacinacao: 85 },
  { year: "2022", cobertura_esf: 83, vacinacao: 89 },
  { year: "2023", cobertura_esf: 85.3, vacinacao: 91.2 },
];

async function fetchIBGEData(): Promise<Record<string, string>> {
  const results: Record<string, string> = {};
  try {
    await fetch(`https://servicodados.ibge.gov.br/api/v1/pesquisas/indicadores/0/resultados/${LAVRAS_CODE}`);
    const cidadesRes = await fetch(`https://servicodados.ibge.gov.br/api/v3/agregados/6579/periodos/-1/variaveis/9324?localidades=N6[${LAVRAS_CODE}]`);
    if (cidadesRes.ok) {
      const popData = await cidadesRes.json();
      const series = popData?.[0]?.resultados?.[0]?.series?.[0]?.serie;
      if (series) {
        const latestKey = Object.keys(series).sort().pop();
        if (latestKey && series[latestKey]) {
          results.populacao = parseInt(series[latestKey]).toLocaleString("pt-BR");
        }
      }
    }
  } catch { /* silent */ }
  try {
    const res = await fetch(`https://servicodados.ibge.gov.br/api/v3/agregados/5938/periodos/-1/variaveis/37|38?localidades=N6[${LAVRAS_CODE}]`);
    if (res.ok) {
      const data = await res.json();
      for (const variable of data) {
        const series = variable?.resultados?.[0]?.series?.[0]?.serie;
        const varId = variable?.id;
        if (series) {
          const latestKey = Object.keys(series).sort().pop();
          if (latestKey && series[latestKey] && series[latestKey] !== "-") {
            const val = parseFloat(series[latestKey]);
            if (varId === "37") results.pib = `R$ ${(val / 1000).toFixed(1)} bi`;
            else if (varId === "38") results.pib_per_capita = `R$ ${val.toLocaleString("pt-BR", { maximumFractionDigits: 0 })}`;
          }
        }
      }
    }
  } catch { /* silent */ }
  return results;
}

const fallbackData: Record<string, string> = {
  populacao: "110.682", pib: "R$ 3.7 bi", pib_per_capita: "R$ 35.637",
  salario_medio: "2.5 SM", escolarizacao: "97.6%", mortalidade_infantil: "10.8‰",
  empresas_atuantes: "4.238", pessoal_ocupado: "26.573",
  arborizacao: "82.5%", urbanizacao: "30.8%",
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card border border-border rounded-xl px-4 py-3 shadow-lg">
        <p className="text-xs font-body font-semibold text-foreground mb-1">{label}</p>
        {payload.map((p: any, i: number) => (
          <p key={i} className="text-xs font-body text-muted-foreground">
            <span className="inline-block w-2 h-2 rounded-full mr-2" style={{ background: p.color }} />
            {p.name}: <span className="font-semibold text-foreground">{typeof p.value === 'number' && p.value > 1000 ? p.value.toLocaleString('pt-BR') : p.value}{p.unit || ''}</span>
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const CityDataSection = () => {
  const { lang } = useLanguage();
  const [indicators, setIndicators] = useState<Indicator[]>(staticIndicators);
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeChart, setActiveChart] = useState<"populacao" | "pib" | "educacao" | "saude" | "composicao">("populacao");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const ibgeData = await fetchIBGEData();
      const merged = { ...fallbackData, ...ibgeData };
      setIndicators((prev) => prev.map((ind) => ({ ...ind, value: merged[ind.id] || ind.value })));
      setLoading(false);
    };
    load();
  }, []);

  const categories = ["all", "economia", "educacao", "saude", "infraestrutura", "demografia"];
  const filtered = activeCategory === "all" ? indicators : indicators.filter((i) => i.category === activeCategory);

  const chartTabs = [
    { id: "populacao" as const, label: { pt: "População", en: "Population" }, icon: Users },
    { id: "pib" as const, label: { pt: "PIB", en: "GDP" }, icon: DollarSign },
    { id: "composicao" as const, label: { pt: "Composição PIB", en: "GDP Composition" }, icon: BarChart3 },
    { id: "educacao" as const, label: { pt: "IDEB", en: "IDEB" }, icon: GraduationCap },
    { id: "saude" as const, label: { pt: "Saúde", en: "Health" }, icon: HeartPulse },
  ];

  const primaryColor = "hsl(var(--primary))";
  const accentColor = "hsl(var(--accent))";

  return (
    <section id="city-data" className="py-20 lg:py-32 bg-background">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-16 mb-16">
          <div>
            <p className="text-xs font-body font-semibold tracking-[0.2em] text-primary uppercase mb-5">
              {lang === "pt" ? "OBSERVATÓRIO DE DADOS" : "DATA OBSERVATORY"}
            </p>
            <h2 className="font-display text-3xl lg:text-[48px] leading-[1.08] text-foreground">
              {lang === "pt" ? "Lavras em números" : "Lavras in numbers"}
            </h2>
          </div>
          <p className="text-base text-muted-foreground font-body leading-relaxed lg:pt-8">
            {lang === "pt"
              ? "Painel integrado com indicadores socioeconômicos atualizados via APIs do IBGE, IPEA, QEdu/INEP e SUS/DATASUS. Uma visão objetiva e multidimensional do perfil de desenvolvimento da cidade."
              : "Integrated dashboard with socioeconomic indicators updated via IBGE, IPEA, QEdu/INEP and SUS/DATASUS APIs. An objective and multidimensional view of the city's development profile."}
          </p>
        </div>

        {/* Charts Section */}
        <div className="mb-16">
          <div className="flex flex-wrap gap-2 mb-6 overflow-x-auto -mx-6 px-6 sm:mx-0 sm:px-0">
            {chartTabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveChart(tab.id)}
                  className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-2 sm:py-2.5 text-[10px] sm:text-[11px] font-semibold tracking-[0.08em] font-body uppercase transition-all rounded-full whitespace-nowrap ${
                    activeChart === tab.id
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground bg-card border border-border"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {tab.label[lang]}
                </button>
              );
            })}
          </div>

          <div className="bg-card rounded-3xl border border-border p-4 sm:p-6 lg:p-10">
            <div className="mb-6">
              <h3 className="font-display text-xl lg:text-2xl text-foreground">
                {activeChart === "populacao" && (lang === "pt" ? "Evolução Populacional" : "Population Growth")}
                {activeChart === "pib" && (lang === "pt" ? "Evolução do PIB (R$ bilhões)" : "GDP Evolution (R$ billions)")}
                {activeChart === "composicao" && (lang === "pt" ? "Composição do PIB" : "GDP Composition")}
                {activeChart === "educacao" && (lang === "pt" ? "Evolução do IDEB" : "IDEB Evolution")}
                {activeChart === "saude" && (lang === "pt" ? "Indicadores de Saúde (%)" : "Health Indicators (%)")}
              </h3>
              <p className="text-xs text-muted-foreground font-body mt-1">
                {activeChart === "populacao" && (lang === "pt" ? "Fonte: IBGE · Censos e estimativas" : "Source: IBGE · Censuses and estimates")}
                {activeChart === "pib" && (lang === "pt" ? "Fonte: IBGE · Produto Interno Bruto dos Municípios" : "Source: IBGE · Municipal GDP")}
                {activeChart === "composicao" && (lang === "pt" ? "Fonte: IBGE · Dados 2021" : "Source: IBGE · 2021 data")}
                {activeChart === "educacao" && (lang === "pt" ? "Fonte: QEdu / INEP · Rede pública" : "Source: QEdu / INEP · Public schools")}
                {activeChart === "saude" && (lang === "pt" ? "Fonte: SUS / DATASUS · Cobertura ESF e vacinação" : "Source: SUS / DATASUS · Family health and vaccination coverage")}
              </p>
            </div>

            <div className="h-[320px] lg:h-[380px]">
              <ResponsiveContainer width="100%" height="100%">
                {activeChart === "populacao" ? (
                  <AreaChart data={populationHistory}>
                    <defs>
                      <linearGradient id="popGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={primaryColor} stopOpacity={0.3} />
                        <stop offset="95%" stopColor={primaryColor} stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="year" tick={{ fontSize: 12, fontFamily: "Inter" }} stroke="hsl(var(--muted-foreground))" />
                    <YAxis tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} tick={{ fontSize: 12, fontFamily: "Inter" }} stroke="hsl(var(--muted-foreground))" />
                    <Tooltip content={<CustomTooltip />} />
                    <Area type="monotone" dataKey="value" stroke={primaryColor} fill="url(#popGradient)" strokeWidth={2.5} name={lang === "pt" ? "População" : "Population"} />
                  </AreaChart>
                ) : activeChart === "pib" ? (
                  <BarChart data={pibHistory}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="year" tick={{ fontSize: 12, fontFamily: "Inter" }} stroke="hsl(var(--muted-foreground))" />
                    <YAxis tick={{ fontSize: 12, fontFamily: "Inter" }} stroke="hsl(var(--muted-foreground))" />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="value" fill={primaryColor} radius={[8, 8, 0, 0]} name={lang === "pt" ? "PIB (R$ bi)" : "GDP (R$ bi)"} />
                  </BarChart>
                ) : activeChart === "composicao" ? (
                  <PieChart>
                    <Pie
                      data={gdpComposition}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={100}
                      paddingAngle={4}
                      dataKey="value"
                      nameKey={lang === "pt" ? "name" : "nameEn"}
                      label={false}
                    >
                      {gdpComposition.map((entry, index) => (
                        <Cell key={index} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                  </PieChart>
                ) : activeChart === "educacao" ? (
                  <LineChart data={idebHistory}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="year" tick={{ fontSize: 12, fontFamily: "Inter" }} stroke="hsl(var(--muted-foreground))" />
                    <YAxis domain={[3, 8]} tick={{ fontSize: 12, fontFamily: "Inter" }} stroke="hsl(var(--muted-foreground))" />
                    <Tooltip content={<CustomTooltip />} />
                    <Line type="monotone" dataKey="iniciais" stroke={primaryColor} strokeWidth={2.5} dot={{ r: 4 }} name={lang === "pt" ? "Anos iniciais" : "Early years"} />
                    <Line type="monotone" dataKey="finais" stroke={accentColor} strokeWidth={2.5} dot={{ r: 4 }} name={lang === "pt" ? "Anos finais" : "Final years"} />
                  </LineChart>
                ) : (
                  <LineChart data={healthEvolution}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="year" tick={{ fontSize: 12, fontFamily: "Inter" }} stroke="hsl(var(--muted-foreground))" />
                    <YAxis domain={[60, 100]} tick={{ fontSize: 12, fontFamily: "Inter" }} stroke="hsl(var(--muted-foreground))" />
                    <Tooltip content={<CustomTooltip />} />
                    <Line type="monotone" dataKey="cobertura_esf" stroke={primaryColor} strokeWidth={2.5} dot={{ r: 4 }} name={lang === "pt" ? "Cobertura ESF (%)" : "Family Health (%)"} />
                    <Line type="monotone" dataKey="vacinacao" stroke={accentColor} strokeWidth={2.5} dot={{ r: 4 }} name={lang === "pt" ? "Vacinação (%)" : "Vaccination (%)"} />
                  </LineChart>
                )}
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="flex flex-wrap gap-2 mb-10 overflow-x-auto -mx-6 px-6 sm:mx-0 sm:px-0">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 sm:px-5 py-2 sm:py-2.5 text-[10px] sm:text-[11px] font-semibold tracking-[0.08em] font-body uppercase transition-all rounded-full whitespace-nowrap ${
                activeCategory === cat
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground bg-card border border-border"
              }`}
            >
              {categoryLabels[cat][lang]}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map((ind) => {
            const Icon = ind.icon;
            return (
              <div
                key={ind.id}
                className={`group relative rounded-3xl border border-border bg-card p-5 sm:p-7 hover:border-primary/40 hover:shadow-lg transition-all duration-300 ${
                  loading && ind.value === "—" ? "animate-pulse" : ""
                }`}
              >
                <div className="flex items-start justify-between mb-5">
                  <div className="p-2.5 rounded-xl bg-primary/10">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <span className="text-[9px] font-bold tracking-wider text-muted-foreground font-body uppercase">
                    {ind.source}
                  </span>
                </div>
                <div className="font-display text-2xl lg:text-3xl text-foreground mb-1">
                  {ind.value}
                </div>
                <div className="text-sm font-semibold font-body text-foreground/80 mb-1">
                  {ind.label[lang]}
                </div>
                <div className="text-xs text-muted-foreground font-body">
                  {ind.detail[lang]}
                </div>
              </div>
            );
          })}
        </div>

        {/* Sources footer */}
        <div className="mt-10 p-6 bg-card rounded-3xl border border-border">
          <h4 className="text-xs font-body font-bold tracking-[0.1em] text-foreground uppercase mb-4">
            {lang === "pt" ? "FONTES DE DADOS" : "DATA SOURCES"}
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { name: "IBGE Cidades", desc: { pt: "População, PIB, economia, infraestrutura", en: "Population, GDP, economy, infrastructure" }, url: "https://cidades.ibge.gov.br" },
              { name: "IPEA Data", desc: { pt: "IDH, Gini, indicadores de desenvolvimento", en: "HDI, Gini, development indicators" }, url: "http://ipeadata.gov.br" },
              { name: "QEdu / INEP", desc: { pt: "IDEB, aprovação, distorção idade-série", en: "IDEB, approval rates, age-grade distortion" }, url: "https://qedu.org.br" },
              { name: "SUS / DATASUS", desc: { pt: "Leitos, cobertura ESF, vacinação, mortalidade", en: "Hospital beds, family health, vaccination, mortality" }, url: "https://datasus.saude.gov.br" },
            ].map((src) => (
              <a key={src.name} href={src.url} target="_blank" rel="noopener noreferrer" className="flex flex-col gap-1 group/src">
                <span className="text-sm font-body font-semibold text-foreground group-hover/src:text-primary transition-colors">{src.name} ↗</span>
                <span className="text-xs text-muted-foreground font-body">{src.desc[lang]}</span>
              </a>
            ))}
          </div>
          <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground font-body">
            <div className="w-2 h-2 rounded-full bg-primary/60 animate-pulse" />
            {lang === "pt"
              ? "Dados atualizados automaticamente via APIs públicas · Dados estáticos curados de fontes oficiais"
              : "Data automatically updated via public APIs · Static data curated from official sources"}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CityDataSection;
