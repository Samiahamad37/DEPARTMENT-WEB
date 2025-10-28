from django.contrib import admin
from .models import (    Banner, Event, Team, Project, ContactMessage, 
    News, Partner, Programme, ResearchArea, Facility, OutreachInitiative, SiteSettings,
    DepartmentMilestone, DepartmentAchievement
)

@admin.register(Banner)
class BannerAdmin(admin.ModelAdmin):
    list_display = ['title', 'is_active', 'display_order', 'created_at']
    list_filter = ['is_active', 'created_at']
    search_fields = ['title', 'subtitle']
    ordering = ['display_order', '-created_at']
    
    fieldsets = (
        ('Basic Information', {
            'fields': ('title', 'subtitle', 'description', 'background_image', 'cta_text', 'cta_link')
        }),
        ('Display Settings', {
            'fields': ('is_active', 'display_order', 'overlay_opacity')
        }),
        ('Highlights Configuration', {
            'fields': ('show_highlights',),
            'description': 'Configure the three highlight items displayed on the banner'
        }),
        ('Highlight 1', {
            'fields': ('highlight_1_text', 'highlight_1_icon'),
            'classes': ('collapse',)
        }),
        ('Highlight 2', {
            'fields': ('highlight_2_text', 'highlight_2_icon'),
            'classes': ('collapse',)
        }),
        ('Highlight 3', {
            'fields': ('highlight_3_text', 'highlight_3_icon'),
            'classes': ('collapse',)
        }),
    )

@admin.register(Event)
class EventAdmin(admin.ModelAdmin):
    list_display = ['title', 'status', 'date', 'location', 'is_featured']
    list_filter = ['status', 'date', 'is_featured']
    search_fields = ['title', 'description', 'location']
    date_hierarchy = 'date'

@admin.register(Team)
class TeamAdmin(admin.ModelAdmin):
    list_display = ['name', 'role', 'specialization', 'is_active', 'display_order']
    list_filter = ['role', 'is_active']
    search_fields = ['name', 'specialization']
    ordering = ['display_order', 'name']
    
    fieldsets = (
        ('Basic Information', {
            'fields': ('name', 'role', 'title', 'specialization', 'bio', 'photo')
        }),
        ('Contact Information', {
            'fields': ('email', 'phone', 'office_location')
        }),
        ('Status & Display', {
            'fields': ('is_active', 'is_on_study_leave', 'display_order')
        }),
        ('Background Information', {
            'fields': ('education', 'research_areas', 'awards'),
            'classes': ('collapse',)
        }),
        ('Publications', {
            'fields': ('publications',),
            'description': 'Enter publications with HTML formatting. Use <br> for line breaks and <a href="url">text</a> for links.'
        }),
    )

@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ['name', 'category', 'is_featured', 'is_active', 'created_at']
    list_filter = ['category', 'is_featured', 'is_active', 'created_at']
    search_fields = ['name', 'description', 'contributors']
    ordering = ['display_order', '-created_at']
\

@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    list_display = ['name', 'email', 'subject', 'is_read', 'date_sent']
    list_filter = ['is_read', 'date_sent']
    search_fields = ['name', 'email', 'subject']
    readonly_fields = ['date_sent']
    date_hierarchy = 'date_sent'

@admin.register(News)
class NewsAdmin(admin.ModelAdmin):
    list_display = ['title', 'category', 'author', 'is_featured', 'is_active', 'date_posted']
    list_filter = ['category', 'is_featured', 'is_active', 'date_posted']
    search_fields = ['title', 'description', 'author']
    date_hierarchy = 'date_posted'

@admin.register(Partner)
class PartnerAdmin(admin.ModelAdmin):
    list_display = ['name', 'partnership_type', 'is_active', 'display_order']
    list_filter = ['is_active', 'partnership_type']
    search_fields = ['name', 'description']
    ordering = ['display_order', 'name']

@admin.register(Programme)
class ProgrammeAdmin(admin.ModelAdmin):
    list_display = ['title', 'degree_type', 'duration', 'is_active', 'display_order']
    list_filter = ['degree_type', 'is_active']
    search_fields = ['title', 'description']
    ordering = ['display_order', 'title']

@admin.register(ResearchArea)
class ResearchAreaAdmin(admin.ModelAdmin):
    list_display = ['name', 'is_active', 'display_order']
    list_filter = ['is_active']
    search_fields = ['name', 'description']
    ordering = ['display_order', 'name']

@admin.register(Facility)
class FacilityAdmin(admin.ModelAdmin):
    list_display = ['name', 'location', 'capacity', 'is_active', 'display_order']
    list_filter = ['is_active', 'location']
    search_fields = ['name', 'description', 'location']
    ordering = ['display_order', 'name']

@admin.register(OutreachInitiative)
class OutreachInitiativeAdmin(admin.ModelAdmin):
    list_display = ['title', 'target_audience', 'start_date', 'is_active', 'display_order']
    list_filter = ['is_active', 'start_date']
    search_fields = ['title', 'description', 'target_audience']
    date_hierarchy = 'start_date'
    ordering = ['display_order', '-start_date']

@admin.register(DepartmentMilestone)
class DepartmentMilestoneAdmin(admin.ModelAdmin):
    list_display = ['year', 'title', 'is_active', 'display_order']
    list_filter = ['is_active']
    search_fields = ['year', 'title', 'description']
    ordering = ['display_order', 'year']
    
    fieldsets = (
        ('Milestone Information', {
            'fields': ('year', 'title', 'description')
        }),
        ('Display Settings', {
            'fields': ('is_active', 'display_order')
        }),
    )

@admin.register(DepartmentAchievement)
class DepartmentAchievementAdmin(admin.ModelAdmin):
    list_display = ['label', 'number', 'icon_name', 'is_active', 'display_order']
    list_filter = ['is_active']
    search_fields = ['label', 'description']
    ordering = ['display_order']

@admin.register(SiteSettings)
class SiteSettingsAdmin(admin.ModelAdmin):
    def has_add_permission(self, request):
        # Only allow one instance
        return not SiteSettings.objects.exists()
    
    def has_delete_permission(self, request, obj=None):
        # Prevent deletion to maintain at least one instance
        return False
    
    list_display = ['department_name', 'contact_email', 'contact_phone']
    
    fieldsets = (
        ('Department Information', {
            'fields': ('department_name', 'university_name')
        }),
        ('Contact Information', {
            'fields': ('physical_address', 'contact_email', 'contact_phone', 'contact_fax')
        }),
        ('Message from Head of Department', {
            'fields': ('hod_name', 'hod_title', 'hod_message_title', 'hod_message_content', 'hod_photo')
        }),
        ('Footer Settings', {
            'fields': ('footer_caption', 'footer_bottom_text')
        }),
        ('SEO Settings', {
            'fields': ('site_description', 'site_keywords')
        }),
    )