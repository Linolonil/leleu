"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Star } from "lucide-react"

type BirthdayMessageProps = {
  onClose: () => void
  onShowSpecialMessage: () => void
  onShowQuiz: () => void
}

export function BirthdayMessage({ onClose, onShowSpecialMessage, onShowQuiz }: BirthdayMessageProps) {
  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center z-40"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="relative bg-gradient-to-br from-orange-600 to-orange-800 p-1 rounded-xl shadow-[0_0_30px_rgba(255,140,0,0.7)] max-w-md w-full mx-4"
        initial={{ scale: 0.5, rotate: -5 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ duration: 0.5, type: "spring", bounce: 0.4 }}
      >
        <div className="bg-black/80 backdrop-blur-md p-8 rounded-lg border-2 border-orange-400/50 text-center relative overflow-hidden">
          {/* Decorative elements */}
          {[...Array(20)].map((_, i) => (
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

          <motion.div
            className="mb-4 relative"
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Image
              src="/placeholder.svg?height=80&width=80"
              alt="Naruto Icon"
              width={80}
              height={80}
              className="mx-auto"
            />
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
            <h2 className="text-4xl font-bold text-orange-400 mb-2">PARABÉNS!</h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <p className="text-white text-2xl font-bold mb-2">Leandro Negreiros</p>

            <div className="flex justify-center items-center gap-3 my-4">
              <Star className="h-6 w-6 text-yellow-400 fill-yellow-400" />
              <span className="text-4xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 text-transparent bg-clip-text">
                29
              </span>
              <Star className="h-6 w-6 text-yellow-400 fill-yellow-400" />
            </div>

            <p className="text-white/90 mt-4">Que seu caminho ninja continue brilhante e cheio de conquistas!</p>

            <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
              <motion.button
                className="px-6 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-full font-medium transition-colors"
                onClick={() => {
                  onClose()
                  onShowSpecialMessage()
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Ver Mensagem Especial
              </motion.button>

              <motion.button
                className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-full font-medium transition-colors"
                onClick={() => {
                  onClose()
                  onShowQuiz()
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Testar Conhecimento Ninja
              </motion.button>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  )
}
