import {forwardRef} from 'react'
import {type TextProps} from 'react-native'
import Svg, {
  Circle,
  Defs,
  Ellipse,
  LinearGradient,
  type PathProps,
  Stop,
  type SvgProps,
} from 'react-native-svg'

import {flatten, useTheme} from '#/alf'

const ratio = 1 // Square for turtle

type Props = {
  fill?: PathProps['fill']
  style?: TextProps['style']
} & Omit<SvgProps, 'style'>

/**
 * TISM Turtle Logo
 * Turtle Island - sacred symbol representing North America
 * in many Indigenous traditions
 */
export const Logo = forwardRef(function LogoImpl(props: Props, ref) {
  const t = useTheme()
  const {fill, ...rest} = props
  const gradient = fill === 'sky'
  const styles = flatten(props.style)
  const _fill = gradient
    ? 'url(#tism)'
    : fill || styles?.color || t.palette.primary_500
  // @ts-ignore it's fiiiiine
  const size = parseInt(rest.width || 32, 10)

  return (
    <Svg
      fill="none"
      // @ts-ignore it's fiiiiine
      ref={ref}
      viewBox="0 0 64 64"
      {...rest}
      style={[{width: size, height: size * ratio}, styles]}>
      {gradient && (
        <Defs>
          <LinearGradient id="tism" x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0" stopColor="#20C9B3" stopOpacity="1" />
            <Stop offset="1" stopColor="#0F8A7A" stopOpacity="1" />
          </LinearGradient>
        </Defs>
      )}

      {/* Turtle Shell (main body) */}
      <Ellipse cx="32" cy="34" rx="18" ry="16" fill={_fill} />

      {/* Shell pattern - 13 sections representing 13 moons */}
      <Ellipse
        cx="32"
        cy="34"
        rx="12"
        ry="10"
        fill="none"
        stroke={_fill}
        strokeWidth="1.5"
        strokeOpacity="0.4"
      />
      <Circle
        cx="32"
        cy="34"
        r="5"
        fill="none"
        stroke={_fill}
        strokeWidth="1.5"
        strokeOpacity="0.4"
      />

      {/* Head */}
      <Ellipse cx="32" cy="14" rx="6" ry="7" fill={_fill} />

      {/* Front left leg */}
      <Ellipse
        cx="16"
        cy="26"
        rx="5"
        ry="4"
        fill={_fill}
        transform="rotate(-30 16 26)"
      />

      {/* Front right leg */}
      <Ellipse
        cx="48"
        cy="26"
        rx="5"
        ry="4"
        fill={_fill}
        transform="rotate(30 48 26)"
      />

      {/* Back left leg */}
      <Ellipse
        cx="16"
        cy="44"
        rx="5"
        ry="4"
        fill={_fill}
        transform="rotate(30 16 44)"
      />

      {/* Back right leg */}
      <Ellipse
        cx="48"
        cy="44"
        rx="5"
        ry="4"
        fill={_fill}
        transform="rotate(-30 48 44)"
      />

      {/* Tail */}
      <Ellipse cx="32" cy="54" rx="3" ry="5" fill={_fill} />
    </Svg>
  )
})
