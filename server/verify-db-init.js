#!/usr/bin/env node
/**
 * Database Initialization Verification Script
 * Checks if all required tables and migrations have been run
 */

require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY
);

const REQUIRED_TABLES = [
  'users',
  'farmer_profiles',
  'buyer_profiles',
  'tokens_and_otps',
  'listings',
  'listing_images',
  'inquiries',
  'conversations_messages',
  'orders',
  'payments',
  'inspections',
  'logistics',
  'export_documents',
  'disputes',
  'reviews',
  'notifications',
  'commissions',
  'saved_listings',
  'field_agents',
  'audit_logs',
  'profile_extensions'
];

async function verifyDatabase() {
  console.log('\n🔍 Verifying AgriculNet Database Initialization...\n');
  console.log('📡 Connecting to Supabase...');

  try {
    // Test connection
    const { data: connectionTest, error: connError } = await supabase
      .from('users')
      .select('count', { count: 'exact' })
      .limit(0);

    if (connError && connError.code === 'PGRST116') {
      console.log('❌ Database connection failed: Table "users" does not exist');
      console.log('   This means migrations have NOT been run.\n');
      return await reportMissingTables();
    }

    if (connError) {
      console.log(`❌ Database connection error: ${connError.message}`);
      return false;
    }

    console.log('✅ Connected to Supabase\n');

    // Check for tables
    console.log('📋 Checking for required tables...\n');

    const { data: tables, error: tablesError } = await supabase
      .from('information_schema.tables')
      .select('table_name')
      .eq('table_schema', 'public')
      .in('table_type', ['BASE TABLE', 'TABLE']);

    if (tablesError) {
      console.log(`⚠️  Could not fetch table list: ${tablesError.message}`);
      console.log('   Attempting alternative check...\n');
      return await checkTablesIndividually();
    }

    const existingTables = tables.map(t => t.table_name);
    let allExists = true;
    let missingTables = [];

    for (const table of REQUIRED_TABLES) {
      const exists = existingTables.some(t => 
        t === table || t === table.replace(/_/g, '_')
      );

      if (exists) {
        console.log(`  ✅ ${table}`);
      } else {
        console.log(`  ❌ ${table}`);
        allExists = false;
        missingTables.push(table);
      }
    }

    console.log('\n' + '='.repeat(60));

    if (allExists) {
      console.log('✅ DATABASE IS FULLY INITIALIZED');
      console.log('   All required tables exist');
      console.log('   You can proceed with testing the API\n');
      return true;
    } else {
      console.log(`❌ DATABASE IS INCOMPLETE`);
      console.log(`   Missing tables: ${missingTables.join(', ')}`);
      console.log('\n📝 Next steps:');
      console.log('   1. Open your Supabase dashboard');
      console.log('   2. Go to SQL Editor');
      console.log('   3. Run migration files in this order:');
      console.log('      - 001_enums_and_extensions.sql');
      console.log('      - 002_users_table.sql');
      console.log('      - 003_farmer_profiles.sql through 022_profile_extensions.sql');
      console.log('   4. Come back and run this script again\n');
      return false;
    }
  } catch (error) {
    console.log(`❌ Verification failed: ${error.message}\n`);
    console.log('Possible issues:');
    console.log('  • SUPABASE_URL is not set');
    console.log('  • SUPABASE_SERVICE_ROLE_KEY is not configured');
    console.log('  • Network connectivity issue\n');
    return false;
  }
}

async function checkTablesIndividually() {
  console.log('Checking tables individually...\n');
  let foundTables = [];
  let missingTables = [];

  for (const table of REQUIRED_TABLES) {
    try {
      const { error } = await supabase
        .from(table)
        .select('count', { count: 'exact' })
        .limit(0);

      if (!error) {
        console.log(`  ✅ ${table}`);
        foundTables.push(table);
      } else if (error.code === 'PGRST116') {
        console.log(`  ❌ ${table}`);
        missingTables.push(table);
      } else {
        console.log(`  ⚠️  ${table} (error: ${error.code})`);
      }
    } catch (e) {
      console.log(`  ❌ ${table}`);
      missingTables.push(table);
    }
  }

  console.log('\n' + '='.repeat(60));
  console.log(`Found: ${foundTables.length}/${REQUIRED_TABLES.length} tables\n`);

  if (missingTables.length === 0) {
    console.log('✅ DATABASE IS FULLY INITIALIZED\n');
    return true;
  } else {
    console.log(`❌ Missing ${missingTables.length} tables:\n   ${missingTables.join(', ')}\n`);
    return false;
  }
}

async function reportMissingTables() {
  console.log('⚠️  Core "users" table is missing\n');
  console.log('This indicates migrations have NOT been executed.\n');
  console.log('📝 To initialize the database:\n');
  console.log('1. Open Supabase Dashboard:');
  console.log('   https://app.supabase.com/projects\n');
  console.log('2. Select your project (jftggxxzqtmmqktvnlwc)\n');
  console.log('3. Go to SQL Editor in the left sidebar\n');
  console.log('4. For EACH migration file (in order):');
  console.log('   - Open: server/database/migrations/NNN_name.sql');
  console.log('   - Copy entire content');
  console.log('   - Paste into SQL Editor');
  console.log('   - Click "RUN" button\n');
  console.log('5. Start with: 001_enums_and_extensions.sql (REQUIRED FIRST)\n');
  console.log('6. Then run: 002_users_table.sql through 022_profile_extensions.sql\n');
  console.log('7. Run this verification script again to confirm\n');
  return false;
}

// Run verification
verifyDatabase()
  .then(success => {
    process.exit(success ? 0 : 1);
  })
  .catch(error => {
    console.error('Fatal error:', error);
    process.exit(1);
  });
