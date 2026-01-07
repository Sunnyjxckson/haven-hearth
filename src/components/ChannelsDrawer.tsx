import { X, Hash, Bell, Mic, ChevronRight, Sparkles } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useVoiceRoom } from "@/contexts/VoiceRoomContext";
import { cn } from "@/lib/utils";

interface Channel {
  id: string;
  name: string;
  type: "text" | "highlights" | "announcement" | "audio";
  unread?: number;
  isLive?: boolean;
  participants?: number;
}

interface ChannelsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  channels: Channel[];
}

const channelIcons = {
  text: Hash,
  highlights: Sparkles,
  announcement: Bell,
  audio: Mic,
};

// Mock room data for voice rooms accessed via drawer
const voiceRoomData: Record<string, { name: string; participants: { id: string; name: string; avatar?: string; isSpeaker: boolean; isSpeaking?: boolean }[] }> = {
  "2": {
    name: "The Lounge",
    participants: [
      { id: "u1", name: "Sarah Chen", isSpeaker: true, isSpeaking: true, avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop" },
      { id: "u2", name: "Alex Rivera", isSpeaker: true, isSpeaking: false, avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop" },
      { id: "u3", name: "Jordan Lee", isSpeaker: true, avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop" },
      { id: "u4", name: "Maya Patel", isSpeaker: false, avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop" },
      { id: "u5", name: "Chris Wong", isSpeaker: false, avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop" },
    ],
  },
  "3": {
    name: "Late Night Talks",
    participants: [
      { id: "u9", name: "Nina Fox", isSpeaker: true, isSpeaking: true, avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop" },
      { id: "u10", name: "Tom Hardy", isSpeaker: true, avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop" },
    ],
  },
};

function getChannelRoute(channel: Channel): string | null {
  switch (channel.type) {
    case "text":
      return `/channel/${channel.id}`;
    case "audio":
      return null; // Voice rooms open as modal, no route
    case "announcement":
      return `/room/${channel.id}`;
    case "highlights":
      return `/highlights/${channel.id}`;
    default:
      return `/channel/${channel.id}`;
  }
}

export function ChannelsDrawer({
  isOpen,
  onClose,
  channels,
}: ChannelsDrawerProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const { joinRoom } = useVoiceRoom();

  const groupedChannels = {
    announcement: channels.filter((c) => c.type === "announcement"),
    audio: channels.filter((c) => c.type === "audio"),
    text: channels.filter((c) => c.type === "text"),
    highlights: channels.filter((c) => c.type === "highlights"),
  };

  const handleSelectChannel = (channel: Channel) => {
    if (channel.type === "audio") {
      // Open voice room as modal
      const roomData = voiceRoomData[channel.id];
      if (roomData) {
        joinRoom({
          id: channel.id,
          name: roomData.name,
          participants: roomData.participants,
        });
      }
    } else {
      const route = getChannelRoute(channel);
      if (route) navigate(route);
    }
    onClose();
  };

  const isChannelActive = (channel: Channel): boolean => {
    const route = getChannelRoute(channel);
    if (!route) return false;
    return location.pathname === route;
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className={cn(
          "fixed inset-0 bg-foreground/10 backdrop-blur-sm z-40 transition-opacity duration-300",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        className={cn(
          "fixed left-0 top-0 h-full w-80 max-w-[85vw] bg-drawer z-50 transition-transform duration-300 ease-out",
          "rounded-r-3xl soft-shadow",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex flex-col h-full p-5">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-foreground">Channels</h2>
            <button
              onClick={onClose}
              className="p-2 rounded-xl hover:bg-accent transition-colors"
            >
              <X className="w-5 h-5 text-muted-foreground" />
            </button>
          </div>

          {/* Channels List */}
          <div className="flex-1 overflow-y-auto space-y-6">
            {/* Announcements */}
            {groupedChannels.announcement.length > 0 && (
              <ChannelGroup
                title="Announcements"
                channels={groupedChannels.announcement}
                onSelectChannel={handleSelectChannel}
                isChannelActive={isChannelActive}
              />
            )}

            {/* Audio Rooms */}
            {groupedChannels.audio.length > 0 && (
              <ChannelGroup
                title="Voice Rooms"
                channels={groupedChannels.audio}
                onSelectChannel={handleSelectChannel}
                isChannelActive={isChannelActive}
              />
            )}

            {/* General Rooms */}
            {groupedChannels.text.length > 0 && (
              <ChannelGroup
                title="General Rooms"
                channels={groupedChannels.text}
                onSelectChannel={handleSelectChannel}
                isChannelActive={isChannelActive}
              />
            )}

            {/* Highlights */}
            {groupedChannels.highlights.length > 0 && (
              <ChannelGroup
                title="Highlights"
                channels={groupedChannels.highlights}
                onSelectChannel={handleSelectChannel}
                isChannelActive={isChannelActive}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}

function ChannelGroup({
  title,
  channels,
  onSelectChannel,
  isChannelActive,
}: {
  title: string;
  channels: Channel[];
  onSelectChannel: (channel: Channel) => void;
  isChannelActive: (channel: Channel) => boolean;
}) {
  return (
    <div>
      <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2 px-2">
        {title}
      </h3>
      <div className="space-y-1">
        {channels.map((channel) => {
          const Icon = channelIcons[channel.type];
          const isActive = isChannelActive(channel);

          return (
            <button
              key={channel.id}
              onClick={() => onSelectChannel(channel)}
              className={cn(
                "channel-item w-full group",
                isActive && "active"
              )}
            >
              <div
                className={cn(
                  "p-2 rounded-lg transition-colors",
                  channel.type === "audio" && channel.isLive
                    ? "bg-live/15 text-live"
                    : "bg-muted/50 text-muted-foreground group-hover:text-foreground"
                )}
              >
                <Icon className="w-4 h-4" />
              </div>

              <div className="flex-1 text-left">
                <div className="flex items-center gap-2">
                  <span
                    className={cn(
                      "text-sm font-medium transition-colors",
                      isActive ? "text-foreground" : "text-muted-foreground group-hover:text-foreground"
                    )}
                  >
                    {channel.name}
                  </span>
                  {channel.type === "audio" && channel.isLive && (
                    <span className="live-indicator">Live</span>
                  )}
                </div>
                {channel.type === "audio" && channel.participants && (
                  <span className="text-xs text-muted-foreground">
                    {channel.participants} listening
                  </span>
                )}
              </div>

              {channel.unread && channel.unread > 0 && (
                <span className="px-2 py-0.5 rounded-full bg-primary text-primary-foreground text-xs font-medium">
                  {channel.unread}
                </span>
              )}

              <ChevronRight className="w-4 h-4 text-muted-foreground/50 group-hover:text-muted-foreground transition-colors" />
            </button>
          );
        })}
      </div>
    </div>
  );
}
