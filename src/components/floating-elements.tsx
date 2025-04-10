"use client"

import { motion } from "framer-motion"

export function FloatingElements() {
  return (
    <div className="absolute inset-0 pointer-events-none">
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute"
          initial={{
            top: -20,
            left: `${Math.random() * 100}%`,
            rotate: 0,
            opacity: 0.7,
          }}
          animate={{
            top: "100vh",
            rotate: 360,
            opacity: 0,
          }}
          transition={{
            duration: 15 + Math.random() * 10,
            repeat: Number.POSITIVE_INFINITY,
            delay: Math.random() * 5,
            ease: "linear",
          }}
        >
          {i % 3 === 0 ? (
            <div className="text-2xl">🍥</div> // Naruto's ramen fish cake symbol
          ) : i % 3 === 1 ? (
            <div className="text-2xl">🎂</div> // Cake emoji
          ) : (
            <div className="text-2xl">🎁</div> // Gift emoji
          )}
        </motion.div>
      ))}
    </div>
  )
}
