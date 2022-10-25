from django.urls import path
from . import views


urlpatterns = [
    path('api/spellcheck/<str:pk>/',views.spellcheck, name='spellcheck'), 
]   
 