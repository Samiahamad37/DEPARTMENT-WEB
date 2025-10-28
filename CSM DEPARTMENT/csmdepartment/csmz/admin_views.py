from rest_framework import generics, status, permissions
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from django.utils import timezone
from .models import (
    News, Banner, Team, Project, Programme, ResearchArea, 
    DepartmentInfo, ContactInfo, SocialMedia, DepartmentMilestone, 
    DepartmentAchievement, NewsletterSubscription, AdminUser,
    Event, Facility, OutreachInitiative, Partner, SiteSettings
)
from .admin_serializers import (
    AdminUserSerializer, CreateAdminUserSerializer, AdminLoginSerializer,
    ChangePasswordSerializer, AdminNewsSerializer, AdminBannerSerializer,
    AdminTeamSerializer, AdminProjectSerializer, AdminProgrammeSerializer,
    AdminResearchAreaSerializer, AdminDepartmentInfoSerializer,
    AdminContactInfoSerializer, AdminSocialMediaSerializer,
    AdminDepartmentMilestoneSerializer, AdminDepartmentAchievementSerializer,
    AdminNewsletterSubscriptionSerializer,
    AdminEventSerializer, AdminFacilitySerializer, AdminOutreachInitiativeSerializer,
    AdminPartnerSerializer, AdminSiteSettingsSerializer
)

class IsAdminUser(permissions.BasePermission):
    """Custom permission to only allow admin users"""
    def has_permission(self, request, view):
        return (
            request.user and 
            request.user.is_authenticated and 
            request.user.is_staff and
            hasattr(request.user, 'admin_profile') and
            request.user.admin_profile.is_active
        )

class AdminLoginView(generics.GenericAPIView):
    """Admin login endpoint"""
    serializer_class = AdminLoginSerializer
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            user = serializer.validated_data['user']
            token, created = Token.objects.get_or_create(user=user)
            
            # Check if user must change password
            admin_profile = user.admin_profile
            must_change_password = admin_profile.must_change_password
            
            return Response({
                'token': token.key,
                'user': {
                    'id': user.id,
                    'username': user.username,
                    'email': user.email,
                    'first_name': user.first_name,
                    'last_name': user.last_name,
                    'must_change_password': must_change_password
                }
            })
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ChangePasswordView(generics.GenericAPIView):
    """Change password endpoint"""
    serializer_class = ChangePasswordSerializer
    permission_classes = [IsAdminUser]

    def post(self, request):
        serializer = self.get_serializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            user = request.user
            user.set_password(serializer.validated_data['new_password'])
            user.save()
            
            # Update admin profile
            admin_profile = user.admin_profile
            admin_profile.must_change_password = False
            admin_profile.last_password_change = timezone.now()
            admin_profile.save()
            
            return Response({'message': 'Password changed successfully'})
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class AdminUserListView(generics.ListCreateAPIView):
    """List and create admin users"""
    serializer_class = AdminUserSerializer
    permission_classes = [IsAdminUser]

    def get_queryset(self):
        return AdminUser.objects.filter(is_active=True).select_related('user')

    def get_serializer_class(self):
        if self.request.method == 'POST':
            return CreateAdminUserSerializer
        return AdminUserSerializer

class AdminUserDetailView(generics.RetrieveUpdateDestroyAPIView):
    """Retrieve, update, or delete admin user"""
    serializer_class = AdminUserSerializer
    permission_classes = [IsAdminUser]

    def get_queryset(self):
        return AdminUser.objects.filter(is_active=True).select_related('user')

# Content Management Views
class AdminNewsListView(generics.ListCreateAPIView):
    """List and create news articles"""
    queryset = News.objects.all()
    serializer_class = AdminNewsSerializer
    permission_classes = [IsAdminUser]

class AdminNewsDetailView(generics.RetrieveUpdateDestroyAPIView):
    """Retrieve, update, or delete news article"""
    queryset = News.objects.all()
    serializer_class = AdminNewsSerializer
    permission_classes = [IsAdminUser]

