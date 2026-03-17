import NewsNavbar from "@/components/NewsNavbar";
import NewsFooter from "@/components/NewsFooter";
import logoF from "@/assets/oa-logo-f.png";

const Sobre = () => {
  return (
    <div className="min-h-screen bg-background">
      <NewsNavbar />
      <main className="container mx-auto px-4 py-12 max-w-3xl">
        <h1 className="font-display text-3xl md:text-4xl font-extrabold text-foreground uppercase mb-6">
          Sobre Nós
        </h1>

        <div className="flex justify-center mb-8">
          <img src={logoF} alt="Official Arte Entretenimento" className="h-28 w-auto" />
        </div>

        <div className="space-y-4 text-foreground/80 text-sm leading-relaxed font-body">
          <p>
            A <strong className="text-primary">Official Arte Entretenimento</strong> é uma plataforma de divulgação musical dedicada a promover artistas, lançamentos e eventos do cenário musical angolano e lusófono.
          </p>
          <p>
            Fundada com a missão de dar visibilidade à cultura musical africana, a nossa plataforma cobre notícias, entrevistas exclusivas, lançamentos de singles e álbuns, e os eventos mais quentes do mundo da música.
          </p>
          <p>
            Acreditamos no poder da música como instrumento de transformação social e cultural. Por isso, trabalhamos diariamente para trazer ao nosso público o melhor conteúdo sobre o universo musical, sempre com profissionalismo e paixão.
          </p>
          <p>
            A nossa equipa é composta por jornalistas, produtores de conteúdo e amantes da música que partilham o mesmo objectivo: conectar artistas ao mundo.
          </p>
        </div>

        <div className="mt-10 p-6 bg-accent rounded-lg">
          <h2 className="font-display text-lg font-bold text-primary uppercase mb-3">A Nossa Missão</h2>
          <p className="text-accent-foreground/80 text-sm font-body">
            Promover e divulgar a música angolana e lusófona, dando voz a artistas emergentes e consolidados, através de conteúdo editorial de qualidade.
          </p>
        </div>
      </main>
      <NewsFooter />
    </div>
  );
};

export default Sobre;
