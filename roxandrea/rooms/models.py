import os
from django.db import models
from django.dispatch import receiver
from django.utils import timezone

from contacts.models import Contacts

class Amenities(models.Model):
    amenity = models.CharField(max_length=255, null=False, default='')
    charge_amount = models.DecimalField(default=0.00, max_digits=20, decimal_places=2 )
    updated_at = models.DateTimeField(auto_now=True, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True, null=True)
    
class Floors(models.Model):
    floor_name = models.CharField(max_length=255, null=False, default='')
    floor_no = models.IntegerField(null=False,blank=False, unique=True)
    
class BedType(models.Model):
    name = models.CharField(max_length=255, null=False)
    created_at = models.DateTimeField(auto_now_add=True, null=True)

class RoomType(models.Model):
    name = models.CharField(max_length=255, null=False, default='')
    bed_type = models.ForeignKey(BedType, on_delete=models.CASCADE)
    no_occupants = models.IntegerField(null=False,blank=False)
    image = models.ImageField(upload_to='images/generic_rooms')
    amenities = models.ManyToManyField(Amenities, default=[])
    require_advance_payment = models.BooleanField(default=False)
    advance_amount = models.DecimalField(default=0.00, max_digits=20, decimal_places=2 )
    room_rate = models.DecimalField(default=1500.00, max_digits=20, decimal_places=2)

class Rooms(models.Model):
    room_type = models.ForeignKey(RoomType, on_delete=models.DO_NOTHING)
    floor = models.ForeignKey(Floors, on_delete=models.DO_NOTHING)
    room_no = models.CharField(max_length=255, null=False,unique=True)
    dial_no = models.CharField(max_length=255, null=False)
    image = models.ImageField(upload_to='images/rooms')
    occupant = models.ForeignKey(Contacts, on_delete=models.DO_NOTHING,null=True,blank=True)
    is_occupied = models.BooleanField(default=False)
    is_available = models.BooleanField(default=True)
    check_in_date = models.CharField(max_length=255, null=True)
    check_out_date = models.CharField(max_length=255, null=True)
    """Advance amount here if set overides the advance amount for the room type"""
    advance_amount = models.DecimalField(default=0.00, max_digits=20, decimal_places=2)
    """Room Rate here if set overides the room rate for the room type"""
    room_rate = models.DecimalField(default=2000.00, max_digits=20, decimal_places=2)
    """The followinf also overides the values set in room type if they are set"""
    amenities = models.ManyToManyField(Amenities, default=[])
    no_occupants = models.IntegerField(null=True,blank=True)
    """End of overides"""
    is_checked_in = models.BooleanField(default=False)
    maintenance_block = models.BooleanField(default=False)
    is_ready = models.BooleanField(default=True)
    active_reservation_token = models.CharField(max_length=255, null=True,unique=False)
    dead_reservation_token = models.CharField(max_length=255, null=True,unique=False)
    description = models.TextField(default="")
    checked_out_date = models.CharField(max_length=255, null=True)
    further_description = models.TextField(default="")
    no_beds = models.IntegerField(null=True,blank=True,default=1)
    size = models.CharField(max_length=255, null=True,blank=True,default='45 m2')
    view = models.CharField(max_length=255, null=True,blank=True,default="The statue of Ali and Nino - a moving sculptural composition in Batumi Boulevard, is one of the attractions of Georgia's Black Sea resort")

    

class RoomsComplaints(models.Model):
    rooms = models.JSONField(default=[])
    complaint_type = models.CharField(max_length=255, null=False)
    description = models.TextField(default="")
    status = models.CharField(max_length=255, null=True,blank=True,default='OPEN')
    assigned_to = models.EmailField(max_length=255, null=False)
    

