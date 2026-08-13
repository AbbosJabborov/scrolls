from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticatedOrReadOnly, AllowAny
from rest_framework.response import Response
from django.shortcuts import get_object_or_404

from catalog.models import Artist, Artwork
from .models import Like, Save, Follow, Comment
from .serializers import CommentSerializer

@api_view(['POST'])
def toggle_like(request, artwork_id):
    artwork = get_object_or_404(Artwork, pk=artwork_id)
    user = request.user if request.user.is_authenticated else None
    
    if user:
        like_obj, created = Like.objects.get_or_create(viewer=user, artwork=artwork)
        if not created:
            like_obj.delete()
            return Response({'status': 'unliked', 'liked': False, 'likes_count': artwork.likes.count()})
        return Response({'status': 'liked', 'liked': True, 'likes_count': artwork.likes.count()})
    else:
        # Anonymous toggle fallback response
        return Response({'status': 'liked', 'liked': True, 'likes_count': artwork.likes.count() + 1})

@api_view(['POST'])
def toggle_save(request, artwork_id):
    artwork = get_object_or_404(Artwork, pk=artwork_id)
    user = request.user if request.user.is_authenticated else None
    
    if user:
        save_obj, created = Save.objects.get_or_create(viewer=user, artwork=artwork)
        if not created:
            save_obj.delete()
            return Response({'status': 'unsaved', 'saved': False, 'saves_count': artwork.saves.count()})
        return Response({'status': 'saved', 'saved': True, 'saves_count': artwork.saves.count()})
    else:
        return Response({'status': 'saved', 'saved': True, 'saves_count': artwork.saves.count() + 1})

@api_view(['POST'])
def toggle_follow(request, artist_id):
    artist = get_object_or_404(Artist, pk=artist_id)
    user = request.user if request.user.is_authenticated else None
    
    if user:
        follow_obj, created = Follow.objects.get_or_create(viewer=user, artist=artist)
        if not created:
            follow_obj.delete()
            return Response({'status': 'unfollowed', 'following': False})
        return Response({'status': 'followed', 'following': True})
    else:
        return Response({'status': 'followed', 'following': True})

@api_view(['GET', 'POST'])
@permission_classes([AllowAny])
def artwork_comments(request, artwork_id):
    artwork = get_object_or_404(Artwork, pk=artwork_id)
    
    if request.method == 'GET':
        comments = artwork.comments.filter(is_hidden=False)
        serializer = CommentSerializer(comments, many=True)
        return Response(serializer.data)
        
    elif request.method == 'POST':
        text = request.data.get('text', '').strip()
        author_name = request.data.get('author_name', 'ArtLover').strip()
        avatar = request.data.get('avatar', '🎨').strip()
        
        if not text:
            return Response({'error': 'Comment text cannot be empty'}, status=status.HTTP_400_BAD_REQUEST)
            
        user = request.user if request.user.is_authenticated else None
        
        comment = Comment.objects.create(
            artwork=artwork,
            viewer=user,
            author_name=author_name if not user else user.username,
            avatar=avatar,
            text=text
        )
        
        serializer = CommentSerializer(comment)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
