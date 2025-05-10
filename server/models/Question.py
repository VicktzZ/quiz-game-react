from pydantic import BaseModel

class Question(BaseModel):
    id: int
    category: str
    text: str
    correctAnswer: str
    incorrectAnswers: str
    quizId: int

class QuestionDto(BaseModel):
    category: str
    text: str
    correctAnswer: str
    incorrectAnswers: str