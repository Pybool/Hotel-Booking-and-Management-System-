from rest_framework import serializers

from finance.models import Salary
from authentication.models import StaffRoles
from authentication.models import Users

class ImageUploadSerializer(serializers.Serializer):
    image = serializers.ImageField()
    
class SalarySerializer(serializers.ModelSerializer):
    class Meta:
        model = Salary
        fields = '__all__'

class RoleSerializer(serializers.ModelSerializer):
    salary = SalarySerializer(many=False)
    class Meta:
        model = StaffRoles
        fields = '__all__'

class StaffSerializer(serializers.ModelSerializer):
    role = RoleSerializer(many=False)
    basic_salary = SalarySerializer(many=False)
    class Meta:
        model = Users
        fields = ['id','role', 'basic_salary', 'firstname', 'surname',  'address1', 'address2', 'email', 'phone', 'password', 'department', 'salary_topup', 'is_archived','is_sacked','is_suspended']
    
    
    
