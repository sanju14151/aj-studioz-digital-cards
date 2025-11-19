/**
 * Authentication Context for production-ready authentication
 * Integrates with PostgreSQL database via API
 */

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

interface User {
  id: string;
  email: string;
  fullName: string;
  avatarUrl?: string;
  createdAt: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, fullName: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

// Helper function to create card skeleton for new/existing users
const createUserCardSkeleton = async (userId: string, fullName: string, email: string) => {
  try {
    // Check if user already has a card
    const checkResponse = await fetch(`/api/cards/user/${userId}`);
    if (checkResponse.ok) {
      const data = await checkResponse.json();
      if (data.cards && data.cards.length > 0) {
        // User already has cards, skip creation
        return;
      }
    }
    
    // Create skeleton card with basic info
    const { createCard, generateUsername } = await import('@/lib/api-client');
    const username = await generateUsername(fullName);
    
    const skeletonCard = {
      username,
      fullName,
      role: '', // Incomplete - needs to be filled
      company: '',
      bio: '',
      profileImage: '',
      coverImage: '',
      email,
      phone: '',
      website: '',
      location: '',
      industry: 'Technology',
    };
    
    await createCard(userId, skeletonCard, []);
    console.log('Card skeleton created for user:', userId);
  } catch (error) {
    console.error('Error creating card skeleton:', error);
    // Don't throw - just log, as this is non-critical
  }
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in (from localStorage)
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Error parsing stored user:', error);
        localStorage.removeItem('user');
      }
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      // Import API client function
      const { authenticateUser } = await import('@/lib/api-client');
      
      // Authenticate with Neon PostgreSQL database
      const userProfile = await authenticateUser(email, password);
      
      if (!userProfile) {
        throw new Error('Invalid email or password');
      }
      
      const authenticatedUser: User = {
        id: userProfile.id,
        email: userProfile.email,
        fullName: userProfile.full_name,
        avatarUrl: userProfile.avatar_url,
        createdAt: userProfile.created_at,
      };
      
      setUser(authenticatedUser);
      localStorage.setItem('user', JSON.stringify(authenticatedUser));
      localStorage.setItem('authToken', `token_${userProfile.id}_${Date.now()}`);
      
      // Don't create card on login - only on signup
      
    } catch (error) {
      console.error('Login error:', error);
      throw new Error('Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  const signup = async (email: string, password: string, fullName: string) => {
    setLoading(true);
    try {
      // Validate input
      if (!email || !password || password.length < 6) {
        throw new Error('Invalid input. Password must be at least 6 characters.');
      }
      
      if (!fullName || fullName.trim().length < 2) {
        throw new Error('Please enter your full name.');
      }
      
      // Import API client functions
      const { createUser, getUserByEmail } = await import('@/lib/api-client');
      
      // Check if user already exists
      const existingUser = await getUserByEmail(email);
      if (existingUser) {
        throw new Error('Email already registered. Please login instead.');
      }
      
      // Create new user in Neon PostgreSQL database
      const newUserProfile = await createUser(email, fullName, password);
      
      const newUser: User = {
        id: newUserProfile.id,
        email: newUserProfile.email,
        fullName: newUserProfile.full_name,
        avatarUrl: newUserProfile.avatar_url,
        createdAt: newUserProfile.created_at,
      };
      
      setUser(newUser);
      localStorage.setItem('user', JSON.stringify(newUser));
      localStorage.setItem('authToken', `token_${newUser.id}_${Date.now()}`);
      
      // Auto-create card skeleton for new user
      await createUserCardSkeleton(newUser.id, newUser.fullName, newUser.email);
      
    } catch (error) {
      console.error('Signup error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('authToken');
  };

  const value: AuthContextType = {
    user,
    loading,
    login,
    signup,
    logout,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
