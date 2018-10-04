import classnames from 'classnames'
import * as React from 'react'

interface IHKTooltipProps {
  children: string | React.ReactNode,
  height?: number,
  width?: number,
  style?: any,
  xPos: number,
  yPos: number,
}

export default class HKTooltip extends React.PureComponent<IHKTooltipProps, {}> {
  public render () {
    const { children, height, width, xPos, yPos, style } = this.props
    const styleProps = {
      backgroundColor: 'rgba(254,255,228,.75)',
      height: height && height,
      transform: `translate(${xPos + 5}px,${yPos}px)`,
      width: width && width,
      ...style,
    }

    return (
      <div
        className={classnames('absolute z-1 f7 b', { mw4: !width })}
        style={styleProps}
      >
        <p>{children}</p>
      </div>
    )
  }
}
