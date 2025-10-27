from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework import generics
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.permissions import AllowAny
from django.db.models import Q


from .models import (
    Banner, Team, Announcement, Project, ContactMessage, Event, News,
    Partner, Programme, ResearchArea, Facility, OutreachInitiative,
    DepartmentInfo, ContactInfo, SocialMedia, DepartmentMilestone,
    DepartmentAchievement, NewsletterSubscription
)
from .serializers import (
    BannerSerializer, TeamSerializer, AnnouncementSerializer, ProjectSerializer,
    ContactMessageSerializer, EventSerializer, NewsSerializer, PartnerSerializer,
    ProgrammeSerializer, ResearchAreaSerializer, FacilitySerializer, OutreachInitiativeSerializer,
    DepartmentInfoSerializer, ContactInfoSerializer, SocialMediaSerializer,
    DepartmentMilestoneSerializer, DepartmentAchievementSerializer, NewsletterSubscriptionSerializer
)

# Banner Views
class BannerList(generics.ListCreateAPIView):
    queryset = Banner.objects.filter(is_active=True)
    serializer_class = BannerSerializer
    permission_classes = [AllowAny]

class BannerDetail(RetrieveUpdateDestroyAPIView):
    queryset = Banner.objects.all()
    serializer_class = BannerSerializer

# Team Views
class TeamList(generics.ListCreateAPIView):
    queryset = Team.objects.filter(is_active=True)
    serializer_class = TeamSerializer
    permission_classes = [AllowAny]

class TeamDetail(RetrieveUpdateDestroyAPIView):
    queryset = Team.objects.all()
    serializer_class = TeamSerializer
    permission_classes = [AllowAny]

# Announcement Views
class AnnouncementList(generics.ListCreateAPIView):
    queryset = Announcement.objects.filter(is_active=True)
    serializer_class = AnnouncementSerializer

class AnnouncementDetail(RetrieveUpdateDestroyAPIView):
    queryset = Announcement.objects.all()
    serializer_class = AnnouncementSerializer

# Project Views
class ProjectList(generics.ListCreateAPIView):
    queryset = Project.objects.filter(is_active=True)
    serializer_class = ProjectSerializer
    permission_classes = [AllowAny]

class ProjectDetail(RetrieveUpdateDestroyAPIView):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    permission_classes = [AllowAny]

class FeaturedProjectList(generics.ListAPIView):
    queryset = Project.objects.filter(is_active=True, is_featured=True)
    serializer_class = ProjectSerializer
    permission_classes = [AllowAny]

# Contact Message Views
class ContactMessageCreate(generics.ListCreateAPIView):
    queryset = ContactMessage.objects.all()
    serializer_class = ContactMessageSerializer

class ContactMessageDetail(RetrieveUpdateDestroyAPIView):
    queryset = ContactMessage.objects.all()
    serializer_class = ContactMessageSerializer

# Event Views
class EventList(generics.ListCreateAPIView):
    queryset = Event.objects.all()
    serializer_class = EventSerializer

class EventDetail(RetrieveUpdateDestroyAPIView):
    queryset = Event.objects.all()
    serializer_class = EventSerializer

class FeaturedEventList(generics.ListAPIView):
    queryset = Event.objects.filter(is_featured=True)
    serializer_class = EventSerializer

# News Views
class NewsList(generics.ListCreateAPIView):
    queryset = News.objects.filter(is_active=True)
    serializer_class = NewsSerializer
    permission_classes = [AllowAny]

class NewsDetail(RetrieveUpdateDestroyAPIView):
    queryset = News.objects.all()
    serializer_class = NewsSerializer
    permission_classes = [AllowAny]

class FeaturedNewsList(generics.ListAPIView):
    queryset = News.objects.filter(is_active=True, is_featured=True)
    serializer_class = NewsSerializer
    permission_classes = [AllowAny]

# Partner Views
class PartnerList(generics.ListCreateAPIView):
    queryset = Partner.objects.filter(is_active=True)
    serializer_class = PartnerSerializer
    permission_classes = [AllowAny]

class PartnerDetail(RetrieveUpdateDestroyAPIView):
    queryset = Partner.objects.all()
    serializer_class = PartnerSerializer
    permission_classes = [AllowAny]

# Programme Views
class ProgrammeList(generics.ListCreateAPIView):
    queryset = Programme.objects.filter(is_active=True)
    serializer_class = ProgrammeSerializer
    permission_classes = [AllowAny]

