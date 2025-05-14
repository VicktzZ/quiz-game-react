import type Quiz from "./Quiz";

export default interface User {
    id: number;
    username: string;
    cpf: string;
    quizzes?: Quiz[]
}