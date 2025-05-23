/* eslint-disable @typescript-eslint/no-unused-vars */
import type { Question } from "@/types"
import type { QuizContext } from "@/types/contexts"
import { createContext, useContext, useEffect, useState } from "react"
import { useUser } from "./UserContext"
import { quizResultsService } from "@/services/quizResultsService"

const quizContext = createContext<QuizContext>({
  currentQuestion: {} as Question & { index: number },
  questions: [],
  setQuestions: () => {},
  questionsAmount: 2,
  setQuestionsAmount: () => {},
  nextQuestion: () => {},
  timerDuration: 30,
  setTimerDuration: () => {},
  isAnswered: false,
  setIsAnswered: () => {},
  selectedAnswer: null,
  setSelectedAnswer: () => {},
  isAnswerCorrect: false,
  setIsAnswerCorrect: () => {},
  score: 0,
  setScore: () => {},
  handleAnswer: () => {},
  reset: () => {},
  isQuizFinished: false,
  setIsQuizFinished: () => {},
  selectedAnswers: new Map(),
  setSelectedAnswers: (answers: Map<number, string>) => {
    // Esta função é apenas um placeholder para TypeScript
  }
})

// eslint-disable-next-line react-refresh/only-export-components
export const useQuizContext = () => useContext(quizContext)

export const QuizProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentQuestion, setCurrentQuestion] = useState({} as Question & { index: number })
  const [questions, setQuestions] = useState<Question[]>([])
  const [selectedAnswers, setSelectedAnswers] = useState<Map<number, string>>(new Map())

  const [questionsAmount, setQuestionsAmount] = useState(2)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [timerDuration, setTimerDuration] = useState(30)
  const [isAnswered, setIsAnswered] = useState(false)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(false)
  const [isQuizFinished, setIsQuizFinished] = useState(false)
  const [score, setScore] = useState(0)

  const { user } = useUser()

  const handleAnswer = (answer: string) => {
    const isCorrect = answer === currentQuestion.correctAnswer
    setSelectedAnswers(prev => {
      const newMap = new Map(prev)
      newMap.set(currentQuestionIndex, answer)
      return newMap
    })
    setIsAnswered(true)
    setSelectedAnswer(answer)
    setIsAnswerCorrect(isCorrect)

    if (isCorrect) {
      setScore(prevScore => {
        const newScore = prevScore + 1
        return newScore
      })
    }
  }

  const saveQuizResults = async () => {
    if (!user?.id || questions.length === 0) return

    try {
      const quizId = Math.floor(Math.random() * 1000000)

      const correctAnswers = Array.from(selectedAnswers.entries())
        .filter(([_, answer]) => answer)
        .map(([index, answer]) => answer === questions[index].correctAnswer)
        .filter(isCorrect => isCorrect)
        .length

      const answers = Array.from(selectedAnswers.entries())
        .map(([questionIndex, answer]) => ({
          questionId: questions[questionIndex].id,
          answer: answer || '',
          isCorrect: answer === questions[questionIndex].correctAnswer
        }))
        .filter(answer => answer.questionId && answer.answer)

      if (!user?.id || questions.length === 0 || correctAnswers < 0 || 
          !quizId || quizId <= 0 || answers.length === 0) {
        throw new Error('Dados incompletos para salvar resultados')
      }
    } catch (error) {
      console.error('Erro ao salvar resultados do quiz:', error)
    }
  }

  const reset = () => {
    setCurrentQuestionIndex(0)
    setCurrentQuestion({} as Question & { index: number })
    setQuestions([])
    setIsAnswered(false)
    setSelectedAnswer(null)
    setIsAnswerCorrect(false)
    setScore(0)
    setSelectedAnswers(new Map())
    setIsQuizFinished(false)
  }

  const nextQuestion = () => {
    setCurrentQuestionIndex(currentQuestionIndex + 1)
    setCurrentQuestion({ ...questions[currentQuestionIndex + 1], index: currentQuestionIndex })
    setIsAnswered(false)
    setSelectedAnswer(null)
  }

  useEffect(() => {
    if (isQuizFinished) {
      saveQuizResults()
    }
  }, [isQuizFinished])

  useEffect(() => {
    if (questions.length > 0) {
      setCurrentQuestion({ ...questions[currentQuestionIndex], index: currentQuestionIndex })
    }
  }, [questions, currentQuestionIndex])

  return (
    <quizContext.Provider value={{
      currentQuestion,
      questions,
      setQuestions,
      questionsAmount,
      setQuestionsAmount,
      nextQuestion,
      timerDuration,
      setTimerDuration,
      isAnswered,
      setIsAnswered,
      selectedAnswer,
      setSelectedAnswer,
      isAnswerCorrect,
      setIsAnswerCorrect,
      score,
      setScore,
      handleAnswer,
      reset,
      isQuizFinished,
      setIsQuizFinished,
      selectedAnswers,
      setSelectedAnswers
    }}>
      {children}
    </quizContext.Provider>
  )
}
