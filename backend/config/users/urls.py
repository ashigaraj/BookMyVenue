from django.urls import path
from .views import login
from .views import login_view, owner_dashboard

from .api_views import signup, verify_otp
    
    



urlpatterns = [
   

    
    path(
        'login/',
        login_view,
        name='login'
    ),

    path(
        'owner/dashboard/',
        owner_dashboard,
        name='owner_dashboard'
    ),
    
    
    
    path(
        'api/login/',
         login,
         name='login'
    ),
    
    path(
        'api/signup/',
        signup,
        name='signup'
    ),
    path(
        'api/verify_otp/',
        verify_otp,
        name='verify_otp'
    ),
   
   
   

]