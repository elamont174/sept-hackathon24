from django.shortcuts import render


def index(request):
    return render(request, "index.html")


def piano(request):
    return render(request, "piano.html")


def contact(request):
    return render(request, "contact.html")


def about(request):
    return render(request, "about.html")


def feedback(request):
    return render(request, "feedback.html")


def games(request):
    return render(request, "games.html")

