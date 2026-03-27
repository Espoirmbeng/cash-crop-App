-- AgriculNet — Audit logs for all auth events

CREATE TABLE IF NOT EXISTS audit_logs (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id     UUID REFERENCES users(id) ON DELETE SET NULL,
  event       VARCHAR(100) NOT NULL,
  ip_address  INET,
  user_agent  TEXT,
  metadata    JSONB,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_audit_user_id  ON audit_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_audit_event    ON audit_logs(event);
CREATE INDEX IF NOT EXISTS idx_audit_created  ON audit_logs(created_at);
