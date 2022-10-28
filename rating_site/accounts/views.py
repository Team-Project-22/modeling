from rest_framework import viewsets, status
from rest_framework.pagination import LimitOffsetPagination
from rest_framework.response import Response
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from .serializers import ArtworkSerializer, RatingSerializer
from .models import Artwork, Rating

from django.shortcuts import get_object_or_404
from django.contrib.auth.models import User

# Create your views here.
class ArtworkPagination(LimitOffsetPagination):
    default_limit = 20

class ArtworkViewset(viewsets.ModelViewSet):
    permission_classes = (IsAuthenticated,)
    queryset = Artwork.objects.all()
    serializer_class = ArtworkSerializer
    pagination_class = ArtworkPagination

class RatingViewSet(viewsets.ModelViewSet):
    serializer_class = RatingSerializer
    permission_classes = (IsAuthenticated,)
    lookup_field = 'artwork'

    def get_queryset(self):
        queryset = Rating.objects.filter(user= self.request.user.id)
        return queryset
    def perform_create(self, serializer):
        serializer.save(user= self.request.user)
    def update(self, request, *args, **kwargs):
        kwargs['partial'] = True
        return super().update(request, *args, **kwargs)


class BlacklistTokenUpdateView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        try:
            refresh_token = request.data['refresh_token']
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response(status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)