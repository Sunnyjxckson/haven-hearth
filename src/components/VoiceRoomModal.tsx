import { Mic, MicOff, Hand, LogOut, ChevronDown } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/Avatar";
import { useVoiceRoom } from "@/contexts/VoiceRoomContext";
import { cn } from "@/lib/utils";

export function VoiceRoomModal() {
  const {
    currentRoom,
    isExpanded,
    isJoined,
    isMuted,
    hasRaisedHand,
    minimize,
    leaveRoom,
    toggleMute,
    toggleRaiseHand,
  } = useVoiceRoom();

  if (!currentRoom || !isJoined || !isExpanded) return null;

  const speakers = currentRoom.participants.filter((p) => p.isSpeaker);
  const listeners = currentRoom.participants.filter((p) => !p.isSpeaker);

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 z-40 bg-background/60 backdrop-blur-sm"
        onClick={minimize}
      />
      
      {/* Modal */}
      <div className="fixed inset-x-0 bottom-0 z-50 sm:inset-auto sm:left-1/2 sm:top-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 sm:w-full sm:max-w-md">
        <div className="bg-card rounded-t-3xl sm:rounded-2xl soft-shadow max-h-[85vh] overflow-hidden flex flex-col animate-in slide-in-from-bottom-4 sm:slide-in-from-bottom-0 sm:zoom-in-95 duration-300">
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-border/50">
            <div className="flex-1 min-w-0">
              <h2 className="font-semibold text-foreground truncate">{currentRoom.name}</h2>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="live-indicator text-xs">Live</span>
                <span className="text-xs text-muted-foreground">
                  {currentRoom.participants.length} in room
                </span>
              </div>
            </div>
            <button
              onClick={minimize}
              className="p-2.5 rounded-xl hover:bg-accent transition-colors -mr-1"
            >
              <ChevronDown className="w-5 h-5 text-muted-foreground" />
            </button>
          </div>

          {/* Room Content */}
          <div className="flex-1 overflow-y-auto p-5 space-y-6">
            {/* Speakers Section */}
            <section>
              <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-4">
                Speakers
              </h3>
              <div className="grid grid-cols-3 gap-4">
                {speakers.map((participant) => (
                  <div key={participant.id} className="flex flex-col items-center gap-2">
                    <div className="relative">
                      <Avatar
                        size="lg"
                        className={cn(
                          "transition-all duration-300",
                          participant.isSpeaking && "ring-2 ring-live ring-offset-2 ring-offset-card"
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
                <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-4">
                  Listeners
                </h3>
                <div className="grid grid-cols-4 gap-3">
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
          <div className="border-t border-border/50 p-4">
            <div className="flex items-center justify-center gap-4">
              <button
                onClick={toggleMute}
                className={cn(
                  "p-4 rounded-2xl transition-colors",
                  isMuted ? "bg-muted text-muted-foreground" : "bg-live/15 text-live"
                )}
              >
                {isMuted ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
              </button>
              <button
                onClick={toggleRaiseHand}
                className={cn(
                  "p-4 rounded-2xl transition-colors",
                  hasRaisedHand ? "bg-primary/15 text-primary" : "bg-muted text-muted-foreground"
                )}
              >
                <Hand className="w-6 h-6" />
              </button>
              <button
                onClick={leaveRoom}
                className="p-4 bg-destructive/15 text-destructive rounded-2xl transition-colors hover:bg-destructive/25"
              >
                <LogOut className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
