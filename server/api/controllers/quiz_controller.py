from repositories.quiz_repository import QuizRepository
from models.Quiz import QuizDto

class QuizController:
    def __init__(self):
        self.quiz_repository = QuizRepository()

    async def create_quiz(self, quiz: QuizDto):
        return await self.quiz_repository.create(quiz)

    async def get_all_quizzes(self):
        return await self.quiz_repository.get_all()

    async def get_quiz_by_id(self, id: int):
        return await self.quiz_repository.find_by_id(id)

    async def update_quiz(self, id: int, quiz: QuizDto):
        return await self.quiz_repository.update(id, quiz)

    async def delete_quiz(self, id: int):
        return await self.quiz_repository.delete(id)
