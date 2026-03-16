import { Clock } from "lucide-react";
import heroImg from "@/assets/news-hero.jpg";

const HeroArticle = () => {
  return (
    <section className="container mx-auto py-6">
      <div className="grid md:grid-cols-[1.2fr_1fr] gap-4 items-start">
        {/* Main featured */}
        <a href="#" className="group block">
          <div className="relative overflow-hidden rounded-sm">
            <img
              src={heroImg}
              alt="Artista em destaque"
              className="w-full aspect-[4/3] md:aspect-[16/10] object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-accent/90 to-transparent p-4 md:p-6">
              <span className="category-badge-lancamento mb-2">Lançamento</span>
              <h1 className="font-display text-xl md:text-3xl font-bold text-accent-foreground leading-tight mt-2">
                Artista angolano surpreende com novo álbum que mistura kuduro e afrobeat
              </h1>
              <div className="flex items-center gap-3 mt-2 text-accent-foreground/70 text-xs">
                <span>Redação</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" /> 14:30
                </span>
              </div>
            </div>
          </div>
        </a>

        {/* Side text excerpt */}
        <div className="flex flex-col gap-4">
          <div className="bg-muted p-4 rounded-sm">
            <span className="category-badge-lancamento mb-2">Lançamento</span>
            <h2 className="font-display text-lg font-bold text-foreground leading-snug mt-2">
              Hélio Farsante lança novo single "Dançar Sozinho"
            </h2>
            <p className="text-muted-foreground text-sm mt-2 leading-relaxed">
              O mercado angolano acaba de ganhar mais um talentoso artista, Hélio Farsante, uma voz promissora da música nacional. Após meses no backstage...
            </p>
            <div className="flex items-center gap-3 mt-3 text-muted-foreground text-xs">
              <span>Redação</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" /> 12:21
              </span>
            </div>
          </div>

          {/* Banner promo */}
          <div className="bg-primary rounded-sm p-4 md:p-5 text-center">
            <p className="font-display text-primary-foreground text-lg md:text-xl font-bold uppercase leading-tight">
              Onde a música encontra os factos!
            </p>
            <p className="text-primary-foreground/80 text-xs mt-1 font-body">
              MusicoMania News — Desde 2018
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroArticle;
