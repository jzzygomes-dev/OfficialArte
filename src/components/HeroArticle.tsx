import { Clock } from "lucide-react";
import { Link } from "react-router-dom";
import heroImg from "@/assets/news-hero.jpg";

const HeroArticle = () => {
  return (
    <section className="relative">
      {/* Hero covering 50vh */}
      <div className="relative h-[50vh] min-h-[320px] overflow-hidden">
        <img
          src={heroImg}
          alt="Artista em destaque"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-accent/95 via-accent/40 to-transparent" />

        <div className="relative z-10 container mx-auto px-4 h-full flex flex-col justify-end pb-16 md:pb-20">
          <span className="category-badge-lancamento mb-3 self-start">Lançamento</span>
          <Link to="/post/1" className="group">
            <h1 className="font-display text-2xl md:text-4xl lg:text-5xl font-bold text-accent-foreground leading-tight max-w-2xl group-hover:text-primary transition-colors">
              Artista angolano surpreende com novo álbum que mistura kuduro e afrobeat
            </h1>
          </Link>
          <div className="flex items-center gap-3 mt-3 text-accent-foreground/70 text-xs font-body">
            <span>Redação</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" /> 14:30
            </span>
          </div>
        </div>
      </div>

      {/* Spiral / wave SVG at the bottom */}
      <div className="absolute bottom-0 left-0 right-0 translate-y-[1px]">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto block"
          preserveAspectRatio="none"
        >
          <path
            d="M0,80 C120,100 240,40 360,60 C480,80 600,20 720,50 C840,80 960,30 1080,55 C1200,80 1320,40 1440,60 L1440,120 L0,120 Z"
            className="fill-background"
          />
          <path
            d="M0,90 C160,110 320,50 480,70 C640,90 800,40 960,65 C1120,90 1280,50 1440,75 L1440,120 L0,120 Z"
            className="fill-background"
            opacity="0.5"
          />
        </svg>
      </div>
    </section>
  );
};

export default HeroArticle;
