import { useState } from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import { t } from "@/i18n/translations";

import aerialLavras from "@/assets/aerial-lavras.jpg";
import churchLavras from "@/assets/church-lavras.jpg";
import coffeeLavras from "@/assets/coffee-lavras.jpg";
import cultureHouse from "@/assets/culture-house.jpg";
import foodtech from "@/assets/foodtech.jpg";
import gastronomyBw from "@/assets/gastronomy-bw.jpg";
import serraBocaina from "@/assets/serra-bocaina.jpg";
import ufla from "@/assets/ufla.jpg";
import vineyardLavras from "@/assets/vineyard-lavras.jpg";
import wineryLavras from "@/assets/winery-lavras.jpg";
import pactLaunch from "@/assets/pact-launch.jpg";
import harvestSunset from "@/assets/harvest-sunset.jpg";
import funilDam from "@/assets/funil-dam.jpg";
import verdeCampo from "@/assets/verde-campo.jpg";
import grapeHarvest from "@/assets/grape-harvest.jpg";
import youxLab from "@/assets/youx-lab.jpg";
import rosarioChurch from "@/assets/rosario-church.jpg";
import jeitoCaseiro from "@/assets/jeito-caseiro.jpg";
import bakeryProduction from "@/assets/bakery-production.jpg";
import fieldDay from "@/assets/field-day.jpg";
import coffeePouring from "@/assets/coffee-pouring.jpg";
import dairyFactory from "@/assets/dairy-factory.jpg";
import coffeeCherries from "@/assets/coffee-cherries.jpg";

interface GalleryItem {
  src: string;
  title: { pt: string; en: string };
}

const galleryItems: GalleryItem[] = [
  { src: aerialLavras, title: { pt: "Vista aérea de Lavras", en: "Aerial view of Lavras" } },
  { src: ufla, title: { pt: "UFLA – Universidade Federal de Lavras", en: "UFLA – Federal University of Lavras" } },
  { src: coffeeLavras, title: { pt: "Produção de café especial", en: "Specialty coffee production" } },
  { src: coffeeCherries, title: { pt: "Cerejas de café no terreiro", en: "Coffee cherries drying" } },
  { src: harvestSunset, title: { pt: "Colheita ao pôr do sol", en: "Harvest at sunset" } },
  { src: vineyardLavras, title: { pt: "Vinhedos do Sul de Minas", en: "Southern Minas vineyards" } },
  { src: grapeHarvest, title: { pt: "Vendímia – Alma Gerais", en: "Grape harvest – Alma Gerais" } },
  { src: wineryLavras, title: { pt: "Vinícola artesanal", en: "Craft winery" } },
  { src: jeitoCaseiro, title: { pt: "Jeito Caseiro – produção artesanal", en: "Jeito Caseiro – artisan production" } },
  { src: verdeCampo, title: { pt: "Verde Campo – indústria de laticínios", en: "Verde Campo – dairy industry" } },
  { src: churchLavras, title: { pt: "Patrimônio histórico – Igreja Matriz", en: "Historic heritage – Main Church" } },
  { src: rosarioChurch, title: { pt: "Igreja do Rosário", en: "Rosário Church" } },
  { src: cultureHouse, title: { pt: "Casa de Cultura de Lavras", en: "Lavras Cultural House" } },
  { src: gastronomyBw, title: { pt: "Gastronomia regional", en: "Regional gastronomy" } },
  { src: foodtech, title: { pt: "FoodTech Hub Lavras", en: "FoodTech Hub Lavras" } },
  { src: youxLab, title: { pt: "YouX Lab – formação tecnológica", en: "YouX Lab – tech training program" } },
  { src: pactLaunch, title: { pt: "Lançamento do Pacto Lavras+", en: "LVRS+ Pact launch" } },
  { src: serraBocaina, title: { pt: "Serra da Bocaina", en: "Serra da Bocaina" } },
  { src: funilDam, title: { pt: "Represa do Funil", en: "Funil Dam" } },
  { src: bakeryProduction, title: { pt: "Produção de pães de queijo", en: "Cheese bread production" } },
  { src: fieldDay, title: { pt: "Dia de campo – pesquisa agrícola", en: "Field day – agricultural research" } },
  { src: coffeePouring, title: { pt: "Café coado na fazenda", en: "Farm-brewed coffee" } },
  { src: dairyFactory, title: { pt: "Indústria de laticínios", en: "Dairy processing plant" } },
];

const tr = {
  tag: { pt: "GALERIA", en: "GALLERY" },
  title: { pt: "Lavras em imagens", en: "Lavras in images" },
  subtitle: {
    pt: "Ciência, natureza, produção e cultura — conheça os cenários que fazem de Lavras uma plataforma única para o futuro do alimento.",
    en: "Science, nature, production and culture — discover the settings that make Lavras a unique platform for the future of food.",
  },
};

const GallerySection = () => {
  const { lang } = useLanguage();
  const [lightbox, setLightbox] = useState<number | null>(null);

  return (
    <section id="gallery" className="py-20 lg:py-32 bg-card" aria-label={lang === "pt" ? "Galeria de imagens" : "Image gallery"}>
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-16 mb-14">
          <div>
            <p className="text-xs font-body font-semibold tracking-[0.2em] text-primary uppercase mb-5">
              {t(tr.tag, lang)}
            </p>
            <h2 className="font-display text-3xl lg:text-[48px] leading-[1.08] text-foreground">
              {t(tr.title, lang)}
            </h2>
          </div>
          <p className="text-base text-muted-foreground font-body leading-relaxed lg:pt-8">
            {t(tr.subtitle, lang)}
          </p>
        </div>

        {/* Masonry-style grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
          {galleryItems.map((item, i) => (
            <div
              key={`${item.src}-${i}`}
              className="break-inside-avoid group cursor-pointer overflow-hidden rounded-3xl relative"
              onClick={() => setLightbox(i)}
            >
              <img
                src={item.src}
                alt={item.title[lang]}
                className="w-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                <span className="text-white text-sm font-body font-medium">
                  {item.title[lang]}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-[9999] bg-black/90 flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          <div className="relative max-w-5xl max-h-[90vh] w-full" onClick={(e) => e.stopPropagation()}>
            <img
              src={galleryItems[lightbox].src}
              alt={galleryItems[lightbox].title[lang]}
              className="w-full h-auto max-h-[85vh] object-contain rounded-2xl"
            />
            <p className="text-white text-sm font-body text-center mt-4">
              {galleryItems[lightbox].title[lang]}
            </p>
            <button
              onClick={() => setLightbox(null)}
              className="absolute -top-3 -right-3 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm text-white flex items-center justify-center text-lg hover:bg-white/20 transition-colors"
            >
              ✕
            </button>
            {lightbox > 0 && (
              <button
                onClick={(e) => { e.stopPropagation(); setLightbox(lightbox - 1); }}
                className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm text-white flex items-center justify-center text-lg hover:bg-white/20 transition-colors"
              >
                ‹
              </button>
            )}
            {lightbox < galleryItems.length - 1 && (
              <button
                onClick={(e) => { e.stopPropagation(); setLightbox(lightbox + 1); }}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm text-white flex items-center justify-center text-lg hover:bg-white/20 transition-colors"
              >
                ›
              </button>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default GallerySection;
