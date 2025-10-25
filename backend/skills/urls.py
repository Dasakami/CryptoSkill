from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import SkillViewSet, SkillVerificationViewSet, UserProfileViewSet

router = DefaultRouter()
router.register(r'skills', SkillViewSet)
router.register(r'verifications', SkillVerificationViewSet)
router.register(r'profiles', UserProfileViewSet)

urlpatterns = [
    path('', include(router.urls)),
]


