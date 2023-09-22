from rest_framework import serializers
from authentication.models import Users
from departments.models import Departments

class DepartmentStaffSerializer(serializers.ModelSerializer):
    class Meta:
        model = Users
        fields = ['id','role', 'firstname', 'surname' ,'email', 'phone']
    
    
class DepartmentSerializer(serializers.ModelSerializer):
    director = DepartmentStaffSerializer(many=False)
    class Meta:
        model = Departments
        fields = '__all__'
    
    
    
