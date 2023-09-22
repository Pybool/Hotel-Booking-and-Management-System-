import time
from django.contrib.auth import get_user_model
# from mail_helper import Mailservice
from rest_framework import status
import jwt, copy
from django.db.models import Q
from django.db import transaction
from rest_framework.views import APIView
from rest_framework.response import Response
User = get_user_model()
from contacts.models import Contacts
from contacts.models import ContactType
from middlewares.middleware import JWTAuthenticationMiddleWare
from contacts.serializers import ContactSerializer

class ContactTypeAPIView(APIView):
    """Creates a new client contact type"""
    authentication_classes = [JWTAuthenticationMiddleWare]
    def get(self,request):
        try:
            time.sleep(2)
            contact_types = ContactType.objects.filter().values()  
            return Response({'message': 'Contact Type fetched successfully.','data':contact_types,'status':True}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"status":False,"message":"Something went wrong!","error":str(e)})
        
    def post(self, request):
        try:
            ContactType.objects.create(**request.data)  
            return Response({'message': 'Contact Type created successfully.'}, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({"status":False,"message":"Something went wrong!","error":str(e)})

class ContactAPIView(APIView):
    """Creates a new client contact and also a user account for the contact"""
    authentication_classes = [JWTAuthenticationMiddleWare]
    
    def get(self,request):
        try:
            time.sleep(2)
            query = request.GET.get('query')
            if query != '':
                contacts = Contacts.objects.filter(contact_type_id = int(query)).order_by('-id')
            else:
                contacts = Contacts.objects.all() 
            serializer = ContactSerializer(contacts,many=True)
            contact_types = serializer.data
            return Response({'message': 'Contacts fetched successfully.','data':contact_types,'status':True}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"status":False,"message":"Something went wrong!","error":str(e)})
        
    def post(self, request):
        try:
            email = request.data.get('email')
            password = request.data.get('password')
            
            if not email or not password:
                return Response({'error': 'Please provide username, email and password.'}, status=status.HTTP_200_OK)
            if Contacts.objects.filter(email=email).exists():
                return Response({'error': 'Contact with same username or email already exists.'}, status=status.HTTP_200_OK)
            if User.objects.filter(email=email).exists():
                return Response({'error': 'User with same username or email already exists.'}, status=status.HTTP_200_OK)
            with transaction.atomic():
                contact_type = copy.deepcopy(request.data.get('contact_type'))
                request.data.pop('contact_type')
                User.create_user(**request.data)
                request.data.pop('password')
                request.data['contact_type'] = ContactType.objects.get(id=int(contact_type))
                Contacts.create_contact(**request.data)
                
            return Response({'message': 'Contact created successfully.'}, status=status.HTTP_201_CREATED)
        
        except Exception as e:
            return Response({"status":False,"message":"Something went wrong!","error":str(e)})

    def patch(self, request):
        user = User.objects.filter(email=request.data.get('email'))
        patch_data = request.data
        try:
            assert len(patch_data['password']) >= 8
            if 'password' in request.data.keys():
                patch_data['password'] = user.set_password(patch_data['password'])
                user.save()
                response = {'status':True,"message":"Password has been updated"}
            else:
                user.update(**patch_data)
                response = {'status':True,"message":"Contact record has been updated"}
        except:
            response = {'status':False,"message":"Something went wrong.."}
            
        return Response(response)