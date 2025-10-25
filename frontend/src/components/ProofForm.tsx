// src/components/ProofForm.tsx

import React from 'react';
import { Award } from 'lucide-react';
import { ProofData } from '../types';

interface ProofFormProps {
  selectedSkill: number | null;
  proofData: ProofData;
  onProofDataChange: (data: ProofData) => void;
  onSubmit: () => void;
  isSubmitting: boolean;
}

export const ProofForm: React.FC<ProofFormProps> = ({
  selectedSkill,
  proofData,
  onProofDataChange,
  onSubmit,
  isSubmitting
}) => {
  const handleChange = (field: keyof ProofData, value: string) => {
    onProofDataChange({ ...proofData, [field]: value });
  };

  const isFormValid = proofData.github || proofData.portfolio;

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <h3 className="text-xl font-bold text-gray-900 mb-4">
        Submit Proof
      </h3>
      
      {selectedSkill ? (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              GitHub Profile/Repo
            </label>
            <input
              type="text"
              value={proofData.github}
              onChange={(e) => handleChange('github', e.target.value)}
              placeholder="https://github.com/username"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Portfolio/Projects
            </label>
            <input
              type="text"
              value={proofData.portfolio}
              onChange={(e) => handleChange('portfolio', e.target.value)}
              placeholder="https://yourportfolio.com"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Experience Description
            </label>
            <textarea
              value={proofData.experience}
              onChange={(e) => handleChange('experience', e.target.value)}
              placeholder="Describe your experience and achievements..."
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>

          <button
            onClick={onSubmit}
            disabled={!isFormValid || isSubmitting}
            className="w-full px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors font-semibold"
          >
            {isSubmitting ? 'Submitting...' : 'Submit for Verification'}
          </button>

          <p className="text-xs text-gray-500 text-center">
            Your submission will be reviewed by verifiers. Upon approval, you'll receive an NFT certificate.
          </p>
        </div>
      ) : (
        <div className="text-center py-12">
          <Award className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-600">
            Select a skill from the left to submit verification proof
          </p>
        </div>
      )}
    </div>
  );
};