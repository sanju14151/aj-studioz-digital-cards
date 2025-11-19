/**
 * Database Migration - Add Industry Field and Custom Domain Support
 */

const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

async function runMigration() {
  const client = await pool.connect();
  
  try {
    console.log('Starting migration: Add industry field and custom domain support...');
    
    await client.query('BEGIN');

    // Add industry field to digital_cards
    console.log('Adding industry field to digital_cards...');
    await client.query(`
      ALTER TABLE digital_cards
      ADD COLUMN IF NOT EXISTS industry VARCHAR(100);
    `);

    // Add custom domain fields
    console.log('Adding custom domain support...');
    await client.query(`
      ALTER TABLE digital_cards
      ADD COLUMN IF NOT EXISTS custom_domain VARCHAR(255),
      ADD COLUMN IF NOT EXISTS custom_domain_verified BOOLEAN DEFAULT FALSE,
      ADD COLUMN IF NOT EXISTS custom_domain_verified_at TIMESTAMP;
    `);

    // Create custom domains table for better management
    console.log('Creating custom_domains table...');
    await client.query(`
      CREATE TABLE IF NOT EXISTS custom_domains (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        card_id UUID NOT NULL REFERENCES digital_cards(id) ON DELETE CASCADE,
        domain VARCHAR(255) NOT NULL UNIQUE,
        verified BOOLEAN DEFAULT FALSE,
        verification_token VARCHAR(255),
        verified_at TIMESTAMP,
        dns_configured BOOLEAN DEFAULT FALSE,
        ssl_enabled BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Create index for faster lookups
    await client.query(`
      CREATE INDEX IF NOT EXISTS idx_custom_domains_domain ON custom_domains(domain);
      CREATE INDEX IF NOT EXISTS idx_custom_domains_card_id ON custom_domains(card_id);
    `);

    // Add industry values as suggestions
    console.log('Adding industry suggestions...');
    await client.query(`
      CREATE TABLE IF NOT EXISTS industries (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL UNIQUE,
        icon VARCHAR(50),
        display_order INT DEFAULT 0
      );
    `);

    // Insert common industries
    const industries = [
      { name: 'Technology', icon: '💻', order: 1 },
      { name: 'Healthcare', icon: '🏥', order: 2 },
      { name: 'Finance', icon: '💰', order: 3 },
      { name: 'Education', icon: '📚', order: 4 },
      { name: 'Marketing', icon: '📢', order: 5 },
      { name: 'Real Estate', icon: '🏠', order: 6 },
      { name: 'Retail', icon: '🛍️', order: 7 },
      { name: 'Hospitality', icon: '🏨', order: 8 },
      { name: 'Entertainment', icon: '🎬', order: 9 },
      { name: 'Food & Beverage', icon: '🍽️', order: 10 },
      { name: 'Consulting', icon: '💼', order: 11 },
      { name: 'Creative', icon: '🎨', order: 12 },
      { name: 'Legal', icon: '⚖️', order: 13 },
      { name: 'Construction', icon: '🏗️', order: 14 },
      { name: 'Manufacturing', icon: '🏭', order: 15 },
      { name: 'Transportation', icon: '🚗', order: 16 },
      { name: 'Telecommunications', icon: '📱', order: 17 },
      { name: 'Media', icon: '📺', order: 18 },
      { name: 'Non-Profit', icon: '❤️', order: 19 },
      { name: 'Other', icon: '🔧', order: 20 }
    ];

    for (const industry of industries) {
      await client.query(`
        INSERT INTO industries (name, icon, display_order)
        VALUES ($1, $2, $3)
        ON CONFLICT (name) DO NOTHING
      `, [industry.name, industry.icon, industry.order]);
    }

    await client.query('COMMIT');
    console.log('✅ Migration completed successfully!');
    
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('❌ Migration failed:', error);
    throw error;
  } finally {
    client.release();
    await pool.end();
  }
}

runMigration()
  .then(() => {
    console.log('Migration script finished');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Migration script failed:', error);
    process.exit(1);
  });
