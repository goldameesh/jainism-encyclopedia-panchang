// Core type definitions for Jainism Encyclopedia + Panchang Platform

export type Language = 'en' | 'hi' | 'mr' | 'gu';

export type Sect = 'svetambara' | 'digambara' | 'not_sure';

export type SubSect = 'murtipujak' | 'sthanakvasi' | 'terapanthi' | null;

export type KnowledgeLevel = 'beginner' | 'intermediate' | 'scholar';

export type Gender = 'male' | 'female' | 'other' | 'prefer_not_to_say';

export type Paksha = 'shukla' | 'krishna';

export type CopyrightStatus = 'public_domain' | 'licensed' | 'summary_only';

// ============================================
// USER TYPES
// ============================================

export interface UserProfile {
  id: string;
  user_id: string;
  display_name?: string;
  preferred_language: Language;
  sect?: Sect;
  sub_sect?: SubSect;
  location_lat?: number;
  location_lng?: number;
  location_name?: string;
  timezone: string;
  gender?: Gender;
  knowledge_level: KnowledgeLevel;
  created_at: string;
  updated_at: string;
}

// ============================================
// ENCYCLOPEDIA TYPES
// ============================================

export interface MultilingualText {
  en: string;
  hi: string;
  mr: string;
  gu: string;
}

export interface Kalyanak {
  type: 'garbha' | 'janma' | 'diksha' | 'kevala_jnana' | 'nirvana';
  description: MultilingualText;
  location?: MultilingualText;
  date?: string; // If historically verified
  is_traditional: boolean;
}

export interface SectSpecificContent {
  svetambara?: any;
  digambara?: any;
}

export interface TrustedSource {
  name: string;
  type: 'academic' | 'jain_institution' | 'panchang' | 'scholarly_work';
  url?: string;
  page?: string;
  accessed_date?: string;
}

export interface Tirthankara {
  id: string;
  number: number;
  name: MultilingualText;
  symbol: MultilingualText;
  birthplace?: MultilingualText;
  liberation_place?: MultilingualText;
  historical_evidence: boolean;
  sect_specific?: SectSpecificContent;
  kalyanaks: Kalyanak[];
  sources: TrustedSource[];
  created_at: string;
  updated_at: string;
}

export type ArticleCategory = 
  | 'foundations' 
  | 'philosophy' 
  | 'scriptures' 
  | 'festivals' 
  | 'rituals' 
  | 'history';

export interface EncyclopediaArticle {
  id: string;
  slug: string;
  category: ArticleCategory;
  title: MultilingualText;
  content: MultilingualText;
  sect_specific?: SectSpecificContent;
  is_traditional: boolean;
  sources: TrustedSource[];
  verified_by?: string;
  verified_at?: string;
  created_at: string;
  updated_at: string;
}

export type ObservanceType = 'fasting' | 'prayer' | 'pilgrimage' | 'celebration';

export interface Festival {
  id: string;
  slug: string;
  name: MultilingualText;
  description: MultilingualText;
  sect: Sect | 'both';
  duration_days?: number;
  observance_type: ObservanceType;
  calculation_method?: string;
  sources: TrustedSource[];
  created_at: string;
  updated_at: string;
}

// ============================================
// PANCHANG TYPES
// ============================================

export interface PanchangData {
  id: string;
  date: string;
  location_lat: number;
  location_lng: number;
  timezone: string;
  tithi: {
    name: MultilingualText;
    number: number;
    paksha: Paksha;
  };
  nakshatra: {
    name: MultilingualText;
  };
  yoga: {
    name: MultilingualText;
  };
  karana: {
    name: MultilingualText;
  };
  vaar: {
    name: MultilingualText;
  };
  sunrise: string;
  sunset: string;
  moonrise?: string;
  moonset?: string;
  navkarshi_cutoff?: string;
  porsi_cutoff?: string;
  sadh_porsi_cutoff?: string;
  ratri_bhojan_end?: string;
  data_source: string;
  verified: boolean;
  created_at: string;
}

export interface FestivalDate {
  id: string;
  festival_id: string;
  festival?: Festival;
  year: number;
  start_date: string;
  end_date?: string;
  location_lat?: number;
  location_lng?: number;
  sect: Sect | 'both';
  calculation_verified: boolean;
  created_at: string;
}

// ============================================
// RITUAL TYPES
// ============================================

export type RitualType = 'samayik' | 'pratikraman' | 'pachkhan' | 'navkar' | 'other';

export interface RitualStep {
  step_number: number;
  title: MultilingualText;
  description: MultilingualText;
  duration_minutes?: number;
  instructions?: MultilingualText;
  notes?: MultilingualText;
}

export interface Ritual {
  id: string;
  slug: string;
  name: MultilingualText;
  type: RitualType;
  duration_minutes?: number;
  description: MultilingualText;
  steps: RitualStep[];
  sect_specific?: SectSpecificContent;
  copyright_status: CopyrightStatus;
  sources: TrustedSource[];
  created_at: string;
  updated_at: string;
}

export type PachkhanType = 
  | 'upvas' 
  | 'ekasanu' 
  | 'biyasanu' 
  | 'navkarshi' 
  | 'porsi' 
  | 'sadh_porsi' 
  | 'ratri_bhojan';

export interface UserPachkhan {
  id: string;
  user_id: string;
  pachkhan_type: PachkhanType;
  start_date: string;
  end_date?: string;
  start_time?: string;
  end_time?: string;
  notes?: string;
  completed: boolean;
  created_at: string;
  updated_at: string;
}

// ============================================
// VALIDATION TYPES
// ============================================

export interface ContentValidation {
  is_valid: boolean;
  error_message?: string;
  sources_verified: boolean;
  sect_appropriate: boolean;
  copyright_compliant: boolean;
  historical_accuracy: boolean;
}

export interface ValidationResult {
  success: boolean;
  message: string;
  data?: any;
}

// ============================================
// API RESPONSE TYPES
// ============================================

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  per_page: number;
  total_pages: number;
}

// ============================================
// LOCATION TYPES
// ============================================

export interface Location {
  lat: number;
  lng: number;
  name?: string;
  timezone: string;
}

// ============================================
// SEARCH & FILTER TYPES
// ============================================

export interface SearchFilters {
  language?: Language;
  sect?: Sect;
  category?: ArticleCategory;
  query?: string;
}

export interface PanchangFilters {
  date?: string;
  location?: Location;
  include_festivals?: boolean;
}