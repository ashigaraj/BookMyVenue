from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.core.mail import send_mail
from django.conf import settings


import random

from .models import User, OTPVerification

@api_view(['POST'])
def signup(request):
    #fetch data parsed
    username = request.data.get('username')
    email = request.data.get('email')
    phone = request.data.get('phone')
    role = request.data.get('role')
    password = request.data.get('password')

    # ckeck if existing email
    if User.objects.filter(email=email).exists():
        return Response(
            {'error': 'Email already registered'},
            status=status.HTTP_400_BAD_REQUEST
        )
    
    # ckeck if existing phone
    if User.objects.filter(phone=phone).exists():
        return Response(
            {'error': 'Phone number already registered'},
            status=status.HTTP_400_BAD_REQUEST
        )


    # generate otp
    otp = str(random.randint(100000, 999999))

    # store otp temporay
    OTPVerification.objects.create(
        username=username,
        email=email,
        phone=phone,
        password=password,
        otp=otp
    )

    #send otp
    send_mail(
      'OTP Verification',
       f'Your OTP is {otp}',
       settings.EMAIL_HOST_USER,
       [email],
       fail_silently=False,
    )

    return Response(
        {'message': 'OTP sent successfully'},
        status=status.HTTP_200_OK
    )



@api_view(['POST'])
def verify_otp(request):

    email = request.data.get('email')
    otp = request.data.get('otp')

    record = OTPVerification.objects.filter(
        email=email,
        otp=otp
    ).first()

    if not record:
        return Response({
            'error': 'Invalid OTP'
        }, status=400)

    user = User.objects.create_user(
        username=record.username,
        email=record.email,
        phone=record.phone,
        password=record.password,
        role='customer'
    )

    record.delete()

    return Response({
        'message': 'Registration successful'
    })    
    

    