import pprint
import random
import time
from django.contrib.auth import get_user_model
from mail_helper import Mailservice
from middlewares.middleware import JWTAuthenticationMiddleWare
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
import jwt
from django.db.models import Q
from django.db import transaction
from datetime import datetime
from django.core.paginator import Paginator
from roxandrea.custompagination import CustomPaginatorClass
from rest_framework.pagination import LimitOffsetPagination

from finance.models import Salary
from helper import custom_paginate
from .models import StaffCommentary, StaffRoles, Users
from django.shortcuts import get_object_or_404
from datetime import datetime, timedelta, timezone
from django.conf import settings
from django.contrib.auth import authenticate
from rest_framework.parsers import MultiPartParser
from .serializers import ImageUploadSerializer, StaffSerializer

img_base_url = f"http://127.0.0.42:8080/profile_pics/"

class StaffAPIView(APIView):
    authentication_classes = [JWTAuthenticationMiddleWare]
    pagination_class = LimitOffsetPagination
    
    def makeSearchParamString(self,obj):
        return '&'+str(obj).replace('{','').replace('}','').replace(':','=').replace("['",'').replace("']",'').replace("'",'').replace(",",'&').replace(" ",'')
    
    
    def get(self, request):
        time.sleep(2)
        if request.GET.get('all')=='true' :
            return Response({'status':True,"data":Users.objects.filter(is_archived=False).order_by("-id").values('email','firstname','surname','id')})
        try:
            q = request.GET.get('q', None)
            q_offset = int(request.GET.get('offset', 1))
            dropdownfilter = request.GET.get('filter')
            metadata = {}
            metadata['url'] = 'http://127.0.0.1:8000/api/v1/manage-staff'
            metadata['model'] = Users
            metadata['request'] = request
            metadata['serializer'] = StaffSerializer
            metadata['custom_paginator_class'] = CustomPaginatorClass
            
            if not q:
                metadata['_filter'] = (Q(is_archived__exact=False))
            
            if dropdownfilter == 'false':
                metadata['_filter'] = (Q(email__icontains=q) | Q(firstname__icontains=q) | Q(lastname__icontains = q)) |Q(phone__icontains = q)
            elif dropdownfilter == 'true':
                metadata['_filter'] = (Q(status__iexact=q))

            response = custom_paginate(self,metadata)
            print("Paginator response ====> ", response)
            if response:
                return Response(response)
            else:
                return Response({'status':False, 'data':[],'message':'Could not fetch staff successfully!'})
        except Exception as e:
            return Response({'status':False,'message':'Something went wrong'})
        
        if request.GET.get('all')=='true' :
            return Response({'status':True,"data":Users.objects.filter(is_archived=False).order_by("-id").values('email','firstname','surname','id')})
        else:
            try:
                is_search = False
                q = request.GET.get('q', None)
                q_offset = int(request.GET.get('offset', 1))
                dropdownfilter = request.GET.get('filter')
                self.custom_paginator = CustomPaginatorClass(StaffAPIView.pagination_class,request)
                User = get_user_model()
                """Handle filtering and getting of staff here"""
                
                if not q:
                    staff = Users.objects.filter(is_archived=False).order_by("-id")
                else:
                    is_search = True
                    if dropdownfilter == 'false':
                        _filter = (Q(email__icontains=q) | Q(firstname__icontains=q) | Q(lastname__icontains = q)) |Q(phone__icontains = q)
                    elif dropdownfilter == 'true':
                        _filter = (Q(status__iexact=q))
                    staff = User.objects.filter(_filter).order_by("-id")
                    
                """End filtering"""
                time.sleep(2)
                staff_count = staff.count()
                if staff:
                    try:
                        page_size = self.pagination_class.default_limit
                        paginator = Paginator(staff, page_size)
                        q_offset = max(1, min(q_offset, paginator.num_pages))
                        
                        staff = paginator.page(q_offset)
                        serialized_staff = StaffSerializer(staff, many=True).data
                        staffs_list_of_dicts = [dict(ordered_dict) for ordered_dict in serialized_staff]
                            
                        response = self.custom_paginator.paginate_queryset(staff)
                        response = self.custom_paginator.get_paginated_response(staff)
                        response.data["status"] = True
                        response.data["message"] = "Staff fetched successfully."
                        response.data["data"] = staffs_list_of_dicts
                        response.data["count"] = staff_count
                        response.data["is_search"] = is_search
                        response.status_code = status.HTTP_200_OK
                                            
                        if len(request.GET.keys()) > 0 and is_search:
                            params = dict(request.GET)
                            try:
                                params.pop('limit')
                                params.pop('offset')
                            except:
                                pass
                            response.data["query"] = self.makeSearchParamString(params)
                        total_pages = (staff_count + page_size - 1) // page_size
                        # Update pagination information in the response
                        response.data['last'] = f'http://127.0.0.1:8000/api/v1/manage-staff?limit={page_size}&offset={total_pages}'
                        _response = {"status":response.data["status"],
                                    "message":response.data["message"],
                                    "data":response.data["data"],
                                    "count":response.data["count"] ,
                                    "is_search":response.data["is_search"],
                                    "last":response.data['last']
                                    }
                        return Response(_response)
                        
                    except Exception as e:
                        response = {"status": False, "message": "Could not fetch staff successfully!"}
                else:
                    response = {"status": False, "message": "Could not fetch staff successfully!"}
                
                return Response(response)
            except Exception as e:
                return Response({"status":False,"message":"Something went wrong!","error":str(e)})

    
    def patch(self, request):
        data = request.data
        affected_rows = Users.objects.filter(id= int(data['id'])).update(**data)
        if affected_rows > 0:
            return Response({"status":True,"message":"Staff record was updated"})
        return Response({"status":False,"message":"Staff record was not updated"})
    
    def post(self, request):
        try:
            User = get_user_model()
            email = request.data.get('email')
            password = request.data.get('password') or 'roxuser'
            request.data['role'] = StaffRoles.objects.get(id=request.data['role'])
            request.data['basic_salary'] = Salary.objects.get(id=int(request.data['basic_salary']))
            time.sleep(2)
            if not email or not password:
                return Response({'message': 'Please provide username, email and password.',"status":False}, status=status.HTTP_200_OK)
            if  User.objects.filter(email=email).exists():
                return Response({'message': 'User with same username or email already exists.',"status":False}, status=status.HTTP_200_OK)
            Users.create_user(**request.data)
            return Response({'message': 'User created successfully.',"status":True}, status=status.HTTP_201_CREATED)
        
        except Exception as e:
            return Response({"status":False,"message":"Something went wrong!","error":str(e)})
        
    def put(self, request):
        try:
            User = get_user_model()
            email = request.data.get('email')
            uid = request.data.get('id')
            
            request.data['role'] = StaffRoles.objects.get(id=int(request.data.get('role').get('id')))
            request.data['basic_salary'] = Salary.objects.get(id=int(request.data.get('basic_salary').get('id')))
            time.sleep(2)
            if not email:
                return Response({'message': 'Please provide a valid email address.',"status":False}, status=status.HTTP_200_OK)
            affected_rows = User.objects.filter(id=uid).update(**request.data)
            
            if(affected_rows > 0):
                return Response({'message': 'Staff record updated successfully.',"status":True}, status=status.HTTP_202_ACCEPTED)
            return Response({'message': 'Staff record was NOT updated.',"status":False}, status=status.HTTP_200_OK)
        
        except Exception as e:
            return Response({"status":False,"message":"Something went wrong!","error":str(e)})

