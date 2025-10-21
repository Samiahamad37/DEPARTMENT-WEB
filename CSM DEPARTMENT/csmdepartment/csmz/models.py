from django.db import models
from datetime import timedelta
from django.utils import timezone

# Create your models here.

class Banner(models.Model):
    """Model for managing hero banner slides"""
    title = models.CharField(max_length=200)
    subtitle = models.CharField(max_length=300, blank=True)
    description = models.TextField(blank=True)
    background_image = models.ImageField(upload_to='banners/')
    cta_text = models.CharField(max_length=100, blank=True)
    cta_link = models.URLField(blank=True)
    is_active = models.BooleanField(default=True)
    display_order = models.PositiveIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['display_order', '-created_at']

    def __str__(self):
        return self.title

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
    location = models.CharField(max_length=200, blank=True)
    is_featured = models.BooleanField(default=False)

    class Meta:
        ordering = ['-date']

    def __str__(self):
        return f"{self.title} ({self.get_status_display()})"

class Team(models.Model):
    ROLE_CHOICES = [
        ('head', 'Head of Department'),
        ('lecturer', 'Lecturer'),
        ('assistant_lecturer', 'Assistant Lecturer'),
        ('admin', 'Administrative Staff'),
        ('technical', 'Technical Staff'),
    ]

    name = models.CharField(max_length=100)
    role = models.CharField(max_length=50, choices=ROLE_CHOICES)
    specialization = models.CharField(max_length=200, blank=True)
    bio = models.TextField(blank=True)
    photo = models.ImageField(upload_to='team_photos/', blank=True)
    email = models.EmailField(blank=True)
    phone = models.CharField(max_length=20, blank=True)
    office_location = models.CharField(max_length=100, blank=True)
    is_active = models.BooleanField(default=True)
    display_order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['display_order', 'name']

    def __str__(self):
        return f"{self.name} - {self.get_role_display()}"

class Project(models.Model):
    CATEGORY_CHOICES = [
        ('ai', 'Artificial Intelligence'),
        ('iot', 'Internet of Things'),
        ('embedded', 'Embedded Systems'),
        ('web', 'Web Development'),
        ('mobile', 'Mobile Development'),
        ('data_science', 'Data Science'),
        ('cybersecurity', 'Cybersecurity'),
        ('networking', 'Networking'),
        ('other', 'Other'),
    ]

    name = models.CharField(max_length=200)
    description = models.TextField()
    detailed_description = models.TextField(blank=True)
    image = models.ImageField(upload_to='projects/', blank=True, null=True)
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES, default='other')
    tags = models.CharField(max_length=200, blank=True, help_text="Comma-separated tags")
    contributors = models.TextField(blank=True, help_text="List of contributors")
    objectives = models.TextField(blank=True)
    outcomes = models.TextField(blank=True)
    technologies_used = models.CharField(max_length=300, blank=True)
    project_link = models.URLField(blank=True)
    github_link = models.URLField(blank=True)
    is_featured = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(null=True, blank=True)
    display_order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['display_order', '-created_at']

    def __str__(self):
        return self.name

    @property
    def tag_list(self):
        return [tag.strip() for tag in self.tags.split(',') if tag.strip()]

class Announcement(models.Model):
    title = models.CharField(max_length=200)
    content = models.TextField()
    date_posted = models.DateTimeField(auto_now_add=True)
    is_featured = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ['-date_posted']

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
    is_read = models.BooleanField(default=False)

    class Meta:
        ordering = ['-date_sent']

    def __str__(self):
        return f"{self.name} - {self.subject}"

class News(models.Model):
    CATEGORY_CHOICES = [
        ('announcement', 'Announcement'),
        ('event', 'Event'),
        ('research', 'Research Update'),
        ('student_achievement', 'Student Achievement'),
        ('faculty_news', 'Faculty News'),
        ('department_news', 'Department News'),
        ('general', 'General'),
    ]

    title = models.CharField(max_length=200)
    description = models.TextField()
    content = models.TextField(blank=True, help_text="Full article content")
    image = models.ImageField(upload_to='news_images/')
    category = models.CharField(max_length=30, choices=CATEGORY_CHOICES, default='general')
    author = models.CharField(max_length=100, blank=True)
    date_posted = models.DateTimeField(auto_now_add=True)
    is_featured = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    tags = models.CharField(max_length=200, blank=True, help_text="Comma-separated tags")

    class Meta:
        ordering = ['-date_posted']
        verbose_name_plural = "News"

    def __str__(self):
        return self.title

    @property
    def is_recent(self):
        return self.date_posted >= timezone.now() - timedelta(days=7)

    @property
    def status(self):
        return "Latest" if self.is_recent else "Archived"

    @property
    def tag_list(self):
        return [tag.strip() for tag in self.tags.split(',') if tag.strip()]

class Partner(models.Model):
    """Model for managing partner institutions and organizations"""
    name = models.CharField(max_length=200)
    logo = models.ImageField(upload_to='partners/')
    description = models.TextField(blank=True)
    website_url = models.URLField(blank=True)
    partnership_type = models.CharField(max_length=100, blank=True)
    is_active = models.BooleanField(default=True)
    display_order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['display_order', 'name']

    def __str__(self):
        return self.name

class Programme(models.Model):
    """Model for managing academic programmes"""
    DEGREE_CHOICES = [
        ('certificate', 'Certificate'),
        ('diploma', 'Diploma'),
        ('bachelor', 'Bachelor Degree'),
        ('master', 'Master Degree'),
        ('phd', 'PhD'),
    ]

    title = models.CharField(max_length=200)
    degree_type = models.CharField(max_length=20, choices=DEGREE_CHOICES)
    description = models.TextField()
    detailed_description = models.TextField(blank=True)
    duration = models.CharField(max_length=50, blank=True)
    requirements = models.TextField(blank=True)
    career_prospects = models.TextField(blank=True)
    image = models.ImageField(upload_to='programmes/', blank=True)
    is_active = models.BooleanField(default=True)
    display_order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['display_order', 'title']

    def __str__(self):
        return f"{self.title} - {self.get_degree_type_display()}"

class ResearchArea(models.Model):
    """Model for managing research areas and themes"""
    name = models.CharField(max_length=200)
    description = models.TextField()
    image = models.ImageField(upload_to='research_areas/', blank=True)
    key_faculty = models.ManyToManyField(Team, blank=True, related_name='research_areas')
    is_active = models.BooleanField(default=True)
    display_order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['display_order', 'name']

    def __str__(self):
        return self.name

class Facility(models.Model):
    """Model for managing department facilities and labs"""
    name = models.CharField(max_length=200)
    description = models.TextField()
    image = models.ImageField(upload_to='facilities/')
    equipment_list = models.TextField(blank=True)
    capacity = models.CharField(max_length=50, blank=True)
    location = models.CharField(max_length=100, blank=True)
    is_active = models.BooleanField(default=True)
    display_order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['display_order', 'name']
        verbose_name_plural = "Facilities"

    def __str__(self):
        return self.name

class OutreachInitiative(models.Model):
    """Model for managing outreach and impact initiatives"""
    title = models.CharField(max_length=200)
    description = models.TextField()
    image = models.ImageField(upload_to='outreach/')
    impact_description = models.TextField(blank=True)
    target_audience = models.CharField(max_length=200, blank=True)
    start_date = models.DateField(blank=True, null=True)
    end_date = models.DateField(blank=True, null=True)
    is_active = models.BooleanField(default=True)
    display_order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['display_order', '-start_date']

    def __str__(self):
        return self.title