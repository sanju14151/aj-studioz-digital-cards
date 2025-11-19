/**
 * Vercel Serverless API - Get Card by Username
 * Endpoint: GET /api/cards/[username]
 */

import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

export default async function handler(req, res) {
  const { username } = req.query;

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (!username) {
    return res.status(400).json({ error: 'Username is required' });
  }

  try {
    const client = await pool.connect();
    
    try {
      // Get card data with proper column names
      const cardResult = await client.query(
        `SELECT id, user_id, username, name, full_name, role, company, bio, 
                email, phone, website, location, 
                profile_image_url as profile_image, 
                cover_image_url as cover_image,
                theme_id, is_active, is_published, created_at, updated_at
         FROM digital_cards
         WHERE username = $1 AND is_active = true`,
        [username]
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

      // Track view
      const userAgent = req.headers['user-agent'] || '';
      const visitorIp = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
      
      await client.query(
        `INSERT INTO card_views (card_id, visitor_ip, user_agent)
         VALUES ($1, $2, $3)`,
        [card.id, visitorIp, userAgent]
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
