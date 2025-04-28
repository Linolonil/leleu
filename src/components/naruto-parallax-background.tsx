"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import Image from "next/image"

export function NarutoParallaxBackground() {
  const { scrollY } = useScroll()
  const matueOpacity = useTransform(scrollY, [0, 500], [0, 1])
  const matueY = useTransform(scrollY, [0, 500], [100, 0])

  return (
    <div className="fixed inset-0 -z-10">
      {/* Vila da Folha - Fundo fixo */}
      <div className="absolute inset-0">
        <Image
          src="/aldeia.jpg"
          alt="Vila da Folha"
          fill
          className="object-cover opacity-30"
          priority
        />
      </div>

      {/* Matuê - Aparece ao rolar */}
      <motion.div 
        style={{ 
          opacity: matueOpacity,
          y: matueY
        }} 
        className="absolute inset-0"
      >
        <div className="absolute bottom-0 left-0 right-0 h-[60%]">
          <Image
            src="/narutue-removebg-preview.png"
            alt="Matuê"
            fill
            className="object-contain object-bottom"
            priority
          />
        </div>
      </motion.div>

      {/* Overlay com filtro laranja e azul */}
      <div className="absolute inset-0 bg-gradient-to-b from-orange-500/30 via-blue-500/20 to-orange-500/30" />
    </div>
  )
}
