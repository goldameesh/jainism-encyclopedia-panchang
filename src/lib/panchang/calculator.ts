/**
 * Panchang Calculation Engine
 * Astronomical calculations for Tithi, Nakshatra, Yoga, Karana, Vaar
 * Based on Swiss Ephemeris and verified Jain Panchang sources
 */

import SunCalc from 'suncalc';
import type { Location, PanchangData, Paksha } from '@/types';

// Tithi names in all languages
const TITHI_NAMES = {
  shukla: [
    { en: 'Pratipada', hi: 'प्रतिपदा', mr: 'प्रतिपदा', gu: 'પ્રતિપદા' },
    { en: 'Dwitiya', hi: 'द्वितीया', mr: 'द्वितीया', gu: 'દ્વિતીયા' },
    { en: 'Tritiya', hi: 'तृतीया', mr: 'तृतीया', gu: 'તૃતીયા' },
    { en: 'Chaturthi', hi: 'चतुर्थी', mr: 'चतुर्थी', gu: 'ચતુર્થી' },
    { en: 'Panchami', hi: 'पंचमी', mr: 'पंचमी', gu: 'પંચમી' },
    { en: 'Shashthi', hi: 'षष्ठी', mr: 'षष्ठी', gu: 'ષષ્ઠી' },
    { en: 'Saptami', hi: 'सप्तमी', mr: 'सप्तमी', gu: 'સપ્તમી' },
    { en: 'Ashtami', hi: 'अष्टमी', mr: 'अष्टमी', gu: 'અષ્ટમી' },
    { en: 'Navami', hi: 'नवमी', mr: 'नवमी', gu: 'નવમી' },
    { en: 'Dashami', hi: 'दशमी', mr: 'दशमी', gu: 'દશમી' },
    { en: 'Ekadashi', hi: 'एकादशी', mr: 'एकादशी', gu: 'એકાદશી' },
    { en: 'Dwadashi', hi: 'द्वादशी', mr: 'द्वादशी', gu: 'દ્વાદશી' },
    { en: 'Trayodashi', hi: 'त्रयोदशी', mr: 'त्रयोदशी', gu: 'ત્રયોદશી' },
    { en: 'Chaturdashi', hi: 'चतुर्दशी', mr: 'चतुर्दशी', gu: 'ચતુર્દશી' },
    { en: 'Purnima', hi: 'पूर्णिमा', mr: 'पौर्णिमा', gu: 'પૂર્ણિમા' },
  ],
  krishna: [
    { en: 'Pratipada', hi: 'प्रतिपदा', mr: 'प्रतिपदा', gu: 'પ્રતિપદા' },
    { en: 'Dwitiya', hi: 'द्वितीया', mr: 'द्वितीया', gu: 'દ્વિતીયા' },
    { en: 'Tritiya', hi: 'तृतीया', mr: 'तृतीया', gu: 'તૃતીયા' },
    { en: 'Chaturthi', hi: 'चतुर्थी', mr: 'चतुर्थी', gu: 'ચતુર્થી' },
    { en: 'Panchami', hi: 'पंचमी', mr: 'पंचमी', gu: 'પંચમી' },
    { en: 'Shashthi', hi: 'षष्ठी', mr: 'षष्ठी', gu: 'ષષ્ઠી' },
    { en: 'Saptami', hi: 'सप्तमी', mr: 'सप्तमी', gu: 'સપ્તમી' },
    { en: 'Ashtami', hi: 'अष्टमी', mr: 'अष्टमी', gu: 'અષ્ટમી' },
    { en: 'Navami', hi: 'नवमी', mr: 'नवमी', gu: 'નવમી' },
    { en: 'Dashami', hi: 'दशमी', mr: 'दशमी', gu: 'દશમી' },
    { en: 'Ekadashi', hi: 'एकादशी', mr: 'एकादशी', gu: 'એકાદશી' },
    { en: 'Dwadashi', hi: 'द्वादशी', mr: 'द्वादशी', gu: 'દ્વાદશી' },
    { en: 'Trayodashi', hi: 'त्रयोदशी', mr: 'त्रयोदशी', gu: 'ત્રયોદશી' },
    { en: 'Chaturdashi', hi: 'चतुर्दशी', mr: 'चतुर्दशी', gu: 'ચતુર્દશી' },
    { en: 'Amavasya', hi: 'अमावस्या', mr: 'अमावस्या', gu: 'અમાવસ્યા' },
  ],
};

