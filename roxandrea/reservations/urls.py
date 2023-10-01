from django.urls import include, path
from .views import *
# from .filterview import FilterReservationAPIView

urlpatterns = [
   path('reservation', ReservationAPIView.as_view()),
   path('check-availability', CheckAvailableAPIView.as_view()),
   # path('filter-reservations', FilterReservationAPIView.as_view()),
   path('reservation-addons', AddonsAPIView.as_view()),
   path('reservation-sponsor', SponsorAPIView.as_view())
   
]