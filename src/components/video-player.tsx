"use client"

import { useState, useRef, useEffect } from "react"
import { Play, Pause, Volume2, VolumeX } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

type VideoPlayerProps = {
  src: string
  poster?: string
  title?: string
  className?: string
}

export function VideoPlayer({ src, poster, title, className = "" }: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(true)
  const [progress, setProgress] = useState(0)
  const videoRef = useRef<HTMLVideoElement>(null)

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play().catch((error) => {
          console.error("Error playing video:", error)
        })
      }
      setIsPlaying(!isPlaying)
    }
  }

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  const updateProgress = () => {
    if (videoRef.current) {
      const value = (videoRef.current.currentTime / videoRef.current.duration) * 100
      setProgress(value)
    }
  }

  useEffect(() => {
    const videoElement = videoRef.current

    if (videoElement) {
      videoElement.addEventListener("timeupdate", updateProgress)
      videoElement.addEventListener("ended", () => setIsPlaying(false))
    }

    return () => {
      if (videoElement) {
        videoElement.removeEventListener("timeupdate", updateProgress)
        videoElement.removeEventListener("ended", () => setIsPlaying(false))
      }
    }
  }, [])

  return (
    <motion.div
      className={`relative rounded-xl overflow-hidden shadow-lg ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {title && (
        <div className="absolute top-0 left-0 right-0 bg-gradient-to-b from-black/70 to-transparent p-4 z-10">
          <h3 className="text-white font-medium">{title}</h3>
        </div>
      )}

      <video
        ref={videoRef}
        className="w-full h-[600px] object-cover cursor-pointer"
        poster={poster}
        onClick={togglePlay}
        muted
      >
        <source src={src} type="video/mp4" />
        Seu navegador não suporta vídeos.
      </video>

      {/* Controls overlay */}
      <div
        className={`absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 hover:opacity-100 transition-opacity duration-300 ${isPlaying ? "" : "opacity-100"}`}
        onClick={togglePlay}
      >
        <Button
          variant="outline"
          size="icon"
          className="bg-white/20 backdrop-blur-sm border-white/40 hover:bg-white/30 w-16 h-16 rounded-full"
          onClick={(e) => {
            e.stopPropagation()
            togglePlay()
          }}
        >
          {isPlaying ? <Pause className="h-8 w-8 text-white" /> : <Play className="h-8 w-8 text-white ml-1" />}
        </Button>
      </div>

      {/* Bottom controls */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3 flex items-center gap-2">
        <Button variant="ghost" size="icon" className="text-white hover:bg-white/20" onClick={togglePlay}>
          {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
        </Button>

        <Button variant="ghost" size="icon" className="text-white hover:bg-white/20" onClick={toggleMute}>
          {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
        </Button>

        <div className="flex-1 h-1 bg-white/30 rounded-full overflow-hidden">
          <div className="h-full bg-orange-500" style={{ width: `${progress}%` }} />
        </div>
      </div>
    </motion.div>
  )
}
