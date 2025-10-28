from django.urls import path
from . import admin_views

app_name = 'admin_api'

urlpatterns = [
    # Authentication
    path('login/', admin_views.AdminLoginView.as_view(), name='admin-login'),
    path('change-password/', admin_views.ChangePasswordView.as_view(), name='change-password'),
    
    # Admin Users
    path('users/', admin_views.AdminUserListView.as_view(), name='admin-users'),
    path('users/<int:pk>/', admin_views.AdminUserDetailView.as_view(), name='admin-user-detail'),
    
    # Dashboard
    path('dashboard/stats/', admin_views.admin_dashboard_stats, name='admin-dashboard-stats'),

    
    # Content Management - News
    path('content/news/', admin_views.AdminNewsListView.as_view(), name='admin-news-list'),
    path('content/news/<int:pk>/', admin_views.AdminNewsDetailView.as_view(), name='admin-news-detail'),
    
    # Content Management - Banners
    path('content/banners/', admin_views.AdminBannerListView.as_view(), name='admin-banner-list'),
    path('content/banners/<int:pk>/', admin_views.AdminBannerDetailView.as_view(), name='admin-banner-detail'),
    
    # Content Management - Team
    path('content/team/', admin_views.AdminTeamListView.as_view(), name='admin-team-list'),
    path('content/team/<int:pk>/', admin_views.AdminTeamDetailView.as_view(), name='admin-team-detail'),
    
    # Content Management - Projects
    path('content/projects/', admin_views.AdminProjectListView.as_view(), name='admin-project-list'),
    path('content/projects/<int:pk>/', admin_views.AdminProjectDetailView.as_view(), name='admin-project-detail'),
    
    # Content Management - Programmes
    path('content/programmes/', admin_views.AdminProgrammeListView.as_view(), name='admin-programme-list'),
    path('content/programmes/<int:pk>/', admin_views.AdminProgrammeDetailView.as_view(), name='admin-programme-detail'),
    
    # Content Management - Research Areas
    path('content/research-areas/', admin_views.AdminResearchAreaListView.as_view(), name='admin-research-area-list'),
    path('content/research-areas/<int:pk>/', admin_views.AdminResearchAreaDetailView.as_view(), name='admin-research-area-detail'),
    
    # Content Management - Department Info
    path('content/department-info/', admin_views.AdminDepartmentInfoListView.as_view(), name='admin-department-info-list'),
    path('content/department-info/<int:pk>/', admin_views.AdminDepartmentInfoDetailView.as_view(), name='admin-department-info-detail'),
    
    # Content Management - Contact Info
    path('content/contact-info/', admin_views.AdminContactInfoListView.as_view(), name='admin-contact-info-list'),
    path('content/contact-info/<int:pk>/', admin_views.AdminContactInfoDetailView.as_view(), name='admin-contact-info-detail'),
    
    # Content Management - Social Media
    path('content/social-media/', admin_views.AdminSocialMediaListView.as_view(), name='admin-social-media-list'),
    path('content/social-media/<int:pk>/', admin_views.AdminSocialMediaDetailView.as_view(), name='admin-social-media-detail'),
    
    # Content Management - Department Milestones
    path('content/milestones/', admin_views.AdminDepartmentMilestoneListView.as_view(), name='admin-milestone-list'),
    path('content/milestones/<int:pk>/', admin_views.AdminDepartmentMilestoneDetailView.as_view(), name='admin-milestone-detail'),
    
    # Content Management - Department Achievements
    path('content/achievements/', admin_views.AdminDepartmentAchievementListView.as_view(), name='admin-achievement-list'),
    path('content/achievements/<int:pk>/', admin_views.AdminDepartmentAchievementDetailView.as_view(), name='admin-achievement-detail'),
    
    # Content Management - Newsletter Subscriptions
    path('content/newsletter/', admin_views.AdminNewsletterSubscriptionListView.as_view(), name='admin-newsletter-list'),
    path('content/newsletter/<int:pk>/', admin_views.AdminNewsletterSubscriptionDetailView.as_view(), name='admin-newsletter-detail'),
    
    # Content Management - Events
    path('content/events/', admin_views.AdminEventListView.as_view(), name='admin-event-list'),
    path('content/events/<int:pk>/', admin_views.AdminEventDetailView.as_view(), name='admin-event-detail'),
    
    # Content Management - Facilities
    path('content/facilities/', admin_views.AdminFacilityListView.as_view(), name='admin-facility-list'),
    path('content/facilities/<int:pk>/', admin_views.AdminFacilityDetailView.as_view(), name='admin-facility-detail'),
    
    # Content Management - Outreach Initiatives
    path('content/outreach/', admin_views.AdminOutreachInitiativeListView.as_view(), name='admin-outreach-list'),
    path('content/outreach/<int:pk>/', admin_views.AdminOutreachInitiativeDetailView.as_view(), name='admin-outreach-detail'),
    
    # Content Management - Partners
    path('content/partners/', admin_views.AdminPartnerListView.as_view(), name='admin-partner-list'),
    path('content/partners/<int:pk>/', admin_views.AdminPartnerDetailView.as_view(), name='admin-partner-detail'),
    
    # Site Settings (Singleton)
    path('site-settings/', admin_views.AdminSiteSettingsView.as_view(), name='admin-site-settings'),
]

