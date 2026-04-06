# Step-by-Step: Running Migrations in Supabase

This guide shows EXACTLY what to do, screen by screen.

---

## Step 1: Sign Into Supabase

1. Go to: **https://app.supabase.com**
2. Sign in with your email
3. See your projects dashboard

---

## Step 2: Open Your Project

1. Find "AgriculNet" project (or your project name)
2. Click on it
3. You're now in the project dashboard

---

## Step 3: Open SQL Editor

1. Look at the **left sidebar**
2. Click **"SQL Editor"** (it has a code icon `</>`
3. You should see "Welcome to SQL Editor"

---

## Step 4: Create New Query

**Option A: Using the button**
1. Click **"New Query"** button (top right, green button)

**Option B: Using keyboard**
1. Press `Ctrl + K` (opens command palette)
2. Type "New query"
3. Press Enter

---

## Step 5: Paste First Migration (001)

1. Open file: `server/database/migrations/001_enums_and_extensions.sql`
2. Select ALL content (Ctrl+A)
3. Copy (Ctrl+C)
4. In Supabase SQL Editor, paste (Ctrl+V)
5. You should see SQL code in the editor

Example code you should see:
```sql
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "citext";

CREATE TYPE user_role AS ENUM (
  'farmer',
  'local_buyer',
  ...
);
```

---

## Step 6: Run the Migration

1. Look at bottom right of SQL Editor
2. Click the **"RUN"** button (blue button)
3. Wait 3-5 seconds
4. You should see: ✅ **"Success. No rows returned"**

✅ **Migration 001 is done!**

---

## Step 7: Create New Query for Migration 002

1. Click **"New Query"** again (or Ctrl+K)
2. This opens a fresh editor
3. Open file: `server/database/migrations/002_users_table.sql`
4. Copy and paste the content
5. Click **"RUN"**
6. Wait for success message

---

## Repeat for All Migrations

**For migrations 003 through 022:**

1. Click **"New Query"**
   ```
   (Ctrl+K > Type "New query" > Press Enter)
   ```

2. Open migration file
   ```
   e.g., 003_farmer_profiles.sql
   ```

3. Copy all content
   ```
   Ctrl+A to select all
   Ctrl+C to copy
   ```

4. Paste in Supabase
   ```
   Ctrl+V
   ```

5. Run the query
   ```
   Click blue "RUN" button
   ```

6. Check for success message ✅

7. Move to next migration

---

## Shortcut: Run Multiple at Once

If you want to skip the "new query" step:

1. After running migration 001, click in the editor
2. Select all text (Ctrl+A)
3. Delete it
4. Paste content from migration 002
5. Click RUN
6. Repeat

This saves time but mixing migrations in one query might make debugging harder if something fails.

---

## Verification: Check Tables Were Created

### Method 1: In Supabase Dashboard

1. Click **"Table Editor"** in left sidebar
2. You should see a list of tables
3. Look for:
   - ✅ users
   - ✅ farmer_profiles
   - ✅ buyer_profiles
   - ✅ tokens_and_otps
   - ✅ listings
   - ... and all others

If you see all tables → Success! 🎉

### Method 2: Run Verification Script

```bash
cd server
node verify-db-init.js
```

Should show:
```
✅ users
✅ farmer_profiles
... (all tables)

Found: 22/21 tables
✅ DATABASE IS FULLY INITIALIZED
```

---

## Troubleshooting

### Problem: "Permission denied"
**Cause**: Using wrong API key
**Fix**: Check you're running from server with `.env` configured

### Problem: "Extension already exists"
**Cause**: You ran migration 001 twice
**Fix**: This is safe to ignore! Move to next migration

### Problem: "Type already exists"
**Cause**: Enums from 001 already created
**Fix**: Also safe to ignore. Just run next migration

### Problem: "Table already exists"
**Cause**: Migration ran before
**Fix**: Check if table exists in Table Editor. If yes, skip to next migration

### Problem: "Something went wrong"
**Cause**: Could be several things
**Fix**: 
1. Check the exact error message in red
2. Screenshot it
3. Try re-running the same migration

---

## Timeline

- **First time**: ~20 minutes (reading + running 22 migrations)
- **With breaks**: ~30 minutes
- **Fast batch paste**: ~5 minutes
- **Total for whole setup**: ~1 hour from start to testing app

---

## What's Happening Behind the Scenes

Each SQL file creates:
- ✅ Tables (where data lives)
- ✅ Columns (data fields)
- ✅ Constraints (rules for valid data)
- ✅ Indexes (for fast queries)
- ✅ Triggers (automatic actions)

Migration 022 is the last one. After it:
- 22+ tables exist
- All relationships are set up
- Database is ready for your app

---

## Next Steps (After All Migrations)

Once you see ✅ on `node verify-db-init.js`:

### Start the servers:
```bash
# Terminal 1 - Backend
cd server
npm run dev

# Terminal 2 - Frontend  
cd client
npm run dev
```

### Test the app:
- Frontend: http://localhost:3000
- Try registration: http://localhost:3000/register/farmer
- API health: http://localhost:5000/api/health

---

## Tips & Tricks

💡 **Bookmark Supabase**: You'll be here a lot
💡 **Keep this guide open**: References migrations 001-022
💡 **One query per migration**: Easier to debug
💡 **Check Table Editor after each**: Verify table created
💡 **Copy file names**: Avoid typos in file selection

---

## Questions?

1. Check [`MIGRATION_GUIDE.md`](MIGRATION_GUIDE.md) for full details
2. Check [`QUICK_REFERENCE.md`](QUICK_REFERENCE.md) for checklist
3. Google the error message
4. Check Supabase docs: https://supabase.com/docs

---

**You've got this! 🚀**

Once you run all 22 migrations, your database is initialized and ready to accept data from the AgriculNet app!
