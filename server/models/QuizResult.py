from pydantic import BaseModel
from datetime import datetime
from typing import Dict, List
from models.UserAnswer import UserAnswer

class QuizResult(BaseModel):
    id: int
    score: int
    totalQuestions: int
    percentage: float
    createdAt: datetime
    userId: int
    answers: List[UserAnswer]
    user: Dict

class QuizResultAnswer(BaseModel):
    questionId: int
    answer: str
    isCorrect: bool

class QuizResultDto(BaseModel):
    score: int
    totalQuestions: int
    userId: int
    answers: List[QuizResultAnswer]

class QuizResultHistory(BaseModel):
    id: int
    score: int
    totalQuestions: int
    percentage: float
    createdAt: datetime
