import {CaretDown, CaretLeft, CaretRight, CaretUp} from 'phosphor-react-native'

import {bold, stroke} from './PhosphorTemplate'

export const ChevronLeft_Stroke2_Corner0_Rounded = stroke(CaretLeft)
export const ChevronRight_Stroke2_Corner0_Rounded = stroke(CaretRight)
export const ChevronTop_Stroke2_Corner0_Rounded = stroke(CaretUp)
export const ChevronBottom_Stroke2_Corner0_Rounded = stroke(CaretDown)

// Note: ChevronTopBottom would need a custom icon or combined rendering
// For now, using CaretUp as placeholder - consider creating a compound icon
export const ChevronTopBottom_Stroke2_Corner0_Rounded = stroke(CaretUp)

// TinyChevronBottom uses bold weight for more visual weight at 2xs size
export const TinyChevronBottom_Stroke2_Corner0_Rounded = bold(CaretDown)
