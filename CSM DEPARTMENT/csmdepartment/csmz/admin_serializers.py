from rest_framework import serializers
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from django.contrib.auth.hashers import make_password
from .models import (
    News, Banner, Team, Project, Programme, ResearchArea, 
    DepartmentInfo, ContactInfo, SocialMedia, DepartmentMilestone, 
    DepartmentAchievement, NewsletterSubscription, AdminUser,
    Event, Facility, OutreachInitiative, Partner, SiteSettings
)

class AdminUserSerializer(serializers.ModelSerializer):
    """Serializer for admin user management"""
    username = serializers.CharField(source='user.username', read_only=True)
    email = serializers.EmailField(source='user.email', read_only=True)
    first_name = serializers.CharField(source='user.first_name', read_only=True)
    last_name = serializers.CharField(source='user.last_name', read_only=True)
    is_staff = serializers.BooleanField(source='user.is_staff', read_only=True)
    date_joined = serializers.DateTimeField(source='user.date_joined', read_only=True)

    class Meta:
        model = AdminUser
        fields = [
            'id', 'username', 'email', 'first_name', 'last_name', 
            'is_staff', 'must_change_password', 'last_password_change', 
            'created_at', 'is_active', 'date_joined'
        ]

class CreateAdminUserSerializer(serializers.Serializer):
    """Serializer for creating new admin users"""
    username = serializers.CharField(max_length=150)
    email = serializers.EmailField()
    first_name = serializers.CharField(max_length=30, required=False)
    last_name = serializers.CharField(max_length=150, required=False)
    password = serializers.CharField(write_only=True, default='admin123')

    def create(self, validated_data):
        # Create Django User
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password'],
            first_name=validated_data.get('first_name', ''),
            last_name=validated_data.get('last_name', ''),
            is_staff=True,
            is_active=True
        )
        
        # Create AdminUser profile
        admin_user = AdminUser.objects.create(
            user=user,
            must_change_password=True,
            created_by=self.context['request'].user if self.context.get('request') else None
        )
        
        return admin_user

class AdminLoginSerializer(serializers.Serializer):
    """Serializer for admin login"""
    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self, attrs):
        username = attrs.get('username')
        password = attrs.get('password')

        if username and password:
            user = authenticate(username=username, password=password)
            if user:
                if not user.is_active:
                    raise serializers.ValidationError('User account is disabled.')
                if not user.is_staff:
                    raise serializers.ValidationError('User is not authorized for admin access.')
                
                # Check if user has admin profile
                try:
                    admin_profile = user.admin_profile
                    if not admin_profile.is_active:
                        raise serializers.ValidationError('Admin profile is not active.')
                except AdminUser.DoesNotExist:
                    raise serializers.ValidationError('User does not have admin privileges.')
                
                attrs['user'] = user
                return attrs
            else:
                raise serializers.ValidationError('Unable to log in with provided credentials.')
        else:
            raise serializers.ValidationError('Must include "username" and "password".')

class ChangePasswordSerializer(serializers.Serializer):
    """Serializer for changing password"""
    current_password = serializers.CharField()
    new_password = serializers.CharField(min_length=8)
    confirm_password = serializers.CharField()

    def validate(self, attrs):
        if attrs['new_password'] != attrs['confirm_password']:
            raise serializers.ValidationError("New passwords don't match.")
        return attrs

    def validate_current_password(self, value):
        user = self.context['request'].user
        if not user.check_password(value):
            raise serializers.ValidationError('Current password is incorrect.')
        return value

# Content Management Serializers
class AdminNewsSerializer(serializers.ModelSerializer):
    class Meta:
        model = News
        fields = '__all__'

class AdminBannerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Banner
        fields = '__all__'

class AdminTeamSerializer(serializers.ModelSerializer):
    class Meta:
        model = Team
        fields = '__all__'

class AdminProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = '__all__'

class AdminProgrammeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Programme
        fields = '__all__'

class AdminResearchAreaSerializer(serializers.ModelSerializer):
    class Meta:
        model = ResearchArea
        fields = '__all__'

class AdminDepartmentInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = DepartmentInfo
        fields = '__all__'

class AdminContactInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactInfo
        fields = '__all__'

class AdminSocialMediaSerializer(serializers.ModelSerializer):
    class Meta:
        model = SocialMedia
        fields = '__all__'

class AdminDepartmentMilestoneSerializer(serializers.ModelSerializer):
    class Meta:
        model = DepartmentMilestone
        fields = '__all__'

class AdminDepartmentAchievementSerializer(serializers.ModelSerializer):
    class Meta:
        model = DepartmentAchievement
        fields = '__all__'

class AdminNewsletterSubscriptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = NewsletterSubscription
        fields = '__all__'

class AdminEventSerializer(serializers.ModelSerializer):
    image = serializers.ImageField(use_url=True, required=False)
    
    class Meta:
        model = Event
        fields = '__all__'

class AdminFacilitySerializer(serializers.ModelSerializer):
    image = serializers.ImageField(use_url=True, required=False)
    
    class Meta:
        model = Facility
        fields = '__all__'

class AdminOutreachInitiativeSerializer(serializers.ModelSerializer):
    image = serializers.ImageField(use_url=True, required=False)
    
    class Meta:
        model = OutreachInitiative
        fields = '__all__'

class AdminPartnerSerializer(serializers.ModelSerializer):
    logo = serializers.ImageField(use_url=True, required=False)
    
    class Meta:
        model = Partner
        fields = '__all__'

class AdminSiteSettingsSerializer(serializers.ModelSerializer):
    hod_photo = serializers.ImageField(use_url=True, required=False, allow_null=True)
    
    class Meta:
        model = SiteSettings
        fields = '__all__'


