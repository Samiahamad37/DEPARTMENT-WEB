from django.contrib import admin

# Register your models here.
from django.contrib import admin
from .models import Event, Team, Project, Announcement, ContactMessage

admin.site.register(Event)
admin.site.register(Team)
admin.site.register(Project)
admin.site.register(Announcement)
admin.site.register(ContactMessage)