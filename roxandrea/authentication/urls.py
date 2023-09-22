from django.urls import include, path
from .views import *

urlpatterns = [
   
   path('manage-staff', StaffAPIView.as_view()),
   path('login-user', LoginStaffAPIView.as_view()),
   path('profile-user', UserProfileView.as_view()),
   path('user-exists', CheckUserExists.as_view()), 
   path('staff-commentary', StaffCommentaryView.as_view()), 
   path('staff-by-property', StaffPropertyView.as_view()), 
   path('staff-roles', StaffRoleView.as_view()), 
   path('upload-profile-pic', UploadProfilePictureView.as_view(), name='upload-profile-pic'),
]