from pydantic import BaseModel
from typing import Dict, List
from datetime import datetime

class Question(BaseModel):
    id: int
    category: str
    text: str
    correctAnswer: str
    incorrectAnswers: str
    createdAt: datetime
    answers: List[Dict]

class QuestionDto(BaseModel):
    category: str
    text: str
    correctAnswer: str
    incorrectAnswers: str