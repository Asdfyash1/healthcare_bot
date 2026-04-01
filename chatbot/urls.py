from django.urls import path
from . import views

urlpatterns = [
    path('', views.landing_page, name='landing'),
    path('app/', views.chat_page, name='chat_page'),
    path('get_response/', views.get_response, name='get_response'),
]
