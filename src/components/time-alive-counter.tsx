"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

type TimeAlive = {
  years: number
  months: number
  days: number
  hours: number
  minutes: number
  seconds: number
}

export function TimeAliveCounter() {
  const [timeAlive, setTimeAlive] = useState<TimeAlive>({
    years: 0,
    months: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })

  useEffect(() => {
    // Data de nascimento: 4 de maio de 1996, 00:00 em Manaus (UTC-4)
    const birthDate = new Date("1996-05-04T00:00:00-04:00")
    
    const calculateTimeAlive = () => {
      const now = new Date()
      
      // Cálculo básico de anos
      let years = now.getFullYear() - birthDate.getFullYear()
      
      // Verifica se já fez aniversário este ano
      const currentMonth = now.getMonth()
      const birthMonth = birthDate.getMonth()
      const currentDay = now.getDate()
      const birthDay = birthDate.getDate()
      
      if (currentMonth < birthMonth || (currentMonth === birthMonth && currentDay < birthDay)) {
        years--
      }
      
      // Data do último aniversário
      const lastBirthday = new Date(birthDate)
      lastBirthday.setFullYear(now.getFullYear())
      
      if (now < lastBirthday) {
        lastBirthday.setFullYear(now.getFullYear() - 1)
      }
      
      // Calcula meses desde o último aniversário
      let months = (now.getFullYear() - lastBirthday.getFullYear()) * 12
      months += now.getMonth() - lastBirthday.getMonth()
      
      // Ajusta se o dia atual é anterior ao dia do aniversário
      if (now.getDate() < lastBirthday.getDate()) {
        months--
      }
      
      // Calcula dias desde o início do período atual
      const startDate = new Date(lastBirthday)
      startDate.setMonth(lastBirthday.getMonth() + months)
      
      let days = Math.floor((now.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24))
      
      // Calcula horas, minutos e segundos do dia atual
      const hours = now.getHours()
      const minutes = now.getMinutes()
      const seconds = now.getSeconds()
      
      return {
        years,
        months,
        days,
        hours,
        minutes,
        seconds
      }
    }

    const updateCounter = () => {
      setTimeAlive(calculateTimeAlive())
    }

    updateCounter()
    const interval = setInterval(updateCounter, 1000)

    return () => clearInterval(interval)
  }, [])

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