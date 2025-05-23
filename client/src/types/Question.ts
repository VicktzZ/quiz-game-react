import type Quiz from "./Quiz";

export interface BaseQuestion {
  id: number;
  category: string;
  text: string;
  correctAnswer: string;
  incorrectAnswers: string;
  quizId?: number;
  quiz?: Quiz;
  question?: string; // Alias for text
}

export interface QuestionWithIndex extends BaseQuestion {
  index: number;
}

export default interface Question extends BaseQuestion {
  index?: number; // For tracking question position in the quiz
  selectedAnswer?: string; // User's selected answer
}