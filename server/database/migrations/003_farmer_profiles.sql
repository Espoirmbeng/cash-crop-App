-- AgriculNet — Farmer profiles (extends users where role='farmer')

CREATE TABLE IF NOT EXISTS farmer_profiles (
  id                    UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id               UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,

  farm_name             VARCHAR(200),
  cooperative_name      VARCHAR(200),
  farm_size_hectares    DECIMAL(10,2),
  farming_since_year    INTEGER,
  bio                   TEXT,
  crops_grown           TEXT[],

  id_document_url       VARCHAR(500),
  farm_document_url     VARCHAR(500),

  verified_by           UUID REFERENCES users(id),
  verified_at           TIMESTAMPTZ,
  rejection_reason      TEXT,

  total_listings        INTEGER NOT NULL DEFAULT 0,
  total_sales           INTEGER NOT NULL DEFAULT 0,
  average_rating        DECIMAL(3,2) NOT NULL DEFAULT 0.00,
  total_reviews         INTEGER NOT NULL DEFAULT 0,

  created_at            TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at            TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  UNIQUE(user_id)
);

CREATE TRIGGER farmer_profiles_updated_at
  BEFORE UPDATE ON farmer_profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
