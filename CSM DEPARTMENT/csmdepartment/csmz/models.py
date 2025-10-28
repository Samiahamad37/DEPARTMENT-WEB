from django.db import models
from datetime import timedelta
from django.utils import timezone
from django.core.exceptions import ValidationError
import bleach

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
    
    # New configurable highlight fields
    show_highlights = models.BooleanField(default=False)
    highlight_1_text = models.CharField(max_length=100, blank=True, default="Excellence in Education")
    highlight_1_icon = models.ImageField(upload_to='banner_icons/', blank=True, null=True, help_text="Icon for highlight 1 (PNG or SVG)")
    highlight_2_text = models.CharField(max_length=100, blank=True, default="Industry Partnerships")
    highlight_2_icon = models.ImageField(upload_to='banner_icons/', blank=True, null=True, help_text="Icon for highlight 2 (PNG or SVG)")
    highlight_3_text = models.CharField(max_length=100, blank=True, default="Research Impact")
    highlight_3_icon = models.ImageField(upload_to='banner_icons/', blank=True, null=True, help_text="Icon for highlight 3 (PNG or SVG)")
    overlay_opacity = models.FloatField(default=0.4, help_text="Overlay opacity from 0.0 to 1.0")

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
        ('professor', 'Professor'),
        ('associate_professor', 'Associate Professor'),
        ('senior_lecturer', 'Senior Lecturer'),
        ('lecturer', 'Lecturer'),
        ('assistant_lecturer', 'Assistant Lecturer'),
        ('tutorial_assistant', 'Tutorial Assistant'),
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
    is_on_study_leave = models.BooleanField(default=False)
    display_order = models.PositiveIntegerField(default=0)
    title = models.CharField(max_length=200, blank=True, help_text="Official title or designation")
    education = models.TextField(blank=True, help_text="Educational background (JSON format)")
    research_areas = models.TextField(blank=True, help_text="Research areas (JSON format)")
    publications = models.TextField(blank=True, help_text="Publications with HTML formatting (supports <br> and <a> tags)")
    awards = models.TextField(blank=True, help_text="Awards and recognitions (JSON format)")

    class Meta:
        ordering = ['display_order', 'name']

    def clean(self):
        """Sanitize HTML content in publications field"""
        if self.publications:
            # Allow only safe HTML tags: <br>, <a>, <p>, <strong>, <em>
            allowed_tags = ['br', 'a', 'p', 'strong', 'em']
            allowed_attributes = {'a': ['href', 'title']}
            self.publications = bleach.clean(
                self.publications,
                tags=allowed_tags,
                attributes=allowed_attributes,
                strip=True
            )

    def save(self, *args, **kwargs):
        """Save method with HTML sanitization"""
        self.clean()
        super().save(*args, **kwargs)

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
        ('event', 'Event'),
        ('research', 'Research Update'),
        ('student_achievement', 'Student Achievement'),
        ('faculty_news', 'Faculty News'),
        ('department_news', 'Department News'),
        ('general', 'General'),
    ]

    title = models.CharField(max_length=200)
    description = models.TextField()
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
    key_faculty = models.ManyToManyField(Team, blank=True, related_name='research_area_memberships')
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

class DepartmentInfo(models.Model):
    """Model for managing department information and settings"""
    name = models.CharField(max_length=200, default="Computer Systems & Mathematics")
    university = models.CharField(max_length=200, default="Ardhi University")
    description = models.TextField(blank=True)
    vision = models.TextField(blank=True)
    mission = models.TextField(blank=True)
    values = models.TextField(blank=True, help_text="JSON array of values")
    head_message = models.TextField(blank=True)
    head_name = models.CharField(max_length=100, blank=True)
    head_title = models.CharField(max_length=100, blank=True)
    head_photo = models.ImageField(upload_to='department/', blank=True)
    logo = models.ImageField(upload_to='department/', blank=True)
    is_active = models.BooleanField(default=True)

    class Meta:
        verbose_name = "Department Information"
        verbose_name_plural = "Department Information"

    def __str__(self):
        return f"{self.name} - {self.university}"

    @property
    def values_list(self):
        """Return values as a list"""
        import json
        try:
            return json.loads(self.values) if self.values else []
        except:
            return []

class ContactInfo(models.Model):
    """Model for managing contact information"""
    address = models.TextField()
    phone = models.CharField(max_length=50)
    email = models.EmailField()
    office_hours = models.CharField(max_length=100, blank=True)
    is_active = models.BooleanField(default=True)

    class Meta:
        verbose_name = "Contact Information"
        verbose_name_plural = "Contact Information"

    def __str__(self):
        return f"Contact Info - {self.email}"

class SocialMedia(models.Model):
    """Model for managing social media links"""
    PLATFORM_CHOICES = [
        ('facebook', 'Facebook'),
        ('twitter', 'Twitter'),
        ('linkedin', 'LinkedIn'),
        ('instagram', 'Instagram'),
        ('youtube', 'YouTube'),
        ('website', 'Website'),
    ]

    platform = models.CharField(max_length=20, choices=PLATFORM_CHOICES)
    url = models.URLField()
    is_active = models.BooleanField(default=True)
    display_order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['display_order', 'platform']
        verbose_name = "Social Media Link"
        verbose_name_plural = "Social Media Links"

    def __str__(self):
        return f"{self.get_platform_display()} - {self.url}"

