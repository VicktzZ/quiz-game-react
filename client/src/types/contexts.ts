import type Question from "./Question"

export interface QuizContext {
  currentQuestion: Question & { index: number }
  questions: Question[]
  setQuestions: (questions: Question[]) => void
  questionsAmount: number
  setQuestionsAmount: (amount: number) => void
  nextQuestion: () => void
  timerDuration: number
  setTimerDuration: (duration: number) => void
  isAnswered: boolean
  setIsAnswered: (isAnswered: boolean) => void
  selectedAnswer: string | null
  setSelectedAnswer: (answer: string | null) => void
  isAnswerCorrect: boolean
  setIsAnswerCorrect: (isCorrect: boolean) => void
  score: number
  setScore: (score: number) => void
  handleAnswer: (answer: string) => void
  reset: () => void
  isQuizFinished: boolean
  setIsQuizFinished: (isQuizFinished: boolean) => void
}