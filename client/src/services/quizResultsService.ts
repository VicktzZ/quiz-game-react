import type { AxiosResponse } from "axios"
import { Service } from "./Service"
import type { QuizResult } from "@/types"

export class QuizResultsService extends Service<QuizResult> {
    constructor() {
        super("/quiz-results")
    }

    async getQuizHistory(userId: number): Promise<AxiosResponse<QuizResult[]>> {
        return await this.instance.get(`/history/${userId}`)
    }
}

export const quizResultsService = new QuizResultsService()