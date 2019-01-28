import classNames from 'classnames'
import * as React from 'react'
import Fills from './HKIconFills'

interface IIconProps {
  name: string
  className?: string
  fill?: string
  size?: number
}

const defaultProps = {
  fill: Fills.Black,
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
