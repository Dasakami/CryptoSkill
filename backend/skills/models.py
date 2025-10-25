from django.db import models
from django.contrib.auth.models import User

class Skill(models.Model):
    CATEGORY_CHOICES = [
        ('programming', 'Programming'),
        ('design', 'Design'),
        ('marketing', 'Marketing'),
        ('blockchain', 'Blockchain'),
        ('data_science', 'Data Science'),
        ('other', 'Other'),
    ]
    
    name = models.CharField(max_length=100)
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES)
    description = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['-created_at']
    
    def __str__(self):
        return self.name


class SkillVerification(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('verified', 'Verified'),
        ('rejected', 'Rejected'),
    ]
    
    user_address = models.CharField(max_length=42)
    skill = models.ForeignKey(Skill, on_delete=models.CASCADE)
    proof_data = models.JSONField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    verification_score = models.IntegerField(default=0)
    verifier_address = models.CharField(max_length=42, blank=True)
    token_id = models.IntegerField(null=True, blank=True)
    tx_hash = models.CharField(max_length=66, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['-created_at']
    
    def __str__(self):
        return f"{self.user_address[:8]}... - {self.skill.name}"


class UserProfile(models.Model):
    wallet_address = models.CharField(max_length=42, unique=True)
    username = models.CharField(max_length=100, blank=True)
    bio = models.TextField(blank=True)
    total_verifications = models.IntegerField(default=0)
    average_score = models.FloatField(default=0.0)
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.wallet_address
