# Migration Quick Reference

**TL;DR version of database setup** - See [`MIGRATION_GUIDE.md`](MIGRATION_GUIDE.md) for full details

---

## 🚀 30-Second Summary

1. Open: https://app.supabase.com → Your Project → SQL Editor
2. For each file `001` through `022` in `server/database/migrations/`:
   - Copy file content
   - Paste into SQL Editor
   - Click RUN
3. Verify: `cd server && node verify-db-init.js`

---

## 📝 File Checklist

Copy-paste this to track your progress:

```
[ ] 001_enums_and_extensions.sql          ⭐ MUST RUN FIRST
[ ] 002_users_table.sql                   ⭐ SECOND
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

Verify: [ ] node verify-db-init.js ✅
```

---

## ⚡ Fastest Way

**Option: Batch Paste** (takes 3 minutes)

1. Open SQL Editor
2. Paste all migrations in one big query:

```sql
-- PASTE 001 CONTENT HERE

-- PASTE 002 CONTENT HERE

-- PASTE 003 CONTENT HERE
-- ... continue for all files
```

**Pros**: Faster ⚡
**Cons**: Hard to debug if one fails

---

## 🔍 Verification Command

```bash
cd server
node verify-db-init.js
```

**Expected output:**
```
✅ users
✅ farmer_profiles
✅ buyer_profiles
✅ tokens_and_otps
✅ listings
... (all 21 tables)
```

---

## 🆘 If Something Breaks

1. **Check the error message** in Supabase
2. **Screenshot it**
3. **Note which migration failed** (e.g., "Failed on 015_disputes.sql")
4. **Check previous migration** was successful
5. **Re-run the failed migration**

**Most common issue**: Running migrations out of order
**Solution**: Start from 001 again

---

## 💡 Pro Tips

- Keep Supabase tab open throughout
- Don't close browser mid-migration
- Migration files are in: `server/database/migrations/NNN_name.sql`
- Takes ~15 min first time, ~5 min after
- You can check progress in Supabase "Tables" section anytime

---

## ✅ All Done?

Once verification shows all ✅:

```bash
cd server && npm run dev           # Terminal 1
cd client && npm run dev           # Terminal 2
```

Visit: **http://localhost:3000**

Test registration: **http://localhost:3000/register/farmer**

---

**Questions?** See [`MIGRATION_GUIDE.md`](MIGRATION_GUIDE.md)
