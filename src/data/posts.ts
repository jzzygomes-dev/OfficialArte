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

/**
 * Auto-discover all article HTML files in src/content/posts/.
 * To add a new article, just:
 *   1. Add thumbnail to public/posts/{id}.jpg
 *   2. Create src/content/posts/{id}.html with <!--META {...} --> frontmatter
 * No need to edit any config file.
 */
const articleModules = import.meta.glob(
  "../content/posts/*.html",
  { query: "?raw", import: "default", eager: true }
) as Record<string, string>;

function parseFrontmatter(raw: string): { meta: Record<string, any>; content: string } {
  const match = raw.match(/<!--META\s*([\s\S]*?)-->/);
  if (!match) return { meta: {}, content: raw };
  const meta = JSON.parse(match[1]);
  const content = raw.slice(raw.indexOf("-->") + 3).trim();
  return { meta, content };
}

export const postsData: Post[] = Object.entries(articleModules)
  .map(([path, raw]) => {
    const { meta, content } = parseFrontmatter(raw);
    const filename = path.split("/").pop()?.replace(".html", "") || "";
    return {
      id: meta.id || filename,
      title: meta.title || "",
      category: meta.category || "",
      categoryType: meta.categoryType || "",
      image: `/posts/${meta.image || filename + ".jpg"}`,
      artist: meta.artist || "",
      genre: meta.genre || "",
      releaseDate: meta.releaseDate || "",
      duration: meta.duration || "",
      author: meta.author || "Redação",
      time: meta.time || "",
      description: content,
      downloadUrl: meta.downloadUrl || "#",
      tags: meta.tags || [],
    };
  })
  .sort((a, b) => Number(a.id) - Number(b.id));

export const getPostsByTag = (tag: string): Post[] => {
  return postsData.filter((p) => p.tags.includes(tag.toLowerCase()));
};

export const getPostById = (id: string): Post | undefined => {
  return postsData.find((p) => p.id === id);
};
