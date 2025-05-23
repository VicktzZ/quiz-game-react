from pydantic import BaseModel
from typing import List
from models.QuizResult import QuizResult

class User(BaseModel):
    id: int
    username: str
    cpf: str
    quizResults: List[QuizResult]

class UserDto(BaseModel):
    username: str
    cpf: str