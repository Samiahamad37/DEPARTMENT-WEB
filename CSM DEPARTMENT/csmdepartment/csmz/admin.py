from django.contrib import admin
from .models import (
    Banner, Event, Team, Project, Announcement, ContactMessage, 
    News, Partner, Programme, ResearchArea, Facility, OutreachInitiative
)

@admin.register(Banner)
class BannerAdmin(admin.ModelAdmin):
    list_display = ['title', 'is_active', 'display_order', 'created_at']
    list_filter = ['is_active', 'created_at']
    search_fields = ['title', 'subtitle']
    ordering = ['display_order', '-created_at']

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

@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ['name', 'category', 'is_featured', 'is_active', 'created_at']
    list_filter = ['category', 'is_featured', 'is_active', 'created_at']
    search_fields = ['name', 'description', 'contributors']
    ordering = ['display_order', '-created_at']

@admin.register(Announcement)
class AnnouncementAdmin(admin.ModelAdmin):
    list_display = ['title', 'is_featured', 'is_active', 'date_posted']
    list_filter = ['is_featured', 'is_active', 'date_posted']
    search_fields = ['title', 'content']
    date_hierarchy = 'date_posted'

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