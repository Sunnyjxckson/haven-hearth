import { VoiceRoomModal } from "./VoiceRoomModal";
import { VoiceRoomMiniPlayer } from "./VoiceRoomMiniPlayer";
import { useVoiceRoom } from "@/contexts/VoiceRoomContext";

export function VoiceRoomOverlay() {
  const { isExpanded, isJoined } = useVoiceRoom();

  if (!isJoined) return null;

  return (
    <>
      {!isExpanded && <VoiceRoomMiniPlayer />}
      {isExpanded && <VoiceRoomModal />}
    </>
  );
}
