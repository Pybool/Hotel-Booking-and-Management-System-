
       
import random
import string
import json
import time
from datetime import datetime
from django.contrib.auth import get_user_model
from mail_helper import Mailservice
from rest_framework import status
from django.db.models import Q
from django.db import transaction
from rest_framework.views import APIView
from rest_framework.response import Response
from contacts.models import Contacts
from contacts.models import ContactType
from django.core.paginator import Paginator
from rest_framework.pagination import LimitOffsetPagination
from middlewares.middleware import JWTAuthenticationMiddleWare
# from rooms.models import Floors
# from rooms.models import BedType
# from rooms.models import RoomType
from rooms.models import Rooms
from reservations.models import Reservations
from finance.models import Rates
from reservations.serializers import ReservationSerializer
from roxandrea.custompagination import CustomPaginatorClass
from reservations.script import ReservationValid
from rooms.serializers import RoomSerializer
from reservations.errors import FailedUpdateError
from reservations.models import Addons
from sms_helper import send_sms
from helper import custom_paginate
User = get_user_model()

def generate_reservation_id():
    prefix = "ROX-"
    characters = string.ascii_uppercase + string.digits
    random_part = ''.join(random.choice(characters) for _ in range(13))
    reservation_id = prefix + random_part
    return reservation_id

