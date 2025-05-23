from prisma import Prisma
from models.Question import QuestionDto
from typing import List

class QuestionRepository:
    def __init__(self):
        self.db = Prisma()

    async def create(self, question: QuestionDto):
        try:
            result = None
            await self.db.connect()
            question_data = question.model_dump()
            created_question = await self.db.question.create(data=question_data)
            await self.db.disconnect()
            result = created_question
        except Exception as e:
            await self.db.disconnect()
            raise e
        finally:
            await self.db.disconnect()
        return result

    async def take_random(self, count: int):
        try:
            result = None
            await self.db.connect()
            questions = await self.db.question.find_many()
            
            # Garantir que temos pelo menos o número de questões solicitado
            if len(questions) < count:
                raise Exception(f"Não há {count} questões disponíveis")
            
            # Selecionar aleatoriamente as questões necessárias
            import random
            selected_questions = random.sample(questions, count)
            
            await self.db.disconnect()
            result = selected_questions
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
            questions = await self.db.question.find_many()
            await self.db.disconnect()
            result = questions
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
            question = await self.db.question.delete(where={'id': id})
            await self.db.disconnect()
            result = question
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
            question = await self.db.question.find_first(where={'id': id})
            await self.db.disconnect()
            result = question
        except Exception as e:
            await self.db.disconnect()
            raise e
        finally:
            await self.db.disconnect()
        return result
    
    async def create_multiple(self, questions: List[QuestionDto]):
        try:
            result = None
            await self.db.connect()
            questions_data = [q.model_dump() for q in questions]
            result = await self.db.question.create_many(data=questions_data)
            await self.db.disconnect()
            result = questions
        except Exception as e:
            await self.db.disconnect()
            raise e
        finally:
            await self.db.disconnect()
        return result