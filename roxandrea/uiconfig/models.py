import os
from django.db import models
from django.dispatch import receiver
from django.utils import timezone
from restaurant.models import Meal
from contacts.models import Contacts
from rooms.models import Rooms

class Features(models.Model):
    name = models.CharField(max_length=255, null=False, unique=True)
    image = models.ImageField(upload_to='images/uiconfig/features')
    order_index = models.CharField(max_length=255, null=False, blank=False, unique=True)
    updated_at = models.DateTimeField(auto_now=True, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True, null=True)
    
class Services(models.Model):
    name = models.CharField(max_length=255, null=False, unique=True)
    image = models.ImageField(upload_to='images/uiconfig/services')
    order_index = models.CharField(max_length=255, null=False, blank=False, unique=True)
    updated_at = models.DateTimeField(auto_now=True, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True, null=True)

class UIMasterRooms(models.Model):
    room = models.ForeignKey(Rooms, on_delete=models.CASCADE)
    display_name = models.CharField(max_length=255, null=False)
    order_index = models.CharField(max_length=255, null=False, blank=False, unique=True,default=1)
    updated_at = models.DateTimeField(auto_now=True, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True, null=True)
    
class FeaturedRestaurantMeals(models.Model):
    meal = models.ForeignKey(Meal, on_delete=models.CASCADE)
    display_name = models.CharField(max_length=255, null=False)
    order_index = models.CharField(max_length=255, null=False, blank=False, unique=True,default=1)
    updated_at = models.DateTimeField(auto_now=True, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True, null=True)
 