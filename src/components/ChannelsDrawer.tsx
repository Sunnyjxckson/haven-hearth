import { X, Hash, Image, Bell, Mic, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface Channel {
  id: string;
  name: string;
  type: "text" | "media" | "announcement" | "audio";
  unread?: number;
  isLive?: boolean;
  participants?: number;
}

interface ChannelsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  channels: Channel[];
  activeChannel: string | null;
  onSelectChannel: (id: string) => void;
}

const channelIcons = {
  text: Hash,
  media: Image,
  announcement: Bell,
  audio: Mic,
};

export function ChannelsDrawer({
  isOpen,
  onClose,
  channels,
  activeChannel,
  onSelectChannel,
}: ChannelsDrawerProps) {
  const groupedChannels = {
    announcement: channels.filter((c) => c.type === "announcement"),
    text: channels.filter((c) => c.type === "text"),
    media: channels.filter((c) => c.type === "media"),
    audio: channels.filter((c) => c.type === "audio"),
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
                activeChannel={activeChannel}
                onSelectChannel={onSelectChannel}
              />
            )}

            {/* Audio Rooms */}
            {groupedChannels.audio.length > 0 && (
              <ChannelGroup
                title="Voice Rooms"
                channels={groupedChannels.audio}
                activeChannel={activeChannel}
                onSelectChannel={onSelectChannel}
              />
            )}

            {/* Text Channels */}
            {groupedChannels.text.length > 0 && (
              <ChannelGroup
                title="Text Channels"
                channels={groupedChannels.text}
                activeChannel={activeChannel}
                onSelectChannel={onSelectChannel}
              />
            )}

            {/* Media */}
            {groupedChannels.media.length > 0 && (
              <ChannelGroup
                title="Media"
                channels={groupedChannels.media}
                activeChannel={activeChannel}
                onSelectChannel={onSelectChannel}
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
  activeChannel,
  onSelectChannel,
}: {
  title: string;
  channels: Channel[];
  activeChannel: string | null;
  onSelectChannel: (id: string) => void;
}) {
  return (
    <div>
      <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2 px-2">
        {title}
      </h3>
      <div className="space-y-1">
        {channels.map((channel) => {
          const Icon = channelIcons[channel.type];
          const isActive = activeChannel === channel.id;

          return (
            <button
              key={channel.id}
              onClick={() => onSelectChannel(channel.id)}
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
