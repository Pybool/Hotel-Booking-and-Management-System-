from django.urls import include, path
from .views import *

urlpatterns = [
   path('hotel-services', ServicesView.as_view()),
]