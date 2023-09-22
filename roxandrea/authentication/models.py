from django.db import models
from django.dispatch import receiver
from django.utils import timezone
from django.contrib.auth.models import (
    BaseUserManager, AbstractBaseUser
)
from asgiref.sync import async_to_sync
from django.db.models.signals import post_save
from django.contrib.auth.models import PermissionsMixin
from finance.models import Allowances, Salary

class UserManager(BaseUserManager):
    """Define a model manager for User model with no username field."""

    use_in_migrations = True

    def _create_user(self, email, password, **extra_fields):
        """Create and save a User with the given email and password."""
        if not email:
            raise ValueError('The given email must be set')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_user(self, email, password=None, **extra_fields):
        """Create and save a regular User with the given email and password."""
        # extra_fields.setdefault('user_type', 'Buyer')
        return self._create_user(email, password, **extra_fields)

    def create_superuser(self, email, password, **extra_fields):
        """Create and save a SuperUser with the given email and password."""
        extra_fields.setdefault('user_type', 'Admin')

        if extra_fields.get('user_type') != 'Admin':
            raise ValueError('Superuser must have user_type=Admin.')

        user =  self._create_user(email, password, **extra_fields)
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)
        return user

class StaffRoles(models.Model):
    """Staff Commentary model."""
    role_name = models.CharField(max_length=100, null=True, default='')
    work_description = models.TextField(max_length=1000, null=True, default='')
    salary = models.ForeignKey(Salary,on_delete=models.CASCADE, null=True, blank=True)

class StaffCommentary(models.Model):
    """Staff Commentary model."""
    comment_type = models.CharField(max_length=100, null=True, default='')
    comment = models.TextField(max_length=1000, null=True, default='')
    comment_by = models.CharField(max_length=255, null=True, default='')
    comment_date = models.DateTimeField(auto_now_add=True, null=True)

class Users(AbstractBaseUser,PermissionsMixin):
    """User model."""
    firstname = models.CharField(max_length=255, null=False, default='')
    surname = models.CharField(max_length=255, null=False, default='')
    othername = models.CharField(max_length=255, null=False, default='')
    username = models.CharField(max_length=255, null=False, default='')
    address1 = models.CharField(max_length=255, null=False, default='')
    address2 = models.CharField(max_length=255, null=False, default='')
    email = models.EmailField(verbose_name='email address', max_length=255, unique=True)
    phone = models.CharField(max_length=255, null=False, default='')
    accountno = models.CharField(max_length=255, null=False, default='')
    bankname = models.CharField(max_length=255, null=False, default='')
    password = models.CharField(max_length=255, null=False, default='1011')
    regdate = models.DateTimeField(auto_now_add=True, null=True)
    is_admin = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=True)
    role = models.ForeignKey(StaffRoles,on_delete=models.CASCADE, null=True, blank=True)
    department = models.CharField(max_length=255, null=False, default='')
    profile_pics = models.ImageField(upload_to='images/profile_pics')
    commentary = models.ManyToManyField(StaffCommentary,default=[])
    basic_salary = models.ForeignKey(Salary,on_delete=models.CASCADE, null=True, blank=True)
    allowances = models.ManyToManyField(Allowances, default=[])
    salary_topup = models.DecimalField(decimal_places=2, default=0.00,max_digits=20)
    is_archived = models.BooleanField(default=False)
    is_sacked = models.BooleanField(default=False)
    is_suspended = models.BooleanField(default=False)
    objects = UserManager()
    
    USERNAME_FIELD = 'email'
    
    def create_user(email, password=None, **extra_fields):
        """Create and save a regular User with the given email and password."""
        return Users.objects.create_user(email, password, **extra_fields)
    
    def vendor_name(self):
        return f"{self.firstname} {self.surname} {self.othername}"