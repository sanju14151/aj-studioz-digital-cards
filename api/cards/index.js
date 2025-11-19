/**
 * Vercel Serverless API - Card Operations
 * Endpoint: POST /api/cards
 */

import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

export default async function handler(req, res) {
  if (req.method !== 'POST' && req.method !== 'PUT') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { userId, cardId, cardData, socialLinks } = req.body;

  if (!userId) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const client = await pool.connect();
    
    try {
      await client.query('BEGIN');

      let card;

      if (req.method === 'POST') {
        // Create new card
        const cardResult = await client.query(
          `INSERT INTO digital_cards (
            user_id, username, full_name, role, company, bio,
            profile_image, cover_image, email, phone, website, location,
            theme_id, is_active
          )
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
           RETURNING *`,
          [
            userId,
            cardData.username,
            cardData.fullName,
            cardData.role || null,
            cardData.company || null,
            cardData.bio || null,
            cardData.profileImage || null,
            cardData.coverImage || null,
            cardData.email || null,
            cardData.phone || null,
            cardData.website || null,
            cardData.location || null,
            cardData.themeId || null,
            true
          ]
        );
        card = cardResult.rows[0];

      } else if (req.method === 'PUT') {
        // Update existing card
        if (!cardId) {
          await client.query('ROLLBACK');
          return res.status(400).json({ error: 'Card ID is required for update' });
        }

        // Verify ownership
        const ownerCheck = await client.query(
          `SELECT id FROM digital_cards WHERE id = $1 AND user_id = $2`,
          [cardId, userId]
        );

        if (ownerCheck.rows.length === 0) {
          await client.query('ROLLBACK');
          return res.status(403).json({ error: 'Forbidden' });
        }

        const cardResult = await client.query(
          `UPDATE digital_cards
           SET full_name = $1, role = $2, company = $3, bio = $4,
               profile_image = $5, cover_image = $6, email = $7, phone = $8,
               website = $9, location = $10, theme_id = $11, updated_at = CURRENT_TIMESTAMP
           WHERE id = $12
           RETURNING *`,
          [
            cardData.fullName,
            cardData.role || null,
            cardData.company || null,
            cardData.bio || null,
            cardData.profileImage || null,
            cardData.coverImage || null,
            cardData.email || null,
            cardData.phone || null,
            cardData.website || null,
            cardData.location || null,
            cardData.themeId || null,
            cardId
          ]
        );
        card = cardResult.rows[0];
      }

      // Update social links if provided
      if (socialLinks && Array.isArray(socialLinks)) {
        // Delete existing social links
        await client.query('DELETE FROM social_links WHERE card_id = $1', [card.id]);

        // Insert new social links
        for (let i = 0; i < socialLinks.length; i++) {
          const link = socialLinks[i];
          if (link.url) {
            await client.query(
              `INSERT INTO social_links (card_id, platform, url, display_order)
               VALUES ($1, $2, $3, $4)`,
              [card.id, link.platform, link.url, i]
            );
          }
        }
      }

      await client.query('COMMIT');

      // Fetch updated social links
      const socialLinksResult = await client.query(
        `SELECT * FROM social_links
         WHERE card_id = $1
         ORDER BY display_order ASC`,
        [card.id]
      );

      res.status(req.method === 'POST' ? 201 : 200).json({
        card: card,
        socialLinks: socialLinksResult.rows
      });

    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  } catch (error) {
    console.error('Card operation error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
