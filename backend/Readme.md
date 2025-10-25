# 🔧 Backend - Django REST API

## 📋 Overview

Django REST Framework backend providing API for skill verification and NFT minting.

## 🚀 Quick Start

### Local Development

```bash
# Create virtual environment
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Setup environment
cp .env.example .env
# Edit .env with your keys

# Run migrations
python manage.py makemigrations
python manage.py migrate

# Create superuser
python manage.py createsuperuser

# Run server
python manage.py runserver
```

### Docker

```bash
# Build image
docker build -t cryptoskill-backend .

# Run container
docker run -p 8000:8000 --env-file .env cryptoskill-backend
```

## 📁 Structure

```
backend/
├── config/           # Django settings
├── skills/          # Main app
│   ├── models.py    # Database models
│   ├── serializers.py
│   ├── views.py     # API endpoints
│   ├── urls.py
│   └── web3_service.py  # Blockchain integration
├── manage.py
└── requirements.txt
```

## 🔌 API Endpoints

### Skills
- `GET /api/skills/` - List all skills
- `POST /api/skills/` - Create skill (admin)
- `GET /api/skills/{id}/` - Get skill details

### Verifications
- `GET /api/verifications/` - List verifications
- `POST /api/verifications/` - Submit verification
- `POST /api/verifications/{id}/verify/` - Approve & mint NFT
- `GET /api/verifications/?user_address=0x...` - Filter by user

### Profiles
- `GET /api/profiles/{wallet_address}/` - User profile
- `GET /api/profiles/{wallet_address}/verifications/` - User's skills

## 🔑 Environment Variables

```env
DEBUG=True
SECRET_KEY=your-secret-key
DATABASE_URL=postgresql://user:pass@localhost:5432/db
WEB3_PROVIDER_URI=https://sepolia.infura.io/v3/YOUR_KEY
CONTRACT_ADDRESS=0x...
PRIVATE_KEY=0x...
```

## 🗃️ Database Models

### Skill
- name, category, description
- Categories: programming, design, blockchain, marketing, data_science

### SkillVerification
- user_address, skill, proof_data
- status: pending, verified, rejected
- verification_score (0-100)
- token_id, tx_hash

### UserProfile
- wallet_address, username, bio
- total_verifications, average_score

## 🧪 Testing

```bash
# Run tests
python manage.py test

# Create test data
python manage.py shell
>>> from skills.models import Skill
>>> Skill.objects.create(name="Test", category="programming", description="Test skill")
```

## 🔐 Admin Panel

Access at: `http://localhost:8000/admin`

- Create/edit skills
- Review verifications
- Manage users
- View statistics

## 📦 Deployment

### Production Settings

```python
DEBUG = False
ALLOWED_HOSTS = ['yourdomain.com']
DATABASES = {
    'default': dj_database_url.config()
}
```

### Railway/Render

```bash
# Push to GitHub
git push origin main

# Deploy on Railway
railway up

# Set environment variables in dashboard
```

## 🛠️ Development

```bash
# Install dev dependencies
pip install black flake8 pytest-django

# Format code
black .

# Lint
flake8 .

# Make migrations after model changes
python manage.py makemigrations
python manage.py migrate
```

## 📝 Notes

- Uses SQLite for development, PostgreSQL for production
- Web3.py for blockchain integration
- CORS enabled for frontend
- JWT authentication ready (optional)

## 🐛 Troubleshooting

**Migrations error:**
```bash
python manage.py migrate --run-syncdb
```

**Port already in use:**
```bash
python manage.py runserver 8001
```

**Web3 connection:**
- Check RPC URL is correct
- Verify private key format
- Ensure contract is deployed