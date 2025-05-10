from prisma import Prisma
from models.Question import QuestionDto

class QuestionRepository:
    def __init__(self):
        self.db = Prisma()

    async def create(self, question: QuestionDto):
        await self.db.connect()
        question = await self.db.question.create(question)
        await self.db.disconnect()
        return question

    async def get_all(self):
        await self.db.connect()
        questions = await self.db.question.find_many()
        await self.db.disconnect()
        return questions

    async def delete(self, id: int):
        await self.db.connect()
        question = await self.db.question.delete(where={'id': id})
        await self.db.disconnect()
        return question

    async def find_by_id(self, id: int):
        await self.db.connect()
        question = await self.db.question.find_first(where={'id': id})
        await self.db.disconnect()
        return question