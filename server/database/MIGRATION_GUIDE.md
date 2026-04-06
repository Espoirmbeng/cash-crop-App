# AgriculNet Database Migration Guide

Complete step-by-step instructions for initializing the AgriculNet database using Supabase SQL migrations.

---

## 📋 Prerequisites

Before you start, ensure you have:

- ✅ A [Supabase account](https://supabase.com) (free tier works fine)
- ✅ Access to your AgriculNet Supabase project
- ✅ Your Supabase project URL and API keys (in `.env` file)
- ✅ Clone of this repository with migration files

**Your Supabase Project:**
- **URL**: https://jftggxxzqtmmqktvnlwc.supabase.co
- **Project ID**: jftggxxzqtmmqktvnlwc

---

## 🚀 Quick Start: Run All Migrations in 5 Minutes

### Option A: Using Supabase Dashboard (Recommended)

#### Step 1: Open Supabase SQL Editor

1. Go to [https://app.supabase.com](https://app.supabase.com)
2. Sign in with your credentials
3. Select your AgriculNet project
4. Click **SQL Editor** in the left sidebar

![image](https://via.placeholder.com/400x200?text=SQL+Editor+Location)

#### Step 2: Create New Query

1. Click **New Query** button (top right)
2. Copy and paste migration code (see below)
3. Click **RUN** button

#### Step 3: Execute Migrations in Order

**⚠️ CRITICAL: Run migrations in this exact order!**

---

## 📁 Migration Files & Execution Order

| Order | File | Description | Status |
|-------|------|-------------|--------|
| 1️⃣ | `001_enums_and_extensions.sql` | PostgreSQL extensions & enum types | **REQUIRED FIRST** |
| 2️⃣ | `002_users_table.sql` | Core users & authentication table | **REQUIRED SECOND** |
| 3️⃣ | `003_farmer_profiles.sql` | Farmer profile information | Required |
| 4️⃣ | `004_buyer_profiles.sql` | Buyer profile information | Required |
| 5️⃣ | `005_tokens_and_otps.sql` | Email tokens & OTP storage | Required |
| 6️⃣ | `006_listings.sql` | Agricultural product listings | Required |
| 7️⃣ | `007_listing_images.sql` | Listing image management | Required |
| 8️⃣ | `008_inquiries.sql` | Buyer inquiries | Required |
| 9️⃣ | `009_conversations_messages.sql` | Chat & messaging system | Required |
| 🔟 | `010_orders.sql` | Purchase orders | Required |
| 1️⃣1️⃣ | `011_payments.sql` | Payment tracking | Required |
| 1️⃣2️⃣ | `012_inspections.sql` | Product inspections | Required |
| 1️⃣3️⃣ | `013_logistics.sql` | Shipping & logistics | Required |
| 1️⃣4️⃣ | `014_export_documents.sql` | Export paperwork | Required |
| 1️⃣5️⃣ | `015_disputes.sql` | Trade disputes | Required |
| 1️⃣6️⃣ | `016_reviews.sql` | User reviews & ratings | Required |
| 1️⃣7️⃣ | `017_notifications.sql` | User notifications | Required |
| 1️⃣8️⃣ | `018_commissions.sql` | Platform commissions | Required |
| 1️⃣9️⃣ | `019_saved_listings.sql` | Saved listings | Required |
| 2️⃣0️⃣ | `020_field_agents.sql` | Field agent profiles | Required |
| 2️⃣1️⃣ | `021_audit_logs.sql` | System audit trail | Required |
| 2️⃣2️⃣ | `022_profile_extensions.sql` | Additional profile fields | Required |

---

## 📝 Step-by-Step Migration Process

### Step 1: Run Migration 001 (Enums & Extensions)

**File**: `001_enums_and_extensions.sql`

1. Open Supabase SQL Editor
2. Click **New Query**
3. Open file: `server/database/migrations/001_enums_and_extensions.sql`
4. Copy entire content
5. Paste into SQL Editor
6. Click **RUN** button
7. Wait for success message: `Success. No rows returned`

**What it does:**
- Enables PostgreSQL extensions (`uuid-ossp`, `citext`)
- Creates user role enums (farmer, buyer, admin, etc.)
- Creates status enums (pending_verification, active, suspended, etc.)
- Creates OTP purpose and token type enums

✅ **Expected output**: Green checkmark with "Success"

---

### Step 2: Run Migration 002 (Users Table)

**File**: `002_users_table.sql`

1. Click **New Query** (create fresh query)
2. Open file: `server/database/migrations/002_users_table.sql`
3. Copy entire content
4. Paste into SQL Editor
5. Click **RUN**
6. Verify: Check "Tables" section in left sidebar, you should see `users` table

**What it does:**
- Creates the core `users` table
- Adds phone and email verification columns
- Creates indexes for performance
- Sets up automatic `updated_at` trigger

✅ **Expected output**: Green success message

---

### Step 3-22: Run Remaining Migrations

Repeat the same process for files **003 through 022**:

1. Click **New Query**
2. Open migration file
3. Copy content
4. Paste into editor
5. Click **RUN**
6. Verify success before moving to next

**Batch Running (Faster Method):**

You can run multiple migration files in one query by concatenating them:

```sql
-- Copy content from 003_farmer_profiles.sql
[PASTE 003 CONTENT HERE]

-- Then append 004, 005, etc.
[PASTE 004 CONTENT HERE]
[PASTE 005 CONTENT HERE]
```

⚠️ **Note**: Batch running can make debugging harder if one fails. Recommend running individually.

---

## ✅ Verification: Confirm All Tables Created

### Method 1: Using Supabase Dashboard

1. Go to **Table Editor** in left sidebar
2. You should see all 22+ tables:
   - users
   - farmer_profiles
   - buyer_profiles
   - tokens_and_otps
   - listings
   - listing_images
   - inquiries
   - conversations_messages
   - orders
   - payments
   - inspections
   - logistics
   - export_documents
   - disputes
   - reviews
   - notifications
   - commissions
   - saved_listings
   - field_agents
   - audit_logs
   - profile_extensions

### Method 2: Using Verification Script

From your project root:

```bash
cd server
node verify-db-init.js
```

**Expected output:**
```
🔍 Verifying AgriculNet Database Initialization...

📡 Connecting to Supabase...
✅ Connected to Supabase

📋 Checking for required tables...

  ✅ users
  ✅ farmer_profiles
  ✅ buyer_profiles
  ✅ tokens_and_otps
  ✅ listings
  ... (all other tables)

============================================================
✅ DATABASE IS FULLY INITIALIZED
   All required tables exist
   You can proceed with testing the API
```

---

## 🔍 Checking Individual Table Structure

To verify a specific table was created correctly:

1. Go to **Table Editor**
2. Click the table name (e.g., `users`)
3. Check columns and data types

**Example: Users Table Should Have:**
- `id` (uuid, primary key)
- `role` (user_role enum)
- `status` (user_status enum)
- `first_name` (text)
- `last_name` (text)
- `phone` (text, unique)
- `email` (citext, unique)
- `password_hash` (text)
- `phone_verified` (boolean)
- `email_verified` (boolean)
- `created_at` (timestamp)
- `updated_at` (timestamp)
- ... and more

---

## 🚨 Troubleshooting

### Problem: "Permission denied" error

**Cause**: Using anon key instead of service role key

**Solution**:
1. Go to **Settings** → **API**
2. Scroll to "Project API keys"
3. Copy **Service Role key** (secret)
4. Update your `.env` file:
   ```
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
   ```

---

### Problem: "Extension already exists" error

**Cause**: Extensions already created from previous run

**Solution**: This is normal! You can safely ignore it. Extensions are idempotent (safe to recreate).

---

### Problem: "Type already exists" error

**Cause**: Enums from migration 001 already created

**Solution**: Also normal. Enums are safe to recreate.

---

### Problem: "Table already exists" error

**Cause**: You accidentally ran the same migration twice

**Solution**: 
1. Check **Table Editor** to see if table exists
2. If it does, skip to next migration
3. If you need to restart: Delete the project and create new one

---

### Problem: Migration hangs or times out

**Cause**: Supabase SQL editor timeout (usually >5 minutes)

**Solution**:
1. Wait a moment, then refresh the page
2. Check if the table was created anyway
3. Run verification script: `node verify-db-init.js`
4. If table exists, move to next migration

---

### Problem: "Relation does not exist" error

**Cause**: Running migrations out of order

**Solution**: 
1. Check which migration failed
2. Verify all earlier migrations (001-XXX) were successful
3. Re-run the migration that failed

---

## 📞 Support & Getting Help

If migrations fail:

1. **Check the exact error message** in Supabase
2. **Screenshot the error**
3. **Note which migration failed**
4. Check [Supabase Docs](https://supabase.com/docs)
5. Or ask in AgriculNet project chat

---

## 🎯 What's Next After Migrations?

Once all migrations complete:

### 1. Start the Application

```bash
# Terminal 1: Start backend
cd server
npm install
npm run dev

# Terminal 2: Start frontend
cd client
npm install
npm run dev
```

### 2. Test Authentication

Visit: **http://localhost:3000/register/farmer**

- Fill in registration form
- Should create a user in the `users` table
- Should create farmer profile in `farmer_profiles` table

### 3. Verify API Works

```bash
# Test API health
curl http://localhost:5000/api/health

# Response should be:
# {"success": true, "message": "AgriculNet API is running", ...}
```

---

## 📊 Migration Checklist

Use this checklist to track your progress:

```
[ ] 001_enums_and_extensions.sql
[ ] 002_users_table.sql
[ ] 003_farmer_profiles.sql
[ ] 004_buyer_profiles.sql
[ ] 005_tokens_and_otps.sql
[ ] 006_listings.sql
[ ] 007_listing_images.sql
[ ] 008_inquiries.sql
[ ] 009_conversations_messages.sql
[ ] 010_orders.sql
[ ] 011_payments.sql
[ ] 012_inspections.sql
[ ] 013_logistics.sql
[ ] 014_export_documents.sql
[ ] 015_disputes.sql
[ ] 016_reviews.sql
[ ] 017_notifications.sql
[ ] 018_commissions.sql
[ ] 019_saved_listings.sql
[ ] 020_field_agents.sql
[ ] 021_audit_logs.sql
[ ] 022_profile_extensions.sql

[ ] Run: node verify-db-init.js (All tables should show ✅)
[ ] Start backend server: npm run dev (in server/)
[ ] Start frontend server: npm run dev (in client/)
[ ] Test registration at http://localhost:3000/register/farmer
```

---

## 💡 Pro Tips

1. **Keep tab open**: Don't close Supabase tab while running migrations
2. **One at a time**: Run migrations individually (easier debugging)
3. **Always verify**: Check table existence after each migration
4. **Copy migration names**: Avoid typos by copying file names
5. **Check timestamps**: New tables show in Table Editor immediately after success
6. **Bookmark SQL Editor**: You'll be here a lot during development

---

## 📚 Additional Resources

- [Supabase SQL Editor Guide](https://supabase.com/docs/guides/database/sql-editor)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [UUID Extension](https://www.postgresql.org/docs/current/uuid-ossp.html)
- [CITEXT Type](https://www.postgresql.org/docs/current/citext.html)

---

## ✨ Estimated Time

- **First-time**: ~15-20 minutes (reading + running all migrations)
- **Subsequent runs**: ~5-10 minutes
- **Verification**: ~2-3 minutes

---

**Good luck! 🚀 Once migrations complete, your AgriculNet platform is ready to use!**

If you have questions, refer back to this guide or check the migration files themselves for comments.
