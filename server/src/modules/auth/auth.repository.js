const { supabaseAdmin } = require('../../config/supabase');

const findUserByPhone = async (phone) => {
  const { data, error } = await supabaseAdmin
    .from('users')
    .select('*')
    .eq('phone', phone)
    .single();
  if (error && error.code !== 'PGRST116') throw error;
  return data;
};

const findUserByEmail = async (email) => {
  const { data, error } = await supabaseAdmin
    .from('users')
    .select('*')
    .eq('email', email.toLowerCase())
    .single();
  if (error && error.code !== 'PGRST116') throw error;
  return data;
};

const findUserById = async (id) => {
  const { data, error } = await supabaseAdmin
    .from('users')
    .select('*')
    .eq('id', id)
    .single();
  if (error) throw error;
  return data;
};

const findUserByIdentifier = async (identifier) => {
  const phonePattern = /^\+237[0-9]{9}$/;
  if (phonePattern.test(identifier)) {
    return findUserByPhone(identifier);
  }
  return findUserByEmail(identifier);
};

const createUser = async (userData) => {
  const { data, error } = await supabaseAdmin
    .from('users')
    .insert(userData)
    .select()
    .single();
  if (error) throw error;
  return data;
};

const createFarmerProfile = async (userId, profileData) => {
  const { data, error } = await supabaseAdmin
    .from('farmer_profiles')
    .insert({ user_id: userId, ...profileData })
    .select()
    .single();
  if (error) throw error;
  return data;
};

const createBuyerProfile = async (userId, profileData) => {
  const { data, error } = await supabaseAdmin
    .from('buyer_profiles')
    .insert({ user_id: userId, ...profileData })
    .select()
    .single();
  if (error) throw error;
  return data;
};

const updateUser = async (id, updateData) => {
  const { data, error } = await supabaseAdmin
    .from('users')
    .update(updateData)
    .eq('id', id)
    .select()
    .single();
  if (error) throw error;
  return data;
};

const incrementFailedAttempts = async (id) => {
  const { data, error } = await supabaseAdmin
    .from('users')
    .update({ failed_login_attempts: supabaseAdmin.rpc('increment', { x: 1 }) })
    .eq('id', id)
    .select()
    .single();
  if (error) throw error;
  return data;
};

const resetFailedAttempts = async (id) => {
  const { data, error } = await supabaseAdmin
    .from('users')
    .update({ failed_login_attempts: 0, locked_until: null })
    .eq('id', id)
    .select()
    .single();
  if (error) throw error;
  return data;
};

const lockUserAccount = async (id, lockUntil) => {
  const { data, error } = await supabaseAdmin
    .from('users')
    .update({ locked_until: lockUntil })
    .eq('id', id)
    .select()
    .single();
  if (error) throw error;
  return data;
};

const updateLastLogin = async (id) => {
  const { data, error } = await supabaseAdmin
    .from('users')
    .update({
      last_login_at: new Date().toISOString(),
      login_count: supabaseAdmin.rpc('increment', { x: 1 })
    })
    .eq('id', id)
    .select()
    .single();
  if (error) throw error;
  return data;
};

const saveToken = async (tokenData) => {
  const { data, error } = await supabaseAdmin
    .from('tokens')
    .insert(tokenData)
    .select()
    .single();
  if (error) throw error;
  return data;
};

const findToken = async (tokenHash, type) => {
  const { data, error } = await supabaseAdmin
    .from('tokens')
    .select('*')
    .eq('token_hash', tokenHash)
    .eq('type', type)
    .is('used_at', null)
    .gt('expires_at', new Date().toISOString())
    .single();
  if (error && error.code !== 'PGRST116') throw error;
  return data;
};

const markTokenUsed = async (tokenId) => {
  const { data, error } = await supabaseAdmin
    .from('tokens')
    .update({ used_at: new Date().toISOString() })
    .eq('id', tokenId)
    .select()
    .single();
  if (error) throw error;
  return data;
};

const deleteUserTokens = async (userId, type) => {
  const { error } = await supabaseAdmin
    .from('tokens')
    .delete()
    .eq('user_id', userId)
    .eq('type', type);
  if (error) throw error;
};

const saveOtp = async (otpData) => {
  const { data, error } = await supabaseAdmin
    .from('otps')
    .insert(otpData)
    .select()
    .single();
  if (error) throw error;
  return data;
};

const findLatestOtp = async (userId, purpose) => {
  const { data, error } = await supabaseAdmin
    .from('otps')
    .select('*')
    .eq('user_id', userId)
    .eq('purpose', purpose)
    .is('verified_at', null)
    .order('created_at', { ascending: false })
    .limit(1)
    .single();
  if (error && error.code !== 'PGRST116') throw error;
  return data;
};

const incrementOtpAttempts = async (otpId) => {
  const { data, error } = await supabaseAdmin.rpc('increment_otp_attempts', { otp_id: otpId });
  if (error) throw error;
  return data;
};

const markOtpVerified = async (otpId) => {
  const { data, error } = await supabaseAdmin
    .from('otps')
    .update({ verified_at: new Date().toISOString() })
    .eq('id', otpId)
    .select()
    .single();
  if (error) throw error;
  return data;
};

const deleteUserOtps = async (userId, purpose) => {
  const { error } = await supabaseAdmin
    .from('otps')
    .delete()
    .eq('user_id', userId)
    .eq('purpose', purpose);
  if (error) throw error;
};

const logAuditEvent = async (userId, event, req, metadata = {}) => {
  const { error } = await supabaseAdmin
    .from('audit_logs')
    .insert({
      user_id: userId,
      event,
      ip_address: req.ip,
      user_agent: req.headers['user-agent'],
      metadata
    });
  if (error) console.error('Audit log error:', error);
};

const getFarmerProfile = async (userId) => {
  const { data, error } = await supabaseAdmin
    .from('farmer_profiles')
    .select('*')
    .eq('user_id', userId)
    .single();
  if (error && error.code !== 'PGRST116') throw error;
  return data;
};

const getBuyerProfile = async (userId) => {
  const { data, error } = await supabaseAdmin
    .from('buyer_profiles')
    .select('*')
    .eq('user_id', userId)
    .single();
  if (error && error.code !== 'PGRST116') throw error;
  return data;
};

module.exports = {
  findUserByPhone,
  findUserByEmail,
  findUserById,
  findUserByIdentifier,
  createUser,
  createFarmerProfile,
  createBuyerProfile,
  updateUser,
  incrementFailedAttempts,
  resetFailedAttempts,
  lockUserAccount,
  updateLastLogin,
  saveToken,
  findToken,
  markTokenUsed,
  deleteUserTokens,
  saveOtp,
  findLatestOtp,
  incrementOtpAttempts,
  markOtpVerified,
  deleteUserOtps,
  logAuditEvent,
  getFarmerProfile,
  getBuyerProfile
};
