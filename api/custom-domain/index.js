/**
 * Vercel Serverless API - Custom Domain Management
 * Endpoints: GET/POST/DELETE /api/custom-domain
 */

import { Pool } from 'pg';
import crypto from 'crypto';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

export default async function handler(req, res) {
  if (req.method === 'GET') {
    return handleGetDomain(req, res);
  } else if (req.method === 'POST') {
    return handleAddDomain(req, res);
  } else if (req.method === 'DELETE') {
    return handleDeleteDomain(req, res);
  } else {
    return res.status(405).json({ error: 'Method not allowed' });
  }
}

async function handleGetDomain(req, res) {
  const cardId = req.query.cardId || req.url.split('/').pop();

  if (!cardId) {
    return res.status(400).json({ error: 'Card ID is required' });
  }

  try {
    const client = await pool.connect();
    
    try {
      const result = await client.query(
        `SELECT * FROM custom_domains WHERE card_id = $1`,
        [cardId]
      );

      if (result.rows.length === 0) {
        return res.status(200).json({ domain: null });
      }

      res.status(200).json({ domain: result.rows[0] });
    } finally {
      client.release();
    }
  } catch (error) {
    console.error('Error fetching custom domain:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function handleAddDomain(req, res) {
  const { cardId, domain } = req.body;

  if (!cardId || !domain) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  // Validate domain format
  const domainRegex = /^([a-z0-9]+(-[a-z0-9]+)*\.)+[a-z]{2,}$/i;
  if (!domainRegex.test(domain)) {
    return res.status(400).json({ error: 'Invalid domain format' });
  }

  try {
    const client = await pool.connect();
    
    try {
      // Check if domain already exists
      const existingDomain = await client.query(
        `SELECT id FROM custom_domains WHERE domain = $1`,
        [domain]
      );

      if (existingDomain.rows.length > 0) {
        return res.status(400).json({ error: 'Domain already in use' });
      }

      // Generate verification token
      const verificationToken = crypto.randomBytes(32).toString('hex');

      // Insert custom domain
      const result = await client.query(
        `INSERT INTO custom_domains (
          card_id, domain, verification_token, verified, dns_configured, ssl_enabled
        )
         VALUES ($1, $2, $3, false, false, false)
         RETURNING *`,
        [cardId, domain.toLowerCase(), verificationToken]
      );

      // Update digital_cards table
      await client.query(
        `UPDATE digital_cards
         SET custom_domain = $1, custom_domain_verified = false
         WHERE id = $2`,
        [domain, cardId]
      );

      res.status(201).json({ domain: result.rows[0] });
    } finally {
      client.release();
    }
  } catch (error) {
    console.error('Error adding custom domain:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function handleDeleteDomain(req, res) {
  const domainId = req.query.domainId || req.url.split('/').pop();

  if (!domainId) {
    return res.status(400).json({ error: 'Domain ID is required' });
  }

  try {
    const client = await pool.connect();
    
    try {
      // Get card_id before deletion
      const domainResult = await client.query(
        `SELECT card_id FROM custom_domains WHERE id = $1`,
        [domainId]
      );

      if (domainResult.rows.length === 0) {
        return res.status(404).json({ error: 'Domain not found' });
      }

      const cardId = domainResult.rows[0].card_id;

      // Delete custom domain
      await client.query(
        `DELETE FROM custom_domains WHERE id = $1`,
        [domainId]
      );

      // Update digital_cards table
      await client.query(
        `UPDATE digital_cards
         SET custom_domain = NULL, custom_domain_verified = false
         WHERE id = $1`,
        [cardId]
      );

      res.status(200).json({ success: true });
    } finally {
      client.release();
    }
  } catch (error) {
    console.error('Error deleting custom domain:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
