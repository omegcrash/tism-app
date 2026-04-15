/**
 * Phosphor Icons wrapper with TISM theme integration
 *
 * Usage:
 *   import {House, Heart, Bell} from 'phosphor-react-native'
 *   import {PhosphorIcon} from '#/components/icons/Phosphor'
 *
 *   <PhosphorIcon icon={House} size="lg" />
 *   <PhosphorIcon icon={Heart} size="md" weight="fill" />
 *   <PhosphorIcon icon={Bell} fill={t.palette.negative_500} />
 */
import {type ComponentType} from 'react'
import {StyleSheet, type TextProps} from 'react-native'
import {type IconProps, type IconWeight} from 'phosphor-react-native'

import {useTheme} from '#/alf'

export const sizes = {
  '2xs': 8,
  xs: 12,
  sm: 16,
  md: 20,
  lg: 24,
  xl: 28,
  '2xl': 32,
  '3xl': 48,
} as const

export type PhosphorIconProps = {
  icon: ComponentType<IconProps>
  fill?: string
  size?: keyof typeof sizes | number
  weight?: IconWeight
  style?: TextProps['style']
  mirrored?: boolean
}

export function PhosphorIcon({
  icon: Icon,
  fill,
  size = 'md',
  weight = 'regular',
  style,
  mirrored,
}: PhosphorIconProps) {
  const t = useTheme()
  const flatStyle = StyleSheet.flatten(style)

  // Resolve size - accept t-shirt sizes or raw numbers
  const _size = typeof size === 'number' ? size : sizes[size]

  // Get fill color from: explicit prop > style.color > theme primary
  const _fill = fill || (flatStyle?.color as string) || t.palette.primary_500

  return (
    <Icon
      size={_size}
      color={_fill}
      weight={weight}
      mirrored={mirrored}
      style={style}
    />
  )
}

/**
 * Create a pre-bound Phosphor icon component for common icons
 * This lets you import themed icons directly like the existing icon system
 *
 * Usage:
 *   const HomeIcon = createThemedIcon(House)
 *   <HomeIcon size="lg" />
 */
export function createThemedIcon(Icon: ComponentType<IconProps>) {
  return function ThemedIcon(props: Omit<PhosphorIconProps, 'icon'>) {
    return <PhosphorIcon icon={Icon} {...props} />
  }
}