class DepartmentMilestone(models.Model):
    """Model for managing department milestones and achievements"""
    year = models.CharField(max_length=10)
    title = models.CharField(max_length=200)
    description = models.TextField()
    is_active = models.BooleanField(default=True)
    display_order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['display_order', 'year']

    def __str__(self):
        return f"{self.year} - {self.title}"

class DepartmentAchievement(models.Model):
    """Model for managing department achievements and statistics"""
    icon_name = models.CharField(max_length=50, help_text="Lucide icon name")
    number = models.CharField(max_length=20)
    label = models.CharField(max_length=100)
    description = models.TextField()
    is_active = models.BooleanField(default=True)
    display_order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['display_order']

    def __str__(self):
        return f"{self.number} {self.label}"

class NewsletterSubscription(models.Model):
    """Model for managing newsletter subscriptions"""
    email = models.EmailField(unique=True)
    subscribed_at = models.DateTimeField(auto_now_add=True)
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ['-subscribed_at']

    def __str__(self):
        return self.email

class AdminUser(models.Model):
    """Extended user model for admin functionality"""
    user = models.OneToOneField('auth.User', on_delete=models.CASCADE, related_name='admin_profile')
    must_change_password = models.BooleanField(default=True)
    last_password_change = models.DateTimeField(null=True, blank=True)
    created_by = models.ForeignKey('auth.User', on_delete=models.SET_NULL, null=True, blank=True, related_name='created_admin_users')
    created_at = models.DateTimeField(auto_now_add=True)
    is_active = models.BooleanField(default=True)

    class Meta:
        verbose_name = "Admin User"
        verbose_name_plural = "Admin Users"

    def __str__(self):
        return f"{self.user.username} - Admin"

    def save(self, *args, **kwargs):
        # If this is a new admin user, set must_change_password to True
        if not self.pk:
            self.must_change_password = True
        super().save(*args, **kwargs)


class SiteSettings(models.Model):
    """Model for managing site-wide settings (contact info, footer text, etc.)"""
    # Contact Information
    department_name = models.CharField(max_length=200, default="Computer Systems & Mathematics")
    university_name = models.CharField(max_length=200, default="Ardhi University")
    physical_address = models.TextField(blank=True)
    contact_email = models.EmailField(blank=True, help_text="General contact email")
    contact_phone = models.CharField(max_length=50, blank=True, help_text="General contact phone")
    contact_fax = models.CharField(max_length=50, blank=True)
    
    # Footer Settings
    footer_caption = models.TextField(
        blank=True,
        default="© 2024 CSM Department. All rights reserved.",
        help_text="Text displayed in footer caption"
    )
    footer_bottom_text = models.TextField(
        blank=True,
        default="Designed and developed for Computer Systems & Mathematics Department",
        help_text="Footer bottom text/caption"
    )
    
    # Message from Head of Department
    hod_message_title = models.CharField(max_length=200, blank=True, default="Welcome Message")
    hod_message_content = models.TextField(blank=True)
    hod_photo = models.ImageField(upload_to='hod_photos/', blank=True, null=True)
    hod_name = models.CharField(max_length=200, blank=True, default="Head of Department")
    hod_title = models.CharField(max_length=200, blank=True)
    
    # SEO and Meta
    site_description = models.TextField(blank=True)
    site_keywords = models.CharField(max_length=500, blank=True)
    
    class Meta:
        verbose_name = "Site Settings"
        verbose_name_plural = "Site Settings"
    
    def __str__(self):
        return "Site Settings"
    
    def clean(self):
        """Sanitize text fields to prevent XSS attacks"""
        # Sanitize HTML content fields
        if self.footer_caption:
            allowed_tags = ['br', 'strong', 'em']
            self.footer_caption = bleach.clean(
                self.footer_caption,
                tags=allowed_tags,
                strip=True
            )
        
        if self.footer_bottom_text:
            allowed_tags = ['br', 'strong', 'em']
            self.footer_bottom_text = bleach.clean(
                self.footer_bottom_text,
                tags=allowed_tags,
                strip=True
            )
        
        if self.hod_message_content:
            allowed_tags = ['br', 'p', 'strong', 'em', 'a']
            allowed_attributes = {'a': ['href', 'title']}
            self.hod_message_content = bleach.clean(
                self.hod_message_content,
                tags=allowed_tags,
                attributes=allowed_attributes,
                strip=True
            )
    
    def save(self, *args, **kwargs):
        """Save method with sanitization"""
        self.clean()
        # Ensure only one instance exists
        self.pk = 1
        super().save(*args, **kwargs)
    
    @classmethod
    def load(cls):
        obj, created = cls.objects.get_or_create(pk=1)
        return obj