import { Play } from "lucide-react";
import album1 from "@/assets/album-1.jpg";
import album2 from "@/assets/album-2.jpg";
import album3 from "@/assets/album-3.jpg";
import album4 from "@/assets/album-4.jpg";
import album5 from "@/assets/album-5.jpg";
import album6 from "@/assets/album-6.jpg";

const releases = [
  { title: "Prisma Noturno", artist: "KVLT", cover: album1, tag: "Novo" },
  { title: "Ouro Líquido", artist: "Aura Negra", cover: album2, tag: "Em Alta" },
  { title: "Neon Horizonte", artist: "Synthwave Collective", cover: album3, tag: "Destaque" },
  { title: "Fumaça Violeta", artist: "Luna Rave", cover: album4 },
  { title: "Cosmos", artist: "Nebula Sound", cover: album5 },
  { title: "Erro Digital", artist: "GLITCH", cover: album6, tag: "Exclusivo" },
];

const ReleasesGrid = () => {
  return (
    <section id="lançamentos" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="text-secondary text-sm uppercase tracking-[0.2em] font-body mb-2">
              Catálogo
            </p>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground">
              Lançamentos
            </h2>
          </div>
          <a
            href="#"
            className="text-muted-foreground hover:text-primary transition-colors text-sm font-medium hidden md:block"
          >
            Ver todos →
          </a>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {releases.map((release, i) => (
            <div
              key={i}
              className="group relative cursor-pointer"
            >
              <div className="relative overflow-hidden rounded-lg aspect-square">
                <img
                  src={release.cover}
                  alt={release.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-background/0 group-hover:bg-background/50 transition-all duration-300 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-primary rounded-full p-4">
                    <Play className="w-6 h-6 text-primary-foreground" fill="currentColor" />
                  </div>
                </div>
                {release.tag && (
                  <span className="absolute top-3 left-3 bg-secondary text-secondary-foreground text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                    {release.tag}
                  </span>
                )}
              </div>
              <div className="mt-3">
                <h3 className="font-display font-semibold text-foreground text-sm md:text-base">
                  {release.title}
                </h3>
                <p className="text-muted-foreground text-xs md:text-sm">
                  {release.artist}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReleasesGrid;
