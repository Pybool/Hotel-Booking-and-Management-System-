"""Sweet error handler is a custom module written to prevent the need for repetitive try catch blocks 
    which adds more lines of code and also alerts a developer the most frequently reccuring errors
    which may need fixing or to enforcing validations of data before usuage.
    Decorate each route or function to catch errors 

"""  
import random
import string
import time
from datetime import datetime
from django.contrib.auth import get_user_model
from mail_helper import Mailservice
from django.db.models import Q
from django.conf import settings
from django.db import transaction
from rest_framework.views import APIView
from rest_framework.response import Response
from contacts.models import Contacts
from contacts.models import ContactType
from rest_framework.pagination import LimitOffsetPagination
from middlewares.middleware import JWTAuthenticationMiddleWare
from rooms.models import Rooms
from reservations.models import Reservations
from finance.models import Rates
from reservations.serializers import ReservationSerializer
from roxandrea.custompagination import CustomPaginatorClass
from reservations.script import ReservationValid
from rooms.serializers import RoomSerializer
from reservations.errors import FailedUpdateError
from reservations.models import Addons
from sweeterror.crib.core import requests_sweet_error_handler, sweet_error_handler
from sms_helper import send_sms
from helper import custom_paginate
from customresponses import *
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
    get_err_response = {}
    post_err_response = {}
    
    def makeSearchParamString(self,obj):
        return '&'+str(obj).replace('{','').replace('}','').replace(':','=').replace("['",'').replace("']",'').replace("'",'').replace(",",'&').replace(" ",'')

    def get_rooms_objects(self,rooms): 
        rooms_instance_object = []
        for room in rooms:
            room_instance = Rooms.objects.get(room_no=room)
            rooms_instance_object.append(room_instance)
        return rooms_instance_object
    
    # @requests_sweet_error_handler(default=post_err_response)
    def post(self, request):
        """If the is_reservation_valid method returns an empty list then reservation is valid """
        print("Reservation data ===> ", request.data)
        reservation = request.data
        if request.data.get('contact-sponsored'):
            contact = reservation.get('contact',reservation.get('email'))
        else:
            contact = reservation.get('email',reservation.get('contact'))
        contact_type = reservation.get('contact_type')
        rooms = reservation.get('rooms')
        rooms_instance_object = self.get_rooms_objects(rooms)
        self.reservation_valid = ReservationValid(True,rooms_instance_object)
        _filter = {'is_available':True,'maintenance_block':False,'is_ready':True}
        available_status, msg = self.reservation_valid.is_date_available(request.data['check_in'].replace('T',' '),request.data['check_out'].replace('T',' '))
        if available_status:
            is_reservation_valid_errors = self.reservation_valid.is_reservation_valid(_filter,request.data,rooms_instance_object)
        else:
            print(msg)
            return operation_ok_response({"status":False,"message":msg})
        
        print(is_reservation_valid_errors)
        if len(is_reservation_valid_errors)==0:
            with transaction.atomic():
                
                for key in ['rooms','room_type','no_xtra_adults']:
                    reservation.pop(key) if reservation.get(key) else None
                if reservation.get('room_rate') and reservation.get('room_rate') != '':
                    reservation['room_rate'] = Rates.objects.get(id=int(reservation['room_rate']))
                else:
                    reservation.pop('room_rate') if reservation.get('room_rate') else None

                reservation['contact'],created = Contacts.objects.get_or_create(email=contact)
                if request.data.get('save-contact-details'):
                    
                    if (reservation.get('phone') or reservation.get('firstname') or reservation.get('surname') or reservation.get('gender') or reservation.get('address1')) and created:
                        reservation['contact'].phone = reservation.get('phone')
                        reservation['contact'].firstname = reservation.get('firstname')
                        reservation['contact'].surname = reservation.get('surname')
                        reservation['contact'].gender = reservation.get('gender')
                        reservation['contact'].address1 = reservation.get('address1') or reservation.get('address')
                        reservation['contact'].contact_type = ContactType.objects.get(name='Individual')
                        reservation['contact'].save()
                        print("saved contact")
                    
                keys_to_remove = ['contact-sponsored', 'save-contact-details']
                [reservation.pop(key, None) for key in keys_to_remove]
                
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
                response_payload = {'message': 'Booking was successfull!.',"reservation_token":reservation_token,'status':True}
                return record_created_response(response_payload)
        else:
            print(is_reservation_valid_errors)
            response_payload = {"status":False,"message":"This reservation is invalid","errors":is_reservation_valid_errors}
            return bad_request_error_response(response_payload)
            
    @requests_sweet_error_handler(default=get_err_response)
    def get(self,request):
        
        time.sleep(2)
        active = request.GET.get('active', False)
        is_checkedout = request.GET.get('is_checkedout', False)
        is_client = request.GET.get('is-client') == '1'
        metadata = {}
        metadata['url'] = f'{settings.SERVER_URL}/api/v1/reservation'
        metadata['model'] = Reservations
        metadata['request'] = request
        metadata['message'] = 'Reservations fetched successfully!'
        if is_client:
            metadata['_filter'] =  (Q(contact_id__exact=request.user.id))
        else:
            if is_checkedout:
                metadata['_filter'] =  (Q(has_checked_out__exact=True))
            else:
                metadata['_filter'] =  (Q(is_checked_in__exact = active == '1') & Q(has_checked_out__exact=False))
        metadata['serializer'] = ReservationSerializer
        metadata['custom_paginator_class'] = CustomPaginatorClass
        
        response = custom_paginate(self,metadata)
        if response:
            return Response(response) 
        else:
            return Response({'status':True, 'data':[],'message':'No reservations check-ins were found'})
        
    def patch(self,request):
        time.sleep(2)
        check_in_or_out =  request.GET.get('checkout', True)
        data_obj = request.data
        
        if check_in_or_out == True:
            for data in data_obj:
                new_num_checked_in,msg = self.check_in_client(data)
        elif check_in_or_out == '1':
            for data in data_obj:
                new_num_checked_in,msg = self.check_out_client(data)
        return Response({'status':True,'message':msg,'num_checked_in':new_num_checked_in})
    
    @sweet_error_handler(default=(0,'Could not check in client'))
    def check_in_client(self,data):
        room_instances = Rooms.objects.filter(room_no__in = data['room'])
        occupant_instance = Contacts.objects.get(email=data['occupant'])
        with transaction.atomic():
            room_instances.update(**{'is_checked_in':True,'is_occupied':True,'occupant':occupant_instance})
            reservation_instance = Reservations.objects.filter(reservation_token = data['reservation_token'])
            
            if len(data['room']) > 1:
                num_checked_in = len(data['room'])
                affected_rows = reservation_instance.update(**{'is_checked_in':True})
                new_num_checked_in = num_checked_in if self.ensure_update(affected_rows) else None
                
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
    
    @sweet_error_handler(default=(0,''))
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
    
    @sweet_error_handler(default={})
    def deallocate_rooms(self,reservation_instance,room_instances,store=False):
        if store:
            existing_rooms = reservation_instance.first().history_rooms
            history_rooms = list(set(existing_rooms + room_instances))
            affected_rows = reservation_instance.update(**{'history_rooms':history_rooms})
            self.ensure_update(affected_rows)
        getattr(reservation_instance.first(),'rooms').remove(*room_instances)
        
