import album1 from "@/assets/album-1.jpg";
import album4 from "@/assets/album-4.jpg";
import album5 from "@/assets/album-5.jpg";

const artists = [
  { name: "KVLT", genre: "Experimental Bass", image: album1, listeners: "1.2M" },
  { name: "Luna Rave", genre: "Dark Techno", image: album4, listeners: "890K" },
  { name: "Nebula Sound", genre: "Ambient / Downtempo", image: album5, listeners: "650K" },
];

const FeaturedArtists = () => {
  return (
    <section id="artistas" className="py-24 bg-muted/30">
      <div className="container mx-auto px-6">
        <p className="text-secondary text-sm uppercase tracking-[0.2em] font-body mb-2">
          Em Destaque
        </p>
        <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-12">
          Artistas
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          {artists.map((artist, i) => (
            <div
              key={i}
              className="group bg-card rounded-xl overflow-hidden cursor-pointer hover:shadow-[0_0_40px_hsl(265_89%_76%/0.15)] transition-shadow duration-500"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={artist.image}
                  alt={artist.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-5">
                <h3 className="font-display font-bold text-xl text-foreground mb-1">
                  {artist.name}
                </h3>
                <p className="text-muted-foreground text-sm mb-3">{artist.genre}</p>
                <div className="flex items-center justify-between">
                  <span className="text-secondary text-xs font-semibold uppercase tracking-wide">
                    {artist.listeners} ouvintes
                  </span>
                  <span className="text-muted-foreground text-xs hover:text-primary transition-colors">
                    Ver perfil →
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedArtists;
