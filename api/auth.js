/**
 * Vercel Serverless API - Authentication
 * Endpoint: POST /api/auth
 */

import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { action, email, password, fullName } = req.body;

  if (!action || !email || !password) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const client = await pool.connect();
    
    try {
      if (action === 'login') {
        // Authenticate user
        const result = await client.query(
          `SELECT id, email, full_name, avatar_url, created_at, password_hash
           FROM users
           WHERE email = $1`,
          [email]
        );

        if (result.rows.length === 0) {
          return res.status(401).json({ error: 'Invalid email or password' });
        }

        const user = result.rows[0];
        
        // In production, use bcrypt to compare passwords
        // For now, direct comparison (NOT SECURE - use bcrypt in production!)
        if (user.password_hash !== password) {
          return res.status(401).json({ error: 'Invalid email or password' });
        }

        // Return user without password
        const { password_hash, ...userProfile } = user;
        res.status(200).json({ user: userProfile });

      } else if (action === 'signup') {
        if (!fullName) {
          return res.status(400).json({ error: 'Full name is required' });
        }

        // Check if user exists
        const existingUser = await client.query(
          `SELECT id FROM users WHERE email = $1`,
          [email]
        );

        if (existingUser.rows.length > 0) {
          return res.status(400).json({ error: 'Email already registered' });
        }

        // Create new user (In production, hash the password with bcrypt!)
        const newUserResult = await client.query(
          `INSERT INTO users (email, full_name, password_hash)
           VALUES ($1, $2, $3)
           RETURNING id, email, full_name, avatar_url, created_at`,
          [email, fullName, password]
        );

        res.status(201).json({ user: newUserResult.rows[0] });

      } else {
        res.status(400).json({ error: 'Invalid action' });
      }
    } finally {
      client.release();
    }
  } catch (error) {
    console.error('Auth error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
