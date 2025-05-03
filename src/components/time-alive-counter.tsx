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
    const targetDate = new Date("2025-05-04") // Data do 29º aniversário

    const calculateTimeAlive = (now: Date) => {
      const endDate = now < targetDate ? now : targetDate
      
      // Cálculo preciso considerando o horário de nascimento
      let years = endDate.getFullYear() - birthDateTime.getFullYear()
      let months = endDate.getMonth() - birthDateTime.getMonth()
      let days = endDate.getDate() - birthDateTime.getDate()

      // Ajuste para horário de nascimento
      const birthHours = birthDateTime.getHours()
      const birthMinutes = birthDateTime.getMinutes()
      const currentHours = endDate.getHours()
      const currentMinutes = endDate.getMinutes()

      // Se ainda não passou do horário de nascimento no dia atual, subtrai 1 dia
      if (currentHours < birthHours || (currentHours === birthHours && currentMinutes < birthMinutes)) {
        days--
      }

      // Ajusta anos e meses se necessário
      if (months < 0 || (months === 0 && days < 0)) {
        years--
        months += 12
      }

      // Ajusta dias negativos
      if (days < 0) {
        const lastDayOfPrevMonth = new Date(endDate.getFullYear(), endDate.getMonth(), 0).getDate()
        days += lastDayOfPrevMonth
        months--
      }

      // Calcula horas, minutos e segundos desde o horário de nascimento
      let hours = currentHours - birthHours
      let minutes = currentMinutes - birthMinutes
      let seconds = endDate.getSeconds() - birthDateTime.getSeconds()

      // Ajusta valores negativos
      if (seconds < 0) {
        minutes--
        seconds += 60
      }
      if (minutes < 0) {
        hours--
        minutes += 60
      }
      if (hours < 0) {
        days--
        hours += 24
      }

      return {
        years,
        months,
        days,
        hours,
        minutes,
        seconds,
      }
    }

    const updateCounter = () => {
      setTimeAlive(calculateTimeAlive(new Date()))
    }

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