class AdminBannerListView(generics.ListCreateAPIView):
    """List and create banners"""
    queryset = Banner.objects.all()
    serializer_class = AdminBannerSerializer
    permission_classes = [IsAdminUser]

class AdminBannerDetailView(generics.RetrieveUpdateDestroyAPIView):
    """Retrieve, update, or delete banner"""
    queryset = Banner.objects.all()
    serializer_class = AdminBannerSerializer
    permission_classes = [IsAdminUser]

class AdminTeamListView(generics.ListCreateAPIView):
    """List and create team members"""
    queryset = Team.objects.all()
    serializer_class = AdminTeamSerializer
    permission_classes = [IsAdminUser]

class AdminTeamDetailView(generics.RetrieveUpdateDestroyAPIView):
    """Retrieve, update, or delete team member"""
    queryset = Team.objects.all()
    serializer_class = AdminTeamSerializer
    permission_classes = [IsAdminUser]

class AdminProjectListView(generics.ListCreateAPIView):
    """List and create projects"""
    queryset = Project.objects.all()
    serializer_class = AdminProjectSerializer
    permission_classes = [IsAdminUser]

class AdminProjectDetailView(generics.RetrieveUpdateDestroyAPIView):
    """Retrieve, update, or delete project"""
    queryset = Project.objects.all()
    serializer_class = AdminProjectSerializer
    permission_classes = [IsAdminUser]

class AdminProgrammeListView(generics.ListCreateAPIView):
    """List and create programmes"""
    queryset = Programme.objects.all()
    serializer_class = AdminProgrammeSerializer
    permission_classes = [IsAdminUser]

class AdminProgrammeDetailView(generics.RetrieveUpdateDestroyAPIView):
    """Retrieve, update, or delete programme"""
    queryset = Programme.objects.all()
    serializer_class = AdminProgrammeSerializer
    permission_classes = [IsAdminUser]

class AdminResearchAreaListView(generics.ListCreateAPIView):
    """List and create research areas"""
    queryset = ResearchArea.objects.all()
    serializer_class = AdminResearchAreaSerializer
    permission_classes = [IsAdminUser]

class AdminResearchAreaDetailView(generics.RetrieveUpdateDestroyAPIView):
    """Retrieve, update, or delete research area"""
    queryset = ResearchArea.objects.all()
    serializer_class = AdminResearchAreaSerializer
    permission_classes = [IsAdminUser]

class AdminDepartmentInfoListView(generics.ListCreateAPIView):
    """List and create department info"""
    queryset = DepartmentInfo.objects.all()
    serializer_class = AdminDepartmentInfoSerializer
    permission_classes = [IsAdminUser]

class AdminDepartmentInfoDetailView(generics.RetrieveUpdateDestroyAPIView):
    """Retrieve, update, or delete department info"""
    queryset = DepartmentInfo.objects.all()
    serializer_class = AdminDepartmentInfoSerializer
    permission_classes = [IsAdminUser]

class AdminContactInfoListView(generics.ListCreateAPIView):
    """List and create contact info"""
    queryset = ContactInfo.objects.all()
    serializer_class = AdminContactInfoSerializer
    permission_classes = [IsAdminUser]

class AdminContactInfoDetailView(generics.RetrieveUpdateDestroyAPIView):
    """Retrieve, update, or delete contact info"""
    queryset = ContactInfo.objects.all()
    serializer_class = AdminContactInfoSerializer
    permission_classes = [IsAdminUser]

class AdminSocialMediaListView(generics.ListCreateAPIView):
    """List and create social media links"""
    queryset = SocialMedia.objects.all()
    serializer_class = AdminSocialMediaSerializer
    permission_classes = [IsAdminUser]

class AdminSocialMediaDetailView(generics.RetrieveUpdateDestroyAPIView):
    """Retrieve, update, or delete social media link"""
    queryset = SocialMedia.objects.all()
    serializer_class = AdminSocialMediaSerializer
    permission_classes = [IsAdminUser]

class AdminDepartmentMilestoneListView(generics.ListCreateAPIView):
    """List and create department milestones"""
    queryset = DepartmentMilestone.objects.all()
    serializer_class = AdminDepartmentMilestoneSerializer
    permission_classes = [IsAdminUser]