class ProgrammeDetail(RetrieveUpdateDestroyAPIView):
    queryset = Programme.objects.all()
    serializer_class = ProgrammeSerializer
    permission_classes = [AllowAny]

# Research Area Views
class ResearchAreaList(generics.ListCreateAPIView):
    queryset = ResearchArea.objects.filter(is_active=True)
    serializer_class = ResearchAreaSerializer
    permission_classes = [AllowAny]

class ResearchAreaDetail(RetrieveUpdateDestroyAPIView):
    queryset = ResearchArea.objects.all()
    serializer_class = ResearchAreaSerializer
    permission_classes = [AllowAny]

# Facility Views
class FacilityList(generics.ListCreateAPIView):
    queryset = Facility.objects.filter(is_active=True)
    serializer_class = FacilitySerializer
    permission_classes = [AllowAny]

class FacilityDetail(RetrieveUpdateDestroyAPIView):
    queryset = Facility.objects.all()
    serializer_class = FacilitySerializer
    permission_classes = [AllowAny]

# Outreach Initiative Views
class OutreachInitiativeList(generics.ListCreateAPIView):
    queryset = OutreachInitiative.objects.filter(is_active=True)
    serializer_class = OutreachInitiativeSerializer
    permission_classes = [AllowAny]

class OutreachInitiativeDetail(RetrieveUpdateDestroyAPIView):
    queryset = OutreachInitiative.objects.all()
    serializer_class = OutreachInitiativeSerializer
    permission_classes = [AllowAny]

# Department Info Views
class DepartmentInfoList(generics.ListCreateAPIView):
    queryset = DepartmentInfo.objects.filter(is_active=True)
    serializer_class = DepartmentInfoSerializer
    permission_classes = [AllowAny]

class DepartmentInfoDetail(RetrieveUpdateDestroyAPIView):
    queryset = DepartmentInfo.objects.all()
    serializer_class = DepartmentInfoSerializer
    permission_classes = [AllowAny]

# Contact Info Views
class ContactInfoList(generics.ListCreateAPIView):
    queryset = ContactInfo.objects.filter(is_active=True)
    serializer_class = ContactInfoSerializer
    permission_classes = [AllowAny]

class ContactInfoDetail(RetrieveUpdateDestroyAPIView):
    queryset = ContactInfo.objects.all()
    serializer_class = ContactInfoSerializer
    permission_classes = [AllowAny]

# Social Media Views
class SocialMediaList(generics.ListCreateAPIView):
    queryset = SocialMedia.objects.filter(is_active=True)
    serializer_class = SocialMediaSerializer
    permission_classes = [AllowAny]

class SocialMediaDetail(RetrieveUpdateDestroyAPIView):
    queryset = SocialMedia.objects.all()
    serializer_class = SocialMediaSerializer
    permission_classes = [AllowAny]

# Department Milestone Views
class DepartmentMilestoneList(generics.ListCreateAPIView):
    queryset = DepartmentMilestone.objects.filter(is_active=True)
    serializer_class = DepartmentMilestoneSerializer
    permission_classes = [AllowAny]

class DepartmentMilestoneDetail(RetrieveUpdateDestroyAPIView):
    queryset = DepartmentMilestone.objects.all()
    serializer_class = DepartmentMilestoneSerializer
    permission_classes = [AllowAny]

# Department Achievement Views
class DepartmentAchievementList(generics.ListCreateAPIView):
    queryset = DepartmentAchievement.objects.filter(is_active=True)
    serializer_class = DepartmentAchievementSerializer
    permission_classes = [AllowAny]

class DepartmentAchievementDetail(RetrieveUpdateDestroyAPIView):
    queryset = DepartmentAchievement.objects.all()
    serializer_class = DepartmentAchievementSerializer
    permission_classes = [AllowAny]

# Newsletter Subscription Views
class NewsletterSubscriptionList(generics.ListCreateAPIView):
    queryset = NewsletterSubscription.objects.filter(is_active=True)
    serializer_class = NewsletterSubscriptionSerializer
    permission_classes = [AllowAny]

class NewsletterSubscriptionDetail(RetrieveUpdateDestroyAPIView):
    queryset = NewsletterSubscription.objects.all()
    serializer_class = NewsletterSubscriptionSerializer
    permission_classes = [AllowAny]

