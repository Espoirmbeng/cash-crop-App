# AgriculNet Setup Guide

## Prerequisites
- Node.js v20+
- npm v9+
- Git
- Postman (for API testing)
- Supabase account (free tier works)

## 1. Clone Repository
```bash
git clone https://github.com/your-org/cash-crop-App.git
cd cash-crop-App
```

## 2. Configure Backend
```bash
cd server
cp .env.example .env
# Edit .env with your credentials
npm install
```

### Required environment variables in server/.env:
- `SUPABASE_URL` - From https://app.supabase.com → Project Settings → API
- `SUPABASE_ANON_KEY` - From Supabase dashboard
- `SUPABASE_SERVICE_ROLE_KEY` - From Supabase dashboard
- `JWT_ACCESS_SECRET` - Generate with: `node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"`
- `JWT_REFRESH_SECRET` - Generate another secret
- `SMTP_USER` - Gmail address
- `SMTP_PASS` - Gmail App Password
- `AT_API_KEY` - Africa's Talking API key
- `AT_USERNAME` - Africa's Talking username

## 3. Configure Frontend
```bash
cd ../client
cp .env.local.example .env.local
# Edit .env.local with your credentials
npm install
```

## 4. Set Up Supabase Database
1. Create project at https://app.supabase.com
2. Go to SQL Editor
3. Run migrations IN ORDER:
   - `001_enums_and_extensions.sql`
   - `002_users_table.sql`
   - `003_farmer_profiles.sql`
   - `004_buyer_profiles.sql`
   - `005_tokens_and_otps.sql`
   - `021_audit_logs.sql`
4. Run seed: `001_seed_admin.sql`

## 5. Run Development Servers
```bash
# Terminal 1 - Backend
cd server && npm run dev
# → http://localhost:5000

# Terminal 2 - Frontend
cd client && npm run dev
# → http://localhost:3000
```

## 6. Test API
1. Open Postman
2. Import: `postman/agriculnet_auth.postman_collection.json`
3. Import: `postman/agriculnet.postman_environment.json`
4. Select "AgriculNet Local" environment
5. Run requests from top to bottom

## 7. Default Admin Credentials
- **Email:** admin@agriculnet.cm
- **Password:** Admin@AgriculNet2025!
- **Login URL:** http://localhost:3000/admin-portal

**IMPORTANT:** Change this password immediately after first login!

## Supabase Project Info
- **Project URL:** https://jftggxxzqtmmqktvnlwc.supabase.co
- **Region:** eu-west-1
- **Status:** ACTIVE_HEALTHY

## Troubleshooting
- If npm install fails on Windows, use `cmd.exe /c npm install`
- If JWT secrets are missing, the server will refuse to start
- Check server logs in `server/logs/` directory
