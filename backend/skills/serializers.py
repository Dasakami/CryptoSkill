from rest_framework import serializers
from .models import Skill, SkillVerification, UserProfile

class SkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skill
        fields = '__all__'


class SkillVerificationSerializer(serializers.ModelSerializer):
    skill_name = serializers.CharField(source='skill.name', read_only=True)
    skill_category = serializers.CharField(source='skill.category', read_only=True)
    
    class Meta:
        model = SkillVerification
        fields = '__all__'
        read_only_fields = ['status', 'verification_score', 'verifier_address', 'token_id', 'tx_hash']


class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = '__all__'
