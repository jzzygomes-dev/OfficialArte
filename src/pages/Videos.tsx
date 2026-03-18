import { Video, Headphones } from "lucide-react";
import NewsNavbar from "@/components/NewsNavbar";
import NewsFooter from "@/components/NewsFooter";

const Videos = () => {
  return (
    <div className="min-h-screen bg-background">
      <NewsNavbar />
      <div className="container mx-auto py-16 px-4 text-center">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Video className="w-8 h-8 text-primary" />
          <Headphones className="w-8 h-8 text-primary" />
        </div>
        <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
          Vídeos & Podcasts
        </h1>
        <p className="text-muted-foreground max-w-md mx-auto mb-8">
          Em breve terás acesso a vídeos exclusivos, entrevistas em vídeo e os melhores podcasts sobre a cena musical angolana.
        </p>
        <div className="inline-block bg-accent text-accent-foreground px-6 py-3 rounded-sm font-display font-semibold text-sm uppercase tracking-wide">
          Em breve
        </div>
      </div>
      <NewsFooter />
    </div>
  );
};

export default Videos;
