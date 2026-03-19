import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Download, Share2, Facebook, Twitter, Send, Link as LinkIcon, Music, Calendar, User, Clock } from "lucide-react";
import { useState } from "react";
import NewsNavbar from "@/components/NewsNavbar";
import NewsFooter from "@/components/NewsFooter";
import { getPostById } from "@/data/posts";

const badgeClass = (type: string) => {
  if (type === "lancamento") return "category-badge-lancamento";
  if (type === "entrevista") return "category-badge-entrevista";
  return "category-badge-fama";
};

const PostDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [copied, setCopied] = useState(false);
  const post = getPostById(id || "1");

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
        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-4">
          <Link to="/" className="hover:text-primary transition-colors">Home</Link>
          <span>/</span>
          <span className="text-foreground">{post.category}</span>
        </div>

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

        <div className="relative overflow-hidden rounded-sm mb-6">
          <img src={post.image} alt={post.title} className="w-full aspect-video object-cover" />
        </div>

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

        {/* Article HTML content rendered from the .html file */}
        <div
          className="prose max-w-none mb-8 text-foreground/80 text-sm leading-relaxed font-body text-justify"
          dangerouslySetInnerHTML={{ __html: post.description }}
        />

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

        <div className="border-t border-border pt-6 mb-8">
          <h3 className="font-display text-sm font-bold uppercase tracking-wide text-foreground mb-3 flex items-center gap-2">
            <Share2 className="w-4 h-4" /> Partilhar nas Redes Sociais
          </h3>
          <div className="flex flex-wrap gap-2">
            <button onClick={() => handleShare("facebook")} className="flex items-center gap-2 bg-[hsl(220,46%,48%)] text-white px-4 py-2.5 rounded-sm text-xs font-semibold hover:opacity-90 transition-opacity">
              <Facebook className="w-4 h-4" /> Facebook
            </button>
            <button onClick={() => handleShare("twitter")} className="flex items-center gap-2 bg-[hsl(203,89%,53%)] text-white px-4 py-2.5 rounded-sm text-xs font-semibold hover:opacity-90 transition-opacity">
              <Twitter className="w-4 h-4" /> Twitter
            </button>
            <button onClick={() => handleShare("whatsapp")} className="flex items-center gap-2 bg-[hsl(142,70%,40%)] text-white px-4 py-2.5 rounded-sm text-xs font-semibold hover:opacity-90 transition-opacity">
              <Send className="w-4 h-4" /> WhatsApp
            </button>
            <button onClick={handleCopyLink} className="flex items-center gap-2 bg-accent text-accent-foreground px-4 py-2.5 rounded-sm text-xs font-semibold hover:opacity-90 transition-opacity">
              <LinkIcon className="w-4 h-4" /> {copied ? "Link copiado!" : "Copiar Link"}
            </button>
          </div>
        </div>

        <Link to="/" className="inline-flex items-center gap-2 text-primary hover:underline text-sm font-semibold">
          <ArrowLeft className="w-4 h-4" /> Voltar às notícias
        </Link>
      </article>

      <NewsFooter />
    </div>
  );
};

export default PostDetail;
