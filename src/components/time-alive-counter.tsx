"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

type TimeAliveProps = {
  birthDate: string
}

type TimeUnits = {
  years: number
  months: number
  days: number
  hours: number
  minutes: number
  seconds: number
}

export function TimeAliveCounter({ birthDate }: TimeAliveProps) {
  const [timeAlive, setTimeAlive] = useState<TimeUnits>({
    years: 0,
    months: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    const birthDateTime = new Date(birthDate)

    const updateCounter = () => {
      const now = new Date()

      // Calculate years
      let years = now.getFullYear() - birthDateTime.getFullYear()

      // Calculate months
      let months = now.getMonth() - birthDateTime.getMonth()
      if (months < 0) {
        years--
        months += 12
      }

      // Calculate other units
      const birthDateThisMonth = new Date(
        now.getFullYear(),
        now.getMonth(),
        birthDateTime.getDate(),
        birthDateTime.getHours(),
        birthDateTime.getMinutes(),
        birthDateTime.getSeconds(),
      )

      let days, hours, minutes, seconds

      if (now < birthDateThisMonth) {
        // If the birth day this month hasn't occurred yet
        const lastMonth = new Date(
          now.getFullYear(),
          now.getMonth() - 1,
          birthDateTime.getDate(),
          birthDateTime.getHours(),
          birthDateTime.getMinutes(),
          birthDateTime.getSeconds(),
        )
        const diffMs = now.getTime() - lastMonth.getTime()

        // Convert to days, hours, minutes, seconds
        const diffSecs = Math.floor(diffMs / 1000)
        days = Math.floor(diffSecs / (24 * 60 * 60))
        const remainingSecs = diffSecs % (24 * 60 * 60)
        hours = Math.floor(remainingSecs / (60 * 60))
        const remainingMins = remainingSecs % (60 * 60)
        minutes = Math.floor(remainingMins / 60)
        seconds = remainingMins % 60
      } else {
        // If the birth day this month has occurred
        const diffMs = now.getTime() - birthDateThisMonth.getTime()

        // Convert to days, hours, minutes, seconds
        const diffSecs = Math.floor(diffMs / 1000)
        days = Math.floor(diffSecs / (24 * 60 * 60))
        const remainingSecs = diffSecs % (24 * 60 * 60)
        hours = Math.floor(remainingSecs / (60 * 60))
        const remainingMins = remainingSecs % (60 * 60)
        minutes = Math.floor(remainingMins / 60)
        seconds = remainingMins % 60
      }

      setTimeAlive({
        years,
        months,
        days,
        hours,
        minutes,
        seconds,
      })
    }

    // Update immediately and then every second
    updateCounter()
    const interval = setInterval(updateCounter, 1000)

    return () => clearInterval(interval)
  }, [birthDate])

  const timeUnits = [
    { label: "Anos", value: timeAlive.years },
    { label: "Meses", value: timeAlive.months },
    { label: "Dias", value: timeAlive.days },
    { label: "Horas", value: timeAlive.hours },
    { label: "Minutos", value: timeAlive.minutes },
    { label: "Segundos", value: timeAlive.seconds },
  ]

  return (
    <div className="grid grid-cols-2 md:grid-cols-6 gap-4 max-w-4xl mx-auto">
      {timeUnits.map((item, index) => (
        <motion.div
          key={index}
          className="bg-black/50 backdrop-blur-sm rounded-lg p-4 border border-orange-500/30"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1 * index, duration: 0.5 }}
          whileHover={{ scale: 1.05, borderColor: "rgba(255,165,0,0.6)" }}
        >
          <div className="text-3xl md:text-4xl font-bold text-orange-400 mb-2">
            {item.value.toString().padStart(2, "0")}
          </div>
          <div className="text-white/80 text-sm md:text-base">{item.label}</div>
        </motion.div>
      ))}
    </div>
  )
}
