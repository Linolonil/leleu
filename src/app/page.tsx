"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Header } from "@/components/header"
import { BirthdayHero } from "@/components/birthday-hero"
import { FriendMessages } from "@/components/friend-messages"
import { SpecialMessage } from "@/components/special-message"
import { EnhancedBirthdayPopup } from "@/components/enhanced-birthday-popup"
import { FloatingElements } from "@/components/floating-elements"
import { IntroAnimation } from "@/components/intro-animation"
import { VideoPlayer } from "@/components/video-player"
import { ImageGallery } from "@/components/image-gallery"
import { NarutoParallaxBackground } from "@/components/naruto-parallax-background"
import { MemoryTimeline } from "@/components/memory-timeline"
import { TimeAliveCounter } from "@/components/time-alive-counter"
import { AudioProvider } from "@/contexts/audio-context"
import { AudioControls } from "@/components/audio-controls"
import { useAudioContext } from "@/contexts/audio-context"

// Dados
import { galleryImages, friendMessages, timelineEvents } from "@/data/content"

function MainContent() {
  const [showIntro, setShowIntro] = useState(true)
  const [showBirthdayMessage, setShowBirthdayMessage] = useState(false)
  const [showSpecialMessage, setShowSpecialMessage] = useState(false)
  const [hasScrolled, setHasScrolled] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const { isPlaying, isMuted, togglePlay, toggleMute } = useAudioContext()

  // Reference for confetti
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Handle intro completion
  const handleIntroComplete = () => {
    setShowIntro(false)
    setShowBirthdayMessage(true)
  }

  // Track scrolling for animations
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setHasScrolled(true)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  if (!isMounted) {
    return null
  }

  return (
    <main className="min-h-screen overflow-x-hidden relative px-4 md:px-6 lg:px-8">
      {/* Parallax Background */}
      <NarutoParallaxBackground />

      {/* Canvas for confetti */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-50"
        style={{ width: "100%", height: "100%" }}
      />

      {/* Intro Animation */}
      <AnimatePresence>{showIntro && <IntroAnimation onComplete={handleIntroComplete} />}</AnimatePresence>

      {/* Floating elements animation */}
      <FloatingElements />

      {/* Audio controls */}
      <div className="fixed top-4 right-4 z-50">
        <AudioControls isPlaying={isPlaying} isMuted={isMuted} togglePlay={togglePlay} toggleMute={toggleMute} />
      </div>

      {/* Birthday message popup */}
      <AnimatePresence>
        {showBirthdayMessage && (
          <EnhancedBirthdayPopup
            onClose={() => setShowBirthdayMessage(false)}
            onShowSpecialMessage={() => setShowSpecialMessage(true)}
          />
        )}
      </AnimatePresence>

      {/* Special Message */}
      <AnimatePresence>
        {showSpecialMessage && <SpecialMessage onClose={() => setShowSpecialMessage(false)} />}
      </AnimatePresence>

      {/* Header */}
      <Header onShowSpecialMessage={() => setShowSpecialMessage(true)} />

      {/* Featured Video */}
      <div className="container mx-auto py-6 md:py-10">
        <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-4 md:mb-8">Mensagem de Vídeo Especial</h2>
        <div className="max-w-3xl mx-auto">
          <VideoPlayer
            src="/leandroUFAM.mp4"
            title="Um videozinho de parabéns para o Leandrooooo (tem musica)"
          />
        </div>
      </div>

      {/* Birthday Hero Section */}
      <BirthdayHero />

      {/* Timeline Section */}
      <div id="timeline-section" className="container mx-auto py-8 md:py-16">
        <motion.h2
          className="text-2xl md:text-3xl font-bold text-white text-center mb-8 md:mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={hasScrolled ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          A Jornada Ninja de Leandro
        </motion.h2>

        <div className="bg-black/30 backdrop-blur-sm rounded-2xl p-4 md:p-8 border border-orange-400/30">
          <MemoryTimeline events={timelineEvents} />
        </div>
      </div>

      {/* Photo Gallery */}
      <div className="container mx-auto py-6 md:py-10">
        <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-4 md:mb-8">Galeria de Memórias Ninja</h2>
        <ImageGallery images={galleryImages} />
      </div>

      {/* Mensagens dos Amigos */}
      <FriendMessages messages={friendMessages} />

      {/* Tempo de Vida Counter */}
      <motion.div
        className="container mx-auto py-6 md:py-10 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.8, duration: 0.8 }}
      >
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Tempo de Vida Ninja</h2>
        <p className="text-white/80 mb-6 md:mb-8 max-w-2xl mx-auto px-4">
          Nosso ninja Leandro está neste mundo desde 4 de maio de 1996, acumulando poder e sabedoria a cada segundo!
        </p>

        <TimeAliveCounter />  </motion.div>

    </main>
  )
}

export default function Home() {
  return (
    <AudioProvider>
      <MainContent />
    </AudioProvider>
  )
}
