import pdb
import json

from django.http import HttpResponse, JsonResponse
from django.contrib.auth import authenticate, login
from django.contrib.auth.mixins import LoginRequiredMixin
from graphene_django.views import GraphQLView


def index(request):
    return HttpResponse("Hello, world. You're at the polls index.")


def check_session(request):
    if not request.user.is_authenticated:
        return JsonResponse({"message": "error"})
    return JsonResponse({"message": "ok"})


def sign_in(request):
    form_data = json.loads(request.body.decode('utf-8'))
    username = form_data['username']
    password = form_data['password']
    user = authenticate(request, username=username, password=password)
    if user is None:
        return JsonResponse({"message": "invalid username or password"})

    login(request, user)
    return JsonResponse({"message": "ok"})


class PrivateGraphQLView(LoginRequiredMixin, GraphQLView):
    pass
