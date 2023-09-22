from django.urls import include, path
from .views import *

urlpatterns = [
   path('rooms-amenities', AmenitiesAPIView.as_view()),
   path('hotel-floors', FloorsAPIView.as_view()),
   path('hotel-bedtype', BedTypeAPIView.as_view()),
   path('hotel-roomtype', RoomTypeAPIView.as_view()),
   path('hotel-room', RoomAPIView.as_view()),
   path('rooms-complaint', RoomComplaintsAPIView.as_view()),
   path('rooms-recent-checked-out', RecentlyCheckedOutRoomsAPIView.as_view()),
   
   ]