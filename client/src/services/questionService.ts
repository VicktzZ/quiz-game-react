import type { Question } from "@/types"
import { Service } from "./Service"
import type { AxiosResponse } from "axios"

class QuestionService extends Service<Question> {
    constructor() {
        super("/question")
    }

    async takeRandom(count: number): Promise<AxiosResponse<Question[]>> {
        return await this.GET(`/random/${count}`) as unknown as AxiosResponse<Question[]>
    }
}

export const questionService = new QuestionService()
