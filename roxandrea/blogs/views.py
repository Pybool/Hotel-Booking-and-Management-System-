import time
from django.contrib.auth import get_user_model
# from mail_helper import Mailservice
from rest_framework import status
import jwt, copy
from django.db.models import Q
from django.db import transaction
from rest_framework.views import APIView
from rest_framework.response import Response
User = get_user_model()
from contacts.models import Contacts
from contacts.models import ContactType
from middlewares.middleware import JWTAuthenticationMiddleWare
from contacts.serializers import ContactSerializer

class BlogsAPIView(APIView):
    """Creates a new client contact type"""
    authentication_classes = [JWTAuthenticationMiddleWare]
    def get(self,request):
        pass
        
    def post(self, request):
        pass