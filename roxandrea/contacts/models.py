import os
from django.db import models

class ContactType(models.Model):
    name = models.CharField(max_length=255, null=False)

class Contacts(models.Model):
    """Contact model."""
    contact_type = models.ForeignKey(ContactType, on_delete=models.CASCADE, null=True,blank=True)
    corporate_name = models.CharField(max_length=255, null=False, default='')
    firstname = models.CharField(max_length=255, null=False, default='')
    middlename = models.CharField(max_length=255, null=False, default='')
    lastname = models.CharField(max_length=255, null=False, default='')
    age = models.IntegerField(default=18)
    phone = models.CharField(max_length=255, null=True)
    email = models.EmailField(verbose_name='email address', max_length=255, unique=True)
    address1 = models.CharField(max_length=255, null=True,blank=True, default='')
    address2 = models.CharField(max_length=255, null=True,blank=True, default='')
    city_district = models.CharField(max_length=255, null=True,blank=True, default='')
    state_province = models.CharField(max_length=255, null=True,blank=True, default='')
    postal_code = models.CharField(max_length=255, null=True,blank=True, default='')
    country = models.CharField(max_length=255, null=True,blank=True, default='Nigeria')
    contact_pics = models.ImageField(upload_to='images/contact_pics',null=True)
    social_id = models.ImageField(upload_to='images/social_id',null=True)
    self_registered = models.BooleanField(default=True)
    payment_frequency = models.CharField(max_length=255, null=True,blank=True, default='MONTHLY')
    next_pay_reminder = models.DateTimeField(null=True,blank=True)
    
    def create_contact(**extra_fields):
        """Create and save a regular contact with the given email and password."""
        return Contacts.objects.create(**extra_fields)
