export interface Skill {
  id: number;
  name: string;
  category: string;
  description: string;
  created_at: string;
}

export interface Verification {
  id: number;
  user_address: string;
  skill: number;
  skill_name: string;
  skill_category: string;
  proof_data: ProofData;
  status: 'pending' | 'verified' | 'rejected';
  verification_score: number;
  verifier_address: string;
  token_id: number | null;
  tx_hash: string;
  created_at: string;
  updated_at: string;
}

export interface ProofData {
  github: string;
  portfolio: string;
  experience: string;
}

export interface UserProfile {
  wallet_address: string;
  username: string;
  bio: string;
  total_verifications: number;
  average_score: number;
  created_at: string;
}

export type TabType = 'submit' | 'profile';