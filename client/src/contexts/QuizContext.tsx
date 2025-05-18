import type { Question } from "@/types"
import type { QuizContext } from "@/types/contexts"
import { createContext, useContext, useEffect, useState } from "react"

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
  setIsQuizFinished: () => {}
})

// eslint-disable-next-line react-refresh/only-export-components
export const useQuizContext = () => useContext(quizContext)

export const QuizProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentQuestion, setCurrentQuestion] = useState({} as Question & { index: number })
  const [questions, setQuestions] = useState<Question[]>([])
  const [questionsAmount, setQuestionsAmount] = useState(2)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [timerDuration, setTimerDuration] = useState(30)
  const [isAnswered, setIsAnswered] = useState(false)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(false)
  const [isQuizFinished, setIsQuizFinished] = useState(false)
  const [score, setScore] = useState(0)

  const handleAnswer = (answer: string) => {
    const isCorrect = answer === currentQuestion.correctAnswer
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

  const reset = () => {
    setCurrentQuestionIndex(0)
    setCurrentQuestion({} as Question & { index: number })
    setQuestions([])
    setIsAnswered(false)
    setSelectedAnswer(null)
    setIsAnswerCorrect(false)
    setScore(0)
    setIsQuizFinished(false)
  }

  const nextQuestion = () => {
    setCurrentQuestionIndex(currentQuestionIndex + 1)
    setCurrentQuestion({ ...questions[currentQuestionIndex + 1], index: currentQuestionIndex })
    setIsAnswered(false)
    setSelectedAnswer(null)
  }

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
      setIsQuizFinished
    }}>
      {children}
    </quizContext.Provider>
  )
}
