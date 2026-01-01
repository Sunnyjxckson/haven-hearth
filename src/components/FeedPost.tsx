import { Heart, MessageCircle, Share2, MoreHorizontal } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/Avatar";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface FeedPostProps {
  author: {
    name: string;
    avatar?: string;
    role?: string;
  };
  content: string;
  image?: string;
  timestamp: string;
  likes: number;
  comments: number;
  isLiked?: boolean;
}

export function FeedPost({
  author,
  content,
  image,
  timestamp,
  likes,
  comments,
  isLiked: initialLiked = false,
}: FeedPostProps) {
  const [isLiked, setIsLiked] = useState(initialLiked);
  const [likeCount, setLikeCount] = useState(likes);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikeCount((prev) => (isLiked ? prev - 1 : prev + 1));
  };

  return (
    <article className="feed-card">
      {/* Author */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <Avatar size="md">
            <AvatarImage src={author.avatar} alt={author.name} />
            <AvatarFallback>{author.name.slice(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div>
            <h4 className="font-medium text-foreground text-sm">{author.name}</h4>
            <div className="flex items-center gap-2">
              {author.role && (
                <span className="text-xs text-primary font-medium">{author.role}</span>
              )}
              <span className="text-xs text-muted-foreground">{timestamp}</span>
            </div>
          </div>
        </div>
        <button className="p-2 rounded-lg hover:bg-accent transition-colors">
          <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
        </button>
      </div>

      {/* Content */}
      <p className="text-foreground/90 text-sm leading-relaxed mb-4">{content}</p>

      {/* Image */}
      {image && (
        <div className="mb-4 -mx-1 overflow-hidden rounded-xl">
          <img
            src={image}
            alt="Post image"
            className="w-full h-auto object-cover"
          />
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center gap-1 pt-2 border-t border-border/50">
        <button
          onClick={handleLike}
          className={cn(
            "flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-200",
            isLiked
              ? "text-primary bg-primary/10"
              : "text-muted-foreground hover:bg-accent hover:text-foreground"
          )}
        >
          <Heart
            className={cn("w-4 h-4 transition-all", isLiked && "fill-current scale-110")}
          />
          <span className="text-sm font-medium">{likeCount}</span>
        </button>

        <button className="flex items-center gap-2 px-4 py-2 rounded-xl text-muted-foreground hover:bg-accent hover:text-foreground transition-colors">
          <MessageCircle className="w-4 h-4" />
          <span className="text-sm font-medium">{comments}</span>
        </button>

        <button className="flex items-center gap-2 px-4 py-2 rounded-xl text-muted-foreground hover:bg-accent hover:text-foreground transition-colors ml-auto">
          <Share2 className="w-4 h-4" />
        </button>
      </div>
    </article>
  );
}