class LoginStaffAPIView(APIView):
    def post(self, request):
        try:
            username = request.data.get('email')
            password = request.data.get('password')
            user = authenticate(username=username, password=password)
            if user is not None:
                token_payload = {
                    'user_id': user.id,
                    'exp': datetime.utcnow() + timedelta(days=7),
                    'iat': datetime.utcnow()
                }
                token = jwt.encode(token_payload, settings.SECRET_KEY, algorithm='HS256')
                return Response(
                    {'status':True,
                    'token': token,
                    'username':user.username,
                    'uid':user.id,
                    'is_admin':user.is_admin,
                    'department':user.department
                    }, status=status.HTTP_200_OK
                )
                
            return Response({'status':False,'error': 'Invalid username or password.'}, status=status.HTTP_401_UNAUTHORIZED)
        except Exception as e:
            return Response({"status":False,"message":"Something went wrong!","error":str(e)})
             
class UserProfileView(APIView):
    authentication_classes = [JWTAuthenticationMiddleWare]
    def get(self, request):
        try:
            user = Users.objects.filter(email=request.user.email).values().first()
            if user is not None:
                return Response({'status':True,'data':user,'profile_pics':img_base_url + str(Users.objects.filter(email=request.user.email).values('profile_pics').first()['profile_pics'])}, status=status.HTTP_200_OK)
            else:
                return Response({'status':False,'error': 'User was not found!'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"status":False,"message":"Something went wrong!","error":str(e)})
        
    def put(self, request):
        try:
            profile_data = request.data.get('profile_data')
            update = Users.objects.filter(email=request.user.email).update(**profile_data)
            if update > 0:
                return Response({'status':True,'data':profile_data['username']}, status=status.HTTP_200_OK)
            else:
                return Response({'status':False,'error': 'Update failed!'})
        except Exception as e:
            return Response({"status":False,"message":"Something went wrong!","error":str(e)})
        
    def post(self,request):
        try:
            transaction_pin_enabled = request.data
            update = Users.objects.filter(email=request.user.email).update(**transaction_pin_enabled)
            if update > 0:
                return Response({'status':True,'data':'Action was successful'}, status=status.HTTP_200_OK)
            else:
                # Return error response
                return Response({'status':False,'error': 'Update failed!'})
        except Exception as e:
            return Response({"status":False,"message":"Something went wrong!","error":str(e)})

