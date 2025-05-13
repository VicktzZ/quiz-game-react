from prisma import Prisma
from models.User import UserDto
class UserRepository:
    def __init__(self):
        self.db = Prisma()

    async def sign_in_or_sign_up(self, user: UserDto):
        try:
            result = None
            await self.db.connect()
            user_data = user.model_dump()

            user = await self.db.user.find_first(where={'cpf': user.cpf})

            if not user:
                created_user = await self.db.user.create(data=user_data)
                result = created_user
            elif user.cpf == user_data['cpf'] and user.username == user_data['username']:
                await self.db.disconnect()
                result = user
            elif user.cpf != user_data['cpf'] or user.username != user_data['username']:
                await self.db.disconnect()
                raise Exception("CPF ou nome de usuário inválido")
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
            users = await self.db.user.find_many()
            await self.db.disconnect()
            result = users
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
            user = await self.db.user.delete(where={'id': id})
            await self.db.disconnect()
            result = user
        except Exception as e:
            await self.db.disconnect()
            raise e
        finally:
            await self.db.disconnect()
        return result

    async def find_by_cpf(self, cpf: str):
        try:
            result = None
            await self.db.connect()
            user = await self.db.user.find_first(where={'cpf': cpf})
            await self.db.disconnect()
            result = user
        except Exception as e:
            await self.db.disconnect()
            raise e
    
    async def find_by_id(self, id: int):
        try:
            result = None
            await self.db.connect()
            user = await self.db.user.find_first(where={'id': id})
            await self.db.disconnect()
            result = user
        except Exception as e:
            await self.db.disconnect()
            raise e