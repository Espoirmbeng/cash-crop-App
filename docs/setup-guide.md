# AgriculNet Setup Guide

## Prerequisites
- Node.js 20+
- npm
- Supabase project access

## 1. Install Dependencies
```bash
cd client
cmd /c npm install

cd ../server
cmd /c npm install
```

## 2. Configure Environment Files
```bash
copy server\\.env.example server\\.env
copy client\\.env.local.example client\\.env.local
```

### Backend notes
- `SUPABASE_URL` and `SUPABASE_ANON_KEY` must be valid
- `SUPABASE_SERVICE_ROLE_KEY` should be set for full backend write access
- In development, the server can boot without SMTP, SMS, or Cloudinary credentials
- Development auth hints are controlled by:
  - `ALLOW_DEV_DELIVERY_FALLBACK=true`
  - `EXPOSE_DEV_AUTH_HINTS=true`

## 3. Run Supabase SQL Migrations
Run the files in `server/database/migrations/` in order from the Supabase SQL editor.

Important auth-related files:
- `001_enums_and_extensions.sql`
- `002_users_table.sql`
- `003_farmer_profiles.sql`
- `004_buyer_profiles.sql`
- `005_tokens_and_otps.sql`
- `021_audit_logs.sql`
- `022_profile_extensions.sql`

Then run:
- `server/database/seeds/001_seed_admin.sql`

## 4. Start Local Servers
```bash
# API
cd server
cmd /c npm start

# Frontend
cd ../client
cmd /c npm start
```

## 5. Local URLs
- Frontend: `http://localhost:3000`
- API health: `http://localhost:5000/api/health`
- Admin portal: `http://localhost:3000/admin-portal`

## 6. What Is Real vs Demo
- Real backend: `auth`, `admin-auth`
- Demo-backed frontend areas: buyer workspace, farmer workspace, admin operations, public marketplace content outside auth

## 7. Local Auth Testing
In development, registration, verification, forgot-password, and reset-password flows can surface browser-visible `devHints` when SMTP or SMS providers are not configured.

Typical local flow:
1. Register a buyer or farmer
2. Use the OTP shown in `devHints` on `/verify-phone`
3. Use the verification link shown in `devHints` on `/verify-email`
4. Sign in normally

## 8. Troubleshooting
- If `npm install` is slow on Windows, use `cmd /c npm install` and allow enough time for the client install to finish.
- If registration fails with missing profile columns, apply `022_profile_extensions.sql`.
- If the API starts but auth writes fail, verify that `SUPABASE_SERVICE_ROLE_KEY` is valid.
- Check `server/logs/error.log` for backend runtime failures.
