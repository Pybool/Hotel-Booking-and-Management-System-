from django.urls import include, path
from .views import *
from .views import FilterRecordAPIView

urlpatterns = [
   path('filter-records', FilterRecordAPIView.as_view()),
]