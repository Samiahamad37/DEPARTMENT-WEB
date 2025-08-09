from django.db import models
from datetime import timedelta
from django.utils import timezone

# Create your models here.

class Event(models.Model):
    STATUS_CHOICES = [
        ('upcoming', 'Upcoming'),
        ('ongoing', 'Ongoing'),
        ('completed', 'Completed'),
    
    ]
    

    title = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    image = models.ImageField(upload_to='events/')
    date = models.DateField()
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='upcoming')
    # type = models.CharField(max_length=100, choices=TYPE_CHOICES, default='event')
    location = models.CharField(max_length=200, blank=True)

    def __str__(self):
        return f"{self.title} ({self.get_status_display()})"

class Team(models.Model):
    name = models.CharField(max_length=100)
    role = models.CharField(max_length=100)
    bio = models.TextField(blank=True)

    def __str__(self):
        return self.name


class Project(models.Model):
    name = models.CharField(max_length=100, blank=True)
    picture = models.ImageField(upload_to='project_pictures/')
    description = models.TextField(blank=True)

    def __str__(self):
        return self.name
class Announcement(models.Model):
    title = models.CharField(max_length=200)
    content = models.TextField()
    date_posted = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title

    @property
    def is_recent(self):
        return self.date_posted >= timezone.now() - timedelta(days=7)

    @property
    def is_expired(self):
        return self.date_posted < timezone.now() - timedelta(days=30)

class ContactMessage(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    subject = models.CharField(max_length=200)
    message = models.TextField()
    date_sent = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} - {self.subject}"



class News(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    image = models.ImageField(upload_to='news_images/', default='default_news_image')
    date_posted = models.DateTimeField(auto_now_add=True)
    

    def __str__(self):
        return self.title
    @property
    def is_recent(self):
        return self.date_posted >= timezone.now() - timedelta(days=7)

    @property
    def status(self):
        return "Latest" if self.is_recent else "Archived"