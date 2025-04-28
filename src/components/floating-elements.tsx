"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

const elements = [
  { icon: "🍜", delay: 0 },
  { icon: "⚡", delay: 0.2 },
  { icon: "🌀", delay: 0.4 },
  { icon: "🔥", delay: 0.6 },
  { icon: "💨", delay: 0.8 },
  { icon: "🌪️", delay: 1 },
  { icon: "⚔️", delay: 1.2 },
  { icon: "🎭", delay: 1.4 },
  { icon: "🏃", delay: 1.6 },
  { icon: "👊", delay: 1.8 },
  { icon: "🦊", delay: 2 },
  { icon: "🐸", delay: 2.2 },
  { icon: "🐍", delay: 2.4 },
  { icon: "🦅", delay: 2.6 },
  { icon: "🐢", delay: 2.8 },
]

export function FloatingElements() {
  const [positions, setPositions] = useState<{ left: string }[]>([])

  useEffect(() => {
    // Gerar posições apenas no cliente
    const newPositions = elements.map(() => ({
      left: `${Math.random() * 100}%`,
    }))
    setPositions(newPositions)
  }, [])

  if (positions.length === 0) {
    return null // Não renderiza nada no servidor
  }

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {elements.map((element, index) => (
        <motion.div
          key={index}
          className="absolute"
          initial={{ top: -20, left: positions[index]?.left, opacity: 0.7 }}
          animate={{
            top: ["-20px", "100vh"],
            opacity: [0.7, 0],
          }}
          transition={{
            duration: 10,
            delay: element.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <div className="text-4xl">{element.icon}</div>
        </motion.div>
      ))}
    </div>
  )
}
