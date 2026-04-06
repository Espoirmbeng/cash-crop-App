# 📚 Database Migration Documentation Index

Choose your learning style below:

---

## ⚡ **Just Want to Get Started?**

Start here: **[`STEP_BY_STEP_GUIDE.md`](STEP_BY_STEP_GUIDE.md)**

Visual walkthrough showing exactly what buttons to click in Supabase.

**Time**: ~5 minutes to read + ~15 minutes to execute all migrations

---

## 🎯 **Need a Quick Checklist?**

See: **[`QUICK_REFERENCE.md`](QUICK_REFERENCE.md)**

- 30-second summary
- Printable checklist (copy-paste it)
- Quick verification steps
- Troubleshooting tips

**Best for**: Tracking progress while running migrations

---

## 📖 **Want Complete Details?**

Read: **[`MIGRATION_GUIDE.md`](MIGRATION_GUIDE.md)** ← Most comprehensive

Covers:
- ✅ Prerequisites
- ✅ What each migration does
- ✅ Different execution methods
- ✅ Detailed troubleshooting
- ✅ Verification steps
- ✅ Next steps after migrations

**Best for**: Understanding the full picture

---

## 🗂️ This Directory Structure

```
server/database/
├── migrations/                    # 22 SQL migration files (001-022)
│   └── (ordered by number)
├── MIGRATION_GUIDE.md            # 📖 Full comprehensive guide
├── QUICK_REFERENCE.md            # 🎯 Quick checklist
├── STEP_BY_STEP_GUIDE.md         # ⚡ Visual walkthrough
└── README.md                      # 📚 This file
```

---

## 🚀 Recommended Path

**If you've never done this before:**

1. Read [`STEP_BY_STEP_GUIDE.md`](STEP_BY_STEP_GUIDE.md) (5 min)
2. Print or copy [`QUICK_REFERENCE.md`](QUICK_REFERENCE.md) checklist
3. Open [`MIGRATION_GUIDE.md`](MIGRATION_GUIDE.md) in another tab for reference
4. Execute all 22 migrations (15-20 min)
5. Run verification: `node server/verify-db-init.js`

**If you just want to execute:**

1. Go to [`QUICK_REFERENCE.md`](QUICK_REFERENCE.md)
2. Follow the checklist

**If you want to understand everything:**

1. Read [`MIGRATION_GUIDE.md`](MIGRATION_GUIDE.md) fully
2. Then execute

---

## 📋 Migration Files

All files are in this directory: `server/database/migrations/`

| # | File | Purpose |
|---|------|---------|
| 1 | `001_enums_and_extensions.sql` | ⭐ PostgreSQL setup (MUST RUN FIRST) |
| 2 | `002_users_table.sql` | ⭐ Core user table (SECOND) |
| 3-22 | `NNN_*.sql` | Feature tables (in order) |

**Critical**: Run 001, then 002, then 003-022 in order!

---

## ✅ Execution Methods

### Option A: Step-by-Step (Recommended for first time)
- Run each migration individually
- Better debugging
- Takes longer
- See: [`STEP_BY_STEP_GUIDE.md`](STEP_BY_STEP_GUIDE.md)

### Option B: Batch All at Once (Fastest)
- Paste all 22 files into one SQL query
- Takes ~5 minutes
- Harder to debug if something breaks
- See: [`QUICK_REFERENCE.md`](QUICK_REFERENCE.md) → "Fastest Way"

### Option C: Small Batches (Balanced)
- Group 5 migrations per query
- Takes ~10 minutes
- Medium difficulty for debugging

---

## 🎯 What Happens

**Before migrations**: Database is empty
```
users table: ❌
farmer_profiles: ❌
orders: ❌
... nothing else exists
```

**After running all 22 migrations**: Complete operational database
```
users: ✅
farmer_profiles: ✅
buyer_profiles: ✅
tokens_and_otps: ✅
listings: ✅
orders: ✅
payments: ✅
... (18+ tables total)
```

