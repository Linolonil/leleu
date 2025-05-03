"use client"

import { motion } from "framer-motion"
import { Heart, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useEffect } from "react"

type SpecialMessageProps = {
  onClose: () => void
}

const specialMessageLines = [
  {
    type: "greeting",
    text: "Meu mano,",
  },
  {
    text: "Hoje, dia 4 de maio de 2025, venho através dessa mensagem te desejar tudo de melhor na sua vida. Que papai do céu abençoe todos os seus caminhos e decisões.",
    Quote:false,
  },
  {
    text: "Que você possa realizar todos os seus sonhos e vontades. Você é um cara abençoado e sabe disso!",
  },
  {
    text: "Te admiro profundamente, tanto como amigo quanto como profissional. Você foi um dos pilares para minha mudança de carreira - uma das melhores decisões que já tomei.",
  },
  {
    text: "Claro, a decisão foi minha, mas tive ótimos exemplos para seguir, e você foi um deles, senão o melhor deles.",
  },
  {
    text: "Fiz esse site como presente, já que no momento não posso te dar um presente físico como gostaria. É uma lembrança da nossa amizade.",
  },
  {
    text: "Tentei juntar o máximo que consegui... espero que goste dessa pequena surpresa! (Ou não, não sei se você já sabe kkkk)",
  },
  {
    text: "É isso, fica na paz e com Deus.",
  },
  {
    text: " Seu mano aqui te ama <3",
  },
  {
    type: "closing",
    text: "-Lino Jorge",
  },
]

export function SpecialMessage({ onClose }: SpecialMessageProps) {
  useEffect(() => {
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = "auto"
    }
  }, [])

  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center z-50 bg-black/70 backdrop-blur-sm p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-gradient-to-br from-orange-600 to-orange-800 p-1 rounded-xl shadow-[0_0_40px_rgba(255,140,0,0.7)] max-w-2xl w-full mx-auto max-h-[90vh]"
        initial={{ scale: 0.5, y: 50 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ duration: 0.5, type: "spring", bounce: 0.4 }}
      >
        <div className="bg-black/80 backdrop-blur-md p-8 rounded-lg border-2 border-orange-400/50 text-center relative overflow-y-auto max-h-[calc(90vh-2rem)]">
          {/* Decorative sparkles */}
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
                repeat: Infinity,
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
            {specialMessageLines.map((line, index) => {
              const isGreeting = line.type === "greeting"
              const isClosing = line.type === "closing"
              const isQuote = line.Quote

              return (
                <p
                  key={index}
                  className={`leading-relaxed text-white ${
                    isGreeting ? "text-orange-300 font-bold text-xl" : ""
                  } ${isQuote ? "italic text-orange-300" : ""} ${
                    isClosing ? "font-bold text-right mt-4 whitespace-pre-line" : ""
                  }`}
                >
                  {line.text}
                </p>
              )
            })}
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
