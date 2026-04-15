import Svg, {Path, type PathProps, type SvgProps} from 'react-native-svg'

import {usePalette} from '#/lib/hooks/usePalette'

const ratio = 17 / 40 // Adjusted for TISM

/**
 * TISM Logotype (text only)
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
      viewBox="0 0 40 17"
      {...rest}
      width={size}
      height={Number(size) * ratio}>
      {/* TISM text */}
      <Path
        fill={fill || pal.text.color}
        d="M0 2h10v2H6.5v11h-3V4H0V2zM12 2v13h-3V2h3zM21.5 6c0-1.2-.8-2-2.4-2s-2.4.8-2.4 2c0 .8.4 1.2 1.6 1.6l1.6.4c2.4.4 4 1.6 4 4 0 2.4-2 4-5.6 4s-5.6-1.6-5.6-4h3c0 1.2 1.2 2 2.8 2s2.4-.4 2.4-1.6c0-.8-.4-1.2-1.6-1.6l-2-.4c-2.4-.4-4-1.6-4-4 0-2.4 2-4.4 5.6-4.4s5.2 1.6 5.6 4h-3zM28 2l3.2 8 3.2-8h4v13h-3V6.5l-3.2 8h-1.6l-3.2-8V15h-3V2h3.6z"
      />
    </Svg>
  )
}
