import { Clock } from "lucide-react";
import { Link } from "react-router-dom";
import news1 from "@/assets/news-1.jpg";
import news3 from "@/assets/news-3.jpg";
import news6 from "@/assets/news-6.jpg";

const latestNews = [
  {
    id: "1",
    image: news1,
    category: "LANÇAMENTO",
    title: "Hélio Farsante lança novo single 'Dançar Sozinho'",
    author: "Redação",
    time: "12:21",
    excerpt: "O mercado angolano acaba de ganhar mais um talentoso artista, Hélio Farsante, uma voz promissora da música nacional. A...",
  },
  {
    id: "3",
    image: news3,
    category: "LANÇAMENTO",
    title: "Querido presta homenagem aos ente queridos em \"Saudades\"",
    author: "Redação",
    time: "03:12",
    excerpt: "O cantor angolano CEO da Ragazzo Records, Querido, tem surpreendido os seus fãs com singles após singles. Antes que o a...",
  },
  {
    id: "5",
    image: news6,
    category: "LANÇAMENTO",
    title: "Querido & Tércio Santana voltam a impactar o mercado com novo videoclipe \"Drena\"",
    author: "Redação",
    time: "02:55",
    excerpt: "O cantor angolano CEO da Ragazzo Records, Querido, tem surpreendido os seus fãs com singles após singles. Antes que ...",
  },
];

const LatestNews = () => {
  return (
    <section className="container mx-auto py-6">
      <div className="flex items-center justify-between mb-5">
        <span className="section-title">ÚLTIMAS NOTÍCIAS</span>
        <a href="#" className="text-muted-foreground hover:text-primary text-sm font-medium transition-colors">
          Mostrar mais
        </a>
      </div>

      <div className="flex flex-col divide-y divide-border">
        {latestNews.map((news, i) => (
          <a href="#" key={i} className="group flex gap-4 py-4 first:pt-0 last:pb-0">
            <div className="flex-shrink-0 w-28 md:w-36 overflow-hidden rounded-sm">
              <img
                src={news.image}
                alt={news.title}
                className="w-full aspect-[4/3] object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="flex-1 min-w-0">
              <span className="category-badge-lancamento">{news.category}</span>
              <h3 className="font-display text-sm md:text-base font-bold text-foreground leading-snug mt-1.5 line-clamp-2">
                {news.title}
              </h3>
              <div className="flex items-center gap-2 mt-1 text-muted-foreground text-xs">
                <span>{news.author}</span>
                <Clock className="w-3 h-3" />
                <span>{news.time}</span>
              </div>
              <p className="text-muted-foreground text-xs mt-1.5 leading-relaxed line-clamp-2 hidden md:block">
                {news.excerpt}
              </p>
            </div>
          </a>
        ))}
      </div>

      <div className="flex justify-center mt-6">
        <button className="border border-primary text-primary px-6 py-2 rounded-sm text-sm font-display font-semibold uppercase tracking-wide hover:bg-primary hover:text-primary-foreground transition-colors">
          Carregar mais mensagens
        </button>
      </div>
    </section>
  );
};

export default LatestNews;
