from django.urls import include, path
from .views import *

urlpatterns = [
   path('hotel-bills', BillingView.as_view()),
]