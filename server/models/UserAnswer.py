from pydantic import BaseModel
from models.Question import Question

class UserAnswer(BaseModel):
    id: int
    questionId: int
    answer: str
    isCorrect: bool
    question: Question

class UserAnswerDto(BaseModel):
    questionId: int
    answer: str
