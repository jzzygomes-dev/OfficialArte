import { Search, Menu, X, Music, Users, Video } from "lucide-react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logoH from "@/assets/oa-logo-h.png";

const allTrendingTitles = [
  "Artista angolano lança novo single que está a conquistar o mercado",
  "Artista protagoniza espectáculo memorável no Centro Cultural",
  "Cantora expressa carinho por colega de profissão: \"gosto de ti\"",
  "Rapper presta homenagem ao ídolo: \"A ideia é ser referência\"",
  "Produtor destaca mestria na composição do seu novo single",
  "Jovem cantor pede desculpas à artista após afirmar que namorou com a cantora",
  "Hélio Farsante lança novo single 'Dançar Sozinho'",
  "Querido presta homenagem aos ente queridos em \"Saudades\"",
  "Querido & Tércio Santana voltam a impactar o mercado com novo videoclipe \"Drena\"",
];

function shuffleArray<T>(arr: T[]): T[] {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

const navCategories = [
  { label: "Home", to: "/", isHome: true },
  { label: "Lançamentos", to: "/resultados?tag=lancamento" },
  { label: "Fama", to: "/resultados?tag=fama" },
  { label: "Entrevistas", to: "/resultados?tag=entrevista" },
  { label: "Sociedade", to: "/resultados?tag=sociedade" },
  { label: "Agendas", to: "/#agendas", isHome: true },
];

const NewsNavbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [titles] = useState(() => shuffleArray(allTrendingTitles));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % titles.length);
        setIsAnimating(false);
      }, 400);
    }, 4000);
    return () => clearInterval(interval);
  }, [titles.length]);

  return (
    <header className="bg-background border-b border-border sticky top-0 z-50">
      {/* Trending ticker */}
      <div className="bg-accent text-accent-foreground overflow-hidden">
        <div className="container mx-auto flex items-center gap-2 py-1.5 text-xs">
          <span className="font-bold text-primary uppercase tracking-wider font-display flex-shrink-0">🔥 Tendência</span>
          <div className="overflow-hidden flex-1 min-w-0">
            <span
              className={`block truncate text-accent-foreground/80 transition-all duration-400 ${
                isAnimating ? "opacity-0 -translate-y-3" : "opacity-100 translate-y-0"
              }`}
            >
              {titles[currentIndex]}
            </span>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <div className="container mx-auto flex items-center justify-between py-3">
        <Link to="/">
          <img src={logoH} alt="Official Arte Entretenimento" className="h-10 md:h-12 w-auto" />
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          {navCategories.map((item) => (
            <Link
              key={item.label}
              to={item.to}
              className="text-foreground hover:text-primary transition-colors text-sm font-semibold uppercase tracking-wide font-display"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/resultados?tag=musica")}
            className="text-muted-foreground hover:text-foreground transition-colors"
            title="Música"
          >
            <Music className="w-5 h-5" />
          </button>
          <Link
            to="/equipe"
            className="text-muted-foreground hover:text-foreground transition-colors"
            title="Nossa Equipe"
          >
            <Users className="w-5 h-5" />
          </Link>
          <Link
            to="/videos"
            className="text-muted-foreground hover:text-foreground transition-colors"
            title="Vídeos & Podcasts"
          >
            <Video className="w-5 h-5" />
          </Link>
          <button className="text-muted-foreground hover:text-foreground transition-colors">
            <Search className="w-5 h-5" />
          </button>
          <button
            className="md:hidden text-foreground"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-border bg-background pb-4">
          {navCategories.map((item) => (
            <Link
              key={item.label}
              to={item.to}
              className="block px-4 py-2.5 text-foreground hover:bg-muted text-sm font-semibold uppercase tracking-wide font-display"
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
};

export default NewsNavbar;