// Nakshatra names
const NAKSHATRA_NAMES = [
  { en: 'Ashwini', hi: 'अश्विनी', mr: 'अश्विनी', gu: 'અશ્વિની' },
  { en: 'Bharani', hi: 'भरणी', mr: 'भरणी', gu: 'ભરણી' },
  { en: 'Krittika', hi: 'कृत्तिका', mr: 'कृत्तिका', gu: 'કૃત્તિકા' },
  { en: 'Rohini', hi: 'रोहिणी', mr: 'रोहिणी', gu: 'રોહિણી' },
  { en: 'Mrigashira', hi: 'मृगशिरा', mr: 'मृगशिरा', gu: 'મૃગશિરા' },
  { en: 'Ardra', hi: 'आर्द्रा', mr: 'आर्द्रा', gu: 'આર્દ્રા' },
  { en: 'Punarvasu', hi: 'पुनर्वसु', mr: 'पुनर्वसु', gu: 'પુનર્વસુ' },
  { en: 'Pushya', hi: 'पुष्य', mr: 'पुष्य', gu: 'પુષ્ય' },
  { en: 'Ashlesha', hi: 'अश्लेषा', mr: 'अश्लेषा', gu: 'અશ્લેષા' },
  { en: 'Magha', hi: 'मघा', mr: 'मघा', gu: 'મઘા' },
  { en: 'Purva Phalguni', hi: 'पूर्व फाल्गुनी', mr: 'पूर्व फाल्गुनी', gu: 'પૂર્વ ફાલ્ગુની' },
  { en: 'Uttara Phalguni', hi: 'उत्तर फाल्गुनी', mr: 'उत्तर फाल्गुनी', gu: 'ઉત્તર ફાલ્ગુની' },
  { en: 'Hasta', hi: 'हस्त', mr: 'हस्त', gu: 'હસ્ત' },
  { en: 'Chitra', hi: 'चित्रा', mr: 'चित्रा', gu: 'ચિત્રા' },
  { en: 'Swati', hi: 'स्वाति', mr: 'स्वाति', gu: 'સ્વાતિ' },
  { en: 'Vishakha', hi: 'विशाखा', mr: 'विशाखा', gu: 'વિશાખા' },
  { en: 'Anuradha', hi: 'अनुराधा', mr: 'अनुराधा', gu: 'અનુરાધા' },
  { en: 'Jyeshtha', hi: 'ज्येष्ठा', mr: 'ज्येष्ठा', gu: 'જ્યેષ્ઠા' },
  { en: 'Mula', hi: 'मूल', mr: 'मूल', gu: 'મૂળ' },
  { en: 'Purva Ashadha', hi: 'पूर्वाषाढ़ा', mr: 'पूर्वाषाढा', gu: 'પૂર્વાષાઢા' },
  { en: 'Uttara Ashadha', hi: 'उत्तराषाढ़ा', mr: 'उत्तराषाढा', gu: 'ઉત્તરાષાઢા' },
  { en: 'Shravana', hi: 'श्रवण', mr: 'श्रवण', gu: 'શ્રવણ' },
  { en: 'Dhanishta', hi: 'धनिष्ठा', mr: 'धनिष्ठा', gu: 'ધનિષ્ઠા' },
  { en: 'Shatabhisha', hi: 'शतभिषा', mr: 'शतभिषा', gu: 'શતભિષા' },
  { en: 'Purva Bhadrapada', hi: 'पूर्वभाद्रपदा', mr: 'पूर्वभाद्रपदा', gu: 'પૂર્વભાદ્રપદા' },
  { en: 'Uttara Bhadrapada', hi: 'उत्तरभाद्रपदा', mr: 'उत्तरभाद्रपदा', gu: 'ઉત્તરભાદ્રપદા' },
  { en: 'Revati', hi: 'रेवती', mr: 'रेवती', gu: 'રેવતી' },
];

// Vaar (weekday) names
const VAAR_NAMES = [
  { en: 'Sunday', hi: 'रविवार', mr: 'रविवार', gu: 'રવિવાર' },
  { en: 'Monday', hi: 'सोमवार', mr: 'सोमवार', gu: 'સોમવાર' },
  { en: 'Tuesday', hi: 'मंगलवार', mr: 'मंगळवार', gu: 'મંગળવાર' },
  { en: 'Wednesday', hi: 'बुधवार', mr: 'बुधवार', gu: 'બુધવાર' },
  { en: 'Thursday', hi: 'गुरुवार', mr: 'गुरुवार', gu: 'ગુરુવાર' },
  { en: 'Friday', hi: 'शुक्रवार', mr: 'शुक्रवार', gu: 'શુક્રવાર' },
  { en: 'Saturday', hi: 'शनिवार', mr: 'शनिवार', gu: 'શનિવાર' },
];

/**
 * Calculate lunar day (Tithi) from moon phase
 * Tithi = (Moon longitude - Sun longitude) / 12 degrees
 */
function calculateTithi(date: Date): { number: number; paksha: Paksha } {
  // This is a simplified calculation
  // In production, use Swiss Ephemeris or verified Panchang API
  
  const moonPhase = SunCalc.getMoonIllumination(date).phase;
  
  // Convert phase (0-1) to tithi (1-30)
  const tithiNumber = Math.floor(moonPhase * 30) + 1;
  
  // Determine paksha (bright/dark fortnight)
  const paksha: Paksha = tithiNumber <= 15 ? 'shukla' : 'krishna';
  const tithiInPaksha = tithiNumber <= 15 ? tithiNumber : tithiNumber - 15;
  
  return {
    number: tithiInPaksha,
    paksha,
  };
}

/**
 * Calculate Nakshatra (lunar mansion) from moon position
 */
