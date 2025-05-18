from pydantic import BaseModel
from datetime import datetime
from typing import List
from models.User import User
from models.Quiz import Quiz
from models.UserAnswer import UserAnswer

class QuizResult(BaseModel):
    id: int
    score: int
    totalQuestions: int
    percentage: float
    createdAt: datetime
    userId: int
    quizId: int
    answers: List[UserAnswer]
    user: User
    quiz: Quiz

class QuizResultDto(BaseModel):
    score: int
    totalQuestions: int
    userId: int
    quizId: int
    answers: List[UserAnswer]

class QuizResultHistory(BaseModel):
    id: int
    score: int
    totalQuestions: int
    percentage: float
    createdAt: datetime
    quizTitle: str
    quizDescription: str | None