class ReservationAPIView(APIView):
    """Creates a new reservation"""
    authentication_classes = [JWTAuthenticationMiddleWare]
    pagination_class = LimitOffsetPagination
    def makeSearchParamString(self,obj):
        return '&'+str(obj).replace('{','').replace('}','').replace(':','=').replace("['",'').replace("']",'').replace("'",'').replace(",",'&').replace(" ",'')

    def get_rooms_objects(self,rooms): 
        """Refactor this code"""
        rooms_instance_object = []
        # try:
        for room in rooms:
            room_instance = Rooms.objects.get(room_no=room)
            rooms_instance_object.append(room_instance)
        return rooms_instance_object
        # except:
        #     return list()
    
    def post(self, request):
        # try:
            """If the is_reservation_valid method returns an empty list then reservation is valid """
            print("Reservation data ===> ", request.data)
            reservation = request.data
            contact = reservation.get('contact',reservation.get('email'))
            contact_type = reservation.get('contact_type')
            rooms = reservation.get('rooms')
            rooms_instance_object = self.get_rooms_objects(rooms)
            self.reservation_valid = ReservationValid(True,rooms_instance_object)
            _filter = {'is_available':True,'maintenance_block':False,'is_ready':True}
            available_status, msg = self.reservation_valid.is_date_available(request.data['check_in'].replace('T',' '),request.data['check_out'].replace('T',' '))
            if available_status:
                is_reservation_valid_errors = self.reservation_valid.is_reservation_valid(_filter,request.data,rooms_instance_object)
                print(is_reservation_valid_errors)
            else:
                print(msg)
                return Response({"status":False,"message":msg})
            
            if len(is_reservation_valid_errors)==0:
                with transaction.atomic():
                    
                    for _ in ['rooms','room_type','no_xtra_adults']:
                        if reservation.get(_):
                            reservation.pop(_)
                    
                    if reservation.get('room_rate') and reservation.get('room_rate') != '':
                        reservation['room_rate'] = Rates.objects.get(id=int(reservation['room_rate']))
                    else:
                        try:
                            reservation.pop('room_rate')
                        except:
                            pass
                        
                    reservation['contact'],created = Contacts.objects.get_or_create(email=contact)
                    if reservation.get('phone'):
                        reservation['contact'].phone = reservation['phone']
                        reservation['contact'].save()
                        reservation.pop('phone')
                        reservation.pop('email')
                    try:
                        reservation['contact_type'] = ContactType.objects.get(id=int(contact_type)).name
                    except:
                        pass
                    
                    reservation['no_rooms'] = len(rooms_instance_object)
                    reservation_instance = Reservations(**reservation)
                    reservation_token = generate_reservation_id()
                    reservation_instance.reservation_token = reservation_token
                    reservation_instance.save()                    
                    reservation_instance.rooms.add(*rooms_instance_object)
                    print('Email ', reservation_instance.contact.email)
                    
                    mail_data = {"subject":"Roxandrea Hotel Reservation","recipient":[reservation_instance.contact.email],"room_no":rooms,"reservation_token":reservation_token,"ir_template":"new_reservation_template"}
                    """Set room to unavailable and tie reservation_token to the room"""
                    for room in rooms_instance_object:
                        room.is_available = False
                        room.active_reservation_token = reservation_token
                        room.check_in_date = reservation_instance.check_in
                        room.check_out_date = reservation_instance.check_out
                        room.save()
                        
                    """Delegate the Email and SMS tasks below later to celery to run in background"""
                    Mailservice.send_outwards_mail(mail_data) 
                    sms_data = {'from': 'Roxandrea', 'to': Contacts.objects.get(email=reservation_instance.contact.email).phone, 'text': f'New Roxandrea Hotel reservation with token {reservation_token} and room number {rooms} was made with you as a occupant'}
                    send_sms(sms_data)
                    
                    return Response({'message': 'Reservation was made successfully.',"reservation_token":reservation_token,'status':True}, status=status.HTTP_201_CREATED)
            
            else:
                return Response({"status":False,"message":"This reservation is invalid","errors":is_reservation_valid_errors})
        # except Exception as e:
        #     return Response({"status":False,"message":"Something went wrong!","error":str(e)})
        
    def get(self,request):
        active = request.GET.get('active', False)
        is_checkedout = request.GET.get('is_checkedout', False)
        is_client = request.GET.get('is-client') == '1'
        time.sleep(2)
        try:
            metadata = {}
            metadata['url'] = 'http://127.0.0.1:8000/api/v1/reservation'
            metadata['model'] = Reservations
            metadata['request'] = request
            if is_client:
                metadata['_filter'] =  (Q(contact_id__exact=request.user.id))
            else:
                
                if is_checkedout:
                    metadata['_filter'] =  (Q(has_checked_out__exact=True))
                else:
                    metadata['_filter'] =  (Q(is_checked_in__exact = active == '1') & Q(has_checked_out__exact=False))
            print( metadata['_filter'])
            metadata['serializer'] = ReservationSerializer
            metadata['custom_paginator_class'] = CustomPaginatorClass
            
            response = custom_paginate(self,metadata)
            print("Paginator response ====> ", response)
            if response:
                return Response(response) 
            else:
                return Response({'status':True, 'data':[],'message':'No reservations check-ins were found'})
        except:
            return Response({'status':False,'message':'Something went wrong'})
        
    def patch(self,request):
        time.sleep(2)
        check_in_or_out =  request.GET.get('checkout', True)
        data = request.data
        if check_in_or_out == True:
            new_num_checked_in,msg = self.check_in_client(data)
        elif check_in_or_out == '1':
            new_num_checked_in,msg = self.check_out_client(data)
        return Response({'status':True,'message':msg,'num_checked_in':new_num_checked_in})
    
    def check_in_client(self,data):
        room_instances = Rooms.objects.filter(room_no__in = data['room'])
        occupant_instance = Contacts.objects.get(email=data['occupant'])
        with transaction.atomic():
            room_instances.update(**{'is_checked_in':True,'is_occupied':True,'occupant':occupant_instance})
            reservation_instance = Reservations.objects.filter(reservation_token = data['reservation_token'])
            if len(data['room']) > 1:
                num_checked_in = len(data['room'])
                affected_rows = reservation_instance.update(**{'is_checked_in':True})
                if self.ensure_update(affected_rows):
                    new_num_checked_in = num_checked_in
            else:
                new_num_checked_in = reservation_instance.first().num_checked_in + 1
                num_checked_in = new_num_checked_in
                rooms_length = len(getattr(reservation_instance[0],'rooms').all())
                if rooms_length - num_checked_in == 1 or rooms_length==1:
                    """Last to check in"""
                    affected_rows = reservation_instance.update(**{'is_checked_in':True})
                    self.ensure_update(affected_rows)
            affected_rows = reservation_instance.update(**{'num_checked_in':num_checked_in})
            self.ensure_update(affected_rows)
            return new_num_checked_in ,'Client has been checked in'
    
    def check_out_client(self,data):
        room_instances = Rooms.objects.filter(room_no__in = data['room'])
        occupant_instance = None
        with transaction.atomic():
            assert len(room_instances) > 0
            for room_instance in room_instances:
                assert str(type(room_instance)) == "<class 'rooms.models.Rooms'>"
            check_out_initializer = {'is_checked_in':False,'is_occupied':False,'occupant':occupant_instance,
                                     'is_ready':False,'check_in_date':None,'check_out_date':None,
                                     'active_reservation_token':None, 'dead_reservation_token':data['reservation_token']
                                     }
            affected_rows = room_instances.update(**check_out_initializer)
            self.ensure_update(affected_rows)
            reservation_instance = Reservations.objects.filter(reservation_token = data['reservation_token'])
            reservation_checkout_initializer = {'is_checked_in':False,'num_checked_in': 0,'has_checked_out': True,'is_history':True}
            
            if len(data['room']) > 1:
                num_checked_in = len(data['room']) 
                affected_rows = reservation_instance.update(**reservation_checkout_initializer)
                if self.ensure_update(affected_rows):
                    new_num_checked_in = 0
            else:
                new_num_checked_in = reservation_instance.first().num_checked_in - 1
                num_checked_in = new_num_checked_in
                rooms_length = len(getattr(reservation_instance[0],'rooms').all())
                if rooms_length - num_checked_in == 1 or rooms_length==1:
                    """Last to check Out"""
                    affected_rows = reservation_instance.update(**reservation_checkout_initializer)
                    # self.ensure_update(affected_rows) BIG ISSUE HERE
                affected_rows = reservation_instance.update(**{'num_checked_in':num_checked_in})
                self.ensure_update(affected_rows)
            self.deallocate_rooms(reservation_instance,list(room_instances.values_list('id',flat=True)),True)
            return new_num_checked_in , 'Client has been checked out'
        
    def ensure_update(self,affected_rows):
        if affected_rows < 1 :
            raise FailedUpdateError('Update was not applied to any rows')
        return True
        
    def deallocate_rooms(self,reservation_instance,room_instances,store=False):
        if store:
            existing_rooms = reservation_instance.first().history_rooms
            history_rooms = list(set(existing_rooms + room_instances))
            affected_rows = reservation_instance.update(**{'history_rooms':history_rooms})
            self.ensure_update(affected_rows)
        getattr(reservation_instance.first(),'rooms').remove(*room_instances)
        
