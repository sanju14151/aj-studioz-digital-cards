/**
 * Vercel Serverless API - Get User Cards with Analytics
 * Endpoint: GET /api/cards/user/[userId]
 */

import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

export default async function handler(req, res) {
  const { userId } = req.query;

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (!userId) {
    return res.status(400).json({ error: 'User ID is required' });
  }

  try {
    const client = await pool.connect();
    
    try {
      // Get all cards for the user
      const cardsResult = await client.query(
        `SELECT 
          id, user_id, username, full_name, role, company, bio,
          profile_image, cover_image, email, phone, website, location,
          theme_id, is_active, created_at, updated_at
         FROM digital_cards
         WHERE user_id = $1
         ORDER BY created_at DESC`,
        [userId]
      );

      const cards = cardsResult.rows;

      // Get analytics for each card
      const cardsWithStats = await Promise.all(
        cards.map(async (card) => {
          // Get views count
          const viewsResult = await client.query(
            `SELECT COUNT(*) as total_views,
                    COUNT(DISTINCT visitor_ip) as unique_visitors
             FROM card_views
             WHERE card_id = $1`,
            [card.id]
          );

          // Get clicks count (all click types)
          const clicksResult = await client.query(
            `SELECT COUNT(*) as total_clicks
             FROM card_clicks
             WHERE card_id = $1`,
            [card.id]
          );

          // Get saves count (contact downloads)
          const savesResult = await client.query(
            `SELECT COUNT(*) as total_saves
             FROM card_clicks
             WHERE card_id = $1 AND click_type = 'save_contact'`,
            [card.id]
          );

          return {
            ...card,
            stats: {
              views: parseInt(viewsResult.rows[0].total_views) || 0,
              uniqueVisitors: parseInt(viewsResult.rows[0].unique_visitors) || 0,
              clicks: parseInt(clicksResult.rows[0].total_clicks) || 0,
              saves: parseInt(savesResult.rows[0].total_saves) || 0,
            }
          };
        })
      );

      res.status(200).json({
        cards: cardsWithStats
      });
    } finally {
      client.release();
    }
  } catch (error) {
    console.error('Error fetching user cards:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
