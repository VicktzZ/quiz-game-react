from repositories.question_result_repository import QuestionResultRepository
from models.QuizResult import QuizResultDto, QuizResultHistory
from models.UserAnswer import UserAnswerDto
from prisma import Prisma
from fastapi import HTTPException
from fastapi import status

class QuizResultController:
    def __init__(self):
        self.repository = QuestionResultRepository()

    async def create_quiz_result(self, result: QuizResultDto):
        return await self.repository.create_quiz_result(result)

    async def get_user_quiz_history(self, user_id: int):
        return await self.repository.get_user_quiz_history(user_id)

    async def get_quiz_result_by_id(self, result_id: int):
        return await self.repository.get_quiz_result_by_id(result_id)
