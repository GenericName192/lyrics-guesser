from django.shortcuts import render
from .models import Question
from django.http import JsonResponse


# Create your views here.
def quiz_page(request):
    return render(request, "quiz/quiz.html")


# def make_hints(lyrics):
#     hints = lyrics.split("\n")
#     for i in range(len(hints)):
#         hints[i] = hints[i].strip()
#     return hints


def get_questions(request):
    print("test2")
    return JsonResponse(Question.objects.all())
