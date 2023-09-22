import json
import time
from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from middlewares.middleware import JWTAuthenticationMiddleWare
from billing.models import Bill
from contacts.models import Contacts
from rooms.models import Rooms
from billing.serializers import BillSerializer
from services.models import Services
   
class BillingView(APIView):
    """Creates a new Bill"""
    authentication_classes = [JWTAuthenticationMiddleWare]
    
    def calculate_total(self,bill_data,_type):
        total_sum = 0

        for bill in bill_data:
            total = float(bill[_type])
            total_sum += total

        return total_sum

    def get(self,request):
        try:
            time.sleep(2)
            room = request.GET.get('room')
            reservation_token = request.GET.get('reservation_token')
            if room != '':
                room_id = [get_object_or_404(Rooms,room_no=room).id]
                bills = Bill.objects.filter(room__in = room_id).order_by('-id')                
            elif reservation_token != '':
                bills = Bill.objects.filter(active_reservation_token = reservation_token).order_by('-id')
            else:
                bills = Bill.objects.filter().order_by('-id')
            serializer = BillSerializer(bills,many=True)   
            grand_total = self.calculate_total(serializer.data,'grand_total') 
            prepaid_total = self.calculate_total(serializer.data,'prepaid_amount')    
            return Response({'message': 'Bills fetched successfully.','prepaid_total':prepaid_total,'grand_total':grand_total,'data':serializer.data,'status':True}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"status":False,"message":"Something went wrong!","error":str(e)})
        
    def post(self,request):
        try:
            bill = request.data
            print(bill)
            if(bill.get('contact',None)):
                bill['contact'] = Contacts.objects.get(id=int(bill['contact']))
            bill['room'] = Rooms.objects.get(id=int(bill['room']))
            bill['service'] = Services.objects.get(id=int(bill['service']))
            bill['active_reservation_token'] = bill['room'].active_reservation_token
            bill_instance = Bill(**bill)
            bill_instance.save()
            
            if bill_instance:
                return Response({'message': 'Bill created successfully.','status':True}, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({"status":False,"message":"Something went wrong!","error":str(e)})