from pydantic import BaseModel
from datetime import datetime
from models.Question import Question
from models.User import User

class Quiz(BaseModel):
    id: int
    startAt: datetime
    endAt: datetime
    createdBy: int
    questions: list[Question]
    user: User

class QuizDto(BaseModel):
    endAt: datetime
    createdBy: int
    questions: list[Question]
    user: User

