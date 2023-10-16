import json
import time
from django.contrib.auth import get_user_model
from django.db import connection
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from energy.rawqueries import energy_reading, summary_query

from middlewares.middleware import JWTAuthenticationMiddleWare

class EnergyReadingsView(APIView):
    authentication_classes = [JWTAuthenticationMiddleWare]
    def get(self,request):
        try:
            req_status = ''
            year = request.GET.get('year')
            month = request.GET.get('month')
            page = request.GET.get('page')
            event_type = request.GET.get('event_type')
            # Map event type to reqStatus
            if event_type == 'DT':
                req_status = 'DT'
            elif event_type == 'Feeder':
                req_status = 'Feeder'
            elif event_type == 'Non-MD':
                req_status = 'Non-MD'
            elif event_type == 'MD':
                req_status = 'MD'
            elif event_type == 'Governments/Organizations':
                req_status = 'Governments/Organizations';
            
            readings = self.get_meter_reading(year,month,req_status,page)
            if readings:
                return Response({'message': 'Energy readings fetched successfully.','data':readings,'status':True}, status=status.HTTP_200_OK)
            else:
                return Response({"status":False,"message":"No records were found!"})
        except Exception as e:
            return Response({"status":False,"message":"Something went wrong!","error":str(e)})
    
    def get_meter_reading(self,year, month, req_status, page=1, per_page=50):
        offset = (page - 1) * per_page
        sql_query = energy_reading
        with connection.cursor() as cursor:
            cursor.execute(sql_query, [req_status, year, month, offset, per_page])
            results = cursor.dictfetchall()
        return results

    
    def get_summary(self,year,month):
        sql_query = summary_query
        with connection.cursor() as cursor:
            cursor.execute(sql_query, [year, month])
            results = cursor.dictfetchall()
        return results
        