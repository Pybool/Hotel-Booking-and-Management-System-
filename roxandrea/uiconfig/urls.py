from django.urls import include, path
from .views import *

urlpatterns = [
   path('uiconfig-features', LandingPageFeaturesView.as_view()),
]