class CheckAvailableAPIView(APIView):
    """Checks if reservation date is available"""
    def formatdate(self,date_str):
        date_obj = datetime.strptime(date_str, '%Y-%m-%dT%H:%M')
        formatted_date = date_obj
        return formatted_date
    
    def post(self,request):
        time.sleep(3)
        data = request.data or {'check_in': '2023-09-16T23:24', 'check_out': '2023-09-21T09:39', 'room_type': '2', 'no_adults': '2', 'no_children': '1'}
        data['check_in'] = data['check_in'].replace('T',' ')
        data['check_out'] = data['check_out'].replace('T',' ')
        _filter = {'room_type__id':int(data['room_type']),'is_available':True,'maintenance_block':False,'is_ready':True}
        rooms_instance_object = Rooms.objects.filter(**_filter)
        self.reservation_valid = ReservationValid(True,rooms_instance_object)
        status, msg = self.reservation_valid.is_date_available(data['check_in'],data['check_out'])
        
        data['no_rooms'] = rooms_instance_object.count() 
        is_reservation_valid_errors = self.reservation_valid.is_reservation_valid(_filter,data,rooms_instance_object)
        print(is_reservation_valid_errors)
        msg = is_reservation_valid_errors[0] if len(is_reservation_valid_errors) > 0 else msg
        response = {"status":True,"message":msg,'data':RoomSerializer(rooms_instance_object,many=True).data} if status and len(is_reservation_valid_errors) == 0 else {"status":False,"message":msg}      
        return Response(response)
   
class AddonsAPIView(APIView):
    """Creates a new reservation"""
    authentication_classes = [JWTAuthenticationMiddleWare]
    pagination_class = LimitOffsetPagination
    
    def get(self,request):
        try:
            addons = Addons.objects.all().values().order_by('-id')
            response = {"status":True,"message":'Addons fetched successfully','data':addons}
        except:
            response = {"status":False,"message":"Addon could not be fetched successfully"}
        return Response(response)    
    
    def post(self,request):
        data = request.data
        try:
            addon_instance = Addons(**data)
            addon_instance.save()
            response = {"status":True,"message":'Addon was created successfully'}
        except:
            response = {"status":False,"message":"Addon could not be created successfully"}
        return Response(response)
        
        