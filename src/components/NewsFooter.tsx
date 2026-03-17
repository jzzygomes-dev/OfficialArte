import { Link } from "react-router-dom";
import logoF from "@/assets/oa-logo-f.png";

const NewsFooter = () => {
  return (
    <footer className="bg-accent text-accent-foreground py-8 mt-8">
      <div className="container mx-auto flex flex-col items-center gap-5">
        <Link to="/">
          <img src={logoF} alt="Official Arte Entretenimento" className="h-16 w-auto" />
        </Link>

        <div className="flex flex-wrap justify-center gap-4 text-xs font-display font-semibold uppercase tracking-wide">
          <Link to="/sobre" className="text-accent-foreground/70 hover:text-primary transition-colors">Sobre</Link>
          <Link to="/equipe" className="text-accent-foreground/70 hover:text-primary transition-colors">Nossa Equipe</Link>
          <Link to="/contacto" className="text-accent-foreground/70 hover:text-primary transition-colors">Contacto</Link>
          <Link to="/privacidade" className="text-accent-foreground/70 hover:text-primary transition-colors">Privacidade</Link>
          <Link to="/termos" className="text-accent-foreground/70 hover:text-primary transition-colors">Termos de Uso</Link>
        </div>

        <p className="text-accent-foreground/60 text-xs">
          © 2026 Official Arte Entretenimento. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
};

export default NewsFooter;
