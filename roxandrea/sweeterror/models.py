from django.db import models
from django.dispatch import receiver

class SweetError(models.Model):
    """Addons model."""
    error_name = models.CharField(max_length=20,null=False,blank=False )
    error_lines = models.JSONField(default=list())
    sweet_error = models.CharField(max_length=255,null=False,blank=False) 
    raw_traceback = models.TextField(default='')
    parsed_traceback = models.TextField(default='')
    is_resolved = models.BooleanField(default=False)
    is_permitted = models.BooleanField(default=False)
    is_legacy = models.BooleanField(default=False)