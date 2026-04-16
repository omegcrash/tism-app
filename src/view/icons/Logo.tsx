import {forwardRef} from 'react'
import {type TextProps} from 'react-native'
import Svg, {
  Circle,
  Defs,
  Ellipse,
  LinearGradient,
  Path,
  type PathProps,
  Stop,
  type SvgProps,
} from 'react-native-svg'
import {Image} from 'expo-image'

import {useKawaiiMode} from '#/state/preferences/kawaii'
import {flatten, useTheme} from '#/alf'

const ratio = 1

type Props = {
  fill?: PathProps['fill']
  style?: TextProps['style']
} & Omit<SvgProps, 'style'>

/**
 * TISM Turtle Logo
 * A friendly, welcoming turtle representing Turtle Island Social Media
 * Soft earth tones, accessible design
 */
export const Logo = forwardRef(function LogoImpl(props: Props, ref) {
  const t = useTheme()
  const {fill, ...rest} = props
  const gradient = fill === 'sky' || fill === 'river'
  const styles = flatten(props.style)
  const _fill = gradient
    ? 'url(#river)'
    : fill || styles?.color || t.palette.primary_500
  // @ts-ignore it's fiiiiine
  const size = parseInt(rest.width || 32, 10)

  const isKawaii = useKawaiiMode()

  if (isKawaii) {
    return (
      <Image
        source={
          size > 100
            ? require('../../../assets/kawaii.png')
            : require('../../../assets/kawaii_smol.png')
        }
        accessibilityLabel="TISM"
        accessibilityHint=""
        accessibilityIgnoresInvertColors
        style={[{height: size, aspectRatio: 1}]}
      />
    )
  }

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
          <LinearGradient id="river" x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0" stopColor="#0F7668" stopOpacity="1" />
            <Stop offset="1" stopColor="#4DD1C1" stopOpacity="1" />
          </LinearGradient>
        </Defs>
      )}

      {/* Turtle shell - main body */}
      <Ellipse
        cx="32"
        cy="34"
        rx="20"
        ry="18"
        fill={_fill}
      />

      {/* Shell pattern - hexagonal segments */}
      <Path
        fill="none"
        stroke={t.palette.white}
        strokeWidth="1.5"
        strokeOpacity="0.3"
        d="M32 20 L32 48 M18 28 L46 28 M18 40 L46 40 M22 24 L22 44 M42 24 L42 44"
      />

      {/* Head */}
      <Circle
        cx="32"
        cy="14"
        r="8"
        fill={_fill}
      />

      {/* Eyes - friendly expression */}
      <Circle cx="29" cy="13" r="2" fill={t.palette.white} />
      <Circle cx="35" cy="13" r="2" fill={t.palette.white} />
      <Circle cx="29.5" cy="13.5" r="1" fill={t.palette.black} />
      <Circle cx="35.5" cy="13.5" r="1" fill={t.palette.black} />

      {/* Smile */}
      <Path
        fill="none"
        stroke={t.palette.white}
        strokeWidth="1.5"
        strokeLinecap="round"
        d="M29 17 Q32 19 35 17"
      />

      {/* Front legs */}
      <Ellipse cx="14" cy="30" rx="6" ry="4" fill={_fill} />
      <Ellipse cx="50" cy="30" rx="6" ry="4" fill={_fill} />

      {/* Back legs */}
      <Ellipse cx="16" cy="44" rx="5" ry="4" fill={_fill} />
      <Ellipse cx="48" cy="44" rx="5" ry="4" fill={_fill} />

      {/* Tail */}
      <Ellipse cx="32" cy="54" rx="4" ry="3" fill={_fill} />
    </Svg>
  )
})
