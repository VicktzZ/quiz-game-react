from typing import List
from models.QuizResult import QuizResultDto, QuizResultHistory
from prisma import Prisma
from fastapi import HTTPException
from fastapi import status

class QuizResultRepository:
    def __init__(self):
        self.db = Prisma()

    async def create_quiz_result(self, result: QuizResultDto) -> QuizResultHistory:
        try:
            await self.db.connect()
            quiz_result = await self.db.quizresult.create(
                data={
                    "score": result.score,
                    "totalQuestions": result.totalQuestions,
                    "percentage": (result.score / result.totalQuestions) * 100,
                    "userId": result.userId,
                }
            )

            for answer in result.answers:
                await self.db.useranswer.create(
                    data={
                        "answer": answer.answer,
                        "questionId": answer.questionId,
                        "isCorrect": answer.isCorrect,
                        "quizResultId": quiz_result.id
                    }
                )

            return quiz_result
        except Exception as e:
            raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))
        finally:
            await self.db.disconnect()

    async def get_user_quiz_history(self, user_id: int) -> List[QuizResultHistory]:
        await self.db.connect()
        try:
            return await self.db.quizresult.find_many(
                where={"userId": user_id},
                include={
                    "answers": True,
                    "User": True,
                }
            )
        except Exception as e:
            raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))
        finally:
            await self.db.disconnect()

    async def get_quiz_result_by_id(self, result_id: int) -> QuizResultHistory:
        await self.db.connect()
        try:
            return await self.db.quizresult.find_unique(
                where={"id": result_id},
                include={
                    "answers": True,
                    "User": True,
                }
            )
        except Exception as e:
            raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))
        finally:
            await self.db.disconnect()