import type Quiz from "./Quiz";

export default interface Question {
    id: number;
    category: string;
    text: string;
    correctAnswer: string;
    incorrectAnswers: string;
    quizId?: number;
    quiz?: Quiz
}