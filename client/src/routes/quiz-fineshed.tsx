import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useEffect, useState } from "react";
import Confetti from 'react-confetti'
import { useQuizContext } from "@/contexts/QuizContext"
import { useTheme } from '@/theme';

export const Route = createFileRoute('/quiz-fineshed')({
  component: RouteComponent,
})

function RouteComponent() {
  const [exploding, setExploding] = useState(false);
  const { score, questionsAmount, reset, isQuizFinished } = useQuizContext()
  const { theme } = useTheme()
  const navigate = useNavigate()

  useEffect(() => {
    setExploding(true);
    setTimeout(() => {
      setExploding(false);
    }, 5000);
  }, []);

  if (!isQuizFinished) {
    navigate({ to: '/' })
  }

  const handleRestart = () => {
    reset()
    navigate({ to: '/' })
  }

  const percentage = Math.round((score / questionsAmount) * 100)
  const grade = getGrade(percentage)

  return (
    <div className="min-h-screen p-4">
      <Confetti recycle={exploding} />
      
      <div className={`max-w-2xl mx-auto rounded-lg shadow-lg p-8 z-10 ${theme === "dark" ? "dark-card" : "light-card"}`}>
        <div className="text-center">
          <h1 className="text-4xl font-bold text-blue-600 mb-4">Parabéns!</h1>
          <div className="text-3xl font-semibold mb-6">
            Você acertou {score} de {questionsAmount} perguntas
          </div>
          <div className="text-2xl font-semibold mb-8">
            {percentage}% de acerto
          </div>
          
          <div className="bg-blue-100 p-4 rounded-lg mb-8">
            <p className="text-lg font-medium text-gray-700">
              {grade}
            </p>
          </div>

          <button
            onClick={handleRestart}
            className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Jogar Novamente
          </button>
        </div>
      </div>
    </div>
  );
}

function getGrade(percentage: number) {
  if (percentage >= 90) return "Excelente! Você é um verdadeiro especialista!"
  if (percentage >= 80) return "Ótimo! Você tem um excelente conhecimento!"
  if (percentage >= 70) return "Bom! Você se saiu bem!"
  if (percentage >= 60) return "Regular! Você pode melhorar um pouco mais!"
  return "Precisa melhorar! Tente novamente!"
}
