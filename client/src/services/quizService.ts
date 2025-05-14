import { Service } from "./Service"
import type { Quiz } from "@/types"

export default class QuizService extends Service<Quiz> {
    constructor() {
        super("/quiz")
    }
}