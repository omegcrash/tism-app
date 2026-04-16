import {tokens} from '@bsky.app/alf'

export * from '@bsky.app/alf/dist/tokens'

export const color = {
  temp_purple: tokens.labelerColor.purple,
  temp_purple_dark: tokens.labelerColor.purple_dark,
} as const

/**
 * TISM Gradients
 * Earth tones and soft natural colors
 * Designed to be calming and accessible
 */
export const gradients = {
  // Primary: Turquoise to teal gradient
  primary: {
    values: [
      [0, '#0F7668'],
      [0.4, '#14A894'],
      [0.6, '#14A894'],
      [1, '#4DD1C1'],
    ],
    hover_value: '#14A894',
  },
  // Turtle shell: Earth brown gradient
  shell: {
    values: [
      [0, '#5D4E37'],
      [1, '#A68B5B'],
    ],
    hover_value: '#7D6B4F',
  },
  // Forest: Deep green earth tones
  forest: {
    values: [
      [0, '#1B5E20'],
      [1, '#4CAF50'],
    ],
    hover_value: '#2E7D32',
  },
  // Dawn: Soft warm sunrise
  sunrise: {
    values: [
      [0, '#4E90AE'],
      [0.4, '#AEA3AB'],
      [0.8, '#E6A98F'],
      [1, '#F3A84C'],
    ],
    hover_value: '#AEA3AB',
  },
  // Dusk: Soft purple to pink
  sunset: {
    values: [
      [0, '#6772AF'],
      [0.6, '#B88BB6'],
      [1, '#FFA6AC'],
    ],
    hover_value: '#B88BB6',
  },
  // Clay: Terracotta earth tones
  clay: {
    values: [
      [0, '#8C3C2A'],
      [0.5, '#C4553A'],
      [1, '#DE7A5A'],
    ],
    hover_value: '#A84832',
  },
  // River: Teal to aqua
  river: {
    values: [
      [0, '#08443C'],
      [1, '#80DED2'],
    ],
    hover_value: '#128F7E',
  },
  // Sage: Soft muted green
  sage: {
    values: [
      [0, '#3E5F4C'],
      [0.4, '#5B8A6D'],
      [0.8, '#8FB89F'],
      [1, '#B5D4C2'],
    ],
    hover_value: '#5B8A6D',
  },
} as const
