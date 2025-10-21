from django.urls import path
from .views import (
    BannerList, BannerDetail, TeamList, TeamDetail, AnnouncementList, AnnouncementDetail,
    ProjectList, ProjectDetail, FeaturedProjectList, ContactMessageCreate, ContactMessageDetail,
    EventList, EventDetail, FeaturedEventList, NewsList, NewsDetail, FeaturedNewsList,
    PartnerList, PartnerDetail, ProgrammeList, ProgrammeDetail, ResearchAreaList, ResearchAreaDetail,
    FacilityList, FacilityDetail, OutreachInitiativeList, OutreachInitiativeDetail
)
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    # Banner URLs
    path('banners/', BannerList.as_view(), name='banner-list'),
    path('banners/<int:pk>/', BannerDetail.as_view(), name='banner-detail'),
    
    # Team URLs
    path('team/', TeamList.as_view(), name='team-list'),
    path('team/<int:pk>/', TeamDetail.as_view(), name='team-detail'),
    
    # Announcement URLs
    path('announcements/', AnnouncementList.as_view(), name='announcement-list'),
    path('announcements/<int:pk>/', AnnouncementDetail.as_view(), name='announcement-detail'),
    
    # Project URLs
    path('projects/', ProjectList.as_view(), name='project-list'),
    path('projects/<int:pk>/', ProjectDetail.as_view(), name='project-detail'),
    path('projects/featured/', FeaturedProjectList.as_view(), name='featured-project-list'),
    
    # Contact URLs
    path('contact/', ContactMessageCreate.as_view(), name='contact-message-create'),
    path('contact/<int:pk>/', ContactMessageDetail.as_view(), name='contact-message-detail'),
    
    # Event URLs
    path('events/', EventList.as_view(), name='event-list'),
    path('events/<int:pk>/', EventDetail.as_view(), name='event-detail'),
    path('events/featured/', FeaturedEventList.as_view(), name='featured-event-list'),
    
    # News URLs
    path('news/', NewsList.as_view(), name='news-list'),
    path('news/<int:pk>/', NewsDetail.as_view(), name='news-detail'),
    path('news/featured/', FeaturedNewsList.as_view(), name='featured-news-list'),
    
    # Partner URLs
    path('partners/', PartnerList.as_view(), name='partner-list'),
    path('partners/<int:pk>/', PartnerDetail.as_view(), name='partner-detail'),
    
    # Programme URLs
    path('programmes/', ProgrammeList.as_view(), name='programme-list'),
    path('programmes/<int:pk>/', ProgrammeDetail.as_view(), name='programme-detail'),
    
    # Research Area URLs
    path('research-areas/', ResearchAreaList.as_view(), name='research-area-list'),
    path('research-areas/<int:pk>/', ResearchAreaDetail.as_view(), name='research-area-detail'),
    
    # Facility URLs
    path('facilities/', FacilityList.as_view(), name='facility-list'),
    path('facilities/<int:pk>/', FacilityDetail.as_view(), name='facility-detail'),
    
    # Outreach Initiative URLs
    path('outreach/', OutreachInitiativeList.as_view(), name='outreach-initiative-list'),
    path('outreach/<int:pk>/', OutreachInitiativeDetail.as_view(), name='outreach-initiative-detail'),
    
    # Authentication URLs
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
