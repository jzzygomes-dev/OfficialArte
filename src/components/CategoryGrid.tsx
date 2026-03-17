import { Clock } from "lucide-react";
import { Link } from "react-router-dom";
import news1 from "@/assets/news-1.jpg";
import news2 from "@/assets/news-2.jpg";
import news3 from "@/assets/news-3.jpg";
import news4 from "@/assets/news-4.jpg";
import news5 from "@/assets/news-5.jpg";

interface Article {
  image: string;
  title: string;
  category: string;
  categoryType: "fama" | "lancamento" | "entrevista";
  author: string;
  date: string;
}

const articles: Article[] = [
  {
    image: news5,
    title: "Artista protagoniza espectáculo memorável no Centro Cultural",
    category: "FAMA",
    categoryType: "fama",
    author: "Redação",
    date: "Novembro 02, 2025",
  },
  {
    image: news2,
    title: "Cantora expressa carinho por colega de profissão: \"gosto de ti\"",
    category: "FAMA",
    categoryType: "fama",
    author: "Redação",
    date: "Novembro 01, 2025",
  },
  {
    image: news4,
    title: "Rapper presta homenagem ao ídolo: \"A ideia é ser referência\"",
    category: "FAMA",
    categoryType: "fama",
    author: "Redação",
    date: "Outubro 31, 2025",
  },
  {
    image: news3,
    title: "Produtor destaca mestria na composição do seu novo single",
    category: "ENTREVISTA",
    categoryType: "entrevista",
    author: "Redação",
    date: "Setembro 26, 2025",
  },
  {
    image: news1,
    title: "Jovem cantor pede desculpas à artista após afirmar que namorou com a cantora",
    category: "FAMA",
    categoryType: "fama",
    author: "Redação",
    date: "Setembro 23, 2025",
  },
];

const badgeClass = (type: string) => {
  if (type === "lancamento") return "category-badge-lancamento";
  if (type === "entrevista") return "category-badge-entrevista";
  return "category-badge-fama";
};

const CategoryGrid = () => {
  return (
    <section id="fama" className="container mx-auto py-6">
      <div className="flex justify-center mb-6">
        <span className="section-title">FAMA</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr] gap-4">
        {/* Large featured */}
        <Link to="/post/2" className="group block">
          <div className="relative overflow-hidden rounded-sm">
            <img
              src={articles[0].image}
              alt={articles[0].title}
              className="w-full aspect-[4/3] object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute bottom-0 left-0">
              <span className={badgeClass(articles[0].categoryType)}>
                {articles[0].category}
              </span>
            </div>
          </div>
          <h3 className="font-display text-base md:text-lg font-bold text-foreground leading-snug mt-2">
            {articles[0].title}
          </h3>
          <div className="flex items-center gap-2 mt-1 text-muted-foreground text-xs">
            <span>{articles[0].author}</span>
            <Clock className="w-3 h-3" />
            <span>{articles[0].date}</span>
          </div>
        </Link>

        {/* Small grid */}
        <div className="grid grid-cols-2 gap-3">
          {articles.slice(1).map((article, i) => (
            <Link to={`/post/${i + 4}`} key={i} className="group block">
              <div className="relative overflow-hidden rounded-sm">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full aspect-square object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute bottom-0 left-0">
                  <span className={badgeClass(article.categoryType)}>
                    {article.category}
                  </span>
                </div>
              </div>
              <h4 className="font-display text-xs md:text-sm font-bold text-foreground leading-snug mt-1.5 line-clamp-3">
                {article.title}
              </h4>
              <div className="flex items-center gap-1 mt-1 text-muted-foreground text-[10px]">
                <span>{article.author}</span>
                <Clock className="w-2.5 h-2.5" />
                <span>{article.date}</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryGrid;
