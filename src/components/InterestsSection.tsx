import { useMemo } from "react";
import { Link } from "react-router-dom";
import { Clock } from "lucide-react";
import { postsData } from "@/data/posts";

const InterestsSection = () => {
  const randomPosts = useMemo(() => {
    const shuffled = [...postsData].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 15);
  }, []);

  return (
    <section className="container mx-auto px-4 py-8">
      <span className="section-title mb-4">INTERESSES</span>
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {randomPosts.map((post) => (
          <Link
            key={post.id}
            to={`/post/${post.id}`}
            className="group flex gap-3 p-3 rounded-lg hover:bg-muted transition-colors"
          >
            <img
              src={post.image}
              alt={post.title}
              className="w-20 h-20 rounded-md object-cover flex-shrink-0"
            />
            <div className="flex flex-col justify-center min-w-0">
              <span className="text-[10px] font-bold uppercase tracking-wider text-primary font-display">
                {post.category}
              </span>
              <h3 className="text-sm font-semibold text-foreground leading-snug line-clamp-2 group-hover:text-primary transition-colors font-body">
                {post.title}
              </h3>
              <div className="flex items-center gap-2 mt-1 text-muted-foreground text-xs font-body">
                <span>{post.author}</span>
                <span className="flex items-center gap-0.5">
                  <Clock className="w-3 h-3" /> {post.time}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default InterestsSection;
