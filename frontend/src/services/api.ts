// src/services/api.ts

import { Skill, Verification, UserProfile, ProofData } from '../types';

const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

export const api = {
  // Skills
  async getSkills(): Promise<Skill[]> {
    const response = await fetch(`${API_BASE}/skills/`);
    const data = await response.json();
    return data.results || data;
  },

  // Verifications
  async getVerifications(userAddress?: string): Promise<Verification[]> {
    const url = userAddress 
      ? `${API_BASE}/verifications/?user_address=${userAddress}`
      : `${API_BASE}/verifications/`;
    const response = await fetch(url);
    const data = await response.json();
    return data.results || data;
  },

  async submitVerification(
    userAddress: string,
    skillId: number,
    proofData: ProofData
  ): Promise<Verification> {
    const response = await fetch(`${API_BASE}/verifications/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_address: userAddress,
        skill: skillId,
        proof_data: proofData,
        status: 'pending'
      })
    });

    if (!response.ok) {
      throw new Error('Failed to submit verification');
    }

    return response.json();
  },

  // User Profile
  async getUserProfile(walletAddress: string): Promise<UserProfile | null> {
    try {
      const response = await fetch(`${API_BASE}/profiles/${walletAddress}/`);
      if (!response.ok) return null;
      return response.json();
    } catch (error) {
      return null;
    }
  },

  async getUserVerifications(walletAddress: string): Promise<Verification[]> {
    const response = await fetch(`${API_BASE}/profiles/${walletAddress}/verifications/`);
    const data = await response.json();
    return data.results || data;
  }
};