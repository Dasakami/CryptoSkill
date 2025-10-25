# ⚛️ Frontend - React TypeScript App

## 📋 Overview

Modern React TypeScript application with Tailwind CSS for decentralized skills verification.

## 🚀 Quick Start

### Local Development

```bash
# Install dependencies
npm install

# Setup environment
cp .env.example .env
# Edit REACT_APP_API_URL if needed

# Start development server
npm start
```

Access at: `http://localhost:3000`

### Docker

```bash
# Build image
docker build -t cryptoskill-frontend .

# Run container
docker run -p 3000:80 cryptoskill-frontend
```

## 📁 Structure

```
frontend/
├── src/
│   ├── components/       # React components
│   │   ├── Header.tsx
│   │   ├── StatsCards.tsx
│   │   ├── SkillList.tsx
│   │   ├── ProofForm.tsx
│   │   └── ProfileTab.tsx
│   ├── hooks/           # Custom hooks
│   │   └── useWallet.ts
│   ├── services/        # API services
│   │   └── api.ts
│   ├── types/           # TypeScript types
│   │   └── index.ts
│   ├── utils/           # Helper functions
│   │   └── helpers.ts
│   ├── App.tsx          # Main app
│   └── index.tsx
├── public/
│   └── index.html
└── package.json
```

## 🎨 Components

### Header
- Wallet connection button
- Connected address display
- Logo and branding

### StatsCards
- Total skills verified
- Average score
- NFTs owned

### SkillList
- Browse available skills
- Category badges
- Selection state

### ProofForm
- GitHub/portfolio input
- Experience description
- Submit verification

### ProfileTab
- User verifications list
- NFT badges
- Verification status

## 🔌 API Integration

Located in `src/services/api.ts`:

```typescript
import { api } from './services/api';

// Get all skills
const skills = await api.getSkills();

// Submit verification
await api.submitVerification(address, skillId, proofData);

// Get user profile
const profile = await api.getUserProfile(address);
```

## 🔑 Environment Variables

```env
REACT_APP_API_URL=http://localhost:8000/api
REACT_APP_CHAIN_ID=11155111
REACT_APP_CONTRACT_ADDRESS=0x...
```

## 🎯 Features

- **Wallet Connection** - MetaMask integration
- **Skill Browse** - Filter by category
- **Proof Submission** - GitHub, portfolio, experience
- **Profile Dashboard** - View all verifications
- **NFT Display** - Show verification scores
- **Responsive** - Mobile-friendly design

## 🧪 Testing

```bash
# Run tests
npm test

# Build for production
npm run build

# Lint
npm run lint
```

## 🎨 Styling

Uses Tailwind CSS via CDN:

```html
<script src="https://cdn.tailwindcss.com"></script>
```

Colors:
- Primary: Indigo (600, 700)
- Success: Green (500)
- Warning: Yellow (500)
- Gradient: Indigo → Purple → Pink

## 📦 Dependencies

```json
{
  "react": "^18.2.0",
  "typescript": "^4.9.5",
  "lucide-react": "^0.263.1",
  "ethers": "^6.9.0"
}
```

## 🔐 Web3 Integration

### Connect Wallet
```typescript
const { connectWallet, walletAddress, isConnected } = useWallet();
```

### Check Network
```typescript
const chainId = await window.ethereum.request({ 
  method: 'eth_chainId' 
});
```

## 🚢 Deployment

### Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### Netlify

```bash
# Build
npm run build

# Deploy build folder
netlify deploy --prod --dir=build
```

### Manual

```bash
npm run build
# Upload build/ folder to hosting
```

## 🛠️ Development

### Add New Component

```bash
# Create component file
touch src/components/NewComponent.tsx
```

```typescript
import React from 'react';

interface NewComponentProps {
  // props
}

export const NewComponent: React.FC<NewComponentProps> = ({ }) => {
  return (
    <div>
      {/* content */}
    </div>
  );
};
```

### Add New API Endpoint

```typescript
// src/services/api.ts
export const api = {
  async newEndpoint() {
    const response = await fetch(`${API_BASE}/new/`);
    return response.json();
  }
};
```

## 📱 Responsive Design

Breakpoints:
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
```

## 🐛 Troubleshooting

**MetaMask not detected:**
```typescript
if (typeof window.ethereum === 'undefined') {
  alert('Please install MetaMask');
}
```

**API connection failed:**
- Check REACT_APP_API_URL
- Verify backend is running
- Check CORS settings

**Build errors:**
```bash
rm -rf node_modules package-lock.json
npm install
```

## 📝 Notes

- TypeScript for type safety
- Functional components with hooks
- Tailwind for styling
- Lucide React for icons
- Ethers.js for Web3

## 🎓 Learning Resources

- [React Docs](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS](https://tailwindcss.com)
- [Ethers.js](https://docs.ethers.org)