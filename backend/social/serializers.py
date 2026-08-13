from rest_framework import serializers
from .models import Follow, Like, Save, Comment

class CommentSerializer(serializers.ModelSerializer):
    user = serializers.SerializerMethodField()

    class Meta:
        model = Comment
        fields = ['id', 'artwork', 'user', 'author_name', 'avatar', 'text', 'created_at']
        read_only_fields = ['id', 'created_at']

    def get_user(self, obj):
        if obj.viewer:
            return obj.viewer.username
        return obj.author_name

class LikeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Like
        fields = ['id', 'viewer', 'artwork', 'created_at']

class SaveSerializer(serializers.ModelSerializer):
    class Meta:
        model = Save
        fields = ['id', 'viewer', 'artwork', 'created_at']

class FollowSerializer(serializers.ModelSerializer):
    class Meta:
        model = Follow
        fields = ['id', 'viewer', 'artist', 'created_at']