**What you can do after**: 
- ✅ Create user accounts
- ✅ Verify phone/email
- ✅ List crops for sale
- ✅ Create buyer orders
- ✅ Process payments
- ✅ Everything!

---

## 🔍 How to Verify Success

### Quick Check: Run Verification Script

```bash
cd server
node verify-db-init.js
```

Should output:
```
✅ users
✅ farmer_profiles
... all tables ...

✅ DATABASE IS FULLY INITIALIZED
```

### Manual Check: In Supabase

1. Go to Supabase Dashboard
2. Click "Table Editor" in left sidebar
3. See all tables listed (22+ tables)

---

## 📍 Database Project Info

- **Platform**: Supabase
- **Database**: PostgreSQL 15+
- **Region**: Cameroon region preferred
- **Your Project URL**: https://jftggxxzqtmmqktvnlwc.supabase.co

---

## 🚨 Common Issues

| Issue | Solution |
|-------|----------|
| "Table already exists" | Normal if running twice. Either skip or see troubleshooting section in [`MIGRATION_GUIDE.md`](MIGRATION_GUIDE.md) |
| "Permission denied" | Check your `.env` has correct Supabase keys |
| "Extension not found" | Run migration 001 first |
| "Type does not exist" | Migration 001 didn't run properly |
| Migrations take too long | Supabase might be updating. Wait a moment and try again |

See [`MIGRATION_GUIDE.md` → Troubleshooting](MIGRATION_GUIDE.md#-troubleshooting) for detailed solutions.

---

## ⏱️ Time Breakdown

| Activity | Time |
|----------|------|
| Reading STEP_BY_STEP_GUIDE.md | 5 min |
| Running 22 migrations (step-by-step) | 15-20 min |
| Verification (verify-db-init.js) | 1-2 min |
| **Total** | **~25 minutes** |

If batch pasting all migrations: **~10 minutes total**

---

## 🎓 Learning Resources

- **Supabase SQL Editor**: https://supabase.com/docs/guides/database/sql-editor
- **PostgreSQL Enums**: https://www.postgresql.org/docs/current/datatype-enum.html
- **Database Design**: See `docs/database-schema.md` in project root

---

## 🆘 Need Help?

1. **Quick answer**: [`QUICK_REFERENCE.md`](QUICK_REFERENCE.md) → Troubleshooting
2. **Detailed help**: [`MIGRATION_GUIDE.md`](MIGRATION_GUIDE.md) → Troubleshooting section
3. **Visual help**: [`STEP_BY_STEP_GUIDE.md`](STEP_BY_STEP_GUIDE.md) → Troubleshooting
4. **Before you ask**: Check which migration number failed, and what the error message says

---

## ✨ After You're Done

Once database is initialized:

```bash
# Start the servers
cd server && npm run dev          # Terminal 1
cd client && npm run dev          # Terminal 2

# Test the app
open http://localhost:3000

# Try registration
http://localhost:3000/register/farmer
```

---

## 📞 Final Checklist

Before you start migrations:

- [ ] Have Supabase project open and logged in
- [ ] Have migration files locally (`server/database/migrations/`)
- [ ] Have this guide and STEP_BY_STEP_GUIDE open
- [ ] Have at least 30 minutes (or 10 if batch pasting)
- [ ] Internet connection is stable

---

## 🚀 Ready?

### Pick Your Path:

| I want to... | Go to... |
|-------------|----------|
| Get started quickly | [`STEP_BY_STEP_GUIDE.md`](STEP_BY_STEP_GUIDE.md) |
| Have a checklist | [`QUICK_REFERENCE.md`](QUICK_REFERENCE.md) |
| Understand everything | [`MIGRATION_GUIDE.md`](MIGRATION_GUIDE.md) |
| Find troubleshooting | [`MIGRATION_GUIDE.md#-troubleshooting`](MIGRATION_GUIDE.md#-troubleshooting) |

---

**Happy migrating! 🌱🚜 Your database is about to come alive!**

Questions? Each guide has a troubleshooting section. Start there!
