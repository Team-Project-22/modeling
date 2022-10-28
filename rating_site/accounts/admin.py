from django.contrib import admin
from django.contrib.auth.models import User
from .models import Rating, Artwork

# Register your models here.

admin.site.register(Rating)
admin.site.register(Artwork)
