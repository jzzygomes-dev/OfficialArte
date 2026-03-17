import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Download, Share2, Facebook, Twitter, Send, Link as LinkIcon, Music, Calendar, User, Clock } from "lucide-react";
import { useState } from "react";
import NewsNavbar from "@/components/NewsNavbar";
import NewsFooter from "@/components/NewsFooter";
import news1 from "@/assets/news-1.jpg";
import news2 from "@/assets/news-2.jpg";
import news3 from "@/assets/news-3.jpg";
import news4 from "@/assets/news-4.jpg";
import news5 from "@/assets/news-5.jpg";
import news6 from "@/assets/news-6.jpg";

const postsData: Record<string, {
  title: string;
  category: string;
  categoryType: string;
  image: string;
  artist: string;
  genre: string;
  releaseDate: string;
  duration: string;
  author: string;
  time: string;
  description: string;
  downloadUrl: string;
}> = {
  "1": {
    title: "Hélio Farsante lança novo single 'Dançar Sozinho'",
    category: "LANÇAMENTO",
    categoryType: "lancamento",
    image: news1,
    artist: "Hélio Farsante",
    genre: "Afrobeat / Kuduro",
    releaseDate: "15 de Março, 2026",
    duration: "3:45",
    author: "Redação",
    time: "12:21",
    description: `O mercado angolano acaba de ganhar mais um talentoso artista, Hélio Farsante, uma voz promissora da música nacional. Após meses no backstage a aperfeiçoar o seu som, o jovem cantor decidiu dar o grande passo com o lançamento do single "Dançar Sozinho".

A faixa combina elementos de afrobeat contemporâneo com batidas tradicionais de kuduro, criando uma sonoridade única que promete conquistar as pistas de dança de Luanda e além. A produção ficou a cargo de um dos mais requisitados beatmakers do país, que soube captar a essência artística de Hélio.

"Dançar Sozinho" fala sobre a liberdade de se expressar através da dança, mesmo quando estamos sozinhos. É uma mensagem de autoconfiança e celebração da individualidade que ressoa com a juventude angolana.

O videoclipe, filmado em locações icónicas de Luanda, apresenta uma cinematografia de alta qualidade e coreografias envolventes que complementam perfeitamente a energia contagiante da música.`,
    downloadUrl: "#",
  },
  "2": {
    title: "Artista protagoniza espectáculo memorável no Centro Cultural",
    category: "FAMA",
    categoryType: "fama",
    image: news5,
    artist: "Artista Nacional",
    genre: "Semba / Kizomba",
    releaseDate: "02 de Novembro, 2025",
    duration: "4:12",
    author: "Redação",
    time: "14:30",
    description: `Um espectáculo que ficará na memória de todos os presentes. O artista subiu ao palco do Centro Cultural e proporcionou uma noite inesquecível, repleta de energia, emoção e muita música boa.

Com um repertório que misturou os seus maiores sucessos com faixas inéditas do novo álbum, o concerto durou mais de duas horas e contou com a participação especial de vários artistas convidados.

O público, que esgotou a lotação do espaço, não parou de dançar e cantar do início ao fim. A produção do evento esteve impecável, com um sistema de som de última geração e um jogo de luzes que elevou a experiência a outro nível.

Este espectáculo confirma a posição do artista como um dos maiores nomes da música angolana contemporânea.`,
    downloadUrl: "#",
  },
  "3": {
    title: "Querido presta homenagem aos entes queridos em 'Saudades'",
    category: "LANÇAMENTO",
    categoryType: "lancamento",
    image: news3,
    artist: "Querido",
    genre: "R&B / Soul Angolano",
    releaseDate: "12 de Outubro, 2025",
    duration: "4:30",
    author: "Redação",
    time: "03:12",
    description: `O cantor angolano CEO da Ragazzo Records, Querido, tem surpreendido os seus fãs com singles após singles. Desta vez, o artista traz uma faixa profundamente emocional intitulada "Saudades".

A canção é uma homenagem sentida a todos aqueles que já partiram mas continuam presentes nos nossos corações. Com uma melodia suave e uma letra tocante, "Saudades" promete arrancar lágrimas aos ouvintes mais sensíveis.

A produção musical combina elementos de R&B contemporâneo com sonoridades tradicionais angolanas, criando uma atmosfera intimista e envolvente. A voz de Querido, sempre emotiva, encontra nesta faixa o cenário perfeito para brilhar.

O videoclipe acompanha a mesma linha emocional, com imagens que retratam momentos de nostalgia e celebração da vida.`,
    downloadUrl: "#",
  },
  "4": {
    title: "Cantora expressa carinho por colega de profissão: 'gosto de ti'",
    category: "FAMA",
    categoryType: "fama",
    image: news2,
    artist: "Cantora Nacional",
    genre: "Pop Angolano",
    releaseDate: "01 de Novembro, 2025",
    duration: "—",
    author: "Redação",
    time: "10:45",
    description: `Nas redes sociais, uma das cantoras mais populares de Angola surpreendeu os fãs ao expressar publicamente o seu carinho por uma colega de profissão, numa mensagem que rapidamente se tornou viral.

A publicação, feita através do Instagram, veio acompanhada de uma fotografia das duas artistas juntas, com a legenda "gosto de ti" seguida de emojis de coração. Os fãs reagiram com entusiasmo, pedindo uma colaboração musical entre as duas.

Este gesto de carinho entre artistas reforça a importância da união e do apoio mútuo no mercado musical angolano, que muitas vezes é marcado por rivalidades e competição.

Ambas as artistas são reconhecidas pelo seu talento e pela contribuição significativa para a música angolana contemporânea.`,
    downloadUrl: "#",
  },
  "5": {
    title: "Querido & Tércio Santana voltam a impactar o mercado com novo videoclipe 'Drena'",
    category: "LANÇAMENTO",
    categoryType: "lancamento",
    image: news6,
    artist: "Querido & Tércio Santana",
    genre: "Afro Pop",
    releaseDate: "10 de Setembro, 2025",
    duration: "3:58",
    author: "Redação",
    time: "02:55",
    description: `A dupla Querido e Tércio Santana está de volta com mais um trabalho que promete agitar o mercado musical angolano. O novo videoclipe "Drena" já está disponível em todas as plataformas digitais.

A faixa traz uma fusão irresistível de Afro Pop com elementos contemporâneos, mantendo a identidade sonora que tornou a parceria entre os dois artistas num verdadeiro sucesso comercial e artístico.

O videoclipe foi gravado em cenários deslumbrantes e conta com uma produção visual de alto nível, com coreografias dinâmicas e uma narrativa visual que complementa a energia contagiante da música.

"Drena" reforça a química musical entre Querido e Tércio Santana e promete ser mais um hit nas rádios e plataformas de streaming em Angola e nos mercados lusófonos.`,
    downloadUrl: "#",
  },
  "6": {
    title: "Rapper presta homenagem ao ídolo: 'A ideia é ser referência'",
    category: "FAMA",
    categoryType: "fama",
    image: news4,
    artist: "Rapper Nacional",
    genre: "Hip Hop / Rap",
    releaseDate: "31 de Outubro, 2025",
    duration: "—",
    author: "Redação",
    time: "08:20",
    description: `Um dos rappers mais promissores da nova geração angolana prestou uma emocionante homenagem ao seu ídolo musical, revelando que a sua maior ambição é tornar-se uma referência para as futuras gerações.

Em entrevista exclusiva, o artista partilhou a história de como descobriu o hip hop e como o trabalho do seu ídolo influenciou directamente o seu percurso artístico. "Desde miúdo que ouço as suas músicas. Ele mostrou-me que é possível fazer rap em Angola e ser respeitado", revelou.

O rapper também falou sobre os seus próximos projectos, que incluem um álbum de estreia previsto para o início de 2026 e uma série de concertos em várias províncias do país.

Com uma lírica afiada e um flow único, o jovem artista tem conquistado cada vez mais fãs e o reconhecimento da crítica especializada.`,
    downloadUrl: "#",
  },
};

