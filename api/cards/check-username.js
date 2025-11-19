/**
 * Vercel Serverless API - Check Username Availability
 * Endpoint: POST /api/cards/check-username
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

  const { username } = req.body;

  if (!username) {
    return res.status(400).json({ error: 'Username is required' });
  }

  try {
    const client = await pool.connect();
    
    try {
      const result = await client.query(
        `SELECT id FROM digital_cards WHERE username = $1`,
        [username.toLowerCase()]
      );

      res.status(200).json({
        available: result.rows.length === 0,
        username: username.toLowerCase()
      });
    } finally {
      client.release();
    }
  } catch (error) {
    console.error('Check username error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
