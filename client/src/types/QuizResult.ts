export interface QuizResultAnswer {
    questionId: number
    answer: string
    isCorrect: boolean
}

export interface QuizResult {
    id: number
    score: number
    totalQuestions: number
    percentage: number
    userId: number
    answers: QuizResultAnswer[]
    createdAt: string
}