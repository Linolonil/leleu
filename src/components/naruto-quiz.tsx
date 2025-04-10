"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import confetti from "canvas-confetti"

type NarutoQuizProps = {
  onComplete: () => void
}

type Question = {
  question: string
  options: string[]
  answer: number
}

export function NarutoQuiz({ onComplete }: NarutoQuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [showResult, setShowResult] = useState(false)

  const questions: Question[] = [
    {
      question: "Qual é o nome do jutsu de assinatura do Naruto?",
      options: ["Chidori", "Rasengan", "Kamehameha", "Amaterasu"],
      answer: 1,
    },
    {
      question: "Quem foi o mentor de Naruto?",
      options: ["Kakashi", "Jiraiya", "Tsunade", "Orochimaru"],
      answer: 1,
    },
    {
      question: "Qual é o nome da raposa de nove caudas?",
      options: ["Shukaku", "Matatabi", "Kurama", "Gyuki"],
      answer: 2,
    },
  ]

  const handleAnswer = (selectedOption: number) => {
    if (selectedOption === questions[currentQuestion].answer) {
      setScore(score + 1)
    }

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      setShowResult(true)
    }
  }

  const handleClose = () => {
    onComplete()
    if (score >= 2) {
      // Launch confetti for good score
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      })
    }
  }

  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center z-50 bg-black/70 backdrop-blur-sm p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-gradient-to-br from-blue-600 to-blue-800 p-1 rounded-xl shadow-lg max-w-md w-full mx-auto"
        initial={{ scale: 0.5, y: 50 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="bg-black/80 backdrop-blur-md p-6 rounded-lg border-2 border-blue-400/50 relative overflow-hidden">
          {!showResult ? (
            <>
              <h3 className="text-xl font-bold text-blue-300 mb-6 text-center">
                Quiz Ninja - Pergunta {currentQuestion + 1}/{questions.length}
              </h3>

              <p className="text-white mb-4">{questions[currentQuestion].question}</p>

              <div className="space-y-3">
                {questions[currentQuestion].options.map((option, index) => (
                  <motion.button
                    key={index}
                    className="w-full p-3 bg-blue-900/50 hover:bg-blue-800/50 text-white text-left rounded-md border border-blue-700/50"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleAnswer(index)}
                  >
                    {option}
                  </motion.button>
                ))}
              </div>
            </>
          ) : (
            <div className="text-center">
              <h3 className="text-xl font-bold text-blue-300 mb-4">Resultado do Quiz</h3>

              <p className="text-white text-2xl mb-2">Você acertou:</p>
              <p className="text-3xl font-bold text-blue-300 mb-6">
                {score}/{questions.length}
              </p>

              <p className="text-white mb-6">
                {score === 3
                  ? "Incrível! Você é um verdadeiro ninja!"
                  : score === 2
                    ? "Muito bom! Você conhece bem o mundo ninja!"
                    : "Continue treinando seus conhecimentos ninja!"}
              </p>

              <Button className="bg-blue-600 hover:bg-blue-700 text-white" onClick={handleClose}>
                Concluir
              </Button>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}
