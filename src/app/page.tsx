"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Cake, Gift, Heart, Scroll } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ImprovedJutsuCard } from "@/components/improved-jutsu-card"
import { SpecialMessage } from "@/components/special-message"
import { EnhancedBirthdayPopup } from "@/components/enhanced-birthday-popup"
import { FloatingElements } from "@/components/floating-elements"
import { AudioControls } from "@/components/audio-controls"
import { IntroAnimation } from "@/components/intro-animation"
import { VideoPlayer } from "@/components/video-player"
import { ImageGallery } from "@/components/image-gallery"
import { NarutoParallaxBackground } from "@/components/naruto-parallax-background"
import { MemoryTimeline } from "@/components/memory-timeline"
import { TimeAliveCounter } from "@/components/time-alive-counter"

// Hooks and Utils
import { useAudio } from "@/hooks/use-audio"
import { launchConfetti } from "../../utils/confetti"

// Sample gallery images (replace with actual images)
const galleryImages = [
  {
    src: "/placeholder.svg?height=300&width=300",
    alt: "Leandro Ninja",
    caption: "Leandro em modo Hokage",
  },
  {
    src: "/placeholder.svg?height=300&width=300",
    alt: "Leandro e amigos",
    caption: "Celebração ninja com amigos",
  },
  {
    src: "/placeholder.svg?height=300&width=300",
    alt: "Leandro Rasengan",
    caption: "Dominando o Rasengan",
  },
  {
    src: "/placeholder.svg?height=300&width=300",
    alt: "Leandro Hokage",
    caption: "Futuro Hokage da Vila",
  },
  {
    src: "/placeholder.svg?height=300&width=300",
    alt: "Leandro Ninja",
    caption: "Missão cumprida",
  },
  {
    src: "/placeholder.svg?height=300&width=300",
    alt: "Leandro e amigos",
    caption: "Time 7 reunido",
  },
  {
    src: "/placeholder.svg?height=300&width=300",
    alt: "Leandro Ninja",
    caption: "Treinamento intenso",
  },
  {
    src: "/placeholder.svg?height=300&width=300",
    alt: "Leandro Hokage",
    caption: "Momento de descontração",
  },
  {
    src: "/placeholder.svg?height=300&width=300",
    alt: "Leandro Ninja",
    caption: "Missão rank S",
  },
  {
    src: "/placeholder.svg?height=300&width=300",
    alt: "Leandro e amigos",
    caption: "Celebração na Vila da Folha",
  },
  {
    src: "/placeholder.svg?height=300&width=300",
    alt: "Leandro Ninja",
    caption: "Momento de reflexão",
  },
  {
    src: "/placeholder.svg?height=300&width=300",
    alt: "Leandro Hokage",
    caption: "Preparação para o grande dia",
  },
]

// Friend messages with images
const friendMessages = [
  {
    name: "Naruto Uzumaki",
    message: "Parabéns Leandro! Que você continue sendo o ninja mais determinado que conhecemos! Dattebayo!",
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    name: "Sasuke Uchiha",
    message: "Seu poder de resolver bugs é mais forte que meu Sharingan. Feliz aniversário.",
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    name: "Kakashi Sensei",
    message: "Feliz aniversário! Você é o verdadeiro gênio da Vila! Continue lendo bons livros como eu.",
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    name: "Sakura Haruno",
    message: "Parabéns Leandro! Sua força de vontade é inspiradora para todos nós! Feliz aniversário!",
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    name: "Gaara",
    message: "Que sua existência continue trazendo alegria para todos ao seu redor. Feliz aniversário.",
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    name: "Rock Lee",
    message: "O PODER DA JUVENTUDE ESTÁ COM VOCÊ! FELIZ ANIVERSÁRIO, LEANDRO! CONTINUE TREINANDO DURO!",
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    name: "Hinata Hyuga",
    message: "Leandro-kun, desejo a você um feliz aniversário cheio de momentos especiais e muita alegria!",
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    name: "Shikamaru Nara",
    message: "Feliz aniversário! Seria problemático não te parabenizar neste dia especial.",
    image: "/placeholder.svg?height=100&width=100",
  },
]

// Timeline events
const timelineEvents = [
  {
    date: "4 de Maio, 1995",
    title: "O Nascimento de um Ninja",
    description: "Leandro chega ao mundo, destinado a grandes feitos.",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    date: "2010",
    title: "Primeiros Passos no Caminho Ninja",
    description: "Descoberta da paixão pela tecnologia e programação.",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    date: "2015",
    title: "Formação Ninja",
    description: "Aperfeiçoamento das técnicas e habilidades profissionais.",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    date: "2020",
    title: "Missões de Alto Nível",
    description: "Conquistas importantes e superação de desafios.",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    date: "2024",
    title: "29 Anos de Sabedoria Ninja",
    description: "Celebrando mais um ano de vida com amigos e conquistas.",
    image: "/placeholder.svg?height=200&width=300",
  },
]

