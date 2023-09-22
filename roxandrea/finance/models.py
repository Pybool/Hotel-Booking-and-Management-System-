import os
from django.db import models
from django.dispatch import receiver
from django.utils import timezone
from rooms.models import RoomType
"""Hotel room rates"""
class RoomAndRates(models.Model):
    room_type = models.ForeignKey(RoomType,on_delete=models.CASCADE)
    rate_per_night = models.DecimalField(default=0.00,max_digits=20, decimal_places=2)
    charge_per_xtra_adult = models.DecimalField(default=0.00,max_digits=20, decimal_places=2)

class Rates(models.Model):
    """Rates model"""
    rate_name =  models.CharField(max_length=255, null=True,blank=True, default='')
    room_and_rates = models.ManyToManyField(RoomAndRates,default = [])

"""Staff Salary and allowances"""
class Allowances(models.Model):
    """Staff Allowances model."""
    allowance_name = models.CharField(max_length=100, null=True, default='')
    allowance_amount = models.DecimalField(decimal_places=2, default=0.00,max_digits=20)
    is_active = models.BooleanField(default=True)

class Salary(models.Model):
    """Staff Salary model."""
    salary_name = models.CharField(max_length=100, null=True, default='')
    salary_amount = models.DecimalField(decimal_places=2, default=0.00,max_digits=20)
    max_deductable_salary = models.IntegerField(default=10)
    is_active = models.BooleanField(default=True)
    