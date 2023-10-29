from django.db import models
from django.dispatch import receiver
from contacts.models import Contacts
from finance.models import Rates
from rooms.models import Rooms
from billing.models import Bill


class Reservations(models.Model):
    """Reservations model."""
    firstname = models.CharField(max_length=255,null=True,blank=True ,default='')
    surname = models.CharField(max_length=255,null=True,blank=True ,default='')
    email = models.CharField(max_length=255,null=True,blank=True ,default='')
    gender = models.CharField(max_length=255,null=True,blank=True ,default='')
    phone= models.CharField(max_length=255,null=True,blank=True ,default='')
    address = models.CharField(max_length=255,null=True,blank=True ,default='')
    check_in = models.DateTimeField(null=False,blank=False )
    check_out = models.DateTimeField(null=False,blank=False )
    no_rooms = models.IntegerField(null=False,blank=False)
    no_occupants = models.IntegerField(null=False,blank=False)
    rooms = models.ManyToManyField(Rooms,default=list())
    contact_type = models.CharField(max_length=255,null=False,blank=False )
    contact = models.ForeignKey(Contacts, on_delete=models.CASCADE)
    package = models.CharField(max_length=255,null=True,blank=True ,default='')
    reservation_token = models.CharField(max_length=255,null=False,blank=False, unique=True) 
    payment_ref = models.CharField(max_length=255,null=True,blank=True ,default='')
    room_rate = models.ForeignKey(Rates, on_delete=models.CASCADE,null=True)
    room_tarrif = models.CharField(max_length=255, null=True,blank=True)
    tax_amount = models.DecimalField(default=0.00, max_digits=20, decimal_places=2 )
    total_amount = models.DecimalField(default=0.00, max_digits=20, decimal_places=2 )
    advance_amount = models.DecimalField(default=0.00, max_digits=20, decimal_places=2 )
    is_checked_in = models.BooleanField(default=False)
    has_checked_out = models.BooleanField(default=False)
    num_checked_in = models.IntegerField(default=0,null=True,blank=True)
    is_cancelled = models.BooleanField(default=False)
    is_fully_paid = models.BooleanField(default=False)
    is_history = models.BooleanField(default=False)
    history_rooms = models.JSONField(default=list())
    bills = models.ManyToManyField(Bill,default=list())
    addons = models.JSONField(default=list())


class Addons(models.Model):
    """Addons model."""
    name = models.CharField(max_length=255,null=False,blank=False )
    price = models.CharField(max_length=255,null=False,blank=False) 
    max_order = models.IntegerField(null=True,blank=True)
    description = models.TextField(default='')
    
class AddonsRequest(models.Model):
    """Addons model."""
    name = models.CharField(max_length=255,null=False,blank=False )
    quantity = models.IntegerField(null=False,blank=False)
    total_price = models.CharField(max_length=255,null=False,blank=False) 
    reservation_token = models.CharField(max_length=255,null=False,blank=False )
    status = models.CharField(max_length=255,null=False,blank=False ,default='PENDING')
    created_at = models.DateTimeField(auto_now_add=True, null=False,blank=False )
    
    