import { Search, Menu, X } from "lucide-react";
import { useState } from "react";

const NewsNavbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-background border-b border-border sticky top-0 z-50">
      {/* Trending bar */}
      <div className="bg-accent text-accent-foreground">
        <div className="container mx-auto flex items-center gap-2 py-1.5 text-xs">
          <span className="font-bold text-primary uppercase tracking-wider font-display">🔥 Tendência</span>
          <span className="truncate text-accent-foreground/80">
            Artista angolano lança novo single que está a conquistar o mercado
          </span>
        </div>
      </div>

      {/* Main nav */}
      <div className="container mx-auto flex items-center justify-between py-3">
        <a href="#" className="font-display text-2xl md:text-3xl font-extrabold uppercase tracking-tight text-primary leading-none">
          Musico<span className="text-foreground">Mania</span>
          <span className="block text-[10px] md:text-xs font-bold text-primary tracking-[0.3em]">NEWS</span>
        </a>

        <nav className="hidden md:flex items-center gap-6">
          {["Home", "Lançamentos", "Fama", "Entrevistas", "Sociedade"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-foreground hover:text-primary transition-colors text-sm font-semibold uppercase tracking-wide font-display"
            >
              {item}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
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
          {["Home", "Lançamentos", "Fama", "Entrevistas", "Sociedade"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="block px-4 py-2.5 text-foreground hover:bg-muted text-sm font-semibold uppercase tracking-wide font-display"
              onClick={() => setMenuOpen(false)}
            >
              {item}
            </a>
          ))}
        </div>
      )}
    </header>
  );
};

export default NewsNavbar;
