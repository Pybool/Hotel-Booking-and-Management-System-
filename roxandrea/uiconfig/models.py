import os
from django.db import models
from django.dispatch import receiver
from django.utils import timezone

from contacts.models import Contacts

class Features(models.Model):
    name = models.CharField(max_length=255, null=False, unique=True)
    image = models.ImageField(upload_to='images/uiconfig/features')
    order_index = models.CharField(max_length=255, null=False, blank=False, unique=True)
    updated_at = models.DateTimeField(auto_now=True, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True, null=True)

# class Rooms(models.Model):
#     room_no = models.CharField(max_length=255, null=False,unique=True)
#     dial_no = models.CharField(max_length=255, null=False)
#     image = models.ImageField(upload_to='images/rooms')
 