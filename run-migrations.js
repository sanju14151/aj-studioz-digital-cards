/**
 * Database Migration Script
 * Runs SQL migrations on the Neon PostgreSQL database
 */

import pg from 'pg';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const { Client } = pg;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Database connection string from .env
const DATABASE_URL = "postgresql://neondb_owner:npg_Dt6wy8QkPgpr@ep-sweet-hall-adk9pgvm-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require";

async function runMigrations() {
  const client = new Client({
    connectionString: DATABASE_URL,
  });

  try {
    console.log('🔗 Connecting to database...');
    await client.connect();
    console.log('✅ Connected successfully!');

    // Read the migration file
    const migrationPath = path.join(__dirname, 'supabase', 'migrations', 'neon-migration.sql');
    console.log('📄 Reading migration file...');
    const migrationSQL = fs.readFileSync(migrationPath, 'utf8');

    // Run the migration
    console.log('🚀 Running migrations...');
    await client.query(migrationSQL);
    console.log('✅ Migrations completed successfully!');

    // Verify tables were created
    console.log('\n📊 Verifying database schema...');
    const result = await client.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      ORDER BY table_name;
    `);
    
    console.log('\n✅ Tables created:');
    result.rows.forEach(row => {
      console.log(`  - ${row.table_name}`);
    });

  } catch (error) {
    console.error('❌ Error running migrations:', error.message);
    console.error(error);
  } finally {
    await client.end();
    console.log('\n🔌 Database connection closed.');
  }
}

runMigrations();
