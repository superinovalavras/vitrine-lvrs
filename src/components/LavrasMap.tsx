import { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useLanguage } from "@/i18n/LanguageContext";

type POICategory = "university" | "hub" | "industry" | "nature" | "infra";

interface POI {
  name: string;
  lat: number;
  lng: number;
  category: POICategory;
  desc: { pt: string; en: string };
}

const categoryColors: Record<POICategory, string> = {
  university: "#2563eb",
  hub: "#d97706",
  industry: "#16a34a",
  nature: "#0d9488",
  infra: "#6b7280",
};

const categoryLabels: Record<POICategory, { pt: string; en: string }> = {
  university: { pt: "Universidades", en: "Universities" },
  hub: { pt: "Hubs de Inovação", en: "Innovation Hubs" },
  industry: { pt: "Indústria & Produção", en: "Industry & Production" },
  nature: { pt: "Natureza & Turismo", en: "Nature & Tourism" },
  infra: { pt: "Infraestrutura", en: "Infrastructure" },
};

const pois: POI[] = [
  // Universidades
  { name: "UFLA", lat: -21.2267, lng: -45.0003, category: "university", desc: { pt: "Universidade Federal de Lavras – referência nacional em agrotecnologia e ciências agrárias", en: "Federal University of Lavras – national reference in agrotechnology and agricultural sciences" } },
  { name: "UNILAVRAS", lat: -21.2410, lng: -44.9950, category: "university", desc: { pt: "Centro Universitário de Lavras – ensino superior e pesquisa regional", en: "University Center of Lavras – higher education and regional research" } },
  { name: "FADMINAS", lat: -21.2480, lng: -44.9970, category: "university", desc: { pt: "Faculdade de Minas – educação e formação profissional", en: "FADMINAS – education and professional training" } },

  // Hubs de Inovação
  { name: "Inbatec/UFLA", lat: -21.2280, lng: -44.9970, category: "hub", desc: { pt: "Incubadora de Empresas de Base Tecnológica da UFLA", en: "UFLA Technology-Based Business Incubator" } },
  { name: "YouX Lab", lat: -21.2440, lng: -44.9960, category: "hub", desc: { pt: "Laboratório de inovação e aceleração de startups", en: "Innovation lab and startup accelerator" } },
  { name: "Lavras Tec", lat: -21.2430, lng: -45.0010, category: "hub", desc: { pt: "Polo tecnológico e ecossistema de inovação de Lavras", en: "Technology hub and Lavras innovation ecosystem" } },
  { name: "Parque Científico UFLA", lat: -21.2250, lng: -45.0050, category: "hub", desc: { pt: "Parque Científico e Tecnológico da UFLA – P&D aplicada", en: "UFLA Science and Technology Park – applied R&D" } },
  { name: "NIQE/UFLA", lat: -21.2275, lng: -44.9985, category: "hub", desc: { pt: "Núcleo de Inovação e Qualidade do Empreendedorismo", en: "Center for Innovation and Entrepreneurship Quality" } },

  // Indústria & Produção
  { name: "Distrito Industrial", lat: -21.2600, lng: -44.9700, category: "industry", desc: { pt: "Distrito Industrial de Lavras – polo de empresas e logística", en: "Lavras Industrial District – business and logistics hub" } },
  { name: "Verde Campo", lat: -21.2550, lng: -44.9750, category: "industry", desc: { pt: "Laticínios Verde Campo – inovação em alimentos saudáveis", en: "Verde Campo Dairy – healthy food innovation" } },
  { name: "Café Região das Matas", lat: -21.2350, lng: -45.0100, category: "industry", desc: { pt: "Cooperativa de produtores de café especial", en: "Specialty coffee producers cooperative" } },

  // Natureza & Turismo
  { name: "Serra da Bocaina", lat: -21.1100, lng: -44.9800, category: "nature", desc: { pt: "Serra da Bocaina – área de preservação ambiental e ecoturismo", en: "Serra da Bocaina – environmental preservation and ecotourism" } },
  { name: "Represa de Funil", lat: -21.1600, lng: -44.9500, category: "nature", desc: { pt: "Represa de Funil – energia e lazer", en: "Funil Dam – energy and leisure" } },

  // Infraestrutura
  { name: "BR-381", lat: -21.2800, lng: -44.9400, category: "infra", desc: { pt: "Acesso à BR-381 (Fernão Dias) – corredor logístico SP-BH", en: "Access to BR-381 (Fernão Dias) – SP-BH logistics corridor" } },
  { name: "Centro", lat: -21.2453, lng: -44.9991, category: "infra", desc: { pt: "Centro da cidade de Lavras", en: "Lavras city center" } },
];

