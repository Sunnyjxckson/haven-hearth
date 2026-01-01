import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Image as ImageIcon } from "lucide-react";

const galleryData: Record<string, { name: string }> = {
  "7": { name: "Gallery" },
  "8": { name: "Inspiration" },
};

const mockImages = [
  "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=400&h=400&fit=crop",
];

export default function MediaGallery() {
  const { channelId } = useParams();
  const navigate = useNavigate();

  const gallery = galleryData[channelId || ""] || { name: "Gallery" };

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
            <div className="p-2 bg-muted/50 rounded-lg">
              <ImageIcon className="w-4 h-4 text-muted-foreground" />
            </div>
            <h1 className="font-semibold text-foreground">{gallery.name}</h1>
          </div>
        </div>
      </header>

      {/* Gallery Grid */}
      <div className="flex-1 p-4">
        <h2 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-4">
          Community Highlights
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {mockImages.map((src, index) => (
            <div
              key={index}
              className="aspect-square rounded-2xl overflow-hidden bg-muted cursor-pointer hover:opacity-90 transition-opacity"
            >
              <img
                src={src}
                alt={`Gallery item ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
