from typing import List
from datetime import datetime
from models.QuizResult import QuizResultDto, QuizResultHistory
from models.UserAnswer import UserAnswerDto
from prisma import Prisma
from fastapi import HTTPException
from fastapi import status

class QuestionResultRepository:
    def __init__(self):
        self.db = Prisma()

    async def create_quiz_result(self, result: QuizResultDto) -> QuizResultHistory:
        await self.db.connect()
        try:
            quiz_result = await self.db.quizResult.create({
                "score": result.score,
                "totalQuestions": result.totalQuestions,
                "percentage": (result.score / result.totalQuestions) * 100,
                "userId": result.userId,
                "quizId": result.quizId
            })

            for answer in result.answers:
                await self.db.userAnswer.create({
                    "answer": answer.answer,
                    "questionId": answer.questionId,
                    "isCorrect": answer.question.correctAnswer == answer.answer,
                    "quizResultId": quiz_result.id
                })

            return quiz_result
        except Exception as e:
            raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))
        finally:
            await self.db.disconnect()

    async def get_user_quiz_history(self, user_id: int) -> List[QuizResultHistory]:
        await self.db.connect()
        try:
            return await self.db.quizResult.find_many(
                where={"userId": user_id},
                include={
                    "answers": True,
                    "User": True,
                    "Quiz": True
                }
            )
        except Exception as e:
            raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))
        finally:
            await self.db.disconnect()

    async def get_quiz_result_by_id(self, result_id: int) -> QuizResultHistory:
        await self.db.connect()
        try:
            return await self.db.quizResult.find_unique(
                where={"id": result_id},
                include={
                    "answers": True,
                    "User": True,
                    "Quiz": True
                }
            )
        except Exception as e:
            raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))
        finally:
            await self.db.disconnect()