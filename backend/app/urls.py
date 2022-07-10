from django.urls import path
from django.views.decorators.csrf import csrf_exempt

from . import views

urlpatterns = [
    path('check_session', views.check_session, name='check_session'),
    path('sign_in', csrf_exempt(views.sign_in), name='sign_in'),
]
