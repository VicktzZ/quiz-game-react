from pydantic import BaseModel
from typing import Dict
from models.Question import Question

class UserAnswer(BaseModel):
    id: int
    questionId: int
    answer: str
    isCorrect: bool
    question: Question
    quizResult: Dict

class UserAnswerDto(BaseModel):
    questionId: int
    answer: str
    isCorrect: bool
