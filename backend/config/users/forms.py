# users/forms.py

from django import forms
from django.contrib.auth.forms import UserCreationForm
from .models import User


class CustomerSignupForm(UserCreationForm):

    email = forms.EmailField()
    phone = forms.CharField(max_length=15)

    class Meta:
        model = User
        fields = [
            'username',
            'email',
            'phone',
            'password1',
            'password2'
        ]


class OwnerSignupForm(UserCreationForm):

    email = forms.EmailField()
    phone = forms.CharField(max_length=15)

    class Meta:
        model = User
        fields = [
            'username',
            'email',
            'phone',
            'password1',
            'password2'
        ]

class LoginForm(forms.Form):
    username = forms.CharField()
    password = forms.CharField(
        widget=forms.PasswordInput
    )    



class OTPVerificationForm(forms.Form):

    otp = forms.CharField(
        max_length=6,
        label="Enter OTP"
    )        