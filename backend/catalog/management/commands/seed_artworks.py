from django.core.management.base import BaseCommand
from django.core.management import call_command
from social.models import Comment

class Command(BaseCommand):
    help = 'Seeds clean real artworks from Met Museum without mock comments'

    def handle(self, *args, **options):
        self.stdout.write('Clearing old mock comments...')
        Comment.objects.all().delete()
        self.stdout.write(self.style.SUCCESS('Cleared all comments!'))

        self.stdout.write('Running Met Museum artwork sync...')
        call_command('sync_met_artworks', limit=35)
        self.stdout.write(self.style.SUCCESS('Seeding complete with real museum artworks!'))
