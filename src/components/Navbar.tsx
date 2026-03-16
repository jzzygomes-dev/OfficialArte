import { Music2 } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/50">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2 group">
          <Music2 className="w-6 h-6 text-primary" />
          <span className="font-display text-xl font-bold text-foreground tracking-tight">
            SonicPulse
          </span>
        </a>
        <div className="hidden md:flex items-center gap-10">
          {["Lançamentos", "Artistas", "Playlists", "Sobre"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-muted-foreground hover:text-foreground transition-colors text-sm font-medium tracking-wide uppercase"
            >
              {item}
            </a>
          ))}
        </div>
        <a
          href="#player"
          className="bg-primary text-primary-foreground px-5 py-2 rounded-full text-sm font-semibold font-display hover:opacity-90 transition-opacity"
        >
          Ouvir Agora
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
