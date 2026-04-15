import Svg, {Circle, Ellipse, Path} from 'react-native-svg'

import {type Props, useCommonSVGProps} from './common'

/**
 * TISM Turtle Mark
 * Sacred symbol representing Turtle Island (North America)
 */
export function Mark(props: Props) {
  const {fill, size, style, gradient, ...rest} = useCommonSVGProps(props)
  const ratio = 1 // Square turtle

  return (
    <Svg
      fill="none"
      {...rest}
      viewBox="0 0 24 24"
      width={size}
      height={size * ratio}
      style={[style]}>
      {gradient}
      {/* Turtle Shell */}
      <Ellipse cx="12" cy="13" rx="7" ry="6" fill={fill} />
      {/* Shell pattern */}
      <Ellipse
        cx="12"
        cy="13"
        rx="4.5"
        ry="3.5"
        fill="none"
        stroke={fill}
        strokeWidth="0.6"
        strokeOpacity="0.4"
      />
      <Circle
        cx="12"
        cy="13"
        r="2"
        fill="none"
        stroke={fill}
        strokeWidth="0.6"
        strokeOpacity="0.4"
      />
      {/* Head */}
      <Ellipse cx="12" cy="5.5" rx="2.5" ry="2.8" fill={fill} />
      {/* Front legs */}
      <Ellipse
        cx="6"
        cy="10"
        rx="2"
        ry="1.5"
        fill={fill}
        transform="rotate(-30 6 10)"
      />
      <Ellipse
        cx="18"
        cy="10"
        rx="2"
        ry="1.5"
        fill={fill}
        transform="rotate(30 18 10)"
      />
      {/* Back legs */}
      <Ellipse
        cx="6"
        cy="17"
        rx="2"
        ry="1.5"
        fill={fill}
        transform="rotate(30 6 17)"
      />
      <Ellipse
        cx="18"
        cy="17"
        rx="2"
        ry="1.5"
        fill={fill}
        transform="rotate(-30 18 17)"
      />
      {/* Tail */}
      <Ellipse cx="12" cy="20.5" rx="1.2" ry="2" fill={fill} />
    </Svg>
  )
}

/**
 * TISM Full Logo (Turtle + Text)
 */
export function Full(
  props: Omit<Props, 'fill' | 'size' | 'height'> & {
    markFill?: Props['fill']
    textFill?: Props['fill']
  },
) {
  const {fill, size, style, gradient, ...rest} = useCommonSVGProps(props)
  const ratio = 24 / 100 // Adjusted for TISM text

  return (
    <Svg
      fill="none"
      {...rest}
      viewBox="0 0 100 24"
      width={size}
      height={size * ratio}
      style={[style]}>
      {gradient}
      {/* Turtle Mark */}
      <Ellipse cx="12" cy="13" rx="7" ry="6" fill={props.markFill ?? fill} />
      <Ellipse
        cx="12"
        cy="13"
        rx="4.5"
        ry="3.5"
        fill="none"
        stroke={props.markFill ?? fill}
        strokeWidth="0.6"
        strokeOpacity="0.4"
      />
      <Circle
        cx="12"
        cy="13"
        r="2"
        fill="none"
        stroke={props.markFill ?? fill}
        strokeWidth="0.6"
        strokeOpacity="0.4"
      />
      <Ellipse
        cx="12"
        cy="5.5"
        rx="2.5"
        ry="2.8"
        fill={props.markFill ?? fill}
      />
      <Ellipse
        cx="6"
        cy="10"
        rx="2"
        ry="1.5"
        fill={props.markFill ?? fill}
        transform="rotate(-30 6 10)"
      />
      <Ellipse
        cx="18"
        cy="10"
        rx="2"
        ry="1.5"
        fill={props.markFill ?? fill}
        transform="rotate(30 18 10)"
      />
      <Ellipse
        cx="6"
        cy="17"
        rx="2"
        ry="1.5"
        fill={props.markFill ?? fill}
        transform="rotate(30 6 17)"
      />
      <Ellipse
        cx="18"
        cy="17"
        rx="2"
        ry="1.5"
        fill={props.markFill ?? fill}
        transform="rotate(-30 18 17)"
      />
      <Ellipse
        cx="12"
        cy="20.5"
        rx="1.2"
        ry="2"
        fill={props.markFill ?? fill}
      />

      {/* TISM Text */}
      <Path
        fill={props.textFill ?? fill}
        d="M32 6h16v3h-6v12h-4V9h-6V6zM52 6v15h-4V6h4zM70 11.5c0-1.5-1-2.5-3-2.5s-3 1-3 2.5c0 1 .5 1.5 2 2l2 .5c3 .5 5 2 5 5 0 3-2.5 5-7 5s-7-2-7-5h4c0 1.5 1.5 2.5 3.5 2.5s3-.5 3-2c0-1-.5-1.5-2-2l-2.5-.5c-3-.5-5-2-5-5 0-3 2.5-5.5 7-5.5s6.5 2 7 5h-4zM82 6l4 10 4-10h5v15h-4V11l-4 10h-2l-4-10v10h-4V6h5z"
      />
    </Svg>
  )
}
