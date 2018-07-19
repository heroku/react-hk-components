import * as classnames from 'classnames'
import * as React from 'react'

interface IHKTooltipProps {
  children: string | React.ReactNode,
  height?: number,
  width?: number,
  xPos: number,
  yPos: number,
}

export default class HKTooltip extends React.PureComponent<IHKTooltipProps, {}> {
  public render () {
    const { children, height, width, xPos, yPos } = this.props
    const style = {
      backgroundColor: 'rgba(254,255,228,.75)',
      height: height && height,
      transform: `translate(${xPos + 5}px,${yPos}px)`,
      width: width && width,
    }

    return (
      <div
        className={classnames('absolute z-1 f7 b', { mw4: !width })}
        style={style}
      >
        <p>{children}</p>
      </div>
    )
  }
}
