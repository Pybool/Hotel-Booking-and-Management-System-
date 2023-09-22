import os
from django.db import models
from django.dispatch import receiver
from django.utils import timezone
from rooms.models import RoomType
from authentication.models import Users
"""Hotel room rates"""
class Departments(models.Model):
    department_name =  models.CharField(max_length=255, null=True,blank=True, default='')
    director = models.ForeignKey(Users,on_delete=models.CASCADE)
    phone = models.CharField(max_length=255, null=True,blank=True, default='')
    staff_count = models.IntegerField(default=0,null=True,blank=True)
    description = models.CharField(max_length=1000, null=True,blank=True, default='')
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True, null=True)