/**
 * Content Validation Utility
 * Enforces zero-hallucination policy and trusted source requirements
 */

import type { 
  TrustedSource, 
  ContentValidation, 
  CopyrightStatus,
  Sect 
} from '@/types';

// List of verified trusted sources
const TRUSTED_SOURCES = [
  'Encyclopaedia Britannica',
  'Jainworld.com',
  'Digital Jain Pathshala',
  'Jain Study Center',
  'Jain eLibrary',
  'The Jains by Paul Dundas',
  'Jainism: An Introduction by Jeffery D. Long',
  'The Heart of Jainism by Sinclair Stevenson',
  'Jaina Path of Purification by Padmanabh S. Jaini',
  'Tattvartha Sutra',
  'Drik Panchang',
  'Swiss Ephemeris',
];

/**
 * Standard response when content cannot be verified
 */
export const UNVERIFIED_RESPONSE = "This is not Factually correct.";

/**
 * Validates if sources are from trusted list
 */
export function validateSources(sources: TrustedSource[]): boolean {
  if (!sources || sources.length === 0) {
    return false;
  }

  return sources.every(source => 
    TRUSTED_SOURCES.some(trusted => 
      source.name.toLowerCase().includes(trusted.toLowerCase()) ||
      trusted.toLowerCase().includes(source.name.toLowerCase())
    )
  );
}

/**
 * Validates copyright compliance
 */
export function validateCopyright(
  copyrightStatus: CopyrightStatus,
  hasFullText: boolean
): boolean {
  // If full text is provided, must be public domain or licensed
  if (hasFullText) {
    return copyrightStatus === 'public_domain' || copyrightStatus === 'licensed';
  }
  
  // Summaries are always allowed
  return true;
}

/**
 * Validates sect-appropriate content
 */
export function validateSectContent(
  content: any,
  userSect?: Sect
): boolean {
  // If no sect specified, content should be universal or marked as both
  if (!userSect || userSect === 'not_sure') {
    return true;
  }

  // If content has sect-specific data, validate it matches user's sect
  if (content.sect_specific) {
    return content.sect_specific[userSect] !== undefined;
  }

  // If content has a sect field, validate it
  if (content.sect) {
    return content.sect === userSect || content.sect === 'both';
  }

  return true;
}

/**
 * Validates historical vs traditional distinction
 */
export function validateHistoricalClaim(
  isTraditional: boolean,
  hasHistoricalEvidence: boolean,
  claim: string
): ContentValidation {
  // Traditional claims must be clearly labeled
  if (isTraditional && !claim.includes('according to tradition')) {
    return {
      is_valid: false,
      error_message: 'Traditional claims must be clearly labeled as such',
      sources_verified: false,
      sect_appropriate: true,
      copyright_compliant: true,
      historical_accuracy: false,
    };
  }

  // Historical claims must have evidence
  if (!isTraditional && !hasHistoricalEvidence) {
    return {
      is_valid: false,
      error_message: 'Historical claims require documented evidence',
      sources_verified: false,
      sect_appropriate: true,
      copyright_compliant: true,
      historical_accuracy: false,
    };
  }

  return {
    is_valid: true,
    sources_verified: true,
    sect_appropriate: true,
    copyright_compliant: true,
    historical_accuracy: true,
  };
}

/**
 * Comprehensive content validation
 */
export function validateContent(content: {
  sources: TrustedSource[];
  copyright_status?: CopyrightStatus;
  has_full_text?: boolean;
  sect?: Sect | 'both';
  is_traditional?: boolean;
  has_historical_evidence?: boolean;
  user_sect?: Sect;
}): ContentValidation {
  const {
    sources,
    copyright_status = 'summary_only',
    has_full_text = false,
    sect,
    is_traditional = true,
    has_historical_evidence = false,
    user_sect,
  } = content;

  // Validate sources
  const sourcesValid = validateSources(sources);
  if (!sourcesValid) {
    return {
      is_valid: false,
      error_message: UNVERIFIED_RESPONSE,
      sources_verified: false,
      sect_appropriate: true,
      copyright_compliant: true,
      historical_accuracy: true,
    };
  }

  // Validate copyright
  const copyrightValid = validateCopyright(copyright_status, has_full_text);
  if (!copyrightValid) {
    return {
      is_valid: false,
      error_message: 'Copyright violation: Full text requires public domain or license',
      sources_verified: true,
      sect_appropriate: true,
      copyright_compliant: false,
      historical_accuracy: true,
    };
  }

  // Validate sect appropriateness
  const sectValid = validateSectContent({ sect }, user_sect);
  if (!sectValid) {
    return {
      is_valid: false,
      error_message: 'Content not appropriate for user\'s sect',
      sources_verified: true,
      sect_appropriate: false,
      copyright_compliant: true,
      historical_accuracy: true,
    };
  }

  return {
    is_valid: true,
    sources_verified: true,
    sect_appropriate: true,
    copyright_compliant: true,
    historical_accuracy: is_traditional || has_historical_evidence,
  };
}

/**
 * Validates Panchang data
 */
export function validatePanchangData(data: {
  date: Date;
  source: string;
  verified: boolean;
}): ContentValidation {
  const { date, source, verified } = data;

  // Date must be valid
  if (isNaN(date.getTime())) {
    return {
      is_valid: false,
      error_message: UNVERIFIED_RESPONSE,
      sources_verified: false,
      sect_appropriate: true,
      copyright_compliant: true,
      historical_accuracy: false,
    };
  }

  // Source must be trusted
  const sourceValid = TRUSTED_SOURCES.some(trusted =>
    source.toLowerCase().includes(trusted.toLowerCase())
  );

  if (!sourceValid || !verified) {
    return {
      is_valid: false,
      error_message: UNVERIFIED_RESPONSE,
      sources_verified: false,
      sect_appropriate: true,
      copyright_compliant: true,
      historical_accuracy: false,
    };
  }

  return {
    is_valid: true,
    sources_verified: true,
    sect_appropriate: true,
    copyright_compliant: true,
    historical_accuracy: true,
  };
}

/**
 * Checks if a date claim can be verified
 */
export function canVerifyDate(
  tirthankaraNumber: number,
  dateType: 'birth' | 'nirvana'
): boolean {
  // Only Parshvanath (23) and Mahavira (24) have historically verifiable dates
  if (tirthankaraNumber === 23 || tirthankaraNumber === 24) {
    return true;
  }

  // All other Tirthankaras: dates are traditional, not historical
  return false;
}

/**
 * Formats traditional vs historical label
 */
export function formatHistoricalLabel(
  isHistorical: boolean,
  language: 'en' | 'hi' | 'mr' | 'gu' = 'en'
): string {
  const labels = {
    en: {
      traditional: 'According to Jain tradition',
      historical: 'Historically documented',
    },
    hi: {
      traditional: 'जैन परंपरा के अनुसार',
      historical: 'ऐतिहासिक रूप से प्रलेखित',
    },
    mr: {
      traditional: 'जैन परंपरेनुसार',
      historical: 'ऐतिहासिकदृष्ट्या दस्तऐवजीकृत',
    },
    gu: {
      traditional: 'જૈન પરંપરા અનુસાર',
      historical: 'ઐતિહાસિક રીતે દસ્તાવેજીકૃત',
    },
  };

  return isHistorical 
    ? labels[language].historical 
    : labels[language].traditional;
}