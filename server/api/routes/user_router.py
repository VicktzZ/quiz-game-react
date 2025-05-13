from fastapi import APIRouter
from api.controllers.user_controller import UserController
from models.User import UserDto
import asyncio

router = APIRouter()
user_controller = UserController()

@router.post('/user')
async def create_user(user: UserDto):
    return await user_controller.create_user(user)

@router.get('/user')
async def get_all_users():
    return await user_controller.get_all_users()

@router.get('/user/{id}')
async def get_user_by_id(id: int):
    return await user_controller.get_user_by_id(id)

@router.get('/user/cpf/{cpf}')
async def get_user_by_cpf(cpf: str):
    return await user_controller.get_user_by_cpf(cpf)

@router.delete('/user/{id}')
async def delete_user(id: int):
    return await user_controller.delete_user(id)