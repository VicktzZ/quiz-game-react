from fastapi import APIRouter
from api.controllers.quiz_controller import QuizController
from models.Quiz import QuizDto
import asyncio

router = APIRouter()
quiz_controller = QuizController()

@router.post('/quiz')
async def create_quiz(quiz: QuizDto):
    return await quiz_controller.create_quiz(quiz)

@router.get('/quiz')
async def get_all_quizzes():
    return await quiz_controller.get_all_quizzes()

@router.get('/quiz/{id}')
async def get_quiz_by_id(id: int):
    return await quiz_controller.get_quiz_by_id(id)

@router.patch('/quiz/{id}')
async def update_quiz(id: int, quiz: QuizDto):
    return await quiz_controller.update_quiz(id, quiz)

@router.delete('/quiz/{id}')
async def delete_quiz(id: int):
    return await quiz_controller.delete_quiz(id)