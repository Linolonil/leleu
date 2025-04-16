"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Star, Gift, Sparkles } from "lucide-react"
import confetti from "canvas-confetti"

type EnhancedBirthdayPopupProps = {
  onClose: () => void
  onShowSpecialMessage: () => void
}

export function EnhancedBirthdayPopup({ onClose, onShowSpecialMessage }: EnhancedBirthdayPopupProps) {
  const handleConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#FF9800", "#FFC107", "#FFEB3B"],
    })
  }

  return (
    <motion.div
      className="fixed inset-0 z-40 flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Full screen overlay with blur */}
      <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" onClick={onClose} />

      <motion.div
        className="relative max-w-4xl w-full mx-auto z-10 p-4"
        initial={{ scale: 0.5, y: 100, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        transition={{
          duration: 0.6,
          type: "spring",
          bounce: 0.4,
        }}
      >
        <div className="bg-gradient-to-br from-orange-600 to-orange-800 p-1 rounded-xl shadow-[0_0_40px_rgba(255,140,0,0.7)]">
          <div className="bg-black/80 backdrop-blur-md p-8 rounded-lg border-2 border-orange-400/50 relative overflow-hidden">
            {/* Animated background elements */}
            {[...Array(30)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 rounded-full bg-orange-400/60"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                }}
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.7, 1, 0.7],
                }}
                transition={{
                  duration: 2 + Math.random() * 2,
                  repeat: Number.POSITIVE_INFINITY,
                  delay: Math.random() * 2,
                }}
              />
            ))}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Left side - Image and title */}
              <div className="flex flex-col items-center justify-center">
                <motion.div
                  className="mb-6 relative"
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <div className="relative w-[200px] h-[200px] rounded-full overflow-hidden border-4 border-orange-400 mb-6">
                    <Image
                      src="/placeholder.svg?height=200&width=200"
                      alt="Leandro Negreiros"
                      fill
                      className="object-cover"
                    />
                  </div>
                </motion.div>

                <motion.div
                  animate={{
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "reverse",
                  }}
                >
                  <h2 className="text-5xl font-bold text-orange-400 mb-4">PARABÉNS!</h2>
                </motion.div>

                <div className="flex justify-center items-center gap-3 my-4">
                  <Star className="h-6 w-6 text-yellow-400 fill-yellow-400" />
                  <span className="text-4xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 text-transparent bg-clip-text">
                    29
                  </span>
                  <Star className="h-6 w-6 text-yellow-400 fill-yellow-400" />
                </div>
              </div>

              {/* Right side - Content */}
              <div className="flex flex-col justify-center">
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                >
                  <h3 className="text-3xl font-bold text-white mb-4">Leandro Negreiros</h3>

                  <p className="text-white/90 mb-6 text-lg">
                    Hoje é o dia do ninja mais incrível da Vila da Folha! Que seu caminho ninja continue brilhante e
                    cheio de conquistas!
                  </p>

                  <div className="space-y-4 mb-8">
                    <div className="flex items-center gap-3">
                      <Gift className="h-5 w-5 text-orange-400" />
                      <p className="text-white/90">Prepare-se para uma celebração ninja incrível!</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Sparkles className="h-5 w-5 text-orange-400" />
                      <p className="text-white/90">Jutsus especiais, mensagens e surpresas te aguardam!</p>
                    </div>
                  </div>

                  <motion.button
                    className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-full font-medium transition-colors w-full"
                    onClick={() => {
                      handleConfetti()
                      onClose()
                      onShowSpecialMessage()
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Ver Mensagem Especial
                  </motion.button>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
