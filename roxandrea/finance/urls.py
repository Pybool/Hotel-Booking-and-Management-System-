from django.urls import include, path
from .views import *

urlpatterns = [
   path('finance-room-rates', RatesAPIView.as_view()),
   path('finance-staff-salary', SalaryView.as_view()),
]