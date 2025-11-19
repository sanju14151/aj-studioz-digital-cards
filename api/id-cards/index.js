/**
 * Vercel Serverless API - ID Cards Management
 * Endpoints: GET /api/id-cards/user/[userId], POST /api/id-cards
 */

import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

export default async function handler(req, res) {
  if (req.method === 'GET') {
    return handleGetIDCards(req, res);
  } else if (req.method === 'POST') {
    return handleCreateIDCard(req, res);
  } else {
    return res.status(405).json({ error: 'Method not allowed' });
  }
}

async function handleGetIDCards(req, res) {
  const userId = req.query.userId || req.url.split('/').pop();

  if (!userId) {
    return res.status(400).json({ error: 'User ID is required' });
  }

  try {
    const client = await pool.connect();
    
    try {
      const result = await client.query(
        `SELECT * FROM id_cards
         WHERE user_id = $1
         ORDER BY created_at DESC`,
        [userId]
      );

      res.status(200).json({ cards: result.rows });
    } finally {
      client.release();
    }
  } catch (error) {
    console.error('Error fetching ID cards:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function handleCreateIDCard(req, res) {
  const {
    userId,
    type,
    full_name,
    title,
    company,
    email,
    phone,
    website,
    profile_image,
    qr_data,
    youtube_channel_id,
    youtube_channel_name,
    youtube_subscribers,
    youtube_thumbnail,
    card_color
  } = req.body;

  if (!userId || !type || !full_name || !title || !qr_data) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const client = await pool.connect();
    
    try {
      // Create id_cards table if it doesn't exist
      await client.query(`
        CREATE TABLE IF NOT EXISTS id_cards (
          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
          user_id UUID NOT NULL,
          type VARCHAR(50) NOT NULL,
          full_name VARCHAR(255) NOT NULL,
          title VARCHAR(255) NOT NULL,
          company VARCHAR(255),
          email VARCHAR(255),
          phone VARCHAR(50),
          website VARCHAR(255),
          profile_image TEXT,
          qr_data TEXT NOT NULL,
          youtube_channel_id VARCHAR(255),
          youtube_channel_name VARCHAR(255),
          youtube_subscribers VARCHAR(50),
          youtube_thumbnail TEXT,
          card_color VARCHAR(50) DEFAULT '#D4AF37',
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `);

      const result = await client.query(
        `INSERT INTO id_cards (
          user_id, type, full_name, title, company, email, phone, website,
          profile_image, qr_data, youtube_channel_id, youtube_channel_name,
          youtube_subscribers, youtube_thumbnail, card_color
        )
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)
         RETURNING *`,
        [
          userId,
          type,
          full_name,
          title,
          company,
          email,
          phone,
          website,
          profile_image,
          qr_data,
          youtube_channel_id,
          youtube_channel_name,
          youtube_subscribers,
          youtube_thumbnail,
          card_color || '#D4AF37'
        ]
      );

      res.status(201).json({ card: result.rows[0] });
    } finally {
      client.release();
    }
  } catch (error) {
    console.error('Error creating ID card:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
