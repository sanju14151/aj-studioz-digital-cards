/**
 * Database API Client
 * Provides methods to interact with the PostgreSQL database
 */

import pg from 'pg';

const { Pool } = pg;

// Get database URL from environment
const DATABASE_URL = import.meta.env.DATABASE_URL || 
  import.meta.env.POSTGRES_URL ||
  "postgresql://neondb_owner:npg_Dt6wy8QkPgpr@ep-sweet-hall-adk9pgvm-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require";

// Create a connection pool
const pool = new Pool({
  connectionString: DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

/**
 * Database API
 */
export const dbApi = {
  // Cards
  async getCards() {
    const result = await pool.query(`
      SELECT 
        dc.*,
        ct.name as theme_name,
        ct.primary_color,
        ct.secondary_color,
        ct.background_color,
        ct.layout_style
      FROM digital_cards dc
      LEFT JOIN card_themes ct ON dc.theme_id = ct.id
      WHERE dc.is_active = true
      ORDER BY dc.created_at DESC
    `);
    return result.rows;
  },

  async getCardByUsername(username) {
    const result = await pool.query(`
      SELECT 
        dc.*,
        ct.name as theme_name,
        ct.primary_color,
        ct.secondary_color,
        ct.background_color,
        ct.layout_style
      FROM digital_cards dc
      LEFT JOIN card_themes ct ON dc.theme_id = ct.id
      WHERE dc.username = $1 AND dc.is_active = true
    `, [username]);
    return result.rows[0];
  },

  async createCard(cardData) {
    const {
      user_id, username, full_name, role, bio, company,
      email, phone, location, website, profile_image_url,
      cover_image_url, theme_id
    } = cardData;

    const result = await pool.query(`
      INSERT INTO digital_cards (
        user_id, username, full_name, role, bio, company,
        email, phone, location, website, profile_image_url,
        cover_image_url, theme_id
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
      RETURNING *
    `, [
      user_id, username, full_name, role, bio, company,
      email, phone, location, website, profile_image_url,
      cover_image_url, theme_id
    ]);
    return result.rows[0];
  },

  async updateCard(cardId, cardData) {
    const fields = [];
    const values = [];
    let paramIndex = 1;

    Object.entries(cardData).forEach(([key, value]) => {
      if (value !== undefined) {
        fields.push(`${key} = $${paramIndex}`);
        values.push(value);
        paramIndex++;
      }
    });

    if (fields.length === 0) return null;

    values.push(cardId);
    const result = await pool.query(`
      UPDATE digital_cards
      SET ${fields.join(', ')}
      WHERE id = $${paramIndex}
      RETURNING *
    `, values);
    return result.rows[0];
  },

  async deleteCard(cardId) {
    await pool.query('DELETE FROM digital_cards WHERE id = $1', [cardId]);
  },

  async incrementViewCount(cardId) {
    await pool.query(`
      UPDATE digital_cards 
      SET view_count = view_count + 1 
      WHERE id = $1
    `, [cardId]);
  },

  // Social Links
  async getSocialLinks(cardId) {
    const result = await pool.query(`
      SELECT * FROM social_links 
      WHERE card_id = $1 
      ORDER BY display_order ASC
    `, [cardId]);
    return result.rows;
  },

  async createSocialLink(linkData) {
    const { card_id, platform, url, display_order } = linkData;
    const result = await pool.query(`
      INSERT INTO social_links (card_id, platform, url, display_order)
      VALUES ($1, $2, $3, $4)
      RETURNING *
    `, [card_id, platform, url, display_order || 0]);
    return result.rows[0];
  },

  async updateSocialLink(linkId, linkData) {
    const fields = [];
    const values = [];
    let paramIndex = 1;

    Object.entries(linkData).forEach(([key, value]) => {
      if (value !== undefined) {
        fields.push(`${key} = $${paramIndex}`);
        values.push(value);
        paramIndex++;
      }
    });

    if (fields.length === 0) return null;

    values.push(linkId);
    const result = await pool.query(`
      UPDATE social_links
      SET ${fields.join(', ')}
      WHERE id = $${paramIndex}
      RETURNING *
    `, values);
    return result.rows[0];
  },

  async deleteSocialLink(linkId) {
    await pool.query('DELETE FROM social_links WHERE id = $1', [linkId]);
  },

  // Themes
  async getThemes() {
    const result = await pool.query('SELECT * FROM card_themes ORDER BY created_at ASC');
    return result.rows;
  },

  async getTheme(themeId) {
    const result = await pool.query('SELECT * FROM card_themes WHERE id = $1', [themeId]);
    return result.rows[0];
  },

  // Analytics
  async trackView(viewData) {
    const { card_id, viewer_ip, viewer_country, viewer_device } = viewData;
    await pool.query(`
      INSERT INTO card_views (card_id, viewer_ip, viewer_country, viewer_device)
      VALUES ($1, $2, $3, $4)
    `, [card_id, viewer_ip, viewer_country, viewer_device]);
  },

  async trackClick(clickData) {
    const { card_id, click_type } = clickData;
    await pool.query(`
      INSERT INTO card_clicks (card_id, click_type)
      VALUES ($1, $2)
    `, [card_id, click_type]);
  },

  async getCardAnalytics(cardId) {
    const viewsResult = await pool.query(`
      SELECT 
        COUNT(*) as total_views,
        COUNT(DISTINCT viewer_ip) as unique_views
      FROM card_views 
      WHERE card_id = $1
    `, [cardId]);

    const clicksResult = await pool.query(`
      SELECT 
        click_type,
        COUNT(*) as count
      FROM card_clicks 
      WHERE card_id = $1
      GROUP BY click_type
    `, [cardId]);

    return {
      views: viewsResult.rows[0],
      clicks: clicksResult.rows
    };
  },

  // Users
  async createUser(userData) {
    const { email, full_name, password_hash, avatar_url } = userData;
    const result = await pool.query(`
      INSERT INTO users (email, full_name, password_hash, avatar_url)
      VALUES ($1, $2, $3, $4)
      RETURNING id, email, full_name, avatar_url, created_at
    `, [email, full_name, password_hash, avatar_url]);
    return result.rows[0];
  },

  async getUserByEmail(email) {
    const result = await pool.query(`
      SELECT * FROM users WHERE email = $1
    `, [email]);
    return result.rows[0];
  },

  async getProfile(userId) {
    const result = await pool.query(`
      SELECT * FROM profiles WHERE id = $1
    `, [userId]);
    return result.rows[0];
  },

  // Close pool connection
  async close() {
    await pool.end();
  }
};

export default dbApi;
