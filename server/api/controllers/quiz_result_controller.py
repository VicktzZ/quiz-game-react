from repositories.quiz_result_repository import QuizResultRepository
from models.QuizResult import QuizResultDto

class QuizResultController:
    def __init__(self):
        self.repository = QuizResultRepository()

    async def create_quiz_result(self, result: QuizResultDto):
        return await self.repository.create_quiz_result(result)

    async def get_user_quiz_history(self, user_id: int):
        return await self.repository.get_user_quiz_history(user_id)

    async def get_quiz_result_by_id(self, result_id: int):
        return await self.repository.get_quiz_result_by_id(result_id)
