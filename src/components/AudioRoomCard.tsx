import { Mic, Users } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/Avatar";
import { cn } from "@/lib/utils";

interface Participant {
  id: string;
  name: string;
  avatar?: string;
  isSpeaker: boolean;
  isSpeaking?: boolean;
}

interface AudioRoomCardProps {
  title: string;
  participants: Participant[];
  isLive?: boolean;
  onJoin: () => void;
}

export function AudioRoomCard({
  title,
  participants,
  isLive = true,
  onJoin,
}: AudioRoomCardProps) {
  const speakers = participants.filter((p) => p.isSpeaker);
  const listeners = participants.filter((p) => !p.isSpeaker);

  return (
    <div className="audio-room-card" onClick={onJoin}>
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="font-semibold text-foreground mb-1">{title}</h3>
          {isLive && <span className="live-indicator">Live now</span>}
        </div>
        <div className="flex items-center gap-1 text-muted-foreground">
          <Users className="w-4 h-4" />
          <span className="text-sm">{participants.length}</span>
        </div>
      </div>

      {/* Speakers */}
      {speakers.length > 0 && (
        <div className="mb-4">
          <div className="flex flex-wrap gap-3">
            {speakers.slice(0, 4).map((speaker) => (
              <div key={speaker.id} className="flex flex-col items-center gap-1.5">
                <div className="relative">
                  <Avatar size="lg" speaking={speaker.isSpeaking}>
                    <AvatarImage src={speaker.avatar} alt={speaker.name} />
                    <AvatarFallback>
                      {speaker.name.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="absolute -bottom-1 -right-1 p-1 rounded-full bg-card">
                    <Mic className="w-3 h-3 text-primary" />
                  </div>
                </div>
                <span className="text-xs text-muted-foreground font-medium max-w-[60px] truncate">
                  {speaker.name.split(" ")[0]}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Listeners */}
      {listeners.length > 0 && (
        <div className="flex items-center gap-2 pt-3 border-t border-border/50">
          <div className="flex -space-x-2">
            {listeners.slice(0, 5).map((listener) => (
              <Avatar key={listener.id} size="sm" className="border-2 border-card">
                <AvatarImage src={listener.avatar} alt={listener.name} />
                <AvatarFallback className="text-xs">
                  {listener.name.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            ))}
          </div>
          {listeners.length > 5 && (
            <span className="text-xs text-muted-foreground">
              +{listeners.length - 5} listening
            </span>
          )}
        </div>
      )}

      {/* Join hint */}
      <div className="mt-4 text-center">
        <span className="text-xs text-muted-foreground">Tap to join</span>
      </div>
    </div>
  );
}
