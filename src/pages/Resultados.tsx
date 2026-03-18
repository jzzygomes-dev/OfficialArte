import { useSearchParams, Link } from "react-router-dom";
import { Clock, ArrowLeft } from "lucide-react";
import NewsNavbar from "@/components/NewsNavbar";
import NewsFooter from "@/components/NewsFooter";
import { getPostsByTag } from "@/data/posts";

const tagLabels: Record<string, string> = {
  lancamento: "Lançamentos",
  fama: "Fama",
  entrevista: "Entrevistas",
  sociedade: "Sociedade",
  musica: "Música",
};

const badgeClass = (type: string) => {
  if (type === "lancamento") return "category-badge-lancamento";
  if (type === "entrevista") return "category-badge-entrevista";
  return "category-badge-fama";
};

const Resultados = () => {
  const [searchParams] = useSearchParams();
  const tag = searchParams.get("tag") || "";
  const posts = getPostsByTag(tag);
  const label = tagLabels[tag] || tag;

  return (
    <div className="min-h-screen bg-background">
      <NewsNavbar />
      <div className="container mx-auto py-8 px-4">
        <div className="flex items-center gap-3 mb-6">
          <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground">
            {label}
          </h1>
          <span className="text-muted-foreground text-sm">({posts.length} resultados)</span>
        </div>

        {posts.length === 0 ? (
          <p className="text-muted-foreground text-center py-16">
            Nenhum resultado encontrado para "{label}".
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <Link
                to={`/post/${post.id}`}
                key={post.id}
                className="group block"
              >
                <div className="relative overflow-hidden rounded-sm">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full aspect-[4/3] object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute bottom-0 left-0">
                    <span className={badgeClass(post.categoryType)}>
                      {post.category}
                    </span>
                  </div>
                </div>
                <h3 className="font-display text-sm md:text-base font-bold text-foreground leading-snug mt-2 line-clamp-2">
                  {post.title}
                </h3>
                <div className="flex items-center gap-2 mt-1 text-muted-foreground text-xs">
                  <span>{post.author}</span>
                  <Clock className="w-3 h-3" />
                  <span>{post.releaseDate}</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
      <NewsFooter />
    </div>
  );
};

export default Resultados;
