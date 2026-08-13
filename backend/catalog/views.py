from rest_framework import viewsets, filters
from rest_framework.response import Response
from rest_framework.decorators import action
from django.db.models import Q
from .models import Artist, Artwork
from .serializers import ArtistSerializer, ArtworkSerializer

class ArtistViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Artist.objects.all()
    serializer_class = ArtistSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['name', 'nationality', 'short_bio']

class ArtworkViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Artwork.objects.all().select_related('artist')
    serializer_class = ArtworkSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['title', 'artist__name', 'category', 'museum']

    def get_queryset(self):
        qs = super().get_queryset()
        category = self.request.query_params.get('category')
        if category and category != 'All Classics':
            qs = qs.filter(category__iexact=category)
        return qs

    @action(detail=True, methods=['post'])
    def increment_view(self, request, pk=None):
        artwork = self.get_object()
        artwork.views_count += 1
        artwork.save(update_fields=['views_count'])
        return Response({'status': 'view incremented', 'views_count': artwork.views_count})
