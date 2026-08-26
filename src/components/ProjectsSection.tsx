import { ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { translations, t } from "@/i18n/translations";

const ProjectsSection = () => {
  const { lang } = useLanguage();
  const tr = translations.projects;

  return (
    <section id="projects" className="py-20 lg:py-32 bg-background">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-16 mb-16">
          <h2 className="font-display text-3xl lg:text-[48px] leading-[1.08] text-foreground">
            {t(tr.title, lang)}
          </h2>
          <p className="text-base text-muted-foreground font-body leading-relaxed lg:pt-4">
            {t(tr.subtitle, lang)}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {tr.items.map((project, i) => (
            <div
              key={i}
              className="group bg-card rounded-3xl p-5 sm:p-8 hover:shadow-xl transition-all duration-300 cursor-pointer border border-transparent hover:border-primary/20"
            >
              <div className="flex items-start justify-between mb-6">
                <span className="text-xs font-body font-bold text-primary bg-primary/10 px-3 py-1.5 rounded-full">{String(i + 1).padStart(2, "0")}</span>
                <div className="p-2.5 rounded-full border border-border group-hover:border-primary group-hover:text-primary transition-colors">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>
              <h3 className="font-display text-lg text-foreground mb-3 leading-snug">
                {t(project.title, lang)}
              </h3>
              <p className="text-sm text-muted-foreground font-body leading-relaxed">
                {t(project.description, lang)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;