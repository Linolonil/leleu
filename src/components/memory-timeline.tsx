"use client"

import { motion } from "framer-motion"
import Image from "next/image"

type TimelineEvent = {
  date: string
  title: string
  description: string
  image?: string
}

type MemoryTimelineProps = {
  events: TimelineEvent[]
}

export function MemoryTimeline({ events }: MemoryTimelineProps) {
  return (
    <div className="relative">
      {/* Timeline line */}
      <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-orange-500/50" />

      <div className="space-y-16">
        {events.map((event, index) => (
          <motion.div
            key={index}
            className={`flex items-center ${index % 2 === 0 ? "flex-row" : "flex-row-reverse"} relative`}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2, duration: 0.5 }}
          >
            {/* Content */}
            <div className={`w-1/2 ${index % 2 === 0 ? "pr-8 text-right" : "pl-8"}`}>
              <h3 className="text-xl font-bold text-orange-300 mb-1">{event.title}</h3>
              <p className="text-white/80">{event.description}</p>
            </div>

            {/* Center dot */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full bg-orange-500 border-4 border-orange-700 z-10" />

            {/* Image */}
            <div className={`w-1/2  ${index % 2 === 0 ? "pl-8" : "pr-8"}`}>
              {event.image && (
                <div className="relative h-[500px] w-full rounded-lg overflow-hidden border-2 border-orange-400/30">
                  <Image src={event.image || "/placeholder.svg"} alt={event.title} fill className="object-cover object-top" />
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
