"use client"

import { useEffect, useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import Image from "next/image"

export function NarutoParallaxBackground() {
  const { scrollY } = useScroll()
  const [isMobile, setIsMobile] = useState(false)
  const [y1, setY1] = useState(0)
  const [y2, setY2] = useState(0)
  const [y3, setY3] = useState(0)
  const [opacity, setOpacity] = useState(1)

  // Check if mobile on mount
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)

    return () => {
      window.removeEventListener("resize", checkMobile)
    }
  }, [])

  // Set up transforms
  const y1Transform = useTransform(scrollY, [0, 1000], [0, -150])
  const y2Transform = useTransform(scrollY, [0, 1000], [0, -100])
  const y3Transform = useTransform(scrollY, [0, 1000], [0, -50])
  const opacityTransform = useTransform(scrollY, [0, 300], [1, 0.3])

  // Apply transforms
  useEffect(() => {
    if (!isMobile) {
      const y1Unsubscribe = y1Transform.onChange(setY1)
      const y2Unsubscribe = y2Transform.onChange(setY2)
      const y3Unsubscribe = y3Transform.onChange(setY3)
      const opacityUnsubscribe = opacityTransform.onChange(setOpacity)

      return () => {
        y1Unsubscribe()
        y2Unsubscribe()
        y3Unsubscribe()
        opacityUnsubscribe()
      }
    }
  }, [isMobile, y1Transform, y2Transform, y3Transform, opacityTransform])

  // Don't apply parallax on mobile for better performance
  if (isMobile) {
    return (
      <div className="fixed inset-0 z-[-1] pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-orange-500/30 to-orange-700/30" />
        <Image
          src="/aldeia.jpg"
          alt="Naruto Background"
          fill
          className="object-cover opacity-20"
        />
      </div>
    )
  }

  // Parallax elements for desktop
  return (
    <div className="fixed inset-0 z-[-1] pointer-events-none overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-orange-500/30 to-orange-700/30" />

      {/* Far background */}
      <motion.div style={{ y: y1, opacity }} className="absolute inset-0">
        <Image
          src="/aldeia.jpg"
          alt="Naruto Background Mountains"
          fill
          className="object-cover opacity-20"
        />
      </motion.div>

      {/* Mid background */}
      <motion.div style={{ y: y2, opacity }} className="absolute inset-0">
        <div className="absolute bottom-0 left-0 right-0 h-[40%]">
          <Image
            src="/placeholder.svg?height=400&width=1920"
            alt="Naruto Background Trees"
            fill
            className="object-cover opacity-30"
          />
        </div>
      </motion.div>

      {/* Foreground */}
      <motion.div style={{ y: y3, opacity }} className="absolute inset-0">
        <div className="absolute bottom-0 left-0 right-0 h-[20%]">
          <Image
            src="/placeholder.svg?height=200&width=1920"
            alt="Naruto Background Foreground"
            fill
            className="object-cover opacity-40"
          />
        </div>
      </motion.div>
    </div>
  )
}
