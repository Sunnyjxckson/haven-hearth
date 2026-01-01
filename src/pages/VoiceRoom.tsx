import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Mic, MicOff, Hand, LogOut } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/Avatar";
import { cn } from "@/lib/utils";

interface Participant {
  id: string;
  name: string;
  avatar?: string;
  isSpeaker: boolean;
  isSpeaking?: boolean;
}

const roomData: Record<string, { name: string; participants: Participant[] }> = {
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

export default function VoiceRoom() {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const [isJoined, setIsJoined] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [hasRaisedHand, setHasRaisedHand] = useState(false);

  const room = roomData[roomId || ""] || { name: "Voice Room", participants: [] };
  const speakers = room.participants.filter((p) => p.isSpeaker);
  const listeners = room.participants.filter((p) => !p.isSpeaker);

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
            <div className="flex items-center gap-2">
              <span className="live-indicator">Live</span>
              <span className="text-xs text-muted-foreground">
                {room.participants.length} in room
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Room Content */}
      <div className="flex-1 p-4 space-y-6">
        {/* Speakers Section */}
        <section>
          <h2 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-4">
            Speakers
          </h2>
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-4">
            {speakers.map((participant) => (
              <div key={participant.id} className="flex flex-col items-center gap-2">
                <div className="relative">
                  <Avatar
                    size="lg"
                    className={cn(
                      "transition-all duration-300",
                      participant.isSpeaking && "ring-2 ring-live ring-offset-2 ring-offset-background"
                    )}
                  >
                    <AvatarImage src={participant.avatar} alt={participant.name} />
                    <AvatarFallback>{participant.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  {participant.isSpeaking && (
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-live rounded-full flex items-center justify-center">
                      <Mic className="w-3 h-3 text-live-foreground" />
                    </div>
                  )}
                </div>
                <span className="text-sm text-foreground text-center truncate w-full">
                  {participant.name.split(" ")[0]}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Listeners Section */}
        {listeners.length > 0 && (
          <section>
            <h2 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-4">
              Listeners
            </h2>
            <div className="grid grid-cols-4 sm:grid-cols-6 gap-3">
              {listeners.map((participant) => (
                <div key={participant.id} className="flex flex-col items-center gap-1.5">
                  <Avatar size="md">
                    <AvatarImage src={participant.avatar} alt={participant.name} />
                    <AvatarFallback>{participant.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <span className="text-xs text-muted-foreground text-center truncate w-full">
                    {participant.name.split(" ")[0]}
                  </span>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Bottom Controls */}
      <div className="sticky bottom-0 bg-background border-t border-border/50 p-4">
        {!isJoined ? (
          <button
            onClick={() => setIsJoined(true)}
            className="w-full py-4 bg-primary text-primary-foreground rounded-2xl font-medium hover:bg-primary/90 transition-colors"
          >
            Join Room
          </button>
        ) : (
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={() => setIsMuted(!isMuted)}
              className={cn(
                "p-4 rounded-2xl transition-colors",
                isMuted ? "bg-muted text-muted-foreground" : "bg-live/15 text-live"
              )}
            >
              {isMuted ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
            </button>
            <button
              onClick={() => setHasRaisedHand(!hasRaisedHand)}
              className={cn(
                "p-4 rounded-2xl transition-colors",
                hasRaisedHand ? "bg-primary/15 text-primary" : "bg-muted text-muted-foreground"
              )}
            >
              <Hand className="w-6 h-6" />
            </button>
            <button
              onClick={() => {
                setIsJoined(false);
                navigate("/");
              }}
              className="p-4 bg-destructive/15 text-destructive rounded-2xl transition-colors hover:bg-destructive/25"
            >
              <LogOut className="w-6 h-6" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
