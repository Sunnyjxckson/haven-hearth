import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Sparkles } from "lucide-react";

const highlightsData: Record<string, { name: string }> = {
  "7": { name: "Community Highlights" },
  "8": { name: "Best of the Week" },
};

const mockHighlights = [
  {
    id: "1",
    title: "Welcome to our community!",
    preview: "An introduction to what we're building together...",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
  },
  {
    id: "2",
    title: "Top Discussion of the Week",
    preview: "The most engaging conversation from our members...",
    image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=300&fit=crop",
  },
  {
    id: "3",
    title: "Featured Creator Spotlight",
    preview: "Celebrating the amazing work of our community...",
    image: "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=400&h=300&fit=crop",
  },
  {
    id: "4",
    title: "Monthly Milestones",
    preview: "Looking back at what we achieved together...",
    image: "https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=400&h=300&fit=crop",
  },
];

export default function Highlights() {
  const { channelId } = useParams();
  const navigate = useNavigate();

  const highlights = highlightsData[channelId || ""] || { name: "Community Highlights" };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-background/80 backdrop-blur-md border-b border-border/50">
        <div className="flex items-center gap-3 px-4 h-16">
          <button
            onClick={() => navigate("/")}
            className="p-2.5 -ml-1 rounded-xl hover:bg-accent transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-foreground" />
          </button>
          <div className="flex items-center gap-2">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Sparkles className="w-4 h-4 text-primary" />
            </div>
            <h1 className="font-semibold text-foreground">{highlights.name}</h1>
          </div>
        </div>
      </header>

      {/* Highlights Grid */}
      <div className="flex-1 p-4">
        <h2 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-4">
          Community Highlights
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {mockHighlights.map((item) => (
            <div
              key={item.id}
              className="rounded-2xl overflow-hidden bg-card soft-shadow hover:shadow-md transition-shadow cursor-pointer"
            >
              <div className="aspect-video overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="font-medium text-foreground mb-1">{item.title}</h3>
                <p className="text-sm text-muted-foreground line-clamp-2">{item.preview}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
