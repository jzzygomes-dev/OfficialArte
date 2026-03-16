import NewsNavbar from "@/components/NewsNavbar";
import HeroArticle from "@/components/HeroArticle";
import CategoryGrid from "@/components/CategoryGrid";
import LatestNews from "@/components/LatestNews";
import CategoriesFooter from "@/components/CategoriesFooter";
import NewsFooter from "@/components/NewsFooter";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <NewsNavbar />
      <HeroArticle />
      <CategoryGrid />
      <LatestNews />
      <CategoriesFooter />
      <NewsFooter />
    </div>
  );
};

export default Index;
