from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):

    ROLE_CHOICES = (
        ('CUSTOMER', 'Customer'),
        ('OWNER', 'Owner'),
        ('ADMIN', 'Admin'),
    )

    email = models.EmailField(unique=True)

    phone = models.CharField(max_length=15, unique=True)

    role = models.CharField(
        max_length=20,
        choices=ROLE_CHOICES,
        default='CUSTOMER'
    )



    def __str__(self):
        return self.username
    

class OTPVerification(models.Model):
    username = models.CharField(max_length=150)
    email = models.EmailField()
    phone = models.CharField(max_length=15)
    password = models.CharField(max_length=128)

    otp = models.CharField(max_length=6)

    created_at = models.DateTimeField(auto_now_add=True)    