class CheckAvailableAPIView(APIView):
    """Checks if reservation date is available"""
    post_err_message = {"status":False,"message":"Something has gone wrong, could not check availabilty"}
    
    def formatdate(self,date_str):
        date_obj = datetime.strptime(date_str, '%Y-%m-%dT%H:%M')
        formatted_date = date_obj
        return formatted_date
    
    # @requests_sweet_error_handler(default=post_err_message)
    def post(self,request):
        time.sleep(3)
        data = request.data 
        data['check_in'] = data['check_in'].replace('T',' ')
        data['check_out'] = data['check_out'].replace('T',' ')
        _filter = {'room_type__id':int(data['room_type']),'is_available':True,'maintenance_block':False,'is_ready':True}
        rooms_instance_object = Rooms.objects.filter(**_filter)
        self.reservation_valid = ReservationValid(True,rooms_instance_object)
        status, msg = self.reservation_valid.is_date_available(data['check_in'],data['check_out'])
        
        data['no_rooms'] = rooms_instance_object.count() 
        is_reservation_valid_errors = self.reservation_valid.is_reservation_valid(_filter,data,rooms_instance_object)
        msg = is_reservation_valid_errors[0] if len(is_reservation_valid_errors) > 0 else msg
        response = {"status":True,"message":msg,'data':RoomSerializer(rooms_instance_object,many=True).data} if status and len(is_reservation_valid_errors) == 0 else {"status":False,"message":msg}      
        return operation_ok_response(response)
   
class AddonsAPIView(APIView):

    authentication_classes = [JWTAuthenticationMiddleWare]
    pagination_class = LimitOffsetPagination
    get_err_response = {"status":False,"message":"Addon could not be fetched successfully"}
    post_err_response = {"status":False,"message":"Addon could not be created successfully"}
    
    @requests_sweet_error_handler(default=get_err_response)
    def get(self,request):
        addons = Addons.objects.all().values().order_by('-id')
        response = {"status":True,"message":'Addons fetched successfully','data':addons}
        return Response(response)    
    
    @requests_sweet_error_handler(default=post_err_response)
    def post(self,request):
        data = request.data
        addon_instance = Addons(**data)
        addon_instance.save()
        response = {"status":True,"message":'Addon was created successfully'}
        return Response(response)
    
class SponsorAPIView(APIView):

    authentication_classes = [JWTAuthenticationMiddleWare]
    get_err_response = {"status":False,"message":"Could not get sponsor at the moment"}
    
    @requests_sweet_error_handler(default=get_err_response)
    def get(self,request):
        reservation_token = request.GET.get('sponsor')
        reservation = Reservations.objects.get(reservation_token=reservation_token)
        sponsor = Contacts.objects.filter(id=reservation.contact_id)
        if sponsor:
            response = {'status':True,'message':'Sponsor was found','data':sponsor.values().first()}
        else:
            response = {'status':False,'message':'Sponsor was not found'}
        return operation_ok_response(response)
    
        
        