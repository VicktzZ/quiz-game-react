from pydantic import BaseModel
from datetime import datetime
from models.Question import Question

class Quiz(BaseModel):
    id: int
    startAt: datetime
    endAt: datetime
    createdBy: int
    questions: list[Question]


class QuizDto(BaseModel):
    endAt: datetime

