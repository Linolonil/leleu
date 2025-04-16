"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { launchConfetti } from "../../utils/confetti"

type IntroAnimationProps = {
  onComplete: () => void
}

export function IntroAnimation({ onComplete }: IntroAnimationProps) {
  const [step, setStep] = useState(0)
  const [showSkip, setShowSkip] = useState(false)

  useEffect(() => {
    // Show skip button after 3 seconds
    const timer = setTimeout(() => {
      setShowSkip(true)
    }, 3500)

    return () => clearTimeout(timer)
  }, [])

  // Auto-advance through steps
  useEffect(() => {
    if (step < 3) {
      const timer = setTimeout(
        () => {
          setStep(step + 1)
        },
        step === 0 ? 3000 : 3500,
      )

      return () => clearTimeout(timer)
    }
  }, [step])

  // Complete the intro when reaching the final step
  useEffect(() => {
    if (step === 3) {
      const timer = setTimeout(() => {
        launchConfetti()
        // Wait for confetti to show before completing
        setTimeout(onComplete, 1500)
      }, 1500)

      return () => clearTimeout(timer)
    }
  }, [step, onComplete])

  return (
    <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
      {/* Skip button */}
      <AnimatePresence>
        {showSkip && (
          <motion.div
            className="fixed top-4 left-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Button variant="ghost" className="text-white/50 hover:text-white hover:bg-white/10" onClick={onComplete}>
              Pular Intro
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Step 0: Initial fade in */}
      <AnimatePresence mode="wait">
        {step === 0 && (
          <motion.div
            key="step0"
            className="text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          >
            <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: 0 }}>
              <h2 className="text-4xl md:text-6xl font-bold text-orange-500">Preparando Jutsu Especial...</h2>
            </motion.div>
          </motion.div>
        )}

        {/* Step 1: Naruto logo */}
        {step === 1 && (
          <motion.div
            key="step1"
            className="text-center"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative w-[300px] h-[150px] mx-auto mb-8">
              <Image src="/limoneiro.jpg" alt="Naruto Logo" fill className="object-contain" />
            </div>
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                rotateZ: [0, 2, -2, 0],
              }}
              transition={{ duration: 2, repeat: 1 }}
            >
              <h3 className="text-2xl md:text-3xl text-white">Limoeiro</h3>
              <h3 className="text-2xl md:text-3xl text-white">Apresenta...</h3>
            </motion.div>
          </motion.div>
        )}

        {/* Step 2: Birthday announcement */}
        {step === 2 && (
          <motion.div
            key="step2"
            className="text-center max-w-2xl mx-auto px-4"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.2 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Uma Celebração Ninja para</h2>
            <motion.div
              animate={{
                y: [0, -10, 0],
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 2,
                repeat: 1,
                repeatType: "reverse",
              }}
            >
              <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-orange-400 to-yellow-300 text-transparent bg-clip-text mb-8">
                LEANDRO NEGREIROS
              </h1>
            </motion.div>
            <p className="text-xl md:text-2xl text-white/80">O ninja mais incrível está completando 29 anos!</p>
          </motion.div>
        )}

        {/* Step 3: Final countdown */}
        {step === 3 && (
          <motion.div
            key="step3"
            className="text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              animate={{
                scale: [1, 1.5, 3],
                opacity: [1, 1, 0],
              }}
              transition={{ duration: 2 }}
            >
              <h1 className="text-6xl md:text-8xl font-bold text-orange-500">PARABÉNS!</h1>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
