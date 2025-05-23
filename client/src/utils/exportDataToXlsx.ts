import type { QuizResult } from "@/types";
import { Workbook } from 'exceljs'

export function exportDataToXlsx(quizHistory: QuizResult[]) {
    const workbook = new Workbook()
    const worksheet = workbook.addWorksheet('Quiz History')

    worksheet.columns = [
        { header: 'Quiz ID', key: 'id', width: 10 },
        { header: 'Score', key: 'score', width: 10 },
        { header: 'Total Questions', key: 'totalQuestions', width: 15 },
        { header: 'Percentage', key: 'percentage', width: 15 },
        { header: 'User ID', key: 'userId', width: 10 },
        { header: 'Created At', key: 'createdAt', width: 20 },
    ]

    quizHistory.forEach((quiz) => {
        worksheet.addRow({
            id: quiz.id,
            score: quiz.score,
            totalQuestions: quiz.totalQuestions,
            percentage: quiz.percentage,
            userId: quiz.userId,
            createdAt: quiz.createdAt
        })  
    })

    workbook.xlsx.writeBuffer().then((buffer) => {
        const blob = new Blob([buffer], { type: 'application/octet-stream' })
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = 'quiz_history.xlsx'
        a.click()
        URL.revokeObjectURL(url)
    })
}
