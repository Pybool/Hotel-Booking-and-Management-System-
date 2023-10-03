import json
import time
from django.contrib.auth import get_user_model
from django.shortcuts import get_object_or_404
# from mail_helper import Mailservice
from rest_framework import status
from django.db.models import Q
from django.db import transaction
from rest_framework.views import APIView
from rest_framework.response import Response
from contacts.models import Contacts
from contacts.models import ContactType
from rooms.models import Amenities
from middlewares.middleware import JWTAuthenticationMiddleWare
from rooms.models import Floors
from rooms.models import BedType
from rooms.models import RoomType
from rooms.models import Rooms
from rest_framework.parsers import MultiPartParser
from rest_framework.pagination import LimitOffsetPagination
from roxandrea.custompagination import CustomPaginatorClass
from helper import custom_paginate
from rooms.models import RoomsComplaints
from .serializers import ImageUploadSerializer, RoomSerializer, RoomTypeSerializer

class AmenitiesAPIView(APIView):
    """Creates a new client contact type"""
    authentication_classes = [JWTAuthenticationMiddleWare]
    def get(self, request):
        try:
            time.sleep(2)
            amenities = Amenities.objects.filter().values().order_by('-id')
            return Response({'message': 'Amenity fetched successfully.', "data":amenities,"status":True}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"status":False,"message":"Something went wrong!","error":str(e)})
        
    def post(self, request):
        try:
            time.sleep(2)
            Amenities.objects.create(**request.data)  
            return Response({'message': 'Amenity created successfully.',"status":True}, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({"status":False,"message":"Something went wrong!","error":str(e)})
        
class FloorsAPIView(APIView):
    """Creates a new floor"""
    authentication_classes = [JWTAuthenticationMiddleWare]
    def post(self, request):
        try:
            time.sleep(2)
            Floors.objects.create(**request.data)  
            return Response({'message': 'Floor created successfully.','status':True}, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({"status":False,"message":"Something went wrong!","error":str(e)})
    
    def get(self, request):
        try:
            time.sleep(2)
            floors = Floors.objects.all().order_by('-id').values()  
            return Response({'message': 'Floor fetched successfully.','data':floors ,'status':True}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"status":False,"message":"Something went wrong!","error":str(e)})

class BedTypeAPIView(APIView):
    """Creates a new bedtype"""
    authentication_classes = [JWTAuthenticationMiddleWare]
    def get(self, request):
        try:
            time.sleep(2)
            bed_types = BedType.objects.all().order_by('-id').values() 
            return Response({'message': 'Bed Types fetched successfully.','data':bed_types,'status':True}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"status":False,"message":"Something went wrong!","error":str(e)})
    
    def post(self, request):
        try:
            time.sleep(2)
            BedType.objects.create(**request.data)  
            return Response({'message': 'Bed Type created successfully.','status':True}, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({"status":False,"message":"Something went wrong!","error":str(e)})

class RoomTypeAPIView(APIView):
    """Creates a new floor."""
    authentication_classes = [JWTAuthenticationMiddleWare]
    parser_classes = [MultiPartParser]
    
    def get(self, request):
        try:
            time.sleep(2)
            room_types = RoomType.objects.all().order_by('-id')
            serializer = RoomTypeSerializer(room_types,many=True)
            return Response({'message': 'Room Types fetched successfully.','data':serializer.data,'status':True}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"status":False,"message":"Something went wrong!","error":str(e)})
           
           
    def post(self, request):
        time.sleep(2)
        data_object = dict(request.data)
        serializer = ImageUploadSerializer(data=request.data)
        if serializer.is_valid():
            with transaction.atomic():
                image = serializer.validated_data['image']
                room_type_object = json.loads(data_object['data'][0])
                room_type_object['bed_type'] = BedType.objects.get(id=int(room_type_object['bed_type']))
                amenity_ids = room_type_object['amenities']
                amenity_instances = Amenities.objects.filter(id__in=amenity_ids)

                try:
                    if not RoomType.objects.filter(name=room_type_object['name']).exists():
                        room_type_object.pop('amenities')
                        room_type_instance = RoomType(**room_type_object) 
                        room_type_instance.save() 
                        room_type_instance.image = image
                        room_type_instance.amenities.set(amenity_instances)
                        room_type_instance.save()
                        return Response({'message': 'Room Type created successfully.','status':True}, status=status.HTTP_201_CREATED)
                    else:
                        return Response({"status":False,"message":f"Roomtype with name '{room_type_object['name']}' already exists!"})
                except Exception as e:
                    return Response({"status":False,"message":"Something went wrong!","error":str(e)})
        else:
            return Response({"status":False,"message":"Invalid form data in request!"})
        
    def put(self,request):
        pass

