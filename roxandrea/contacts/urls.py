from django.urls import include, path
from .views import *

urlpatterns = [
   path('contacts-type', ContactTypeAPIView.as_view()),
   path('contacts-guest', ContactAPIView.as_view()),
]