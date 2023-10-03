from django.urls import include, path
from .views import *

urlpatterns = [
   path('reservation', ReservationAPIView.as_view()),
   path('check-availability', CheckAvailableAPIView.as_view()),
   path('reservation-addons', AddonsAPIView.as_view()),
   path('reservation-sponsor', SponsorAPIView.as_view())
   
]