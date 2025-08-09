from django.urls import path
from .views import TeamList, AnnouncementList, ProjectList, ContactMessageCreate, EventList, NewsList
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
urlpatterns = [
    path('team/', TeamList.as_view(), name='team-list'),
    path('announcements/', AnnouncementList.as_view(), name='announcement-list'),
    path('projects/', ProjectList.as_view(), name='project-list'),
    path('contact/', ContactMessageCreate.as_view(), name='contact-message-create'),
    path('events/', EventList.as_view(), name='event-list'),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'), 
    path('news/', NewsList.as_view(), name='news-list'),  # Assuming you have a NewsList view
]
