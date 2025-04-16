"use client"

import { motion } from "framer-motion"
import Image from "next/image"

type FriendMessageCardProps = {
  message: string
  name: string
  image?: string
  delay?: number
}

export function FriendMessageCard({ message, name, image, delay = 0 }: FriendMessageCardProps) {
  return (
    <motion.div
      className="bg-white/10 rounded-lg overflow-hidden"
      whileHover={{ scale: 1.03, backgroundColor: "rgba(255,255,255,0.15)" }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
    >
      <div className="flex flex-col sm:flex-row items-center gap-4 p-4">
        {image && (
          <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-orange-400 flex-shrink-0">
            <Image src={image || "/placeholder.svg"} alt={name} fill className="object-cover" />
          </div>
        )}

        <div className="flex-1">
          <p className="italic text-white/90 mb-2">{message}</p>
          <p className="text-orange-300 font-medium">{name}</p>
        </div>
      </div>
    </motion.div>
  )
}
