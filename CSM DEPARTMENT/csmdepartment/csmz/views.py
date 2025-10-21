from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework import generics
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from django.db.models import Q
from .models import (
    Banner, Team, Announcement, Project, ContactMessage, Event, News,
    Partner, Programme, ResearchArea, Facility, OutreachInitiative
)
from .serializers import (
    BannerSerializer, TeamSerializer, AnnouncementSerializer, ProjectSerializer,
    ContactMessageSerializer, EventSerializer, NewsSerializer, PartnerSerializer,
    ProgrammeSerializer, ResearchAreaSerializer, FacilitySerializer, OutreachInitiativeSerializer
)

# Banner Views
class BannerList(generics.ListCreateAPIView):
    queryset = Banner.objects.filter(is_active=True)
    serializer_class = BannerSerializer

class BannerDetail(RetrieveUpdateDestroyAPIView):
    queryset = Banner.objects.all()
    serializer_class = BannerSerializer

# Team Views
class TeamList(generics.ListCreateAPIView):
    queryset = Team.objects.filter(is_active=True)
    serializer_class = TeamSerializer

class TeamDetail(RetrieveUpdateDestroyAPIView):
    queryset = Team.objects.all()
    serializer_class = TeamSerializer

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

class ProjectDetail(RetrieveUpdateDestroyAPIView):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer

class FeaturedProjectList(generics.ListAPIView):
    queryset = Project.objects.filter(is_active=True, is_featured=True)
    serializer_class = ProjectSerializer

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

class NewsDetail(RetrieveUpdateDestroyAPIView):
    queryset = News.objects.all()
    serializer_class = NewsSerializer

class FeaturedNewsList(generics.ListAPIView):
    queryset = News.objects.filter(is_active=True, is_featured=True)
    serializer_class = NewsSerializer

# Partner Views
class PartnerList(generics.ListCreateAPIView):
    queryset = Partner.objects.filter(is_active=True)
    serializer_class = PartnerSerializer

class PartnerDetail(RetrieveUpdateDestroyAPIView):
    queryset = Partner.objects.all()
    serializer_class = PartnerSerializer

# Programme Views
class ProgrammeList(generics.ListCreateAPIView):
    queryset = Programme.objects.filter(is_active=True)
    serializer_class = ProgrammeSerializer

class ProgrammeDetail(RetrieveUpdateDestroyAPIView):
    queryset = Programme.objects.all()
    serializer_class = ProgrammeSerializer

# Research Area Views
class ResearchAreaList(generics.ListCreateAPIView):
    queryset = ResearchArea.objects.filter(is_active=True)
    serializer_class = ResearchAreaSerializer

class ResearchAreaDetail(RetrieveUpdateDestroyAPIView):
    queryset = ResearchArea.objects.all()
    serializer_class = ResearchAreaSerializer

# Facility Views
class FacilityList(generics.ListCreateAPIView):
    queryset = Facility.objects.filter(is_active=True)
    serializer_class = FacilitySerializer

class FacilityDetail(RetrieveUpdateDestroyAPIView):
    queryset = Facility.objects.all()
    serializer_class = FacilitySerializer

# Outreach Initiative Views
class OutreachInitiativeList(generics.ListCreateAPIView):
    queryset = OutreachInitiative.objects.filter(is_active=True)
    serializer_class = OutreachInitiativeSerializer

class OutreachInitiativeDetail(RetrieveUpdateDestroyAPIView):
    queryset = OutreachInitiative.objects.all()
    serializer_class = OutreachInitiativeSerializer

