from rest_framework import serializers
from .models import Team, Announcement, Project, ContactMessage, Event, News

class TeamSerializer(serializers.ModelSerializer):
    class Meta:
        model = Team
        fields = '__all__'



class AnnouncementSerializer(serializers.ModelSerializer):
    class Meta:
        model = Announcement
        fields = '__all__' 

class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = '__all__'

class ContactMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactMessage
        fields = '__all__'

class EventSerializer(serializers.ModelSerializer):
    image = serializers.ImageField(use_url=True)
    class Meta:
        model = Event
        fields = '__all__'

class NewsSerializer(serializers.ModelSerializer):
    status = serializers.ReadOnlyField()
    image = serializers.ImageField(use_url=True)
    class Meta:
        model = News
        fields = '__all__'