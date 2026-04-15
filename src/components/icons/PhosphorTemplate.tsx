/**
 * Phosphor icon template - creates themed icon components matching existing API
 */
import {forwardRef} from 'react'
import {StyleSheet} from 'react-native'
import Svg from 'react-native-svg'
import {
  type Icon as PhosphorIconType,
  type IconWeight,
} from 'phosphor-react-native'

import {useTheme} from '#/alf'
import {type Props, sizes} from './common'

export type {Props}
export {sizes}

/**
 * Create a themed Phosphor icon that matches the existing icon API
 *
 * Usage:
 *   import {House} from 'phosphor-react-native'
 *   export const Home_Stroke2_Corner0_Rounded = createPhosphorIcon(House, 'regular')
 *   export const Home_Filled_Corner0_Rounded = createPhosphorIcon(House, 'fill')
 */
export function createPhosphorIcon(
  Icon: PhosphorIconType,
  weight: IconWeight = 'regular',
) {
  return forwardRef<Svg, Props>(function PhosphorIconImpl(props, _ref) {
    const t = useTheme()
    const {fill, size, style, width, gradient: _gradient, ...rest} = props
    const flatStyle = StyleSheet.flatten(style)

    // Resolve size
    const _size = size ? sizes[size] : width ? Number(width) : sizes.md

    // Get fill color from: explicit prop > style.color > theme primary
    // Convert ColorValue to string for Phosphor compatibility
    const fillColor = fill ? String(fill) : undefined
    const styleColor = flatStyle?.color ? String(flatStyle.color) : undefined
    const _fill: string = fillColor || styleColor || t.palette.primary_500

    // Extract only layout-related styles, not color
    const {color: _color, ...layoutStyle} = flatStyle || {}

    return (
      <Icon
        size={_size}
        color={_fill}
        weight={weight}
        style={layoutStyle}
        {...(rest as object)}
      />
    )
  })
}

/**
 * Shorthand creators for common variants
 */
export const stroke = (Icon: PhosphorIconType) =>
  createPhosphorIcon(Icon, 'regular')
export const filled = (Icon: PhosphorIconType) =>
  createPhosphorIcon(Icon, 'fill')
export const light = (Icon: PhosphorIconType) =>
  createPhosphorIcon(Icon, 'light')
export const bold = (Icon: PhosphorIconType) => createPhosphorIcon(Icon, 'bold')
export const duotone = (Icon: PhosphorIconType) =>
  createPhosphorIcon(Icon, 'duotone')
