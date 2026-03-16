import { Play } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroBg})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/40 to-background" />

      <div className="relative z-10 container mx-auto px-6 text-center">
        <p className="text-secondary font-body text-sm uppercase tracking-[0.3em] mb-6 animate-fade-in-up">
          ✦ Novo Lançamento
        </p>
        <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-extrabold text-foreground leading-[0.95] mb-6 animate-fade-in-up-delay-1">
          Sinta a<br />
          <span className="text-primary">Frequência</span>
        </h1>
        <p className="text-muted-foreground text-lg md:text-xl max-w-xl mx-auto mb-10 font-body animate-fade-in-up-delay-2">
          Descubra os sons que estão moldando o futuro da música. Novos artistas, novos ritmos, nova era.
        </p>
        <div className="flex items-center justify-center gap-4 animate-fade-in-up-delay-2">
          <button className="bg-primary text-primary-foreground px-8 py-4 rounded-full font-display font-bold text-lg flex items-center gap-3 hover:opacity-90 transition-all animate-pulse-glow">
            <Play className="w-5 h-5" fill="currentColor" />
            Reproduzir
          </button>
          <button className="border border-foreground/20 text-foreground px-8 py-4 rounded-full font-display font-semibold text-lg hover:bg-foreground/5 transition-all">
            Explorar
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
