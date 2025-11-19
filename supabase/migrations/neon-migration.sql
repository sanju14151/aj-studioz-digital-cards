-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create users table (replacing Supabase auth.users)
CREATE TABLE IF NOT EXISTS public.users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT,
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create profiles table for user data
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES public.users(id) ON DELETE CASCADE,
  username TEXT UNIQUE,
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create card_themes table
CREATE TABLE IF NOT EXISTS public.card_themes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  primary_color TEXT DEFAULT '#D4AF37',
  secondary_color TEXT DEFAULT '#000000',
  background_color TEXT DEFAULT '#0A0A0A',
  font_family TEXT DEFAULT 'Inter',
  layout_style TEXT DEFAULT 'vertical' CHECK (layout_style IN ('vertical', 'horizontal', 'minimal', 'modern')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create digital_cards table
CREATE TABLE IF NOT EXISTS public.digital_cards (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  username TEXT UNIQUE NOT NULL,
  full_name TEXT NOT NULL,
  role TEXT,
  bio TEXT,
  company TEXT,
  email TEXT,
  phone TEXT,
  location TEXT,
  website TEXT,
  profile_image_url TEXT,
  cover_image_url TEXT,
  theme_id UUID REFERENCES public.card_themes(id),
  qr_code_url TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  view_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create social_links table
CREATE TABLE IF NOT EXISTS public.social_links (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  card_id UUID REFERENCES public.digital_cards(id) ON DELETE CASCADE NOT NULL,
  platform TEXT NOT NULL CHECK (platform IN ('instagram', 'linkedin', 'twitter', 'facebook', 'youtube', 'github', 'tiktok', 'whatsapp', 'telegram')),
  url TEXT NOT NULL,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create card_views table for analytics
CREATE TABLE IF NOT EXISTS public.card_views (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  card_id UUID REFERENCES public.digital_cards(id) ON DELETE CASCADE NOT NULL,
  viewer_ip TEXT,
  viewer_country TEXT,
  viewer_device TEXT,
  viewed_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create card_clicks table for button click tracking
CREATE TABLE IF NOT EXISTS public.card_clicks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  card_id UUID REFERENCES public.digital_cards(id) ON DELETE CASCADE NOT NULL,
  click_type TEXT NOT NULL CHECK (click_type IN ('email', 'phone', 'website', 'social', 'save_contact')),
  clicked_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create function to handle new user profiles
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, username, full_name, avatar_url)
  VALUES (
    NEW.id,
    COALESCE(split_part(NEW.email, '@', 1), 'user_' || substring(NEW.id::text from 1 for 8)),
    NEW.full_name,
    NEW.avatar_url
  );
  RETURN NEW;
END;
$$;

-- Trigger to auto-create profile on signup
DROP TRIGGER IF EXISTS on_user_created ON public.users;
CREATE TRIGGER on_user_created
  AFTER INSERT ON public.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

-- Triggers for updated_at
DROP TRIGGER IF EXISTS update_users_updated_at ON public.users;
CREATE TRIGGER update_users_updated_at
  BEFORE UPDATE ON public.users
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

DROP TRIGGER IF EXISTS update_profiles_updated_at ON public.profiles;
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

DROP TRIGGER IF EXISTS update_digital_cards_updated_at ON public.digital_cards;
CREATE TRIGGER update_digital_cards_updated_at
  BEFORE UPDATE ON public.digital_cards
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Insert default themes
INSERT INTO public.card_themes (name, primary_color, secondary_color, background_color, layout_style) VALUES
  ('AJ Gold', '#D4AF37', '#000000', '#0A0A0A', 'vertical'),
  ('Modern Horizontal', '#D4AF37', '#1A1A1A', '#000000', 'horizontal'),
  ('Minimal White', '#D4AF37', '#FFFFFF', '#FAFAFA', 'minimal'),
  ('Midnight Blue', '#4A90E2', '#1A1A2E', '#0F0F1E', 'modern'),
  ('Rose Gold', '#E5B299', '#2D2D2D', '#1A1A1A', 'vertical')
ON CONFLICT DO NOTHING;

-- Insert sample data for demonstration
DO $$
DECLARE
  sample_user_id UUID;
  sample_profile_id UUID;
  sample_card_id UUID;
  gold_theme_id UUID;
BEGIN
  -- Create sample user
  INSERT INTO public.users (email, full_name, avatar_url)
  VALUES ('demo@ajstudioz.com', 'John Doe', 'https://api.dicebear.com/7.x/avataaars/svg?seed=John')
  RETURNING id INTO sample_user_id;
  
  -- Get the automatically created profile
  SELECT id INTO sample_profile_id FROM public.profiles WHERE id = sample_user_id;
  
  -- Get the Gold theme
  SELECT id INTO gold_theme_id FROM public.card_themes WHERE name = 'AJ Gold';
  
  -- Create sample digital card
  INSERT INTO public.digital_cards (
    user_id, username, full_name, role, bio, company, email, phone, 
    location, website, theme_id, is_active
  )
  VALUES (
    sample_profile_id,
    'johndoe',
    'John Doe',
    'Creative Director',
    'Passionate about design and innovation. Creating beautiful experiences that connect people.',
    'AJ STUDIOZ',
    'john@ajstudioz.com',
    '+1 234 567 8900',
    'New York, USA',
    'ajstudioz.com',
    gold_theme_id,
    true
  )
  RETURNING id INTO sample_card_id;
  
  -- Add sample social links
  INSERT INTO public.social_links (card_id, platform, url, display_order) VALUES
    (sample_card_id, 'instagram', 'https://instagram.com/ajstudioz', 1),
    (sample_card_id, 'linkedin', 'https://linkedin.com/company/ajstudioz', 2),
    (sample_card_id, 'twitter', 'https://twitter.com/ajstudioz', 3),
    (sample_card_id, 'facebook', 'https://facebook.com/ajstudioz', 4);
    
  RAISE NOTICE 'Sample data created successfully!';
END $$;