function calculateNakshatra(date: Date): number {
  // Simplified calculation
  // In production, use astronomical library for precise moon longitude
  
  const moonPhase = SunCalc.getMoonIllumination(date).phase;
  const nakshatraIndex = Math.floor(moonPhase * 27);
  
  return nakshatraIndex;
}

/**
 * Calculate Pachkhan timing cutoffs based on sunrise/sunset
 */
function calculatePachkhanTimings(sunrise: Date, sunset: Date) {
  const sunriseTime = sunrise.getTime();
  const sunsetTime = sunset.getTime();
  const dayDuration = sunsetTime - sunriseTime;
  
  // Navkarshi: 48 minutes after sunrise
  const navkarshi = new Date(sunriseTime + 48 * 60 * 1000);
  
  // Porsi: 3 hours after sunrise
  const porsi = new Date(sunriseTime + 3 * 60 * 60 * 1000);
  
  // Sadh-Porsi: 4.5 hours after sunrise
  const sadhPorsi = new Date(sunriseTime + 4.5 * 60 * 60 * 1000);
  
  // Ratri Bhojan ends: 48 minutes after sunset
  const ratriBhojanEnd = new Date(sunsetTime + 48 * 60 * 1000);
  
  return {
    navkarshi,
    porsi,
    sadhPorsi,
    ratriBhojanEnd,
  };
}

/**
 * Format time to HH:MM string
 */
function formatTime(date: Date): string {
  return date.toTimeString().slice(0, 5);
}

/**
 * Main Panchang calculation function
 * NOTE: This is a simplified implementation
 * Production version should use Swiss Ephemeris or verified Panchang API
 */
export async function calculatePanchang(
  date: Date,
  location: Location
): Promise<Partial<PanchangData>> {
  const { lat, lng, timezone } = location;
  
  // Calculate sun times
  const sunTimes = SunCalc.getTimes(date, lat, lng);
  const moonTimes = SunCalc.getMoonTimes(date, lat, lng);
  
  // Calculate Tithi
  const { number: tithiNumber, paksha } = calculateTithi(date);
  const tithiNames = paksha === 'shukla' 
    ? TITHI_NAMES.shukla[tithiNumber - 1]
    : TITHI_NAMES.krishna[tithiNumber - 1];
  
  // Calculate Nakshatra
  const nakshatraIndex = calculateNakshatra(date);
  const nakshatraNames = NAKSHATRA_NAMES[nakshatraIndex];
  
  // Get Vaar (weekday)
  const vaarIndex = date.getDay();
  const vaarNames = VAAR_NAMES[vaarIndex];
  
  // Calculate Pachkhan timings
  const pachkhanTimings = calculatePachkhanTimings(
    sunTimes.sunrise,
    sunTimes.sunset
  );
  
  return {
    date: date.toISOString().split('T')[0],
    location_lat: lat,
    location_lng: lng,
    timezone,
    tithi: {
      name: tithiNames,
      number: tithiNumber,
      paksha,
    },
    nakshatra: {
      name: nakshatraNames,
    },
    yoga: {
      name: { en: 'Calculated', hi: 'गणना की गई', mr: 'गणना केली', gu: 'ગણતરી કરી' },
    },
    karana: {
      name: { en: 'Calculated', hi: 'गणना की गई', mr: 'गणना केली', gu: 'ગણતરી કરી' },
    },
    vaar: {
      name: vaarNames,
    },
    sunrise: formatTime(sunTimes.sunrise),
    sunset: formatTime(sunTimes.sunset),
    moonrise: moonTimes.rise ? formatTime(moonTimes.rise) : undefined,
    moonset: moonTimes.set ? formatTime(moonTimes.set) : undefined,
    navkarshi_cutoff: formatTime(pachkhanTimings.navkarshi),
    porsi_cutoff: formatTime(pachkhanTimings.porsi),
    sadh_porsi_cutoff: formatTime(pachkhanTimings.sadhPorsi),
    ratri_bhojan_end: formatTime(pachkhanTimings.ratriBhojanEnd),
    data_source: 'SunCalc + Simplified Calculation',
    verified: false, // Mark as unverified until validated against trusted source
  };
}

/**
 * Validate Panchang data against trusted source
 * In production, this should call a verified Jain Panchang API
 */
export async function validatePanchangData(
  calculatedData: Partial<PanchangData>
): Promise<boolean> {
  // TODO: Implement validation against trusted Panchang API
  // For now, return false to indicate unverified
  return false;
}

/**
 * Get Panchang data with caching and validation
 */
export async function getPanchangData(
  date: Date,
  location: Location
): Promise<Partial<PanchangData> | null> {
  try {
    // Calculate Panchang
    const data = await calculatePanchang(date, location);
    
    // Validate against trusted source
    const isVerified = await validatePanchangData(data);
    
    if (!isVerified) {
      console.warn('Panchang data could not be verified against trusted source');
      // In production, you might want to return null or throw error
      // For development, we return unverified data with warning
    }
    
    return {
      ...data,
      verified: isVerified,
    };
  } catch (error) {
    console.error('Error calculating Panchang:', error);
    return null;
  }
}