import json
import time
from django.contrib.auth import get_user_model
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
from rooms.models import RoomType
from rooms.models import Rooms
from finance.models import RoomAndRates
from finance.models import Rates
from authentication.models import Salary
from departments.models import Departments
from authentication.models import Users
from departments.serializers import DepartmentSerializer

class DepartmentsView(APIView):
    """Creates a new Salary"""
    authentication_classes = [JWTAuthenticationMiddleWare]
    def get(self,request):
        try:
            time.sleep(2)
            departments = Departments.objects.filter(is_active=True).order_by('-id')
            department_serializer = DepartmentSerializer(departments,many=True).data
            list_departments = [dict(ordered_dict) for ordered_dict in department_serializer]
            print(list_departments)
            for department in list_departments:
                department['director'] = dict(department['director'])
                department['staff_count'] = Users.objects.filter(department=department['department_name']).count()     
            if list_departments:
                return Response({'message': 'Departments fetched successfully.','data':list_departments,'status':True}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"status":False,"message":"Something went wrong!","error":str(e)})
        
    def post(self,request):
        try:
            department = request.data
            department['director'] = Users.objects.get(id=int(department['director']))
            # department['staff_count'] = Users.object.get(department=department['department_name'])
            department_instance = Departments(**department)
            department_instance.save()
            
            if department_instance:
                return Response({'message': 'Department created successfully.'}, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({"status":False,"message":"Something went wrong!","error":str(e)})