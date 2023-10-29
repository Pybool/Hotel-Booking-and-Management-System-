from django.urls import include, path
from .views import *

urlpatterns = [
   path('reset-reservations', ResetReservationsTables.as_view()),
   ]