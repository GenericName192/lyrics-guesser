from django.urls import path
from .views import get_questions, quiz_page


urlpatterns = [
    path("", quiz_page, name="quiz_page"),
    path("question/", get_questions, name="get_questions")
]
