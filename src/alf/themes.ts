import {
  createThemes,
  DEFAULT_SUBDUED_PALETTE,
} from '@bsky.app/alf'

/**
 * TISM Custom Palette
 * Based on soft turquoise (#14A894) with earth tone accents
 * Designed for Native, Queer, and Neurodivergent community
 * Calm, soothing, accessible
 */
const TISM_PALETTE = {
  white: '#FFFAF5',  // Warm cream instead of pure white
  black: '#1A1A1A',

  // Primary: Soft Turquoise (based on #14A894)
  primary_25: '#F0FBF9',
  primary_50: '#E0F7F4',
  primary_100: '#B3EBE3',
  primary_200: '#80DED2',
  primary_300: '#4DD1C1',
  primary_400: '#26C4B0',
  primary_500: '#14A894',  // Main turquoise
  primary_600: '#128F7E',
  primary_700: '#0F7668',
  primary_800: '#0C5D52',
  primary_900: '#08443C',
  primary_950: '#052B26',
  primary_975: '#031A17',

  // Positive: Soft green (earth tone)
  positive_25: '#F4F9F4',
  positive_50: '#E8F5E9',
  positive_100: '#C8E6C9',
  positive_200: '#A5D6A7',
  positive_300: '#81C784',
  positive_400: '#66BB6A',
  positive_500: '#4CAF50',
  positive_600: '#43A047',
  positive_700: '#388E3C',
  positive_800: '#2E7D32',
  positive_900: '#1B5E20',
  positive_950: '#0D3B10',
  positive_975: '#062208',

  // Negative: Soft terracotta (earth tone, not harsh red)
  negative_25: '#FDF5F3',
  negative_50: '#FBEAE5',
  negative_100: '#F5CFC4',
  negative_200: '#EEB3A0',
  negative_300: '#E6967C',
  negative_400: '#DE7A5A',
  negative_500: '#D66040',
  negative_600: '#C4553A',
  negative_700: '#A84832',
  negative_800: '#8C3C2A',
  negative_900: '#702F22',
  negative_950: '#4A1F16',
  negative_975: '#2D130D',
}

const TISM_THEMES = createThemes({
  defaultPalette: TISM_PALETTE,
  subduedPalette: DEFAULT_SUBDUED_PALETTE,
})

export const themes = {
  lightPalette: TISM_THEMES.light.palette,
  darkPalette: TISM_THEMES.dark.palette,
  dimPalette: TISM_THEMES.dim.palette,
  light: TISM_THEMES.light,
  dark: TISM_THEMES.dark,
  dim: TISM_THEMES.dim,
}

/**
 * @deprecated use ALF and access palette from `useTheme()`
 */
export const lightPalette = DEFAULT_THEMES.light.palette
/**
 * @deprecated use ALF and access palette from `useTheme()`
 */
export const darkPalette = DEFAULT_THEMES.dark.palette
/**
 * @deprecated use ALF and access palette from `useTheme()`
 */
export const dimPalette = DEFAULT_THEMES.dim.palette
/**
 * @deprecated use ALF and access theme from `useTheme()`
 */
export const light = DEFAULT_THEMES.light
/**
 * @deprecated use ALF and access theme from `useTheme()`
 */
export const dark = DEFAULT_THEMES.dark
/**
 * @deprecated use ALF and access theme from `useTheme()`
 */
export const dim = DEFAULT_THEMES.dim
