"use client"

import { Zap } from "lucide-react"

type ChakraPointsProps = {
  points: number
}

export function ChakraPoints({ points }: ChakraPointsProps) {
  return (
    <div className="fixed top-4 left-4 z-50 bg-black/40 backdrop-blur-sm px-3 py-2 rounded-full flex items-center gap-2 border border-orange-500/30">
      <Zap className="h-4 w-4 text-yellow-400 fill-yellow-400" />
      <span className="text-white font-medium">{points} Chakra</span>
    </div>
  )
}
