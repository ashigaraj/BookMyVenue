from django.urls import path
from .views import signup, verify_otp, login
    

urlpatterns = [
   
    
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