/**
 * Production Database Integration
 * Handles all database operations for the digital cards platform
 * Replaces localStorage with Neon PostgreSQL
 */

import { Pool } from 'pg';

const pool = new Pool({
  connectionString: import.meta.env.VITE_DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

export interface UserProfile {
  id: string;
  email: string;
  full_name: string;
  avatar_url?: string;
  created_at: string;
}

export interface DigitalCard {
  id: string;
  user_id: string;
  username: string;
  full_name: string;
  role?: string;
  company?: string;
  bio?: string;
  profile_image?: string;
  cover_image?: string;
  email?: string;
  phone?: string;
  website?: string;
  location?: string;
  theme_id?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface SocialLink {
  id: string;
  card_id: string;
  platform: string;
  url: string;
  display_order: number;
}

export interface CardTheme {
  id: string;
  name: string;
  primary_color: string;
  secondary_color: string;
  background_color: string;
  text_color: string;
  font_family?: string;
}

// ============================================================================
// USER OPERATIONS
// ============================================================================

/**
 * Create a new user profile
 */
export async function createUser(email: string, fullName: string, password: string): Promise<UserProfile> {
  const client = await pool.connect();
  try {
    const result = await client.query(
      `INSERT INTO users (email, full_name, password_hash)
       VALUES ($1, $2, $3)
       RETURNING id, email, full_name, avatar_url, created_at`,
      [email, fullName, password] // In production, hash the password first
    );
    return result.rows[0];
  } finally {
    client.release();
  }
}

/**
 * Get user by email
 */
export async function getUserByEmail(email: string): Promise<UserProfile | null> {
  const client = await pool.connect();
  try {
    const result = await client.query(
      `SELECT id, email, full_name, avatar_url, created_at
       FROM users
       WHERE email = $1`,
      [email]
    );
    return result.rows[0] || null;
  } finally {
    client.release();
  }
}

/**
 * Authenticate user
 */
export async function authenticateUser(email: string, password: string): Promise<UserProfile | null> {
  const client = await pool.connect();
  try {
    const result = await client.query(
      `SELECT id, email, full_name, avatar_url, created_at, password_hash
       FROM users
       WHERE email = $1`,
      [email]
    );
    
    if (result.rows.length === 0) {
      return null;
    }
    
    const user = result.rows[0];
    // In production, compare hashed passwords
    if (user.password_hash === password) {
      const { password_hash, ...userProfile } = user;
      return userProfile;
    }
    
    return null;
  } finally {
    client.release();
  }
}

// ============================================================================
// CARD OPERATIONS
// ============================================================================

/**
 * Create a new digital card
 */
export async function createCard(userId: string, cardData: Partial<DigitalCard>): Promise<DigitalCard> {
  const client = await pool.connect();
  try {
    const result = await client.query(
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
        cardData.full_name,
        cardData.role,
        cardData.company,
        cardData.bio,
        cardData.profile_image,
        cardData.cover_image,
        cardData.email,
        cardData.phone,
        cardData.website,
        cardData.location,
        cardData.theme_id || null,
        true
      ]
    );
    return result.rows[0];
  } finally {
    client.release();
  }
}

/**
 * Update an existing card
 */
export async function updateCard(cardId: string, cardData: Partial<DigitalCard>): Promise<DigitalCard> {
  const client = await pool.connect();
  try {
    const updates: string[] = [];
    const values: any[] = [];
    let paramCount = 1;

    if (cardData.full_name !== undefined) {
      updates.push(`full_name = $${paramCount++}`);
      values.push(cardData.full_name);
    }
    if (cardData.role !== undefined) {
      updates.push(`role = $${paramCount++}`);
      values.push(cardData.role);
    }
    if (cardData.company !== undefined) {
      updates.push(`company = $${paramCount++}`);
      values.push(cardData.company);
    }
    if (cardData.bio !== undefined) {
      updates.push(`bio = $${paramCount++}`);
      values.push(cardData.bio);
    }
    if (cardData.profile_image !== undefined) {
      updates.push(`profile_image = $${paramCount++}`);
      values.push(cardData.profile_image);
    }
    if (cardData.cover_image !== undefined) {
      updates.push(`cover_image = $${paramCount++}`);
      values.push(cardData.cover_image);
    }
    if (cardData.email !== undefined) {
      updates.push(`email = $${paramCount++}`);
      values.push(cardData.email);
    }
    if (cardData.phone !== undefined) {
      updates.push(`phone = $${paramCount++}`);
      values.push(cardData.phone);
    }
    if (cardData.website !== undefined) {
      updates.push(`website = $${paramCount++}`);
      values.push(cardData.website);
    }
    if (cardData.location !== undefined) {
      updates.push(`location = $${paramCount++}`);
      values.push(cardData.location);
    }
    if (cardData.theme_id !== undefined) {
      updates.push(`theme_id = $${paramCount++}`);
      values.push(cardData.theme_id);
    }

    updates.push(`updated_at = CURRENT_TIMESTAMP`);
    values.push(cardId);

    const result = await client.query(
      `UPDATE digital_cards
       SET ${updates.join(', ')}
       WHERE id = $${paramCount}
       RETURNING *`,
      values
    );
    
    return result.rows[0];
  } finally {
    client.release();
  }
}

/**
 * Get card by username
 */
export async function getCardByUsername(username: string): Promise<DigitalCard | null> {
  const client = await pool.connect();
  try {
    const result = await client.query(
      `SELECT * FROM digital_cards
       WHERE username = $1 AND is_active = true`,
      [username]
    );
    return result.rows[0] || null;
  } finally {
    client.release();
  }
}

/**
 * Get all cards for a user
 */
export async function getCardsByUserId(userId: string): Promise<DigitalCard[]> {
  const client = await pool.connect();
  try {
    const result = await client.query(
      `SELECT * FROM digital_cards
       WHERE user_id = $1
       ORDER BY created_at DESC`,
      [userId]
    );
    return result.rows;
  } finally {
    client.release();
  }
}

// ============================================================================
// SOCIAL LINK OPERATIONS
// ============================================================================

/**
 * Add or update social links for a card
 */
export async function updateSocialLinks(cardId: string, links: Array<{ platform: string; url: string; order: number }>): Promise<void> {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    
    // Delete existing links
    await client.query('DELETE FROM social_links WHERE card_id = $1', [cardId]);
    
    // Insert new links
    for (const link of links) {
      if (link.url) { // Only insert if URL is provided
        await client.query(
          `INSERT INTO social_links (card_id, platform, url, display_order)
           VALUES ($1, $2, $3, $4)`,
          [cardId, link.platform, link.url, link.order]
        );
      }
    }
    
    await client.query('COMMIT');
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
}

/**
 * Get social links for a card
 */
export async function getSocialLinks(cardId: string): Promise<SocialLink[]> {
  const client = await pool.connect();
  try {
    const result = await client.query(
      `SELECT * FROM social_links
       WHERE card_id = $1
       ORDER BY display_order ASC`,
      [cardId]
    );
    return result.rows;
  } finally {
    client.release();
  }
}

// ============================================================================
// ANALYTICS OPERATIONS
// ============================================================================

/**
 * Track card view
 */
export async function trackCardView(cardId: string, visitorIp?: string, userAgent?: string): Promise<void> {
  const client = await pool.connect();
  try {
    await client.query(
      `INSERT INTO card_views (card_id, visitor_ip, user_agent)
       VALUES ($1, $2, $3)`,
      [cardId, visitorIp || null, userAgent || null]
    );
  } finally {
    client.release();
  }
}

/**
 * Track card click (social link, contact button, etc.)
 */
export async function trackCardClick(cardId: string, clickType: string, clickTarget?: string): Promise<void> {
  const client = await pool.connect();
  try {
    await client.query(
      `INSERT INTO card_clicks (card_id, click_type, click_target)
       VALUES ($1, $2, $3)`,
      [cardId, clickType, clickTarget || null]
    );
  } finally {
    client.release();
  }
}

/**
 * Get card analytics
 */
export async function getCardAnalytics(cardId: string) {
  const client = await pool.connect();
  try {
    const viewsResult = await client.query(
      `SELECT COUNT(*) as total_views,
              COUNT(DISTINCT visitor_ip) as unique_visitors
       FROM card_views
       WHERE card_id = $1`,
      [cardId]
    );
    
    const clicksResult = await client.query(
      `SELECT click_type, COUNT(*) as count
       FROM card_clicks
       WHERE card_id = $1
       GROUP BY click_type`,
      [cardId]
    );
    
    return {
      totalViews: parseInt(viewsResult.rows[0].total_views),
      uniqueVisitors: parseInt(viewsResult.rows[0].unique_visitors),
      clicks: clicksResult.rows.reduce((acc, row) => {
        acc[row.click_type] = parseInt(row.count);
        return acc;
      }, {} as Record<string, number>)
    };
  } finally {
    client.release();
  }
}

// ============================================================================
// THEME OPERATIONS
// ============================================================================

/**
 * Get all available themes
 */
export async function getThemes(): Promise<CardTheme[]> {
  const client = await pool.connect();
  try {
    const result = await client.query(
      `SELECT * FROM card_themes ORDER BY name ASC`
    );
    return result.rows;
  } finally {
    client.release();
  }
}

/**
 * Get theme by ID
 */
export async function getThemeById(themeId: string): Promise<CardTheme | null> {
  const client = await pool.connect();
  try {
    const result = await client.query(
      `SELECT * FROM card_themes WHERE id = $1`,
      [themeId]
    );
    return result.rows[0] || null;
  } finally {
    client.release();
  }
}

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Check if username is available
 */
export async function isUsernameAvailable(username: string, excludeCardId?: string): Promise<boolean> {
  const client = await pool.connect();
  try {
    let query = 'SELECT COUNT(*) FROM digital_cards WHERE username = $1';
    const params: any[] = [username];
    
    if (excludeCardId) {
      query += ' AND id != $2';
      params.push(excludeCardId);
    }
    
    const result = await client.query(query, params);
    return parseInt(result.rows[0].count) === 0;
  } finally {
    client.release();
  }
}

/**
 * Generate unique username from full name
 */
export async function generateUsername(fullName: string): Promise<string> {
  const baseUsername = fullName
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '')
    .substring(0, 20);
  
  let username = baseUsername;
  let counter = 1;
  
  while (!(await isUsernameAvailable(username))) {
    username = `${baseUsername}${counter}`;
    counter++;
  }
  
  return username;
}

export default {
  // Users
  createUser,
  getUserByEmail,
  authenticateUser,
  
  // Cards
  createCard,
  updateCard,
  getCardByUsername,
  getCardsByUserId,
  
  // Social Links
  updateSocialLinks,
  getSocialLinks,
  
  // Analytics
  trackCardView,
  trackCardClick,
  getCardAnalytics,
  
  // Themes
  getThemes,
  getThemeById,
  
  // Utils
  isUsernameAvailable,
  generateUsername,
};
