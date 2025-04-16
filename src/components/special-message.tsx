"use client"

import { motion } from "framer-motion"
import { Heart, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"

type SpecialMessageProps = {
  onClose: () => void
}

export function SpecialMessage({ onClose }: SpecialMessageProps) {
  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center z-50 bg-black/70 backdrop-blur-sm p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-gradient-to-br from-orange-600 to-orange-800 p-1 rounded-xl shadow-[0_0_40px_rgba(255,140,0,0.7)] max-w-2xl w-full mx-auto"
        initial={{ scale: 0.5, y: 50 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ duration: 0.5, type: "spring", bounce: 0.4 }}
      >
        <div className="bg-black/80 backdrop-blur-md p-8 rounded-lg border-2 border-orange-400/50 text-center relative overflow-hidden">
          {/* Decorative elements */}
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-orange-400/60"
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
            className="mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex justify-center items-center gap-3 mb-4">
              <Sparkles className="h-6 w-6 text-yellow-400" />
              <h2 className="text-3xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 text-transparent bg-clip-text">
                MENSAGEM ESPECIAL
              </h2>
              <Sparkles className="h-6 w-6 text-yellow-400" />
            </div>
          </motion.div>

          <motion.div
            className="space-y-4 text-left"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <p className="text-white leading-relaxed">
              <span className="text-orange-300 font-bold text-xl">Leandro,</span>
            </p>

            <p className="text-white leading-relaxed">
              Assim como Naruto nunca desistiu de seu sonho de se tornar Hokage, você também tem perseguido seus
              objetivos com a mesma determinação e coragem.
            </p>

            <p className="text-white leading-relaxed">
              Aos 29 anos, você já construiu seu próprio caminho ninja, superando desafios e conquistando vitórias que
              inspiram todos ao seu redor.
            </p>

            <p className="text-white leading-relaxed">
              Que este novo ano de vida seja repleto de momentos incríveis, novas técnicas dominadas e missões
              bem-sucedidas!
            </p>

            <p className="text-white leading-relaxed">
              Lembre-se sempre das palavras de Naruto:{" "}
              <span className="italic text-orange-300">
                "Eu nunca volto atrás na minha palavra, esse é o meu jeito ninja!"
              </span>
            </p>

            <p className="text-white leading-relaxed mt-6">
              Continue brilhando e inspirando a todos com seu jeito ninja de ser!
            </p>

            <p className="text-white font-bold text-right mt-4">
              Com carinho,
              <br />
              Seus amigos da Vila da Folha
            </p>
          </motion.div>

          <motion.div
            className="mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <Button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-2" onClick={onClose}>
              <Heart className="mr-2 h-4 w-4" /> Obrigado!
            </Button>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  )
}
