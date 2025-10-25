# 🔐 Smart Contracts

## 📋 Overview

Solidity smart contracts for NFT-based skill verification certificates.

## 🚀 Quick Start

### Setup

```bash
# Install dependencies
npm install

# Copy environment
cp .env.example .env
# Add your private key and RPC URL

# Compile contracts
npx hardhat compile
```

### Deploy

```bash
# Deploy to Sepolia
npx hardhat run scripts/deploy.js --network sepolia

# Deploy to Status Network
npx hardhat run scripts/deploy.js --network statusSepolia

# Deploy locally for testing
npx hardhat run scripts/deploy.js --network localhost
```

### Verify

```bash
# Verify on Etherscan
npx hardhat verify --network sepolia CONTRACT_ADDRESS

# Check verification
# Visit: https://sepolia.etherscan.io/address/CONTRACT_ADDRESS
```

## 📁 Structure

```
contracts/
├── contracts/
│   └── SkillNFT.sol      # Main NFT contract
├── scripts/
│   └── deploy.js         # Deployment script
├── test/
│   └── SkillNFT.test.js  # Unit tests
├── hardhat.config.js     # Hardhat configuration
└── package.json
```

## 📜 SkillNFT Contract

### Features

- **ERC721** standard NFT
- **Skill Verification** with scores (0-100)
- **Verifier System** - Only authorized verifiers can mint
- **On-chain Metadata** - All verification data stored
- **Updatable Scores** - Verifiers can update scores

### Main Functions

```solidity
// Mint new skill NFT
function mintSkill(
    address to,
    string memory skillName,
    string memory category,
    uint256 verificationScore,
    string memory metadataURI
) external returns (uint256)

// Update verification score
function updateVerificationScore(
    uint256 tokenId,
    uint256 newScore
) external

// Get skill details
function getSkill(uint256 tokenId) 
    external view returns (Skill memory)

// Get user's skills
function getUserSkills(address user) 
    external view returns (uint256[] memory)
```

### Events

```solidity
event SkillMinted(
    uint256 indexed tokenId,
    address indexed owner,
    string skillName,
    uint256 verificationScore
);

event SkillVerified(
    uint256 indexed tokenId,
    address indexed verifier,
    uint256 score
);
```

## 🔑 Access Control

### Owner Functions
- `addVerifier(address)` - Add new verifier
- `removeVerifier(address)` - Remove verifier

### Verifier Functions
- `mintSkill()` - Create new skill NFT
- `updateVerificationScore()` - Update scores

## 🧪 Testing

```bash
# Run all tests
npx hardhat test

# Run with gas report
REPORT_GAS=true npx hardhat test

# Run specific test
npx hardhat test test/SkillNFT.test.js
```

### Test Coverage

```bash
npm install --save-dev solidity-coverage
npx hardhat coverage
```

## 🌐 Networks

### Sepolia Testnet

```javascript
{
  url: "https://sepolia.infura.io/v3/YOUR_KEY",
  chainId: 11155111,
  accounts: [PRIVATE_KEY]
}
```

### Status Network Sepolia

```javascript
{
  url: "https://sepolia-rpc.status.network",
  chainId: 11155420,
  accounts: [PRIVATE_KEY]
}
```

### Local Hardhat

```bash
# Start local node
npx hardhat node

# Deploy to local
npx hardhat run scripts/deploy.js --network localhost
```

## 🔧 Configuration

### hardhat.config.js

```javascript
module.exports = {
  solidity: {
    version: "0.8.20",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  networks: {
    sepolia: { /* config */ },
    statusSepolia: { /* config */ }
  }
};
```

## 💰 Gas Optimization

- **Counters** library for token IDs
- **Packed storage** for Skill struct
- **Efficient mappings** for user skills
- **Optimized** for 200 runs

Average Gas Costs:
- Mint: ~150,000 gas
- Update Score: ~50,000 gas
- Transfer: ~80,000 gas

## 📦 Dependencies

```json
{
  "@openzeppelin/contracts": "^5.0.0",
  "hardhat": "^2.19.0",
  "@nomicfoundation/hardhat-toolbox": "^3.0.0"
}
```

## 🔐 Security

### Best Practices
- ✅ OpenZeppelin contracts
- ✅ Access control for minting
- ✅ Input validation
- ✅ Reentrancy protection
- ✅ Integer overflow protection (Solidity 0.8+)

### Audit Checklist
- [ ] External audit (recommended for mainnet)
- [ ] Slither analysis
- [ ] Mythril scan
- [ ] Manual review

## 🚢 Deployment Checklist

- [ ] Set correct RPC URL in .env
- [ ] Add private key with testnet ETH
- [ ] Compile contracts: `npx hardhat compile`
- [ ] Run tests: `npx hardhat test`
- [ ] Deploy: `npx hardhat run scripts/deploy.js --network sepolia`
- [ ] Save contract address
- [ ] Verify on Etherscan
- [ ] Update backend .env with address
- [ ] Test minting from backend

## 📊 Contract Interaction

### Using Ethers.js

```javascript
const contract = new ethers.Contract(
  CONTRACT_ADDRESS,
  ABI,
  signer
);

// Mint skill
const tx = await contract.mintSkill(
  userAddress,
  "Solidity",
  "blockchain",
  85,
  "ipfs://..."
);
await tx.wait();
```

### Using Web3.py (Python)

```python
from web3 import Web3

w3 = Web3(Web3.HTTPProvider(RPC_URL))
contract = w3.eth.contract(address=ADDRESS, abi=ABI)

# Mint skill
tx = contract.functions.mintSkill(
    user_address,
    "Solidity",
    "blockchain",
    85,
    "ipfs://..."
).build_transaction({
    'from': verifier_address,
    'nonce': w3.eth.get_transaction_count(verifier_address)
})
```

## 🐛 Troubleshooting

**Insufficient funds:**
- Get testnet ETH from faucet
- https://sepoliafaucet.com

**Contract not verified:**
```bash
npx hardhat verify --network sepolia ADDRESS
```

**Wrong network:**
- Check chainId in MetaMask
- Verify RPC URL is correct

**Compilation error:**
```bash
npx hardhat clean
npx hardhat compile
```

## 📝 Notes

- Uses ERC721 standard
- On-chain verification data
- Upgradeable scores
- Verifier whitelisting
- Event emission for indexing

## 🔗 Resources

- [Hardhat Docs](https://hardhat.org/docs)
- [OpenZeppelin](https://docs.openzeppelin.com/)
- [Solidity Docs](https://docs.soliditylang.org/)
- [Etherscan](https://sepolia.etherscan.io/)