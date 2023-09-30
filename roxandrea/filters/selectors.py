
       
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
from sms_helper import send_sms
from helper import custom_paginate
from customresponses import *
User = get_user_model()

class Selectors(object):
    
    def __init__(self,request,model):
        self.query_filter = request.GET
        self.request = request
        self.model = model
        self.status = self.query_filter.get('status', None)
        self.models_meta_data = {
                                    'reservations':
                                        {'name':Reservations,
                                        'message':'Reservations fetched successfully!',
                                        'url':'http://127.0.0.1:8000/api/v1/reservation',
                                        'serializer':ReservationSerializer,
                                        'filters': {'pending':(
                                                        (Q(reservation_token__icontains= self.query_filter.get('q')) | 
                                                        Q(package__icontains=self.query_filter.get('q'))) & 
                                                        Q(is_checked_in__exact = False) & 
                                                        Q(has_checked_out__exact=False)
                                                    ),
                                                    'checkedin':(
                                                        (Q(reservation_token__icontains= self.query_filter.get('q')) | 
                                                        Q(package__icontains=self.query_filter.get('q'))) & 
                                                        Q(is_checked_in__exact = True) & 
                                                        Q(has_checked_out__exact=False)
                                                    ),
                                                    
                                                    }
                                        },
                       
                                    '':""
                                }

    def select(self):
        
        metadata = {}
        metadata['request'] = self.request
        metadata['url'] = self.models_meta_data[self.model]['url']
        metadata['model'] = self.models_meta_data[self.model]['name']
        metadata['message'] = self.models_meta_data[self.model]['message'] 
        
        metadata['_filter'] = self.models_meta_data[self.model]['filters'][self.status] 
        metadata['serializer'] = self.models_meta_data[self.model]['serializer']
        metadata['custom_paginator_class'] = CustomPaginatorClass
        
        return metadata
        