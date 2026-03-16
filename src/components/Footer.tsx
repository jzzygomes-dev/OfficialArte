import { Music2 } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border/50 py-12 pb-24">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <Music2 className="w-5 h-5 text-primary" />
            <span className="font-display font-bold text-foreground">SonicPulse</span>
          </div>
          <div className="flex items-center gap-8 text-muted-foreground text-sm">
            <a href="#" className="hover:text-foreground transition-colors">Termos</a>
            <a href="#" className="hover:text-foreground transition-colors">Privacidade</a>
            <a href="#" className="hover:text-foreground transition-colors">Contato</a>
          </div>
          <p className="text-muted-foreground text-xs">
            © 2026 SonicPulse. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
