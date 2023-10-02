import time
import datetime
import random
from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from django.db import transaction
from middlewares.middleware import JWTAuthenticationMiddleWare
from billing.models import Bill
from contacts.models import Contacts
from rooms.models import Rooms
from billing.serializers import BillSerializer
from reservations.models import Reservations
from customresponses import operation_ok_response, record_created_response
from sweeterror.crib.core import requests_sweet_error_handler
from services.models import Services
   
class BillingView(APIView):
    """Creates a new Bill"""
    authentication_classes = [JWTAuthenticationMiddleWare]
    post_err_response = {"status":False,"message":"Something went wrong while creating invoice!"}
    get_err_response = {"status":False,"message":"Something went wrong while fetching invoices!"}

    @requests_sweet_error_handler(default=get_err_response)
    def get(self,request):
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
        grand_total = self._calculate_total(serializer.data,'grand_total') 
        prepaid_total = self._calculate_total(serializer.data,'prepaid_amount')
        response = {'message': 'Invoices fetched successfully.','prepaid_total':prepaid_total,'grand_total':grand_total,'data':serializer.data,'status':True}
        return operation_ok_response(response)    
        
    
    @requests_sweet_error_handler(default=post_err_response)
    def post(self,request):
        
        bill = request.data
        if(bill.get('contact',None)):
            bill['contact'] = Contacts.objects.get(id=int(bill['contact']))
        bill['room'] = Rooms.objects.get(id=int(bill['room']))
        bill['service'] = Services.objects.get(id=int(bill['service']))
        bill['active_reservation_token'] = bill['room'].active_reservation_token
        bill['itemid'] = self._generate_unique_number()
        
        with transaction.atomic():
            bill_instance = Bill(**bill)
            bill_instance.save()
            reservation_instance = Reservations.objects.get(reservation_token=bill['active_reservation_token'])
            existing_bills = list(reservation_instance.bills.all().values_list('id',flat=True))
            new_bills = existing_bills + [bill_instance.id]
            reservation_instance.bills.add(*new_bills)
            reservation_instance.save()
            if bill_instance:
                return record_created_response({'message': 'Invoice created successfully.','status':True})

        
    def _generate_unique_number(self):
        current_time = datetime.datetime.now().strftime("%Y%m%d%H%M%S")
        random_number = str(random.randint(0, 9999)).zfill(4) 
        unique_number = f"2{current_time}{random_number}"
        return unique_number[:8] 
    
    def _calculate_total(self,bill_data,_type):
        total_sum = 0
        for bill in bill_data:
            total = float(bill[_type])
            total_sum += total
        return total_sum