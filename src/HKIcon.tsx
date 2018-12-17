import classNames from 'classnames'
import * as React from 'react'

export enum Fill {
  Black = 'fill-black',
  NearBlack = 'fill-near-black',
  DarkGray = 'fill-dark-gray',
  MidGray = 'fill-mid-gray',
  Gray = 'fill-gray',
  Silver = 'fill-silver',
  LightSilver = 'fill-light-silver',
  LightestSilver = 'fill-lightest-silver',
  MoonGray = 'fill-moon-gray',
  LightGray = 'fill-light-gray',
  NearWhite = 'fill-near-white',
  White = 'fill-white',
  Transparent = 'fill-transparent',
  DarkRed = 'fill-dark-red',
  Red = 'fill-red',
  LightRed = 'fill-light-red',
  Orange = 'fill-orange',
  Gold = 'fill-gold',
  Yellow = 'fill-yellow',
  LightYellow = 'fill-light-yellow',
  Purple = 'fill-purple',
  LightPurple = 'fill-light-purple',
  DarkPink = 'fill-dark-pink',
  HotPink = 'fill-hot-pink',
  FillPink = 'fill-pink',
  LightPink = 'fill-light-pink',
  DarkGreen = 'fill-dark-green',
  FillGreen = 'fill-green',
  LightGreen = 'fill-light-green',
  Navy = 'fill-navy',
  DarkBlue = 'fill-dark-blue',
  Blue = 'fill-blue',
  LightBlue = 'fill-light-blue',
  LightestBlue = 'fill-lightest-blue',
  WashedBlue = 'fill-washed-blue',
  WashedGreen = 'fill-washed-green',
  WashedYellow = 'fill-washed-yellow',
  WashedRed = 'fill-washed-red',
  GradientPurple = 'malibu-fill-gradient-purple',
  GradientDarkGray = 'malibu-fill-gradient-dark-gray',
  GradientRed = 'malibu-fill-gradient-red',
  GradientOrange = 'malibu-fill-gradient-orange',
  GradientGreen = 'malibu-fill-gradient-green',
  GradientBlue = 'malibu-fill-gradient-blue',
}

interface IIconProps {
  name: string
  className?: string
  fill?: string
  size?: number
}

const defaultProps = {
  fill: Fill.Black,
  size: 16,
}

const HKIcon: React.FunctionComponent<IIconProps> = ({
  name,
  size,
  fill,
  className,
}) => {
  const href = `#${name}`
  const svgClass = classNames(fill, className)
  const style = {
    height: size,
    width: size,
  }
  return (
    <svg style={style} className={svgClass}>
      <use xlinkHref={href} />
    </svg>
  )
}

HKIcon.displayName = 'HKIcon'
HKIcon.defaultProps = defaultProps
export default HKIcon
