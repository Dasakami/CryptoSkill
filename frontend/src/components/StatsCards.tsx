import React from 'react';
import { Award, TrendingUp, CheckCircle } from 'lucide-react';
import { UserProfile, Verification } from '../types';

interface StatsCardsProps {
  profile: UserProfile;
  verifications: Verification[];
}

export const StatsCards: React.FC<StatsCardsProps> = ({ profile, verifications }) => {
  const verifiedCount = verifications.filter(v => v.status === 'verified').length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600 mb-1">Total Skills</p>
            <p className="text-3xl font-bold text-gray-900">
              {profile.total_verifications}
            </p>
          </div>
          <Award className="w-12 h-12 text-indigo-200" />
        </div>
      </div>
      
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600 mb-1">Average Score</p>
            <p className="text-3xl font-bold text-gray-900">
              {profile.average_score.toFixed(1)}
            </p>
          </div>
          <TrendingUp className="w-12 h-12 text-green-200" />
        </div>
      </div>
      
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600 mb-1">NFTs Owned</p>
            <p className="text-3xl font-bold text-gray-900">
              {verifiedCount}
            </p>
          </div>
          <CheckCircle className="w-12 h-12 text-purple-200" />
        </div>
      </div>
    </div>
  );
};