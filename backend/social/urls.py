from django.urls import path
from .views import toggle_like, toggle_save, toggle_follow, artwork_comments

urlpatterns = [
    path('artworks/<int:artwork_id>/like/', toggle_like, name='toggle_like'),
    path('artworks/<int:artwork_id>/save/', toggle_save, name='toggle_save'),
    path('artworks/<int:artwork_id>/comments/', artwork_comments, name='artwork_comments'),
    path('artists/<int:artist_id>/follow/', toggle_follow, name='toggle_follow'),
]
