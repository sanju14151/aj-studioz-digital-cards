-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create profiles table for user data
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
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
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
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

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.card_themes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.digital_cards ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.social_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.card_views ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.card_clicks ENABLE ROW LEVEL SECURITY;

-- RLS Policies for profiles
CREATE POLICY "Users can view all profiles"
  ON public.profiles FOR SELECT
  USING (true);

CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- RLS Policies for card_themes (public read, authenticated create/update)
CREATE POLICY "Anyone can view themes"
  ON public.card_themes FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can create themes"
  ON public.card_themes FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

-- RLS Policies for digital_cards
CREATE POLICY "Anyone can view active cards"
  ON public.digital_cards FOR SELECT
  USING (is_active = true OR auth.uid() = user_id);

CREATE POLICY "Users can create own cards"
  ON public.digital_cards FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own cards"
  ON public.digital_cards FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own cards"
  ON public.digital_cards FOR DELETE
  USING (auth.uid() = user_id);

-- RLS Policies for social_links
CREATE POLICY "Anyone can view social links for active cards"
  ON public.social_links FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.digital_cards 
      WHERE id = social_links.card_id 
      AND (is_active = true OR user_id = auth.uid())
    )
  );

CREATE POLICY "Card owners can manage social links"
  ON public.social_links FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.digital_cards 
      WHERE id = social_links.card_id 
      AND user_id = auth.uid()
    )
  );

-- RLS Policies for analytics (card_views and card_clicks)
CREATE POLICY "Anyone can insert card views"
  ON public.card_views FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Card owners can view their analytics"
  ON public.card_views FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.digital_cards 
      WHERE id = card_views.card_id 
      AND user_id = auth.uid()
    )
  );

CREATE POLICY "Anyone can insert card clicks"
  ON public.card_clicks FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Card owners can view their click analytics"
  ON public.card_clicks FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.digital_cards 
      WHERE id = card_clicks.card_id 
      AND user_id = auth.uid()
    )
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
    COALESCE(NEW.raw_user_meta_data->>'username', split_part(NEW.email, '@', 1)),
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name'),
    NEW.raw_user_meta_data->>'avatar_url'
  );
  RETURN NEW;
END;
$$;

-- Trigger to auto-create profile on signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
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
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

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