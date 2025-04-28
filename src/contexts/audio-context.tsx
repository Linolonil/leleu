"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { useAudio } from "@/hooks/use-audio";

interface AudioContextType {
  isPlaying: boolean;
  isMuted: boolean;
  togglePlay: () => void;
  toggleMute: () => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const [isMounted, setIsMounted] = useState(false);
  const { isPlaying, isMuted, togglePlay, toggleMute } = useAudio("/naruto_main_theme.mp3");

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <AudioContext.Provider value={{ isPlaying, isMuted, togglePlay, toggleMute }}>
      {children}
    </AudioContext.Provider>
  );
}

export function useAudioContext() {
  const context = useContext(AudioContext);
  if (context === undefined) {
    throw new Error("useAudioContext must be used within an AudioProvider");
  }
  return context;
} 