import { createContext, useContext, useState, useCallback, ReactNode } from "react";

export interface Participant {
  id: string;
  name: string;
  avatar?: string;
  isSpeaker: boolean;
  isSpeaking?: boolean;
}

export interface VoiceRoom {
  id: string;
  name: string;
  participants: Participant[];
}

interface VoiceRoomState {
  currentRoom: VoiceRoom | null;
  isExpanded: boolean;
  isJoined: boolean;
  isMuted: boolean;
  hasRaisedHand: boolean;
}

interface VoiceRoomContextValue extends VoiceRoomState {
  joinRoom: (room: VoiceRoom) => void;
  leaveRoom: () => void;
  toggleExpanded: () => void;
  expand: () => void;
  minimize: () => void;
  toggleMute: () => void;
  toggleRaiseHand: () => void;
}

const VoiceRoomContext = createContext<VoiceRoomContextValue | null>(null);

export function VoiceRoomProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<VoiceRoomState>({
    currentRoom: null,
    isExpanded: false,
    isJoined: false,
    isMuted: true,
    hasRaisedHand: false,
  });

  const joinRoom = useCallback((room: VoiceRoom) => {
    setState({
      currentRoom: room,
      isExpanded: true,
      isJoined: true,
      isMuted: true,
      hasRaisedHand: false,
    });
  }, []);

  const leaveRoom = useCallback(() => {
    setState({
      currentRoom: null,
      isExpanded: false,
      isJoined: false,
      isMuted: true,
      hasRaisedHand: false,
    });
  }, []);

  const toggleExpanded = useCallback(() => {
    setState((prev) => ({ ...prev, isExpanded: !prev.isExpanded }));
  }, []);

  const expand = useCallback(() => {
    setState((prev) => ({ ...prev, isExpanded: true }));
  }, []);

  const minimize = useCallback(() => {
    setState((prev) => ({ ...prev, isExpanded: false }));
  }, []);

  const toggleMute = useCallback(() => {
    setState((prev) => ({ ...prev, isMuted: !prev.isMuted }));
  }, []);

  const toggleRaiseHand = useCallback(() => {
    setState((prev) => ({ ...prev, hasRaisedHand: !prev.hasRaisedHand }));
  }, []);

  return (
    <VoiceRoomContext.Provider
      value={{
        ...state,
        joinRoom,
        leaveRoom,
        toggleExpanded,
        expand,
        minimize,
        toggleMute,
        toggleRaiseHand,
      }}
    >
      {children}
    </VoiceRoomContext.Provider>
  );
}

export function useVoiceRoom() {
  const context = useContext(VoiceRoomContext);
  if (!context) {
    throw new Error("useVoiceRoom must be used within a VoiceRoomProvider");
  }
  return context;
}
