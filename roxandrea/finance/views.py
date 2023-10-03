import time
from rest_framework import status
from django.db import transaction
from rest_framework.views import APIView
from rest_framework.response import Response
from middlewares.middleware import JWTAuthenticationMiddleWare
from rooms.models import RoomType
from rooms.models import Rooms
from finance.models import RoomAndRates
from finance.models import Rates
from authentication.models import Salary
from finance.serializers import RatesSerializer

class RateLineItem():
    def __init__(self,rate_line_items):
        self.rate_line_items = rate_line_items
        
    def create_rate_line_items(self):
        room_rates_instance_buffer = []
        for rate_line_item in self.rate_line_items:
            rate_line_item['room_type'] = RoomType.objects.get(id=int(rate_line_item['room_type']))
            room_rates_instance = RoomAndRates(**rate_line_item)  
            room_rates_instance.save()
            room_rates_instance_buffer.append(room_rates_instance)
        return room_rates_instance_buffer           
            
class RatesAPIView(APIView):
    authentication_classes = [JWTAuthenticationMiddleWare]
    def get(self, request):
        try:
            time.sleep(2)
            rates = Rates.objects.all()
            serializer = RatesSerializer(rates,many=True)
            serialized_rates = serializer.data
            print(serialized_rates)
            return Response({'message': 'Rates fetched successfully.','data':serialized_rates,'status':True}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"status":False,"message":"Something went wrong!","error":str(e)})
    
    """Creates a new Rates"""
    def post(self, request):
        try:
            rate_line_items = request.data['rate_line_items']
            rate_instance = Rates(rate_name = request.data['rate_name'])
            rate_instance.save()
            self.rate_line_item = RateLineItem(rate_line_items)
            room_and_rates = self.rate_line_item.create_rate_line_items()
            rate_instance.room_and_rates.add(*room_and_rates)
            return Response({'message': 'Rates created successfully.'}, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({"status":False,"message":"Something went wrong!","error":str(e)})
 
class SalaryView(APIView):
    """Creates a new Salary"""
    authentication_classes = [JWTAuthenticationMiddleWare]
    def get(self,request):
        try:
            salaries = Salary.objects.filter().order_by('-salary_amount').values()           
            if salaries:
                return Response({'message': 'Salaries fetched successfully.','data':salaries,'status':True}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"status":False,"message":"Something went wrong!","error":str(e)})
        
    def post(self,request):
        try:
            salary = request.data
            salary_instance = Salary(**salary)
            salary_instance.save()
            
            if salary_instance:
                return Response({'message': 'Salary created successfully.'}, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({"status":False,"message":"Something went wrong!","error":str(e)})