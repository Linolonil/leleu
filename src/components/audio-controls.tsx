"use client"

import { Play, Pause, Volume2, VolumeX } from "lucide-react"
import { Button } from "@/components/ui/button"

type AudioControlsProps = {
  isPlaying: boolean
  isMuted: boolean
  togglePlay: () => void
  toggleMute: () => void
}

export function AudioControls({ isPlaying, isMuted, togglePlay, toggleMute }: AudioControlsProps) {
  return (
    <div className="fixed top-4 right-4 z-50 flex gap-2">
      <Button
        variant="outline"
        size="icon"
        className="bg-white/20 backdrop-blur-sm border-white/40 hover:bg-white/30"
        onClick={togglePlay}
      >
        {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
      </Button>
      <Button
        variant="outline"
        size="icon"
        className="bg-white/20 backdrop-blur-sm border-white/40 hover:bg-white/30"
        onClick={toggleMute}
      >
        {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
      </Button>
    </div>
  )
}
