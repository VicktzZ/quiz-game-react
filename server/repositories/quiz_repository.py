from prisma import Prisma
from models.Quiz import QuizDto

class QuizRepository:
    def __init__(self):
        self.db = Prisma()

    async def create(self, quiz: QuizDto):
        await self.db.connect()
        quiz = await self.db.quiz.create(quiz)
        await self.db.disconnect()
        return quiz

    async def get_all(self):
        await self.db.connect()
        quizzes = await self.db.quiz.find_many()
        await self.db.disconnect()
        return quizzes

    async def delete(self, id: int):
        await self.db.connect()
        quiz = await self.db.quiz.delete(where={'id': id})
        await self.db.disconnect()
        return quiz

    async def find_by_id(self, id: int):
        await self.db.connect()
        quiz = await self.db.quiz.find_first(where={'id': id})
        await self.db.disconnect()
        return quiz