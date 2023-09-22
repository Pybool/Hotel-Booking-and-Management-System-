import json
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from middlewares.middleware import JWTAuthenticationMiddleWare
from services.models import Services
   
class ServicesView(APIView):
    """Creates a new Services"""
    authentication_classes = [JWTAuthenticationMiddleWare]
    def get(self,request):
        try:
            services = Services.objects.filter().order_by('-id').values()           
            return Response({'message': 'Services fetched successfully.','data':services,'status':True}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"status":False,"message":"Something went wrong!","error":str(e)})
        
    def post(self,request):
        try:
            services = request.data
            print(services)
            services_instance = Services(**services)
            services_instance.save()
            
            if services_instance:
                return Response({'message': 'Services created successfully.','status':True}, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({"status":False,"message":"Something went wrong!","error":str(e)})