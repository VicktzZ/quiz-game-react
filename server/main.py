from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from api.routes import user_router, question_router, quiz_router
from prisma import Prisma

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*']
)

app.include_router(user_router.router)
app.include_router(question_router.router)
app.include_router(quiz_router.router)