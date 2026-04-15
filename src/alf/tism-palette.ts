/**
 * TISM - Turtle Island Social Media Palette
 *
 * Theme inspired by:
 * - Native American aesthetics (turquoise, earth tones, natural colors)
 * - Queer/Two-Spirit pride
 * - Neurodivergent-friendly (warm, not overstimulating, good contrast)
 */

import {type Palette} from '@bsky.app/alf'

const TISM_STATIC = {
  white: '#FFFAF5', // Warm white (like birch bark)
  black: '#1A1512', // Warm black (like rich soil)
  pink: '#E07C9A', // Warm pink (sunset/Two-Spirit)
  yellow: '#E8A832', // Golden amber (autumn harvest)
}

/**
 * TISM Light Palette
 * Primary: Turquoise (sacred stone, healing, protection)
 * Accent: Earth tones throughout
 */
export const TISM_PALETTE: Palette = {
  white: TISM_STATIC.white,
  black: TISM_STATIC.black,
  pink: TISM_STATIC.pink,
  yellow: TISM_STATIC.yellow,
  like: TISM_STATIC.pink,

  // Contrast scale - warm grays (like weathered wood/stone)
  contrast_0: '#FFFAF5',
  contrast_25: '#F7F2ED',
  contrast_50: '#EDE5DC',
  contrast_100: '#DDD3C8',
  contrast_200: '#C5B8AA',
  contrast_300: '#AD9E8D',
  contrast_400: '#958573',
  contrast_500: '#7D6D5C',
  contrast_600: '#66584A',
  contrast_700: '#51463B',
  contrast_800: '#3D352D',
  contrast_900: '#2A2520',
  contrast_950: '#1F1B17',
  contrast_975: '#161310',
  contrast_1000: '#1A1512',

  // Primary - Turquoise (sacred color in many Native cultures)
  primary_25: '#F0FDFB',
  primary_50: '#E0FAF6',
  primary_100: '#B8F3EB',
  primary_200: '#85E9DC',
  primary_300: '#4DDBC9',
  primary_400: '#20C9B3',
  primary_500: '#14A894', // Main turquoise
  primary_600: '#0F8A7A',
  primary_700: '#106E63',
  primary_800: '#115751',
  primary_900: '#124844',
  primary_950: '#0A2D2B',
  primary_975: '#071E1D',

  // Positive - Forest green (growth, nature, healing)
  positive_25: '#F4FBF4',
  positive_50: '#E6F7E6',
  positive_100: '#C7EEC7',
  positive_200: '#9AE09A',
  positive_300: '#65CE65',
  positive_400: '#3DB83D',
  positive_500: '#2D9A2D',
  positive_600: '#247C24',
  positive_700: '#1F641F',
  positive_800: '#1C4F1C',
  positive_900: '#183F18',
  positive_950: '#0F2A0F',
  positive_975: '#0A1C0A',

  // Negative - Terracotta red (earth, clay, warmth even in warning)
  negative_25: '#FDF5F3',
  negative_50: '#FCE9E4',
  negative_100: '#F9D4CA',
  negative_200: '#F4B5A4',
  negative_300: '#EC8D73',
  negative_400: '#E16647',
  negative_500: '#C94D2E', // Terracotta
  negative_600: '#A83F26',
  negative_700: '#8B3422',
  negative_800: '#6E2B1F',
  negative_900: '#56241C',
  negative_950: '#3B1812',
  negative_975: '#28100C',
}

/**
 * TISM Subdued Palette (for dim theme)
 * Slightly muted, easier on the eyes
 */
export const TISM_SUBDUED_PALETTE: Palette = {
  white: TISM_STATIC.white,
  black: TISM_STATIC.black,
  pink: TISM_STATIC.pink,
  yellow: TISM_STATIC.yellow,
  like: TISM_STATIC.pink,

  // Subdued warm grays
  contrast_0: '#FFFAF5',
  contrast_25: '#F5F0EB',
  contrast_50: '#EAE2D9',
  contrast_100: '#D8CEC3',
  contrast_200: '#C0B4A6',
  contrast_300: '#A89B8B',
  contrast_400: '#908271',
  contrast_500: '#786A5A',
  contrast_600: '#625648',
  contrast_700: '#4E453A',
  contrast_800: '#3B352D',
  contrast_900: '#2C2721',
  contrast_950: '#221E1A',
  contrast_975: '#1B1815',
  contrast_1000: '#151210',

  // Subdued turquoise
  primary_25: '#F0FDFB',
  primary_50: '#E5F9F5',
  primary_100: '#C5F1E9',
  primary_200: '#98E5D8',
  primary_300: '#62D4C3',
  primary_400: '#32BFAA',
  primary_500: '#1FA18E',
  primary_600: '#178474',
  primary_700: '#166A5E',
  primary_800: '#16544C',
  primary_900: '#15453F',
  primary_950: '#0D2F2C',
  primary_975: '#0A2220',

  // Subdued forest green
  positive_25: '#F5FBF5',
  positive_50: '#E8F6E8',
  positive_100: '#CCEACC',
  positive_200: '#A3D9A3',
  positive_300: '#72C472',
  positive_400: '#48AD48',
  positive_500: '#369236',
  positive_600: '#2B772B',
  positive_700: '#256025',
  positive_800: '#214C21',
  positive_900: '#1C3E1C',
  positive_950: '#132A13',
  positive_975: '#0D1D0D',

  // Subdued terracotta
  negative_25: '#FDF6F4',
  negative_50: '#FBEBE7',
  negative_100: '#F7D9D0',
  negative_200: '#F0BFB0',
  negative_300: '#E69C86',
  negative_400: '#D97A5C',
  negative_500: '#C45A3B',
  negative_600: '#A64B30',
  negative_700: '#8A3F2A',
  negative_800: '#703426',
  negative_900: '#5A2B21',
  negative_950: '#401D16',
  negative_975: '#2D1410',
}
