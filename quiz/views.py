from django.shortcuts import render
from .models import Question
from django.http import JsonResponse


# Create your views here.
def quiz_page(request):
    return render(request, "quiz/quiz.html")


def get_questions(request):
    questions = Question.objects.all()
    return JsonResponse([question.serialise() for question in questions],
                        safe=False)
