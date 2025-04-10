"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Cake, Gift, Heart, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"

// Components
import { TimeAliveCounter } from "@/components/time-alive-counter"
import { JutsuCard } from "@/components/jutsu-card"
import { SpecialMessage } from "@/components/special-message"
import { NarutoQuiz } from "@/components/naruto-quiz"
import { BirthdayMessage } from "@/components/birthday-message"
import { FloatingElements } from "@/components/floating-elements"
import { AudioControls } from "@/components/audio-controls"
import { ChakraPoints } from "@/components/chakra-points"

// Hooks and Utils
import { useAudio } from "@/hooks/use-audio"
import { handleJutsuActivation, launchConfetti } from "../../utils/confetti"

export default function Home() {
  const [showBirthdayMessage, setShowBirthdayMessage] = useState(false)
  const [showSpecialMessage, setShowSpecialMessage] = useState(false)
  const [showQuiz, setShowQuiz] = useState(false)
  const [chakraPoints, setChakraPoints] = useState(0)

  // Audio hook
  const { isPlaying, isMuted, togglePlay, toggleMute } = useAudio("/naruto_main_theme.mp3")

  // Reference for confetti
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    // Show birthday message after a delay
    const timer = setTimeout(() => {
      setShowBirthdayMessage(true)
      // Trigger confetti
      launchConfetti()
    }, 2000)

    return () => {
      clearTimeout(timer)
    }
  }, [])

  return (
    <main className="min-h-screen bg-gradient-to-b from-orange-500 to-orange-700 overflow-hidden relative">
      {/* Canvas for confetti */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-50"
        style={{ width: "100%", height: "100%" }}
      />

      {/* Floating elements animation */}
      <FloatingElements />

      {/* Audio controls */}
      <AudioControls isPlaying={isPlaying} isMuted={isMuted} togglePlay={togglePlay} toggleMute={toggleMute} />

      {/* Chakra Points */}
      <ChakraPoints points={chakraPoints} />

      {/* Birthday message popup */}
      <AnimatePresence>
        {showBirthdayMessage && (
          <BirthdayMessage
            onClose={() => setShowBirthdayMessage(false)}
            onShowSpecialMessage={() => setShowSpecialMessage(true)}
            onShowQuiz={() => setShowQuiz(true)}
          />
        )}
      </AnimatePresence>

      {/* Special Message */}
      <AnimatePresence>
        {showSpecialMessage && <SpecialMessage onClose={() => setShowSpecialMessage(false)} />}
      </AnimatePresence>

      {/* Quiz */}
      <AnimatePresence>{showQuiz && <NarutoQuiz onComplete={() => setShowQuiz(false)} />}</AnimatePresence>

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
          <div className="relative h-[150px] w-[400px] mx-auto mb-6">
            <Image src="/lele.jpeg" alt="Naruto Logo" fill className="object-contain" />
            <div className="absolute inset-0 flex items-center justify-center">
              <h1 className="text-4xl font-bold text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">LEANDRO 29 ANOS</h1>
            </div>
          </div>
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
            onClick={() => setShowQuiz(true)}
          >
            <Button className="bg-green-600 hover:bg-green-700 text-white text-lg px-6 py-3 rounded-full">
              <Sparkles className="mr-2 h-5 w-5" />
              Quiz Ninja
            </Button>
          </motion.div>
        </div>
      </motion.div>

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
                  src="/lele.jpeg"
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

      {/* Jutsu Especial de Aniversário */}
      <motion.div
        className="container mx-auto py-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.8 }}
      >
        <h2 className="text-3xl font-bold text-white text-center mb-10">Jutsus Especiais de Aniversário</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <JutsuCard
            name="Rasengan de Aniversário"
            description="Concentra chakra de felicidade em uma esfera giratória poderosa"
            icon={<span className="text-6xl">🌀</span>}
            color="bg-gradient-to-br from-blue-400/20 to-blue-600/20"
            onClick={() => handleJutsuActivation("rasengan", setChakraPoints)}
          />

          <JutsuCard
            name="Kage Bunshin no Jutsu"
            description="Cria clones para multiplicar a alegria da celebração"
            icon={<span className="text-6xl">👥</span>}
            color="bg-gradient-to-br from-orange-400/20 to-orange-600/20"
            onClick={() => handleJutsuActivation("kage", setChakraPoints)}
          />

          <JutsuCard
            name="Chidori dos Desejos"
            description="Concentra mil desejos de felicidade em um único golpe"
            icon={<span className="text-6xl">⚡</span>}
            color="bg-gradient-to-br from-purple-400/20 to-purple-600/20"
            onClick={() => handleJutsuActivation("chidori", setChakraPoints)}
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
          <div className="relative z-10 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Mensagens dos Amigos Ninjas</h2>

            <div className="max-w-2xl mx-auto space-y-4 mb-8">
              <motion.div
                className="bg-white/10 p-4 rounded-lg"
                whileHover={{ scale: 1.03, backgroundColor: "rgba(255,255,255,0.15)" }}
              >
                <p className="italic text-white/90">
                  &quot;Parabéns Leandro! Que você continue sendo o ninja mais determinado que conhecemos!&quot;
                </p>
                <p className="text-orange-300 mt-2">- Naruto Uzumaki</p>
              </motion.div>

              <motion.div
                className="bg-white/10 p-4 rounded-lg"
                whileHover={{ scale: 1.03, backgroundColor: "rgba(255,255,255,0.15)" }}
              >
                <p className="italic text-white/90">&quot;Seu poder de resolver bugs é mais forte que meu Sharingan.&quot;</p>
                <p className="text-orange-300 mt-2">- Sasuke Uchiha</p>
              </motion.div>

              <motion.div
                className="bg-white/10 p-4 rounded-lg"
                whileHover={{ scale: 1.03, backgroundColor: "rgba(255,255,255,0.15)" }}
              >
                <p className="italic text-white/90">&quot;Feliz aniversário! Você é o verdadeiro gênio da Vila!&quot;</p>
                <p className="text-orange-300 mt-2">- Kakashi Sensei</p>
              </motion.div>
            </div>

            <Button
              className="bg-orange-600 hover:bg-orange-700 text-white"
              onClick={() => {
                launchConfetti()
                setChakraPoints((prev) => prev + 5)
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
        <p>Feliz Aniversário Leandro Negreiros!</p>
        <p className="mt-2">Site criado com carinho por seus amigos ninjas. © {new Date().getFullYear()}</p>
        <p className="text-xs mt-4">
          Este é um site de fã. Naruto e todos os personagens relacionados são propriedade de Masashi Kishimoto.
        </p>
      </footer>
    </main>
  )
}
