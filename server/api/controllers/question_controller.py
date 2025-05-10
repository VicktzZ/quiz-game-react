from repositories.question_repository import QuestionRepository
from models.Question import QuestionDto

class QuestionController:
    def __init__(self):
        self.question_repository = QuestionRepository()

    async def create_question(self, question: QuestionDto):
        return await self.question_repository.create(question)

    async def get_all_questions(self):
        return await self.question_repository.get_all()

    async def get_question_by_id(self, id: int):
        return await self.question_repository.find_by_id(id)

    async def update_question(self, id: int, question: QuestionDto):
        return await self.question_repository.update(id, question)

    async def delete_question(self, id: int):
        return await self.question_repository.delete(id)
