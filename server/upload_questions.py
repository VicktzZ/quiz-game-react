from typing import List
import requests

url = "http://localhost:8000/question/multiple"
questions: List = requests.get("https://tryvia.ptr.red/api.php?amount=100&difficulty=medium").json()['results']
questions = [{
    "category": question['category'],
    "text": question['question'],
    "correctAnswer": question['correct_answer'],
    "incorrectAnswers": ",".join(question['incorrect_answers'])
} for question in questions]

try:
    response = requests.post(url, json=questions)   
except requests.exceptions.RequestException as e:
    print(e)
else:
    print(response.json())
