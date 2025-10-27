from rest_framework import serializers
from .models import (
    Banner, Team, Announcement, Project, ContactMessage, Event, News,
    Partner, Programme, ResearchArea, Facility, OutreachInitiative,
    DepartmentInfo, ContactInfo, SocialMedia, DepartmentMilestone,
    DepartmentAchievement, NewsletterSubscription
)

class BannerSerializer(serializers.ModelSerializer):
    background_image = serializers.ImageField(use_url=True)
    
    class Meta:
        model = Banner
        fields = '__all__'

class TeamSerializer(serializers.ModelSerializer):
    photo = serializers.ImageField(use_url=True)
    
    class Meta:
        model = Team
        fields = '__all__'

class AnnouncementSerializer(serializers.ModelSerializer):
    class Meta:
        model = Announcement
        fields = '__all__'

class ProjectSerializer(serializers.ModelSerializer):
    image = serializers.ImageField(use_url=True)
    tag_list = serializers.ReadOnlyField()
    
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
    tag_list = serializers.ReadOnlyField()
    
    class Meta:
        model = News
        fields = '__all__'

class PartnerSerializer(serializers.ModelSerializer):
    logo = serializers.ImageField(use_url=True)
    
    class Meta:
        model = Partner
        fields = '__all__'

class ProgrammeSerializer(serializers.ModelSerializer):
    image = serializers.ImageField(use_url=True)
    
    class Meta:
        model = Programme
        fields = '__all__'

class ResearchAreaSerializer(serializers.ModelSerializer):
    image = serializers.ImageField(use_url=True)
    key_faculty = TeamSerializer(many=True, read_only=True)
    
    class Meta:
        model = ResearchArea
        fields = '__all__'

class FacilitySerializer(serializers.ModelSerializer):
    image = serializers.ImageField(use_url=True)
    
    class Meta:
        model = Facility
        fields = '__all__'

class OutreachInitiativeSerializer(serializers.ModelSerializer):
    image = serializers.ImageField(use_url=True)
    
    class Meta:
        model = OutreachInitiative
        fields = '__all__'

class DepartmentInfoSerializer(serializers.ModelSerializer):
    head_photo = serializers.ImageField(use_url=True)
    logo = serializers.ImageField(use_url=True)
    values_list = serializers.ReadOnlyField()
    
    class Meta:
        model = DepartmentInfo
        fields = '__all__'

class ContactInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactInfo
        fields = '__all__'

class SocialMediaSerializer(serializers.ModelSerializer):
    class Meta:
        model = SocialMedia
        fields = '__all__'

class DepartmentMilestoneSerializer(serializers.ModelSerializer):
    class Meta:
        model = DepartmentMilestone
        fields = '__all__'

class DepartmentAchievementSerializer(serializers.ModelSerializer):
    class Meta:
        model = DepartmentAchievement
        fields = '__all__'

class NewsletterSubscriptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = NewsletterSubscription
        fields = '__all__'