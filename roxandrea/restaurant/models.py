import os
from django.db import models

class Meal(models.Model):
    name = models.CharField(max_length=255, null=False, unique=True)
    order_index = models.CharField(max_length=255, null=False, blank=False, unique=True)
    updated_at = models.DateTimeField(auto_now=True, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True, null=True)