import React from 'react';
import { Award, Clock, CheckCircle } from 'lucide-react';
import { Verification } from '../types';
import { getCategoryColor } from '../utils/helpers';

interface ProfileTabProps {
    verifications: Verification[];
    onSwitchToSubmit: () => void;
}

export const ProfileTab: React.FC<ProfileTabProps> = ({
    verifications,
    onSwitchToSubmit
}) => {
    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'verified':
                return <CheckCircle className="w-5 h-5 text-green-500" />;
            case 'pending':
                return <Clock className="w-5 h-5 text-yellow-500" />;
            default:
                return null;
        }
    };

    return (
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-xl font-bold text-gray-900 mb-6">
                My Skill Verifications
            </h3>

            {verifications.length === 0 ? (
                <div className="text-center py-12">
                    <Award className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-600 mb-4">
                        No verifications yet. Submit your first skill!
                    </p>
                    <button
                        onClick={onSwitchToSubmit}
                        className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                    >
                        Get Started
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {verifications.map(verification => (
                        <div
                            key={verification.id}
                            className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                        >
                            <div className="flex items-start justify-between mb-3">
                                <div>
                                    <h4 className="font-semibold text-gray-900 mb-1">
                                        {verification.skill_name}
                                    </h4>
                                    <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${getCategoryColor(verification.skill_category)}`}>
                                        {verification.skill_category.replace('_', ' ')}
                                    </span>
                                </div>
                                {getStatusIcon(verification.status)}
                            </div>

                            {verification.status === 'verified' && (
                                <div className="mt-3 pt-3 border-t border-gray-100">
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-sm text-gray-600">Score</span>
                                        <span className="text-lg font-bold text-indigo-600">
                                            {verification.verification_score}/100
                                        </span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                        <div
                                            className="bg-indigo-600 h-2 rounded-full transition-all"
                                            style={{ width: `${verification.verification_score}%` }}
                                        />
                                    </div>
                                    {verification.token_id && (
                                        <p className="text-xs text-gray-500 mt-2">
                                            NFT Token ID: #{verification.token_id}
                                        </p>
                                    )}
                                </div>
                            )}

                            {verification.status === 'pending' && (
                                <div className="mt-3 pt-3 border-t border-gray-100">
                                    <p className="text-sm text-yellow-600 flex items-center">
                                        <Clock className="w-4 h-4 mr-1" />
                                        Awaiting verification...
                                    </p>
                                </div>
                            )}

                            <p className="text-xs text-gray-400 mt-2">
                                {new Date(verification.created_at).toLocaleDateString()}
                            </p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};