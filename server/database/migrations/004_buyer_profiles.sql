-- AgriculNet — Buyer profiles (extends users where role includes buyer)

CREATE TABLE IF NOT EXISTS buyer_profiles (
  id                    UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id               UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,

  buyer_type            buyer_type NOT NULL DEFAULT 'local',
  company_name          VARCHAR(200),
  business_reg_number   VARCHAR(100),
  website               VARCHAR(300),
  import_country        VARCHAR(100),
  preferred_crops       TEXT[],
  annual_import_volume  VARCHAR(100),
  business_doc_url      VARCHAR(500),

  verified_by           UUID REFERENCES users(id),
  verified_at           TIMESTAMPTZ,

  created_at            TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at            TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  UNIQUE(user_id)
);

CREATE TRIGGER buyer_profiles_updated_at
  BEFORE UPDATE ON buyer_profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