const createIcon = (color: string) =>
  L.divIcon({
    className: "",
    html: `<div style="background:${color};width:16px;height:16px;border-radius:50%;border:2.5px solid white;box-shadow:0 2px 8px rgba(0,0,0,0.35);"></div>`,
    iconSize: [16, 16],
    iconAnchor: [8, 8],
  });

const LavrasMap = () => {
  const { lang } = useLanguage();
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<L.Map | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!mapRef.current || mapInstance.current) return;

    const map = L.map(mapRef.current, {
      center: [-21.2453, -44.9991],
      zoom: 14,
      scrollWheelZoom: false,
    });

    mapInstance.current = map;

    L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; <a href="https://carto.com/">CARTO</a>',
    }).addTo(map);

    // Add POI markers by category
    pois.forEach((poi) => {
      const icon = createIcon(categoryColors[poi.category]);
      L.marker([poi.lat, poi.lng], { icon })
        .addTo(map)
        .bindPopup(`<strong>${poi.name}</strong><br/><span style="font-size:12px;color:#555">${poi.desc[lang]}</span>`);
    });

    // Fetch IBGE municipal boundary - código correto: 3138203
    fetch("https://servicodados.ibge.gov.br/api/v3/malhas/municipios/3138203?formato=application/vnd.geo+json&qualidade=maxima")
      .then((res) => res.json())
      .then((data) => {
        const geoLayer = L.geoJSON(data, {
          style: {
            color: "#4a7c59",
            weight: 3,
            fillColor: "#4a7c59",
            fillOpacity: 0.08,
            dashArray: "6 4",
          },
        }).addTo(map);
        // Keep center on city, don't fitBounds
        setLoading(false);
      })
      .catch((err) => {
        console.error("Erro ao carregar malha IBGE:", err);
        setLoading(false);
      });

    return () => {
      map.remove();
      mapInstance.current = null;
    };
  }, [lang]);

  return (
    <div className="w-full h-[400px] lg:h-[500px] rounded-3xl overflow-hidden relative">
      {loading && (
        <div className="absolute inset-0 z-[1000] flex items-center justify-center bg-muted">
          <div className="text-sm font-body text-muted-foreground animate-pulse">
            {lang === "pt" ? "Carregando mapa IBGE..." : "Loading IBGE map..."}
          </div>
        </div>
      )}
      <div ref={mapRef} className="w-full h-full z-0" />

      {/* Legend */}
      <div className="absolute bottom-4 left-4 z-[1000] bg-background/90 backdrop-blur-sm rounded-xl px-4 py-3 border border-border shadow-sm max-w-[320px]">
        <p className="text-[10px] font-body font-bold text-foreground uppercase tracking-wider mb-2">
          {lang === "pt" ? "Fonte: IBGE / OpenStreetMap" : "Source: IBGE / OpenStreetMap"}
        </p>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
          {(Object.keys(categoryColors) as POICategory[]).map((cat) => (
            <div key={cat} className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full border border-white shadow-sm" style={{ background: categoryColors[cat] }} />
              <span className="text-[10px] font-body text-muted-foreground">
                {categoryLabels[cat][lang]}
              </span>
            </div>
          ))}
          <div className="flex items-center gap-1.5">
            <span className="w-4 h-0.5 border-t-2 border-dashed border-primary" />
            <span className="text-[10px] font-body text-muted-foreground">
              {lang === "pt" ? "Limite municipal" : "Municipal boundary"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LavrasMap;
