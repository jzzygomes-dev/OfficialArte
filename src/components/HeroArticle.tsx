import { Clock, Music, Disc3, TrendingUp, Users } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import heroImg from "@/assets/news-hero.jpg";

const heroIcons = [
  { icon: Music, label: "Música", to: "/resultados?tag=musica" },
  { icon: Users, label: "Nossa Equipe", to: "/equipe" },
  { icon: TrendingUp, label: "Vídeos & Podcasts", to: "/videos" },
];

const categoryLinks = [
  { label: "Lançamentos", tag: "lancamento" },
  { label: "Entrevistas", tag: "entrevista" },
  { label: "Fama", tag: "fama" },
  { label: "Sociedade", tag: "sociedade" },
];

const HeroArticle = () => {
  return (
    <>
      {/* Hero Section — inspired by gradient + stats + wave */}
      <section className="relative bg-gradient-to-br from-primary via-primary/85 to-accent overflow-hidden">
        {/* Cross pattern overlay */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 0v40M0 20h40' stroke='%23fff' stroke-width='1' fill='none'/%3E%3C/svg%3E")`,
            backgroundSize: "40px 40px",
          }}
        />

        <div className="relative z-10 container mx-auto px-4 pt-10 pb-24 md:pt-16 md:pb-32 text-center">
          <h1 className="font-display text-3xl md:text-5xl lg:text-6xl font-extrabold text-primary-foreground leading-tight mb-4">
            A Sua Fonte de<br />
            <span className="text-secondary">Música & Cultura</span>
          </h1>
          <p className="text-primary-foreground/80 font-body text-sm md:text-base max-w-lg mx-auto mb-10">
            Notícias, lançamentos e entrevistas exclusivas do universo musical angolano e internacional.
          </p>

          {/* Category pills */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categoryLinks.map((cat) => (
              <Link
                key={cat.label}
                to={`/resultados?tag=${cat.tag}`}
                className="bg-primary-foreground/15 backdrop-blur-sm text-primary-foreground text-xs md:text-sm font-display font-semibold uppercase tracking-wider px-5 py-2 rounded-full border border-primary-foreground/20 hover:bg-primary-foreground/25 transition-colors"
              >
                {cat.label}
              </Link>
            ))}
          </div>

          {/* Stats */}
          <div className="flex justify-center gap-6">
            {heroIcons.map(({ icon: Icon, label, to }) => (
              <Link
                key={label}
                to={to}
                title={label}
                className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-primary-foreground/15 backdrop-blur-sm flex items-center justify-center hover:bg-primary-foreground/25 transition-colors"
              >
                <Icon className="w-5 h-5 md:w-6 md:h-6 text-secondary" />
              </Link>
            ))}
          </div>
        </div>

        {/* Wave SVG at bottom */}
        <div className="absolute bottom-0 left-0 right-0 translate-y-[1px]">
          <svg viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto block" preserveAspectRatio="none">
            <path
              d="M0,60 C360,100 720,20 1080,60 C1260,80 1380,50 1440,40 L1440,100 L0,100 Z"
              className="fill-background"
            />
          </svg>
        </div>
      </section>

      {/* Featured post below hero */}
      <section className="container mx-auto px-4 mt-6 md:mt-10 relative z-20 pb-6">
        <Link to="/post/1" className="group block">
          <div className="relative overflow-hidden rounded-lg shadow-lg">
            <img
              src={heroImg}
              alt="Artista em destaque"
              className="w-full aspect-[16/9] md:aspect-[21/9] object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-accent/95 via-accent/30 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-4 md:p-8">
              <span className="category-badge-lancamento mb-2">Destaque</span>
              <h2 className="font-display text-lg md:text-3xl lg:text-4xl font-bold text-accent-foreground leading-tight mt-2 max-w-2xl">
                Artista angolano surpreende com novo álbum que mistura kuduro e afrobeat
              </h2>
              <div className="flex items-center gap-3 mt-2 text-accent-foreground/70 text-xs font-body">
                <span>Redação</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" /> 14:30
                </span>
              </div>
            </div>
          </div>
        </Link>
      </section>
    </>
  );
};

export default HeroArticle;