export default function Home() {
  const [showIntro, setShowIntro] = useState(true)
  const [showBirthdayMessage, setShowBirthdayMessage] = useState(false)
  const [showSpecialMessage, setShowSpecialMessage] = useState(false)
  const [hasScrolled, setHasScrolled] = useState(false)

  // Audio hook
  const { isPlaying, isMuted, togglePlay, toggleMute } = useAudio("/naruto_main_theme.mp3")

  // Reference for confetti
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Handle intro completion
  const handleIntroComplete = () => {
    setShowIntro(false)
    setShowBirthdayMessage(true)
    // Start playing music when intro completes
    if (!isPlaying) {
      togglePlay()
    }
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

  return (
    <main className="min-h-screen overflow-x-hidden relative px-4">
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
      <AudioControls isPlaying={isPlaying} isMuted={isMuted} togglePlay={togglePlay} toggleMute={toggleMute} />

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
      <motion.div
        className="container mx-auto pt-20 pb-10 text-center"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.div
          className="inline-block"
          animate={{ rotate: [0, 5, 0, -5, 0] }}
          transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY }}
        >
            <Image src="/logo.png" alt="Naruto Logo" width={400} height={500} className="object-contain " />
        </motion.div>

        <motion.div
          className="text-4xl md:text-6xl font-bold text-white drop-shadow-lg mb-4 flex items-center justify-center gap-4"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <Cake className="h-12 w-12" />
          <span>ANIVERSÁRIO NINJA</span>
          <Cake className="h-12 w-12" />
        </motion.div>

        <motion.p
          className="text-xl text-white/90 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          Comemore o aniversário do ninja mais incrível da Vila da Folha!
        </motion.p>

        <div className="flex flex-wrap justify-center gap-4 mt-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            whileHover={{ scale: 1.05 }}
            onClick={launchConfetti}
          >
            <Button className="bg-orange-600 hover:bg-orange-700 text-white text-lg px-6 py-3 rounded-full">
              <Gift className="mr-2 h-5 w-5" />
              Soltar Confetes!
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.5 }}
            whileHover={{ scale: 1.05 }}
            onClick={() => setShowSpecialMessage(true)}
          >
            <Button className="bg-blue-600 hover:bg-blue-700 text-white text-lg px-6 py-3 rounded-full">
              <Heart className="mr-2 h-5 w-5" />
              Mensagem Especial
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.5 }}
            whileHover={{ scale: 1.05 }}
            onClick={() => {
              const timelineSection = document.getElementById("timeline-section")
              if (timelineSection) {
                timelineSection.scrollIntoView({ behavior: "smooth" })
              }
            }}
          >
            <Button className="bg-green-600 hover:bg-green-700 text-white text-lg px-6 py-3 rounded-full">
              <Scroll className="mr-2 h-5 w-5" />
              Jornada Ninja
            </Button>
          </motion.div>
        </div>
      </motion.div>

      {/* Featured Video */}
      <div className="container mx-auto py-10">
        <h2 className="text-3xl font-bold text-white text-center mb-8">Mensagem de Vídeo Especial</h2>
        <div className="max-w-3xl mx-auto">
          <VideoPlayer
            src="/placeholder.mp4"
            poster="/placeholder.svg?height=400&width=800"
            title="Mensagem de Aniversário"
          />
        </div>
      </div>

      {/* Birthday Hero Section */}
      <div className="container mx-auto py-10">
        <motion.div
          className="bg-black/30 backdrop-blur-sm rounded-2xl overflow-hidden border border-orange-400/30"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
            <div className="flex justify-center items-center">
              <motion.div
                className="relative h-[300px] w-[300px] rounded-full overflow-hidden border-4 border-orange-400"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.2, duration: 0.5 }}
                whileHover={{ scale: 1.05, borderColor: "#FFD700" }}
              >
                <Image
                  src="/placeholder.svg?height=300&width=300"
                  alt="Leandro Negreiros"
                  fill
                  className="object-cover"
                />
              </motion.div>
            </div>

            <div className="flex flex-col justify-center">
              <motion.h2
                className="text-3xl md:text-4xl font-bold text-orange-300 mb-4"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.4, duration: 0.5 }}
              >
                Leandro Negreiros
              </motion.h2>

              <motion.div
                className="text-white/90 space-y-4"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.6, duration: 0.5 }}
              >
                <p className="text-xl">
                  <span className="font-bold">Idade:</span> 29 anos
                </p>
                <p className="text-xl">
                  <span className="font-bold">Rank Ninja:</span> Hokage da Programação
                </p>
                <p className="text-xl">
                  <span className="font-bold">Jutsus Especiais:</span> Código no Jutsu, Bug Resolver Technique
                </p>
                <p className="text-xl">
                  <span className="font-bold">Missões Completadas:</span> Incontáveis
                </p>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Timeline Section */}
      <div id="timeline-section" className="container mx-auto py-16">
        <motion.h2
          className="text-3xl font-bold text-white text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={hasScrolled ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          A Jornada Ninja de Leandro
        </motion.h2>

        <div className="bg-black/30 backdrop-blur-sm rounded-2xl p-8 border border-orange-400/30">
          <MemoryTimeline events={timelineEvents} />
        </div>
      </div>

      {/* Photo Gallery */}
      <div className="container mx-auto py-10">
        <h2 className="text-3xl font-bold text-white text-center mb-8">Galeria de Memórias Ninja</h2>
        <ImageGallery images={galleryImages} />
      </div>

      {/* Jutsu Especial de Aniversário */}
      <motion.div
        className="container mx-auto py-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.8 }}
      >
        <h2 className="text-3xl font-bold text-white text-center mb-10">Jutsus Especiais de Aniversário</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <ImprovedJutsuCard
            name="Rasengan de Aniversário"
            description="Concentra chakra de felicidade em uma esfera giratória poderosa"
            icon={<span className="text-6xl">🌀</span>}
            color="bg-gradient-to-br from-blue-400/20 to-blue-600/20"
            effectType="rasengan"
          />

          <ImprovedJutsuCard
            name="Kage Bunshin no Jutsu"
            description="Cria clones para multiplicar a alegria da celebração"
            icon={<span className="text-6xl">👥</span>}
            color="bg-gradient-to-br from-orange-400/20 to-orange-600/20"
            effectType="kage"
          />

          <ImprovedJutsuCard
            name="Chidori dos Desejos"
            description="Concentra mil desejos de felicidade em um único golpe"
            icon={<span className="text-6xl">⚡</span>}
            color="bg-gradient-to-br from-purple-400/20 to-purple-600/20"
            effectType="chidori"
          />
        </div>
      </motion.div>

      {/* Mensagens dos Amigos */}
      <motion.div
        className="container mx-auto py-16"
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.5, duration: 0.8 }}
      >
        <div className="bg-[url('/placeholder.svg?height=300&width=800')] bg-cover bg-center py-16 rounded-lg relative overflow-hidden">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>
          <div className="relative z-10 text-center px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">Mensagens dos Amigos Ninjas</h2>

            <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {friendMessages.map((message, index) => (
                <motion.div
                  key={index}
                  className="bg-white/10 rounded-lg overflow-hidden"
                  whileHover={{ scale: 1.03, backgroundColor: "rgba(255,255,255,0.15)" }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2, duration: 0.5 }}
                >
                  <div className="flex flex-col sm:flex-row items-center gap-4 p-4">
                    {message.image && (
                      <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-orange-400 flex-shrink-0">
                        <Image
                          src={message.image || "/placeholder.svg"}
                          alt={message.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}

                    <div className="flex-1">
                      <p className="italic text-white/90 mb-2">{message.message}</p>
                      <p className="text-orange-300 font-medium">{message.name}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <Button
              className="bg-orange-600 hover:bg-orange-700 text-white"
              onClick={() => {
                launchConfetti()
              }}
            >
              Enviar Sua Mensagem
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Tempo de Vida Counter */}
      <motion.div
        className="container mx-auto py-10 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.8, duration: 0.8 }}
      >
        <h2 className="text-3xl font-bold text-white mb-4">Tempo de Vida Ninja</h2>
        <p className="text-white/80 mb-8 max-w-2xl mx-auto">
          Nosso ninja Leandro está neste mundo desde 4 de maio de 1995, acumulando poder e sabedoria a cada segundo!
        </p>

        <TimeAliveCounter birthDate="1996-05-04" />
      </motion.div>

      {/* Footer */}
      <footer className="bg-black/80 text-white/70 py-8 text-center">
        <p>Parabains gay!</p>
        <p className="mt-2">Site criado com muito carinho pelo @limoneiro. © {new Date().getFullYear()}</p>      </footer>
    </main>
  )
}
