# AgriculNet

AgriculNet is a cash-crop trading platform that connects Cameroonian farmers with local and international buyers.

## Stack
- Next.js 14 App Router frontend
- Tailwind CSS, React Hook Form, Zod, Zustand
- Express API with Supabase-backed auth
- Development SMS and email fallback hints for local auth testing

## Local Mode
- `auth` and `admin-auth` are wired to the backend
- Buyer, farmer, admin operations outside auth are demo-backed on the frontend
- This keeps the full browser experience previewable while unfinished backend domains stay explicit

## Quick Start
```bash
# Install dependencies on Windows
cd client && cmd /c npm install
cd ../server && cmd /c npm install

# Copy environment files
copy server\\.env.example server\\.env
copy client\\.env.local.example client\\.env.local

# Run Supabase migrations in order
# See docs/setup-guide.md

# Start the API
cd server && cmd /c npm start

# Start the frontend
cd ../client && cmd /c npm start
```

## URLs
- Frontend: `http://localhost:3000`
- API health: `http://localhost:5000/api/health`
- Admin portal: `http://localhost:3000/admin-portal`

## Database Setup

🚨 **IMPORTANT: You must run database migrations before testing!**

See detailed guide: [`server/database/MIGRATION_GUIDE.md`](server/database/MIGRATION_GUIDE.md)

### Quick Migration Steps

1. **Open Supabase SQL Editor**
   - Visit: https://app.supabase.com
   - Select your project (jftggxxzqtmmqktvnlwc)
   - Click "SQL Editor" in sidebar

2. **Run Migrations in Order (001-022)**
   - Open each file: `server/database/migrations/NNN_name.sql`
   - Copy entire content
   - Paste into SQL Editor and click "RUN"
   - Wait for success message before next migration

3. **Verify All Tables Created**
   ```bash
   cd server
   node verify-db-init.js
   # Should show all 22+ tables with ✅
   ```

### Migration Order (Critical!)
```
001_enums_and_extensions.sql        ← MUST RUN FIRST
002_users_table.sql                 ← SECOND
003_farmer_profiles.sql through
022_profile_extensions.sql          ← Then rest in order
```

**Why order matters**: Later migrations depend on earlier tables and enums being created.

### Current Status
✅ **Already Created by Supabase**:
- users
- farmer_profiles  
- buyer_profiles
- audit_logs

⏳ **Still Need to Create** (Migrations 005-020, 022):
- tokens_and_otps
- listings, listing_images
- inquiries, conversations_messages
- orders, payments, inspections
- logistics, export_documents, disputes
- reviews, notifications, commissions
- saved_listings, field_agents
- profile_extensions

If `022_profile_extensions.sql` has not been applied yet, local auth registration still works because the backend now falls back gracefully. Applying the migration enables full persistence of richer onboarding fields.

## Auth Smoke Test
The local buyer auth path was verified with:
1. Register buyer
2. Verify phone with devHints OTP

## Troubleshooting

### Database Errors
If you see "Relation does not exist" or table not found errors:
- You haven't run all migrations yet
- See [`server/database/MIGRATION_GUIDE.md`](server/database/MIGRATION_GUIDE.md)
- Run: `node server/verify-db-init.js` to check status

### API Connection Errors
```bash
# Check API is running
curl http://localhost:5000/api/health

# Check frontend can reach backend
# Should return: {"success": true, ...}
```

### Port Already in Use
```bash
# Check what's using port 5000
netstat -ano | findstr :5000

# Or use different port
PORT=5001 npm run dev
```

## Documentation
- **Database Setup**: [`server/database/MIGRATION_GUIDE.md`](server/database/MIGRATION_GUIDE.md) ← **START HERE**
- **API Reference**: [`docs/api-reference.md`](docs/api-reference.md)
- **Architecture**: [`docs/architecture.md`](docs/architecture.md)
- **Database Schema**: [`docs/database-schema.md`](docs/database-schema.md)
2. Verify phone with OTP
3. Verify email with token
4. Login and receive access and refresh tokens

## Notes
- Development hints for OTP and verification links are enabled in local development when delivery providers are not configured.
- Server logs are written to `server/logs/`.
