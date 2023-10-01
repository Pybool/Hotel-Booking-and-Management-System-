from django.db import models

from rooms.models import Rooms
from contacts.models import Contacts
from services.models import Services

# Create your models here.
class Bill(models.Model):
    bill_date = models.DateTimeField()
    itemid = models.IntegerField(null=True,blank=True)
    contact = models.ForeignKey(Contacts, on_delete=models.CASCADE,null=True, blank=True)
    room = models.ForeignKey(Rooms, on_delete=models.CASCADE)
    service = models.ForeignKey(Services, on_delete=models.CASCADE)
    rate = models.DecimalField(max_digits=10, decimal_places=2)
    tax_amount = models.DecimalField(max_digits=10, decimal_places=2)
    prepaid_amount = models.DecimalField(max_digits=10, decimal_places=2)
    grand_total = models.DecimalField(max_digits=10, decimal_places=2)
    active_reservation_token = models.CharField(max_length=255, null=True, default='')
    details = models.TextField()