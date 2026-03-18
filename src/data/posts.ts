import news1 from "@/assets/news-1.jpg";
import news2 from "@/assets/news-2.jpg";
import news3 from "@/assets/news-3.jpg";
import news4 from "@/assets/news-4.jpg";
import news5 from "@/assets/news-5.jpg";
import news6 from "@/assets/news-6.jpg";

export interface Post {
  id: string;
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
  tags: string[];
}

export const postsData: Post[] = [
  {
    id: "1",
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
    description: "O mercado angolano acaba de ganhar mais um talentoso artista...",
    downloadUrl: "#",
    tags: ["lancamento", "musica"],
  },
  {
    id: "2",
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
    description: "Um espectáculo que ficará na memória de todos os presentes...",
    downloadUrl: "#",
    tags: ["fama"],
  },
  {
    id: "3",
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
    description: "O cantor angolano CEO da Ragazzo Records, Querido...",
    downloadUrl: "#",
    tags: ["lancamento", "musica"],
  },
  {
    id: "4",
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
    description: "Nas redes sociais, uma das cantoras mais populares...",
    downloadUrl: "#",
    tags: ["fama", "sociedade"],
  },
  {
    id: "5",
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
    description: "A dupla Querido e Tércio Santana está de volta...",
    downloadUrl: "#",
    tags: ["lancamento", "musica"],
  },
  {
    id: "6",
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
    description: "Um dos rappers mais promissores da nova geração angolana...",
    downloadUrl: "#",
    tags: ["fama", "entrevista"],
  },
];

export const getPostsByTag = (tag: string): Post[] => {
  return postsData.filter((p) => p.tags.includes(tag.toLowerCase()));
};

export const getPostById = (id: string): Post | undefined => {
  return postsData.find((p) => p.id === id);
};
