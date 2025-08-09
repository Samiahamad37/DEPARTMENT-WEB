from django.core.management.base import BaseCommand
from django.utils import timezone
from datetime import timedelta
from csmz.models import Announcement

class Command(BaseCommand):
    help = 'Delete announcements older than one month'

    def handle(self, *args, **kwargs):
        cutoff = timezone.now() - timedelta(days=30)
        expired = Announcement.objects.filter(date_posted__lt=cutoff)
        count = expired.count()
        expired.delete()
        self.stdout.write(self.style.SUCCESS(f'Deleted {count} expired announcements'))
