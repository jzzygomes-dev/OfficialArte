import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ReleasesGrid from "@/components/ReleasesGrid";
import FeaturedArtists from "@/components/FeaturedArtists";
import StickyPlayer from "@/components/StickyPlayer";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <ReleasesGrid />
      <FeaturedArtists />
      <Footer />
      <StickyPlayer />
    </div>
  );
};

export default Index;
