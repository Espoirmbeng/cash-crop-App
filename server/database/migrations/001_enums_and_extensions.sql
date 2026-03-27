-- AgriculNet — Enums and PostgreSQL Extensions
-- Run this first in Supabase SQL editor

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "citext";

CREATE TYPE user_role AS ENUM (
  'farmer',
  'local_buyer',
  'international_buyer',
  'field_agent',
  'admin',
  'super_admin'
);

CREATE TYPE user_status AS ENUM (
  'pending_verification',
  'pending_review',
  'active',
  'suspended',
  'rejected',
  'deactivated'
);

CREATE TYPE buyer_type AS ENUM (
  'local',
  'international',
  'business_reseller'
);

CREATE TYPE otp_purpose AS ENUM (
  'phone_verification',
  'password_reset',
  'login_otp'
);

CREATE TYPE token_type AS ENUM (
  'email_verification',
  'password_reset',
  'refresh_token'
);

