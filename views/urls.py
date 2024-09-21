from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("piano/", views.piano, name="piano"),
    path("contact/", views.contact, name="contact"),
    path("about/", views.about, name="about"),
    path("feedback/", views.feedback, name="feedback"),
    path("games/", views.games, name="games"),
]
