from django.urls import path, include
from rest_framework.routers import  DefaultRouter
from . import views
from .views import BlacklistTokenUpdateView


router = DefaultRouter()
router.register(r'artworks', views.ArtworkViewset)
router.register(r'rating', views.RatingViewSet, 'rating')

urlpatterns = [
    path('account/', include('dj_rest_auth.urls')),
    path('account/registration/', include('dj_rest_auth.registration.urls')),
    path('logout/blacklist/', BlacklistTokenUpdateView.as_view(),
         name='blacklist'),
    path('', include(router.urls)),

]
