/**
 * Vercel Serverless API - Track Card Clicks
 * Endpoint: POST /api/analytics/click
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

  const { cardId, clickType, clickTarget } = req.body;

  if (!cardId || !clickType) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const client = await pool.connect();
    
    try {
      await client.query(
        `INSERT INTO card_clicks (card_id, click_type, click_target)
         VALUES ($1, $2, $3)`,
        [cardId, clickType, clickTarget || null]
      );

      res.status(200).json({ success: true });
    } finally {
      client.release();
    }
  } catch (error) {
    console.error('Error tracking click:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
