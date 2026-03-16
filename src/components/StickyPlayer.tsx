import { Play, SkipBack, SkipForward, Volume2 } from "lucide-react";
import album3 from "@/assets/album-3.jpg";

const StickyPlayer = () => {
  return (
    <div
      id="player"
      className="fixed bottom-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-xl border-t border-border/50"
    >
      <div className="h-0.5 bg-muted">
        <div className="h-full w-1/3 bg-gradient-to-r from-primary to-secondary rounded-full" />
      </div>
      <div className="container mx-auto px-6 py-3 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 min-w-0 flex-1">
          <img
            src={album3}
            alt="Now playing"
            className="w-10 h-10 rounded-md object-cover flex-shrink-0"
          />
          <div className="min-w-0">
            <p className="font-display font-semibold text-foreground text-sm truncate">
              Neon Horizonte
            </p>
            <p className="text-muted-foreground text-xs truncate">
              Synthwave Collective
            </p>
          </div>
        </div>

        <div className="flex items-center gap-5">
          <button className="text-muted-foreground hover:text-foreground transition-colors">
            <SkipBack className="w-4 h-4" />
          </button>
          <button className="bg-primary text-primary-foreground rounded-full p-2.5 hover:opacity-90 transition-opacity">
            <Play className="w-4 h-4" fill="currentColor" />
          </button>
          <button className="text-muted-foreground hover:text-foreground transition-colors">
            <SkipForward className="w-4 h-4" />
          </button>
        </div>

        <div className="hidden md:flex items-center gap-2 flex-1 justify-end">
          <Volume2 className="w-4 h-4 text-muted-foreground" />
          <div className="w-24 h-1 bg-muted rounded-full">
            <div className="w-2/3 h-full bg-primary rounded-full" />
          </div>
          <span className="text-muted-foreground text-xs ml-2">1:24 / 3:47</span>
        </div>
      </div>
    </div>
  );
};

export default StickyPlayer;
