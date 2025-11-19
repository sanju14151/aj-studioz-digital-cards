/**
 * Vercel Serverless API - Delete Card by ID
 * Endpoint: DELETE /api/cards/[cardId]
 */

import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

export default async function handler(req, res) {
  const { cardId } = req.query;

  if (req.method !== 'DELETE') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (!cardId) {
    return res.status(400).json({ error: 'Card ID is required' });
  }

  try {
    const client = await pool.connect();
    
    try {
      // Delete social links first (foreign key constraint)
      await client.query(
        'DELETE FROM social_links WHERE card_id = $1',
        [cardId]
      );

      // Delete analytics data
      await client.query(
        'DELETE FROM card_views WHERE card_id = $1',
        [cardId]
      );

      await client.query(
        'DELETE FROM card_clicks WHERE card_id = $1',
        [cardId]
      );

      // Delete the card
      const result = await client.query(
        'DELETE FROM digital_cards WHERE id = $1 RETURNING *',
        [cardId]
      );

      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Card not found' });
      }

      res.status(200).json({ 
        success: true,
        message: 'Card deleted successfully' 
      });
    } finally {
      client.release();
    }
  } catch (error) {
    console.error('Error deleting card:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
