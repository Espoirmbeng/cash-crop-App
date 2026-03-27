-- AgriculNet — Seed default super admin account
-- Password: Admin@AgriculNet2025!
-- Hash generated with bcrypt 12 rounds — replace if needed
-- Run AFTER running all migration files

INSERT INTO users (
  id,
  role,
  status,
  first_name,
  last_name,
  phone,
  email,
  password_hash,
  phone_verified,
  email_verified,
  country
) VALUES (
  uuid_generate_v4(),
  'super_admin',
  'active',
  'AgriculNet',
  'Admin',
  '+237600000000',
  'admin@agriculnet.cm',
  '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQyCZmQjWCxQjQ3zEqyP4bIPW',
  TRUE,
  TRUE,
  'Cameroon'
) ON CONFLICT (email) DO NOTHING;

-- NOTE: The password hash above is for: Admin@AgriculNet2025!
-- IMPORTANT: Change this password immediately after first login
-- Generate a new hash with:
-- node -e "const b=require('bcryptjs');b.hash('YourNewPass',12).then(console.log)"
