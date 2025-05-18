from repositories.quiz_repository import QuizRepository
from models.Quiz import QuizDto
from models.Option import OptionDto
from prisma import Prisma
from fastapi import HTTPException

class QuizController:
    def __init__(self):
        self.repository = QuizRepository()

    async def create_quiz(self, quiz: QuizDto):
        return await self.repository.create_quiz(quiz)

    async def get_all_quizzes(self):
        return await self.repository.get_all_quizzes()

    async def get_quiz_by_id(self, id: int):
        return await self.repository.get_quiz_by_id(id)

    async def update_quiz(self, id: int, quiz: QuizDto):
        return await self.repository.update_quiz(id, quiz)

    async def delete_quiz(self, id: int):
        return await self.repository.delete_quiz(id)
