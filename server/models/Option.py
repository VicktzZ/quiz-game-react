from pydantic import BaseModel
from models.Question import Question

class Option(BaseModel):
    id: int
    text: str
    questionId: int
    question: Question

class OptionDto(BaseModel):
    text: str
