import { Mic, MicOff, ChevronUp } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/Avatar";
import { useVoiceRoom } from "@/contexts/VoiceRoomContext";
import { cn } from "@/lib/utils";

export function VoiceRoomMiniPlayer() {
  const { currentRoom, isJoined, isMuted, expand, toggleMute } = useVoiceRoom();

  if (!currentRoom || !isJoined) return null;

  const activeSpeaker = currentRoom.participants.find((p) => p.isSpeaking);
  const speakers = currentRoom.participants.filter((p) => p.isSpeaker).slice(0, 3);

  return (
    <div className="sticky top-16 z-20 bg-card/95 backdrop-blur-md border-b border-border/50 soft-shadow">
      <div className="flex items-center gap-3 px-4 py-2.5">
        {/* Room avatars */}
        <div className="flex -space-x-2">
          {speakers.map((speaker) => (
            <Avatar
              key={speaker.id}
              size="sm"
              className={cn(
                "border-2 border-card transition-all",
                speaker.isSpeaking && "ring-2 ring-live ring-offset-1 ring-offset-card"
              )}
            >
              <AvatarImage src={speaker.avatar} alt={speaker.name} />
              <AvatarFallback className="text-xs">
                {speaker.name.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
          ))}
        </div>

        {/* Room info - tap to expand */}
        <button 
          onClick={expand}
          className="flex-1 flex items-center gap-2 min-w-0"
        >
          <div className="min-w-0 flex-1 text-left">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-foreground truncate">
                {currentRoom.name}
              </span>
              <span className="live-indicator text-[10px] px-1.5 py-0.5">Live</span>
            </div>
            {activeSpeaker && (
              <p className="text-xs text-muted-foreground truncate">
                {activeSpeaker.name} is speaking
              </p>
            )}
          </div>
          <ChevronUp className="w-4 h-4 text-muted-foreground shrink-0" />
        </button>

        {/* Mute toggle */}
        <button
          onClick={toggleMute}
          className={cn(
            "p-2.5 rounded-xl transition-colors shrink-0",
            isMuted ? "bg-muted text-muted-foreground" : "bg-live/15 text-live"
          )}
        >
          {isMuted ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
        </button>
      </div>
    </div>
  );
}
