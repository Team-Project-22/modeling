from django.db import models
from django.contrib.auth.models import User
# Create your models here.
class Artwork(models.Model):
    title = models.CharField(max_length=200)
    artist = models.CharField(max_length=200)
    image_path = models.CharField(null=True,max_length=500)

    def __str__(self):
        return f'{self.artist} : {self.title}'


class Rating(models.Model):
    id = models.AutoField(primary_key=True, null=False, blank=False)
    user = models.ForeignKey(User, null=False, blank=False, on_delete=models.CASCADE)
    artwork = models.ForeignKey(Artwork, null=False, blank=False, on_delete=models.CASCADE)
    rating = models.IntegerField(null=False)

    def __str__(self):
        return f'{self.user} , {self.artwork} : {self.rating}'