const badgeClass = (type: string) => {
  if (type === "lancamento") return "category-badge-lancamento";
  if (type === "entrevista") return "category-badge-entrevista";
  return "category-badge-fama";
};

const PostDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [copied, setCopied] = useState(false);
  const post = postsData[id || "1"];

  if (!post) {
    return (
      <div className="min-h-screen bg-background">
        <NewsNavbar />
        <div className="container mx-auto py-20 text-center">
          <h1 className="font-display text-2xl font-bold text-foreground">Publicação não encontrada</h1>
          <Link to="/" className="text-primary hover:underline mt-4 inline-block">Voltar à página inicial</Link>
        </div>
        <NewsFooter />
      </div>
    );
  }

  const pageUrl = typeof window !== "undefined" ? window.location.href : "";

  const handleShare = (platform: string) => {
    const encodedUrl = encodeURIComponent(pageUrl);
    const encodedTitle = encodeURIComponent(post.title);
    const urls: Record<string, string> = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
      whatsapp: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
    };
    if (urls[platform]) window.open(urls[platform], "_blank", "noopener,noreferrer");
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(pageUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-background">
      <NewsNavbar />

      <article className="container mx-auto py-6 px-4">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-4">
          <Link to="/" className="hover:text-primary transition-colors">Home</Link>
          <span>/</span>
          <span className="text-foreground">{post.category}</span>
        </div>

        {/* Header */}
        <header className="mb-6">
          <span className={badgeClass(post.categoryType)}>{post.category}</span>
          <h1 className="font-display text-2xl md:text-4xl font-bold text-foreground leading-tight mt-3">
            {post.title}
          </h1>
          <div className="flex items-center gap-3 mt-3 text-muted-foreground text-xs">
            <span className="flex items-center gap-1"><User className="w-3 h-3" /> {post.author}</span>
            <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {post.time}</span>
            <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {post.releaseDate}</span>
          </div>
        </header>

        {/* Cover Image */}
        <div className="relative overflow-hidden rounded-sm mb-6">
          <img
            src={post.image}
            alt={post.title}
            className="w-full aspect-video object-cover"
          />
        </div>

        {/* Music Details Card */}
        <div className="bg-muted rounded-sm p-4 md:p-6 mb-6">
          <h2 className="font-display text-lg font-bold text-foreground mb-3 flex items-center gap-2">
            <Music className="w-5 h-5 text-primary" /> Detalhes da Música
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <span className="text-muted-foreground text-xs uppercase tracking-wide">Artista</span>
              <p className="font-semibold text-foreground mt-0.5">{post.artist}</p>
            </div>
            <div>
              <span className="text-muted-foreground text-xs uppercase tracking-wide">Género</span>
              <p className="font-semibold text-foreground mt-0.5">{post.genre}</p>
            </div>
            <div>
              <span className="text-muted-foreground text-xs uppercase tracking-wide">Lançamento</span>
              <p className="font-semibold text-foreground mt-0.5">{post.releaseDate}</p>
            </div>
            <div>
              <span className="text-muted-foreground text-xs uppercase tracking-wide">Duração</span>
              <p className="font-semibold text-foreground mt-0.5">{post.duration}</p>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="prose max-w-none mb-8">
          <div className="text-foreground/80 text-sm leading-relaxed font-body text-justify whitespace-pre-line">
            {post.description}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 mb-8">
          <a
            href={post.downloadUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-sm font-display font-semibold uppercase tracking-wide text-sm hover:bg-primary/90 transition-colors"
          >
            <Download className="w-4 h-4" /> Baixar Música
          </a>
        </div>

        {/* Share */}
        <div className="border-t border-border pt-6 mb-8">
          <h3 className="font-display text-sm font-bold uppercase tracking-wide text-foreground mb-3 flex items-center gap-2">
            <Share2 className="w-4 h-4" /> Partilhar nas Redes Sociais
          </h3>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => handleShare("facebook")}
              className="flex items-center gap-2 bg-[hsl(220,46%,48%)] text-white px-4 py-2.5 rounded-sm text-xs font-semibold hover:opacity-90 transition-opacity"
            >
              <Facebook className="w-4 h-4" /> Facebook
            </button>
            <button
              onClick={() => handleShare("twitter")}
              className="flex items-center gap-2 bg-[hsl(203,89%,53%)] text-white px-4 py-2.5 rounded-sm text-xs font-semibold hover:opacity-90 transition-opacity"
            >
              <Twitter className="w-4 h-4" /> Twitter
            </button>
            <button
              onClick={() => handleShare("whatsapp")}
              className="flex items-center gap-2 bg-[hsl(142,70%,40%)] text-white px-4 py-2.5 rounded-sm text-xs font-semibold hover:opacity-90 transition-opacity"
            >
              <Send className="w-4 h-4" /> WhatsApp
            </button>
            <button
              onClick={handleCopyLink}
              className="flex items-center gap-2 bg-accent text-accent-foreground px-4 py-2.5 rounded-sm text-xs font-semibold hover:opacity-90 transition-opacity"
            >
              <LinkIcon className="w-4 h-4" /> {copied ? "Link copiado!" : "Copiar Link"}
            </button>
          </div>
        </div>

        {/* Back */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-primary hover:underline text-sm font-semibold"
        >
          <ArrowLeft className="w-4 h-4" /> Voltar às notícias
        </Link>
      </article>

      <NewsFooter />
    </div>
  );
};

export default PostDetail;
