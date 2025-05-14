from typing import List
from fastapi import APIRouter
from api.controllers.question_controller import QuestionController
from models.Question import QuestionDto
import asyncio

router = APIRouter()
question_controller = QuestionController()

@router.post('/question')
async def create_question(question: QuestionDto):
    return await question_controller.create_question(question)

@router.get('/question')
async def get_all_questions():
    return await question_controller.get_all_questions()

@router.get('/question/{id}')
async def get_question_by_id(id: int):
    return await question_controller.get_question_by_id(id)

@router.patch('/question/{id}')
async def update_question(id: int, question: QuestionDto):
    return await question_controller.update_question(id, question)

@router.delete('/question/{id}')
async def delete_question(id: int):
    return await question_controller.delete_question(id)

@router.post('/question/multiple')
async def create_multiple_questions(questions: List[QuestionDto]):
    return await question_controller.create_multiple_questions(questions)

@router.get('/question/random/{count}')
async def take_random(count: int):
    return await question_controller.take_random(count)