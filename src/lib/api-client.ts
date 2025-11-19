/**
 * API Client for Serverless Functions
 * Calls Vercel API routes instead of direct database access
 */

const API_BASE = '/api';

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

// ============================================================================
// AUTHENTICATION
// ============================================================================

export async function authenticateUser(email: string, password: string): Promise<UserProfile> {
  const response = await fetch(`${API_BASE}/auth`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      action: 'login',
      email,
      password,
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Authentication failed');
  }

  const data = await response.json();
  return data.user;
}

export async function createUser(email: string, fullName: string, password: string): Promise<UserProfile> {
  const response = await fetch(`${API_BASE}/auth`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      action: 'signup',
      email,
      password,
      fullName,
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Signup failed');
  }

  const data = await response.json();
  return data.user;
}

export async function getUserByEmail(email: string): Promise<UserProfile | null> {
  // This would typically be a GET request, but for simplicity
  // we'll handle it through the same endpoint
  try {
    const response = await fetch(`${API_BASE}/auth`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        action: 'check',
        email,
      }),
    });

    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    return data.user || null;
  } catch (error) {
    return null;
  }
}

// ============================================================================
// CARD OPERATIONS
// ============================================================================

export async function getCardByUsername(username: string): Promise<DigitalCard | null> {
  try {
    const response = await fetch(`${API_BASE}/cards/${username}`, {
      method: 'GET',
    });

    if (!response.ok) {
      if (response.status === 404) {
        return null;
      }
      throw new Error('Failed to fetch card');
    }

    const data = await response.json();
    return data.card;
  } catch (error) {
    console.error('Error fetching card:', error);
    return null;
  }
}

export async function getSocialLinks(cardId: string): Promise<SocialLink[]> {
  try {
    // Social links are returned with the card data
    // This is a separate function for API compatibility
    const response = await fetch(`${API_BASE}/cards/by-id/${cardId}`, {
      method: 'GET',
    });

    if (!response.ok) {
      return [];
    }

    const data = await response.json();
    return data.socialLinks || [];
  } catch (error) {
    console.error('Error fetching social links:', error);
    return [];
  }
}

export async function createCard(userId: string, cardData: Partial<DigitalCard>, socialLinks?: Array<{platform: string; url: string}>): Promise<DigitalCard> {
  const response = await fetch(`${API_BASE}/cards`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      userId,
      cardData,
      socialLinks,
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to create card');
  }

  const data = await response.json();
  return data.card;
}

export async function updateCard(userId: string, cardId: string, cardData: Partial<DigitalCard>, socialLinks?: Array<{platform: string; url: string}>): Promise<DigitalCard> {
  const response = await fetch(`${API_BASE}/cards`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      userId,
      cardId,
      cardData,
      socialLinks,
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to update card');
  }

  const data = await response.json();
  return data.card;
}

// ============================================================================
// ANALYTICS (stub functions - views are tracked automatically)
// ============================================================================

export async function trackCardView(cardId: string, visitorIp?: string, userAgent?: string): Promise<void> {
  // Views are tracked automatically by the API when fetching cards
  // This is a stub function for API compatibility
  return Promise.resolve();
}

export async function trackCardClick(cardId: string, clickType: string, clickTarget?: string): Promise<void> {
  try {
    await fetch(`${API_BASE}/analytics/click`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        cardId,
        clickType,
        clickTarget,
      }),
    });
  } catch (error) {
    console.error('Error tracking click:', error);
  }
}

export async function getCardAnalytics(cardId: string) {
  try {
    const response = await fetch(`${API_BASE}/analytics/${cardId}`, {
      method: 'GET',
    });

    if (!response.ok) {
      return {
        totalViews: 0,
        uniqueVisitors: 0,
        clicks: {},
      };
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching analytics:', error);
    return {
      totalViews: 0,
      uniqueVisitors: 0,
      clicks: {},
    };
  }
}

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

export async function isUsernameAvailable(username: string, excludeCardId?: string): Promise<boolean> {
  try {
    const response = await fetch(`${API_BASE}/cards/check-username`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        excludeCardId,
      }),
    });

    const data = await response.json();
    return data.available || false;
  } catch (error) {
    return false;
  }
}

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
  // Auth
  authenticateUser,
  createUser,
  getUserByEmail,
  
  // Cards
  createCard,
  updateCard,
  getCardByUsername,
  getSocialLinks,
  
  // Analytics
  trackCardView,
  trackCardClick,
  getCardAnalytics,
  
  // Utils
  isUsernameAvailable,
  generateUsername,
};
