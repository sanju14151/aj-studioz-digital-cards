/**
 * Create Test User for Authentication
 */

require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

async function createTestUser() {
  const client = await pool.connect();
  
  try {
    console.log('🔄 Creating test user...');

    // Check if test user exists
    const existingUser = await client.query(
      'SELECT id FROM users WHERE email = $1',
      ['test@ajstudioz.com']
    );

    if (existingUser.rows.length > 0) {
      console.log('✅ Test user already exists!');
      console.log('📧 Email: test@ajstudioz.com');
      console.log('🔑 Password: password123');
      return;
    }

    // Create test user
    const result = await client.query(
      `INSERT INTO users (email, full_name, password_hash)
       VALUES ($1, $2, $3)
       RETURNING id, email, full_name, created_at`,
      ['test@ajstudioz.com', 'Test User', 'password123']
    );

    console.log('✅ Test user created successfully!');
    console.log('📧 Email: test@ajstudioz.com');
    console.log('🔑 Password: password123');
    console.log('👤 User ID:', result.rows[0].id);
    
  } catch (error) {
    console.error('❌ Error creating test user:', error);
    throw error;
  } finally {
    client.release();
    await pool.end();
  }
}

createTestUser()
  .then(() => {
    console.log('✨ Done!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Failed:', error);
    process.exit(1);
  });
