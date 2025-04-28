"use client"

import { useState, useEffect, useRef } from "react"

export function useAudio(audioSrc: string) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(true)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    // Initialize audio
    if (typeof window !== "undefined") {
      audioRef.current = new Audio(audioSrc)
      audioRef.current.loop = false // Desativa o loop

      // Adiciona o evento de quando o áudio termina
      audioRef.current.addEventListener('ended', () => {
        setIsPlaying(false)
      })
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }
    }
  }, [audioSrc])

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        // Se o áudio terminou, volta para o início
        if (audioRef.current.currentTime === audioRef.current.duration) {
          audioRef.current.currentTime = 0
        }
        audioRef.current.play().catch((error) => {
          console.error("Error playing audio:", error)
        })
      }
      setIsPlaying(!isPlaying)
      setIsMuted(false)
    }
  }

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  return {
    isPlaying,
    isMuted,
    togglePlay,
    toggleMute,
  }
}
