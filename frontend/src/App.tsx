import React, { useState, useEffect } from 'react';
import { Award } from 'lucide-react';
import { Header } from './components/Header';
import { StatsCards } from './components/StatsCards';
import { SkillList } from './components/SkillList';
import { ProofForm } from './components/ProofForm';
import { ProfileTab } from './components/ProfileTab';
import { useWallet } from './hooks/useWallet';
import { api } from './services/api';
import { Skill, Verification, UserProfile, ProofData, TabType } from './types';

const App: React.FC = () => {
  const { walletAddress, isConnected, connectWallet } = useWallet();
  
  const [skills, setSkills] = useState<Skill[]>([]);
  const [userVerifications, setUserVerifications] = useState<Verification[]>([]);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [selectedSkill, setSelectedSkill] = useState<number | null>(null);
  const [proofData, setProofData] = useState<ProofData>({
    github: '',
    portfolio: '',
    experience: ''
  });
  const [activeTab, setActiveTab] = useState<TabType>('submit');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    loadSkills();
  }, []);

  useEffect(() => {
    if (isConnected && walletAddress) {
      loadUserData();
    }
  }, [isConnected, walletAddress]);

  const loadSkills = async () => {
    try {
      const data = await api.getSkills();
      setSkills(data);
    } catch (error) {
      console.error('Failed to load skills:', error);
    }
  };

  const loadUserData = async () => {
    try {
      const [verifications, profile] = await Promise.all([
        api.getVerifications(walletAddress),
        api.getUserProfile(walletAddress)
      ]);
      
      setUserVerifications(verifications);
      setUserProfile(profile);
    } catch (error) {
      console.error('Failed to load user data:', error);
    }
  };

  const handleSubmitVerification = async () => {
    if (!selectedSkill || !walletAddress) return;

    setIsSubmitting(true);
    try {
      await api.submitVerification(walletAddress, selectedSkill, proofData);
      alert('Verification submitted successfully! Awaiting review.');
      
      setProofData({ github: '', portfolio: '', experience: '' });
      setSelectedSkill(null);
      loadUserData();
    } catch (error) {
      console.error('Failed to submit verification:', error);
      alert('Failed to submit verification. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleConnect = async () => {
    try {
      await connectWallet();
    } catch (error) {
      console.error('Failed to connect wallet:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <Header 
        isConnected={isConnected}
        walletAddress={walletAddress}
        onConnect={handleConnect}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!isConnected ? (
          <div className="text-center py-20">
            <Award className="w-20 h-20 text-indigo-300 mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Verify Your Skills On-Chain
            </h2>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Get NFT certificates for your professional skills with blockchain verification.
              Build your decentralized reputation.
            </p>
            <button
              onClick={handleConnect}
              className="px-8 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-lg font-semibold"
            >
              Connect Wallet to Start
            </button>
          </div>
        ) : (
          <>
            {userProfile && (
              <StatsCards 
                profile={userProfile}
                verifications={userVerifications}
              />
            )}

            <div className="flex space-x-1 mb-8 bg-white rounded-lg p-1 shadow-sm border border-gray-100 w-fit">
              <button
                onClick={() => setActiveTab('submit')}
                className={`px-6 py-2 rounded-md transition-colors ${
                  activeTab === 'submit'
                    ? 'bg-indigo-600 text-white'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Submit Verification
              </button>
              <button
                onClick={() => setActiveTab('profile')}
                className={`px-6 py-2 rounded-md transition-colors ${
                  activeTab === 'profile'
                    ? 'bg-indigo-600 text-white'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                My Skills
              </button>
            </div>

            {activeTab === 'submit' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <SkillList
                  skills={skills}
                  selectedSkill={selectedSkill}
                  onSelectSkill={setSelectedSkill}
                />
                <ProofForm
                  selectedSkill={selectedSkill}
                  proofData={proofData}
                  onProofDataChange={setProofData}
                  onSubmit={handleSubmitVerification}
                  isSubmitting={isSubmitting}
                />
              </div>
            )}

            {activeTab === 'profile' && (
              <ProfileTab
                verifications={userVerifications}
                onSwitchToSubmit={() => setActiveTab('submit')}
              />
            )}
          </>
        )}
      </div>

      <footer className="mt-16 py-8 border-t border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-gray-600 mb-2">
              Built for ETH Bishkek 2025 Hackathon
            </p>
            <p className="text-sm text-gray-500">
              Decentralized Skills Verification Platform
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;