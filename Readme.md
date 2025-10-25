# 🎓 CryptoSkill - Decentralized Skills Verification Platform

<div align="center">

![CryptoSkill Logo](https://img.shields.io/badge/CryptoSkill-Blockchain%20Verified-6366f1)
[![ETH Bishkek 2025](https://img.shields.io/badge/Hackathon-ETH%20Bishkek%202025-success)](https://ethbishkek.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

**Verify your skills on-chain. Own your reputation.**

[Live Demo](https://cryptoskill.vercel.app) • [Documentation](./docs) • [Video](https://youtube.com/watch?v=demo)

</div>

---

## 🚀 Overview

CryptoSkill is a decentralized platform for professional skills verification. Get NFT certificates for your skills, verified by experts, stored permanently on blockchain.

### The Problem
- 85% of employers catch resume fraud
- Freelancers struggle to prove real skills
- Centralized platforms can be faked
- No portable reputation system

### Our Solution
- Blockchain-backed verification
- NFT skill certificates (ERC721)
- Expert verifier system
- Portable, permanent credentials

---

## ✨ Features

- 🔐 **NFT Certificates** - Own your skill verifications
- 👥 **Expert Verifiers** - Authorized reviewers score skills 0-100
- 📊 **Score System** - Not just binary, get detailed scoring
- 💼 **Profile Dashboard** - View all your verified skills
- 🌐 **Decentralized** - On-chain, permanent, trustless
- 📱 **Responsive** - Works on all devices

---

## 🏗️ Architecture

```
┌─────────────┐      ┌──────────────┐      ┌─────────────┐
│   Frontend  │─────▶│   Backend    │─────▶│  Blockchain │
│  React/TS   │      │  Django/DRF  │      │  Sepolia    │
│  Tailwind   │      │   Python     │      │   ERC721    │
└─────────────┘      └──────────────┘      └─────────────┘
      │                      │                     │
      │                      │                     │
   User UI            API + Web3.py          Smart Contract
```

### Tech Stack

**Frontend**
- React 18 + TypeScript
- Tailwind CSS
- Ethers.js
- Lucide React (icons)

**Backend**
- Django 4.2
- Django REST Framework
- Web3.py
- PostgreSQL

**Blockchain**
- Solidity 0.8.20
- Hardhat
- OpenZeppelin
- Sepolia / Status Network

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- Python 3.10+
- MetaMask
- Docker (optional)

### Option 1: Docker (Fastest)

```bash
# Clone repository
git clone https://github.com/yourusername/cryptoskill.git
cd cryptoskill

# Setup environment
cp .env.example .env
# Edit .env with your keys

# Start all services
docker-compose up

# Access:
# Frontend: http://localhost:3000
# Backend: http://localhost:8000
# Admin: http://localhost:8000/admin
```

### Option 2: Manual Setup

#### 1. Backend Setup

```bash
cd backend

# Virtual environment
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Environment
cp .env.example .env
# Edit .env

# Database
python manage.py migrate
python manage.py createsuperuser

# Run
python manage.py runserver
```

#### 2. Smart Contracts

```bash
cd contracts

# Install
npm install

# Environment
cp .env.example .env
# Add private key

# Deploy
npx hardhat run scripts/deploy.js --network sepolia

# Copy contract address to backend/.env
```

#### 3. Frontend

```bash
cd frontend

# Install
npm install

# Environment
cp .env.example .env

# Run
npm start
```

---

## 📁 Project Structure

```
cryptoskill/
├── backend/              # Django REST API
│   ├── config/          # Settings
│   ├── skills/          # Main app
│   ├── Dockerfile
│   └── README.md
│
├── contracts/           # Smart Contracts
│   ├── contracts/       # Solidity files
│   ├── scripts/         # Deploy scripts
│   ├── Dockerfile
│   └── README.md
│
├── frontend/            # React App
│   ├── src/
│   │   ├── components/  # UI components
│   │   ├── hooks/       # Custom hooks
│   │   ├── services/    # API calls
│   │   ├── types/       # TypeScript types
│   │   └── utils/       # Helpers
│   ├── Dockerfile
│   └── README.md
│
├── docs/                # Documentation
│   ├── BUSINESS_PLAN.md
│   └── QUICK_START.md
│
├── docker-compose.yml   # Docker setup
└── README.md            # This file
```

---

## 📖 Documentation

- [Backend README](./backend/README.md) - API documentation
- [Frontend README](./frontend/README.md) - UI components
- [Contracts README](./contracts/README.md) - Smart contracts
- [Business Plan](./docs/BUSINESS_PLAN.md) - Business model
- [Quick Start](./docs/QUICK_START.md) - Setup guide

---

## 🎯 How It Works

### For Users

1. **Connect Wallet** - MetaMask integration
2. **Choose Skill** - Select from available categories
3. **Submit Proof** - GitHub, portfolio, experience
4. **Get Verified** - Expert reviews and scores
5. **Receive NFT** - Permanent on-chain certificate

### For Verifiers

1. **Review Submission** - Check proof materials
2. **Assess Skill** - Score 0-100 based on evidence
3. **Mint NFT** - Smart contract creates certificate
4. **Earn Rewards** - Get portion of verification fee

---

## 🔌 API Endpoints

### Skills
```
GET    /api/skills/              - List all skills
POST   /api/skills/              - Create skill (admin)
GET    /api/skills/{id}/         - Get skill details
```

### Verifications
```
GET    /api/verifications/       - List verifications
POST   /api/verifications/       - Submit verification
POST   /api/verifications/{id}/verify/  - Approve & mint
GET    /api/verifications/?user_address=0x...  - Filter
```

### Profiles
```
GET    /api/profiles/{address}/  - User profile
GET    /api/profiles/{address}/verifications/  - User skills
```

---

## 🏆 Hackathon Bounties

### Eligible For:

✅ **ETH Bishkek - Challenge 1** ($1,000)
- Category: Infrastructure + Financial Freedom
- Decentralized reputation system

✅ **ETH Bishkek - Challenge 2** ($1,000)
- Complete business model included
- Revenue streams defined

✅ **Status Network** ($1,000)
- Gasless transactions ready
- Easy onboarding flow

✅ **BuidlGuidl** ($1,000)
- Can be ported to Scaffold-ETH 2
- Clean architecture

**Total Potential: $4,000**

---
