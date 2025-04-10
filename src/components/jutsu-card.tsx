"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type JutsuCardProps = {
  name: string
  description: string
  icon: React.ReactNode
  color: string
  onClick: () => void
}

export function JutsuCard({ name, description, icon, color, onClick }: JutsuCardProps) {
  const [isActivated, setIsActivated] = useState(false)

  const handleClick = () => {
    setIsActivated(true)
    onClick()

    // Reset after animation
    setTimeout(() => setIsActivated(false), 2000)
  }

  return (
    <motion.div
      className={cn(
        "bg-black/30 backdrop-blur-sm rounded-lg p-6 border border-white/10 relative overflow-hidden",
        isActivated && "border-orange-400",
      )}
      whileHover={{ scale: 1.03, backgroundColor: "rgba(0,0,0,0.5)" }}
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      whileTap={{ scale: 0.98 }}
    >
      {isActivated && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-orange-500/30 to-transparent"
          initial={{ x: "-100%" }}
          animate={{ x: "100%" }}
          transition={{ duration: 1, ease: "easeInOut" }}
        />
      )}

      <div className={`h-40 rounded-lg mb-4 flex items-center justify-center ${color}`}>
        <motion.div
          animate={
            isActivated
              ? {
                  scale: [1, 1.5, 1],
                  rotate: [0, 15, -15, 0],
                }
              : {}
          }
          transition={{ duration: 0.5 }}
        >
          {icon}
        </motion.div>
      </div>
      <h3 className="text-xl font-bold text-orange-300 mb-2">{name}</h3>
      <p className="text-white/80 mb-4">{description}</p>
      <Button
        variant="outline"
        className="border-orange-500 text-white hover:bg-orange-600 w-full"
        onClick={handleClick}
      >
        {isActivated ? "Jutsu Ativado!" : "Ativar Jutsu"}
      </Button>
    </motion.div>
  )
}
