import type { Question } from "@/types"
import { enqueueSnackbar } from "notistack"
import { createContext, useContext, useEffect, useState } from "react"

interface QuizContext {
  currentQuestion: Question & { index: number }
  questions: Question[]
  setQuestions: (questions: Question[]) => void
  nextQuestion: () => void
}

const quizContext = createContext<QuizContext>({
  currentQuestion: {} as Question & { index: number },
  questions: [],
  setQuestions: () => {},
  nextQuestion: () => {}
})

// eslint-disable-next-line react-refresh/only-export-components
export const useQuizContext = () => useContext(quizContext)

export const QuizProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [ currentQuestion, setCurrentQuestion ] = useState({} as Question & { index: number })
  const [ questions, setQuestions ] = useState([] as Question[])
  const [ currentQuestionIndex, setCurrentQuestionIndex ] = useState(0)

  const nextQuestion = () => {
    setCurrentQuestionIndex(currentQuestionIndex + 1)
    setCurrentQuestion({ ...questions[currentQuestionIndex + 1], index: currentQuestionIndex })

    if (currentQuestionIndex + 1 === questions.length) {
      setQuestions([])
      setCurrentQuestionIndex(0)
      enqueueSnackbar('Você terminou o quiz!', { variant: 'success' })
    }
  }

  useEffect(() => {
    setCurrentQuestion({ ...questions[currentQuestionIndex], index: currentQuestionIndex })
  }, [questions, currentQuestionIndex])

  return (
    <quizContext.Provider value={{ currentQuestion, questions, setQuestions, nextQuestion }}>
      {children}
    </quizContext.Provider>
  )
}
