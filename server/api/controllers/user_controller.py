from repositories.user_repository import UserRepository
from models.User import UserDto

class UserController:
    def __init__(self):
        self.user_repository = UserRepository()

    async def create_user(self, user: UserDto):
        return await self.user_repository.create(user)

    async def get_all_users(self):
        return await self.user_repository.get_all()

    async def get_user_by_id(self, id: int):
        return await self.user_repository.find_by_id(id)

    async def get_user_by_cpf(self, cpf: str):
        return await self.user_repository.find_by_cpf(cpf)

    async def delete_user(self, id: int):
        return await self.user_repository.delete(id)
    
    async def sign_in(self, user: UserDto):
        return await self.user_repository.sign_in(user)