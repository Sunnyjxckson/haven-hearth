import { useState } from "react";
import { toast } from "sonner";
import { Header } from "@/components/Header";
import { ChannelsDrawer } from "@/components/ChannelsDrawer";
import { AudioRoomCard } from "@/components/AudioRoomCard";
import { FeedPost } from "@/components/FeedPost";
import { VoiceRoomOverlay } from "@/components/VoiceRoomOverlay";
import { useVoiceRoom } from "@/contexts/VoiceRoomContext";
import feedHeaderImage from "@/assets/feed-header.jpg";

// Mock data
const channels = [
  { id: "1", name: "Announcements", type: "announcement" as const, unread: 2 },
  { id: "2", name: "The Lounge", type: "audio" as const, isLive: true, participants: 12 },
  { id: "3", name: "Late Night Talks", type: "audio" as const, isLive: true, participants: 5 },
  { id: "4", name: "General", type: "text" as const, unread: 5 },
  { id: "5", name: "Introductions", type: "text" as const },
  { id: "6", name: "Questions", type: "text" as const, unread: 1 },
  { id: "7", name: "Community Highlights", type: "highlights" as const },
  { id: "8", name: "Best of the Week", type: "highlights" as const },
];

const audioRooms = [
  {
    id: "2",
    title: "The Lounge ☕",
    participants: [
      { id: "u1", name: "Sarah Chen", isSpeaker: true, isSpeaking: true, avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop" },
      { id: "u2", name: "Alex Rivera", isSpeaker: true, isSpeaking: false, avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop" },
      { id: "u3", name: "Jordan Lee", isSpeaker: true, avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop" },
      { id: "u4", name: "Maya Patel", isSpeaker: false, avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop" },
      { id: "u5", name: "Chris Wong", isSpeaker: false, avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop" },
      { id: "u6", name: "Emma Davis", isSpeaker: false },
      { id: "u7", name: "Mike Johnson", isSpeaker: false },
      { id: "u8", name: "Lisa Park", isSpeaker: false },
    ],
  },
  {
    id: "3",
    title: "Late Night Talks",
    participants: [
      { id: "u9", name: "Nina Fox", isSpeaker: true, isSpeaking: true, avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop" },
      { id: "u10", name: "Tom Hardy", isSpeaker: true, avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop" },
      { id: "u11", name: "Zoe Kim", isSpeaker: false, avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop" },
    ],
  },
];

const feedPosts = [
  {
    id: "p1",
    author: {
      name: "Sarah Chen",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
      role: "Community Lead",
    },
    content: "Just wrapped up an amazing session in The Lounge! So grateful for this community and the thoughtful conversations we have here. Remember, every voice matters 💛",
    timestamp: "2h ago",
    likes: 47,
    comments: 12,
  },
  {
    id: "p2",
    author: {
      name: "Alex Rivera",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    },
    content: "Been thinking a lot about creative flow lately. What helps you get into that zone? For me, it's always early mornings with good music.",
    image: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=800&h=400&fit=crop",
    timestamp: "5h ago",
    likes: 89,
    comments: 23,
    isLiked: true,
  },
  {
    id: "p3",
    author: {
      name: "Maya Patel",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
    },
    content: "New here! 👋 Excited to connect with like-minded people. A little about me: I'm a designer passionate about mindful tech. Looking forward to the conversations!",
    timestamp: "8h ago",
    likes: 124,
    comments: 31,
  },
];

export default function Index() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { joinRoom, isJoined } = useVoiceRoom();

  return (
    <div className="min-h-screen bg-background">
      <Header
        onMenuClick={() => setIsDrawerOpen(true)}
        communityName="The Haven"
        userAvatar="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop"
        memberCount={1247}
        onLeaveCommunity={() => toast.info("Leave community action")}
      />

      <ChannelsDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        channels={channels}
      />

      {/* Voice Room Mini Player */}
      <VoiceRoomOverlay />

      {/* Feed Header Image */}
      <div className="relative h-48 sm:h-64 overflow-hidden">
        <img 
          src={feedHeaderImage} 
          alt="Community banner" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
        <div className="absolute bottom-6 left-0 right-0 text-center">
          <h2 className="text-2xl sm:text-3xl font-semibold text-foreground">Welcome to The Haven</h2>
          <p className="text-muted-foreground mt-1">A space to connect, share, and belong</p>
        </div>
      </div>

      <main className="max-w-2xl mx-auto px-4 py-6 space-y-6">
        {/* Active Audio Rooms */}
        <section>
          <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4">
            Happening Now
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {audioRooms.map((room) => (
              <AudioRoomCard
                key={room.id}
                title={room.title}
                participants={room.participants}
                onJoin={() => joinRoom({
                  id: room.id,
                  name: room.title,
                  participants: room.participants,
                })}
              />
            ))}
          </div>
        </section>

        {/* Feed */}
        <section>
          <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4">
            Community Feed
          </h2>
          <div className="space-y-4">
            {feedPosts.map((post) => (
              <FeedPost
                key={post.id}
                author={post.author}
                content={post.content}
                image={post.image}
                timestamp={post.timestamp}
                likes={post.likes}
                comments={post.comments}
                isLiked={post.isLiked}
              />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
