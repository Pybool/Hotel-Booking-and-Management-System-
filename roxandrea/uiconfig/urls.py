from django.urls import include, path
from .views import *

urlpatterns = [
   path('uiconfig-features', LandingPageFeaturesView.as_view()),
   path('uiconfig-services', LandingPageServicesView.as_view()),
   path('uiconfig-master-rooms', LandingPageFeaturedRoomsView.as_view()),
   
   
]