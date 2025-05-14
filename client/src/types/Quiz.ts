import type { Question, User } from ".";

export default interface Quiz {
    id: number;
    startAt: Date;
    endAt: Date;
    createdBy: number;
    questions: Question[];
    User: User;
}