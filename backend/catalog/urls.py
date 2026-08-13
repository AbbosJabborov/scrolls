from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ArtistViewSet, ArtworkViewSet

router = DefaultRouter()
router.register('artists', ArtistViewSet, basename='artist')
router.register('artworks', ArtworkViewSet, basename='artwork')

urlpatterns = [
    path('', include(router.urls)),
]
