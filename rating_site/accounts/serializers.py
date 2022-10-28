from rest_framework import serializers
from .models import Artwork, Rating
from django.contrib.auth.models import User

class ArtworkSerializer(serializers.ModelSerializer):
    class Meta:
        model = Artwork
        fields = ('id', 'title', 'artist', 'image_path',)

# Account USER Model 정의하고, Serializer 작성하고,
# rating_Table 만들기( User : Artwork = 1:1)

class AccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email')


class RatingSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source='user_id')

    class Meta:
        model = Rating
        fields = '__all__'

