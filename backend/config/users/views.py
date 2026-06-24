from django.shortcuts import render, redirect 
from django.contrib.auth import authenticate, login
from django.contrib.auth.decorators import login_required
from .forms import CustomerSignupForm
from .forms import OwnerSignupForm
from .forms import LoginForm
from .models import User
import random
from django.core.mail import send_mail
from django.conf import settings

from .forms import OTPVerificationForm

from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework_simplejwt.tokens import RefreshToken


from .forms import CustomerSignupForm

# Create your views here.

def customer_signup(request):

    if request.method == "POST":

        form = CustomerSignupForm(request.POST)

        if form.is_valid():
            otp = random.randint(100000, 999999)
            request.session['username'] = form.cleaned_data['username']
            request.session['email'] = form.cleaned_data['email']
            request.session['password'] = form.cleaned_data['password1']
            request.session['otp'] = str(otp)

             # Send OTP Email
            send_mail(
                subject='Venue Booking Platform - OTP Verification',
                message=f'''
                Welcome to Venue Booking Platform.

                Your OTP is: {otp}

                Do not share this OTP with anyone.
                ''',
                from_email=settings.EMAIL_HOST_USER,
                recipient_list=[form.cleaned_data['email']],
                fail_silently=False,
            )
             # Redirect to OTP verification page
            return redirect('verify_otp')


            user = form.save(commit=False)

            user.role = "CUSTOMER"
            user.status = "APPROVED"

            user.save()

            return render(
                request,
                'users/signup_success.html'
            )

    else:
        form = CustomerSignupForm()

    return render(
        request,
        'users/customer_signup.html',
        {'form': form}
    )





def owner_signup(request):

    if request.method == "POST":

        form = OwnerSignupForm(request.POST)

        if form.is_valid():

            user = form.save(commit=False)

            user.role = "OWNER"
            user.status = "PENDING"

            user.save()

            return render(
                request,
                'users/pending_approval.html'
            )

    else:
        form = OwnerSignupForm()

    return render(
        request,
        'users/owner_signup.html',
        {'form': form}
    )   


def login_view(request):

    if request.method == 'POST':

        form = LoginForm(request.POST)

        if form.is_valid():

            username = form.cleaned_data['username']
            password = form.cleaned_data['password']

            user = authenticate(
                request,
                username=username,
                password=password
            )

            if user is not None:

                login(request, user)

                if user.role == 'CUSTOMER':
                    return redirect('venue_list')

                elif user.role == 'OWNER':
                    return redirect('owner_dashboard')

                   

                elif user.role == 'ADMIN':
                    return redirect('/admin/')

            else:
                return render(
                    request,
                    'users/login.html',
                    {
                        'form': form,
                        'error': 'Invalid username or password'
                    }
                )

    else:
        form = LoginForm()

    return render(
        request,
        'users/login.html',
        {'form': form}
    )

  
@login_required
def owner_dashboard(request):

    if request.user.role != 'OWNER':
        return redirect('venue_list')

    return render(
        request,
        'users/owner_dashboard.html'
    )



def verify_otp(request):

    if request.method == "POST":

        form = OTPVerificationForm(request.POST)

        if form.is_valid():

            entered_otp = form.cleaned_data['otp']

            stored_otp = request.session.get('otp')

            if entered_otp == stored_otp:

                username = request.session.get('username')
                email = request.session.get('email')
                password = request.session.get('password')

                User.objects.create_user(
                    username=username,
                    email=email,
                    password=password,
                    role='CUSTOMER'
                )

                request.session.pop('otp', None)
                request.session.pop('username', None)
                request.session.pop('email', None)
                request.session.pop('password', None)

                return redirect('login')

            else:

                form.add_error(
                    'otp',
                    'Invalid OTP'
                )

    else:

        form = OTPVerificationForm()

    return render(
        request,
        'users/verify_otp.html',
        {'form': form}
    )

@api_view(['POST'])
def login(request):

    username =request.data.get('username')
    

    password = request.data.get('password')

    user = authenticate(
        username=username,
        password=password
    )

    if user:
        refresh = RefreshToken.for_user(user)

        return Response({
            "success": True,
            "role": user.role,
            'access': str(refresh.access_token),
            'refresh': str(refresh),
        })

    return Response({
        "success": False,
        "message":"authentication failed"
        
    })


@api_view(['POST'])
def signup(request):

    username = request.data.get('username')
    email = request.data.get('email')
    mobile = request.data.get('mobile')
    role = request.data.get('role')
    password = request.data.get('password')

    if User.objects.filter(
        username=username
    ).exists():

        return Response(
            {"message": "Username already exists"},
            status=400
        )

    user = User.objects.create_user(
        username=username,
        email=email,
        password=password
    )

    user.mobile = mobile
    user.role = role

    user.save()

    return Response({
        "message":
        "Registration Successful"
    }) 