from django.db import models

class Services(models.Model):
    """Services model."""
    name = models.CharField(max_length=255,null=False,blank=False ,default='')
    rate = models.DecimalField(max_digits=10, decimal_places=2,null=True,blank=True)
    description = models.CharField(max_length=1000,null=False,blank=False ,default='')
  
    
    
    