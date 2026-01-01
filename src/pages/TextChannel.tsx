import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Send } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/Avatar";

interface Message {
  id: string;
  author: {
    name: string;
    avatar?: string;
  };
  content: string;
  timestamp: string;
}

const channelNames: Record<string, string> = {
  "4": "General",
  "5": "Introductions",
  "6": "Questions",
};

export default function TextChannel() {
  const { channelId } = useParams();
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "m1",
      author: { name: "Sarah Chen", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop" },
      content: "Hey everyone! How's your day going?",
      timestamp: "10:32 AM",
    },
    {
      id: "m2",
      author: { name: "Alex Rivera", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop" },
      content: "Pretty good! Just finished my morning coffee. ☕",
      timestamp: "10:35 AM",
    },
    {
      id: "m3",
      author: { name: "Maya Patel", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop" },
      content: "Working on some new designs today. Feeling inspired!",
      timestamp: "10:41 AM",
    },
  ]);
  const [newMessage, setNewMessage] = useState("");

  const channelName = channelNames[channelId || ""] || "Channel";

  const handleSend = () => {
    if (!newMessage.trim()) return;
    
    const message: Message = {
      id: `m${Date.now()}`,
      author: { name: "You" },
      content: newMessage.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    
    setMessages([...messages, message]);
    setNewMessage("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

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
          <div>
            <h1 className="font-semibold text-foreground">#{channelName}</h1>
            <p className="text-xs text-muted-foreground">{messages.length} messages</p>
          </div>
        </div>
      </header>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div key={message.id} className="flex gap-3">
            <Avatar size="sm">
              <AvatarImage src={message.author.avatar} alt={message.author.name} />
              <AvatarFallback>{message.author.name.slice(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-baseline gap-2">
                <span className="font-medium text-foreground text-sm">{message.author.name}</span>
                <span className="text-xs text-muted-foreground">{message.timestamp}</span>
              </div>
              <p className="text-foreground/90 text-sm mt-0.5">{message.content}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="sticky bottom-0 bg-background border-t border-border/50 p-4">
        <div className="flex gap-3 items-end">
          <div className="flex-1 bg-card rounded-2xl border border-border/50 overflow-hidden">
            <textarea
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder={`Message #${channelName}`}
              className="w-full px-4 py-3 bg-transparent text-foreground placeholder:text-muted-foreground resize-none focus:outline-none text-sm"
              rows={1}
            />
          </div>
          <button
            onClick={handleSend}
            disabled={!newMessage.trim()}
            className="p-3 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
