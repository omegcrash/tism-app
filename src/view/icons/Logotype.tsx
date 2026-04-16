import Svg, {Text, type PathProps, type SvgProps} from 'react-native-svg'

import {usePalette} from '#/lib/hooks/usePalette'

const ratio = 17 / 48

/**
 * TISM Logotype - "TISM" text branding
 * Turtle Island Social Media
 */
export function Logotype({
  fill,
  ...rest
}: {fill?: PathProps['fill']} & SvgProps) {
  const pal = usePalette('default')
  // @ts-ignore it's fiiiiine
  const size = parseInt(rest.width || 32)

  return (
    <Svg
      fill="none"
      viewBox="0 0 48 17"
      {...rest}
      width={size}
      height={Number(size) * ratio}>
      <Text
        fill={fill || pal.text.color}
        fontSize="16"
        fontWeight="700"
        fontFamily="System"
        x="0"
        y="14">
        TISM
      </Text>
    </Svg>
  )
}
