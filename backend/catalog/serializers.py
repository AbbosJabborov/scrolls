from rest_framework import serializers
from .models import Artist, Artwork

class ArtistSerializer(serializers.ModelSerializer):
    artworks_count = serializers.IntegerField(source='artworks.count', read_only=True)

    class Meta:
        model = Artist
        fields = [
            'id', 'name', 'photo_url', 'short_bio', 'birth_year',
            'death_year', 'nationality', 'source_url', 'artworks_count',
            'created_at'
        ]

class ArtworkSerializer(serializers.ModelSerializer):
    artist_name = serializers.CharField(source='artist.name', read_only=True)
    artist_photo = serializers.CharField(source='artist.photo_url', read_only=True)
    artist_bio = serializers.CharField(source='artist.short_bio', read_only=True)
    birth_death = serializers.SerializerMethodField()
    nationality = serializers.CharField(source='artist.nationality', read_only=True)
    likes_count = serializers.IntegerField(source='likes.count', read_only=True)
    saves_count = serializers.IntegerField(source='saves.count', read_only=True)
    comments_count = serializers.IntegerField(source='comments.count', read_only=True)

    class Meta:
        model = Artwork
        fields = [
            'id', 'artist', 'artist_name', 'artist_photo', 'artist_bio',
            'birth_death', 'nationality', 'title', 'year', 'medium',
            'dimensions', 'museum', 'location', 'image_url',
            'short_description', 'full_description', 'source_museum',
            'full_description_url', 'license', 'category', 'tags',
            'audio_title', 'audio_composer', 'audio_url', 'views_count',
            'likes_count', 'saves_count', 'comments_count', 'created_at'
        ]

    def get_birth_death(self, obj):
        if obj.artist.birth_year or obj.artist.death_year:
            return f"{obj.artist.birth_year} – {obj.artist.death_year}"
        return ""
