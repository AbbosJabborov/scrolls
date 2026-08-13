from django.db import models

class Artist(models.Model):
    name = models.CharField(max_length=255)
    photo_url = models.URLField(max_length=1024, blank=True, null=True)
    short_bio = models.TextField(blank=True, default='')
    birth_year = models.CharField(max_length=50, blank=True, default='')
    death_year = models.CharField(max_length=50, blank=True, default='')
    nationality = models.CharField(max_length=100, blank=True, default='')
    source_url = models.URLField(max_length=1024, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['name']

    def __str__(self):
        return self.name

class Artwork(models.Model):
    artist = models.ForeignKey(Artist, on_delete=models.CASCADE, related_name='artworks')
    title = models.CharField(max_length=255)
    year = models.CharField(max_length=100, blank=True, default='')
    medium = models.CharField(max_length=255, blank=True, default='')
    dimensions = models.CharField(max_length=255, blank=True, default='')
    museum = models.CharField(max_length=255, blank=True, default='')
    location = models.CharField(max_length=255, blank=True, default='')
    image_url = models.URLField(max_length=1024)
    short_description = models.TextField(blank=True, default='')
    full_description = models.TextField(blank=True, default='')
    source_museum = models.CharField(max_length=255, blank=True, default='')
    full_description_url = models.URLField(max_length=1024, blank=True, null=True)
    license = models.CharField(max_length=100, default='Public Domain / CC0')
    category = models.CharField(max_length=100, default='All Classics')
    tags = models.JSONField(default=list, blank=True)
    
    # Optional Classical Audio pairing
    audio_title = models.CharField(max_length=255, blank=True, default='')
    audio_composer = models.CharField(max_length=255, blank=True, default='')
    audio_url = models.URLField(max_length=1024, blank=True, null=True)
    
    views_count = models.PositiveIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.title} - {self.artist.name}"
