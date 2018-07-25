import * as React from 'react'

import { ChartPadding } from './constants'
import { prettier } from './helpers'

interface IGridProps {
  height: number,
  width: number,
  type: string,
  xScale: any,
  yScale: any,
}

export default class HKGrid extends React.PureComponent<IGridProps, {}> {
  public render () {
    const { width, height, type, yScale } = this.props

    const yTicks = 5
    const gridProps = {
      stroke: '#96a3b6',
      strokeOpacity: '0.3',
      strokeWidth: '0.5',
    }

    const horizontalGrid = yScale.ticks(yTicks).map((d,i) => {
      /* For line chart, yPos needs to be offset by the vertical chart padding.
      For bar charts, yScale(d) is measured relative to the top left corner, so height - yScale(d)
      will give us the yPos relative to the bottom left corner (0,0) */
      const yPos = type === 'line' ? (yScale(d) + ChartPadding.Vertical) : height - yScale(d)
      return (
        <g key={i}>
          {/* horizontal grid lines */}
          <line x1='0' y1={yPos} x2={width} y2={yPos} {...gridProps} />
          {/* y-axis labels */}
          <text x={-3} y={yPos} textAnchor='end' className='f7 fill-gray'> {prettier(d)} </text>
        </g>
      )
    })

    return (
      <g>
        {horizontalGrid}
      </g>
    )
  }
}
