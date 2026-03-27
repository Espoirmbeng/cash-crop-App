# AgriculNet - Cash Crop Trading Platform

A modern agricultural trade marketplace connecting Cameroonian farmers with local and international buyers.

## Tech Stack

### Frontend
- **Next.js 14** (App Router)
- **Tailwind CSS** + **shadcn/ui**
- **React Hook Form** + **Zod** validation
- **Zustand** state management
- **Axios** HTTP client

### Backend
- **Node.js v20** + **Express.js v4**
- **Supabase** (PostgreSQL + Auth)
- **JWT** authentication
- **bcryptjs** password hashing
- **Joi** validation
- **Winston** logging

### Integrations
- **Africa's Talking** (SMS/OTP for Cameroon)
- **Nodemailer** (Email via Gmail SMTP)
- **Cloudinary** (Image uploads)

## Project Structure

```
cash-crop-App/
├── client/           # Next.js frontend
│   ├── src/app/      # App Router pages
│   ├── src/components/
│   └── src/store/    # Zustand stores
├── server/           # Express backend
│   ├── src/modules/  # API modules
│   ├── src/middleware/
│   └── src/utils/
├── postman/          # API testing
└── docs/             # Documentation
```

## Quick Start

```bash
# 1. Install dependencies
cd client && npm install
cd ../server && npm install

# 2. Configure environment
cp server/.env.example server/.env
cp client/.env.local.example client/.env.local

# 3. Run Supabase migrations (see docs/setup-guide.md)

# 4. Start development servers
cd server && npm run dev     # http://localhost:5000
cd client && npm run dev     # http://localhost:3000
```

## API Endpoints

### Authentication
- `POST /api/v1/auth/register/farmer` - Register farmer
- `POST /api/v1/auth/register/buyer` - Register buyer
- `POST /api/v1/auth/login` - Login
- `POST /api/v1/auth/logout` - Logout
- `POST /api/v1/auth/refresh-token` - Refresh access token
- `POST /api/v1/auth/verify-phone/send` - Send OTP
- `POST /api/v1/auth/verify-phone/confirm` - Verify phone
- `POST /api/v1/auth/verify-email` - Verify email
- `POST /api/v1/auth/forgot-password` - Request password reset
- `POST /api/v1/auth/reset-password` - Reset password
- `GET /api/v1/auth/me` - Get profile
- `PATCH /api/v1/auth/me` - Update profile

### Admin (Hidden Route)
- `POST /api/v1/x-secure/admin-access/authenticate` - Admin login

See [docs/setup-guide.md](docs/setup-guide.md) for detailed setup instructions.

## Default Credentials

**Admin Account:**
- Email: `admin@agriculnet.cm`
- Password: `Admin@AgriculNet2025!`
- URL: http://localhost:3000/admin-portal

## Supabase Database

**Project:** agriculnet
**URL:** https://jftggxxzqtmmqktvnlwc.supabase.co
**Region:** eu-west-1

Migrations located in `server/database/migrations/`.

## License
MIT License - See LICENSE file for details.
