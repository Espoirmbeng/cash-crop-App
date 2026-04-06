-- AgriculNet - profile extensions for richer onboarding fields

ALTER TABLE farmer_profiles
  ADD COLUMN IF NOT EXISTS primary_crop VARCHAR(120),
  ADD COLUMN IF NOT EXISTS harvest_volume VARCHAR(120),
  ADD COLUMN IF NOT EXISTS export_ready BOOLEAN,
  ADD COLUMN IF NOT EXISTS inspection_preference VARCHAR(160),
  ADD COLUMN IF NOT EXISTS payout_method VARCHAR(120),
  ADD COLUMN IF NOT EXISTS payout_account_name VARCHAR(160),
  ADD COLUMN IF NOT EXISTS payout_phone VARCHAR(30),
  ADD COLUMN IF NOT EXISTS notification_opt_in BOOLEAN DEFAULT true;

ALTER TABLE buyer_profiles
  ADD COLUMN IF NOT EXISTS destination_market VARCHAR(160);
