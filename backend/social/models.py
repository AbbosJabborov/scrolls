from django.db import models
from django.contrib.auth.models import User
from catalog.models import Artist, Artwork

class Follow(models.Model):
    viewer = models.ForeignKey(User, on_delete=models.CASCADE, related_name='following_artists')
    artist = models.ForeignKey(Artist, on_delete=models.CASCADE, related_name='followers')
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('viewer', 'artist')

    def __str__(self):
        return f"{self.viewer.username} follows {self.artist.name}"

class Like(models.Model):
    viewer = models.ForeignKey(User, on_delete=models.CASCADE, related_name='liked_artworks')
    artwork = models.ForeignKey(Artwork, on_delete=models.CASCADE, related_name='likes')
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('viewer', 'artwork')

    def __str__(self):
        return f"{self.viewer.username} liked {self.artwork.title}"

class Save(models.Model):
    viewer = models.ForeignKey(User, on_delete=models.CASCADE, related_name='saved_artworks')
    artwork = models.ForeignKey(Artwork, on_delete=models.CASCADE, related_name='saves')
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('viewer', 'artwork')

    def __str__(self):
        return f"{self.viewer.username} saved {self.artwork.title}"

class Comment(models.Model):
    viewer = models.ForeignKey(User, on_delete=models.CASCADE, related_name='artwork_comments', null=True, blank=True)
    author_name = models.CharField(max_length=150, default='ArtLover')
    artwork = models.ForeignKey(Artwork, on_delete=models.CASCADE, related_name='comments')
    avatar = models.CharField(max_length=20, default='🎨')
    text = models.TextField()
    is_hidden = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"Comment by {self.author_name} on {self.artwork.title}"