class AdminDepartmentMilestoneDetailView(generics.RetrieveUpdateDestroyAPIView):
    """Retrieve, update, or delete department milestone"""
    queryset = DepartmentMilestone.objects.all()
    serializer_class = AdminDepartmentMilestoneSerializer
    permission_classes = [IsAdminUser]

class AdminDepartmentAchievementListView(generics.ListCreateAPIView):
    """List and create department achievements"""
    queryset = DepartmentAchievement.objects.all()
    serializer_class = AdminDepartmentAchievementSerializer
    permission_classes = [IsAdminUser]

class AdminDepartmentAchievementDetailView(generics.RetrieveUpdateDestroyAPIView):
    """Retrieve, update, or delete department achievement"""
    queryset = DepartmentAchievement.objects.all()
    serializer_class = AdminDepartmentAchievementSerializer
    permission_classes = [IsAdminUser]

class AdminNewsletterSubscriptionListView(generics.ListCreateAPIView):
    """List and create newsletter subscriptions"""
    queryset = NewsletterSubscription.objects.all()
    serializer_class = AdminNewsletterSubscriptionSerializer
    permission_classes = [IsAdminUser]

class AdminNewsletterSubscriptionDetailView(generics.RetrieveUpdateDestroyAPIView):
    """Retrieve, update, or delete newsletter subscription"""
    queryset = NewsletterSubscription.objects.all()
    serializer_class = AdminNewsletterSubscriptionSerializer
    permission_classes = [IsAdminUser]

@api_view(['GET'])
@permission_classes([IsAdminUser])
def admin_dashboard_stats(request):
    """Get dashboard statistics"""
    stats = {
        'news_count': News.objects.count(),
        'banners_count': Banner.objects.count(),
        'team_count': Team.objects.count(),
        'projects_count': Project.objects.count(),
        'programmes_count': Programme.objects.count(),
        'research_areas_count': ResearchArea.objects.count(),
        'newsletter_subscriptions_count': NewsletterSubscription.objects.count(),
        'events_count': Event.objects.count(),
        'facilities_count': Facility.objects.count(),
        'outreach_count': OutreachInitiative.objects.count(),
        'partners_count': Partner.objects.count(),
    }
    return Response(stats)

# Admin Event Views
class AdminEventListView(generics.ListCreateAPIView):
    queryset = Event.objects.all()
    serializer_class = AdminEventSerializer
    permission_classes = [IsAdminUser]

class AdminEventDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Event.objects.all()
    serializer_class = AdminEventSerializer
    permission_classes = [IsAdminUser]

# Admin Facility Views
class AdminFacilityListView(generics.ListCreateAPIView):
    queryset = Facility.objects.all()
    serializer_class = AdminFacilitySerializer
    permission_classes = [IsAdminUser]

class AdminFacilityDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Facility.objects.all()
    serializer_class = AdminFacilitySerializer
    permission_classes = [IsAdminUser]

# Admin Outreach Initiative Views
class AdminOutreachInitiativeListView(generics.ListCreateAPIView):
    queryset = OutreachInitiative.objects.all()
    serializer_class = AdminOutreachInitiativeSerializer
    permission_classes = [IsAdminUser]

class AdminOutreachInitiativeDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = OutreachInitiative.objects.all()
    serializer_class = AdminOutreachInitiativeSerializer
    permission_classes = [IsAdminUser]

# Admin Partner Views
class AdminPartnerListView(generics.ListCreateAPIView):
    queryset = Partner.objects.all()
    serializer_class = AdminPartnerSerializer
    permission_classes = [IsAdminUser]

class AdminPartnerDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Partner.objects.all()
    serializer_class = AdminPartnerSerializer
    permission_classes = [IsAdminUser]

# Admin Site Settings View (Singleton)
class AdminSiteSettingsView(generics.RetrieveUpdateAPIView):
    serializer_class = AdminSiteSettingsSerializer
    permission_classes = [IsAdminUser]
    
    def get_object(self):
        return SiteSettings.load()



