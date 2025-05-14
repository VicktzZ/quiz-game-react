import type { Question } from "@/types"
import { Service } from "./Service"

class QuestionService extends Service<Question> {
    constructor() {
        super("/question")
    }

    async takeRandom(count: number) {
        return await this.GET(`/random/${count}`)
    }
}

export const questionService = new QuestionService()
