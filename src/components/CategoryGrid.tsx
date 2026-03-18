import { Clock, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useRef, useState, useCallback, useEffect } from "react";
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
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 4);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    checkScroll();
    el.addEventListener("scroll", checkScroll, { passive: true });
    return () => el.removeEventListener("scroll", checkScroll);
  }, [checkScroll]);

  const scroll = (dir: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const amount = el.clientWidth * 0.75;
    el.scrollBy({ left: dir === "left" ? -amount : amount, behavior: "smooth" });
  };

  return (
    <section id="fama" className="container mx-auto py-6">
      <div className="flex items-center justify-between mb-6">
        <span className="section-title">FAMA</span>
        <div className="flex gap-1.5">
          <button
            onClick={() => scroll("left")}
            disabled={!canScrollLeft}
            className="w-8 h-8 rounded-full border border-border flex items-center justify-center text-foreground hover:bg-muted transition-colors disabled:opacity-30 disabled:cursor-default"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => scroll("right")}
            disabled={!canScrollRight}
            className="w-8 h-8 rounded-full border border-border flex items-center justify-center text-foreground hover:bg-muted transition-colors disabled:opacity-30 disabled:cursor-default"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory -mx-4 px-4"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {articles.map((article, i) => (
          <Link
            to={`/post/${i + 2}`}
            key={i}
            className="group block flex-shrink-0 w-[70vw] md:w-[45%] lg:w-[30%] snap-start"
          >
            <div className="relative overflow-hidden rounded-sm">
              <img
                src={article.image}
                alt={article.title}
                className="w-full aspect-[4/3] object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute bottom-0 left-0">
                <span className={badgeClass(article.categoryType)}>
                  {article.category}
                </span>
              </div>
            </div>
            <h3 className="font-display text-sm md:text-base font-bold text-foreground leading-snug mt-2 line-clamp-2">
              {article.title}
            </h3>
            <div className="flex items-center gap-2 mt-1 text-muted-foreground text-xs">
              <span>{article.author}</span>
              <Clock className="w-3 h-3" />
              <span>{article.date}</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default CategoryGrid;
