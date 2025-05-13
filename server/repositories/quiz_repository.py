from prisma import Prisma
from models.Quiz import QuizDto

class QuizRepository:
    def __init__(self):
        self.db = Prisma()

    async def create(self, quiz: QuizDto):
        try:
            result = None
            await self.db.connect()
            quiz_data = quiz.model_dump()
            created_quiz = await self.db.quiz.create(data=quiz_data)
            await self.db.disconnect()
            result = created_quiz
        except Exception as e:
            await self.db.disconnect()
            raise e
        finally:
            await self.db.disconnect()
        return result

    async def get_all(self):
        try:
            result = None
            await self.db.connect()
            quizzes = await self.db.quiz.find_many()
            await self.db.disconnect()
            result = quizzes
        except Exception as e:
            await self.db.disconnect()
            raise e
        finally:
            await self.db.disconnect()
        return result

    async def delete(self, id: int):
        try:
            result = None
            await self.db.connect()
            quiz = await self.db.quiz.delete(where={'id': id})
            await self.db.disconnect()
            result = quiz
        except Exception as e:
            await self.db.disconnect()
            raise e
        finally:
            await self.db.disconnect()
        return result

    async def find_by_id(self, id: int):
        try:
            result = None
            await self.db.connect()
            quiz = await self.db.quiz.find_first(where={'id': id})
            await self.db.disconnect()
            result = quiz
        except Exception as e:
            await self.db.disconnect()
            raise e
        finally:
            await self.db.disconnect()
        return result