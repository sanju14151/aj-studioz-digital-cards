/**
 * Vercel Serverless API - Get Card by ID
 * Endpoint: GET /api/cards/by-id/[cardId]
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

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (!cardId) {
    return res.status(400).json({ error: 'Card ID is required' });
  }

  try {
    const client = await pool.connect();
    
    try {
      // Get card data with proper column aliases
      const cardResult = await client.query(
        `SELECT id, user_id, username, name, full_name, role, company, bio, 
                email, phone, website, location, 
                profile_image_url as profile_image, 
                cover_image_url as cover_image,
                theme_id, is_active, is_published, created_at, updated_at
         FROM digital_cards
         WHERE id = $1`,
        [cardId]
      );

      if (cardResult.rows.length === 0) {
        return res.status(404).json({ error: 'Card not found' });
      }

      const card = cardResult.rows[0];

      // Get social links
      const socialLinksResult = await client.query(
        `SELECT * FROM social_links
         WHERE card_id = $1
         ORDER BY display_order ASC`,
        [card.id]
      );

      res.status(200).json({
        card: card,
        socialLinks: socialLinksResult.rows
      });
    } finally {
      client.release();
    }
  } catch (error) {
    console.error('Error fetching card:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
