-- Jainism Encyclopedia + Panchang Platform Database Schema
-- Zero-hallucination, fact-certified, sect-aware content management

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- USER PROFILES & PREFERENCES
-- ============================================

CREATE TABLE user_profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name TEXT,
  preferred_language TEXT NOT NULL DEFAULT 'en' CHECK (preferred_language IN ('en', 'hi', 'mr', 'gu')),
  sect TEXT CHECK (sect IN ('svetambara', 'digambara', 'not_sure')),
  sub_sect TEXT CHECK (sub_sect IN ('murtipujak', 'sthanakvasi', 'terapanthi', NULL)),
  location_lat DECIMAL(10, 8),
  location_lng DECIMAL(11, 8),
  location_name TEXT,
  timezone TEXT DEFAULT 'UTC',
  gender TEXT CHECK (gender IN ('male', 'female', 'other', 'prefer_not_to_say')),
  knowledge_level TEXT DEFAULT 'beginner' CHECK (knowledge_level IN ('beginner', 'intermediate', 'scholar')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id)
);

-- ============================================
-- ENCYCLOPEDIA CONTENT
-- ============================================

-- Tirthankaras
CREATE TABLE tirthankaras (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  number INTEGER NOT NULL UNIQUE CHECK (number BETWEEN 1 AND 24),
  name_en TEXT NOT NULL,
  name_hi TEXT NOT NULL,
  name_mr TEXT NOT NULL,
  name_gu TEXT NOT NULL,
  symbol_en TEXT NOT NULL,
  symbol_hi TEXT NOT NULL,
  symbol_mr TEXT NOT NULL,
  symbol_gu TEXT NOT NULL,
  birthplace_en TEXT,
  birthplace_hi TEXT,
  birthplace_mr TEXT,
  birthplace_gu TEXT,
  liberation_place_en TEXT,
  liberation_place_hi TEXT,
  liberation_place_mr TEXT,
  liberation_place_gu TEXT,
  historical_evidence BOOLEAN DEFAULT FALSE,
  sect_specific JSONB, -- Stores sect-specific variations
  kalyanaks JSONB, -- Stores 5 auspicious events
  sources JSONB NOT NULL, -- Array of trusted source references
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Encyclopedia Articles
CREATE TABLE encyclopedia_articles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT NOT NULL UNIQUE,
  category TEXT NOT NULL CHECK (category IN ('foundations', 'philosophy', 'scriptures', 'festivals', 'rituals', 'history')),
  title_en TEXT NOT NULL,
  title_hi TEXT NOT NULL,
  title_mr TEXT NOT NULL,
  title_gu TEXT NOT NULL,
  content_en TEXT NOT NULL,
  content_hi TEXT NOT NULL,
  content_mr TEXT NOT NULL,
  content_gu TEXT NOT NULL,
  sect_specific JSONB, -- Sect-aware content variations
  is_traditional BOOLEAN DEFAULT TRUE, -- vs historical
  sources JSONB NOT NULL, -- Array of trusted source references
  verified_by TEXT, -- Scholar/community verification
  verified_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Festivals & Vrats
CREATE TABLE festivals (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT NOT NULL UNIQUE,
  name_en TEXT NOT NULL,
  name_hi TEXT NOT NULL,
  name_mr TEXT NOT NULL,
  name_gu TEXT NOT NULL,
  description_en TEXT NOT NULL,
  description_hi TEXT NOT NULL,
  description_mr TEXT NOT NULL,
  description_gu TEXT NOT NULL,
  sect TEXT CHECK (sect IN ('svetambara', 'digambara', 'both')),
  duration_days INTEGER,
  observance_type TEXT CHECK (observance_type IN ('fasting', 'prayer', 'pilgrimage', 'celebration')),
  calculation_method TEXT, -- How to calculate the date
  sources JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- PANCHANG DATA
-- ============================================

-- Daily Panchang Cache
CREATE TABLE panchang_cache (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  date DATE NOT NULL,
  location_lat DECIMAL(10, 8) NOT NULL,
  location_lng DECIMAL(11, 8) NOT NULL,
  timezone TEXT NOT NULL,
  tithi_name_en TEXT NOT NULL,
  tithi_name_hi TEXT NOT NULL,
  tithi_name_mr TEXT NOT NULL,
  tithi_name_gu TEXT NOT NULL,
  tithi_number INTEGER NOT NULL,
  paksha TEXT NOT NULL CHECK (paksha IN ('shukla', 'krishna')),
  nakshatra_name_en TEXT NOT NULL,
  nakshatra_name_hi TEXT NOT NULL,
  nakshatra_name_mr TEXT NOT NULL,
  nakshatra_name_gu TEXT NOT NULL,
  yoga_name_en TEXT NOT NULL,
  yoga_name_hi TEXT NOT NULL,
  yoga_name_mr TEXT NOT NULL,
  yoga_name_gu TEXT NOT NULL,
  karana_name_en TEXT NOT NULL,
  karana_name_hi TEXT NOT NULL,
  karana_name_mr TEXT NOT NULL,
  karana_name_gu TEXT NOT NULL,
  vaar_name_en TEXT NOT NULL,
  vaar_name_hi TEXT NOT NULL,
  vaar_name_mr TEXT NOT NULL,
  vaar_name_gu TEXT NOT NULL,
  sunrise TIME NOT NULL,
  sunset TIME NOT NULL,
  moonrise TIME,
  moonset TIME,
  navkarshi_cutoff TIME,
  porsi_cutoff TIME,
  sadh_porsi_cutoff TIME,
  ratri_bhojan_end TIME,
  data_source TEXT NOT NULL, -- API or calculation method used
  verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(date, location_lat, location_lng)
);

-- Festival Dates (calculated annually)
CREATE TABLE festival_dates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  festival_id UUID REFERENCES festivals(id) ON DELETE CASCADE,
  year INTEGER NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE,
  location_lat DECIMAL(10, 8),
  location_lng DECIMAL(11, 8),
  sect TEXT CHECK (sect IN ('svetambara', 'digambara', 'both')),
  calculation_verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(festival_id, year, location_lat, location_lng, sect)
);

-- ============================================
-- RITUAL GUIDES
-- ============================================

-- Ritual Templates
CREATE TABLE rituals (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT NOT NULL UNIQUE,
  name_en TEXT NOT NULL,
  name_hi TEXT NOT NULL,
  name_mr TEXT NOT NULL,
  name_gu TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('samayik', 'pratikraman', 'pachkhan', 'navkar', 'other')),
  duration_minutes INTEGER,
  description_en TEXT NOT NULL,
  description_hi TEXT NOT NULL,
  description_mr TEXT NOT NULL,
  description_gu TEXT NOT NULL,
  steps JSONB NOT NULL, -- Structured ritual steps in all languages
  sect_specific JSONB, -- Sect variations
  copyright_status TEXT NOT NULL CHECK (copyright_status IN ('public_domain', 'licensed', 'summary_only')),
  sources JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User Pachkhan (Vow) Tracking
CREATE TABLE user_pachkhans (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  pachkhan_type TEXT NOT NULL CHECK (pachkhan_type IN ('upvas', 'ekasanu', 'biyasanu', 'navkarshi', 'porsi', 'sadh_porsi', 'ratri_bhojan')),
  start_date DATE NOT NULL,
  end_date DATE,
  start_time TIME,
  end_time TIME,
  notes TEXT,
  completed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- CONTENT VALIDATION & SOURCES
-- ============================================

-- Trusted Sources Registry
CREATE TABLE trusted_sources (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL UNIQUE,
  type TEXT NOT NULL CHECK (type IN ('academic', 'jain_institution', 'panchang', 'scholarly_work')),
  url TEXT,
  description TEXT,
  verification_status TEXT NOT NULL CHECK (verification_status IN ('verified', 'pending', 'deprecated')),
  added_by UUID REFERENCES auth.users(id),
  added_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  last_verified_at TIMESTAMP WITH TIME ZONE
);

-- Content Verification Log
CREATE TABLE content_verifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  content_type TEXT NOT NULL CHECK (content_type IN ('tirthankara', 'article', 'festival', 'ritual', 'panchang')),
  content_id UUID NOT NULL,
  verified_by UUID REFERENCES auth.users(id),
  verification_status TEXT NOT NULL CHECK (verification_status IN ('approved', 'rejected', 'needs_revision')),
  notes TEXT,
  sources_checked JSONB,
  verified_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- INDEXES FOR PERFORMANCE
-- ============================================

CREATE INDEX idx_user_profiles_user_id ON user_profiles(user_id);
CREATE INDEX idx_tirthankaras_number ON tirthankaras(number);
CREATE INDEX idx_encyclopedia_articles_category ON encyclopedia_articles(category);
CREATE INDEX idx_encyclopedia_articles_slug ON encyclopedia_articles(slug);
CREATE INDEX idx_festivals_slug ON festivals(slug);
CREATE INDEX idx_festivals_sect ON festivals(sect);
CREATE INDEX idx_panchang_cache_date ON panchang_cache(date);
CREATE INDEX idx_panchang_cache_location ON panchang_cache(location_lat, location_lng);
CREATE INDEX idx_festival_dates_year ON festival_dates(year);
CREATE INDEX idx_festival_dates_festival_id ON festival_dates(festival_id);
CREATE INDEX idx_rituals_type ON rituals(type);
CREATE INDEX idx_user_pachkhans_user_id ON user_pachkhans(user_id);
CREATE INDEX idx_user_pachkhans_dates ON user_pachkhans(start_date, end_date);

-- ============================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================

ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_pachkhans ENABLE ROW LEVEL SECURITY;

-- Users can only read/update their own profile
CREATE POLICY "Users can view own profile" ON user_profiles
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update own profile" ON user_profiles
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own profile" ON user_profiles
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Users can only manage their own pachkhans
CREATE POLICY "Users can view own pachkhans" ON user_pachkhans
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own pachkhans" ON user_pachkhans
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own pachkhans" ON user_pachkhans
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own pachkhans" ON user_pachkhans
  FOR DELETE USING (auth.uid() = user_id);

-- Public read access for encyclopedia content
CREATE POLICY "Public can view tirthankaras" ON tirthankaras
  FOR SELECT USING (true);

CREATE POLICY "Public can view articles" ON encyclopedia_articles
  FOR SELECT USING (true);

CREATE POLICY "Public can view festivals" ON festivals
  FOR SELECT USING (true);

CREATE POLICY "Public can view panchang" ON panchang_cache
  FOR SELECT USING (true);

CREATE POLICY "Public can view rituals" ON rituals
  FOR SELECT USING (true);

CREATE POLICY "Public can view festival dates" ON festival_dates
  FOR SELECT USING (true);

-- ============================================
-- FUNCTIONS & TRIGGERS
-- ============================================

-- Update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply to relevant tables
CREATE TRIGGER update_user_profiles_updated_at BEFORE UPDATE ON user_profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_tirthankaras_updated_at BEFORE UPDATE ON tirthankaras
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_encyclopedia_articles_updated_at BEFORE UPDATE ON encyclopedia_articles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_festivals_updated_at BEFORE UPDATE ON festivals
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_rituals_updated_at BEFORE UPDATE ON rituals
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_pachkhans_updated_at BEFORE UPDATE ON user_pachkhans
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();