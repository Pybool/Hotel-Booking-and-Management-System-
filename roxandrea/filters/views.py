
       
import random
import string
import time
from datetime import datetime
from django.contrib.auth import get_user_model
from mail_helper import Mailservice
from rest_framework import status
from django.db.models import Q
from django.db import transaction
from rest_framework.views import APIView
from rest_framework.response import Response
from django.core.paginator import Paginator
from rest_framework.pagination import LimitOffsetPagination
from middlewares.middleware import JWTAuthenticationMiddleWare
from rooms.models import Rooms
from reservations.models import Reservations
from finance.models import Rates
from reservations.serializers import ReservationSerializer
from roxandrea.custompagination import CustomPaginatorClass
from reservations.script import ReservationValid
from rooms.serializers import RoomSerializer
from filters.selectors import Selectors
from sms_helper import send_sms
from helper import custom_paginate
from customresponses import *
User = get_user_model()

class FilterRecordAPIView(APIView):
    """Creates a new reservation"""
    authentication_classes = [JWTAuthenticationMiddleWare]
    pagination_class = LimitOffsetPagination
    
    def makeSearchParamString(self,obj):
        return '&'+str(obj).replace('{','').replace('}','').replace(':','=').replace("['",'').replace("']",'').replace("'",'').replace(",",'&').replace(" ",'')


    def get(self,request):
        model_key = request.GET.get('rec')
        time.sleep(2)
        # try:
        self.selector = Selectors(request,model_key)
        metadata = self.selector.select()
        response = custom_paginate(self,metadata)
        if response:
            return Response(response) 
        else:
            return Response({'status':True, 'data':[],'message':'Nothing was found'})
        # except Exception as e:
        #     print(str(e))
        #     return internal_server_error_response({'status':False,'message':'Sorry we could not process your request!'})
