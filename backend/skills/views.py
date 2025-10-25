from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django.db.models import Avg
from .models import Skill, SkillVerification, UserProfile
from .serializers import SkillSerializer, SkillVerificationSerializer, UserProfileSerializer
from .web3_service import Web3Service

class SkillViewSet(viewsets.ModelViewSet):
    queryset = Skill.objects.all()
    serializer_class = SkillSerializer


class SkillVerificationViewSet(viewsets.ModelViewSet):
    queryset = SkillVerification.objects.all()
    serializer_class = SkillVerificationSerializer
    
    def get_queryset(self):
        queryset = super().get_queryset()
        user_address = self.request.query_params.get('user_address')
        if user_address:
            queryset = queryset.filter(user_address__iexact=user_address)
        return queryset
    
    @action(detail=True, methods=['post'])
    def verify(self, request, pk=None):
        verification = self.get_object()
        
        if verification.status != 'pending':
            return Response(
                {'error': 'Verification already processed'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        score = request.data.get('score', 75)
        verifier_address = request.data.get('verifier_address')
        
        if not verifier_address:
            return Response(
                {'error': 'Verifier address required'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        try:
            web3_service = Web3Service()
            result = web3_service.mint_skill_nft(
                to_address=verification.user_address,
                skill_name=verification.skill.name,
                category=verification.skill.category,
                score=score,
                metadata_uri=f"ipfs://skill-{verification.id}"
            )
            
            verification.status = 'verified'
            verification.verification_score = score
            verification.verifier_address = verifier_address
            verification.token_id = result.get('token_id')
            verification.tx_hash = result.get('tx_hash')
            verification.save()
            
            profile, _ = UserProfile.objects.get_or_create(
                wallet_address=verification.user_address
            )
            profile.total_verifications += 1
            avg_score = SkillVerification.objects.filter(
                user_address=verification.user_address,
                status='verified'
            ).aggregate(Avg('verification_score'))['verification_score__avg']
            profile.average_score = avg_score or 0
            profile.save()
            
            return Response({
                'message': 'Skill verified and NFT minted',
                'data': SkillVerificationSerializer(verification).data
            })
            
        except Exception as e:
            return Response(
                {'error': str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


class UserProfileViewSet(viewsets.ModelViewSet):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer
    lookup_field = 'wallet_address'
    
    @action(detail=True, methods=['get'])
    def verifications(self, request, wallet_address=None):
        verifications = SkillVerification.objects.filter(
            user_address__iexact=wallet_address,
            status='verified'
        )
        serializer = SkillVerificationSerializer(verifications, many=True)
        return Response(serializer.data)