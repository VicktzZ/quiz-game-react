from fastapi import APIRouter
from fastapi import status
from models.QuizResult import QuizResultDto
from controllers.quiz_result_controller import QuizResultController

router = APIRouter()
controller = QuizResultController()

@router.post("/quiz-results", status_code=status.HTTP_201_CREATED)
async def create_quiz_result(result: QuizResultDto):
    return await controller.create_quiz_result(result)

@router.get("/quiz-results/history/{user_id}")
async def get_user_quiz_history(user_id: int):
    return await controller.get_user_quiz_history(user_id)

@router.get("/quiz-results/{result_id}")
async def get_quiz_result_by_id(result_id: int):
    return await controller.get_quiz_result_by_id(result_id)