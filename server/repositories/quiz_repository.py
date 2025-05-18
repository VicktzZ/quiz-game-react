from prisma import Prisma
from models.Quiz import QuizDto
from models.Option import OptionDto
from fastapi import HTTPException
from fastapi import status

class QuizRepository:
    def __init__(self):
        self.db = Prisma()

    async def create_quiz(self, quiz: QuizDto):
        await self.db.connect()
        try:
            quiz_data = await self.db.quiz.create({
                "title": quiz.title,
                "description": quiz.description,
                "createdBy": quiz.createdBy
            })

            for question in quiz.questions:
                question_data = await self.db.question.create({
                    "text": question.text,
                    "correctAnswer": question.correctAnswer,
                    "quizId": quiz_data.id
                })

                for option in question.options:
                    await self.db.option.create({
                        "text": option.text,
                        "questionId": question_data.id
                    })

            return quiz_data
        except Exception as e:
            raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))
        finally:
            await self.db.disconnect()

    async def get_all_quizzes(self):
        await self.db.connect()
        try:
            quizzes = await self.db.quiz.find_many(
                include={
                    "questions": {
                        "include": {
                            "options": True
                        }
                    }
                }
            )
            return quizzes
        except Exception as e:
            raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))
        finally:
            await self.db.disconnect()

    async def get_quiz_by_id(self, id: int):
        await self.db.connect()
        try:
            quiz = await self.db.quiz.find_unique(
                where={"id": id},
                include={
                    "questions": {
                        "include": {
                            "options": True
                        }
                    }
                }
            )
            if not quiz:
                raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Quiz not found")
            return quiz
        except Exception as e:
            raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))
        finally:
            await self.db.disconnect()

    async def update_quiz(self, id: int, quiz: QuizDto):
        await self.db.connect()
        try:
            quiz_data = await self.db.quiz.update(
                where={"id": id},
                data={
                    "title": quiz.title,
                    "description": quiz.description,
                    "createdBy": quiz.createdBy
                }
            )
            return quiz_data
        except Exception as e:
            raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))
        finally:
            await self.db.disconnect()

    async def delete_quiz(self, id: int):
        await self.db.connect()
        try:
            quiz = await self.db.quiz.delete(where={"id": id})
            return quiz
        except Exception as e:
            raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))