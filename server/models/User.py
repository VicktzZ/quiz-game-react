from pydantic import BaseModel

class User(BaseModel):
    id: int
    username: str
    cpf: str

class UserDto(BaseModel):
    username: str
    cpf: str