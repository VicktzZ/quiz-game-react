from prisma import Prisma
from models.User import UserDto

class UserRepository:
    def __init__(self):
        self.db = Prisma()

    async def create(self, user: UserDto):
        await self.db.connect()
        user = await self.db.user.create(user)
        await self.db.disconnect()
        return user

    async def get_all(self):
        await self.db.connect()
        users = await self.db.user.find_many()
        await self.db.disconnect()
        return users

    async def delete(self, id: int):
        await self.db.connect()
        user = await self.db.user.delete(where={'id': id})
        await self.db.disconnect()
        return user

    async def find_by_cpf(self, cpf: str):
        await self.db.connect()
        user = await self.db.user.find_first(where={'cpf': cpf})
        await self.db.disconnect()
        return user
    
    async def find_by_id(self, id: int):
        await self.db.connect()
        user = await self.db.user.find_first(where={'id': id})
        await self.db.disconnect()
        return user