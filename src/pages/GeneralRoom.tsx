import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Plus, MessageCircle } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/Avatar";

interface Post {
  id: string;
  title: string;
  preview: string;
  author: {
    name: string;
    avatar?: string;
  };
  timestamp: string;
  replies: number;
}

const roomData: Record<string, { name: string; description: string }> = {
  "1": {
    name: "Announcements",
    description: "Important updates and news from the community",
  },
};

const mockPosts: Post[] = [
  {
    id: "p1",
    title: "Welcome to The Haven Community! 🎉",
    preview: "We're so excited to have you here. This is a space for meaningful connections and thoughtful conversations...",
    author: { name: "Sarah Chen", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop" },
    timestamp: "2 days ago",
    replies: 24,
  },
  {
    id: "p2",
    title: "Community Guidelines Update",
    preview: "We've updated our community guidelines to ensure everyone feels safe and welcome. Please take a moment to read through...",
    author: { name: "Alex Rivera", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop" },
    timestamp: "1 week ago",
    replies: 8,
  },
  {
    id: "p3",
    title: "New Voice Rooms Feature Now Live!",
    preview: "You can now join voice rooms directly from the sidebar. Drop in anytime for casual conversations...",
    author: { name: "Community Team" },
    timestamp: "2 weeks ago",
    replies: 42,
  },
];

export default function GeneralRoom() {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const [posts] = useState<Post[]>(mockPosts);

  const room = roomData[roomId || ""] || { name: "Discussion", description: "Share your thoughts with the community" };

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
          <div className="flex-1">
            <h1 className="font-semibold text-foreground">{room.name}</h1>
            <p className="text-xs text-muted-foreground truncate">{room.description}</p>
          </div>
        </div>
      </header>

      {/* Posts */}
      <div className="flex-1 p-4 space-y-3">
        {posts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No posts yet. Be the first to share!</p>
          </div>
        ) : (
          posts.map((post) => (
            <article
              key={post.id}
              className="bg-card rounded-2xl p-4 soft-shadow cursor-pointer hover:bg-accent/30 transition-colors"
            >
              <div className="flex items-start gap-3">
                <Avatar size="sm">
                  <AvatarImage src={post.author.avatar} alt={post.author.name} />
                  <AvatarFallback>{post.author.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
                    <span className="font-medium text-foreground">{post.author.name}</span>
                    <span>•</span>
                    <span>{post.timestamp}</span>
                  </div>
                  <h3 className="font-medium text-foreground mb-1 line-clamp-2">{post.title}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">{post.preview}</p>
                  <div className="flex items-center gap-1.5 mt-3 text-muted-foreground">
                    <MessageCircle className="w-4 h-4" />
                    <span className="text-xs">{post.replies} replies</span>
                  </div>
                </div>
              </div>
            </article>
          ))
        )}
      </div>

      {/* Create Post Button */}
      <div className="sticky bottom-0 p-4 bg-gradient-to-t from-background via-background to-transparent pt-8">
        <button className="w-full py-4 bg-primary text-primary-foreground rounded-2xl font-medium hover:bg-primary/90 transition-colors flex items-center justify-center gap-2">
          <Plus className="w-5 h-5" />
          Create Post
        </button>
      </div>
    </div>
  );
}