class RoomAPIView(APIView):
    """...Creates a new ..."""
    authentication_classes = [JWTAuthenticationMiddleWare]
    pagination_class = LimitOffsetPagination
    parser_classes = [MultiPartParser]
    
    def get(self, request):
        
        time.sleep(2)
        query = request.GET.get('query')
        try:
            metadata = {}
            metadata['url'] = 'http://127.0.0.1:8000/api/v1/hotel-room'
            metadata['model'] = Rooms
            metadata['request'] = request
            metadata['serializer'] = RoomSerializer
            metadata['custom_paginator_class'] = CustomPaginatorClass
            metadata['message'] = 'Rooms fetched successfully!'
            
            if query != '' and query != None:
                if query == 'checkedIn':
                    metadata['_filter'] = (Q(is_checked_in__exact=True))
                else:
                    metadata['_filter'] = (   Q(room_type_id__exact=int(query)) 
                                            & Q(is_available__exact=True)
                                            & Q(maintenance_block__exact=False)
                                            & Q(is_ready__exact=True)
                                           ) 
            else:
                metadata['_filter'] = (Q())
                
            response = custom_paginate(self,metadata)
            if response:
                return Response(response)
            else:
                return Response({'message': 'Rooms fetched successfully.','status':True}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'status':False,'message':'Something went wrong'})
           
           
    def post(self, request):
        time.sleep(2)
        data_object = dict(request.data)
        serializer = ImageUploadSerializer(data=request.data)
        if serializer.is_valid():
            with transaction.atomic():
                image = serializer.validated_data['image']
                room_object = json.loads(data_object['data'][0])
                room_object['room_type'] = RoomType.objects.get(id=int(room_object['room_type']))
                room_object['floor'] = Floors.objects.get(id=int(room_object['floor']))
                amenity_ids = room_object['amenities']
                amenity_instances = Amenities.objects.filter(id__in=amenity_ids)
                try:
                    if not Rooms.objects.filter(room_no=room_object['room_no']).exists():
                        room_object.pop('amenities')
                        room_instance = Rooms(**room_object) 
                        room_instance.save() 
                        room_instance.image = image
                        room_instance.save() 
                        room_instance.amenities.set(amenity_instances)
                        room_instance.save()
                        return Response({'message': 'Room created successfully.','status':True}, status=status.HTTP_201_CREATED)
                    else:
                        return Response({"status":False,"message":f"Room with Number '{room_object['room_no']}' already exists!"})
                except Exception as e:
                    return Response({"status":False,"message":"Something went wrong!","error":str(e)})
        else:
            return Response({"status":False,"message":"Invalid form data in request!"})


class RecentlyCheckedOutRoomsAPIView(APIView):
    """...Creates a new ..."""
    authentication_classes = [JWTAuthenticationMiddleWare]
    pagination_class = LimitOffsetPagination
    
    def get(self, request):
        
        time.sleep(2)
        query = request.GET.get('query')
        try:
            metadata = {}
            metadata['url'] = 'http://127.0.0.1:8000/api/v1/hotel-room'
            metadata['model'] = Rooms
            metadata['request'] = request
            metadata['serializer'] = RoomSerializer
            metadata['custom_paginator_class'] = CustomPaginatorClass

            metadata['_filter'] = (  Q(is_ready__exact=False) 
                                    & Q(is_available__exact=False)
                                    & Q(maintenance_block__exact=False)
                                    & Q(is_occupied__exact=False)
                                    ) 

            response = custom_paginate(self,metadata)
            if response:
                return Response(response)
            else:
                return Response({'message': 'Recently Checkout Rooms fetched successfully.','status':True}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'status':False,'message':'Something went wrong'})
        
    
    def patch(self, request):
        
        time.sleep(2)
        try:
            room_id = int(request.data['id'])            
            room_instance = get_object_or_404(Rooms,id=room_id)
            room_instance.is_ready = True
            room_instance.is_available = True
            room_instance.save()

            return Response({'message': 'Room has now been marked as ready and can be booked','status':True}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'status':False,'message':'Something went wrong'})
           
           
             
class RoomComplaintsAPIView(APIView):
    """...Creates a new ..."""
    authentication_classes = [JWTAuthenticationMiddleWare]
    
    def get(self,request):
        try:
            time.sleep(2)
            complaints = RoomsComplaints.objects.filter().values().order_by("-id")
            response = {"status":True,"message":"Complaints were fetched","data":complaints}
        except:
            response = {"status":False,"message":"Something went wrong"}
        return Response(response)
    
    def post(self,request):
        try:
            data = request.data
            RoomsComplaints.objects.create(**data)
            response = {"status":True,"message":"New complaint was raised"}
        except:
            response = {"status":False,"message":"Something went wrong"}
        return Response(response)
        