class UploadProfilePictureView(APIView):
    authentication_classes = [JWTAuthenticationMiddleWare]
    parser_classes = [MultiPartParser]

    def post(self, request, *args, **kwargs):
        serializer = ImageUploadSerializer(data=request.data)

        if serializer.is_valid():
            image = serializer.validated_data['image']
            print("IMAGE ====> ", image )
            image_instance, created = Users.objects.get_or_create(id=request.user.id)
            image_instance.profile_pics = image
            image_instance.save()
            
            user = Users.objects.filter(id=request.user.id)
            user.update(profile_pics=f'{image}')
            
            # Construct the full URL of the uploaded image
            print(user.values().first())
            image_url = f"http://127.0.0.42:8080/profile_pics/{user.values().first()['profile_pics']}"
            print(image_url)
            return Response({'message': 'Image uploaded successfully','profile_pic':image_url}, status=201)
        else:
            return Response(serializer.errors, status=400)
            
class CheckUserExists(APIView):
    authentication_classes = [JWTAuthenticationMiddleWare]
    def post(self,request):
        try:
            if Users.objects.filter(email=request.data['email']).exists():
                response = {"status":True}
            else:
                response = {"status":False}
            return Response(response)
        except Exception as e:
            return Response({"status":False,"message":"Something went wrong!","error":str(e)})

class MakeUserAdminView(APIView):
    authentication_classes = [JWTAuthenticationMiddleWare]
    def post(self,request):
        try:
            msg = ''
            data = request.data
            new_data = {'is_admin':True}

            msg = f"Operation was successfull!"
            Users.objects.filter(email = request.user.email).update(**new_data)
            return Response({"status":True,"message":msg})
        except Exception as e:
            return Response({"status":False,"message":"Something went wrong!","error":str(e)})

class StaffCommentaryView(APIView):
    authentication_classes = [JWTAuthenticationMiddleWare]
    def put(self,request):
        try:
            staff_for_comment = Users.objects.get(id = request.data['id'])
            previous_commentary = list(staff_for_comment.commentary.all())
            request.data['comment_by'] = request.user.email
            request.data.pop('id')
            with transaction.atomic():
                commentary_instance = StaffCommentary(**request.data)
                commentary_instance.save()
                staff_for_comment.commentary.add(*[commentary_instance] + previous_commentary)
            return Response({"status":True,"message":'New commentary was added'})
        except Exception as e:
            return Response({"status":False,"message":"Something went wrong!","error":str(e)})
    
    def get(self,request):
        try:
            staff_for_comment = Users.objects.get(id = request.GET.get('uid',None))
            previous_commentary = list(staff_for_comment.commentary.all().values())
            return Response({"status":True,"message":'Fetched staff commentary successfully',"data":previous_commentary})
        except Exception as e:
            return Response({"status":False,"message":"Something went wrong!","error":str(e)})

class StaffPropertyView(APIView):
    authentication_classes = [JWTAuthenticationMiddleWare]
    
    def get(self,request):
        try:
            property = request.GET.get('property')
            staff_with_proprty = Users.objects.filter(**{property:True})
            serialized_staff = StaffSerializer(staff_with_proprty, many=True).data
            print(serialized_staff)
            staffs_list_of_dicts = [dict(ordered_dict) for ordered_dict in serialized_staff]
            return Response({"status":True,"message":'Fetched staff successfully','data':staffs_list_of_dicts})
        except Exception as e:
            return Response({"status":False,"message":"Something went wrong!","error":str(e)})
        
    def patch(self,request):
        try:
            to_unarchive = request.GET.get('reverse',None) == 'true'
            staff_for_archive = Users.objects.get(id = request.GET.get('uid',None))
            staff_for_archive.is_archived = not to_unarchive
            staff_for_archive.save()
            msg = 'Staff has been archived' if not to_unarchive else 'Staff has been unarchived'
            return Response({"status":True,"message":msg,'is_archive':not to_unarchive})
        except Exception as e:
            return Response({"status":False,"message":"Something went wrong!","error":str(e)})     

class StaffRoleView(APIView):
    authentication_classes = [JWTAuthenticationMiddleWare]
    
    def get(self,request):
        try:
            roles = StaffRoles.objects.filter().values()
            return Response({"status":True,"message":'Fetched staff roles successfully','data':roles})
        except Exception as e:
            return Response({"status":False,"message":"Something went wrong!","error":str(e)})
    
    def post(self,request):
        try:
            role = request.data
            request.data['salary'] = Salary.objects.get(id=request.data['salary'])
            role_instance = StaffRoles(**role)
            role_instance.save()
            
            if role_instance:
                return Response({'message': 'Role created successfully.','status':True}, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({"status":False,"message":"Something went wrong!","error":str(e)})
        