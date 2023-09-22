import json
import time
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from middlewares.middleware import JWTAuthenticationMiddleWare
from uiconfig.models import Features
from services.models import Services
from .serializers import ImageUploadSerializer
from django.db import transaction
from django.conf import settings
from django.http import QueryDict

MAX_UI_FEATURES = settings.MAX_UI_FEATURES
   
class LandingPageFeaturesView(APIView):
    authentication_classes = [JWTAuthenticationMiddleWare]
    
    def get(self, request):
        time.sleep(2)
        features_instances = Features.objects.all().values()
        return Response({"status":True,"message":"Features were fetched",'data':features_instances}, status=status.HTTP_200_OK)
        
    def post(self, request):
        time.sleep(2)
        data_object = dict(request.data)
        form_data_list = self.reconstruct_form_data(data_object)
        with transaction.atomic():
            for form_data in form_data_list:
                query_dict = QueryDict(mutable=True)
                query_dict.update(form_data)
                print("Normal dict ===> ", form_data)
                print("Query dict ===> ", query_dict)
                serializer = ImageUploadSerializer(data=query_dict)
                print("Serializer is valid ",serializer.is_valid())
                if serializer.is_valid():
                    with transaction.atomic():
                        data_object = dict(query_dict)
                        image = serializer.validated_data['image']
                        feature_object = json.loads(data_object['data'][0])
                        if(Features.objects.all().count() < MAX_UI_FEATURES):
                            if not Features.objects.filter(name__iexact=feature_object['name']).exists():
                                feature_instance = Features(**feature_object) 
                                feature_instance.save() 
                                feature_instance.image = image
                                feature_instance.save() 
                            else:
                                return Response({"status":False,"message":f"This feature already exists!"})
                        else:
                            return Response({"status":False,"message":f"You have reached the maximum number of allowable features"})
                else:
                    return Response({"status":False,"message":"Invalid form data in request!"})
            return Response({'message': 'User Interface feature created successfully.','status':True}, status=status.HTTP_201_CREATED)
        
    def reconstruct_form_data(self,form_data):
        # {'data': ['{"name":"Card 1","order_index":0}'], 'image': [<InMemoryUploadedFile: bg_1.jpg (image/jpeg)>]}
        # <QueryDict: {'data': ['{"room_no":"603","room_type":"6","floor":"6","dial_no":603010}'], 'image': [<InMemoryUploadedFile: room-1.jpg (image/jpeg)>]}> <class 'django.http.request.QueryDict'>
        buffer = []
        for key, value in form_data.items():
            if 'feature-' in key:
                buffer.append({'data':value[0],'image':form_data[f'image-{key.split("-")[1]}'][0]})
        return buffer
            