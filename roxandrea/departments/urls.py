from django.urls import include, path
from .views import *

urlpatterns = [
   path('hotel-departments', DepartmentsView.as_view()),
]